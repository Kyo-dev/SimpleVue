<template>
<div>
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
    <th>BORRAR</th> 
	</tr>
	</thead>
	<tbody>
	<tr v-for="item of allEmployees" :key="item.id" >
		<td>{{item.cedula}}</td>
		<td>{{item.nombre}}</td>
		<td>{{item.p_apellido}}</td>
		<td>{{item.s_apellido}}</td>
		<td>{{item.fecha_contrato.substr(0,10)}}</td>
		<td>{{item.correo}}</td>
		<td>{{item.salario_hora}}</td>
		<td @click="delEmployee(item.cedula)">DELETE<v-icon small color="error" class="icons">delete</v-icon></td>
    <!-- <td @click="deleteEmployee(item.cedula)"><v-icon small color="error" class="icons"></v-icon></td> -->
		<!-- <td @click="putEmployee(item._id)"><v-icon small color="warning" class="icons">create</v-icon></td> -->
		<!-- <td>{{item.date.substr(0,10)}}</td> -->
		<!-- <td @click="UPDATE_Activitie(item._id)"><v-icon small color="warning" class="icons">create</v-icon></td> -->
	</tr>
	</tbody>
</table>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {

 methods: {
	...mapActions(["fetchEmployee", "deleteEmployee"]),
	delEmployee(cedula){
		console.log('SOY EL deleteEmployee' + cedula)
		this.deleteEmployee(cedula)
	},
	postEmployee(employee){
      this.insertEmployee(this.employee)
    }
   },

   computed: mapGetters(["allEmployees"]),
    created() {
      this.fetchEmployee();
   },
}
</script>
<style>

</style>