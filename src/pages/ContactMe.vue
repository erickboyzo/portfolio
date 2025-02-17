<template>
  <v-row no-gutters>
    <v-col v-if="sent" md="8" cols="12" offset-md="2">
      <v-card variant="tonal">
        <v-card-text>
          <div class="d-flex justify-end">
            <v-btn variant="text" icon @click="resetPage()">
              <v-icon color="primary" size="xxx-large">mdi-window-close</v-icon>
            </v-btn>
          </div>

          <div class="d-flex justify-center">
            <v-icon color="primary" class="email-sent">mdi-email-check-outline</v-icon>
          </div>
          <div class="d-flex justify-center my-2">
            <h1 class="font-weight-light primary-- text-h4" v-html="resumeMetaData.MESSAGE_DELIVERED"></h1>
          </div>
          <div class="d-flex my-2">
            <h3 class="font-weight-light primary-- text-h6 text-center" v-html="resumeMetaData.MESSAGE_SUCCESS"></h3>
          </div>

          <div class="d-flex justify-center my-5">
            <v-btn color="primary" size="x-large" variant="tonal" @click="$router.push('projects')">{{ resumeMetaData.VIEW_PROJECTS }}</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" v-else>
      <h1 class="font-weight-light mt-5 mb-5 text-h2">{{ resumeMetaData.CONTACT_ME }}</h1>
      <v-alert v-if="errorSendingEmail"
               class="mt-2 mb-4"
               color="error"
               icon="$error"
               variant="tonal"
               closable
               title="Error sending email"
               text="There was a problem delivering your message. Please ensure all required fields are filled out correctly and try again. If you continue to experience issues, please contact me directly via email."
      ></v-alert>
      <v-row>
        <v-col md="5" cols="12">
          <p class="mb-5" v-html="resumeMetaData.CONTACT_ME_MESSAGE"></p>
        </v-col>
        <v-col md="7" cols="12">
          <form method="post" @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="contact"/>
            <v-text-field name="name" v-model="form.name" label="Full Name" prepend-inner-icon="mdi-account" variant="outlined" color="primary" clearable required/>
            <v-text-field name="email" v-model="form.email" label="Email" prepend-inner-icon="mdi-at" type="email" variant="outlined" color="primary" clearable required/>
            <v-text-field name="subject" v-model="form.subject" label="Subject" prepend-inner-icon="mdi-email-edit" variant="outlined" color="primary" clearable required/>
            <v-textarea name="message" v-model="form.message" label="Message" prepend-inner-icon="mdi-message-text" variant="outlined" color="primary" clearable required/>
            <div class="d-flex justify-end">
              <v-btn x-large type="submit" variant="tonal" size="x-large" color="primary"
              >{{ resumeMetaData.SEND_MESSAGE }}
                <v-icon class="ml-3">mdi-send</v-icon>
              </v-btn>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import IconLinks from '@/components/IconLinks.vue';
import { resumeStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContactMeView',
  components: {IconLinks},
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: '',
      },
      sent: false,
      loading: false,
      errorSendingEmail: false,
      resumeMetaData: resumeStore()['siteMetaData'],
    };
  },
  methods: {
    resetForm(): void {
      this.form['name'] = '';
      this.form['email'] = '';
      this.form['subject'] = '';
      this.form['message'] = '';
    },
    resetPage(): void {
      this.sent = false;
      this.errorSendingEmail = false;
    },
    encode(data: { [key: string]: string }): string {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
    },
    handleSubmit(): void {
      this.loading = true;
      this.errorSendingEmail = false;
      fetch('/send-email', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...this.form,
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Message Not Delivered');
          }
          this.sent = true;
          this.resetForm();
        })
        .catch((err) => {
          this.errorSendingEmail = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style lang="scss">
.email-sent {
  font-size: 8em;
}

.icon-link {
  margin-right: 10px;
  height: 60px !important;
  width: 60px !important;

  i {
    font-size: 40px !important;
  }
}
</style>
