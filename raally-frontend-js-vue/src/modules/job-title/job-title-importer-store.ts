import importerStore from '@/shared/importer/importer-store';
import { JobTitleService } from '@/modules/job-title/job-title-service';
import jobTitleImporterFields from '@/modules/job-title/job-title-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  JobTitleService.import,
  jobTitleImporterFields,
  i18n('entities.jobTitle.importer.fileName'),
  i18n('entities.jobTitle.importer.hint'),
);
