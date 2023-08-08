<template>
  <div class="bg-test d-flex vh-100 align-items-center justify-content-center">
    <WeatherWidget />
  </div>
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
  font-family: 'Ubuntu', sans-serif;
}
button {
  outline: none;
  border: none;
  background: transparent;
}
.bg-test {
  background: #6c6c6c;
}
.nowrap {
  white-space: nowrap;
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
