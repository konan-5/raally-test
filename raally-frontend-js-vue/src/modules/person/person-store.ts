import personListStore from '@/modules/person/person-list-store';
import personViewStore from '@/modules/person/person-view-store';
import personImporterStore from '@/modules/person/person-importer-store';
import personFormStore from '@/modules/person/person-form-store';
import personDestroyStore from '@/modules/person/person-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: personDestroyStore,
    form: personFormStore,
    list: personListStore,
    view: personViewStore,
    importer: personImporterStore,
  },
};
