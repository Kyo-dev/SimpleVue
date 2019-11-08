import axios from 'axios'

const state = {
    salarios: [],
    salario: {}
}

const getters = {
    allSalarios: state => state.salarios
}

const actions = {
    async fetchSalario({commit}){
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/salarios'
        )
        commit('setSalario', response.data)
        console.log(response.data)
    },
    async insertAumento({commit}, salario){
        const data ={
            _cedula: salario.cedula_empleado,
            _cantidad: salario.cantidad,
            _fecha: salario.fecha
        }
        const response = await axios.post(
            'http://localhost:4000/api/usuarios/salarios', data
        )
        commit('newAumento', response.data)
        console.log(response.data)
    }
}

const mutations = {
    setSalario: (state, salarios) => state.salarios = salarios,
    newAumento: (state, salario) => state.salarios.unshift(salario)
}

export default {
    state,
    getters,
    actions,
    mutations
};