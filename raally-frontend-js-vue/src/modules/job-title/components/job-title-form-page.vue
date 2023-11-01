<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/job-title' }">
        <app-i18n code="entities.jobTitle.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.jobTitle.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.jobTitle.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.jobTitle.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.jobTitle.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-job-title-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!initLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import JobTitleForm from '@/modules/job-title/components/job-title-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-job-title-form-page',

  props: ['id'],

  components: {
    'app-job-title-form': JobTitleForm,
  },

  computed: {
    ...mapGetters({
      record: 'jobTitle/form/record',
      initLoading: 'jobTitle/form/initLoading',
      saveLoading: 'jobTitle/form/saveLoading',
    }),

    isEditing() {
      return Boolean(this.id);
    },
  },

  async created() {
    await this.doInit(this.id);
  },

  methods: {
    ...mapActions({
      doInit: 'jobTitle/form/doInit',
      doUpdate: 'jobTitle/form/doUpdate',
      doCreate: 'jobTitle/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/job-title');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
});
</script>

<style></style>
