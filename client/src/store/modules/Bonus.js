import axios from 'axios'

const state = {
    bonos : []
}
const getters = {
    allBonos: state => state.bonos
}
const actions = {
    async fetchBonos ({commit}){
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/bonos'
        )
        console.log(response.data)
        commit('setBonos', response.data)
    },
    async insertBono({commit}, bono){
        const data = {
            _cedula: bono.cedula,
            _motivo: bono.motivo,
            _cantidad: bono.cantidad,
            _fecha: bono.fecha
        }
        const response = await axios.post(
            'http://localhost:4000/api/usuarios/bonos', data
        )
        console.log(response.data)
        commit('newBono', response.data)
    },
    async updateBono({commit}, bono){
        const data = {
            _cedula: bono.cedula,
            _motivo: bono.motivo,
            _cantidad: bono.cantidad,
            _fecha: bono.fecha
        }
        const response = await axios.put(
            'http://localhost:4000/api/usuarios/bonos', data
        )
        commit('updBono', response.data)
    }
}
const mutations = {
    setBonos: (state, bonos) => (state.bonos = bonos),
    newBono: (state, bono) => state.bonos.unshift(bono),
    updBono: (state, updBono) => {
        const index = state.bonos.findIndex(bono => bono.id === updBono.id)
        if(index !== -1){
            state.bonos.splice(index, 1, updBono)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
  };