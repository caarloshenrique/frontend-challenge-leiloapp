<template>
  <v-card-text>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <v-row justify="center">
          <v-col cols="12" sm="12" md="6">
            <validation-provider
              v-slot="{ errors }"
              name="CEP"
              :rules="{
                required: true,
                min: 10,
                regex: '^\\d{2}.\\d{3}-\\d{3}$'
              }"
            >
              <v-text-field
                v-model="address.zipCode"
                :error-messages="errors"
                label="CEP"
                required
                v-mask="mask"
                @input="findAddress"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <validation-provider
              v-slot="{ errors }"
              name="logradouro"
              rules="required"
            >
              <v-text-field
                v-model="address.publicPlace"
                :error-messages="errors"
                label="Logradouro"
                required
                :disabled="disabled.publicPlace"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="número"
              :rules="{
                  required: true,
                  numeric: true
              }"
            >
              <v-text-field
                v-model="address.number"
                :error-messages="errors"
                label="Número"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="12" md="8">
            <validation-provider
              v-slot="{ errors }"
              name="complemento"
              rules="required"
            >
              <v-text-field
                v-model="address.complement"
                :error-messages="errors"
                label="Complemento"
                required
                :disabled="disabled.complement"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="12" md="8">
            <validation-provider
              v-slot="{ errors }"
              name="cidade"
              rules="required"
            >
              <v-text-field
                v-model="address.city"
                :error-messages="errors"
                label="Cidade"
                required
                :disabled="disabled.city"
              ></v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <validation-provider
              v-slot="{ errors }"
              name="estado"
              rules="required"
            >
              <v-text-field
                v-model="address.state"
                :error-messages="errors"
                label="Estado"
                required
                :disabled="disabled.state"
              ></v-text-field>
            </validation-provider>
          </v-col>
        </v-row>
        <v-col cols="12" sm="12" md="12">
          <v-row justify="center">
            <v-btn class="mr-4" type="submit" :disabled="invalid" color="success">
              {{ labelButton }}
            </v-btn>
            <v-btn v-if="labelButton === 'Cadastrar'" @click="clear">
              Limpar
            </v-btn>
          </v-row>
        </v-col>
      </form>
    </validation-observer>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mask } from 'vue-the-mask'
import {ValidationObserver, ValidationProvider} from 'vee-validate'

export default {
  name: 'address-form',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    mask
  },
  props: {
    address: {
      type: Object,
      required: true,
      default: () => {}
    },
    labelButton: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: () => ({
    adresses: [],
    mask: "##.###-###",
    disabled: {
      publicPlace: true,
      complement: true,
      city: true,
      state: true,
    }
  }),
  methods: {
    async addAdresses() {
      await this.$store.dispatch('adresses/setAdresses', this.adresses)
    },
    addAddressId() {
      if (this.adresses.length) {
        this.address.id = this.adresses[this.adresses.length - 1].id + 1
      } else {
        this.address.id = 1
      }
    },
    addItemArray() {
      const address = {
        id: this.address.id,
        zipCode: this.address.zipCode,
        publicPlace: this.address.publicPlace,
        number: this.address.number,
        complement: this.address.complement,
        city: this.address.city,
        state: this.address.state
      }
      this.adresses.push(address)
    },
    clear () {
      this.disabled.publicPlace = true
      this.disabled.complement = true
      this.disabled.city = true
      this.disabled.state = true
      this.$emit('clear')
      this.$refs.observer.reset()
    },
    closeEditionDialog() {
      this.$emit('closeEditionDialog')
    },
    editAddress() {
      for (let i = 0; i < this.adresses.length; i++) {
        if (this.adresses[i].id === this.address.id) {
          this.adresses[i] = {
            id: this.address.id,
            zipCode: this.address.zipCode,
            publicPlace: this.address.publicPlace,
            number: this.address.number,
            complement: this.address.complement,
            city: this.address.city,
            state: this.address.state
          }
        }
      }
    },
    enableCity() {
      if (this.address.city === '') {
        this.disabled.city = false
      }
    },
    enableComplement() {
      if (this.address.complement === '') {
        this.disabled.complement = false
      }
    },
    enablePublicPlace() {
      if (this.address.publicPlace === '') {
        this.disabled.publicPlace= false
      }
    },
    enableState() {
      if (this.address.state === '') {
        this.disabled.state = false
      }
    },
    errorFindingAddress() {
      this.$emit('openErrorDialog')
      this.clear()
    },
    async findAddress() {
      if (this.address.zipCode.length === 10) {
        const zipCode = this.preparateZipCode()
        await this.getAddressAPI(zipCode)
        const address = this.$store.state.adresses.address
        if(address.erro === true) {
          this.errorFindingAddress()
        }
        this.updateAddressFields(address)
        this.enablePublicPlace()
        this.enableComplement()
        this.enableCity()
        this.enableState()
      }
    },
    async getAddressAPI(zipCode) {
      await this.$store.dispatch('adresses/get', zipCode)
    },
    openErrorAlert() {
      this.$emit('openErrorAlert')
    },
    openSuccessAlert() {
      this.$emit('openSuccessAlert')
      this.clear()
    },
    preparateZipCode() {
      return this.address.zipCode.replace("-", "").replace(".", "");
    },
    refreshAdresses() {
      document.location.reload(true)
    },
    async submit () {
      await this.$store.dispatch('adresses/getAdresses')
      this.adresses = _.cloneDeep(this.$store.state.adresses.list)
      this.$refs.observer.validate()
      if (this.verifyAddressId()) {
        this.editAddress()
        await this.addAdresses()
        this.closeEditionDialog()
        this.refreshAdresses()
      } else {
        try {
          this.addAddressId()
          this.addItemArray()
          await this.addAdresses()
          this.openSuccessAlert()
        } catch (e) {
          this.openErrorAlert()
        }
      }
    },
    updateAddressFields(address) {
      this.address.publicPlace = address.logradouro
      this.address.complement = address.complemento
      this.address.city = address.localidade
      this.address.state = address.uf
    },
    verifyAddressId() {
      return this.address.id !== null
    }
  }
}
</script>
