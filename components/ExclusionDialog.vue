<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">
          Tem certeza que desaja excluir o endereço?
        </v-card-title>
        <v-card-text>
          Ao confirmar a operação, esse endereço será excluído permanentemente do sistema.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="closeExclusionDialog">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteAddress">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'exclusion-dialog',
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    closeExclusionDialog() {
      this.$emit('closeExclusionDialog')
    },
    deleteAddress() {
      this.$emit('deleteAddress')
    }
  }
}
</script>
