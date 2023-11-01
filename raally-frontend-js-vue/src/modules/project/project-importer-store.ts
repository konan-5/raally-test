import importerStore from '@/shared/importer/importer-store';
import { ProjectService } from '@/modules/project/project-service';
import projectImporterFields from '@/modules/project/project-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  ProjectService.import,
  projectImporterFields,
  i18n('entities.project.importer.fileName'),
  i18n('entities.project.importer.hint'),
);
