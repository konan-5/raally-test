import { ProjectModel } from '@/modules/project/project-model';

const { fields } = ProjectModel;

export default [
  fields.projectId,
  fields.name,
  fields.type,
];
