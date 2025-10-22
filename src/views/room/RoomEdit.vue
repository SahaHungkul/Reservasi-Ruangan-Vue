<script setup>
import { ref } from 'vue';
import CardForm from '@/components/CardForm.vue';

const form = ref({
  name: "",
  capacity: "",
  description: "",
});

const fields = [
  { name: "name", label: "Nama Ruangan", type: "text", placeholder: "Contoh: Ruang Rapat A" },
  { name: "capacity", label: "Kapasitas", type: "number", placeholder: "Contoh: 20" },
  { name: "description", label: "Deskripsi", type: "textarea", placeholder: "Keterangan tambahan..." },
];


</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Edit Ruangan</h1>
    <CardForm  description="ini ruangan" :fields="fields" v-model="form" submit-label="Simpan"
      @submit="handleSubmit" @cancel="handleCancel"></CardForm>
  </div>
</template>
