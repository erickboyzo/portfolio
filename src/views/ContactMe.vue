<template>
  <v-row no-gutters>
    <v-col v-if="sent" cols="12 mt-2">
      <v-alert class="pa-4 subtitle-1"
               elevation="4"
               id="success-alert"
               dense
               prominent
               type="success" v-html="$Constants.MESSAGE_SUCCESS">
      </v-alert>
    </v-col>
    <v-col cols="12">
      <Section :loading="loading">
        <template v-slot:header>

          <div class="d-flex justify-center">
            <h3 class="font-weight-regular">{{ $Constants.CONTACT_ME }}</h3>
          </div>

        </template>
        <template v-slot:content>
          <form method="post"
                @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="contact"/>
            <v-text-field
              name="name"
              v-model="form.name"
              label="Full Name"
              prepend-inner-icon="mdi-account"
              outlined
              clearable
              required
            />
            <v-text-field
              name="email"
              v-model="form.email"
              label="Email"
              prepend-inner-icon="mdi-at"
              type="email"
              outlined
              clearable
              required
            />
            <v-text-field
              name="subject"
              v-model="form.subject "
              label="Subject"
              prepend-inner-icon="mdi-email-edit"
              outlined
              clearable
              required
            />
            <v-textarea
              name="message"
              v-model="form.message"
              label="Message"
              prepend-inner-icon="mdi-message-text"
              outlined
              clearable
              required
            />
            <div class="d-flex justify-end">
              <v-btn x-large type="submit" rounded elevation="4"
                     color="primary">{{ $Constants.SEND_MESSAGE }}
                <v-icon class="ml-3">mdi-send</v-icon>
              </v-btn>
            </div>
          </form>
        </template>
        <template v-slot:actions></template>
      </Section>
    </v-col>
  </v-row>
</template>

<script>

import Section from '../components/Section.vue';

export default {
  name: 'ContactMe',
  components: { Section },
  data: () => ({
    form: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    sent: false,
    loading: false,
  }),
  methods: {
    resetForm() {
      this.$set(this.form, 'name', '');
      this.$set(this.form, 'email', '');
      this.$set(this.form, 'subject', '');
      this.$set(this.form, 'message', '');
    },
    encode(data) {
      return Object
        .keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    },
    handleSubmit() {
      this.loading = true;
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': 'contact',
          ...this.form,
        }),
      })
        .then(() => {
          this.sent = true;
          this.resetForm();
          this.$nextTick(() => {
            this.$vuetify.goTo('#success-alert');
          });
          setTimeout(() => {
            this.sent = false;
          }, 8000);
        })
        .catch(() => {
          console.log('Error!');
        }).finally(() => { this.loading = false; });
    },
  },
};
</script>

<style scoped>

</style>
