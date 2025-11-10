<script setup>
import Footer from "@/components/Footer.vue";
import { ref, onMounted } from "vue";
import { UserPlus } from 'lucide-vue-next';
import userService from "@/services/UserService";

const users = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await userService.getUsers();
    users.value = response.data.data ?? response.data; // tergantung struktur response API
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div class="space-y-5">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Daftar User</h1>

    <RouterLink to="/admin/user/create" class="p-2 flex item-center w-fit bg-blue-500 text-white rounded">
      <UserPlus class="mr-1" />
      Tambah
    </RouterLink>

    <div class="overflow-x-auto bg-white shadow-sm border border-gray-200 mt-4">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-cyan-700 text-white">
          <tr>
            <th class="px-5 py-3 font-medium text-sm text-center">No</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Nama</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Email</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Role</th>
            <th class="px-5 py-3 font-medium text-sm text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, i) in users" :key="item.id">
            <td class="text-center py-3">{{ i + 1 }}</td>
            <td class="text-center py-3">{{ item.name }}</td>
            <td class="text-center py-3">{{ item.email }}</td>
            <td class="text-center py-3">{{ item.role }}</td>
            <td class="text-center py-3">
              <div class="flex justify-center gap-2">
                <RouterLink :to="`/admin/user/${item.id}/edit`" class="bg-blue-600 p-2 rounded text-white">Edit
                </RouterLink>
                <button @click="deleteUser(item.id)" class="bg-red-500 rounded text-white p-2 cursor-pointer">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="-mx-8">
    <Footer />
  </div>
</template>
