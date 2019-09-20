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
        console.log('Soy el axios get ' + response.data)
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
            'http://localhost:4000/api/usuarios/empleados', data)
        commit('newEmployee', response.data);
    },
    async updateEmployee({commit}, employee){
        const response = await axios.put({
            
        })
    }
}

const mutations = {
    setEmployee: (state, employees) => (state.employees = employees),
    newEmployee: (state, employee) => state.employees.unshift(employee)
}

export default {
    state,
    getters,
    actions,
    mutations
  };