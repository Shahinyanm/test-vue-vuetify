<template>
  <v-container class="fill-height grey lighten-4" fluid>
    <v-row justify="center" align="center">
      <v-form
          ref="form"
          @submit.prevent="submit"
          class="form-container"
      >
        <v-row>
          <v-flex>
            <v-col>
              <span>Full name</span>
              <v-text-field
                  v-model="formData.fullName"
                  :rules="rules.fullName"
                  filled
                  rounded
                  dense
                  background-color="white"
                  outlined
              />
            </v-col>
            <v-col>
              <span>Country</span>
              <v-autocomplete
                  v-model="formData.country"
                  :items="items"
                  :rules="rules.country"
                  filled
                  rounded
                  dense
                  outlined
                  background-color="white"
                  item-value="flag"
                  item-text="name"
              >
                <template v-slot:item="slotProps">
                  <img width="23" height="15" :src="require('/src/assets/images/flags/' + slotProps.item.flag + '.svg')"
                       alt="flag" class="mr-2">
                  <span>{{ slotProps.item.name }}</span>
                </template>

                <template v-slot:selection="data">
                  <img width="23" height="15" :src="require('/src/assets/images/flags/' + data.item.flag + '.svg')"
                       alt="flag" class="mr-2">
                  <span>{{ data.item.name }}</span>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col>
              <span>Phone number</span>
              <v-text-field
                  v-model="formData.phoneNumber"
                  :rules="rules.phoneNumber"
                  filled
                  rounded
                  dense
                  background-color="white"
                  outlined
              />
            </v-col>
            <v-col>
              <span>email</span>
              <v-text-field
                  v-model="formData.email"
                  :rules="rules.email"
                  filled
                  rounded
                  dense
                  background-color="white"
                  outlined
              />
            </v-col>
            <v-btn
                small
                type="submit"
                color="light-blue lighten-3"
                dark
            >
              login
            </v-btn>
          </v-flex>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import getCountries from '/src/helpers/countries'
import { userService } from '/src/services/userService'


export default {
  name: "Login-page",
  data() {
    const defaultFormData = Object.freeze({
      fullName: '',
      country: '',
      phoneNumber: '',
      email: ''
    })

    return {
      items: [],
      defaultFormData,
      formData: Object.assign({}, defaultFormData),
      rules: {
        fullName: [
          val => !!val.length || 'This field is required',
          val => (val && val.length > 5) || 'The name must be more than 5 symbols'
        ],
        country: [val => !!val.length || 'This field is required'],
        phoneNumber: [
          val => (val || '').length > 9 || 'This field is required',
          val => (val && val.length > 5) || 'The name must be more than 5 symbols'
        ],
        email: [value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }],
      }
    }
  },
  computed: {
    formIsValid() {
      return (
          this.formData.fullName &&
          this.formData.country &&
          this.formData.phoneNumber &&
          this.formData.email
      )
    },
  },
  methods: {
    resetForm() {
      this.formData = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    async submit() {
      if (this.$refs.form.validate()) {

        try {
          const res = await userService.createUser(this.formData)

          if (res.status !== 201) {
            const key = Object.keys(res.errors)
            this.$toast.error(res.errors[key[0]][0]);
            console.log(res)
          }

          // this.resetForm()
        } catch (e) {
          this.$toast.error(e.errors);
          console.log(e)
        }
      }


    },
  },
  watch: {
    'formData.country'(val) {
      this.items.forEach(el => {
        if (el.flag === val) {
          this.formData.phoneNumber = el.idd
        }
      })
    }
  },
  mounted() {
    this.items = getCountries()

  }
}
</script>

<style scoped>
.form-container {
  width: 500px;
}
</style>