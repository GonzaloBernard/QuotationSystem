import router from '../../../routes/routes'
function initialState() {
    return {
      ultimaCotizacion: null,
      entry: {
        id: null,
        descripcion: '',
        productos: [],
        created_at: '',
        updated_at: '',
        deleted_at: ''
      },
      loading: false
    }
  }

  const route = 'cotizacion'

  const getters = {
    entry: state => state.entry,
    lists: state => state.lists,
    loading: state => state.loading,
    cotizacionActual: state => state.cotizacionActual
  }

  const actions = {
    storeData({ commit, dispatch, rootGetters}, clientes) {

      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })

      return new Promise((resolve, reject) => {
        let params = {
        descripcion: "Descripcion generica",
        productos: rootGetters['CotizacionParcial/getCotizacionParcial'].map(prod => {
            return {cantidad: prod.cantidad, id: prod.id}
            }),
        clientes
        }
        axios
          .post(route, params)
          .then(response => {
            router.push({name: 'cotizacion.show', params: {id: response.data.data.id}})
            resolve(response)
          })
          .catch(error => {
            let message = error.response.data.message || error.message
            let errors = error.response.data.errors

            dispatch(
              'Alert/setAlert',
              { message: message, errors: errors, color: 'danger' },
              { root: true }
            )

            reject(error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      })
    },
    updateData({ commit, state, dispatch }) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })

      return new Promise((resolve, reject) => {
        let params = objectToFormData(state.entry, {
          indices: true,
          booleansAsIntegers: true
        })
        params.set('_method', 'PUT')
        axios
          .post(`${route}/${state.entry.id}`, params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            let message = error.response.data.message || error.message
            let errors = error.response.data.errors

            dispatch(
              'Alert/setAlert',
              { message: message, errors: errors, color: 'danger' },
              { root: true }
            )

            reject(error)
          })
          .finally(() => {
            commit('setLoading', false)
          })
      })
    },
    setCreatedAt({ commit }, value) {
      commit('setCreatedAt', value)
    },
    setUpdatedAt({ commit }, value) {
      commit('setUpdatedAt', value)
    },
    setDeletedAt({ commit }, value) {
      commit('setDeletedAt', value)
    },
    fetchCreateData({ commit }) {
      axios.get(`${route}/create`).then(response => {
        commit('setLists', response.data.meta)
      })
    },
    fetchEditData({ commit, dispatch }, id) {
      axios.get(`${route}/${id}/edit`).then(response => {
        commit('setEntry', response.data.data)
        commit('setLists', response.data.meta)
      })
    },
    fetchShowData({ commit, dispatch }, id) {
      axios.get(`${route}/${id}`).then(response => {
        commit('setEntry', response.data.data)
      })
    },
    resetState({ commit }) {
      commit('resetState')
    },
    cotizacionPDF({ commit }, value) {
        commit('setLoading', true)
        //dispatch('Alert/resetState', null, { root: true })

        return new Promise((resolve, reject) => {
          let params = {
          cliente: value.cliente,
          cotizacion: value.cotizacion
          }
          axios
            .post(`${route}PDF`, params)
            .then(response => {
                alert(response.data);
                console.log(response.data);
                resolve(response)
            })
            .catch(error => {
              let message = error.response.data.message || error.message
              let errors = error.response.data.errors

              /* dispatch(
                'Alert/setAlert',
                { message: message, errors: errors, color: 'danger' },
                { root: true }
              ) */

              reject(error)
            })
            .finally(() => {
              commit('setLoading', false)
            })
        })
      },
  }

  const mutations = {
    setCotizacionActual(state, cotizacion) {
        state.cotizacionActual = cotizacion
    },
    setEntry(state, entry) {
      state.entry = entry
    },
    setCreatedAt(state, value) {
      state.entry.created_at = value
    },
    setUpdatedAt(state, value) {
      state.entry.updated_at = value
    },
    setDeletedAt(state, value) {
      state.entry.deleted_at = value
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    resetState(state) {
      state = Object.assign(state, initialState())
    }
  }

  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }
