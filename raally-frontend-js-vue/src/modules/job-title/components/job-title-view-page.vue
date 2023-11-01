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
          code="entities.jobTitle.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.jobTitle.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-job-title-view-toolbar
        v-if="record"
      ></app-job-title-view-toolbar>

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

        <app-view-item-text :label="fields.title.label" :value="presenter(record, 'title')"></app-view-item-text>

        <app-view-item-text :label="fields.effectiveDate.label" :value="presenter(record, 'effectiveDate')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import JobTitleViewToolbar from '@/modules/job-title/components/job-title-view-toolbar.vue';
import { JobTitleModel } from '@/modules/job-title/job-title-model';

const { fields } = JobTitleModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-job-title-view-page',

  props: ['id'],

  components: {
    'app-job-title-view-toolbar': JobTitleViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'jobTitle/view/record',
      loading: 'jobTitle/view/loading',
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
      doFind: 'jobTitle/view/doFind',
    }),

    presenter(record, fieldName) {
      return JobTitleModel.presenter(record, fieldName);
    },
  },
});
</script>
