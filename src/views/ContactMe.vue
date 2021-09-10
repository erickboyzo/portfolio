<template>

  <v-row no-gutters>
    <v-col v-if="sent" cols="12 mt-2">
      <v-alert
        dense
        prominent
        type="success">
           <strong>Message Delivered!</strong>
        Thank you for contacting me, I will reach back to you in a short time.
      </v-alert>
    </v-col>
    <v-col cols="12">
      <Section>
        <template v-slot:header>

          <div class="d-flex justify-center">
            <h3 class="font-weight-regular">Contact Me</h3>
          </div>

        </template>
        <template v-slot:content>
          <form method="post"
                @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="contact" />
            <v-text-field
              name="name"
              v-model="form.name"
              label="Your Name"
              outlined
              clearable
              required
            />
            <v-text-field
              name="email"
              v-model="form.email"
              label="Email"
              type="email"
              outlined
              clearable
              required
            />
          <v-text-field
            name="subject"
            v-model="form.subject "
            label="Subject"
            outlined
            clearable
            required
          />
            <v-textarea
              name="message"
              v-model="form.message"
              label="Message"
              outlined
              clearable
              required
            />
            <div class="d-flex justify-end">
              <v-btn x-large type="submit" color="primary"><v-icon>mdi-send</v-icon></v-btn>
            </div>
        </form>
        </template>
        <template v-slot:actions>  </template>
      </Section>
    </v-col>
  </v-row>

</template>

<script>
import axios from 'axios';
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
    sent : false,
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
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": "contact",
          ...this.form
        })
      })
        .then(() => {
         console.log('Success!')
          this.sent = true;
          this.resetForm();
          setTimeout(() => { this.sent = false }, 3000)
        })
        .catch(() => {
          console.log('Error!')
        });
    },
  },
};
</script>

<style scoped>

</style>
