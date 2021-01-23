export default {
  async get({commit}, zipCode) {
    try {
      await this.$axios.$get(`http://viacep.com.br/ws/${zipCode}/json`).then((res) => {
        commit('set', res)
      })
    } catch (error) {
      throw error
    }
  },
  async getAdresses({commit}) {
    const adresses = JSON.parse(localStorage.getItem('adresses'))
    if (adresses === null) {
        await localStorage.setItem('adresses', JSON.stringify([]))
    }
    await commit('setAdresses', adresses)
  },
  async set({commit}, address) {
    await commit('set', address)
  },
  async setAdresses({commit}, adresses){
    await localStorage.setItem('adresses', JSON.stringify(adresses))
  }
}
