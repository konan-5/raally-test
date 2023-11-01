import compensationListStore from '@/modules/compensation/compensation-list-store';
import compensationViewStore from '@/modules/compensation/compensation-view-store';
import compensationImporterStore from '@/modules/compensation/compensation-importer-store';
import compensationFormStore from '@/modules/compensation/compensation-form-store';
import compensationDestroyStore from '@/modules/compensation/compensation-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: compensationDestroyStore,
    form: compensationFormStore,
    list: compensationListStore,
    view: compensationViewStore,
    importer: compensationImporterStore,
  },
};
