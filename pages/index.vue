<template>
  <section class='container'>
    <div class='form'>
      <form @submit.prevent='insert'>
        <label>
          <b>Name</b>
        </label>
        <input type='text' name='name' v-model='user.name' />
        <label>
          <b>Email</b>
        </label>
        <input type='text' name='name' v-model='user.email' />
        <label>
          <b>Mark</b>
        </label>
        <input type='text' name='name' v-model='user.mark' />
        <button>Create</button>
      </form>
    </div>
    <div>
    <table class='table table-striped'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mark</th>
        </tr>
      </thead>
      <!-- <tbody>
        <tr v-for='user in users' :key='user.id'>
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.mark }}</td>   
          <td><button @click='deleting(user.id)'>delete</button></td>
          <td><button @click='update(user.id)'>Update</button></td>
        </tr>
      </tbody>-->

      <tbody>
        
        <tr v-for='user in users' :key='user.id'>

          <td v-if='editing === user.id'>
            <input type='text' v-model='user.id' />
          </td>

          <td v-else>{{user.id}}</td>

          <td v-if='editing === user.id'>
            <input type='text' v-model='user.name' />
          </td>

          <td v-else>{{user.name}}</td>

          <td v-if='editing === user.id'>
            <input type='text' v-model='user.email' />
          </td>

          <td v-else>{{user.email}}</td>

          <td v-if='editing === user.id'>
            <input type='text' v-model='user.mark' />
          </td>

          <td v-else>{{user.mark}}</td>

          <td v-if='editing === user.id'>
            <button @click='editUser(user, user.id)'>Save</button>
            <button @click='cancelEdit(user, user.id)'>Cancel</button>
          </td>
          <td v-else>
            <button @click='editMode(user,user.id)'>Edit</button>
            <button @click='deleting(user.id)'>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import store from '../store/store'

export default {
  name: 'userApp',
  data () {
    return {
      user: {
        id: '',
        name: '',
        email: '',
        mark: ''
      },
      editing: null
    }
  },
  store,
  mounted () {
    this.$store.dispatch('loadUsers')
  },
  computed: mapState(['users']),
  methods: {
    insert () {
      this.$store.dispatch('insertUsers', this.user)
    },
    // editing (user, id) {
    //   this.$store.dispatch('editing', user, id)
    // },
    deleting (id) {
      console.log('sounder delete')
      this.$store.dispatch('deleteUsers', id)
    },
    // editing (id) {
    //   console.log('Update')
    //   this.$store.dispatch('updateUsers', id)
    // },
    editUser (user, id) {
      console.log(user, id)
      if (user.name === '' || user.email === '' || user.mark === '') return
      this.$store.dispatch('updateUsers', user)
      this.editing = null
      console.log('editUser')
    },
    editMode (user, id) {
      this.editing = id
      this.cachedUser = Object.assign({}, user)
      console.log('edite')
    },
    cancelEdit (user, id) {
      console.log('cancel.')
      Object.assign(user, this.cachedUser)
      this.editing = null
    }
  }
}
</script>

<style scoped>
.title {
  margin: 30px 0;
}
.users {
  list-style: none;
  margin: 0;
  padding: 0;
}
.user {
  margin: 10px 0;
}
</style>
