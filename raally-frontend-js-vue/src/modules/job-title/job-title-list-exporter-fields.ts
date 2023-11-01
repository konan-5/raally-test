import { JobTitleModel } from '@/modules/job-title/job-title-model';

const { fields } = JobTitleModel;

export default [
  fields.id,
  fields.person,
  fields.title,
  fields.effectiveDate,
  fields.createdAt,
  fields.updatedAt
];
