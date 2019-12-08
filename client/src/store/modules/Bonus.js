import axios from 'axios'

const state = {
    bonos: [],
    bono: {}
}
const getters = {
    allBonos: state => state.bonos,
    oneBono: state => state.bono
}
const actions = {
    async fetchBonos({ commit }) {
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/bonos'
        )
        commit('setBonos', response.data)
    },
    async getBono({ commit }, id) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/bonos/${id}`
        )
        console.log('ONEBONO')
        console.log(response.data)
        commit('oneBono', response.data)
    },
    async insertBono({ commit }, bono) {
        const data = {
            _cedula: bono.cedula_empleado,
            _motivo: bono.motivo,
            _cantidad: bono.cantidad,
            _fecha: bono.fecha
        }
        const response = await axios.post(
            `http://localhost:4000/api/usuarios/bonos`, data
        )
        commit('newBono', response.data)
    },
    async updBono({ commit }, bono) {
        const data = []
        data = {
            _cedula: bono.cedula_empleado,
            _id: bono.id,
            _motivo: bono.motivo,
            _cantidad: bono.cantidad,
            _fecha: bono.fecha
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/bonos/${bono.id}`, data
        )
        commit('updatedBono', response.data)
    },
    async deletedBono({commit}, id){
        const response = await axios.delete(
            `http://localhost:4000/api/usuarios/bonos/${id}`
        )
        commit('revomeBono', response.data)
    }
}
const mutations = {
    setBonos: (state, bonos) => (state.bonos = bonos),
    oneBono:(state, bono) => (state.bono = bono),
    newBono: (state, bono) => state.bonos.unshift(bono),
    removeEmpleado:(state, id) => state.bonos = state.bonos.filter(act => act.id !== id),
    updatedBono: (state, updatedBono) => {
        const index = state.bonos.findIndex(bono => bono.id === updatedBono.id)
        if (index !== -1) {
            state.bonos.splice(index, 1, updatedBono)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};