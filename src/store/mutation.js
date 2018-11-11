const mutations = {
  /* control the drawer by click function */
  UNDRAWER: function (state) {
    state.IF_DRAWER = !state.IF_DRAWER
  },

  SET_DARK_MODEL: function (state) {
    state.IS_DARK = !state.IS_DARK
    localStorage.setItem('darkModel', state.IS_DARK)
  },

  SET_USER_ID: function (state, data) {
    state.USER_ID = data
    localStorage.setItem('userId', data)
  },

  REMOVE_USER_ID: function (state) {
    state.USER_ID = null
    localStorage.removeItem('userId')
  },

  HIDE_NOT_DONE_TASK: function (state) {
    let _tmpState = !state.SHOW_ALL
    state.SHOW_ALL = _tmpState
    localStorage.setItem('SHOW_ALL', _tmpState)
  },
  /* init the task list */
  SET_TASKS_LIST: function (state, data) {
    state.TASKS = data
  },
  /* query user dash status */
  SET_USER_DASH: function (state, data) {
    state.USER_DASH = data
  },
  /* query employee status */
  SET_EMPLOYEE_DASH: function (state, data) {
    state.EMPLOYEE_DASH = data
  },
  /* logout */
  LOG_OUT: function (state) {
    state.USER_ID = null
    localStorage.removeItem('userId')
  }
}

export default mutations
