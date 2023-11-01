import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const CompensationListPage = () =>
  import(
    '@/modules/compensation/components/compensation-list-page.vue'
  );
const CompensationFormPage = () =>
  import(
    '@/modules/compensation/components/compensation-form-page.vue'
  );
const CompensationViewPage = () =>
  import(
    '@/modules/compensation/components/compensation-view-page.vue'
  );
const CompensationImporterPage = () =>
  import(
    '@/modules/compensation/components/compensation-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'compensation',
        path: '/compensation',
        component: CompensationListPage,
        meta: {
          auth: true,
          permission: Permissions.values.compensationRead,
        },
      },
      {
        name: 'compensationNew',
        path: '/compensation/new',
        component: CompensationFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.compensationCreate,
        },
      },
      {
        name: 'compensationImporter',
        path: '/compensation/import',
        component: CompensationImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.compensationImport,
        },
      },
      {
        name: 'compensationEdit',
        path: '/compensation/:id/edit',
        component: CompensationFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.compensationEdit,
        },
        props: true,
      },
      {
        name: 'compensationView',
        path: '/compensation/:id',
        component: CompensationViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.compensationRead,
        },
        props: true,
      },
    ],
  },
];
