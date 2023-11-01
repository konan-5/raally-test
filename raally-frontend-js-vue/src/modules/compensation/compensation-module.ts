import routes from '@/modules/compensation/compensation-routes';
import store from '@/modules/compensation/compensation-store';
import CompensationAutocompleteInput from '@/modules/compensation/components/compensation-autocomplete-input.vue';

export default {
  components: {
    'app-compensation-autocomplete-input': CompensationAutocompleteInput,
  },
  routes,
  store,
};
