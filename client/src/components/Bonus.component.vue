<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Bonos</h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-container class="border-container">
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="bono.cedula_empleado"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="bono.motivo"
                    :counter="50"
                    label="Montivo del bono"
                    :rules="motivoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="bono.cantidad"
                    :counter="50"
                    label="Cantidad"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="postBono"
                      class="btn-1"
                    >Nuevo Bono</v-btn>
                  </template>
                  <v-btn color="warning" :disabled="!valid" @click="reset">Borrar formulario</v-btn>
                  <template v-if="edit === true"></template>
                  <v-btn color="success" :disabled="!valid" @click="updateBono">Actualizar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6>
                <v-card>
                  <v-date-picker
                    v-model="bono.fecha"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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
                      <th class="th">Motivo</th>
                      <th class="th">Fecha</th>
                      <th class="th">Cantidad</th>
                      <th class="th">Apellido</th>
                      <th class="th">Nombre</th>
                      <th class="th">BORRAR</th>
                      <th class="th">Actualizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of allBonos" :key="item.id">
                      <td class="td">{{item.cedula_empleado}}</td>
                      <td class="td">{{item.motivo}}</td>
                      <td class="td">{{item.fecha}}</td>
                      <td class="td">{{item.cantidad}}</td>
                      <td class="td">{{item.p_apellido}}</td>
                      <td class="td">{{item.nombre}}</td>
                      <td class="td" @dblclick="deleteBono(item.id)">
                        DELETE
                        <v-icon small color="error" class="icons">delete</v-icon>
                      </td>
                      <td class="td" @click="getOneBono(item.id)">
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
import Bono from "../model/bonus.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo bono", "Todos los bonos"],
      valid: true,
      min: new Date().toISOString().substr(0, 10),
      bono: new Bono(),
      bono: [],
      edit: false,
      actEdit: "",
      cedulaRules: [
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos"
      ],
      motivoRules: [
        v => !!v || "Por favor especifique el motivo del bono",
        v => (v && v.length <= 200) || "El motivo excede la cantidad"
      ],
      cantidadRules: [
        v => !!v || "Por favor especifique el motivo del bono",
        v =>
          /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/.test(v) ||
          "La cantidad debe ser un valor numérico positivo"
      ]
    };
  },
  methods: {
    ...mapGetters(["", "oneBono"]),
    ...mapActions([
      "fetchBonos",
      "insertBono",
      "getBono",
      "updBono",
      "deletedBono"
    ]),
    postBono(bono) {
      this.insertBono(this.bono)
      this.bono = new Bono()
      this.fetchBonos()
      this.reset()
    },
    getOneBono(id) {
      if (this.edit === false) {
        this.getBono(id)
        this.bono = this.oneBono()
      }
    },
    deleteBono(id) {
      this.deletedBono(id)
      this.bono = new Bono()
      this.fetchBonos()
    },
    updateBono(bono) {
      this.updBono(this.bono)
      this.fetchBonos()
      this.reset()
      this.edit = false
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
      this.bono = new Bono()
    }
  },
  created() {
    this.fetchBonos() 
    this.bono = new Bono()
  },
  computed: mapGetters(["allBonos"])
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