<script setup>
import { ref } from "vue";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
//  CardHeader, CardTitle, CardDescription,
const room = ref({
  name: "",
  capacity: "",
  description: "",
});
</script>

<template>
  <div class="p-8 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-black border p-5 rounded-md">Tambah Ruangan</h1>
    <Card class="w-full">


      <CardContent>
        <form class="space-y-4">
          <div>
            <label class="block text-lg font-sans mb-1">Nama Ruangan</label>
            <input type="text" v-model="room.name" placeholder="Contoh: Ruang Rapat 1"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700" />
          </div>

          <div>
            <label class="block text-lg font-sans  mb-1">Kapasitas</label>
            <input type="number" v-model="room.capacity" placeholder="Contoh: 20"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700" />
          </div>
          <div>
            <label class="block text-lg font-sans mb-1" for="">Keterangan</label>
            <input type="text" v-model="room.description" placeholder="Keterangan"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700 ">
          </div>

          <div>
            <label class="block text-lg font-sans mb-2">Status</label>
            <div class="flex items-center space-x-6">
              <!-- Aktif -->
              <label for="active" class="flex items-center cursor-pointer space-x-2">
                <input type="radio" name="status" id="active" value="active" class="hidden peer" />
                <span
                  class="w-4 h-4 inline-block border border-gray-400 rounded peer-checked:bg-green-500 transition"></span>
                <span class="text-gray-700">Aktif</span>
              </label>

              <!-- Tidak Aktif -->
              <label for="inactive" class="flex items-center cursor-pointer space-x-2">
                <input type="radio" name="status" id="inactive" value="inactive" class="hidden peer" />
                <span
                  class="w-4 h-4 inline-block border border-gray-400 rounded peer-checked:bg-red-500 transition"></span>
                <span class="text-gray-700">Tidak Aktif</span>
              </label>
            </div>
          </div>

        </form>
      </CardContent>

      <CardFooter class="flex justify-end space-x-2">
        <router-link :to="{ name: 'RoomIndex' }">
          <button type="submit"
            class="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 cursor-pointer transition">
            Simpan
          </button>
        </router-link>
        <router-link :to="{ name: 'RoomIndex' }">
          <button type="button"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer transition">
            Batal
          </button>
        </router-link>
      </CardFooter>
    </Card>
  </div>
</template>
