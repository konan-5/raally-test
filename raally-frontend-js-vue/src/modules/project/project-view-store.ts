import { ProjectService } from '@/modules/project/project-service';
import Errors from '@/shared/error/errors';
import { routerAsync } from '@/app-module';

export default {
  namespaced: true,

  state: {
    loading: false,
    record: null,
  },

  getters: {
    record: (state) => state.record,
    loading: (state) => Boolean(state.loading),
  },

  mutations: {
    FIND_STARTED(state) {
      state.record = null;
      state.loading = true;
    },

    FIND_SUCCESS(state, payload) {
      state.record = payload;
      state.loading = false;
    },

    FIND_ERROR(state) {
      state.record = null;
      state.loading = false;
    },

    TABLE_MOUNTED(state, payload) {
      state.table = payload;
    }
  },

  actions: {
    async doFind({ commit }, id) {
      try {
        commit('FIND_STARTED');
        const record = await ProjectService.find(id);
        commit('FIND_SUCCESS', record);
      } catch (error) {
        Errors.handle(error);
        commit('FIND_ERROR');
        routerAsync().push('/project');
      }
    },
    doMountTable({ commit }, table) {
      commit('TABLE_MOUNTED', table);
    },
  },
};
