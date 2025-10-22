<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import DestroyButton from './button/DestroyButton.vue';
import EditButton from './button/EditButton.vue';
defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  bordered: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="overflow-x-auto bg-white shadow-sm border border-gray-200 ">
    <table class="min-w-full text-sm text-gray-700">
      <!-- HEADER -->
      <thead :class="[bordered ? 'border-b' : '', 'bg-cyan-700 text-white']">
        <tr>
          <th v-for="(col, index) in columns" :key="index" class="px-5 py-3 font-medium text-sm text-center">
            {{ col.label }}
          </th>
          <th class="px-5 py-3 font-medium text-sm text-center">Aksi</th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length + 1" class="text-center py-6 text-gray-500">
            Memuat data...
          </td>
        </tr>

        <tr v-else-if="rows.length" v-for="(row, rowIndex) in rows" :key="rowIndex" :class="[
          striped && rowIndex % 2 === 1 ? 'bg-gray-50' : '',
          'hover:bg-gray-100 transition text-center'
        ]">
          <td v-for="(col, colIndex) in columns" :key="colIndex" class="px-5 py-3 border-t">
            {{ row[col.field] }}
          </td>

          <td class="py-3 border-t">
            <div class="flex justify-center gap-2">
              <EditButton />
              <DestroyButton>hapus</DestroyButton>
            </div>
          </td>
        </tr>

        <tr v-else>
          <td :colspan="columns.length + 1" class="text-center py-6 text-gray-500">
            Tidak ada data untuk ditampilkan
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
