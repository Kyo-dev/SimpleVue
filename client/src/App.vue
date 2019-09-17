<template>
  <v-app>
    <v-content>
      <router-link to="/Home">Inicio</router-link> | 
      <router-link to="/Login">Login</router-link> | 
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
  }),
};
</script>
