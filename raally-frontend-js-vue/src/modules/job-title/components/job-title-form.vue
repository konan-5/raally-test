<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item
        :label="fields.person.label"
        :prop="fields.person.name"
        :required="fields.person.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-person-autocomplete-input
            :fetchFn="fields.person.fetchFn"
            :mapperFn="fields.person.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.person.name]"
            :placeholder="fields.person.placeholder"
            mode="single"
          ></app-person-autocomplete-input>

          <div
            v-if="fields.person.hint"
            class="app-form-hint"
          >
            {{ fields.person.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.title.label"
        :prop="fields.title.name"
        :required="fields.title.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.title.name]" :placeholder="fields.title.placeholder" />

          <div
            v-if="fields.title.hint"
            class="app-form-hint"
          >
            {{ fields.title.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.effectiveDate.label"
        :prop="fields.effectiveDate.name"
        :required="fields.effectiveDate.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="date" v-model="model[fields.effectiveDate.name]" :placeholder="fields.effectiveDate.placeholder"></el-date-picker>

          <div
            v-if="fields.effectiveDate.hint"
            class="app-form-hint"
          >
            {{ fields.effectiveDate.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item>
        <div class="form-buttons">
          <el-button
            :disabled="saveLoading"
            @click="doSubmit"
            icon="el-icon-fa-floppy-o"
            type="primary"
          >
            <app-i18n code="common.save"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doCancel"
            icon="el-icon-fa-close"
          >
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doReset"
            icon="el-icon-fa-undo"
          >
            <app-i18n code="common.reset"></app-i18n>
          </el-button>
          
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { JobTitleModel } from '@/modules/job-title/job-title-model';

const { fields } = JobTitleModel;
const formSchema = new FormSchema([
  fields.person,
  fields.title,
  fields.effectiveDate,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-job-title-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      return this.$emit('submit', {
        id: this.record && this.record.id,
        values: formSchema.cast(this.model),
      });
    },
  },
});
</script>

<style></style>
