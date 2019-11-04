<template>
  <v-container>
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
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      v-model="permiso.cedula_empleado"
                      :counter="9"
                      label="Cédula"
                      :rules="cedulaRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="permiso.descripcion"
                      :counter="50"
                      label="Motivo del permiso"
                      :rules="descripcionRules"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="permiso.costo_salarial"
                      :counter="50"
                      label="Costo salarial"
                      :rules="costoRules"
                      required
                    ></v-text-field>
                    <template v-if="edit===false">
                      <v-btn
                        :disabled="!valid"
                        color="success"
                        @click="postPermiso"
                        class="btn-1"
                      >Nuevo Permiso</v-btn>
                      <v-btn color="warning" @click="reset">Borrar formulario</v-btn>
                    </template>
                  </v-form>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 md6>
                  <v-card>
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
                        <th class="th">BORRAR</th>
                        <th class="th">Actualizar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item of allPermisos" :key="item.id">
                        <td class="td">{{item.cedula_empleado}}</td>
                        <td class="td">{{item.fecha}}</td>
                        <td class="td">{{item.descripcion}}</td>
                        <td class="td">{{item.costo_salarial}}</td>
                        <td class="td" @click="deletePermiso(item.cedula)">
                          DELETE
                          <v-icon small color="error" class="icons">delete</v-icon>
                        </td>
                        <td class="td" @click ="getOnePermiso(item.id)">
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
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Permiso from "../model/permiso.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo permiso", "Todos los permisos"],
      valid: true,
      min: new Date().toISOString().substr(0, 10),
      permiso: new Permiso(),
      permiso: [],
      edit: false,
      actEdit: "",
      cedulaRules: [
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos"
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
  methods: {
    ...mapGetters(["allPermiso", "onePermiso"]),
    ...mapActions(["fetchPermisos", "getPermiso", "insertPermiso"]),
    postPermiso(permiso) {
      this.insertPermiso(this.permiso);
    },
    deletePermiso(cedula_empleado) {
      this.deleteEmpleado(cedula_empleado);
    },
    getOnePermiso(id) {
      this.permiso = new Permiso();
      this.getPermiso(id);
      this.permiso = this.onePermiso();
      // console.log(this.onePermiso());
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
    this.fetchPermisos();
  },
  computed: mapGetters(["allPermisos"])
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