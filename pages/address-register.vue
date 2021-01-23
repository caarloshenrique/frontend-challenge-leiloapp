<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-col cols="auto">
        <v-card>
          <v-card-title class="headline justify-center">
            Cadastro de endereços
          </v-card-title>
          <AddressForm
            :address="address"
            :label-button="labelButton"
            @openErrorDialog="openErrorDialog"
            @clear="clear"
            @openSuccessAlert="openSuccessAlert"
            @openErrorAlert="openErrorAlert"
          />
        </v-card>
        <ErrorDialog
          :dialog="dialog"
          @closeErrorDialog="closeErrorDialog"
        />
      </v-col>
      <div style="margin: 3% 10%">
        <v-alert :value="successAlert" type="success">
          Cadastro realizado com sucesso!
        </v-alert>
        <v-alert :value="errorAlert" type="error">
          Não foi possível cadastrar o endereço!
        </v-alert>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import AddressForm from '@/components/AddressForm'
import ErrorDialog from '@/components/ErrorDialog'

export default {
  name: 'address-register',
  components: { AddressForm, ErrorDialog },
  data: () => ({
    address: {
      id: null,
      zipCode: null,
      publicPlace: null,
      number: '',
      complement: null,
      city: null,
      state: null,
    },
    dialog: false,
    labelButton: 'Cadastrar',
    successAlert: false,
    errorAlert: false,
  }),
  mounted() {
    this.initLocalStorage();
  },
  methods: {
    closeErrorDialog() {
      this.dialog = false
    },
    openSuccessAlert() {
      this.successAlert = true
      setTimeout(()=>{
        this.successAlert = false
      },5000)
    },
    openErrorAlert() {
      this.errorAlert = true
      setTimeout(()=>{
        this.errorAlert = false
      },5000)
    },
    openErrorDialog() {
      this.dialog = true
    },
    clear () {
      this.address.zipCode = null
      this.address.publicPlace = null
      this.address.number = ''
      this.address.complement = null
      this.address.city = null
      this.address.state = null
    },
    async initLocalStorage() {
      await this.$store.dispatch('adresses/getAdresses')
      this.adresses = await this.$store.state.adresses.adresses
    }
  },
}
</script>
