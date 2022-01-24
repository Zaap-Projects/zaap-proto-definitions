/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { IdParamsList } from '../../../../src/proto/entities/shared/id_params';

export const protobufPackage = '';

export interface DeleteStatus {
  message: string;
  deleted: IdParamsList[];
  notFound: IdParamsList[];
  failed: IdParamsList[];
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
