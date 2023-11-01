import { JobTitleModel } from '@/modules/job-title/job-title-model';

const { fields } = JobTitleModel;

export default [
  fields.person,
  fields.title,
  fields.effectiveDate,
];
