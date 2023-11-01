import { ProjectModel } from '@/modules/project/project-model';

const { fields } = ProjectModel;

export default [
  fields.id,
  fields.projectId,
  fields.name,
  fields.type,
  fields.createdAt,
  fields.updatedAt
];
