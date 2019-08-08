import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import lodash from 'lodash'

Vue.use(Vuex)
Vue.use(axios)
Vue.use(lodash)

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    setUsers (state, user) {
      state.users = user
    },
    Updation (state, id, user) {
      console.log('rammm')
      state.users = state.users.map(user => (user.id === id ? user : user))
    },
    insertion (state, userData) {
      state.users.push(userData)
    }
    // deletion (state, id) {
    //   console.log('deleted', id)
    //   // // state.users.
    //   // var _ = require('lodash/core')
    //   // _.remove(state.users, id)
    //   // state.users.pop(id)
    //   state.users = state.users.filter(user => user.id !== id)
    // }

  },
  actions: {
    loadUsers ({ commit }) {
      axios
        .get('http://localhost:4000/students')
        .then(res => res.data.data)
        .then(resusers => {
          commit('setUsers', resusers)
        })
    },
    insertUsers ({ commit }, data) {
      axios
        .post('http://localhost:4000/students', data)
        .then(resInsertCommit => {
          console.log('SOundar')
          if (resInsertCommit.data.data === 'success') {
            commit('insertion', resInsertCommit.data)
          }
        })
    },
    deleteUsers ({ram}, id) {
      console.log('deleleel', id)
      axios
        .delete(`http://localhost:4000/students/${id}`)
        // .then(res => {
        //   console.log('SOundar.....')
        //   if (res.data.data === 'success') {
        //     commit('deletion', id)
        //     console.log('munikuttty')
        //   }
        // }
        // )
    },
    // updateUsers ({ commit }, id) {
    //   axios
    //     .put(`http://localhost:4000/students/${id}`)
    //   console.log('kjhgfd')
    //     .then(resUpdationCommit => {
    //       console.log('SOundar')
    //       if (resUpdationCommit.data.data === 'upsuccess') {
    //         commit('Updation', resUpdationCommit.data)
    //       }
    //     })
    // }
    updateUsers ({ commit }, user) {
      console.log(user)
      axios
        .put(`http://localhost:4000/students/${user.id}`, user)
        .then(resUpdateCommit => {
          console.log('test', resUpdateCommit)
          if (resUpdateCommit.data.data === 'upsucess') {
            commit('Updation', resUpdateCommit.data)
          }
        })
    }
  }
})
