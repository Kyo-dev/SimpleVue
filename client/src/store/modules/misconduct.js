import axios from 'axios'

const state = {
    conductas: [],
    conducta: {}
}

const getters = {
    allConductas: state => state.conductas,
    oneConducta: state => state.conducta
}

const actions = {
    async fetchConductas({ commit }) {
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/disciplina'
        )
        commit('setConductas', response.data)
    },
    async getOneConducta({commit}, id){
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/disciplina/${id}`
        )
        commit('newConducta',response.data)
    },
    async insertarConducta({ commit }, conducta) {
        const data = {
            _cedula: conducta.cedula_empleado,
            _fecha: conducta.fecha,
            _descripcion: conducta.descripcion
        }
        const response = await axios.post(
            'http://localhost:4000/api/usuarios/disciplina', data
        )
        commit('newConducta', response.data)
    },
    async updConducta({commit}, conducta){
        const data = {
            _cedula: conducta.cedula_empleado,
            _fecha: conducta.fecha,
            _descripcion: conducta.descripcion
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/disciplina/${conducta.id}`, data
        )
        commit('updatedConducta', response.data)
    },
    async deletedConducta({commit}, id){
        await axios.delete(`http://localhost:4000/api/usuarios/disciplina/${id}`)
        commit('removeConducta', id)
    }
}

const mutations = {
    setConductas(state, conductas) {
        state.conductas = conductas
    },
    newConducta(state, conducta) {
        state.conductas.unshift(conducta)
    },
    newConducta(state, conducta){
        state.conducta = conducta
    },
    updatedConducta: (state, updatedConducta) =>{ 
        const index = state.conductas.findIndex(conducta => conducta.id === updatedConducta.id)
        if (index !== -1) {
            state.conductas.splice(index, 1, updatedConducta)
        }
    },
    removeConducta:(state, id) => state.conductas = state.conductas.filter(act => act.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
};