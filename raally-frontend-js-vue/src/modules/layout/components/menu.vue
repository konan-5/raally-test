<template>
  <el-aside :width="asideWidth">
    <h1 class="logo">
      <router-link to="/">
        <img
          src="images/raally-logo.png"
          width="164px"
          alt=""
          :style="{ verticalAlign: 'middle' }"
        />        
      </router-link>
    </h1>

    <el-menu
      background-color="#001529"
      text-color="rgba(255,255,255,0.65)"
      :class="{
        'el-menu-side-nav': true,
        collapsed: collapsed,
      }"
      :collapse="collapsed"
      :collapse-transition="false"
      :router="true"
      @select="collapseMenuIfMobile()"
    >
      <el-menu-item
        :class="classFor('/', true)"
        :route="{ path: '/' }"
        index="/"
      >
        <i class="el-icon-fa-tachometer"></i>
        <span slot="title">
          <app-i18n code="dashboard.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/plan')"
        :route="{ path: '/plan' }"
        index="/plan"
        v-if="hasPermissionToPlan || planLocked"
        :disabled="planLocked"
      >
        <i class="el-icon-fa-credit-card"></i>
        <span slot="title">
          <app-i18n code="plan.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/user')"
        :route="{ path: '/user' }"
        index="/user"
        v-if="hasPermissionToUser || userLocked"
        :disabled="userLocked"
      >
        <i class="el-icon-fa-user-plus"></i>
        <span slot="title">
          <app-i18n code="user.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/audit-logs')"
        :route="{ path: '/audit-logs' }"
        index="/audit-logs"
        :disabled="auditLogLocked"
      >
        <i class="el-icon-fa-history"></i>
        <span slot="title">
          <app-i18n code="auditLog.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/settings')"
        :route="{ path: '/settings' }"
        index="/settings"
        v-if="hasPermissionToSettings || settingsLocked"
        :disabled="settingsLocked"
      >
        <i class="el-icon-fa-cog"></i>
        <span slot="title">
          <app-i18n code="settings.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/compensation')"
        :route="{ path: '/compensation' }"
        index="/compensation"
        v-if="hasPermissionToCompensation || compensationLocked"
        :disabled="compensationLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.compensation.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/person')"
        :route="{ path: '/person' }"
        index="/person"
        v-if="hasPermissionToPerson || personLocked"
        :disabled="personLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.person.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/job-title')"
        :route="{ path: '/job-title' }"
        index="/job-title"
        v-if="hasPermissionToJobTitle || jobTitleLocked"
        :disabled="jobTitleLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.jobTitle.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/project')"
        :route="{ path: '/project' }"
        index="/project"
        v-if="hasPermissionToProject || projectLocked"
        :disabled="projectLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.project.menu"></app-i18n>
        </span>
      </el-menu-item>

      <el-menu-item
        :class="classFor('/assignment')"
        :route="{ path: '/assignment' }"
        index="/assignment"
        v-if="hasPermissionToAssignment || assignmentLocked"
        :disabled="assignmentLocked"
      >
        <i class="el-icon-fa-chevron-right"></i>
        <span slot="title">
          <app-i18n code="entities.assignment.menu"></app-i18n>
        </span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import { SettingsPermissions } from '@/modules/settings/settings-permissions';
import { AuditLogPermissions } from '@/modules/audit-log/audit-log-permissions';
import { UserPermissions } from '@/modules/user/user-permissions';
import { PlanPermissions } from '@/modules/plan/plan-permissions';
import { CompensationPermissions } from '@/modules/compensation/compensation-permissions';
import { PersonPermissions } from '@/modules/person/person-permissions';
import { JobTitlePermissions } from '@/modules/job-title/job-title-permissions';
import { ProjectPermissions } from '@/modules/project/project-permissions';
import { AssignmentPermissions } from '@/modules/assignment/assignment-permissions';
import config from '@/config';

import Vue from 'vue';
export default Vue.extend({
  name: 'app-menu',

  computed: {
    ...mapGetters({
      collapsed: 'layout/menuCollapsed',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      currentTenant: 'auth/currentTenant',
      logoUrl: 'auth/logoUrl',
    }),

    hasPermissionToPlan() {
      return (
        config.isPlanEnabled &&
        new PlanPermissions(
          this.currentTenant,
          this.currentUser,
        ).read
      );
    },

    hasPermissionToSettings() {
      return new SettingsPermissions(
        this.currentTenant,
        this.currentUser,
      ).edit;
    },

    hasPermissionToAuditLog() {
      return new AuditLogPermissions(
        this.currentTenant,
        this.currentUser,
      ).read;
    },

    hasPermissionToUser() {
      return new UserPermissions(
        this.currentTenant,
        this.currentUser,
      ).read;
    },

    hasPermissionToCompensation() {
      return new CompensationPermissions(this.currentTenant, this.currentUser).read;
    },
    hasPermissionToPerson() {
      return new PersonPermissions(this.currentTenant, this.currentUser).read;
    },
    hasPermissionToJobTitle() {
      return new JobTitlePermissions(this.currentTenant, this.currentUser).read;
    },
    hasPermissionToProject() {
      return new ProjectPermissions(this.currentTenant, this.currentUser).read;
    },
    hasPermissionToAssignment() {
      return new AssignmentPermissions(this.currentTenant, this.currentUser).read;
    },

    planLocked() {
      return (
        config.isPlanEnabled &&
        new PlanPermissions(
          this.currentTenant,
          this.currentUser,
        ).lockedForCurrentPlan
      );
    },

    settingsLocked() {
      return new SettingsPermissions(
        this.currentTenant,
        this.currentUser,
      ).lockedForCurrentPlan;
    },

    auditLogLocked() {
      return new AuditLogPermissions(
        this.currentTenant,
        this.currentUser,
      ).lockedForCurrentPlan;
    },

    userLocked() {
      return new UserPermissions(
        this.currentTenant,
        this.currentUser,
      ).lockedForCurrentPlan;
    },

    compensationLocked() {
      return new CompensationPermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },
    personLocked() {
      return new PersonPermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },
    jobTitleLocked() {
      return new JobTitlePermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },
    projectLocked() {
      return new ProjectPermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },
    assignmentLocked() {
      return new AssignmentPermissions(this.currentTenant, this.currentUser).lockedForCurrentPlan;
    },

    asideWidth() {
      if (this.isMobile && !this.collapsed) {
        return '100%';
      }

      if (!this.collapsed) {
        return '200px';
      }

      return '0px';
    },
  },

  methods: {
    ...mapActions({
      collapseMenu: 'layout/collapseMenu',
    }),

    collapseMenuIfMobile() {
      if (this.isMobile) {
        this.collapseMenu();
      }
    },

    classFor(path, exact = false) {
      if (exact) {
        return {
          active: this.$route.path === path,
        };
      }

      const routePath = this.$route.path;
      const active =
        routePath === path ||
        routePath.startsWith(path + '/');

      return {
        active,
      };
    },
  },
});
</script>

<style scoped>
.el-menu.collapsed span {
  visibility: hidden;
}
</style>
