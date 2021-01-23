<template>
  <v-col class="d-flex flex-column align-center">
    <v-icon size="100">
      mdi-map-marker-multiple
    </v-icon>
    <div>Ops, identificamos que ainda não existem endereços cadastrados!</div>
    <div>Para cadastrar novos endereços acesse o item "Cadastro" do menu localizado à esquerda.</div>
  </v-col>
</template>

<script>
export default {
  name: "initial-message"
}
</script>
