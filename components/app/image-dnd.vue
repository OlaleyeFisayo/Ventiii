<script setup lang="ts">
type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

type Props = {
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  acceptedTypes?: string[];
  modelValue?: File[];
  preview?: boolean;
};

type Emits = {
  (e: "update:modelValue", files: File[]): void;
  (e: "change", files: File[]): void;
  (e: "error", error: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  maxFiles: 0, // 0 means unlimited
  maxFileSize: 10 * 1024 * 1024, // 10MB default
  acceptedTypes: () => ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"],
  preview: false,
});

const emit = defineEmits<Emits>();

// Reactive state
const images = ref<ImageFile[]>([]);
const isDragging = ref(false);
const isUploading = ref(false);
const errors = ref<string[]>([]);
const showPreview = ref(false);
const previewingImage = ref<ImageFile | null>(null);

// Template refs
const dropZone = ref<HTMLElement>();
const fileInput = ref<HTMLInputElement>();

// Watch for external changes to modelValue
watch(() => props.modelValue, (newFiles) => {
  if (newFiles && newFiles.length !== images.value.length) {
    loadFilesFromProps(newFiles);
  }
}, {
  immediate: true,
});

// Drag and drop handlers
let dragCounter = 0;

function handleDragEnter(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  dragCounter++;
  isDragging.value = true;
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
}

