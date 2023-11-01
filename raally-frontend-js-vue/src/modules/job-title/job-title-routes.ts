import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const JobTitleListPage = () =>
  import(
    '@/modules/job-title/components/job-title-list-page.vue'
  );
const JobTitleFormPage = () =>
  import(
    '@/modules/job-title/components/job-title-form-page.vue'
  );
const JobTitleViewPage = () =>
  import(
    '@/modules/job-title/components/job-title-view-page.vue'
  );
const JobTitleImporterPage = () =>
  import(
    '@/modules/job-title/components/job-title-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'jobTitle',
        path: '/job-title',
        component: JobTitleListPage,
        meta: {
          auth: true,
          permission: Permissions.values.jobTitleRead,
        },
      },
      {
        name: 'jobTitleNew',
        path: '/job-title/new',
        component: JobTitleFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.jobTitleCreate,
        },
      },
      {
        name: 'jobTitleImporter',
        path: '/job-title/import',
        component: JobTitleImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.jobTitleImport,
        },
      },
      {
        name: 'jobTitleEdit',
        path: '/job-title/:id/edit',
        component: JobTitleFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.jobTitleEdit,
        },
        props: true,
      },
      {
        name: 'jobTitleView',
        path: '/job-title/:id',
        component: JobTitleViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.jobTitleRead,
        },
        props: true,
      },
    ],
  },
];
