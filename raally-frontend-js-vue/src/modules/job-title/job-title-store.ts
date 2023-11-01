import jobTitleListStore from '@/modules/job-title/job-title-list-store';
import jobTitleViewStore from '@/modules/job-title/job-title-view-store';
import jobTitleImporterStore from '@/modules/job-title/job-title-importer-store';
import jobTitleFormStore from '@/modules/job-title/job-title-form-store';
import jobTitleDestroyStore from '@/modules/job-title/job-title-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: jobTitleDestroyStore,
    form: jobTitleFormStore,
    list: jobTitleListStore,
    view: jobTitleViewStore,
    importer: jobTitleImporterStore,
  },
};
