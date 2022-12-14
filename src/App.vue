<template>
  <v-app>
    <v-main class="fill-height">
      <user-register/>
    </v-main>
  </v-app>
</template>

<script>
import UserRegister from "@/components/UserRegister";

export default {
  name: 'App',

  components: {
    UserRegister,
  },

  data: () => ({
    //
  }),
};
</script>
