import axios from 'axios'

const actions = {
  LOGIN: function (context, data) {
    if (!localStorage.getItem('userId')) {
      axios.post('http://localhost:4000/api/auth/login', data)
        .then(res => {
          if (res.status === 200) {
            context.commit('SET_USER_ID', res.data.loginUserId)
          }
        }).catch(err => {
          alert(err)
        })
    }
  },
  LOGOUT: function (context) {
    // console.log(window.localStorage.getItem('userId'))
    context.commit('REMOVE_USER_ID')
  },
  GET_TASKS_OF_ALL: function (context) {
    axios.get('http://localhost:4000/api/task/user/' + window.localStorage.getItem('userId'))
      .then(data => {
        context.commit('SET_TASKS_LIST', data.data)
      }).catch(err => {
        alert(err)
      })
  },
  UPDATE_ONE_TASK: function (context, [id, updateValue]) {
    axios.post('http://localhost:4000/api/task/' + id, updateValue)
        .catch(err => {
        alert(err)
      })
  },
  CHANGE_DONE_STATUS: function (context, id) {
    context.commit('CHANGE_DONE_STATUS_BY_ID', id)
    var updatedTask = context.getters.GET_TASK_BY_ID(id)
    // sync with database
    axios.put('http://localhost:4000/api/task/' + id, updatedTask)
      .catch(err => { alert(err) })
  },
  DELETE_ONE_TASK: function (context, id) {
    return new Promise((resolve) => {
      resolve(
        axios.delete('http://localhost:4000/api/task/' + id)
          .catch(err => {
            alert(err)
          })
      )
    })
  },
  async UPDATE_AFTER_DELETE (context, id) {
    /*
     combine two asynchronous actions together MUST use async/await to control sequence
     first delete task then update data in stores
      */
    await context.dispatch('DELETE_ONE_TASK', id)
    context.dispatch('GET_TASKS_OF_ALL')
  },
  CREATE_NEW_TASK: function (context, form) {
    axios.post('http://localhost:4000/api/task/user/' + window.localStorage.getItem('userId'), form)
      .then(data => {
        if (data.status === 201) {
          context.dispatch('GET_TASKS_OF_ALL')
        }
      }).catch(err => { alert(err) })
  }
}

export default actions
