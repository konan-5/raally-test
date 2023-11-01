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
        :label="fields.type.label"
        :prop="fields.type.name"
        :required="fields.type.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-select v-model="model[fields.type.name]" :placeholder="fields.type.placeholder || ''">
            <el-option :value="undefined">--</el-option>
            <el-option
              :key="option.id"
              :label="option.label"
              :value="option.id"
              v-for="option in fields.type.options"
            ></el-option>
          </el-select>

          <div
            v-if="fields.type.hint"
            class="app-form-hint"
          >
            {{ fields.type.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.workAvailability.label"
        :prop="fields.workAvailability.name"
        :required="fields.workAvailability.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="0" :step="1" v-model="model[fields.workAvailability.name]" :placeholder="fields.workAvailability.placeholder" ></el-input-number>

          <div
            v-if="fields.workAvailability.hint"
            class="app-form-hint"
          >
            {{ fields.workAvailability.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.monetary.label"
        :prop="fields.monetary.name"
        :required="fields.monetary.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="fields.monetary.scale" :step="0.1" v-model="model[fields.monetary.name]" :placeholder="fields.monetary.placeholder" ></el-input-number>

          <div
            v-if="fields.monetary.hint"
            class="app-form-hint"
          >
            {{ fields.monetary.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.paidTimeOff.label"
        :prop="fields.paidTimeOff.name"
        :required="fields.paidTimeOff.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input-number :precision="0" :step="1" v-model="model[fields.paidTimeOff.name]" :placeholder="fields.paidTimeOff.placeholder" ></el-input-number>

          <div
            v-if="fields.paidTimeOff.hint"
            class="app-form-hint"
          >
            {{ fields.paidTimeOff.hint }}
          </div>
        </el-col>
      </el-form-item>

      <el-form-item
        :label="fields.otherBenefits.label"
        :prop="fields.otherBenefits.name"
        :required="fields.otherBenefits.required"
      >
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :rows="4" type="textarea" v-model="model[fields.otherBenefits.name]" :placeholder="fields.otherBenefits.placeholder" />

          <div
            v-if="fields.otherBenefits.hint"
            class="app-form-hint"
          >
            {{ fields.otherBenefits.hint }}
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
import { CompensationModel } from '@/modules/compensation/compensation-model';

const { fields } = CompensationModel;
const formSchema = new FormSchema([
  fields.person,
  fields.type,
  fields.workAvailability,
  fields.monetary,
  fields.paidTimeOff,
  fields.otherBenefits,
  fields.effectiveDate,
]);

import Vue from 'vue';
export default Vue.extend({
  name: 'app-compensation-form',

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
