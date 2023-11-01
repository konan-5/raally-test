<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.compensation.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.compensation.list.title"
        ></app-i18n>
      </h1>

      <app-compensation-list-toolbar></app-compensation-list-toolbar>
      <app-compensation-list-filter></app-compensation-list-filter>
      <app-compensation-list-table></app-compensation-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import CompensationListFilter from '@/modules/compensation/components/compensation-list-filter.vue';
import CompensationListTable from '@/modules/compensation/components/compensation-list-table.vue';
import CompensationListToolbar from '@/modules/compensation/components/compensation-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-compensation-list-page',

  components: {
    'app-compensation-list-filter': CompensationListFilter,
    'app-compensation-list-table': CompensationListTable,
    'app-compensation-list-toolbar': CompensationListToolbar,
  },
});
</script>

<style></style>
