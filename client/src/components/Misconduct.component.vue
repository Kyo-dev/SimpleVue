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
                <v-form ref="form" v-model="valid" v-if="!cambiarConducta">
                  <v-text-field
                    v-model="disciplina.cedula"
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
                      @click="enviarConducta()"
                      class="btn-1 btn"
                    >nuevo registro</v-btn>
                  </template>
                  <template v-if="edit === false ">
                    <v-btn class="btn-1, btn" color="warning" @click="cancelar">Cancelar</v-btn>
                  </template>
                </v-form>

                <v-form ref="form" v-model="valid" v-if="cambiarConducta">
                  <h3>Editar</h3>
                  <v-text-field
                    v-model="disciplinaEditar.cedula"
                    :counter="9"
                    label="Cédula del empleado"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="disciplinaEditar.descripcion"
                    :counter="300"
                    label="Motivo de registro disciplinario"
                    :rules="descripcionRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      @click="actualizarConducta(disciplinaEditar)"
                      class="btn-1 btn"
                    >Editar información</v-btn>
                  </template>
                  <v-btn class="btn-1, btn" color="warning" @click="cancelar">Cancelar</v-btn>
                </v-form>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6 v-if="!cambiarConducta">
                <v-card class="container-calendario">
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
              <v-flex xs12 md6 v-if="cambiarConducta">
                <v-card class="container-calendario">
                  <v-date-picker
                    v-model="disciplinaEditar.fecha"
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
                      <th class="th">Nombre</th>
                      <th class="th">Fecha</th>
                      <th class="th">Descripcion</th>
                      <th class="th">Actualizar</th>
                      <th class="th">Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="disciplina  of disciplinas" :key="disciplina.id">
                      <td class="td">{{disciplina.cedula}}</td>
                      <td class="td">{{disciplina.nombre}}</td>
                      <td class="td">{{disciplina.fecha}}</td>
                      <td class="td">{{disciplina.descripcion}}</td>
                      <td>
                        <v-btn
                          color="info"
                          class="btn-1, btn"
                          @click="editarConducta(disciplina.id)"
                        >Actualizar</v-btn>
                      </td>
                      <th>
                        <v-btn
                          color="error"
                          class="btn-1, btn"
                          @click="eliminarConducta(disciplina.id)"
                        >Eliminar</v-btn>
                      </th>
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
import Disciplina from "../model/misconduct.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo registro", "Todos los registros"],
      disciplina: new Disciplina(),
      disciplinas: [],
      disciplinaEditar: {},
      min: new Date().toISOString().substr(0, 10),
      cambiarConducta: false,
      valid: true,
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
  created() {
    this.obtenerConductas();
  },
  methods: {
    enviarConducta() {
      const data = {
        _cedula: this.disciplina.cedula,
        _descripcion: this.disciplina.descripcion,
        _fecha: this.disciplina.fecha
      };
      this.axios
        .post("/disciplina", data)
        .then(res => {
          this.disciplinas.push(res.data);
          this.cancelar();
          this.obtenerConductas();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    obtenerConductas() {
      this.axios
        .get("/disciplina")
        .then(res => {
          this.disciplinas = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    editarConducta(id) {
      this.cambiarConducta = true;
      console.log(id);
      this.axios
        .get(`/disciplina/${id}`)
        .then(res => {
          this.disciplinaEditar = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    actualizarConducta(item) {
      const data = {
        _cedula: this.disciplinaEditar.cedula,
        _descripcion: this.disciplinaEditar.descripcion,
        _fecha: this.disciplinaEditar.fecha
      };
      this.axios
        .put(`/disciplina/${item.id}`, data)
        .then(res => {
          this.obtenerConductas();
          this.cancelar();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    eliminarConducta(id) {
      console.log(id);
      this.axios
        .delete(`/disciplina/${id}`)
        .then(res => {
          this.obtenerConductas();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    cancelar() {
      this.$refs.form.reset();
      this.cambiarConducta = false;
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