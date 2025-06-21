<script setup lang="ts">
import z4 from "zod/v4";

const authStore = useAuthStore();
const userStore = useUserStore();
const cloudinaryStore = useCloudinaryStore();

const errorMessage = ref("");
function setErrorMessage(msg: string) {
  errorMessage.value = msg;
  setTimeout(
    () => {
      errorMessage.value = "";
    },
    10000,
  );
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
    tag: "currentPassword",
    type: "password",
    value: "",
    placeholder: "Old Password",
  },
  {
    label: "New Password",
    tag: "password",
    type: "password",
    value: "",
    placeholder: "New Password",
    securePassword: true,
  },
]);

async function changePassword(state: {
  password: string;
  currentPassword: string;
}) {
  await userStore.updateUserPassword({
    currentPassword: state.currentPassword,
    newPassword: state.password,
  });
  changePasswordForm.value[0].value = "";
  changePasswordForm.value[1].value = "";
}

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

const confirmDelete = ref(false);
function toggleConfirmDelete() {
  confirmDelete.value = !confirmDelete.value;
}

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

onMounted(async () => {
  await userStore.getAccount();
});
</script>

<template>
  <section>
    <AppBackButton />
    <h1 class="text-3xl font-bold text-center">
      User Settings
    </h1>
    <AppAlert
      v-if="errorMessage"
      color="error"
      class="w-full max-w-[600px] mx-auto mt-2"
      title="Error"
      icon="i-tabler-info-square-rounded-filled"
      :description="errorMessage"
    />
    <section class="w-full mt-4 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 justify-start gap-4">
      <div class="flex flex-col gap-2">
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
        <AppCard v-if="userStore?.account?.provider === 'credential'">
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
      </div>
      <AppCard v-if="userStore?.account?.provider === 'credential'">
        <template #header>
          <h2>User Password</h2>
        </template>
        <AppForm
          v-model:items="changePasswordForm"
          submit-label="Change Password"
          :loading="userStore.loading"
          :show-hints="false"
          @submit="changePassword"
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
    <AppCard class="mt-4">
      <template #header>
        <h1 class="text-lg">
          Danger Zone
        </h1>
        <p class="text-muted text-md">
          Irreversible actions for your accounts
        </p>
      </template>
      <AppCard theme="error">
        <section class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2>Delete Event</h2>
            <p class="text-muted text-sm">
              Permanently delete this account and all associated data.
            </p>
          </div>
          <AppButton
            label="Delete Account"
            color="error"
            class="px-4 py-3"
            loading-auto
            :loading="userStore.loading"
            @click="toggleConfirmDelete"
          />
        </section>
      </AppCard>
    </AppCard>

    <AppModal
      v-model:open="confirmDelete"
      :dismissible="false"
    >
      <template #content>
        <div class="flex flex-col items-center justify-center gap-2 px-4 py-8">
          <p>Are you sure you want to delete your account?</p>
          <div class="flex gap-4">
            <AppButton
              label="No"
              theme="secondary"
              class="px-4 py-2.5"
              loading-auto
              :loading="userStore.loading"
              @click="toggleConfirmDelete"
            />
            <AppButton
              label="Yes"
              class="px-4 py-2.5"
              loading-auto
              :loading="userStore.loading"
              @click="userStore.deleteUser"
            />
          </div>
        </div>
      </template>
    </AppModal>
  </section>
</template>
