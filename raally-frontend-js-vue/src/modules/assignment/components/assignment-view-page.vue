<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/assignment' }">
        <app-i18n code="entities.assignment.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.assignment.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.assignment.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-assignment-view-toolbar
        v-if="record"
      ></app-assignment-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-relation-to-one
          :label="fields.person.label"
          :permission="fields.person.readPermission"
          :url="fields.person.viewUrl"
          :value="presenter(record, 'person')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-one
          :label="fields.project.label"
          :permission="fields.project.readPermission"
          :url="fields.project.viewUrl"
          :value="presenter(record, 'project')"
        ></app-view-item-relation-to-one>

        <app-view-item-text :label="fields.hoursPerWeek.label" :value="presenter(record, 'hoursPerWeek')"></app-view-item-text>

        <app-view-item-text :label="fields.startDate.label" :value="presenter(record, 'startDate')"></app-view-item-text>

        <app-view-item-text :label="fields.endDate.label" :value="presenter(record, 'endDate')"></app-view-item-text>

        <app-view-item-text :label="fields.role.label" :value="presenter(record, 'role')"></app-view-item-text>

        <app-view-item-text :label="fields.notes.label" :value="presenter(record, 'notes')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import AssignmentViewToolbar from '@/modules/assignment/components/assignment-view-toolbar.vue';
import { AssignmentModel } from '@/modules/assignment/assignment-model';

const { fields } = AssignmentModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-assignment-view-page',

  props: ['id'],

  components: {
    'app-assignment-view-toolbar': AssignmentViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'assignment/view/record',
      loading: 'assignment/view/loading',
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
      doFind: 'assignment/view/doFind',
    }),

    presenter(record, fieldName) {
      return AssignmentModel.presenter(record, fieldName);
    },
  },
});
</script>
