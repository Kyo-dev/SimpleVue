<template>
  <v-app>
    <v-content>
      <span v-if="isLoggedIn">
        <router-link to="/">Inicio</router-link> | 
      </span>
      <v-spacer></v-spacer>
      <!-- <span v-if="!isLoggedIn">
        <router-link to="/Login">Login</router-link> | 
      </span> -->
      <span v-if="isLoggedIn"><a @click="logout">Logout</a>
      </span>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
</script>