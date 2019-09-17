<template>
  <!-- <v-app>
    <v-content>
      <router-link to="/Home">Inicio</router-link> | 
      <router-link to="/Login">Login</router-link> | 
      <router-view/>
    </v-content>
  </v-app> -->
  <div>
    <Navbar/>
  </div>
</template>

<script>

import Navbar from '../src/views/Navbar'
// import HelloWorld from '../components/HelloWorld';

export default {
  name: "App",
  components: {
    Navbar,
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  }
}
</script>

<style>
    
</style>