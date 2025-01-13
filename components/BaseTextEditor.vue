<template>
  <div class="space-y-2">
    <label :for="id" class="block text-sm font-medium">
      {{ label }}
    </label>
    <div>
      <ClientOnly>
        <QuillEditor
          theme="snow"
          :content="modelValue"
          @update:content="onEditorChange"
          contentType="html"
          :placeholder="placeholder"
        />
      </ClientOnly>
    </div>
    <div class="text-red-500 text-xs">
      <p class="mb-1" v-show="messages" v-for="message in messages">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const props = defineProps({
  label: String,
  placeholder: String,
  modelValue: {
    type: String,
    default: "",
  },
  messages: Array,
});

const emit = defineEmits(["update:modelValue"]);

const onEditorChange = (content) => {
  emit("update:modelValue", content);
};
</script>

<style scoped lang="css">
:deep(.ql-editor) {
  min-height: 200px;
  font-family: "DM Sans", sans-serif;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
