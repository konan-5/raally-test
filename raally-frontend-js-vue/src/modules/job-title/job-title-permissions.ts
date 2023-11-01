import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class JobTitlePermissions {
  read: boolean;
  import: boolean;
  jobTitleAutocomplete: boolean;
  create: boolean;
  edit: boolean;
  destroy: boolean;
  lockedForCurrentPlan: boolean;

  constructor(currentTenant, currentUser) {
    const permissionChecker = new PermissionChecker(
      currentTenant,
      currentUser,
    );

    this.read = permissionChecker.match(
      Permissions.values.jobTitleRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.jobTitleImport,
    );
    this.jobTitleAutocomplete = permissionChecker.match(
      Permissions.values.jobTitleAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.jobTitleCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.jobTitleEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.jobTitleDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.jobTitleRead,
    );
  }
}
