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

      <el-table-column
        :label="fields.type.label"
        :prop="fields.type.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'type') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.workAvailability.label"
        :prop="fields.workAvailability.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'workAvailability') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.monetary.label"
        :prop="fields.monetary.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'monetary') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.paidTimeOff.label"
        :prop="fields.paidTimeOff.name"
        sortable="custom"
        align="right"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'paidTimeOff') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.effectiveDate.label"
        :prop="fields.effectiveDate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'effectiveDate') }}</template>
      </el-table-column>

      <el-table-column
        :fixed="isMobile ? undefined : 'right'"
        align="center"
        width="180"
      >
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/compensation/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link
              :to="`/compensation/${scope.row.id}/edit`"
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
import { CompensationModel } from '@/modules/compensation/compensation-model';
import { mapGetters, mapActions } from 'vuex';
import { CompensationPermissions } from '@/modules/compensation/compensation-permissions';
import { i18n } from '@/i18n';

const { fields } = CompensationModel;

import Vue from 'vue';
export default Vue.extend({
  name: 'app-compensation-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'compensation/list/rows',
      count: 'compensation/list/count',
      loading: 'compensation/list/loading',
      pagination: 'compensation/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      destroyLoading: 'compensation/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new CompensationPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToDestroy() {
      return new CompensationPermissions(
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
      doChangeSort: 'compensation/list/doChangeSort',
      doChangePaginationCurrentPage:
        'compensation/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'compensation/list/doChangePaginationPageSize',
      doMountTable: 'compensation/list/doMountTable',
      doDestroy: 'compensation/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return CompensationModel.presenter(row, fieldName);
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
