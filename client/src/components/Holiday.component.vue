<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Vacaciones</h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-container class="border-container">
          <v-card flat>
            <v-row justify="center">
              <v-col cols="12" md="5">
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="vacaciones.cedula_empleado"
                    :counter="9"
                    label="Cédula"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="nuevasVacaciones"
                      class="btn-1"
                    >Nuevo Permiso</v-btn>
                  </template>
                  <v-btn color="warning" :disabled="!valid" @click="reset">Borrar formulario</v-btn>
                  <template v-if="edit === true"></template>
                  <v-btn color="success" :disabled="!valid" @click="actualizarVacaciones">Actualizar</v-btn>
                </v-form>
              </v-col>
            </v-row>
            <v-row row wrap align-center>
              <v-flex xs12 md5>
                <h1 color="primary">Fecha salida</h1>
                <v-card>
                  <v-date-picker
                    v-model="vacaciones.fecha_salida"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md5>
                <h1 color="primary">Fecha entrada</h1>
                <v-card>
                  <v-date-picker
                    v-model="vacaciones.fecha_entrada"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
            </v-row>
          </v-card>
        </v-container>
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
                      <th class="th">Fecha salida</th>
                      <th class="th">Fecha entrada</th>
                      <th class="th">BORRAR</th>
                      <th class="th">Actualizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of allVacaciones" :key="item.id">
                      <td class="td">{{item.cedula}}</td>
                      <td class="td">{{item.p_apellido}}</td>
                      <td class="td">{{item.nombre}}</td>
                      <td class="td">{{item.fecha_salida}}</td>
                      <td class="td">{{item.fecha_entrada}}</td>

                      <td class="td icons">
                        DELETE
                        <v-icon small color="error" @click="borrarVacacioenes(item.id)" class="icons">delete</v-icon>
                      </td>
                      <td class="td icons" @click="vacacionesID(item.id)" >
                        actualizar
                        <v-icon small color="error" class="icons">delete</v-icon>
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
import { mapGetters, mapActions } from "vuex";
import Vacaciones from "../model/vacaciones.model";
import axios from "axios";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevas vacaciones", "Información de vacaciones"],
      vacaciones: new Vacaciones(),
      vacaciones: [],
      valid: false,
      min: new Date().toISOString().substr(0, 10),
      edit: false
    };
  },
  methods: {
    ...mapGetters(["", "oneVacacion"]),
    ...mapActions(["fetchVacaciones", "insertarVacaciones", "obtenerVacacionesID", "updVacaciones", "deletedVacaciones"]),
    nuevasVacaciones(vacaciones) {
      this.insertarVacaciones(this.vacaciones)
      console.log(this.vacaciones)
      this.reset()
      this.fetchVacaciones()
    },
    vacacionesID(id){
      if (this.edit === false) {
        this.obtenerVacacionesID(id)
        this.vacaciones = this.oneVacacion()
        console.log(this.vacaciones)
      }
    },
    actualizarVacaciones(vacaciones) {
      this.updVacaciones(this.vacaciones)
      console.log(this.vacaciones)
      this.fetchVacaciones()
      this.reset()
      this.edit = false
    },
    borrarVacacioenes(id) {
      this.deletedVacaciones(id)
      this.vacaciones = new Vacaciones()
      this.fetchVacaciones()
    },
    reset() {
      this.$refs.form.reset()
      this.vacaciones = new Vacaciones()
    }
  },
  created() {
    this.fetchVacaciones();
  },
  computed: mapGetters(["allVacaciones"])
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
</style>