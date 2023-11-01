import importerStore from '@/shared/importer/importer-store';
import { CompensationService } from '@/modules/compensation/compensation-service';
import compensationImporterFields from '@/modules/compensation/compensation-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  CompensationService.import,
  compensationImporterFields,
  i18n('entities.compensation.importer.fileName'),
  i18n('entities.compensation.importer.hint'),
);
