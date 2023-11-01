<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="dashboard.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/person' }">
        <app-i18n code="entities.person.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n
          code="entities.person.view.title"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.person.view.title"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="loading"
        v-loading="loading"
      ></div>

      <app-person-view-toolbar
        v-if="record"
      ></app-person-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.fullName.label" :value="presenter(record, 'fullName')"></app-view-item-text>
        <app-person-assignments-table></app-person-assignments-table>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import PersonViewToolbar from '@/modules/person/components/person-view-toolbar.vue';
import PersonAssignmentsTable from '@/modules/person/components/person-assignments-table.vue';
import { PersonModel } from '@/modules/person/person-model';

const { fields } = PersonModel;

import Vue from 'vue';

export default Vue.extend({
  name: 'app-person-view-page',

  props: ['id'],

  components: {
    'app-person-view-toolbar': PersonViewToolbar,
    'app-person-assignments-table': PersonAssignmentsTable
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'person/view/record',
      loading: 'person/view/loading',
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
      doFind: 'person/view/doFind',
    }),

    presenter(record, fieldName) {
      return PersonModel.presenter(record, fieldName);
    },
  },
});
</script>
