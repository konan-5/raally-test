import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const ProjectListPage = () =>
  import(
    '@/modules/project/components/project-list-page.vue'
  );
const ProjectFormPage = () =>
  import(
    '@/modules/project/components/project-form-page.vue'
  );
const ProjectViewPage = () =>
  import(
    '@/modules/project/components/project-view-page.vue'
  );
const ProjectImporterPage = () =>
  import(
    '@/modules/project/components/project-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'project',
        path: '/project',
        component: ProjectListPage,
        meta: {
          auth: true,
          permission: Permissions.values.projectRead,
        },
      },
      {
        name: 'projectNew',
        path: '/project/new',
        component: ProjectFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.projectCreate,
        },
      },
      {
        name: 'projectImporter',
        path: '/project/import',
        component: ProjectImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.projectImport,
        },
      },
      {
        name: 'projectEdit',
        path: '/project/:id/edit',
        component: ProjectFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.projectEdit,
        },
        props: true,
      },
      {
        name: 'projectView',
        path: '/project/:id',
        component: ProjectViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.projectRead,
        },
        props: true,
      },
    ],
  },
];
