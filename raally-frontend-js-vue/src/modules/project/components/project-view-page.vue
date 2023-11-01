<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/project' }">
        <app-i18n code="entities.project.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.project.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.project.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-project-view-toolbar
        v-if="record"
      ></app-project-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.projectId.label" :value="presenter(record, 'projectId')"></app-view-item-text>

        <app-view-item-text :label="fields.name.label" :value="presenter(record, 'name')"></app-view-item-text>

        <app-view-item-text :label="fields.type.label" :value="presenter(record, 'type')"></app-view-item-text>
        
        <app-project-members-table></app-project-members-table>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import ProjectViewToolbar from '@/modules/project/components/project-view-toolbar.vue';
import ProjectMembersTable from '@/modules/project/components/project-members-table.vue'
import { ProjectModel } from '@/modules/project/project-model';

const { fields } = ProjectModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-project-view-page',

  props: ['id'],

  components: {
    'app-project-view-toolbar': ProjectViewToolbar,
    'app-project-members-table': ProjectMembersTable
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'project/view/record',
      loading: 'project/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'project/view/doFind',
    }),

    presenter(record, fieldName) {
      return ProjectModel.presenter(record, fieldName);
    },
  },
});
</script>
