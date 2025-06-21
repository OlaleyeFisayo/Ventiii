<script setup lang="ts">
import z4 from "zod/v4";

const authStore = useAuthStore();
const userStore = useUserStore();
const cloudinaryStore = useCloudinaryStore();

const errorMessage = ref("");
function setErrorMessage(msg: string) {
  errorMessage.value = msg;
  setTimeout(() => {
    errorMessage.value = "";
  }, 5000);
}

const changeNameForm = ref <AppFormItems[]> ([
  {
    tag: "name",
    type: "text",
    value: authStore.user?.name,
  },
]);

async function changeName(state: {
  name: string;
}) {
  if (state.name === authStore.user?.name) {
    setErrorMessage("You’re already using this username. Please enter a different one.");
  }
  else {
    await userStore.updateUser(state);
  }
}

const changeEmailForm = ref <AppFormItems[]> ([
  {
    tag: "email",
    type: "email",
    value: authStore.user?.email,
  },
]);

async function changeEmail(state: {
  email: string;
}) {
  const emailSchema = z4.email();
  const result = emailSchema.safeParse(state.email);
  if (state.email === authStore.user?.email) {
    setErrorMessage("You’re already using this email. Please enter a different one.");
  }
  else if (result.error) {
    setErrorMessage("Please enter a valid email");
  }
  else {
    await userStore.updateUserEmail({
      newEmail: state.email,
    });
  }
}

const changePasswordForm = ref <AppFormItems[]> ([
  {
    label: "Old Password",
    tag: "oldpassword",
    type: "password",
    value: "",
    placeholder: "Confirm New Password",
  },
  {
    label: "New Password",
    tag: "password",
    type: "password",
    value: "",
    securePassword: true,
    placeholder: "New Password",
  },
]);

const changeUsersImage = ref <AppFormItems[]> ([
  {
    label: "Image",
    tag: "image",
    type: "img",
    value: [],
    maxFile: 1,
    maxFileSize: 1 * 1024 * 1024,
  },
]);

async function changeImage(state: {
  image: File[];
}) {
  const {
    url,
  } = await cloudinaryStore.upload(state.image[0] as File);
  await userStore.updateUser({
    image: url,
  });
  changeUsersImage.value[0].value = [];
}
</script>

<template>
  <section>
    <AppBackButton />
    <h1 class="text-3xl font-bold text-center">
      User Settings
    </h1>
    <section class="w-full max-w-[700px] mx-auto mt-4 flex flex-col gap-4">
      <AppAlert
        v-if="errorMessage"
        color="error"
        title="Error"
        icon="i-tabler-info-square-rounded-filled"
        :description="errorMessage"
      />
      <AppCard>
        <template #header>
          <h2>User Name</h2>
        </template>
        <AppForm
          v-model:items="changeNameForm"
          submit-label="Change Name"
          :show-hints="false"
          :loading="userStore.loading"
          @submit="changeName"
        />
      </AppCard>
      <AppCard>
        <template #header>
          <h2>User Email</h2>
        </template>
        <AppForm
          v-model:items="changeEmailForm"
          submit-label="Change Email"
          :show-hints="false"
          :loading="userStore.loading"
          @submit="changeEmail"
        />
      </AppCard>
      <AppCard>
        <template #header>
          <h2>User Password</h2>
        </template>
        <AppForm
          v-model:items="changePasswordForm"
          submit-label="Change Password"
          :show-hints="false"
        />
      </AppCard>
      <AppCard>
        <template #header>
          <h2>User Image</h2>
        </template>
        <div
          v-if="authStore.user?.image"
          class="mb-2"
        >
          <h1>Current Image: </h1>
          <NuxtImg
            alt="User Image"
            :width="100"
            :src="authStore.user?.image"
          />
        </div>
        <AppForm
          v-model:items="changeUsersImage"
          submit-label="Change Image"
          :show-hints="false"
          :loading="cloudinaryStore.loading || userStore.loading"
          @submit="changeImage"
        />
      </AppCard>
    </section>
  </section>
</template>
