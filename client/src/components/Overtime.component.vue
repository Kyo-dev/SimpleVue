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
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="obj_horasExtra.cedula_empleado"
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
                      @click="postHoraExtra"
                      class="btn-1 btn"
                    >registrar horas extra</v-btn>
                  </template>
                  <v-btn class="btn" color="warning" :disabled="!valid" @click="reset">Borrar formulario</v-btn>
                  <template v-if="edit === true"></template>
                  <v-btn class="btn" color="success" :disabled="!valid" @click="updateHoraExtra">Actualizar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6>
                <v-card>
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
                      <th class="th">BORRAR</th>
                      <th class="th">Actualizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of allHorasExtra" :key="item.id">
                      <td class="td">{{item.id}}</td>
                      <td class="td">{{item.cedula_empleado}}</td>
                      <td class="td">{{item.p_apellido}}</td>
                      <td class="td">{{item.nombre}}</td>
                      <td class="td">{{item.fecha}}</td>
                      <td class="td">{{item.motivo}}</td>
                      <td class="td">{{item.cantidad_horas}}</td>
                      <td class="td icons" @dblclick="deleteHora(item.id)">
                        DELETE
                        <v-icon small color="error" class="icons">delete</v-icon>
                      </td>
                      <td class="td icons" @click="getOneHora(item.id)">
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
import { mapActions, mapGetters } from "vuex";
import HorasExtra from "../model/overtime.model";

export default {
  data() {
    return {
      tab: [],
      items: ["Asignar horas extra", "Información sobre horas extra"],
      obj_horasExtra: new HorasExtra(),
      obj_horasExtra: [],
      valid: false,
      min: new Date().toISOString().substr(0, 10),
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
  methods: {
    ...mapGetters(["","oneHoraExtra"]),
    ...mapActions([
      "fetchHorasExtra",
      "insertHoraExtra",
      "getHoraExtra",
      "updHoraExtra",
      "deletedHoraExtra"
      ]),
    postHoraExtra(obj_horasExtra){
      this.insertHoraExtra(this.obj_horasExtra)
      this.obj_horasExtra = new HorasExtra
      this.reset()
      this.fetchHorasExtra()
    },
    getOneHora(id) {
      if (this.edit === false) {
        this.obj_horasExtra = new HorasExtra
        this.getHoraExtra(id)
        this.obj_horasExtra = this.oneHoraExtra()
      }
    },
    updateHoraExtra(obj_horasExtra) {
      this.updHoraExtra(this.obj_horasExtra)
      this.edit = false
      this.reset()
      this.fetchHorasExtra()
    },
    deleteHora(id) {
      this.deletedHoraExtra(id)
      this.obj_horasExtra = new HorasExtra()
      this.fetchHorasExtra()
    },

    reset() {
      this.$refs.form.reset();
      this.obj_horasExtra = new HorasExtra();
      this.fetchHorasExtra()
    }
  },
  created() {
    this.fetchHorasExtra();
  },
  computed: mapGetters(["allHorasExtra"])
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
  display: block
}
</style>