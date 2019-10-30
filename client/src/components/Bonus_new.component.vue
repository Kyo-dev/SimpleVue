<template>
  <v-container>
    <v-layout row wrap align-center>
      <v-flex xs12 md4>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="bono.cedula"
            :counter="9"
            label="Cédula"
            :rules="cedulaRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="bono.motivo"
            :counter="50"
            label="Montivo del bono"
            :rules="motivoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="bono.cantidad"
            :counter="50"
            label="Primer apellido"
            :rules="cantidadRules"
            required
          ></v-text-field>
          <template v-if="edit===false">
            <v-btn :disabled="!valid" color="success" @click="postBono" class="btn-1">Nuevo Bono</v-btn>
            <v-btn color="warning" @click="reset">Borrar formulario</v-btn>
        </template>
        </v-form>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 md6>
        <v-card>
          <v-date-picker
            v-model="bono.fecha"
            full-width
            locale="es"
            :min="min"
            header-color="primary"
            color="primary"
          ></v-date-picker>
        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
class Bono {
  constructor(cedula, motivo, cantidad, fecha) {
    (this.cedula = cedula),
      (this.motivo = motivo),
      (this.cantidad = cantidad),
      (this.fecha = fecha);
  }
}
export default {
  data() {
    return {
      valid: true,
      min: new Date().toISOString().substr(0, 10),
      bono: new Bono(),
      bono: [],
      edit: false,
      actEdit: "",
      cedulaRules: [
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos"
      ],
      motivoRules: [
        v => !!v || "Por favor especifique el motivo del bono",
        v => (v && v.length <= 200) || "El motivo excede la cantidad"
      ],
      cantidadRules: [
        v => !!v || "Por favor especifique el motivo del bono",
        v =>
          /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/.test(v) ||
          "La cantidad debe ser un valor numérico positivo"
      ]
    };
  },
  methods: {
    ...mapActions(["fetchBonos", "insertBono"]),
    postBono(bono){
        this.insertBono(this.bono)
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  created() {
    this.fetchBonos();
  }
};
</script>

<style>

.btn-1{
    padding: 1em;
}

</style>