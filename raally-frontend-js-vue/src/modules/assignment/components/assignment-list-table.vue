<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>

      <el-table-column :label="fields.person.label" :prop="fields.person.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.person.label"
            :permission="fields.person.readPermission"
            :url="fields.person.viewUrl"
            :value="presenter(scope.row, 'person')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

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

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/assignment/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/assignment/${scope.row.id}/edit`"
              v-if="hasPermissionToEdit"
            >
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { AssignmentModel } from '@/modules/assignment/assignment-model';
import { mapGetters, mapActions } from 'vuex';
import { AssignmentPermissions } from '@/modules/assignment/assignment-permissions';
import { i18n } from '@/i18n';

const { fields } = AssignmentModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-assignment-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'assignment/list/rows',
      count: 'assignment/list/count',
      loading: 'assignment/list/loading',
      pagination: 'assignment/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'assignment/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new AssignmentPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new AssignmentPermissions(
        this.currentTenant,
        this.currentUser,
      ).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'assignment/list/doChangeSort',
      doChangePaginationCurrentPage:
        'assignment/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'assignment/list/doChangePaginationPageSize',
      doMountTable: 'assignment/list/doMountTable',
      doDestroy: 'assignment/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return AssignmentModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
});
</script>

<style></style>
