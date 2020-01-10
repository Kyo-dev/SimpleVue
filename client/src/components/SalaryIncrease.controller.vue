<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Salarios</h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container class="border-container">
          <v-card flat>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>

                <v-form ref="form" v-model="valid" v-if="!cambiarSalario">
                  <v-text-field
                    v-model="salario.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="salario.cantidad"
                    label="Cantidad por hora"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="enviarAumento()"
                      class="btn-1 btn"
                    >Nuevo aumento</v-btn>
                  </template>
                  
                  <template v-if="edit === true"></template>
                  
                </v-form>

                <v-form ref="form" v-model="valid" v-if="cambiarSalario">
                  <h3>Editar</h3>
                  <v-text-field
                    v-model="salarioEditar.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="salarioEditar.cantidad"
                    label="Cantidad por hora"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="actualizarSalario(salarioEditar)"
                      class="btn-1 btn"
                    >Nuevo aumento</v-btn>
                  </template>
                  
                  <template v-if="edit === true"></template>
                  
                </v-form>

              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6 v-if="!cambiarSalario">
                <v-card>
                  <v-date-picker
                    v-model="salario.fecha"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>

              <v-flex xs12 md6 v-if="cambiarSalario">
                <v-card>
                  <v-date-picker
                    v-model="salarioEditar.fecha"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h1>Preguntar si se puede hacer rebajas en el salario</h1>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <div>
                <v-spacer></v-spacer>
                <br />
                <br />
                <table class="infoUsers">
                  <thead>
                    <tr>
                      <th class="th">Cedula</th>
                      <th class="th">Apellido</th>
                      <th class="th">Nombre</th>
                      <th class="th">Aumento otorgado <br> por hora laboral</th>
                      <th class="th">Fecha</th>
                      <th class="th">Actualizar</th>
                      <th class="th">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of salarios" :key="item.id">
                      <td class="td">{{item.cedula}}</td>
                      <td class="td">{{item.p_apellido}}</td>
                      <td class="td">{{item.nombre}}</td>
                      <td class="td">{{item.cantidad}}</td>
                      <td class="td">{{item.fecha}}</td>
                      <td>
                        <v-btn
                          color="info"
                          class="btn-1, btn"
                          @click="editarSalario(item.id)"
                        >Actualizar</v-btn>
                      </td>
                      <td>
                        <v-btn
                          color="error"
                          class="btn-1, btn"
                          @click="eliminarAumento(item.id, item.cedula)"
                        >Eliminar</v-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Salario from "../model/salary.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Aumento salarial", "Rebaja salarial", "Información"],
      salario: new Salario(),
      salarios: [],
      min: new Date().toISOString().substr(0, 10),
      cambiarSalario: false,
      salarioEditar: {},
      valid: false,
      edit: false,
      cedulaRules: [
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres"
      ],
      cantidadRules: [
        v => !!v || "Por favor especifique el costo",
        v =>
          /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/.test(v) ||
          "La cantidad debe ser un valor numérico positivo"
      ]
    };
  },
  created() {
     this.obtenerSalarios()
  },
  methods: {
    enviarAumento(){
      const data = {
        _cedula: this.salario.cedula,
        _cantidad: this.salario.cantidad,
        _fecha: this.salario.fecha
      }
      this.axios
        .post('/salarios', data)
        .then(res =>{
          this.salarios.push(res.data)
          this.obtenerSalarios()
        })
        .catch(e => {
          console.log(e.response)
        })
    },
    obtenerSalarios(){
      this.axios
        .get('/salarios')
        .then(res => {
          this.salarios = res.data
        })
        .catch( e =>{
          console.log(e.response)
        })
    },
    editarSalario(id){
      this.cambiarSalario = true;
      this.axios
        .get(`/salarios/${id}`)
        .then(res => {
          this.salarioEditar = res.data
        })
        .catch(e =>{
          console.log(e.response)
        })
    },
    eliminarAumento(id, cedula){
      const data = {_cedula: cedula}
      console.log(cedula)
      console.log(id)
      this.axios
        .put(`/salarios/${id}`, data)
        .then(res =>{
          this.obtenerSalarios()
        })
        .catch(e => {
          console.log(e.response)
        })
    }
  }
};
</script>

<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
.border-container {
  padding: 0em 2em 0em 2em;
}
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
  background: #356859;
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
.btn{
  display: block;
}
</style>