import axios from 'axios'

const state = {
    horasExtra: [],
    horaExtra: {}
}

const getters = {
    allHorasExtra: state => state.horasExtra,
    oneHoraExtra: state => state.horaExtra
}

const actions = {
    async fetchHorasExtra({ commit }) {
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/horas-extra'
        )
        commit('setHorasExtra', response.data)
        console.log(response.data)
    },
    async getHoraExtra({ commit }, id) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/horas-extra/${id}`
        )
        commit('oneHorasExtra', response.data)
    },
    async insertHoraExtra({ commit }, horaExtra) {
        const data = {
            _cedula: horaExtra.cedula_empleado,
            _fecha: horaExtra.fecha,
            _motivo: horaExtra.motivo,
            _cantidad_horas: horaExtra.cantidad_horas
        }
        const response = await axios.post(
            `http://localhost:4000/api/usuarios/horas-extra`, data
        )
        commit('newHoraExtra', response.data)
    },
    async updHoraExtra({ commit }, horaExtra) {
        const data = {
            _cedula: horaExtra.cedula_empleado,
            _fecha: horaExtra.fecha,
            _motivo: horaExtra.motivo,
            _cantidad_horas: horaExtra.cantidad_horas
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/horas-extra/${horaExtra.id}`, data
        )
        commit('updatedHoraExtra', response.data)
    },
    async deletedHoraExtra({ commit }, id) {
        const response = await axios.delete(
            `http://localhost:4000/api/usuarios/horas-extra/${id}`
        )
        commit('removeHoraExtra', response.data)
    }
}

const mutations = {
    setHorasExtra: (state, horasExtra) => state.horasExtra = horasExtra,
    newHoraExtra: (state, horaExtra) => state.horasExtra.unshift(horaExtra),
    oneHorasExtra: (state, horaExtra) => state.horaExtra = horaExtra,
    updatedHoraExtra: (state, updatedHoraExtra) => {
        const index = state.horasExtra.findIndex(horaExtra => horaExtra.id === updatedHoraExtra.id)
        if (index !== 1) {
            state.horasExtra.splice(index, 1, updatedHoraExtra)
        }
    },
    removeHoraExtra:(state, id) => state.horasExtra = state.horasExtra.filter(act => act.id !== id),
}

export default {
    state,
    getters,
    actions,
    mutations
};