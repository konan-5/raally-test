import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import 'core-js'
import { SettingsService } from '@/modules/settings/settings-service';
import ProgressBar from '@/shared/progress-bar/progress-bar';
import {
  i18n,
  init as i18nInit,
  getElementUILanguage,
} from '@/i18n';
import PortalVue from 'portal-vue';
import Element from 'element-ui';
import { AuthToken } from '@/modules/auth/auth-token';
import { TenantService } from '@/modules/tenant/tenant-service';
import { AuthService } from '@/modules/auth/auth-service';

(async function () {
  ProgressBar.start();
  const isSocialOnboardRequested = AuthService.isSocialOnboardRequested();
  AuthToken.applyFromLocationUrlIfExists();
  await TenantService.fetchAndApply();
  if (isSocialOnboardRequested) {
    await AuthService.socialOnboard();
  }
  SettingsService.applyThemeFromTenant();
  await i18nInit();

  Vue.use(Element, { locale: getElementUILanguage() });
  Vue.use(Router);
  Vue.use(PortalVue);
  Vue.config.productionTip =
    process.env.NODE_ENV === 'production';
  Vue.use(Vuex);

  const app = (await require('@/app.vue')).default;
  document.title = i18n('app.title');
  const {
    setupComponentsFiltersDirectivesAndMixins,
    storeAsync,
    routerAsync,
  } = await require('@/app-module');

  setupComponentsFiltersDirectivesAndMixins();

  // eslint-disable-next-line
  new Vue({
    store: storeAsync(),
    router: routerAsync(),
    render: (h) => h(app),
  }).$mount('#app');
})();
