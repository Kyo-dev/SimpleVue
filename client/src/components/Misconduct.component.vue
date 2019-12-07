<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Registro disciplinario</h1>
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
                    v-model="disciplina.cedula_empleado"
                    :counter="9"
                    label="Cédula del empleado"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="disciplina.descripcion"
                    :counter="300"
                    label="Motivo de registro disciplinario"
                    :rules="descripcionRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="nuevaDisciplina"
                      class="btn-1 btn"
                    >nuevo registro</v-btn>
                  </template>
                  <v-btn class="btn" color="warning" :disabled="!valid" @click="reset">Borrar formulario</v-btn>
                  <template v-if="edit === true"></template>
                  <v-btn class="btn" color="success" :disabled="!valid" @click="updateDisciplina">Actualizar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6>
                <v-card>
                  <v-date-picker
                    v-model="disciplina.fecha"
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
                      <th class="th">BORRAR</th>
                      <th class="th">Actualizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item of allConductas" :key="item.id">
                      <td class="td">{{item.cedula_empleado}}</td>
                      <td class="td">{{item.fecha}}</td>
                      <td class="td">{{item.descripcion}}</td>
                      <td class="td icons" @dblclick="deleteDisciplina(item.id)">
                        DELETE
                        <v-icon small color="error" class="icons">delete</v-icon>
                      </td>
                      <td class="td icons" @click="getOneDisciplina(item.id)">
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
import Disciplina from "../model/misconduct.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo registro", "Todos los registros"],
      disciplina: new Disciplina(),
      disciplina: [],
      valid: false,
      min: new Date().toISOString().substr(0, 10),
      edit: false,
      cedulaRules: [
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres"
      ],
      descripcionRules: [
        v => !!v || "Por favor describa el motivo del permiso",
        v => (v && v.length <= 200) || "El motivo excede la cantidad"
      ]
    };
  },
  methods: {
    ...mapGetters(["oneConducta"]),
    ...mapActions([
      "fetchConductas",
      "insertarConducta",
      "getOneConducta",
      "updConducta",
      "deletedConducta"
    ]),
    nuevaDisciplina(disciplina) {
      this.insertarConducta(this.disciplina)(
        (this.disciplina = new Disciplina())
      );
      this.reset();
      this.fetchConductas();
    },
    updateDisciplina(disciplina) {
      this.updConducta(this.disciplina);
      this.fetchConductas();
      this.reset();
      this.edit = false;
    },
    getOneDisciplina(id) {
      if (this.edit === false) {
        this.getOneConducta(id);
        this.disciplina = this.oneConducta();
        console.log(this.disciplina);
      }
    },
    deleteDisciplina(id) {
      this.deletedConducta(id);
      this.disciplina = new Disciplina();
      this.fetchConductas();
    },
    reset() {
      this.$refs.form.reset();
      this.disciplina = new Disciplina();
    }
  },
  created() {
    this.fetchConductas();
  },
  computed: mapGetters(["allConductas"])
};
</script>

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