<template>
  <Card class="max-w-3xl mx-auto w-full">
    <!-- Header -->
    <CardHeader>
      <CardTitle class="text-xl font-semibold">{{ title }}</CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>

    <!-- Form -->
    <CardContent>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-for="(field, index) in fields" :key="index">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ field.label }}
          </label>

          <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type"
            v-model="formData[field.name]" :placeholder="field.placeholder"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700" />

          <textarea v-else-if="field.type === 'textarea'" v-model="formData[field.name]"
            :placeholder="field.placeholder" rows="3"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"></textarea>

          <select v-else-if="field.type === 'select'" v-model="formData[field.name]"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700">
            <option v-for="(option, optIndex) in field.options" :key="optIndex" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </form>
    </CardContent>

    <!-- Footer -->
    <CardFooter class="flex justify-end space-x-2">
      <button type="button" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        @click="$emit('cancel')">
        Batal
      </button>
      <button type="submit" class="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 transition"
        @click="handleSubmit">
        {{ submitLabel }}
      </button>
    </CardFooter>
  </Card>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  fields: { type: Array, required: true },
  modelValue: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: "Simpan" },
});

const emit = defineEmits(["update:modelValue", "submit", "cancel"]);

const formData = ref({ ...props.modelValue });

// Sinkronisasi dua arah (v-model)
watch(
  formData,
  (newVal) => emit("update:modelValue", newVal),
  { deep: true }
);

const handleSubmit = () => {
  emit("submit", formData.value);
};
</script>
