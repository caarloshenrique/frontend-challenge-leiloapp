<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list color="primary" dark style="height: 4rem">
        <v-list-item two-line>
          <v-icon dark style="margin-right: 1rem">
            mdi-map-marker-multiple
          </v-icon>
          <v-list-item-content color="primary">
            <v-list-item-title>E-address</v-list-item-title>
            <v-list-item-subtitle>Gerenciador de endereços</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
      dark
      color="primary"
      class="justify-center"
    >
      <span>E-address &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Endereços',
          to: '/'
        },
        {
          icon: 'mdi-map-marker-plus',
          title: 'Cadastro',
          to: '/address-register'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ''
    }
  }
}
</script>
