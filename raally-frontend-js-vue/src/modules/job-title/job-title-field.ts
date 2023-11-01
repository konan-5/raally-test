import { JobTitleService } from '@/modules/job-title/job-title-service';
import RelationToOneField from '@/shared/fields/relation-to-one-field';
import RelationToManyField from '@/shared/fields/relation-to-many-field';
import Permissions from '@/security/permissions';

export class JobTitleField {
  static relationToOne(name, label, options) {
    return new RelationToOneField(
      name,
      label,
      '/job-title',
      Permissions.values.jobTitleRead,
      JobTitleService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }

  static relationToMany(name, label, options) {
    return new RelationToManyField(
      name,
      label,
      '/job-title',
      Permissions.values.jobTitleRead,
      JobTitleService.listAutocomplete,
      (record) => {
        if (!record) {
          return null;
        }

        return {
          id: record.id,
          label: record.id,
        };
      },
      options,
    );
  }
}
