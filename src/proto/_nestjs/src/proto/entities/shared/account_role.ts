/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { PermissionEntity } from '../../../../src/proto/entities/shared/permission_entity';

export const protobufPackage = '';

export interface AccountRole {
  name: string;
  permissions: PermissionEntity[];
  workGroup: string;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
