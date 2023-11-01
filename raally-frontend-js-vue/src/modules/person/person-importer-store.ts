import importerStore from '@/shared/importer/importer-store';
import { PersonService } from '@/modules/person/person-service';
import personImporterFields from '@/modules/person/person-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  PersonService.import,
  personImporterFields,
  i18n('entities.person.importer.fileName'),
  i18n('entities.person.importer.hint'),
);
