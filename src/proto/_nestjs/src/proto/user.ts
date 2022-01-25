/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../src/proto/entities/shared/phone_number';
import { Metadata } from '@grpc/grpc-js';
import {
  UserEntity,
  UserEntityWithPassword,
  UserEntityList,
} from '../../src/proto/entities/user_entity';
import { DeleteStatus } from '../../src/proto/entities/shared/delete_status';
import {
  IdParams,
  IdParamsList,
} from '../../src/proto/entities/shared/id_params';
import { QueryParamsUsers } from '../../src/proto/entities/shared/query_params_users';

export const protobufPackage = 'userService';

/** get-user-by-username messages */
export interface GetUserByEmailOrPhoneNumberRequest {
  email: string | undefined;
  phoneNumber: PhoneNumber | undefined;
}

/** create-user messages */
export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  phoneNumber: PhoneNumber | undefined;
  email: string;
  password: string;
}

/** update-user messages */
export interface UpdateUserRequest {
  id: string;
  firstname: string;
  lastname: string;
}

export const USER_SERVICE_PACKAGE_NAME = 'userService';

export interface UserServiceClient {
  getUserById(request: IdParams, metadata?: Metadata): Observable<UserEntity>;

  getUserByEmailOrPhoneNumber(
    request: GetUserByEmailOrPhoneNumberRequest,
    metadata?: Metadata,
  ): Observable<UserEntityWithPassword>;

  getMultipleUsers(
    request: QueryParamsUsers,
    metadata?: Metadata,
  ): Observable<UserEntityList>;

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Observable<UserEntity>;

  updateUser(
    request: UpdateUserRequest,
    metadata?: Metadata,
  ): Observable<UserEntity>;

  deleteUsers(
    request: IdParamsList,
    metadata?: Metadata,
  ): Observable<DeleteStatus>;
}

export interface UserServiceController {
  getUserById(
    request: IdParams,
    metadata?: Metadata,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  getUserByEmailOrPhoneNumber(
    request: GetUserByEmailOrPhoneNumberRequest,
    metadata?: Metadata,
  ):
    | Promise<UserEntityWithPassword>
    | Observable<UserEntityWithPassword>
    | UserEntityWithPassword;

  getMultipleUsers(
    request: QueryParamsUsers,
    metadata?: Metadata,
  ): Promise<UserEntityList> | Observable<UserEntityList> | UserEntityList;

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  updateUser(
    request: UpdateUserRequest,
    metadata?: Metadata,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  deleteUsers(
    request: IdParamsList,
    metadata?: Metadata,
  ): Promise<DeleteStatus> | Observable<DeleteStatus> | DeleteStatus;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getUserById',
      'getUserByEmailOrPhoneNumber',
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
