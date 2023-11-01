<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.assignment.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.assignment.list.title"
        ></app-i18n>
      </h1>

      <app-assignment-list-toolbar></app-assignment-list-toolbar>
      <app-assignment-list-filter></app-assignment-list-filter>
      <app-assignment-list-table></app-assignment-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import AssignmentListFilter from '@/modules/assignment/components/assignment-list-filter.vue';
import AssignmentListTable from '@/modules/assignment/components/assignment-list-table.vue';
import AssignmentListToolbar from '@/modules/assignment/components/assignment-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-assignment-list-page',

  components: {
    'app-assignment-list-filter': AssignmentListFilter,
    'app-assignment-list-table': AssignmentListTable,
    'app-assignment-list-toolbar': AssignmentListToolbar,
  },
});
</script>

<style></style>
