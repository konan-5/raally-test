import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class PersonPermissions {
  read: boolean;
  import: boolean;
  personAutocomplete: boolean;
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
      Permissions.values.personRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.personImport,
    );
    this.personAutocomplete = permissionChecker.match(
      Permissions.values.personAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.personCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.personEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.personDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.personRead,
    );
  }
}
