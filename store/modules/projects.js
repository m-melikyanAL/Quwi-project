const state = () => ({
  projectsSuccessData: null,
  projectsErrorData: null,
  projectsLoading: false,
})

const getters = {
  projectsSuccessData: (state) => state.projectsSuccessData,
  projectsErrorData: (state) => state.projectsErrorData,
  projectsLoading: (state) => state.projectsLoading,
}

const mutations = {
  PROJECTS_PROCESS: (state, data) => {
    state.projectsLoading = data
  },
  PROJECTS_SUCCESS: (state, data) => {
    state.projectsSuccessData = data
  },
  PROJECTS_FAILURE: (state, data) => {
    state.projectsErrorData = null
    state.projectsErrorData = data
  },
}

const actions = {
  getProjects({ commit }) {
    commit('PROJECTS_PROCESS', true)
    this.$api
      .$get(`${process.env.apiUrl}projects-manage`)
      .then((response) => {
        commit('PROJECTS_SUCCESS', response.projects)
      })
      .catch((e) => {
        commit('PROJECTS_FAILURE', e)
      })
      .finally(() => {
        commit('PROJECTS_PROCESS', false)
      })
  },
  editProject({ commit }, data) {
    commit('PROJECTS_PROCESS', true)
    this.$api
      .$post(
        `${process.env.apiUrl}projects-manage/update?id=${data.id}`,
        data.payload
      )
      .then((response) => {
        console.log('response', response)
      })
      .catch((e) => {
        commit('PROJECTS_FAILURE', e)
      })
      .finally(() => {
        commit('PROJECTS_PROCESS', false)
      })
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
