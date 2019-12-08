<template>
  <div>
    <v-form class="login size-form" ref="form" @submit.prevent="login" v-model="valid">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Iniciar Sesión</h1>
      <v-text-field
        :counter="200"
        label="Correo electrónico"
        :rules="correoRules"
        required
        v-model="email"
        type="email"
      ></v-text-field>
      <v-text-field
        required
        :counter="100"
        label="Contraseña"
        :rules="claveRules"
        v-model="password"
        type="password"
      ></v-text-field>
      <div class="content-btn">
        <v-btn class="btn" :disabled="!valid" color="success" type="submit">Iniciar sesión</v-btn>
        <v-btn class="btn" color="warning" @click="reset">Borrar formulario</v-btn>
      </div>
    </v-form>
  </div>
  <!-- 
  -->
</template>

<script>
class User {
  constructor(cedula, email, password) {
    (this.email = email), (this.password = password);
  }
}
export default {
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      correoRules: [
        v => !!v || "Por favor ingrese su correo",
        v =>
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            v
          ) || "Error el escribir el correo"
      ],
      claveRules: [
        v => !!v || "Por favor su contraseña",
        v => (v && v.length >= 5) || "La clave debe ser más grande"
      ]
    };
  },
  methods: {
    login: function() {
      let _correo = this.email;
      let _clave = this.password;
      this.$store
        .dispatch("login", { _correo, _clave })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
<style>
.size-form {
  margin: 4em 15rem;
  display: flex;
  flex-direction: column;
}
.btn {
  margin: 1em 1.4em 0 0;
  justify-content: center;
  align-content: center;
  height: auto;
  width: auto;
}
</style>