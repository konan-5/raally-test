import routes from '@/modules/person/person-routes';
import store from '@/modules/person/person-store';
import PersonAutocompleteInput from '@/modules/person/components/person-autocomplete-input.vue';

export default {
  components: {
    'app-person-autocomplete-input': PersonAutocompleteInput,
  },
  routes,
  store,
};
