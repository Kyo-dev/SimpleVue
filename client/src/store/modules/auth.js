import axios from 'axios'

const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
};
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
}
const actions = {
    login({commit}, user){
        return new Promise((resolve, reject) => {
            // commit('auth_request')
            axios({url: 'http://localhost:4000/api/usuarios/login', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('auth_success', token, user)
                resolve(resp.data)
              })
              .catch(err => {
                commit('auth_error')
                localStorage.removeItem('token')
                reject(err)
              })
            })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      }
}

const mutatios = {
    // auth_reSquest(state){
        // state.status = 'loading'
    //   },
    auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
    //   auth_error(state){
    //     state.status = 'error'
    //   }
}

export default {
    state,
    getters,
    actions,
    mutatios
}