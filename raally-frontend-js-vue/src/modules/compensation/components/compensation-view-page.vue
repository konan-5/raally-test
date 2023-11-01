<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/compensation' }">
        <app-i18n code="entities.compensation.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.compensation.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.compensation.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-compensation-view-toolbar
        v-if="record"
      ></app-compensation-view-toolbar>

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

        <app-view-item-text :label="fields.type.label" :value="presenter(record, 'type')"></app-view-item-text>

        <app-view-item-text :label="fields.workAvailability.label" :value="presenter(record, 'workAvailability')"></app-view-item-text>

        <app-view-item-text :label="fields.monetary.label" :value="presenter(record, 'monetary')"></app-view-item-text>

        <app-view-item-text :label="fields.paidTimeOff.label" :value="presenter(record, 'paidTimeOff')"></app-view-item-text>

        <app-view-item-text :label="fields.otherBenefits.label" :value="presenter(record, 'otherBenefits')"></app-view-item-text>

        <app-view-item-text :label="fields.effectiveDate.label" :value="presenter(record, 'effectiveDate')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import CompensationViewToolbar from '@/modules/compensation/components/compensation-view-toolbar.vue';
import { CompensationModel } from '@/modules/compensation/compensation-model';

const { fields } = CompensationModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-compensation-view-page',

  props: ['id'],

  components: {
    'app-compensation-view-toolbar': CompensationViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'compensation/view/record',
      loading: 'compensation/view/loading',
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
      doFind: 'compensation/view/doFind',
    }),

    presenter(record, fieldName) {
      return CompensationModel.presenter(record, fieldName);
    },
  },
});
</script>
