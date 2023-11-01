import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const AssignmentListPage = () =>
  import(
    '@/modules/assignment/components/assignment-list-page.vue'
  );
const AssignmentFormPage = () =>
  import(
    '@/modules/assignment/components/assignment-form-page.vue'
  );
const AssignmentViewPage = () =>
  import(
    '@/modules/assignment/components/assignment-view-page.vue'
  );
const AssignmentImporterPage = () =>
  import(
    '@/modules/assignment/components/assignment-importer-page.vue'
  );

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'assignment',
        path: '/assignment',
        component: AssignmentListPage,
        meta: {
          auth: true,
          permission: Permissions.values.assignmentRead,
        },
      },
      {
        name: 'assignmentNew',
        path: '/assignment/new',
        component: AssignmentFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.assignmentCreate,
        },
      },
      {
        name: 'assignmentImporter',
        path: '/assignment/import',
        component: AssignmentImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.assignmentImport,
        },
      },
      {
        name: 'assignmentEdit',
        path: '/assignment/:id/edit',
        component: AssignmentFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.assignmentEdit,
        },
        props: true,
      },
      {
        name: 'assignmentView',
        path: '/assignment/:id',
        component: AssignmentViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.assignmentRead,
        },
        props: true,
      },
    ],
  },
];
