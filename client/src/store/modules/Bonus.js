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
    }
}
const mutations = {
    setBonos: (state, bonos) => (state.bonos = bonos)
}
export default {
    state,
    getters,
    actions,
    mutations
  };