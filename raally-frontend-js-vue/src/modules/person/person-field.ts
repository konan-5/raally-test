import { PersonService } from '@/modules/person/person-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class PersonField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/person',
      Permissions.values.personRead,
      PersonService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.fullName,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/person',
      Permissions.values.personRead,
      PersonService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.fullName,
        };
      },
      options,
    );
  }
}
