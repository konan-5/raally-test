import { CompensationModel } from '@/modules/compensation/compensation-model';

const { fields } = CompensationModel;

export default [
  fields.person,
  fields.type,
  fields.workAvailability,
  fields.monetary,
  fields.paidTimeOff,
  fields.otherBenefits,
  fields.effectiveDate,
];
