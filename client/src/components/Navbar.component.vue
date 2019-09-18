<template>
    <v-content>
      <v-container>
        <v-toolbar>
        <span v-if="isLoggedIn">
        <router-link to="/">Inicio</router-link> | 
      </span>
      <span v-if="isLoggedIn">
        <router-link to="/employee">Empleados</router-link> | 
      </span>
      <v-spacer></v-spacer>
      <span v-if="isLoggedIn"><a @click="logout">Logout</a>
      </span>
        </v-toolbar>
        <router-view/>
      </v-container>
    </v-content>
 
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