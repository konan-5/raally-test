import routes from '@/modules/project/project-routes';
import store from '@/modules/project/project-store';
import ProjectAutocompleteInput from '@/modules/project/components/project-autocomplete-input.vue';

export default {
  components: {
    'app-project-autocomplete-input': ProjectAutocompleteInput,
  },
  routes,
  store,
};
