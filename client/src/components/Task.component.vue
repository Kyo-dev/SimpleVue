<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Tareas</h1>
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
                  <v-radio-group v-model="tarea.tipoTarea">
                    <v-radio label="Doctor" value="2" color="primary" :rules="tipoTareaRules"></v-radio>
                    <v-radio label="Dependiente" value="3" color="primary" :rules="tipoTareaRules"></v-radio>
                    <v-radio label="Mensajero" value="4" color="primary" :rules="tipoTareaRules"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-model="tarea.titulo"
                    :counter="50"
                    label="Titulo"
                    :rules="titleRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="tarea.descripcion"
                    :counter="50"
                    label="Descripcion de la tarea"
                    :rules="descripcionRules"
                    required
                  ></v-text-field>

                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="postTarea"
                      class="btn-1"
                    >Nueva tarea</v-btn>
                  </template>
                  <v-btn color="warning" :disabled="!valid" @click="reset">Borrar formulario</v-btn>
                  <template v-if="edit === true"></template>
                  <v-btn color="success" :disabled="!valid" @click="updateTarea">Actualizar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6>
                <v-card></v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-timeline>
                <v-timeline-item v-for="item of allTareasDoc" :key="item.id" color="primary" large>
                  <div v-if="item.id_tipo_empleado === 2">
                    <v-card class="elevation-2">
                      <v-card-title class="tarea-titulo">{{item.titulo}}</v-card-title>
                      <v-card-text class="tarea-descripcion">{{item.descripcion}}</v-card-text>
                      <v-btn
                        color="primary"
                        class="btn-upd-del"
                        @click="obtenerUnaTarea(item.id)"
                        outlined
                      >Actualizar</v-btn>
                      <v-btn
                        color="primary"
                        class="btn-upd-del"
                        @click="deleteTarea(item.id)"
                        outlined
                      >Borrar</v-btn>
                    </v-card>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-timeline>
                <v-timeline-item v-for="item of allTareasDep" :key="item.id" color="primary" large>
                  <v-card class="elevation-2">
                    <v-card-title class="tarea-titulo">{{item.titulo}}</v-card-title>
                    <v-card-text class="tarea-descripcion">{{item.descripcion}}</v-card-text>
                    <v-btn
                      color="primary"
                      class="btn-upd-del"
                      @click="obtenerUnaTarea(item.id)"
                      outlined
                    >Actualizar</v-btn>
                    <v-btn
                      color="primary"
                      class="btn-upd-del"
                      @click="deleteTarea(item.id)"
                      outlined
                    >Borrar</v-btn>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container>
              <v-timeline>
                <v-timeline-item v-for="item of allTareasMen" :key="item.id" color="primary" large>
                  <div v-if="item.id_tipo_empleado === 4">
                    <v-card class="elevation-2">
                      <v-card-title class="tarea-titulo">{{item.titulo}}</v-card-title>
                      <v-card-text class="tarea-descripcion">{{item.descripcion}}</v-card-text>
                      <v-btn
                        color="primary"
                        class="btn-upd-del"
                        @click="obtenerUnaTarea(item.id)"
                        outlined
                      >Actualizar</v-btn>
                      <v-btn
                        color="primary"
                        class="btn-upd-del"
                        @click="deleteTarea(item.id)"
                        outlined
                      >Borrar</v-btn>
                    </v-card>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tarea from "../model/task.model";
export default {
  data() {
    return {
      tab: [],
      items: [
        "Nueva tarea",
        "Tareas del doctor",
        "Tareas del dependiente",
        "Tareas del mensajero"
      ],
      tarea: new Tarea(),
      tarea: [],
      edit: false,
      actEdit: "",
      valid: false,
      tareasDoc: [],
      tareasDep: [],
      tareasMen: [],
      titleRules: [
        v => !!v || "Por favor escriba un breve titulo para la tarea",
        v => (v && v.length <= 200) || "El titulo excede la cantidad"
      ],
      descripcionRules: [
        v => !!v || "Por favor describa la tarea ",
        v => (v && v.length <= 200) || "La descripción excede la cantidad"
      ],
      tipoTareaRules: [v => !!v || "Por favor selecciones un tipo de telefono"]
    };
  },
  methods: {
    ...mapGetters(["", "oneTarea"]),
    ...mapActions([
      "obtenerTarea",
      "fetchTareasDoctor",
      "fetchTareasDependiente",
      "fetchTareasMensajero",
      "insertTarea",
      "deletedTarea",
      "actualizarTarea"
    ]),
    postTarea(tarea) {
      this.insertTarea(this.tarea);
      this.reset();
      this.tarea = new Tarea();
      this.fetchTareasDoctor();
      this.fetchTareasDependiente();
      this.fetchTareasMensajero();
    },
    updateTarea(tarea) {
      this.actualizarTarea(this.tarea);
      this.fetchTareasDoctor();
      this.fetchTareasDependiente();
      this.fetchTareasMensajero();
      this.reset();
      this.tarea = new Tarea();
    },
    deleteTarea(id) {
      this.deletedTarea(id);
      this.fetchTareasDoctor();
      this.fetchTareasDependiente();
      this.fetchTareasMensajero();
      this.tarea = new Tarea();
    },
    obtenerUnaTarea(id) {
      if (this.edit === false) {
        this.obtenerTarea(id);
        this.tarea = this.oneTarea();
      }
    },

    reset() {
      this.$refs.form.reset();
      this.tarea = new Tarea();
    }
  },
  created() {
    this.fetchTareasDoctor();
    this.fetchTareasDependiente();
    this.fetchTareasMensajero();
  },
  computed: mapGetters(["allTareasDoc", "allTareasDep", "allTareasMen"])
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
.btn-upd-del {
  margin-top: 0.5em;
  margin-left: 1em;
  margin-bottom: 0.8em;
}
.tarea-titulo {
  background-color: #356859;
  color: snow;
}
.tarea-descripcion {
  padding: 1em;
  margin: 0.9em;
  color: black !important;
}
</style>