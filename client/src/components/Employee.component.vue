<template>
  <v-container>
<!-- SECTION  FORMULARIO -->
    <v-layout row wrap align-center>
      <v-flex xs12 md4>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="employee.cedula"
            :counter="30"
            label="Cédula"
            :rules="cedulaRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.nombre"
            :counter="30"
            label="Nombre"
            :rules="nombreRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.p_apellido"
            :counter="30"
            label="Primer apellido"
            :rules="p_apellidoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.s_apellido"
            :counter="30"
            label="Segundo apellido"
            :rules="s_apellidoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.correo"
            :counter="30"
            label="Correo electrónico"
            :rules="correoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.tipo_empleado"
            :counter="30"
            label="Cargo del empleado"
            :rules="cargoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.planilla"
            :counter="30"
            label="Planilla "
            :rules="planillaRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.salario_hora"
            :counter="30"
            label="Salario por hora"
            :rules="salarioRules"
            required
          ></v-text-field>
        </v-form>
        <!-- !SECTION  -->
      </v-flex>
      <!-- SECTION CALENDARIO -->
      <v-spacer></v-spacer>
      <v-flex xs12 md6>
        <v-sheet height="490">
          <v-card>
            <v-date-picker 
              v-model="employee.fecha_contrato"
              full-width
              locale="es"
              :min="min"
            ></v-date-picker>
          </v-card>
        </v-sheet>
      </v-flex>
      <!-- !SECTION  -->
    </v-layout>
  </v-container>
</template>


<script>
// import { mapGetters, mapActions } from "vuex";

class Employee {
  constructor(cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado, planilla, salario_hora) {
    (this.cedula = cedula),
    (this.nombre = nombre),
    (this.p_apellido = p_apellido),
    (this.s_apellido = s_apellido),
    (this.correo = correo),
    (this.fecha_contrato = fecha_contrato),
    (this.tipo_empleado = tipo_empleado),
    (this.planilla = planilla),
    (this.salario_hora = salario_hora);
  }
}

export default {
    data(){
        return{
            min: new Date().toISOString().substr(0, 10),
            valid: true,
            employee: new Employee(),
            employees: [],
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

            ],
            cargoRules: [

            ]
        }
    }
}

</script>

<style lang="stylus">

</style>