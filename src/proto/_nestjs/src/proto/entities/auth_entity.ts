/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { UserEntity } from '../../../src/proto/entities/user_entity';

export const protobufPackage = '';

export interface TokensEntity {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  tokens: TokensEntity | undefined;
  user: UserEntity | undefined;
}

export interface SignupAccountResponse {
  user: UserEntity | undefined;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
