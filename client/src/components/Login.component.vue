<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>Email</label>
     <input required v-model="email" type="email" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <label>Cedula</label>
     <input required v-model="cedula" type="text" placeholder="cedula"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
class User {
  constructor(cedula, email, password) {
    (this.cedula = cedula), (this.email = email), (this.password = password);
  }
}
export default {
  data() {
    return {
       email: "",
       password: "",
       cedula: ""
    };
  },
  methods: {
    login: function () {
        let _correo = this.email 
        let _clave = this.password
        let _cedula = this.cedula
        this.$store.dispatch('login', { _correo, _clave , _cedula})
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
};
</script>