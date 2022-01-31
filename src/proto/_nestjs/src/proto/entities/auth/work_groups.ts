/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Any } from '../../../../google/protobuf/any';
import { ListMeta } from '../../../../src/proto/entities/shared/list_meta';

export const protobufPackage = '';

/** `scope` here reflects area of influence in control by a specific work-group */
export interface CreateWorkGroupRequest {
  name: string;
  scope: string;
  objective: string;
  author: string;
}

/** work-group entities */
export interface WorkGroupEntity {
  id: string;
  name: string;
  objective: string;
  author: string[];
  members: Any[];
  createdAt: string;
  updatedAt: string;
}

export interface WorkGroupEntityList {
  data: WorkGroupEntity[];
  meta: ListMeta | undefined;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
