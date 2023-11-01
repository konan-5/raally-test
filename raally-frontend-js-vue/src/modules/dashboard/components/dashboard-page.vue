<template>
  <div>
    <div
      class="app-page-spinner"
      v-if="loading"
      v-loading="loading"
    ></div>
    <el-row type="flex" :gutter="16" v-if="data">
      <el-col :md="12" :sm="24">
        <app-dashboard-chart :config="options.mix1" :chartDataKey="'numberOfPeople'" ref="numberOfPeopleChart" />
      </el-col>
      <el-col :md="12" :sm="24">
        <app-dashboard-chart :config="options.doughnut" :chartDataKey="'currentUsageDataByHours'" ref="currentUsageDataByHoursChart" />
      </el-col>
      <el-col :md="12" :sm="24">
        <app-dashboard-chart :config="options.doughnut" :chartDataKey="'currentUsageDataByPeople'" ref="currentUsageDataByPeopleChart" />
      </el-col>
      <el-col :md="12" :sm="24">
        <app-dashboard-chart :config="options.radar" :chartDataKey="'currentIdlePeopleByRole'" ref="currentIdlePeopleByRooleChart" />
      </el-col>
    </el-row>
    <p class="dashboard-bottom-message">
      {{data.totalElapsedTimeMessage}}
    </p>
  </div>
</template>

<script lang="ts">
import { i18n } from '@/i18n';
import DashboardChart from '@/modules/dashboard/components/dashboard-chart.vue';

import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
export default Vue.extend({
  name: 'app-dashboard-page',

  components: {
    'app-dashboard-chart': DashboardChart,
  },

  async mounted() {
    await this.doFetchData();
    this.renderCharts();
  }, 

  methods: {
    ...mapActions({
      doFetchData: 'dashboard/doFetchData',
    }),
    async renderCharts() {
      this.$refs.numberOfPeopleChart.renderChart();
      this.$refs.currentIdlePeopleByRooleChart.renderChart();
      this.$refs.currentUsageDataByHoursChart.renderChart();
      this.$refs.currentUsageDataByPeopleChart.renderChart();
    },
  },

  computed: {
    ...mapGetters({
      loading: 'dashboard/loading',
      data: 'dashboard/data',
    }),

    options() {
      return {
        doughnut: {
          type: 'doughnut',
        },

        mix1: {
          type: 'bar',
          options: {
            responsive: true,
            tooltips: {
              mode: 'label',
            },
            scales: {
              x: {
                display: false,
              },
              yAxes: [{  
                display: true,    
                ticks: {
                  beginAtZero: true,
                  suggestedMin: 0,
                  suggestedMax: 100
                }
              }],
            },
          },
        },

        radar: {
          type: 'radar',
          options: {
            elements: {
              line: {
                borderWidth: 2,
              }
            },
            scale: {
              angleLines: {
                  display: false
              },
              ticks: {
                  suggestedMin: 0,
                  suggestedMax: 100
              }
            }
          },
        },
      };
    },
  },
});
</script>

<style scoped>
.el-col {
  margin-bottom: 16px;
}

.dashboard-bottom-message {
  width: 100%;
  text-align: center;
  color: grey;
}
</style>
