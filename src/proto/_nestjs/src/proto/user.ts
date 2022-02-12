/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../src/proto/entities/shared/phone_number';
import { Metadata } from '../../src/proto/entities/shared/metadata';
import { Metadata as Metadata1 } from '@grpc/grpc-js';
import {
  UserEntity,
  UserEntityList,
} from '../../src/proto/entities/user_entity';
import { DeleteStatus } from '../../src/proto/entities/shared/delete_status';
import { EmptyValue } from '../../src/proto/entities/shared/empty_value';
import {
  IdParams,
  IdParamsList,
} from '../../src/proto/entities/shared/id_params';
import { QueryParamsUsers } from '../../src/proto/entities/shared/query_params_users';

export const protobufPackage = 'userService';

export interface GeneratePublicAccessTokenResponse {
  token: string;
}

/** create-user messages */
export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  phoneNumber: PhoneNumber | undefined;
  email: string;
  password: string;
  metadata: Metadata | undefined;
}

/** update-user messages */
export interface UpdateUserRequest {
  id: string;
  firstname: string;
  lastname: string;
}

export const USER_SERVICE_PACKAGE_NAME = 'userService';

export interface UserServiceClient {
  generatePublicAccessToken(
    request: EmptyValue,
    metadata?: Metadata1,
  ): Observable<GeneratePublicAccessTokenResponse>;

  getUserById(request: IdParams, metadata?: Metadata1): Observable<UserEntity>;

  getMultipleUsers(
    request: QueryParamsUsers,
    metadata?: Metadata1,
  ): Observable<UserEntityList>;

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata1,
  ): Observable<UserEntity>;

  updateUser(
    request: UpdateUserRequest,
    metadata?: Metadata1,
  ): Observable<UserEntity>;

  deleteUsers(
    request: IdParamsList,
    metadata?: Metadata1,
  ): Observable<DeleteStatus>;
}

export interface UserServiceController {
  generatePublicAccessToken(
    request: EmptyValue,
    metadata?: Metadata1,
  ):
    | Promise<GeneratePublicAccessTokenResponse>
    | Observable<GeneratePublicAccessTokenResponse>
    | GeneratePublicAccessTokenResponse;

  getUserById(
    request: IdParams,
    metadata?: Metadata1,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  getMultipleUsers(
    request: QueryParamsUsers,
    metadata?: Metadata1,
  ): Promise<UserEntityList> | Observable<UserEntityList> | UserEntityList;

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata1,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  updateUser(
    request: UpdateUserRequest,
    metadata?: Metadata1,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  deleteUsers(
    request: IdParamsList,
    metadata?: Metadata1,
  ): Promise<DeleteStatus> | Observable<DeleteStatus> | DeleteStatus;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'generatePublicAccessToken',
      'getUserById',
      'getMultipleUsers',
      'createUser',
      'updateUser',
      'deleteUsers',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('UserService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USER_SERVICE_NAME = 'UserService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
