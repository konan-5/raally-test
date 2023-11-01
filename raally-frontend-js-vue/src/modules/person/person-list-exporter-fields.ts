import { PersonModel } from '@/modules/person/person-model';

const { fields } = PersonModel;

export default [
  fields.id,
  fields.fullName,
  fields.createdAt,
  fields.updatedAt
];
