import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class CompensationPermissions {
  read: boolean;
  import: boolean;
  compensationAutocomplete: boolean;
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
      Permissions.values.compensationRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.compensationImport,
    );
    this.compensationAutocomplete = permissionChecker.match(
      Permissions.values.compensationAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.compensationCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.compensationEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.compensationDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.compensationRead,
    );
  }
}
