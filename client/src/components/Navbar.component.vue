<template>
    <v-content>
      <v-container>
        <v-toolbar>
            <span v-if="isLoggedIn">
             <router-link to="/">Inicio</router-link> | 
          </span>
            <span v-if="isLoggedIn">
              <router-link to="/empleado">Empleados</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/bonos">Bonos</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/permisos">Permisos</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/incremento-salarial">Cambios salariales</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/horas-extra">Horas extra</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/vacaciones">Vacaciones</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/disciplina">Conductas</router-link> | 
            </span>
            <span v-if="isLoggedIn">
              <router-link to="/tareas">Tareas</router-link> | 
            </span>
      <v-spacer></v-spacer>
          <span v-if="isLoggedIn">
            <a @click="logout">Salir</a>
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