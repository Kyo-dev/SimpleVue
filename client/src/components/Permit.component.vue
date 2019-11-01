<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text">Permisos</h1>
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
            <!-- SECTION  Left -->
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="empleado.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.nombre"
                    :counter="50"
                    label="Nombre"
                    :rules="nombreRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.p_apellido"
                    :counter="50"
                    label="Primer apellido"
                    :rules="p_apellidoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.s_apellido"
                    :counter="50"
                    label="Segundo apellido"
                    :rules="s_apellidoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.correo"
                    :counter="200"
                    label="Correo electrónico"
                    :rules="correoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.salario_hora"
                    label="Salario por hora"
                    :rules="salarioRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.jornada"
                    label="Jornada diaria"
                    :rules="jornadaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="empleado.numero"
                    label="Número telefónico"
                    :counter="8"
                    :rules="numeroRules"
                    required
                  ></v-text-field>
                  <v-radio-group v-model="empleado.tipo_telefono" row>
                    <v-radio label="Casa" value="1" color="primary" :rules="telefonoRules"></v-radio>
                    <v-radio label="Celular" value="2" color="primary" :rules="telefonoRules"></v-radio>
                  </v-radio-group>
                </v-form>
                <!-- !SECTION  -->
              </v-flex>
              <!-- SECTION Right -->
              <v-spacer></v-spacer>
              <v-flex xs12 md6>
                <v-sheet height="500">
                  <p>Cargo del empleado</p>
                  <v-radio-group v-model="empleado.tipo_empleado" row>
                    <v-radio label="Doctor" value="2" color="primary" :rules="cargoRules"></v-radio>
                    <v-radio label="Dependiente" value="3" color="primary" :rules="cargoRules"></v-radio>
                    <v-radio label="Mensajero" value="4" color="primary" :rules="cargoRules"></v-radio>
                  </v-radio-group>
                  <v-card>
                    <v-date-picker
                      v-model="empleado.fecha_contrato"
                      full-width
                      locale="es"
                      :min="min"
                      header-color="primary"
                      color="primary"
                    ></v-date-picker>
                  </v-card>
                  <template v-if="edit ===false ">
                    <br />
                    <v-btn :disabled="!valid" color="success" @click="postEmpleado">Nuevo empleado</v-btn>
                    <v-btn color="warning" @click="reset">Borrar formulario</v-btn>
                  </template>
                </v-sheet>
              </v-flex>
              <!-- !SECTION  -->
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div>
              <v-spacer></v-spacer>
              <br />
              <br />
              <table class="infoUsers">
                <thead>
                  <tr>
                    <th class="th">Cedula</th>
                    <th class="th">Nombre</th>
                    <th class="th">Primer apellido</th>
                    <th class="th">Segundo apellido</th>
                    <th class="th">Fecha de contrato</th>
                    <th class="th">Correo electronico</th>
                    <th class="th">Salario por hora</th>
                    <th class="th">Jornada laboral</th>
                    <th class="th">BORRAR</th>
                    <th class="th">Actualizar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of allEmpleados" :key="item.id">
                    <td class="td">{{item.cedula}}</td>
                    <td class="td">{{item.nombre}}</td>
                    <td class="td">{{item.p_apellido}}</td>
                    <td class="td">{{item.s_apellido}}</td>
                    <td class="td">{{item.fecha_contrato}}</td>
                    <td class="td">{{item.correo}}</td>
                    <td class="td">{{item.salario_hora}}</td>
                    <td class="td">{{item.jornada}}</td>
                    <td class="td" @click="delEmpleado(item.cedula)">
                      DELETE
                      <v-icon small color="error" class="icons">delete</v-icon>
                    </td>
                    <td class="td" @click="getOneEmpleado(item.cedula)">
                      actualizar
                      <v-icon small color="error" class="icons">delete</v-icon>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Empleado from "../model/empleado.model";

export default {
  name: "formComponent",
  data() {
    return {
      items: ["Nuevo permiso", "Permisos actuales"],
      min: new Date().toISOString().substr(0, 10),
      valid: true,
      empleado: new Empleado(),
      empleado: [],
      edit: false,
      actEdit: "",
      cedulaRules: [
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos"
      ],
      nombreRules: [
        v => !!v || "Por favor ingrese el nombre del nuevo empleado",
        v => (v && v.length <= 50) || "El nombre es muy grande"
      ],
      p_apellidoRules: [
        v => !!v || "Por favor ingrese el primer apellido",
        v => (v && v.length <= 50) || "El primer apellido es muy grande"
      ],
      s_apellidoRules: [
        v => !!v || "Por favor ingrese el primer apellido",
        v => (v && v.length <= 50) || "El segundo apellido es muy grande"
      ],
      correoRules: [
        v => !!v || "Por favor ingrese el correo del empleado",
        v =>
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            v
          ) || "Error el escribir el correo"
      ],
      cargoRules: [v => !!v || "Por favor seleccione un cargo"],
      salarioRules: [
        v => !!v || "Por favor ingrese el salario por hora del nuevo empleado",
        v =>
          /^(\d{1}\.)?(\d+\.?)+(,\d{2})?$/.test(v) ||
          "El salario debe llevar 2 decimales, ejemplo 1234.56"
      ],
      jornadaRules: [
        v => !!v || "Por favor ingrese el salario por hora del nuevo empleado",
        v =>
          (v && v.length == 1) ||
          "No es posible trabajar mas de 9 horas al día",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos"
      ],
      numeroRules: [
        v => !!v || "Por favor ingrese el numero del empleado",
        v => (v && v.length == 8) || "La numero debe ser de 8 caracteres"
      ],
      telefonoRules: [v => !!v || "Por favor selecciones un tipo de telefono"]
    };
  },

  methods: {
    ...mapActions(["fetchEmpleado", "insertEmpleado"]),
    postEmpleado(empleado) {
      this.insertEmpleado(this.empleado);
      this.empleado = new Empleado();
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    created() {
      this.fetchEmpleado();
    }
  }
};
</script>

<style>
.border-container {
  padding: 0em 2em 0em 2em;
}
.border-container{
  padding: 0em 2em 0em 2em;
}
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
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