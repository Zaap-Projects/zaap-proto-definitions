/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { ListMeta } from '../../../src/proto/entities/shared/list_meta';
import { PhoneNumber } from '../../../src/proto/entities/shared/phone_number';

export const protobufPackage = '';

export interface UserEntityList {
  data: UserEntity[];
  meta: ListMeta | undefined;
}

export interface UserEntity {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: PhoneNumber | undefined;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserEntityWithPassword {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: PhoneNumber | undefined;
  email: string;
  password: string;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
