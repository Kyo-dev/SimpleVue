<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3 basil--text" color="primary">Empleados</h1>
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
              <v-flex xs12 md5>
                <v-form ref="form" v-model="valid" v-if="!cambiarEmpleado">
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
                    v-model="empleado.correo"
                    :counter="200"
                    label="Dirección"
                    :rules="direccionRules"
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
                  
                </v-form>

                <v-form ref="form" v-model="valid" v-if="cambiarEmpleado">
                  <h3>Editar Empleado</h3>
                  <v-text-field
                    v-model="personaEditar.cedula"
                    :counter="9"
                    label="Cédula"
                    :rules="cedulaRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="personaEditar.nombre"
                    :counter="50"
                    label="Nombre"
                    :rules="nombreRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="personaEditar.p_apellido"
                    :counter="50"
                    label="Primer apellido"
                    :rules="p_apellidoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="personaEditar.s_apellido"
                    :counter="50"
                    label="Segundo apellido"
                    :rules="s_apellidoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="personaEditar.correo"
                    :counter="200"
                    label="Correo electrónico"
                    :rules="correoRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="personaEditar.salario_hora"
                    label="Salario por hora"
                    :rules="salarioRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="personaEditar.jornada"
                    label="Jornada diaria"
                    :rules="jornadaRules"
                    required
                  ></v-text-field>
                  <v-radio-group v-model="personaEditar.tipo_telefono" row>
                    <v-radio label="Casa" value="1" color="primary" :rules="telefonoRules"></v-radio>
                    <v-radio label="Celular" value="2" color="primary" :rules="telefonoRules"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-model="personaEditar.numero"
                    label="Número telefónico"
                    :counter="8"
                    :rules="numeroRules"
                    required
                  ></v-text-field>
                </v-form>
                
                <!-- !SECTION  -->
              </v-flex>
              <!-- SECTION Right -->
              <v-spacer></v-spacer>
              <v-flex xs12 md5 v-if="!cambiarEmpleado">
                <p>Tipo de teléfono</p>
                <v-radio-group v-model="empleado.tipo_telefono" row>
                    <v-radio label="Casa" value="1" color="primary" :rules="telefonoRules"></v-radio>
                    <v-radio label="Celular" value="2" color="primary" :rules="telefonoRules"></v-radio>
                  </v-radio-group>
                  <v-text-field
                    v-model="empleado.numero"
                    label="Número telefónico"
                    :counter="8"
                    :rules="numeroRules"
                    required
                  ></v-text-field>
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Fecha de nacimiento"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
                <v-sheet>
                  <p>Cargo del empleado</p>
                  <v-radio-group v-model="empleado.tipo_empleado" row>
                    <v-radio label="Doctor" value="2" color="primary" :rules="cargoRules"></v-radio>
                    <v-radio label="Dependiente" value="3" color="primary" :rules="cargoRules"></v-radio>
                    <v-radio label="Mensajero" value="4" color="primary" :rules="cargoRules"></v-radio>
                  </v-radio-group>
                   <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Fecha de nacimiento"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
                  <template v-if="edit ===false ">
                    <br />
                    <v-btn color="success"  class="btn-1, btn" @click="enviarEmpleado">Nuevo empleado</v-btn>
                    
                    <v-btn color="warning"  class="btn-1, btn" @click="reset">Borrar formulario</v-btn>
                  </template>
                </v-sheet>
              </v-flex>

              <v-flex xs12 md6 v-if="cambiarEmpleado">
                <v-sheet>
                  <p>Cargo del empleado</p>
                  <v-radio-group v-model="personaEditar.tipo_empleado" row>
                    <v-radio label="Doctor" value="2" color="primary" :rules="cargoRules"></v-radio>
                    <v-radio label="Dependiente" value="3" color="primary" :rules="cargoRules"></v-radio>
                    <v-radio label="Mensajero" value="4" color="primary" :rules="cargoRules"></v-radio>
                  </v-radio-group>
                  <v-card>
                    <v-date-picker
                      v-model="personaEditar.fecha_contrato"
                      full-width
                      locale="es"
                      :min="min"
                      header-color="primary"
                      color="primary"
                    ></v-date-picker>
                  </v-card>
                  <template v-if="edit ===false ">
                    <br />
                    <v-btn color="success" @click="postEmpleado">Nuevo empleado</v-btn>
                    <v-btn color="warning" @click="reset">Borrar formulario</v-btn>
                    <v-btn color="success" @click="updateEmpleado">Actualizar</v-btn>
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
                    <th class="th">Teléfono</th>
                    <th class="th">Salario por hora</th>
                    <th class="th">Jornada laboral</th>
                    <th class="th">Actualizar</th>
                    <th class="th">Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of empleados" :key="item.id">
                    <td class="td">{{item.cedula}}</td>
                    <td class="td">{{item.nombre}}</td>
                    <td class="td">{{item.p_apellido}}</td>
                    <td class="td">{{item.s_apellido}}</td>
                    <td class="td">{{item.fecha_contrato}}</td>
                    <td class="td">{{item.correo}}</td>
                    <td class="td">{{item.numero}}</td>
                    <td class="td">{{item.salario_hora}}</td>
                    <td class="td">{{item.jornada}}</td>
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
import Empleado from "../model/employee.model";
export default {
  data() {
    return {
      tab: [],
      items: ["Nuevo empleado", "Todos los empleados"],
      min: new Date().toISOString().substr(0, 10),
      cambiarEmpleado: false,
      empleado: new Empleado(),
      empleados: [],
      actEdit: "",
      personaEditar: {},
      valid: true,
      edit: false,
      cedulaRules: [
        v => !!v || "Por favor ingrese la cédula del empleado",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
        v => (v && v.length == 9) || "La cédula debe ser de 9 caracteres"
      ],
      nombreRules: [
        v => !!v || "Por favor ingrese el nombre del nuevo empleado",
        v => /^[a-zA-Z ]+$/.test(v) || "Solo puede usar letras",
        v => (v && v.length <= 50) || "El nombre es muy grande"
      ],
      p_apellidoRules: [
        v => !!v || "Por favor ingrese el primer apellido",
        v => /^[a-zA-Z ]+$/.test(v) || "Solo puede usar letras",
        v => (v && v.length <= 50) || "El primer apellido es muy grande"
      ],
      s_apellidoRules: [
        v => !!v || "Por favor ingrese el primer apellido",
        v => /^[a-zA-Z ]+$/.test(v) || "Solo puede usar letras",
        v => (v && v.length <= 50) || "El segundo apellido es muy grande"
      ],
      correoRules: [
        v => !!v || "Por favor ingrese el correo del empleado",
        // v => /[a-z]*/ || "Solo se admiten letras minusculas",
        v =>
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
            v
          ) || "Error el escribir el correo"
      ],
      direccionRules:[
        v => !!v || "Por favor ingrese la dirección del empleado",
        v => (v && v.length <= 50) || "La dirección excede el máximo permitido"
      ],
      cargoRules: [v => !!v || "Por favor seleccione un cargo"],
      salarioRules: [
        v => !!v || "Por favor ingrese el salario por hora del nuevo empleado",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
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
        v => !!v || "Por favor ingrese el número del empleado",
        v => /^\d+$/.test(v) || "Solo se admiten números positivos",
        v => (v && v.length == 8) || "La número debe ser de 8 digitos"
      ],
      telefonoRules: [v => !!v || "Por favor selecciones un tipo de telefono"]
    };
  },
  created() {
    this.obtenerEmpleados();
  },
  methods: {
    enviarEmpleado() {
      // faltan datos
      const data = {
        _cedula: empleado.cedula,
        _nombre: empleado.nombre,
        _p_apellido: empleado.p_apellido,
        _s_apellido: empleado.s_apellido,
        _correo: empleado.correo,
        _fecha_contrato: empleado.fecha_contrato,
        _tipo_empleado: empleado.tipo_empleado,
        _salario_hora: empleado.salario_hora,
        _jornada: empleado.jornada,
        _numero: empleado.numero,
        _tipo_telefono: empleado.tipo_telefono
      };
      this.axios
        .post("/empleados", data)
        .then(res => {})
        .catch(e => {
          console.log(e.response);
        });
    },
    obtenerEmpleados() {
      this.axios
        .get("/empleados")
        .then(res => {
          this.empleados = res.data;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    reset() {
      this.$refs.form.reset();
      this.empleado = new Empleado()
      this.fetchEmpleado()
    }
  }
}
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
</style>
