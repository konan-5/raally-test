<template>
  <div class="filter">
    <app-filter-preview
      :values="model"
      :fields="fields"
      :expanded="expanded"
      @click="doToggleExpanded()"
      @remove="doRemove($event)"
    ></app-filter-preview>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthFilter"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doFilter"
      ref="form" 
      v-if="expanded"
    >
      <el-row type="flex">
        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item :label="fields.person.label" :prop="fields.person.name">
            <app-autocomplete-one-input
              :fetchFn="fields.person.fetchFn"
              v-model="model[fields.person.name]"
            ></app-autocomplete-one-input>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item :label="fields.title.label" :prop="fields.title.name">
            <el-input v-model="model[fields.title.name]"/>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item :label="fields.effectiveDateRange.label" :prop="fields.effectiveDateRange.name">
            <el-date-picker type="daterange" v-model="model[fields.effectiveDateRange.name]"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="filter-buttons">
        <el-button
          :disabled="loading"
          @click="doFilter"
          icon="el-icon-fa-search"
          type="primary"
        >
          <app-i18n code="common.search"></app-i18n>
        </el-button>

        <el-button
          :disabled="loading"
          @click="doResetFilter"
          icon="el-icon-fa-undo"
        >
          <app-i18n code="common.reset"></app-i18n>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { FilterSchema } from '@/shared/form/filter-schema';
import { JobTitleModel } from '@/modules/job-title/job-title-model';

const { fields } = JobTitleModel;

const filterSchema = new FilterSchema([
  fields.person,
  fields.title,
  fields.effectiveDateRange,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-job-title-list-filter',

  data() {
    return {
      expanded: false,
      rules: filterSchema.rules(),
      model: {},
    };
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthFilter: 'layout/labelWidthFilter',
      loading: 'jobTitle/list/loading',
      rawFilter: 'jobTitle/list/rawFilter',
    }),

    fields() {
      return fields;
    },
  },

  async mounted() {
    this.model = filterSchema.initialValues(
      this.rawFilter,
      this.$route.query,
    );

    const filter = filterSchema.cast(this.model);
    return this.doFetch({
      filter,
    });
  },

  methods: {
    ...mapActions({
      doReset: 'jobTitle/list/doReset',
      doFetch: 'jobTitle/list/doFetch',
    }),

    doToggleExpanded() {
      this.expanded = !this.expanded;
    },

    doRemove(field) {
      this.model[field] = null;
      this.expanded = false;
      const rawFilter = this.model;
      const filter = filterSchema.cast(this.model);
      return this.doFetch({
        filter,
        rawFilter,
      });
    },

    async doResetFilter() {
      this.expanded = false;
      this.model = filterSchema.initialValues();
      this.$refs.form.clearValidate();
      return this.doReset();
    },

    async doFilter() {
      try {
        await this.$refs.form.validate();
        this.$refs.form.clearValidate();
      } catch (error) {
        return;
      }

      this.expanded = false;
      const rawFilter = this.model;
      const filter = filterSchema.cast(this.model);
      return this.doFetch({
        filter,
        rawFilter,
      });
    },
  },
});
</script>

<style></style>