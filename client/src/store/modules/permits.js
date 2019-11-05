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
    }, 
    async insertPermiso({commit}, permiso){
        const data = {
            _cedula: permiso.cedula_empleado,
	        _fecha: permiso.fecha,
            _descripcion: permiso.descripcion,
            _costoSalarial: permiso.costo_salarial
        }
        const response = await axios.post(
            `http://localhost:4000/api/usuarios/permisos` , data
        )
        commit('newPermiso', response.data);
    },
    async updPermiso({commit}, permiso){
        const data = {
            // _cedula: permiso.cedula_empleado,
            _id: permiso.id,
	        _fecha: permiso.fecha,
            _descripcion: permiso.descripcion,
            _costoSalarial: permiso.costo_salarial
        }
        console.log(data)
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/permisos/${permiso.id}` , data
        )
        commit('updatedPermiso', response.data)
    },
    async deletedPermiso({commit}, id){
        const response = await axios.delete(
            `http://localhost:4000/api/usuarios/permisos/${id}`
        )
        commit('removePermiso', response.data)
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
    },
    removePermiso(state, removePermiso){
        const index = state.permisos.findIndex(permiso => permiso.id === removePermiso.id)
        if (index !== -1) {
            state.permisos.splice(index, 1, removePermiso)
        }
    },
    updatedPermiso: (state, updatedPermiso) =>{ 
        const index = state.permisos.findIndex(permiso => permiso.id === updatedPermiso.id)
        if (index !== -1) {
            state.permisos.splice(index, 1, updatedPermiso)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};