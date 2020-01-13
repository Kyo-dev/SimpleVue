<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Permisos</h1>
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
                <!-- FORMULARIO PARA INSERTAR -->
                <v-form ref="form" v-model="valid" v-if="!cambiarPermiso">
                  <v-text-field
                    v-model="permiso.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="permiso.descripcion"
                    :counter="300"
                    label="Motivo del permiso"
                    :rules="descripcionRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="permiso.costoSalarial"
                    label="Costo salarial"
                    :rules="costoRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="enviarPermiso"
                      class="btn-1 btn"
                    >Nuevo Permiso</v-btn>
                  </template>
                  <template v-if="edit === false ">
                    <v-btn class="btn-1, btn" color="warning" @click="cancelar">Cancelar</v-btn>
                  </template>
                </v-form>
                <!-- FORMULARIO PARA EDITAR -->
                <v-form ref="form" v-model="valid" v-if="cambiarPermiso">
                  <h3>Editar permiso</h3>
                  <v-text-field
                    v-model="permisoEditar.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="permisoEditar.descripcion"
                    :counter="300"
                    label="Motivo del permiso"
                    :rules="descripcionRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="permisoEditar.costoSalarial"
                    label="Costo salarial"
                    :rules="costoRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="actualizarPermiso(permisoEditar)"
                      class="btn-1 btn"
                    >Editar Permiso</v-btn>
                  </template>
                  <v-btn class="btn-1, btn" color="warning" @click="cancelar">Cancelar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6 v-if="!cambiarPermiso">
                <v-card class="container-calendario">
                  <v-date-picker
                    v-model="permiso.fecha"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
              <v-flex xs12 md6 v-if="cambiarPermiso">
                <v-card class="container-calendario">
                  <v-date-picker
                    v-model="permisoEditar.fecha"
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
                      <th class="th">Cedula</th>
                      <th class="th">Fecha</th>
                      <th class="th">Descripcion</th>
                      <th class="th">Costo Salarial</th>
                      <th class="th">Actualizar</th>
                      <th class="th">Borrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="permiso of permisos" :key="permiso.id">
                      <td class="td">{{permiso.cedula}}</td>
                      <td class="td">{{permiso.fecha}}</td>
                      <td class="td">{{permiso.descripcion}}</td>
                      <td class="td">{{permiso.costoSalarial}}</td>
                      <td>
                        <v-btn
                          color="info"
                          class="btn-1, btn"
                          @click="editarPermiso(permiso.id)"
                        >Actualizar</v-btn>
                      </td>
                      <td>
                        <v-btn
                          color="error"
                          class="btn-1, btn"
                          @click="eliminarPermiso(permiso.id)"
                        >Borrar</v-btn>
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
import Permiso from "../model/permits.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo permiso", "Todos los permisos"],
      valid: false,
      min: new Date().toISOString().substr(0, 10),
      permiso: new Permiso(),
      permisos: [],
      permisoEditar: {},
      edit: false,
      actEdit: "",
      cambiarPermiso: false,
      cedulaRules: [
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres"
      ],
      descripcionRules: [
        v => !!v || "Por favor describa el motivo del permiso",
        v => (v && v.length <= 200) || "El motivo excede la cantidad"
      ],
      costoRules: [
        v => !!v || "Por favor especifique el costo"
        // v =>
        //   /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/.test(v) ||
        //   "La cantidad debe ser un valor numérico positivo"
      ]
    };
  },
  created() {
    this.obtenerPermisos();
  },
  methods: {
    enviarPermiso() {
      const data = {
        _cedula: this.permiso.cedula,
        _descripcion: this.permiso.descripcion,
        _costoSalarial: this.permiso.costoSalarial,
        _fecha: this.permiso.fecha
      };
      this.axios
        .post("/permisos", data)
        .then(res => {
          this.permisos.push(res.data);
          this.cancelar();
          this.obtenerPermisos();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    obtenerPermisos() {
      this.axios
        .get("/permisos")
        .then(res => {
          console.log(res);
          this.permisos = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    editarPermiso(id) {
      this.cambiarPermiso = true;
      console.log(id);
      this.axios
        .get(`/permisos/${id}`)
        .then(res => {
          console.log(res.data);
          this.permisoEditar = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    actualizarPermiso(item) {
      const data = {
        _fecha: this.permisoEditar.fecha,
        _descripcion: this.permisoEditar.descripcion,
        _costoSalarial: this.permisoEditar.costoSalarial
      };
      this.axios.put(`/permisos/${item.id}`, data).then(res => {
        this.obtenerPermisos();
        this.cancelar();
      });
    },
    eliminarPermiso(id) {
      console.log(id);
      this.axios
        .delete(`/permisos/${id}`)
        .then(res => {
          this.obtenerPermisos();
        })
        .catch(e => {
          console.log(e.permisos);
        });
    },
    cancelar() {
      this.$refs.form.reset();
      this.cambiarPermiso = false;
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