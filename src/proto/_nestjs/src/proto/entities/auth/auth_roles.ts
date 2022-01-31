/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { UserEntity } from '../../../../src/proto/entities/user_entity';
import { ListMeta } from '../../../../src/proto/entities/shared/list_meta';
import { AccountRole } from '../../../../src/proto/entities/shared/account_role';

export const protobufPackage = '';

export interface RoleEntity {
  id: string;
  name: string;
  permissions: string[];
  author: UserEntity | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface RoleEntityList {
  roles: RoleEntity[];
  meta: ListMeta | undefined;
}

/** create-role message */
export interface RoleRequest {
  name: string;
  permissions: string[];
  author: string;
}

export interface CreateRolesRequest {
  roles: RoleRequest[];
}

/** assign-roles message */
export interface AssignRolesRequest {
  userId: string;
  role: AccountRole | undefined;
  author: string;
}

export interface AccountRoleEntity {
  id: string;
  userId: string;
  role: AccountRole | undefined;
  author: UserEntity | undefined;
  createdAt: string;
  updatedAt: string;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
