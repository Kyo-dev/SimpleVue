import axios from 'axios'

const state = {
    salarios: [],
    salario: {}
}

const getters = {
    allSalarios: state => state.salarios,
    oneSalario: state => state.salario
}

const actions = {
    async fetchSalario({ commit }) {
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/salarios'
        )
        commit('setSalario', response.data)
        console.log(response.data)
    },
    async getSalario({ commit }, id) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/salarios/${id}`
        )
        commit('oneSalario', response.data)
    },
    async insertAumento({ commit }, salario) {
        const data = {
            _cedula: salario.cedula_empleado,
            _cantidad: salario.cantidad,
            _fecha: salario.fecha
        }
        const response = await axios.post(
            'http://localhost:4000/api/usuarios/salarios', data
        )
        commit('newAumento', response.data)
        
    },
    async updSalario({ commit }, salario) {
        const data = {
            _motivo: salario.motivo,
            _cantidad: salario.cantidad,
            _fecha: salario.fecha
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/salarios/${salario.id}`
        )
        commit('updatedSalario', response.data)
    },
    async deletedSalario({commit}, salario){
        const data = {
            _id: salario.id,
            _cedula : salario.cedula_empleado
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/salarios/${salario.id}`, data
        )
        console.log(response.data)
        commit('removeConducta', response.data)
    }
}

const mutations = {
    setSalario: (state, salarios) => state.salarios = salarios,
    newAumento: (state, salario) => state.salarios.unshift(salario),
    oneSalario: (state, salario) => state.salario = salario,
    removeConducta:(state, id) => state.salarios = state.salarios.filter(act => act.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
};