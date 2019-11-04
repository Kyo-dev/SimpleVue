import axios from 'axios'

const state = {
    permisos: [],
    permiso: {}
}

const getters = {
    allPermisos: state => state.permisos,
    onePermiso: state => state.permiso
}
const actions = {
    async fetchPermisos({commit}){
        const response = await axios.get(
            'http://localhost:4000/api/usuarios/permisos'
        );
        commit('setPermiso', response.data)
    },
    async getPermiso({commit}, id){
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/permisos/${id}`
            )
            commit('onePermiso', response.data)
            console.log(response.data)
    }, 
    async insertPermiso({commit}, permiso){
        const data = {
            _cedula: permiso.cedula,
	        _fecha: permiso.fecha,
            _descripcion: permiso.descripcion,
            _costoSalarial: permiso.costo_salarial
        }
        const response = await axios.post(
            `http://localhost:4000/api/usuarios/permisos` , data
        )
        commit('newPermiso', response.data);
        console.log(response.data)
    }
}
const mutations = {
    setPermiso(state, permisos){
        state.permisos = permisos
    },
    onePermiso(state, permiso){
        state.permiso = permiso
    },
    newPermiso(state, permiso) {
        state.permisos.unshift(permiso)
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};