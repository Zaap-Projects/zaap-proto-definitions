/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { UserEntity } from '../../../../src/proto/entities/user_entity';
import { ListMeta } from '../../../../src/proto/entities/shared/list_meta';

export const protobufPackage = '';

/** `scope` here reflects area of influence in control by a specific work-group e.g. GLOBAL, REGIONAL, DISTRICT, CITY */
export enum SCOPE {
  GLOBAL = 0,
  COUNTRY = 1,
  REGION = 2,
  DISTRICT = 3,
  CITY = 4,
  UNRECOGNIZED = -1,
}

export interface AreaScope {
  scope: SCOPE;
  areaTag: string;
}

export interface CreateWorkGroupRequest {
  name: string;
  scope: AreaScope | undefined;
  objective: string;
  author: string;
}

export interface CreateWorkGroupResponse {
  id: string;
  name: string;
  scope?: AreaScope | undefined;
  objective: string;
  author: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

/** work-group entities */
export interface WorkGroupEntity {
  id: string;
  name: string;
  scope: AreaScope | undefined;
  objective: string;
  author: UserEntity | undefined;
  members: UserEntity[];
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
