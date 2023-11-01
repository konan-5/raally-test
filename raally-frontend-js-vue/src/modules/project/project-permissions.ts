import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class ProjectPermissions {
  read: boolean;
  import: boolean;
  projectAutocomplete: boolean;
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
      Permissions.values.projectRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.projectImport,
    );
    this.projectAutocomplete = permissionChecker.match(
      Permissions.values.projectAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.projectCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.projectEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.projectDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.projectRead,
    );
  }
}
