<template>
  <div>
    <v-spacer></v-spacer>
    <br />
    <br />
    <table class="infoUsers">
      <thead>
        <tr>
          <th class="th">Cedula</th>
          <th class="th">Nombre</th>
          <th class="th">Primer apellido</th>
          <th class="th">Segundo apellido</th>
          <th class="th">Fecha de contrato</th>
          <th class="th">Correo electronico</th>
          <th class="th">Salario por hora</th>
          <th class="th">Jornada laboral</th>
          <th class="th">BORRAR</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of allEmpleados" :key="item.id">
          <td class="td">{{item.cedula}}</td>
          <td class="td">{{item.nombre}}</td>
          <td class="td">{{item.p_apellido}}</td>
          <td class="td">{{item.s_apellido}}</td>
          <td class="td">{{item.fecha_contrato}}</td>
          <td class="td">{{item.correo}}</td>
          <td class="td">{{item.salario_hora}}</td>
          <td class="td">{{item.jornada}}</td>
          <td class="td" @click="delEmpleado(item.cedula)">
            DELETE
            <v-icon small color="error" class="icons">delete</v-icon>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["fetchEmpleados", "deleteEmpleado"]),
    delEmpleado(cedula) {
      this.deleteEmpleado(cedula);
    },
    postEmpleado(empleado) {
      this.insertEmpleado(this.empleado);
    }
  },
  computed: mapGetters(["allEmpleados"]),
};
</script>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background: #c2c2c2;
}
tr:nth-of-type(odd) {
  background: #eee;
}
.th {
  background: #971cd9;
  color: white;
  font-weight: bold;
}
.td,
.th {
  padding: 6px;
  border: 1px solid #ccc;
  text-align: left;
  text-align: center;
}
.icons {
  cursor: pointer;
}
</style>