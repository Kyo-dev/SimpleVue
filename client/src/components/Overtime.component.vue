<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Horas extras</h1>
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
                <v-form ref="form" v-model="valid" v-if="!cambiarHorasExtra">
                  <v-text-field
                    v-model="obj_horasExtra.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="obj_horasExtra.motivo"
                    :counter="300"
                    label="Motivo de las horas extra"
                    :rules="motivoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="obj_horasExtra.cantidad_horas"
                    label="Cantidad de horas"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="enviarHorasExtra()"
                      class="btn-1, btn"
                    >registrar horas extra</v-btn>
                  </template>
                  <template v-if="edit === false ">
                    <v-btn class="btn-1, btn" color="warning" @click="cancelar">Cancelar</v-btn>
                  </template>
                </v-form>
                <v-form ref="form" v-model="valid" v-if="cambiarHorasExtra">
                  <h3>Editar</h3>
                  <v-text-field
                    v-model="horasExtraEditar.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="horasExtraEditar.motivo"
                    :counter="300"
                    label="Motivo de las horas extra"
                    :rules="motivoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="horasExtraEditar.cantidad_horas"
                    label="Cantidad de horas"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="actualizarHorasExtra(horasExtraEditar)"
                      class="btn-1, btn"
                    >Actualizar horas extra</v-btn>
                  </template>
                  <v-btn class="btn-1, btn" color="warning" @click="cancelar">Cancelar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6 v-if="!cambiarHorasExtra">
                <v-card class="container-calendario">
                  <v-date-picker
                    v-model="obj_horasExtra.fecha"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
              <v-flex xs12 md6 v-if="cambiarHorasExtra">
                <v-card class="container-calendario">
                  <v-date-picker
                    v-model="horasExtraEditar.fecha"
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
            <v-container>
              <div>
                <v-spacer></v-spacer>
                <br />
                <br />
                <table class="infoUsers">
                  <thead>
                    <tr>
                      <th class="th">id</th>
                      <th class="th">Cedula</th>
                      <th class="th">Apellido</th>
                      <th class="th">Nombre</th>
                      <th class="th">Fecha</th>
                      <th class="th">Motivo</th>
                      <th class="th">Horas</th>
                      <th class="th">Actualizar</th>
                      <th class="th">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of obj_horasExtras" :key="item.id">
                      <td class="td">{{item.id}}</td>
                      <td class="td">{{item.cedula}}</td>
                      <td class="td">{{item.p_apellido}}</td>
                      <td class="td">{{item.nombre}}</td>
                      <td class="td">{{item.fecha}}</td>
                      <td class="td">{{item.motivo}}</td>
                      <td class="td">{{item.cantidad_horas}}</td>
                      <td>
                        <v-btn
                          color="info"
                          class="btn-1, btn"
                          @click="editarHorasExtra(item.id)"
                        >Actualizar</v-btn>
                      </td>
                      <td>
                        <v-btn
                          color="error"
                          class="btn-1, btn"
                          @click="eliminarHorasExtra(item.id)"
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
import HorasExtra from "../model/overtime.model";

export default {
  data() {
    return {
      tab: [],
      items: ["Asignar horas extra", "Información sobre horas extra"],
      obj_horasExtra: new HorasExtra(),
      obj_horasExtras: [],
      horasExtraEditar: {},
      cambiarHorasExtra: false,
      min: new Date().toISOString().substr(0, 10),
      valid: true,
      edit: false,

      cedulaRules: [
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres"
      ],
      motivoRules: [
        v => !!v || "Por favor describa el motivo del permiso",
        v => (v && v.length <= 200) || "El motivo excede la cantidad"
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
    this.obtenerHorasExtra();
  },
  methods: {
    enviarHorasExtra() {
      const data = {
        _cedula: this.obj_horasExtra.cedula,
        _cantidad_horas: this.obj_horasExtra.cantidad_horas,
        _motivo: this.obj_horasExtra.motivo,
        _fecha: this.obj_horasExtra.fecha
      };
      this.axios
        .post(`/horas-extra`, data)
        .then(res => {
          this.obj_horasExtras.push(res.data);
          this.cancelar();
          this.obtenerHorasExtra();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    obtenerHorasExtra() {
      this.axios
        .get("/horas-extra")
        .then(res => {
          this.obj_horasExtras = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    editarHorasExtra(id) {
      this.cambiarHorasExtra = true;
      this.axios
        .get(`/horas-extra/${id}`)
        .then(res => {
          this.horasExtraEditar = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    actualizarHorasExtra(item) {
      const data = {
        _cedula: this.horasExtraEditar.cedula,
        _cantidad_horas: this.horasExtraEditar.cantidad_horas,
        _motivo: this.horasExtraEditar.motivo,
        _fecha: this.horasExtraEditar.fecha
      };
      this.axios
        .put(`/horas-extra/${item.id}`, data)
        .then(res => {
          this.obtenerHorasExtra();
          this.cancelar();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    eliminarHorasExtra(id) {
      this.axios
        .delete(`/horas-extra/${id}`)
        .then(res => {
          this.obtenerHorasExtra();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    cancelar() {
      this.$refs.form.reset();
      this.cambiarHorasExtra = false;
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
.btn {
  width: 100%;
  margin: 0.6em;
}
.container-calendario {
  margin: 1.4em;
}
</style>