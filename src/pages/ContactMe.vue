<template>
  <v-row no-gutters>
    <v-col v-if="sent" md="8" cols="12" offset-md="2">
      <v-card variant="tonal">
        <v-card-text>
          <div class="d-flex justify-end">
            <v-btn variant="text" icon @click="resetPage">
              <v-icon color="primary" size="xxx-large">mdi-window-close</v-icon>
            </v-btn>
          </div>

          <div class="d-flex justify-center">
            <v-icon color="primary" class="email-sent">mdi-email-check-outline</v-icon>
          </div>
          <div class="d-flex justify-center my-2">
            <h1 class="font-weight-light primary-- text-h4" v-html="resumeMetaData.messages.delivered" />
          </div>
          <div class="d-flex my-2">
            <h3 class="font-weight-light primary-- text-h6 text-center" v-html="resumeMetaData.messages.success" />
          </div>

          <div class="d-flex justify-center my-5">
            <v-btn color="primary" size="x-large" variant="tonal" @click="router.push('projects')">
              {{ resumeMetaData.navigation.viewProjects }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" v-else>
      <SectionHeader>{{ resumeMetaData.navigation.contactMe }}</SectionHeader>
      <v-alert v-if="errorSendingEmail" class="mt-2 mb-4" color="error" icon="$error" variant="tonal" closable :title="errorTitle" :text="errorMessage" />
      <v-row>
        <v-col md="5" cols="12">
          <p class="mb-5" v-html="resumeMetaData.content.contactMeMessage" />
        </v-col>
        <v-col md="7" cols="12">
          <form method="post" @submit.prevent="handleSubmit">
            <input type="hidden" name="form-name" value="contact" />
            <v-text-field v-model="form.name" name="name" label="Full Name" prepend-inner-icon="mdi-account" variant="outlined" color="primary" clearable required />
            <v-text-field v-model="form.email" name="email" label="Email" prepend-inner-icon="mdi-at" type="email" variant="outlined" color="primary" clearable required />
            <v-text-field v-model="form.subject" name="subject" label="Subject" prepend-inner-icon="mdi-email-edit" variant="outlined" color="primary" clearable required />
            <v-textarea v-model="form.message" name="message" label="Message" prepend-inner-icon="mdi-message-text" variant="outlined" color="primary" clearable required />
            <div class="d-flex justify-end">
              <v-btn type="submit" variant="tonal" size="x-large" color="primary" :loading="loading">
                {{ resumeMetaData.actions.sendMessage }}
                <v-icon class="ml-3">mdi-send</v-icon>
              </v-btn>
            </div>
          </form>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import SectionHeader from "@/components/SectionHeader.vue";
import { useResumeStore } from "@/stores/store";
import axios from "axios";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const router = useRouter();

const store = useResumeStore();
const { siteMetaData: resumeMetaData } = store;

const errorTitle = computed(() => resumeMetaData.messages.emailErrorTitle);
const errorMessage = computed(() => resumeMetaData.messages.emailErrorMessage);

const form = reactive<ContactForm>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const sent = ref(false);
const loading = ref(false);
const errorSendingEmail = ref(false);

const resetForm = (): void => {
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
};

const resetPage = (): void => {
  sent.value = false;
  errorSendingEmail.value = false;
};

const handleSubmit = async (): Promise<void> => {
  loading.value = true;
  errorSendingEmail.value = false;

  try {
    const response = await axios.post("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: { ...form },
    });

    if (response.status === 200) {
      sent.value = true;
      resetForm();
    } else {
      errorSendingEmail.value = true;
    }
  } catch (error) {
    errorSendingEmail.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
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
