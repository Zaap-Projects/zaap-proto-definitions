/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Metadata } from '../../../../src/proto/entities/shared/metadata';

export const protobufPackage = '';

export interface QueryParamsUsers {
  limit?: number | undefined;
  page?: number | undefined;
  metadata: Metadata | undefined;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
