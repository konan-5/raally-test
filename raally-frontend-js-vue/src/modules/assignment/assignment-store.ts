import assignmentListStore from '@/modules/assignment/assignment-list-store';
import assignmentViewStore from '@/modules/assignment/assignment-view-store';
import assignmentImporterStore from '@/modules/assignment/assignment-importer-store';
import assignmentFormStore from '@/modules/assignment/assignment-form-store';
import assignmentDestroyStore from '@/modules/assignment/assignment-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: assignmentDestroyStore,
    form: assignmentFormStore,
    list: assignmentListStore,
    view: assignmentViewStore,
    importer: assignmentImporterStore,
  },
};
