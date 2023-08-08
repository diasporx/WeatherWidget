import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    cities: JSON.parse(localStorage.getItem('cities')) || [],
    weatherData: null,
  },
  mutations: {
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
    },
    ADD_CITY(state, city) {
      if (!state.cities.includes(city)) {
        state.cities.push(city);
        localStorage.setItem('cities', JSON.stringify(state.cities));
      }
    },
    REMOVE_CITY(state, index) {
      state.cities.splice(index, 1);
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
    REORDER_CITIES(state, { newIndex, oldIndex }) {
      const [movedCity] = state.cities.splice(oldIndex, 1);
      state.cities.splice(newIndex, 0, movedCity);
      localStorage.setItem('cities', JSON.stringify(state.cities));
    },
  },
  actions: {
    async fetchWeatherData({ commit }, payload) {
      try {
        const apiKey = 'c20c38c73c2e5f6f0e02ba8b29e0c981';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${payload.city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(apiUrl);
        commit('SET_WEATHER_DATA', response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    async initWeatherData({ commit, dispatch }) {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        const userCity = response.data.city;
        commit('ADD_CITY', userCity);
        await dispatch('fetchWeatherData', { city: userCity });
      } catch (error) {
        console.error('Error determining user location:', error);
      }
    },
    addCity({ commit }, city) {
      commit('ADD_CITY', city);
    },
    removeCity({ commit }, index) {
      commit('REMOVE_CITY', index);
    },
    reorderCities({ commit }, { newIndex, oldIndex }) {
      commit('REORDER_CITIES', { newIndex, oldIndex });
    },
  },
});
