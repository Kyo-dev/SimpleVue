import axios from 'axios'

const state = {
    empleados: [],
    emplado: {}
}

const getters = {
    allEmpleados: state => state.empleados,
    oneEmpleado: state => state.empleado
}

const actions = {
    async fetchEmpleado({ commit }) {
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/empleados'
        );
        commit('setEmpleado', response.data);
    },
    async getEmpleado({ commit }, cedula) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/empleados/${cedula}`
        )
        console.log(response.data)
        commit('oneEmpleado', response.data)
    },
    async insertEmpleado({ commit }, empleado) {
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
            'http://localhost:4000/api/usuarios/empleados/', data
        )
        commit('newEmpleado', response.data);
        console.log(response.data)
    },
    async updateEmpleado({ commit }, empleado) {
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
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/empleados/${empleado._cedula}`, data
        )
        console.log("AXIOS")
        console.log(empleado)
        commit('updEmpleado', response.data)
    },
    async deleteEmpleado({ commit }, cedula) {
        console.log('SOY EL DELETE' + cedula)
        await axios.delete(`http://localhost:4000/api/usuarios/empleados/${cedula}`)
        commit('removeEmpleado', cedula);
    }
}

const mutations = {
    setEmpleado: (state, empleados) => (state.empleados = empleados),
    oneEmpleado(state, empleado){
        state.empleado = empleado
    },
    // (state, cedula) => {
    //     state.empleado = state.empleados.filter(empleado => empleado.cedula !== cedula)
    // },
    newEmpleado: (state, empleado) => state.empleados.unshift(empleado),
    removeEmpleado: (state, cedula) => (state.empleados = state.empleados.filter(empleado => empleado.cedula !== cedula)),
    updEmpleado: (state, updEmpleado) => {
        const index = state.empleados.findIndex(empleado => empleado.cedula === updEmpleado.cedula)
        if (index !== -1) {
            state.empleados.splice(index, 1, updEmpleado)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};