<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.jobTitle.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.jobTitle.list.title"
        ></app-i18n>
      </h1>

      <app-job-title-list-toolbar></app-job-title-list-toolbar>
      <app-job-title-list-filter></app-job-title-list-filter>
      <app-job-title-list-table></app-job-title-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import JobTitleListFilter from '@/modules/job-title/components/job-title-list-filter.vue';
import JobTitleListTable from '@/modules/job-title/components/job-title-list-table.vue';
import JobTitleListToolbar from '@/modules/job-title/components/job-title-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-job-title-list-page',

  components: {
    'app-job-title-list-filter': JobTitleListFilter,
    'app-job-title-list-table': JobTitleListTable,
    'app-job-title-list-toolbar': JobTitleListToolbar,
  },
});
</script>

<style></style>
