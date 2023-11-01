import importerStore from '@/shared/importer/importer-store';
import { AssignmentService } from '@/modules/assignment/assignment-service';
import assignmentImporterFields from '@/modules/assignment/assignment-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  AssignmentService.import,
  assignmentImporterFields,
  i18n('entities.assignment.importer.fileName'),
  i18n('entities.assignment.importer.hint'),
);
