<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.person.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.person.list.title"
        ></app-i18n>
      </h1>

      <app-person-list-toolbar></app-person-list-toolbar>
      <app-person-list-filter></app-person-list-filter>
      <app-person-list-table></app-person-list-table>
    </div>
  </div>
</template>

<script lang="ts">
import PersonListFilter from '@/modules/person/components/person-list-filter.vue';
import PersonListTable from '@/modules/person/components/person-list-table.vue';
import PersonListToolbar from '@/modules/person/components/person-list-toolbar.vue';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-person-list-page',

  components: {
    'app-person-list-filter': PersonListFilter,
    'app-person-list-table': PersonListTable,
    'app-person-list-toolbar': PersonListToolbar,
  },
});
</script>

<style></style>
