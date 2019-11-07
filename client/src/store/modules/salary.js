import axios from 'axios'

const state = {
    salarios: [],
    salario: {}
}
const getters = {
    allSalarios: state => state.salarios
}
const actions = {
    async fetchSalary({commit}){
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/salarios'
        )
        commit('setSalario', response.data)
        console.log(response.data)
    }
}
const mutations = {
    setSalario: (state, salarios) => state.salarios = salarios
}

export default {
    state,
    getters,
    actions,
    mutations
};