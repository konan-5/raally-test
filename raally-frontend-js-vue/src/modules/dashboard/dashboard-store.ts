import { PersonService } from '@/modules/person/person-service';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';
import { DashboardService } from '@/modules/dashboard/dashboard-service';
import { i18n } from '@/i18n';

const emptyData = {
    totalElapsedTime: 0,
    totalElapsedTimeMessage: i18n("dashboard.message", 0),
    currentUsageDataByHours: {},
    currentUsageDataByPeople: {},
    currentIdlePeopleByRole: {},
    numberOfPeople: {}
};

export default {
  namespaced: true,

  state: {
    loading: false,
    data: emptyData
  },

  getters: {
    data: (state) => state.data,
    loading: (state) => Boolean(state.loading),
  },

  mutations: {
    FETCH_STARTED(state) {
      state.data = emptyData;
      state.loading = true;
    },

    FETCH_SUCCESS(state, payload) {
      state.data = payload;
      state.loading = false;
    },

    FETCH_ERROR(state) {
      state.data = emptyData;
      state.loading = false;
    },
  },

  actions: {
    async doFetchData({ commit }) {
      try {
        commit('FETCH_STARTED');
        const payload = await DashboardService.fetchDashboardData();

        const fetchedData = {
          totalElapsedTime: payload.totalElapsedTime,
          totalElapsedTimeMessage: i18n("dashboard.message", payload.totalElapsedTime),
          currentUsageDataByHours: {
          labels: [
            i18n('dashboard.charts.busy'),
            i18n('dashboard.charts.idle')
          ],
          datasets: [
            {
              data: [ payload.currentUsageDataByHours.busy, payload.currentUsageDataByHours.idle ],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
              ],
            },
          ],
        },
        currentUsageDataByPeople: {
          labels: [
            i18n('dashboard.charts.fullyBusy'),
            i18n('dashboard.charts.partlyIdle'),
            i18n('dashboard.charts.fullyIdle')
          ],
          datasets: [
            {
              data: [
                payload.currentUsageDataByPeople.fullyBusy, 
                payload.currentUsageDataByPeople.partlyIdle, 
                payload.currentUsageDataByPeople.fullyIdle
              ],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            },
          ],
        },
        currentIdlePeopleByRole: {
          labels: [
            i18n('dashboard.charts.projectManager'),
            i18n('dashboard.charts.technicalLead'),
            i18n('dashboard.charts.seniorDeveloper'),
            i18n('dashboard.charts.intermediateDeveloper'),
            i18n('dashboard.charts.juniorDeveloper')
          ],
          datasets: [
            {
              label: 'Usage By Role',
              data: [
                payload.currentIdlePeopleByRole.projectManager, 
                payload.currentIdlePeopleByRole.technicalLead,
                payload.currentIdlePeopleByRole.seniorDeveloper,
                payload.currentIdlePeopleByRole.intermediateDeveloper,
                payload.currentIdlePeopleByRole.juniorDeveloper
              ],
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
            },
          ],
        },
        numberOfPeople: {
          labels: [
            i18n('dashboard.charts.projectManager'),
            i18n('dashboard.charts.technicalLead'),
            i18n('dashboard.charts.seniorDeveloper'),
            i18n('dashboard.charts.intermediateDeveloper'),
            i18n('dashboard.charts.juniorDeveloper')
          ],
          datasets: [
            {
              label: 'People',
              data: [
                payload.numberOfPeople.projectManager, 
                payload.numberOfPeople.technicalLead,
                payload.numberOfPeople.seniorDeveloper,
                payload.numberOfPeople.intermediateDeveloper,
                payload.numberOfPeople.juniorDeveloper
              ],
              backgroundColor: '#36A2EB',
              borderColor: '#36A2EB',
              hoverBackgroundColor: '#36A2EB',
              hoverBorderColor: '#36A2EB',
            },
          ],
        }};

        commit('FETCH_SUCCESS', fetchedData);
      } catch (error) {
        Errors.handle(error);
        commit('FETCH_ERROR');
        routerAsync().push('/dashboard');
      }
    },
  },
};
