import routes from '@/modules/job-title/job-title-routes';
import store from '@/modules/job-title/job-title-store';
import JobTitleAutocompleteInput from '@/modules/job-title/components/job-title-autocomplete-input.vue';

export default {
  components: {
    'app-job-title-autocomplete-input': JobTitleAutocompleteInput,
  },
  routes,
  store,
};
