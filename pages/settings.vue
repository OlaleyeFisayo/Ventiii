<script setup lang="ts">
const changeEmailForm = ref <AppFormItems[]> ([
  {
    tag: "email",
    type: "email",
    value: "",
  },
]);

const changePasswordForm = ref <AppFormItems[]> ([
  {
    label: "New Password",
    tag: "password",
    type: "password",
    value: "",
    securePassword: true,
    placeholder: "New Password",
  },
  {
    label: "Confirm New Password",
    tag: "confirmPassword",
    type: "password",
    value: "",
    placeholder: "Confirm New Password",
  },
]);

const changeUsersImage = ref <AppFormItems[]> ([
  {
    label: "Image",
    tag: "image",
    type: "img",
    value: [],
    maxFile: 1,
    maxFileSize: 5 * 1024 * 1024,
  },
]);
</script>

<template>
  <section>
    <AppBackButton />
    <h1 class="text-3xl font-bold text-center">
      User Settings
    </h1>
    <section class="w-full max-w-[700px] mx-auto mt-4 flex flex-col gap-4">
      <AppCard>
        <template #header>
          <h2>Change Email</h2>
        </template>
        <AppForm
          v-model:items="changeEmailForm"
          submit-label="Change Email"
          :show-hints="false"
        />
      </AppCard>
      <AppCard>
        <template #header>
          <h2>Change Password</h2>
        </template>
        <AppForm
          v-model:items="changePasswordForm"
          submit-label="Change Password"
          :show-hints="false"
        />
      </AppCard>
      <AppCard>
        <template #header>
          <h2>Change Image</h2>
        </template>
        <AppForm
          v-model:items="changeUsersImage"
          submit-label="Change Image"
          :show-hints="false"
        />
      </AppCard>
    </section>
  </section>
</template>
