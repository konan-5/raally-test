<template>
  <div class="chart">
    <canvas :id="id"></canvas>
  </div>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid';
import Chart from 'chart.js';

import Vue from 'vue';
import { mapGetters } from 'vuex';
export default Vue.extend({
  name: 'app-dashboard-chart',

  props: ['config', 'chartDataKey'],

  data() {
    return {
      id: uuid(),
      componentKey: 0,
    };
  },

  methods: {
    renderChart() {
      const ctx = document.getElementById(this.id);
      ctx.innerHTML = "";

      if (this.chartData && this.chartData.datasets && this.chartData.datasets.length > 0) {
        new Chart(ctx, { ...this.config, data: this.chartData });
      }
    }
  },

  computed: {
    ...mapGetters({
      data: 'dashboard/data',
    }),

    chartData() {
      return this.data[this.chartDataKey];
    }
  },
});
</script>

<style>
.chart {
  background-color: white;
  padding: 24px;
  border: 1px solid #e8e8e8;
}
</style>
