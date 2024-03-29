import Vue from 'vue';
import Vuex from 'vuex';
import ProgressBar from '@/shared/progress-bar/progress-bar';
import Router from 'vue-router';
import shared from '@/shared/shared-module';
import auth from '@/modules/auth/auth-module';
import layout from '@/modules/layout/layout-module';
import dashboard from '@/modules/dashboard/dashboard-module';
import tenant from '@/modules/tenant/tenant-module';
import plan from '@/modules/plan/plan-module';
import user from '@/modules/user/user-module';
import settings from '@/modules/settings/settings-module';
import auditLog from '@/modules/audit-log/audit-log-module';
import compensation from '@/modules/compensation/compensation-module';
import person from '@/modules/person/person-module';
import jobTitle from '@/modules/job-title/job-title-module';
import project from '@/modules/project/project-module';
import assignment from '@/modules/assignment/assignment-module';

const modules = {
  shared,
  dashboard,
  settings,
  auth,
  tenant,
  plan,
  user,
  auditLog,
  layout,
  compensation,
  person,
  jobTitle,
  project,
  assignment,  
};

// start - boilerplate code

const exists = (el) => Boolean(el);

function setupComponentsFiltersDirectivesAndMixins() {
  Object.keys(modules)
    .map((key) => modules[key].components)
    .filter(exists)
    .forEach((components) => {
      Object.keys(components).forEach((name) => {
        Vue.component(name, components[name]);
      });
    });

  Object.keys(modules)
    .map((key) => modules[key].filters)
    .filter(exists)
    .forEach((filters) => {
      filters.forEach((filter) => {
        Vue.filter(filter.name, filter.implementation);
      });
    });

  Object.keys(modules)
    .map((key) => modules[key].directives)
    .filter(exists)
    .forEach((directives) => {
      directives.forEach((directive) => {
        Vue.directive(
          directive.name,
          directive.implementation,
        );
      });
    });

  Object.keys(modules)
    .map((key) => modules[key].mixins)
    .filter(exists)
    .forEach((mixins) => {
      mixins.forEach((mixin) => {
        Vue.mixin(mixin);
      });
    });
}

const routes = [
  ...Object.keys(modules)
    .filter((key) => Boolean(modules[key].routes))
    .map((key) => modules[key].routes)
    .reduce((a, b) => a.concat(b), []),
  { path: '*', redirect: '/404' },
];

let router;

const routerAsync = () => {
  if (!router) {
    router = new Router({
      mode: 'history',
      routes,
      scrollBehavior() {
        return { x: 0, y: 0 };
      },
    });

    router.beforeEach((to, from, next) => {
      if (to.name) {
        ProgressBar.start();
      }

      next();
    });

    router.afterEach(() => {
      ProgressBar.done();
    });
  }

  return router;
};

const buildStores = () => {
  const output = {};

  Object.keys(modules)
    .filter((key) => Boolean(modules[key].store))
    .forEach((key) => {
      output[key] = modules[key].store;
    });

  return output;
};

let store;

const storeAsync = () => {
  if (!store) {
    store = new Vuex.Store({ modules: buildStores() });
  }

  return store;
};

export {
  setupComponentsFiltersDirectivesAndMixins,
  routerAsync,
  storeAsync,
};

// end - boilerplate code
