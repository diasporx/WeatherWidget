<template>
  <!--Card-->
  <div class="weatherCard" v-if="weatherData">
    <div class="content-No-Settings" v-if="!this.settings">
      <div class="headerWidget d-flex align-items-center justify-content-between">
        <span class="cityName">{{ weatherData.name }}, {{ weatherData.sys.country }}</span>
        <button @click="this.settings = !this.settings" class="ico__Settings d-flex align-items-center justify-content-center"><img
            src='@/assets/icons/settings.svg' alt="settings"></button>
      </div>
      <div class="contentWidgetWeather d-flex align-items-center justify-content-start">
        <img :src="weatherIconPath" alt="weather">
        <span class="Temperature">{{ Math.round(weatherData.main.temp_max) }}°C</span>
      </div>
      <div class="descriptionWeather">
        <p>Feels like <b>{{ Math.round(weatherData.main.feels_like) }}°C</b>, {{ weatherData.weather[0].description }}
        </p>
      </div>
      <div class="content-columns d-flex justify-content-between">
        <div class="d-flex flex-column">
          <div class="group-stat mb-2 d-flex align-items-center">
            <img class="ico__ArrowWind" src='@/assets/icons/arrow.png' :style="{ transform: `rotate(${arrowRotation}deg)` }" alt="arrow-wind">
            <span class="light-color fw-normal nowrap ms-2">{{weatherData.wind.speed}}m/s</span>
          </div>
          <div class="group-stat mb-2 d-flex align-items-center">
            <span class="light-color fw-normal nowrap">Humidity: {{weatherData.main.humidity}}%</span>
          </div>
          <div class="group-stat d-flex align-items-center">
            <span class="light-color fw-normal nowrap">Visibility: {{Math.round(weatherData.visibility / 1000).toFixed(1)}}km</span>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="group-stat mb-2 d-flex align-items-center">
            <img class="ico__pressure" src='@/assets/icons/pressure-gauge.png' alt="pressure-gauge">
            <span class="light-color fw-normal ms-2 nowrap">{{weatherData.main.pressure}}hPa</span>
          </div>
          <div class="group-stat mb-2 d-flex align-items-center">
            <span class="light-color fw-normal nowrap">Dew point: {{weatherData.main.temp_min}}℃</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-Settings" v-else>

    </div>
  </div>
  <!--Card-->
</template>


<script>
import {defineComponent} from 'vue';
import {mapState, mapActions} from 'vuex';
import axios from "axios";

export default defineComponent({
  data() {
    return {
      settings: false,
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
    arrowRotation() {
      if (this.$store.state.weatherData && this.$store.state.weatherData.wind) {
        const windDeg = this.$store.state.weatherData.wind.deg;
        return windDeg;
      }
      return 0;
    },
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
      this.fetchWeatherData({city});
    },
  }
});
</script>

<style scoped lang="scss">
.light-color {
  color: #1f1f1f
}
.weatherCard {
  background: #fff;
  width: 300px;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;

  .headerWidget {
    .cityName {
      font-weight: 600
    }

    .ico__Settings {
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
      margin-left: -17px;
      font-weight: 600;
    }

    img {
      width: 150px;
    }
  }

  .content-columns {
    .ico__ArrowWind, .ico__pressure {
      width: 20px;
    }
  }
}
</style>