<template>
  <div>
    <InitialMessage
      v-if="empty"
    />
    <AddressCard
      v-else
      :adresses="adresses"
      @openEditionDialog="openEditionDialog"
      @openExclusionDialog="openExclusionDialog"
    />
    <EditionDialog
      :address="address"
      :dialog="editionDialog"
      @closeEditionDialog="closeEditionDialog"
    />
    <ExclusionDialog
      :dialog="exclusionDialog"
      @closeExclusionDialog="closeExclusionDialog"
      @deleteAddress="deleteAddress"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import AddressCard from '@/components/AddressCard'
import EditionDialog from '@/components/EditionDialog'
import ExclusionDialog from '@/components/ExclusionDialog'
import InitialMessage from '@/components/InitialMessage'

export default {
  components: { AddressCard, EditionDialog, ExclusionDialog, InitialMessage },
  data: () => ({
    address: {},
    adresses: null,
    editionDialog: false,
    empty: true,
    exclusionDialog: false
  }),
  mounted() {
    this.initLocalStorage();
  },
  methods: {
    async deleteAddress() {
      await this.$store.dispatch('adresses/getAdresses')
      this.removeItemArray()
      await this.$store.dispatch('adresses/setAdresses', this.adresses)
      this.closeExclusionDialog()
      this.refreshAdresses()
    },
    closeEditionDialog() {
      this.editionDialog = false
    },
    closeExclusionDialog() {
      this.exclusionDialog = false
    },
    async initLocalStorage() {
      await this.$store.dispatch('adresses/getAdresses')
      this.adresses = _.cloneDeep(this.$store.state.adresses.list)
      this.verifyEmptyAdresses()
    },
    openEditionDialog(address) {
      this.editionDialog = true
      this.address = address
    },
    openExclusionDialog(address) {
      this.exclusionDialog = true
      this.address = address
    },
    refreshAdresses() {
      document.location.reload(true)
    },
    removeItemArray() {
      for (let i = 0; i < this.adresses.length ; i++) {
        if (this.adresses[i].id === this.address.id) {
          this.adresses.splice(i, 1)
        }
      }
    },
    verifyEmptyAdresses() {
      this.empty = this.adresses === null || this.adresses.length === 0;
    }
  }
}
</script>
