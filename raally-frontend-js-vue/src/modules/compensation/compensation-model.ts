import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import { GenericModel } from '@/shared/model/generic-model';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import IntegerField from '@/shared/fields/integer-field';
import IntegerRangeField from '@/shared/fields/integer-range-field';
import StringField from '@/shared/fields/string-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import DecimalRangeField from '@/shared/fields/decimal-range-field';
import DecimalField from '@/shared/fields/decimal-field';
import DateField from '@/shared/fields/date-field';
import DateRangeField from '@/shared/fields/date-range-field';
import { PersonField } from '@/modules/person/person-field';

function label(name) {
  return i18n(`entities.compensation.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.compensation.enumerators.${name}.${value}`);
}

function placeholder(name) {
  return i18n(`entities.compensation.placeholders.${name}`);
}

function hint(name) {
  return i18n(`entities.compensation.hints.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  person: PersonField.relationToOne('person', label('person'), {
    "required": true
  }),
  type: new EnumeratorField('type', label('type'), [
    { id: 'hourly', label: enumeratorLabel('type', 'hourly') },
    { id: 'salaried', label: enumeratorLabel('type', 'salaried') },
  ],{
    "placeholder": placeholder('type'),
    "hint": hint('type'),
    "required": true
  }),
  workAvailability: new IntegerField('workAvailability', label('workAvailability'), {
    "placeholder": placeholder('workAvailability'),
    "hint": hint('workAvailability'),
    "max": 60,
    "min": 5,
    "required": true
  }),
  monetary: new DecimalField('monetary', label('monetary'), {
    "placeholder": placeholder('monetary'),
    "hint": hint('monetary'),
    "min": 0,
    "required": true
  }),
  paidTimeOff: new IntegerField('paidTimeOff', label('paidTimeOff'), {
    "placeholder": placeholder('paidTimeOff'),
    "hint": hint('paidTimeOff'),
    "required": true,
    "min": 0
  }),
  otherBenefits: new StringField('otherBenefits', label('otherBenefits'), {
    "hint": hint('otherBenefits')
  }),
  effectiveDate: new DateField('effectiveDate', label('effectiveDate'), {
    "hint": hint('effectiveDate'),
    "required": true
  }),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),
  workAvailabilityRange: new IntegerRangeField(
    'workAvailabilityRange',
    label('workAvailabilityRange'),
  ),
  monetaryRange: new DecimalRangeField(
    'monetaryRange',
    label('monetaryRange'),
  ),
  paidTimeOffRange: new IntegerRangeField(
    'paidTimeOffRange',
    label('paidTimeOffRange'),
  ),
  effectiveDateRange: new DateRangeField(
    'effectiveDateRange',
    label('effectiveDateRange'),
  ),
};

export class CompensationModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
