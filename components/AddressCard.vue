<template>
  <v-col class="d-flex justify-space-between mb-6 flex-wrap">
    <v-card v-for="address of adresses" :key="address.id"
      class="mx-auto"
      max-width="350" style="margin-bottom: 2rem"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      >
      </v-img>
      <v-card-text class="text--primary">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon left>mdi-home-map-marker</v-icon>
              Endereço: {{ address.publicPlace }}, {{ address.number }}
            </v-chip>
          </template>
          <span>{{ address.publicPlace }}, {{ address.number }}</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon left>mdi-mailbox</v-icon>
              Complemento: {{ address.complement }}
            </v-chip>
          </template>
          <span>{{ address.complement }}</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon left>mdi-label</v-icon>
              CEP: {{ address.zipCode}}
            </v-chip>
          </template>
          <span>{{ address.zipCode }}</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon left>mdi-city-variant</v-icon>
              Cidade: {{ address.city }}
            </v-chip>
          </template>
          <span>{{ address.city }}</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" color="primary" v-on="on">
              <v-icon left>mdi-earth</v-icon>
              Estado: {{ address.state }}
            </v-chip>
          </template>
          <span>{{ address.state }}</span>
        </v-tooltip>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="openEditionDialog(address)">
          <v-icon left>mdi-pencil</v-icon>
          Editar
        </v-btn>
        <v-spacer />
        <v-btn color="red" text @click="openExclusionDialog(address)">
          <v-icon left>mdi-delete</v-icon>
          Excluir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'address-card',
  props: {
    adresses: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    getEditionAddress(address) {
      return _.cloneDeep(address)
    },
    openEditionDialog(address) {
      const clonedAddress = this.getEditionAddress(address)
      this.$emit('openEditionDialog', clonedAddress)
    },
    openExclusionDialog(address) {
      this.$emit('openExclusionDialog', address)
    }
  }
}
</script>
