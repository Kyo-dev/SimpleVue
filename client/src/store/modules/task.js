import axios from 'axios'

const state = {
    tareas: [],
    tareasDoc: [],
    tareasDep: [],
    tareasMen: [],
    tarea: {}
}

const getters = {
    allTareas: state => state.tareas,
    allTareasDoc: state => state.tareasDoc,
    allTareasDep: state => state.tareasDep,
    allTareasMen: state => state.tareasMen,
    oneTarea: state => state.tarea
}

const actions = {
    async obtenerTarea({commit}, id){
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/tareas/${id}`
        )
        console.log(response.data)
        commit('unaTarea', response.data)
    },
    async fetchTareasDoctor({ commit }) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/tareas-doctor`
        )
        commit('setTareasDoctor', response.data)
    },
    async fetchTareasDependiente({ commit }) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/tareas-dependiente`
        )
        commit('setTareasDependiente', response.data)
    },
    async fetchTareasMensajero({ commit }) {
        const response = await axios.get(
            `http://localhost:4000/api/usuarios/tareas-mensajero`
        )
        commit('setTareasMensajero', response.data)
    },
    async insertTarea({ commit }, tarea) {
        const data = {
            _titulo: tarea.titulo,
            _descripcion: tarea.descripcion,
            _id_tipo_empleado: tarea.tipoTarea
        }
        const response = await axios.post(
            `http://localhost:4000/api/usuarios/tareas`, data
        )
        commit('newTarea', response.data)
    },
    async actualizarTarea({commit}, tarea){
        const data = {
            _titulo: tarea.titulo,
            _descripcion: tarea.descripcion,
            _id_tipo_empleado: tarea.tipoTarea
        }
        const response = await axios.put(
            `http://localhost:4000/api/usuarios/tareas/${tarea.id}`, data
        )
        commit('tareaActualizada', response.data)
    },
    async deletedTarea({commit}, id){
        const response = await axios.delete(
            `http://localhost:4000/api/usuarios/tareas/${id}`
        )
        commit('removeTarea', response.data)
    }
}
const mutations = {
    unaTarea: (state, tarea ) => state.tarea = tarea,
    setTareasDoctor: (state, tareas) => state.tareasDoc = tareas,
    setTareasDependiente: (state, tareas) => state.tareasDep = tareas,
    setTareasMensajero: (state, tareas) => state.tareasMen = tareas,
    newTarea: (state, tarea) =>  state.tareas.unshift(tarea),
    tareaActualizada: (state, tareaActualizada) =>{ 
        const index = state.tareas.findIndex(tarea => tarea.id === tareaActualizada.id)
        if (index !== -1) {
            state.tareas.splice(index, 1, tareaActualizada)
        }
    },
    removeTarea:(state, id) => state.tareas = state.tareas.filter(act => act.id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
};