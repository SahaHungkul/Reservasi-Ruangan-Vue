<script setup>
import Footer from '@/components/Footer.vue';
import { ref, onMounted } from 'vue';
import fixedSchedulesService from '@/services/fixedSchedulesService';
import { CalendarPlus } from 'lucide-vue-next';
const schedules = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fixedSchedulesService.getFixedSchedules();
    schedules.value = res.data.data ?? res.data
  } catch (err) {
    error.value = err.res?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Daftar Jadwal</h1>

    <RouterLink to="/"
      class="flex item-center w-fit p-2 bg-blue-500 text-white rounded">
      <CalendarPlus class="mr-1" />
      Tambah
    </RouterLink>

    <div class="overflow-x-auto bg-white shadow-sm border border-gray-200 mt-4">
    </div>
  </div>

  <div class="-mx-8">
    <Footer />
  </div>
</template>
