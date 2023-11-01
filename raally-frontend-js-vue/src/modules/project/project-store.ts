import projectListStore from '@/modules/project/project-list-store';
import projectViewStore from '@/modules/project/project-view-store';
import projectImporterStore from '@/modules/project/project-importer-store';
import projectFormStore from '@/modules/project/project-form-store';
import projectDestroyStore from '@/modules/project/project-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: projectDestroyStore,
    form: projectFormStore,
    list: projectListStore,
    view: projectViewStore,
    importer: projectImporterStore,
  },
};
