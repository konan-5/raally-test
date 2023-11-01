<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.project.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.project.list.title"
        ></app-i18n>
      </h1>

      <app-project-list-toolbar></app-project-list-toolbar>
      <app-project-list-filter></app-project-list-filter>
      <app-project-list-table></app-project-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import ProjectListFilter from '@/modules/project/components/project-list-filter.vue';
import ProjectListTable from '@/modules/project/components/project-list-table.vue';
import ProjectListToolbar from '@/modules/project/components/project-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-project-list-page',

  components: {
    'app-project-list-filter': ProjectListFilter,
    'app-project-list-table': ProjectListTable,
    'app-project-list-toolbar': ProjectListToolbar,
  },
});
</script>

<style></style>
