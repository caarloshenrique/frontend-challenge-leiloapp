<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edição de Endereço</span>
          <v-spacer />
          <v-btn color="primary" text @click="closeEditionDialog">
            <v-icon left>mdi-close</v-icon>
            Fechar
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
             <AddressForm
              :address="address"
              :label-button="labelButton"
              @closeEditionDialog="closeEditionDialog"
             />
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AddressForm from './AddressForm'

export default {
  name: 'edition-dialog',
  components: { AddressForm },
  data: () => ({
    labelButton: 'Salvar'
  }),
  props: {
    address: {
      type: Object,
      required: true,
      default: () => {}
    },
    dialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    closeEditionDialog() {
      this.$emit('closeEditionDialog')
    }
  }
}
</script>
