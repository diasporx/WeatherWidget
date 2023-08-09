<script>
import Settings from '@/components/Settings.vue';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
  components: { Settings },
  data() {
    return {
      settings: false,
    };
  },
  computed: {
    ...mapState(['weatherData', 'cities']),
    weatherIconPath() {
      if (!this.weatherData) {
        return require(`@/assets/weather-images/cloudy-day.svg`);
      }
      const weatherConditions = this.weatherData.weather[0].main;
      const iconType = this.getIconTypeForCity(this.weatherData.timezone);
      const iconPath = {
        Clouds: 'cloudy',
        Clear: iconType,
        Haze: 'haze',
        Thunderstorm: 'thunder',
        Rain: 'rainy',
        Drizzle: 'drizzle',
        Snow: 'snowy',
        Smoke: 'smoke',
        Fog: 'fog',
        Hail: 'hail',
      }[weatherConditions] || 'cloudy';
      return require(`@/assets/weather-images/${iconPath}.svg`);
    },
  },
  created() {
    if (this.cities.length > 0) {
      this.fetchWeatherForCity(this.cities[0]);
    } else {
      this.initWeatherData();
    }
  },
  methods: {
    ...mapActions(['fetchWeatherData', 'initWeatherData']),
    getCurrentTimeForCity(cityTimezoneOffset) {
      const now = new Date();
      const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      return new Date(utcTime.getTime() + cityTimezoneOffset * 1000);
    },
    getIconTypeForCity(cityTimezoneOffset) {
      const hour = this.getCurrentTimeForCity(cityTimezoneOffset).getHours();
      return hour > 18 || hour < 6 ? 'night' : 'day';
    },
    async fetchWeatherForCity(city) {
      await this.fetchWeatherData({ city });
    },
    degToCompass(degrees) {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const index = Math.round((degrees % 360) / 45);
      return directions[index % 8];
    },
  },
  watch: {
    cities: {
      handler(cities) {
        localStorage.setItem('cities', JSON.stringify(cities));
        this.fetchWeatherForCity(this.cities[0]);
      },
      deep: true,
    },
  },
});
</script>