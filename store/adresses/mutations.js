export default {
  set(state, address) {
    state.address = address
  },
  setAdresses(state, adresses) {
    if(adresses === []) {
      state.address = null
    }
    state.list = adresses
  }
}
