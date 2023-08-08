<template>
  <div>
<!--    <div v-if="weatherData">-->
<!--      <h2>Погода в {{ weatherData.name }}</h2>-->
<!--      <p>Температура: {{ weatherData.main.temp }}°C</p>-->
<!--    </div>-->

    <div class="weatherCard" v-if="weatherData">
      <div class="headerWidget d-flex align-items-center justify-content-between">
        <span class="cityName">{{ weatherData.name }}, {{ weatherData.sys.country }}</span>
        <a href="" class="ico__Settings d-flex align-items-center justify-content-center"><img src='@/assets/icons/settings.svg' alt="settings"></a>
      </div>
      <div class="contentWidgetWeather d-flex align-items-center justify-content-start">
        <img :src="weatherIconPath" alt="weather">
        <span class="Temperature">{{Math.round(weatherData.main.temp_max)}}℃</span>
      </div>
      <div class="descriptionWeather">
        <p>Feels like <b>{{Math.round(weatherData.main.feels_like)}}℃</b>, {{weatherData.weather[0].description}}</p>
      </div>
    </div>

  </div>
</template>


<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import axios from "axios";
import settingsIco from '@/assets/icons/settings.svg'

export default defineComponent({
  data() {
    return {
      settingsIco:settingsIco
    }
  },
  async created() {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const userCity = response.data.city;
      this.city = userCity;
      this.fetchWeatherForCity(userCity);
    } catch (error) {
      console.error('Error determining user location:', error);
    }
  },
  computed: {
    ...mapState(['weatherData']),
    weatherIconPath() {
      const weatherData = this.$store.state.weatherData;
      if (weatherData) {
        const weatherConditions = weatherData.weather[0].main;
        switch (weatherConditions) {
          case 'Clouds':
            return require('@/assets/weather-images/cloudy.svg');
          case 'Clear':
            return require('@/assets/weather-images/day.svg');
          case 'Thunderstorm':
            return require('@/assets/weather-images/thunder.svg');
          case 'Rain':
            return require('@/assets/weather-images/rainy.svg');
          case 'Drizzle':
            return require('@/assets/weather-images/light-rainy.svg');
          case 'Snow':
            return require('@/assets/weather-images/snowy.svg');
          default:
            return require('@/assets/weather-images/cloudy-day.svg');
        }
      } else {
        return require('@/assets/weather-images/cloudy-day.svg');
      }
    }
  },
  methods: {
    ...mapActions(['fetchWeatherData']),
    fetchWeatherForCity(city) {
      this.fetchWeatherData({ city });
    },
  }
});
</script>

<style scoped lang="scss">
.weatherCard {
  background: #fff;
  max-width: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  .headerWidget {
    .cityName {font-weight: 600}
    .ico__Settings{
      transition: all .3s ease;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        opacity: .7;
      }
    }
  }
  .contentWidgetWeather {
    span.Temperature {
      font-size: 48px;
      font-weight: 600;
    }
    img {
      width: 150px;
    }
  }
}
</style>