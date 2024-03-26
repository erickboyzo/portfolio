<template>
  <v-row no-gutters>
    <v-col v-if="sent" md="8" cols="12" offset-md="2">
      <v-card>
        <v-card-text>
          <div class="d-flex justify-end">
            <v-btn variant="flat" icon @click="sent = false">
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
            <v-btn color="primary" size="x-large" variant="tonal">Go to Projects</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col v-else cols="12">
      <h1 class="font-weight-light primary-- text-h3 mt-5 mb-2">{{ resumeMetaData.CONTACT_ME }}</h1>

      <v-card class="my-2" :loading="loading">
        <v-card-text>
          <form method="post" @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="contact" />
            <v-text-field name="name" v-model="form.name" label="Full Name" prepend-inner-icon="mdi-account" variant="outlined" color="primary" clearable required />
            <v-text-field name="email" v-model="form.email" label="Email" prepend-inner-icon="mdi-at" type="email" variant="outlined" color="primary" clearable required />
            <v-text-field name="subject" v-model="form.subject" label="Subject" prepend-inner-icon="mdi-email-edit" variant="outlined" color="primary" clearable required />
            <v-textarea name="message" v-model="form.message" label="Message" prepend-inner-icon="mdi-message-text" variant="outlined" color="primary" clearable required />
            <div class="d-flex justify-end">
              <v-btn x-large type="submit" variant="tonal" size="x-large" color="primary"
                >{{ resumeMetaData.SEND_MESSAGE }}
                <v-icon class="ml-3">mdi-send</v-icon>
              </v-btn>
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { resumeStore } from "@/stores/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContactMeView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      sent: false,
      loading: false,
      resumeMetaData: resumeStore().siteMetaData,
    };
  },
  methods: {
    resetForm(): void {
      this.form["name"] = "";
      this.form["email"] = "";
      this.form["subject"] = "";
      this.form["message"] = "";
    },
    encode(data: { [key: string]: string }): string {
      return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join("&");
    },
    handleSubmit(): void {
      this.loading = true;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": "contact",
          ...this.form,
        }),
      })
        .then(() => {
          this.sent = true;
          this.resetForm();
        })
        .catch(() => {
          console.log("Error!");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
</script>

<style lang="scss" scoped>
.email-sent {
  font-size: 8em;
}
</style>
