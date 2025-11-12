<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import dashboardService from '@/services/dashboardService'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const loading = ref(true)
const stats = ref({
  total_reservasi: 0,
  total_ruangan: 0,
  total_jadwal_tetap: 0,
  total_user: 0,
})
const chartData = ref({
  labels: [],
  datasets: []
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true }
  }
}

const fetchDashboard = async () => {
  try {
    loading.value = true
    const res = await dashboardService.getDashboard()
    const data = res.data.data ?? res.data

    stats.value = {
      total_reservasi: data.total_reservasi ?? 0,
      total_ruangan: data.total_ruangan ?? 0,
      total_schedule: data.total_schedule ?? 0,
      total_user: data.total_user ?? 0,
    }

    // siapkan data chart
    const bulan = data.chart_data?.map(item => item.bulan) ?? []
    const jumlah = data.chart_data?.map(item => item.jumlah) ?? []

    console.log(data.chart_data);

    chartData.value = {
      labels: bulan,
      datasets: [
        {
          label: 'Reservasi',
          data: jumlah,
          backgroundColor: '#0e7490',
          borderRadius: 8,
          barThickness: 40
        }
      ]
    }
  } catch (err) {
    console.error('Gagal mengambil data dashboard:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDashboard)
</script>

<template>
  <div class="p-6 space-y-6 text-gray-800">
    <!-- Statistik Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="(value, key) in stats" :key="key" class="border hover:shadow-md transition">
        <CardContent class="p-5">
          <h2 class="text-lg font-semibold capitalize">
            {{ key.replace('total_', '').replace('_', ' ') }}
          </h2>
          <p class="text-3xl font-bold mt-2 text-cyan-700">{{ value }}</p>
          <p v-if="key === 'total_reservasi'" class="text-sm text-gray-500">% dari bulan terakhir</p>
          <p v-else-if="key === 'total_ruangan'" class="text-sm text-gray-500">belum bertambah</p>
          <p v-else-if="key === 'total_jadwal_tetap'" class="text-sm text-gray-500">Belum ada yang terjadwal</p>
          <p v-else class="text-sm text-gray-500">Belum bertambah</p>
        </CardContent>
      </Card>
    </div>

    <!-- Grafik Statistik Reservasi Bulanan -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-semibold mb-4 text-gray-800">Statistik Reservasi Bulanan</h3>
      <div class="w-full h-[400px]">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
