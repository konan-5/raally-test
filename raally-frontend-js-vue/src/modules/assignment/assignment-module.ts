import routes from '@/modules/assignment/assignment-routes';
import store from '@/modules/assignment/assignment-store';
import AssignmentAutocompleteInput from '@/modules/assignment/components/assignment-autocomplete-input.vue';

export default {
  components: {
    'app-assignment-autocomplete-input': AssignmentAutocompleteInput,
  },
  routes,
  store,
};
