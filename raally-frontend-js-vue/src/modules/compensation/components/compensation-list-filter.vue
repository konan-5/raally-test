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
          <el-form-item :label="fields.type.label" :prop="fields.type.name">
            <el-select placeholder v-model="model[fields.type.name]">
              <el-option :value="undefined">--</el-option>
              <el-option
                :key="option.id"
                :label="option.label"
                :value="option.id"
                v-for="option in fields.type.options"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item
            :label="fields.workAvailabilityRange.label"
            :prop="fields.workAvailabilityRange.name"
          >
            <app-number-range-input v-model="model[fields.workAvailabilityRange.name]"/>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item :label="fields.monetaryRange.label" :prop="fields.monetaryRange.name">
            <app-number-range-input v-model="model[fields.monetaryRange.name]"/>
          </el-form-item>
        </el-col>

        <el-col :lg="12" :md="16" :sm="24">
          <el-form-item
            :label="fields.paidTimeOffRange.label"
            :prop="fields.paidTimeOffRange.name"
          >
            <app-number-range-input v-model="model[fields.paidTimeOffRange.name]"/>
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
import { CompensationModel } from '@/modules/compensation/compensation-model';

const { fields } = CompensationModel;

const filterSchema = new FilterSchema([
  fields.person,
  fields.type,
  fields.workAvailabilityRange,
  fields.monetaryRange,
  fields.paidTimeOffRange,
  fields.effectiveDateRange,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-compensation-list-filter',

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
      loading: 'compensation/list/loading',
      rawFilter: 'compensation/list/rawFilter',
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
      doReset: 'compensation/list/doReset',
      doFetch: 'compensation/list/doFetch',
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