function handleDragLeave(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  dragCounter--;
  if (dragCounter === 0) {
    isDragging.value = false;
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  e.stopPropagation();
  dragCounter = 0;
  isDragging.value = false;

  const files = Array.from(e.dataTransfer?.files || []);
  processFiles(files);
}

// File input handler
function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelect(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = Array.from(target.files || []);
  processFiles(files);

  // Reset input value to allow selecting the same file again
  target.value = "";
}

// File processing
async function processFiles(files: File[]) {
  if (files.length === 0)
    return;

  isUploading.value = true;
  errors.value = [];

  try {
    const validFiles = validateFiles(files);

    if (validFiles.length > 0) {
      const newImages = await Promise.all(
        validFiles.map(async file => ({
          id: generateId(),
          file,
          preview: await createPreview(file),
        })),
      );

      // Check max files limit
      const totalFiles = images.value.length + newImages.length;
      if (props.maxFiles > 0 && totalFiles > props.maxFiles) {
        const allowedCount = props.maxFiles - images.value.length;
        if (allowedCount > 0) {
          images.value.push(...newImages.slice(0, allowedCount));
          errors.value.push(`Only ${allowedCount} more files allowed. Some files were not added.`);
        }
        else {
          errors.value.push(`Maximum ${props.maxFiles} files allowed.`);
        }
      }
      else {
        images.value.push(...newImages);
      }

      emitChanges();
    }
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (error) {
    errors.value.push("Error processing files. Please try again.");
    emit("error", "Error processing files");
  }
  finally {
    isUploading.value = false;
  }
}

function validateFiles(files: File[]): File[] {
  const validFiles: File[] = [];

  for (const file of files) {
    // Check file type
    if (!props.acceptedTypes.includes(file.type)) {
      errors.value.push(`${file.name}: File type not supported. Please select an image file.`);
      continue;
    }

    // Check file size
    if (file.size > props.maxFileSize) {
      errors.value.push(`${file.name}: File too large. Maximum size is ${formatFileSize(props.maxFileSize)}.`);
      continue;
    }

    // Check for duplicates based on name and size
    const isDuplicate = images.value.some(img =>
      img.file.name === file.name && img.file.size === file.size,
    );

    if (isDuplicate) {
      errors.value.push(`${file.name}: File already selected.`);
      continue;
    }

    validFiles.push(file);
  }

  return validFiles;
}

function createPreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Image management
function removeImage(index: number) {
  // Revoke the object URL to free memory
  URL.revokeObjectURL(images.value[index].preview);
  images.value.splice(index, 1);
  emitChanges();
}

function previewImage(image: ImageFile) {
  previewingImage.value = image;
  showPreview.value = true;
}

// Utility functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatFileSize(bytes: number): string {
  if (bytes === 0)
    return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function removeError(index: number) {
  errors.value.splice(index, 1);
}

// Emit changes
function emitChanges() {
  const files = images.value.map(img => img.file);
  emit("update:modelValue", files);
  emit("change", files);
}

// Load files from props (for v-model support)
async function loadFilesFromProps(files: File[]) {
  if (!files || files.length === 0) {
    images.value = [];
    return;
  }

  isUploading.value = true;

  try {
    const newImages = await Promise.all(
      files.map(async file => ({
        id: generateId(),
        file,
        preview: await createPreview(file),
      })),
    );

    images.value = newImages;
  }
  catch (error) {
    console.error("Error loading files from props:", error);
  }
  finally {
    isUploading.value = false;
  }
}

// Cleanup on unmount
onUnmounted(() => {
  // Revoke all object URLs to prevent memory leaks
  images.value.forEach((img) => {
    if (img.preview.startsWith("blob:")) {
      URL.revokeObjectURL(img.preview);
    }
  });
});

// Expose methods for parent component
defineExpose({
  clearImages: () => {
    images.value.forEach((img) => {
      if (img.preview.startsWith("blob:")) {
        URL.revokeObjectURL(img.preview);
      }
    });
    images.value = [];
    emitChanges();
  },
  addFiles: (files: File[]) => processFiles(files),
  getImages: () => images.value,
  getFiles: () => images.value.map(img => img.file),
});
</script>

<template>
  <div class="w-full">
    <!-- Drag and Drop Area -->
    <div
      ref="dropZone"
      class="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 transition-colors duration-200"
      :class="{
        'border-primary-500 bg-primary-50 dark:bg-primary-950': isDragging,
        'hover:border-gray-400 dark:hover:border-gray-500': !isDragging,
      }"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Upload Area Content -->
      <div class="text-center">
        <UIcon
          name="i-tabler-photo"
          class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
        />
        <div class="mt-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <UButton
              variant="link"
              class="font-medium text-primary-600 hover:text-primary-500"
              @click="triggerFileInput"
            >
              Click to upload
            </UButton>
            or drag and drop
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            PNG, JPG, GIF up to {{ formatFileSize(maxFileSize) }}
            <span v-if="maxFiles > 0">(Max {{ maxFiles }} files)</span>
          </p>
        </div>
      </div>

      <!-- Hidden File Input -->
      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      >

      <!-- Loading Overlay -->
      <div
        v-if="isUploading"
        class="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-lg"
      >
        <div class="text-center">
          <UIcon
            name="i-tabler-loader-2"
            class="animate-spin h-8 w-8 text-primary-500 mx-auto"
          />
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Processing images...
          </p>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div
      v-if="errors.length > 0"
      class="mt-4"
    >
      <UAlert
        v-for="(error, index) in errors"
        :key="index"
        color="red"
        variant="soft"
        :title="error"
        class="mb-2"
        @close="removeError(index)"
      />
    </div>

    <!-- Image Previews -->
    <div
      v-if="images.length > 0"
      class="mt-6"
    >
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
        Selected Images ({{ images.length }}{{ maxFiles > 0 ? `/${maxFiles}` : '' }})
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="(image, index) in images"
          :key="image.id"
          class="relative group aspect-square"
        >
          <!-- Image Preview -->
          <div class="relative w-full h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <NuxtImg
              :src="image.preview"
              :alt="image.file.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />

            <!-- Overlay on Hover -->
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div class="flex space-x-2">
                <!-- View Button (only if preview is enabled) -->
                <UButton
                  v-if="preview"
                  icon="i-tabler-eye"
                  size="sm"
                  color="white"
                  variant="solid"
                  @click="previewImage(image)"
                />

                <!-- Remove Button -->
                <UButton
                  icon="i-tabler-trash"
                  size="sm"
                  color="error"
                  variant="solid"
                  @click="removeImage(index)"
                />
              </div>
            </div>
          </div>

          <!-- Image Info -->
          <div class="mt-2">
            <p
              class="text-xs text-gray-600 dark:text-gray-400 truncate"
              :title="image.file.name"
            >
              {{ image.file.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-500">
              {{ formatFileSize(image.file.size) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Preview Modal (only if preview prop is true) -->
    <UModal
      v-if="preview"
      v-model="showPreview"
      :ui="{ width: 'max-w-4xl' }"
    >
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ previewingImage?.file.name }}
          </h3>
          <UButton
            icon="i-tabler-x"
            variant="ghost"
            @click="showPreview = false"
          />
        </div>

        <div class="flex justify-center">
          <NuxtImg
            v-if="previewingImage"
            :src="previewingImage.preview"
            :alt="previewingImage.file.name"
            class="max-w-full max-h-96 object-contain rounded-lg"
          />
        </div>

        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Size: {{ previewingImage ? formatFileSize(previewingImage.file.size) : '' }} •
          Type: {{ previewingImage?.file.type }}
        </div>
      </div>
    </UModal>
  </div>
</template>
