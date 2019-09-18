import axios from 'axios'

const state = {
    employees: []
}

const getters = {
    allEmployees: state => state.employees
}

const actions = {
    async fetchEmployee({commit}){
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/empleados'
        );
        commit('setEmployee', response.data);
    }
}

const mutations = {
    setEmployee: (state, employees) => (state.employees = employees),
}

export default {
    state,
    getters,
    actions,
    mutations
  };