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
                
                <v-form ref="form" v-model="valid" v-if="!cambiarBono">
                  <v-text-field
                    v-model="bono.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="bono.motivo"
                    :counter="200"
                    label="Montivo del bono"
                    :rules="motivoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="bono.cantidad"
                    label="Cantidad"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="btn-1, btn"
                      @click="enviarBono()"
                    >Nuevo Bono</v-btn>
                  </template>
                </v-form>

                 <v-form ref="form" v-model="valid" v-if="cambiarBono">
                   <h3>Editar bono</h3>
                  <v-text-field
                    v-model="bonoEditar.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="bonoEditar.motivo"
                    :counter="200"
                    label="Montivo del bono"
                    :rules="motivoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="bonoEditar.cantidad"
                    label="Cantidad"
                    :rules="cantidadRules"
                    required
                  ></v-text-field>
                  <template v-if="edit===false">
                    <v-btn
                      color="success"
                      class="btn-1, btn"
                      @click="actualizarBono(bonoEditar)"
                    >Editar Bono</v-btn>
                    <v-btn
                      color="success"
                      class="btn-1, btn"
                      @click="cambiarBono = false"
                    >cancelar</v-btn>
                  </template>
                </v-form>

              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs12 md6 v-if="cambiarBono">
                <v-card>
                  <v-date-picker
                    v-model="bonoEditar.fecha"
                    full-width
                    locale="es"
                    :min="min"
                    header-color="primary"
                    color="primary"
                  ></v-date-picker>
                </v-card>
              </v-flex>
              <v-flex xs12 md6 v-if="!cambiarBono">
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
                    <tr v-for="bono of bonos" :key="bono.id">
                      <td class="td">{{bono.cedula}}</td>
                      <td class="td">{{bono.motivo}}</td>
                      <td class="td">{{bono.fecha}}</td>
                      <td class="td">{{bono.cantidad}}</td>
                      <td class="td">{{bono.p_apellido}}</td>
                      <td class="td">{{bono.nombre}}</td>
                      <td>
                        <v-btn
                          color="danger"
                          class="btn-1, btn"
                          @click="eliminarBono(bono.id)"
                        >Borrar</v-btn>
                      </td>
                      <td>
                        <v-btn
                          color="danger"
                          class="btn-1, btn"
                          @click="editarBono(bono.id)"
                        >Edit</v-btn>
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
import Bono from "../model/bonus.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo bono", "Todos los bonos"],
      valid: true,
      min: new Date().toISOString().substr(0, 10),
      bono: new Bono(),
      bonos: [],
      edit: false,
      actEdit: "",
      cambiarBono: false,
      bonoEditar: {},
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
  created() {
    this.obtenerBonos();
  },
  methods: {
    enviarBono() {
      const data = {
        _cedula: this.bono.cedula,
        _motivo: this.bono.motivo,
        _cantidad: this.bono.cantidad,
        _fecha: this.bono.fecha
      };
      this.axios
        .post(`/bonos`, data)
        .then(res => {
          this.bonos.push(res.data);
          this.bono.cedula = "";
          this.bono.motivo = "";
          this.bono.cantidad = "";
          this.bono.fecha = "";
          this.obtenerBonos();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    obtenerBonos() {
      this.axios
        .get(`/bonos`)
        .then(res => {
          console.log(res);
          this.bonos = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },

    editarBono(id){
      this.cambiarBono = true;
      console.log(id)
      this.axios.get(`/bonos/${id}`)
        .then(res =>{
      console.log(res.data)
          this.bonoEditar = res.data
        })
        .catch(e =>{
          console.log(e.response)
        })
    },
    actualizarBono(item){
      const data = {
        _cedula: this.bonoEditar.cedula,
        _motivo: this.bonoEditar.motivo,
        _cantidad: this.bonoEditar.cantidad,
        _fecha: this.bonoEditar.fecha
      };
      this.axios.put(`/bonos/${item.id}`, data)
        .then(res => {
          this.obtenerBonos()
          this.cambiarBono = false;
        })
        .catch(e =>{
          console.log(e.response)
        })
    },
    eliminarBono(id){
      console.log(id);
      this.axios.delete(`/bonos/${id}`)
        .then(res =>{
          this.obtenerBonos()
        })
        .catch(e =>{
          console.log(e.response)
        })
    },
    reset() {
      this.$refs.form.reset();
      this.bono = new Bono();
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
  display: block;
}
</style>