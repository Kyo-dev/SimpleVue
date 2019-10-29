<template>
  <v-container>
<!-- SECTION  Left -->
    <v-layout row wrap align-center>
      <v-flex xs12 md4>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="empleado.cedula"
            :counter="9"
            label="Cédula"
            :rules="cedulaRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="empleado.nombre"
            :counter="50"
            label="Nombre"
            :rules="nombreRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="empleado.p_apellido"
            :counter="50"
            label="Primer apellido"
            :rules="p_apellidoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="empleado.s_apellido"
            :counter="50"
            label="Segundo apellido"
            :rules="s_apellidoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="empleado.correo"
            :counter="200"
            label="Correo electrónico"
            :rules="correoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="empleado.salario_hora"
            label="Salario por hora"
            :rules="salarioRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="empleado.jornada"
            label="Jornada diaria"
            :rules="jornadaRules"
            required
          ></v-text-field>
         <v-text-field
            v-model="empleado.numero"
            label="Número telefónico"
            :counter="8"
            :rules="numeroRules"
            required
          ></v-text-field>
          <v-radio-group v-model="empleado.tipo_telefono" row>
            <v-radio
             label="Casa" 
             value="1"
             color="primary"
             :rules="telefonoRules"
             ></v-radio>
            <v-radio 
              label="Celular" 
              value="2"
              color="primary"
              :rules="telefonoRules"
              ></v-radio>
            </v-radio-group>
      </v-form>
        <!-- !SECTION  -->
      </v-flex>
      <!-- SECTION Right -->
      <v-spacer></v-spacer>
      <v-flex xs12 md6>
        <v-sheet height="500">
          <p>Cargo del empleado</p>
          <v-radio-group v-model="empleado.tipo_empleado" row>
            <v-radio
             label="Doctor" 
             value="2"
             color="primary"
             :rules="cargoRules"
             ></v-radio>
            <v-radio 
              label="Dependiente" 
              value="3"
              color="primary"
              :rules="cargoRules"
              ></v-radio>
            <v-radio 
              label="Mensajero" 
              value="4"
              color="primary"
              :rules="cargoRules"
              ></v-radio>
          </v-radio-group>
          <v-card>
            <v-date-picker 
              v-model="empleado.fecha_contrato"
              full-width
              locale="es"
              :min="min"
              header-color="primary"
              color="primary"
            ></v-date-picker>
          </v-card>
            <template v-if="edit ===false ">    
              <br>
            <v-btn :disabled="!valid" color="success" @click="postEmpleado">Nuevo empleado</v-btn>
            <v-btn color="warning" @click="reset">Borrar formulario</v-btn>
          </template>
        </v-sheet>
      </v-flex>
      <!-- !SECTION  -->
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

class Empleado {
  constructor(cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado, salario_hora, jornada, numero, tipo_telefono) {
    (this.cedula = cedula),
    (this.nombre = nombre),
    (this.p_apellido = p_apellido),
    (this.s_apellido = s_apellido),
    (this.correo = correo),
    (this.fecha_contrato = fecha_contrato),
    (this.tipo_empleado = tipo_empleado),
    (this.salario_hora = salario_hora),
    (this.jornada = jornada),
    (this.numero = numero),
    (this.tipo_telefono = tipo_telefono)
  }
}

export default {
    data(){
        return{
            min: new Date().toISOString().substr(0, 10),
            valid: true,
            empleado: new Empleado(),
            empleado: [],
            edit: false,
            actEdit: '', 
             cedulaRules: [        
              v => !!v || "Por favor ingrese la cédula del empleado",
              v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres",
              v => /^\d+$/.test(v) || "Solo se admiten números positivos"
             ],
             nombreRules: [
              v => !!v || "Por favor ingrese el nombre del nuevo empleado",
              v => (v && v.length <= 50) || "El nombre es muy grande"
             ],
            p_apellidoRules: [
              v => !!v || "Por favor ingrese el primer apellido",
              v => (v && v.length <= 50) || "El primer apellido es muy grande"
            ],
            s_apellidoRules: [
              v => !!v || "Por favor ingrese el primer apellido",
              v => (v && v.length <= 50) || "El segundo apellido es muy grande"
            ],
            correoRules: [
              v => !!v || "Por favor ingrese el correo del empleado",
              v => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(v) || "Error el escribir el correo"
            ],
            cargoRules: [
              v => !!v || "Por favor seleccione un cargo"
            ],
            salarioRules: [
              v => !!v || "Por favor ingrese el salario por hora del nuevo empleado",
              v => /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/.test(v) || "El salario debe llevar 2 decimales, ejemplo 1234.56"
            ],
            jornadaRules: [
              v => !!v || "Por favor ingrese el salario por hora del nuevo empleado",
              v => (v && v.length == 1) || "No es posible trabajar mas de 9 horas al día",
              v => /^\d+$/.test(v) || "Solo se admiten números positivos"
            ],
            numeroRules: [
              v => !!v || "Por favor ingrese el numero del empleado",
              v => (v && v.length == 8) || "La numero debe ser de 8 caracteres",
            ],
            telefonoRules:[
              v => !!v || "Por favor selecciones un tipo de telefono"
            ]
        }
    },

 methods: {
    ...mapActions(["fetchEmpleado", "insertEmpleado"]),
    postEmpleado(empleado){
      this.insertEmpleado(this.empleado)
      computed: mapGetters(["allEmpleados"])
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
      this.fetchEmpleado();
   },
}

</script>

<style lang="stylus">

</style>