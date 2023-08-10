import {createStore} from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        temporaryErr: '',
        cities: JSON.parse(localStorage.getItem('cities')) || [],
        weatherData: null
    },
    mutations: {
        SET_WEATHER_DATA(state, data) {
            state.weatherData = data;
        },
        INIT_ERR(state, err) {
            state.temporaryErr = err;
            setTimeout(() => {
                state.temporaryErr = '';
            }, 1500);
        },
        ADD_CITY(state, city) {
            if (!state.cities.includes(city)) {
                state.cities.unshift(city);
                localStorage.setItem('cities', JSON.stringify(state.cities));
            }
        },
        REMOVE_CITY(state, index) {
            state.cities.splice(index, 1);
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
        REORDER_CITIES(state, {newIndex, oldIndex}) {
            const [movedCity] = state.cities.splice(oldIndex, 1);
            state.cities.splice(newIndex, 0, movedCity);
            localStorage.setItem('cities', JSON.stringify(state.cities));
        },
    },
    actions: {
        async fetchWeatherData({commit}, payload) {
            try {
                const apiKey = 'c20c38c73c2e5f6f0e02ba8b29e0c981';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${payload.city}&appid=${apiKey}&units=metric`;
                const response = await axios.get(apiUrl);
                commit('SET_WEATHER_DATA', response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        },
        async initWeatherData({commit, dispatch}) {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                const userCity = response.data.city;
                commit('ADD_CITY', userCity);
                await dispatch('fetchWeatherData', {city: userCity});
            } catch (error) {
                commit('INIT_ERR', `Error determining user location: ${error}`)
            }
        },
        async addCity({commit, state, dispatch}, city) {
            try {
                if (state.cities.includes(city)) {
                    commit('INIT_ERR', 'City already exists in the list.')
                    return;
                }

                const apiKey = 'c20c38c73c2e5f6f0e02ba8b29e0c981';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                const response = await axios.get(apiUrl);

                if (response.data) {
                    commit('ADD_CITY', city);
                    await dispatch('fetchWeatherData', {city});
                } else {
                    console.error('');
                    commit('INIT_ERR', 'City not found in OpenWeather API.')
                }
            } catch (error) {
                commit('INIT_ERR', `Error adding city: ${error}`)
                // console.error('Error adding city:', error);
            }
        },
        removeCity({commit}, index) {
            commit('REMOVE_CITY', index);
        },
        reorderCities({commit}, {newIndex, oldIndex}) {
            commit('REORDER_CITIES', {newIndex, oldIndex});
        },
    },
});
