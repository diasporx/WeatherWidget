<template>
  <WeatherWidget />
</template>

<script>
import WeatherWidget from './components/WeatherWidget.vue'

export default {
  name: 'App',
  components: {WeatherWidget}
}
</script>

<style lang="scss">
body {
  background: #d5d5d5;
  font-family: 'Ubuntu', sans-serif;
}
@font-face {
  font-family: 'Ubuntu';
  font-weight: 400;
  src: url("@/assets/font/Ubuntu-Regular.ttf") format('truetype'),
       url("@/assets/font/Ubuntu-Bold.ttf") format('truetype'),
       url("@/assets/font/Ubuntu-Medium.ttf") format('truetype'),
       url("@/assets/font/Ubuntu-Light.ttf") format('truetype');
}
</style>
