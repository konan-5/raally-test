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
        :label="fields.project.label"
        :prop="fields.project.name"
        :required="fields.project.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <app-project-autocomplete-input
            :fetchFn="fields.project.fetchFn"
            :mapperFn="fields.project.mapperFn"
            :showCreate="!modal"
            v-model="model[fields.project.name]"
            :placeholder="fields.project.placeholder"
            mode="single"
          ></app-project-autocomplete-input>

          <div
            v-if="fields.project.hint"
            class="app-form-hint"
          >
            {{ fields.project.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.hoursPerWeek.label"
        :prop="fields.hoursPerWeek.name"
        :required="fields.hoursPerWeek.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="0" :step="1" v-model="model[fields.hoursPerWeek.name]" :placeholder="fields.hoursPerWeek.placeholder" ></el-input-number>

          <div
            v-if="fields.hoursPerWeek.hint"
            class="app-form-hint"
          >
            {{ fields.hoursPerWeek.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.startDate.label"
        :prop="fields.startDate.name"
        :required="fields.startDate.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="date" v-model="model[fields.startDate.name]" :placeholder="fields.startDate.placeholder"></el-date-picker>

          <div
            v-if="fields.startDate.hint"
            class="app-form-hint"
          >
            {{ fields.startDate.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.endDate.label"
        :prop="fields.endDate.name"
        :required="fields.endDate.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-date-picker type="date" v-model="model[fields.endDate.name]" :placeholder="fields.endDate.placeholder"></el-date-picker>

          <div
            v-if="fields.endDate.hint"
            class="app-form-hint"
          >
            {{ fields.endDate.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.role.label"
        :prop="fields.role.name"
        :required="fields.role.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-select v-model="model[fields.role.name]" :placeholder="fields.role.placeholder || ''">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.role.options"
            ></el-option>
          </el-select>

          <div
            v-if="fields.role.hint"
            class="app-form-hint"
          >
            {{ fields.role.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.notes.label"
        :prop="fields.notes.name"
        :required="fields.notes.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input v-model="model[fields.notes.name]" :placeholder="fields.notes.placeholder" />

          <div
            v-if="fields.notes.hint"
            class="app-form-hint"
          >
            {{ fields.notes.hint }}
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
            @click="doReset"
            icon="el-icon-fa-undo"
          >
            <app-i18n code="common.reset"></app-i18n>
          </el-button>

          <el-button
            :disabled="saveLoading"
            @click="doCancel"
            icon="el-icon-fa-close"
          >
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { AssignmentModel } from '@/modules/assignment/assignment-model';

const { fields } = AssignmentModel;
const formSchema = new FormSchema([
  fields.person,
  fields.project,
  fields.hoursPerWeek,
  fields.startDate,
  fields.endDate,
  fields.role,
  fields.notes,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-assignment-form',

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
