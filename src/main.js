import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import WeatherWidget from '@/components/WeatherWidget.vue';

import 'bootstrap/dist/css/bootstrap.css';


const app = createApp(App);
app.use(store);
app.component('weather-widget', WeatherWidget);
app.mount('#app');