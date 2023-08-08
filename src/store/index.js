import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    weatherData: null,
  },
  getters: {
  },
  mutations: {
    SET_WEATHER_DATA(state, data) {
      state.weatherData = data;
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
  },
})
