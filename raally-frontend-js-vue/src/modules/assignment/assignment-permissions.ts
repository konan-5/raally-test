import Permissions from '@/security/permissions';
import { PermissionChecker } from '@/modules/user/permission-checker';

export class AssignmentPermissions {
  read: boolean;
  import: boolean;
  assignmentAutocomplete: boolean;
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
      Permissions.values.assignmentRead,
    );
    this.import = permissionChecker.match(
      Permissions.values.assignmentImport,
    );
    this.assignmentAutocomplete = permissionChecker.match(
      Permissions.values.assignmentAutocomplete,
    );
    this.create = permissionChecker.match(
      Permissions.values.assignmentCreate,
    );
    this.edit = permissionChecker.match(
      Permissions.values.assignmentEdit,
    );
    this.destroy = permissionChecker.match(
      Permissions.values.assignmentDestroy,
    );
    this.lockedForCurrentPlan = permissionChecker.lockedForCurrentPlan(
      Permissions.values.assignmentRead,
    );
  }
}
