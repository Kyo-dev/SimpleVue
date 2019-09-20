<template>
  <v-container>
<!-- SECTION  FORMULARIO -->
    <v-layout row wrap align-center>
      <v-flex xs12 md4>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="employee.cedula"
            :counter="9"
            label="Cédula"
            :rules="cedulaRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.nombre"
            :counter="50"
            label="Nombre"
            :rules="nombreRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.p_apellido"
            :counter="50"
            label="Primer apellido"
            :rules="p_apellidoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.s_apellido"
            :counter="50"
            label="Segundo apellido"
            :rules="s_apellidoRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="employee.correo"
            :counter="200"
            label="Correo electrónico"
            :rules="correoRules"
            required
          ></v-text-field>
          <!-- <v-text-field
            v-model="employee.tipo_empleado"
            label="Cargo del empleado"
            :rules="cargoRules"
            required
          ></v-text-field> -->
          <v-text-field
            v-model="employee.salario_hora"
            label="Salario por hora"
            :rules="salarioRules"
            required
          ></v-text-field>
          <template v-if="edit ===false ">    
            <v-btn :disabled="!valid" color="success" @click="postEmployee">Nuevo empleado</v-btn>
            <!-- <v-btn color="warning" @click="reset">Borrar formulario</v-btn> -->
          </template>
          <!-- <template v-else="">
            <v-btn :disabled="!valid" color="success" @click="POST_Activitie">Actualizar</v-btn>
          </template> -->
        </v-form>
        <!-- !SECTION  -->
      </v-flex>
      <!-- SECTION CALENDARIO -->
      <v-spacer></v-spacer>
      <v-flex xs12 md6>
        <v-sheet height="450">
          <p>Cargo del empleado</p>
          <v-radio-group v-model="employee.tipo_empleado" row>
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
    <!--SECTION TABLA  -->
    <!--
<v-spacer></v-spacer>
<br>
<br>
 <table >
	<thead>
	<tr>
		<th>Cedula</th>
		<th>Nombre</th>
		<th>Primer apellido</th>
    <th>Segundo apellido</th>
    <th>Fecha de contrato</th>
    <th>Correo electronico</th> 
    <th>Salario por hora</th> 
	</tr>
	</thead>
	<tbody>
	<tr v-for="item of allEmployees" :key="item.id" >
		<td>{{item.cedula}}</td>
		<td>{{item.nombre}}</td>
		<td>{{item.p_apellido}}</td>
		<td>{{item.s_apellido}}</td>
		<td>{{item.fecha_contrato}}</td>
		<td>{{item.correo}}</td>
		<td>{{item.salario_hora}}</td>
    <!<td @click="deleteEmployee(item.cedula)"><v-icon small color="error" class="icons"></v-icon></td> -->
		<!-- <td @click="putEmployee(item._id)"><v-icon small color="warning" class="icons">create</v-icon></td> -->
		<!-- <td>{{item.date.substr(0,10)}}</td> -->

    <!-- 
      _cedula: employee.cedula,
            _nombre: employee.nombre,
            _p_apellido: employee.p_apellido,
            _s_apellido: employee.s_apellido,
            _correo: employee.correo,
            _fecha_contrato: employee.fecha_contrato,
            _tipo_empleado: employee.tipo_empleado,
            _salario_hora: employee.salario_hora

     -->
		<!-- <td @click="DELETE_Activitie(item._id)"><v-icon small color="error" class="icons">delete</v-icon></td>
		<td @click="UPDATE_Activitie(item._id)"><v-icon small color="warning" class="icons">create</v-icon></td> 
	</tr>
	</tbody>
</table>
-->
    <!-- !SECTION  -->
  </v-container>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

class Employee {
  constructor(cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado, salario_hora) {
    (this.cedula = cedula),
    (this.nombre = nombre),
    (this.p_apellido = p_apellido),
    (this.s_apellido = s_apellido),
    (this.correo = correo),
    (this.fecha_contrato = fecha_contrato),
    (this.tipo_empleado = tipo_empleado),
    (this.salario_hora = salario_hora)
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
            // items: ['Calle Central'],
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
            ]
        }
    },
    
 methods: {
    ...mapActions(["fetchEmployee", "insertEmployee"]),
    postEmployee(employee){
      this.insertEmployee(this.employee)
    }
   },

  //  computed: mapGetters(["allEmployees"]),
    created() {
      this.fetchEmployee();
      console.log(this.fetchEmployee())
   },

}

</script>

<style lang="stylus">

</style>