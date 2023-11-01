import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const PersonListPage = () =>
  import(
    '@/modules/person/components/person-list-page.vue'
  );
const PersonFormPage = () =>
  import(
    '@/modules/person/components/person-form-page.vue'
  );
const PersonViewPage = () =>
  import(
    '@/modules/person/components/person-view-page.vue'
  );
const PersonImporterPage = () =>
  import(
    '@/modules/person/components/person-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'person',
        path: '/person',
        component: PersonListPage,
        meta: {
          auth: true,
          permission: Permissions.values.personRead,
        },
      },
      {
        name: 'personNew',
        path: '/person/new',
        component: PersonFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.personCreate,
        },
      },
      {
        name: 'personImporter',
        path: '/person/import',
        component: PersonImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.personImport,
        },
      },
      {
        name: 'personEdit',
        path: '/person/:id/edit',
        component: PersonFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.personEdit,
        },
        props: true,
      },
      {
        name: 'personView',
        path: '/person/:id',
        component: PersonViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.personRead,
        },
        props: true,
      },
    ],
  },
];
