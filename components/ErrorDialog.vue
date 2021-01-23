<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-card-title style="color: #FFFFFF" class="headline primary">
          Erro
        </v-card-title>
        <v-card-text class="pa-12">
          Ops, parece que o CEP informado não foi encontrado. Por favor, tente novamente!
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeErrorDialog">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'error-dialog',
  props: {
    dialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    closeErrorDialog() {
      this.$emit('closeErrorDialog')
    }
  }
}
</script>
