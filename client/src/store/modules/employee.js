import axios from 'axios'

const state = {
    empleados: []
}

const getters = {
    allEmpleados: state => state.empleados
}

const actions = {
    async fetchEmpleado({commit}){
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/empleados'
        );
        commit('setEmpleado', response.data);
    },
    async insertEmpleado({commit}, empleado){
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
        }
        const response = await axios.post(
            'http://localhost:4000/api/usuarios/empleados/', data)
        commit('newEmpleado', response.data);
        console.log (response.data)
    },

    async deleteEmpleado({commit}, cedula){
        console.log('SOY EL DELETE' + cedula)
        await axios.delete(`http://localhost:4000/api/usuarios/empleados/${cedula}`)
        commit('removeEmpleado',cedula);
    }
}

const mutations = {
    setEmpleado: (state, empleados) => (state.empleados = empleados),
    newEmpleado: (state, empleado) => state.empleados.unshift(empleado),
    removeEmpleado: (state, cedula) => (state.empleados = state.empleados.filter(empleado => empleado.cedula !== cedula))
}

export default {
    state,
    getters,
    actions,
    mutations
  };