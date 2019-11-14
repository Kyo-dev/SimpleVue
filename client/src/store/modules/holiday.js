import axios from 'axios'

const state = {
    vacaciones: [],
    vacacion: {}
}
const getters = {
    allVacaciones: state => state.vacaciones,
    oneVacacion: state => state.vacacion
}
const actions = {
    async fetchVacaciones({ commit }) {
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/vacaciones'
        );
        commit('setVacaciones', response.data)
    },
    async insertarVacaciones({ commit }, vacaciones) {
        const data = {
            _cedula: vacaciones.cedula_empleado,
            _fecha_salida: vacaciones.fecha_salida,
            _fecha_entrada: vacaciones.fecha_entrada
        }
        const response = await axios.post(
            `http://localhost:4000/api/usuarios/vacaciones`, data
        )
        commit('newVacaciones', response.data);
    },
    async obtenerVacacionesID({ commit }, id) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/vacaciones/${id}`
        )
        commit('oneVacacion', response.data)
    },
    async updVacaciones({commit}, vacaciones){
        const data = {
            _id: vacaciones.id,
            _cedula: vacaciones.cedula_empleado,
            _fecha_salida: vacaciones.fecha_salida,
            _fecha_entrada: vacaciones.fecha_entrada
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/vacaciones/${vacaciones.id}`, data
        )
        commit('updatedVacaciones', response.data)
    }
}
const mutations = {
    setVacaciones(state, vacaciones) {
        state.vacaciones = vacaciones
    },
    oneVacacion(state, vacacion) {
        state.vacacion = vacacion
    },
    newVacaciones(state, vacacion) {
        state.vacaciones.unshift(vacacion)
    },
    updatedVacaciones: (state, updatedVacaciones) =>{ 
        const index = state.vacaciones.findIndex(vacacion => vacacion.id === updatedVacaciones.id)
        if (index !== -1) {
            state.vacaciones.splice(index, 1, updatedVacaciones)
        }
    }
}
export default {
    state,
    getters,
    actions,
    mutations
};