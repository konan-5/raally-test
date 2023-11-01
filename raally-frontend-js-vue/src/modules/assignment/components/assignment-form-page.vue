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
          code="entities.assignment.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.assignment.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.assignment.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.assignment.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-assignment-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!initLoading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import AssignmentForm from '@/modules/assignment/components/assignment-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-assignment-form-page',

  props: ['id'],

  components: {
    'app-assignment-form': AssignmentForm,
  },

  computed: {
    ...mapGetters({
      record: 'assignment/form/record',
      initLoading: 'assignment/form/initLoading',
      saveLoading: 'assignment/form/saveLoading',
    }),

    isEditing() {
      return Boolean(this.id);
    },
  },

  async created() {
    await this.doInit(this.id);
  },

  methods: {
    ...mapActions({
      doInit: 'assignment/form/doInit',
      doUpdate: 'assignment/form/doUpdate',
      doCreate: 'assignment/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/assignment');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
});
</script>

<style></style>
