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
          code="entities.compensation.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.compensation.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n
          code="entities.compensation.edit.title"
          v-if="isEditing"
        ></app-i18n>
        <app-i18n
          code="entities.compensation.new.title"
          v-if="!isEditing"
        ></app-i18n>
      </h1>

      <div
        class="app-page-spinner"
        v-if="initLoading"
        v-loading="initLoading"
      ></div>

      <app-compensation-form
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
import CompensationForm from '@/modules/compensation/components/compensation-form.vue';
import { routerAsync } from '@/app-module';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-compensation-form-page',

  props: ['id'],

  components: {
    'app-compensation-form': CompensationForm,
  },

  computed: {
    ...mapGetters({
      record: 'compensation/form/record',
      initLoading: 'compensation/form/initLoading',
      saveLoading: 'compensation/form/saveLoading',
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
      doInit: 'compensation/form/doInit',
      doUpdate: 'compensation/form/doUpdate',
      doCreate: 'compensation/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/compensation');
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
