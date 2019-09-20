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
        
    }, 
    async insertEmployee({commit}, employee){
        const data = {
            _cedula: employee.cedula,
            _nombre: employee.nombre,
            _p_apellido: employee.p_apellido,
            _s_apellido: employee.s_apellido,
            _correo: employee.correo,
            _fecha_contrato: employee.fecha_contrato,
            _tipo_empleado: employee.tipo_empleado,
            _salario_hora: employee.salario_hora
        }
        console.log('soy el inserEmployee')
        const response = await axios.post(
            'http://localhost:4000/api/usuarios/empleados/', data)
        commit('newEmployee', response.data);
    },

    async deleteEmployee({commit}, cedula){
        console.log('SOY EL DELETE' + cedula)
        await axios.delete(`http://localhost:4000/api/usuarios/empleados/${cedula}`)
        commit('removeEmployee',cedula);
    }
}

const mutations = {
    setEmployee: (state, employees) => (state.employees = employees),
    newEmployee: (state, employee) => state.employees.unshift(employee),
    removeEmployee: (state, cedula) => (state.employees = state.employees.filter(employee => employee.cedula !== cedula))
}

export default {
    state,
    getters,
    actions,
    mutations
  };