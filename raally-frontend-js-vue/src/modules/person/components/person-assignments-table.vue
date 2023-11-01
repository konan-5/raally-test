<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column :label="fields.project.label" :prop="fields.project.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.project.label"
            :permission="fields.project.readPermission"
            :url="fields.project.viewUrl"
            :value="presenter(scope.row, 'project')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.hoursPerWeek.label"
        :prop="fields.hoursPerWeek.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'hoursPerWeek') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.startDate.label"
        :prop="fields.startDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'startDate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.endDate.label"
        :prop="fields.endDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'endDate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.role.label"
        :prop="fields.role.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'role') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.notes.label"
        :prop="fields.notes.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'notes') }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { AssignmentModel } from '@/modules/assignment/assignment-model';
import { mapGetters, mapActions } from 'vuex';
import { i18n } from '@/i18n';

const { fields } = AssignmentModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-person-assignments-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      record: 'person/view/record',
      loading: 'person/view/loading'
    }),

    rows() {
        return this.record.assignments.rows;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doMountTable: 'person/view/doMountTable',
    }),

    presenter(row, fieldName) {
      return AssignmentModel.presenter(row, fieldName);
    },
  },
});
</script>

<style></style>
