/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../src/proto/entities/shared/phone_number';
import { Metadata } from '@grpc/grpc-js';
import {
  TokensEntity,
  LoginResponse,
} from '../../src/proto/entities/auth_entity';
import { MessageResponse } from '../../src/proto/entities/shared/message_response';
import { UserEntity } from '../../src/proto/entities/user_entity';
import {
  RoleEntityList,
  CreateRolesRequest,
  AssignRolesRequest,
} from '../../src/proto/entities/auth/auth_roles';
import {
  WorkGroupEntityList,
  CreateWorkGroupResponse,
  CreateWorkGroupRequest,
} from '../../src/proto/entities/auth/work_groups';
import { CreateUserRequest } from '../../src/proto/user';
import { EmptyValue } from '../../src/proto/entities/shared/empty_value';
import { QueryParamsUsers } from '../../src/proto/entities/shared/query_params_users';

export const protobufPackage = 'authService';

/** token messages */
export interface TokensRequest {
  refreshToken: string;
}

/** login messages */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface OtpValidationCodeRequest {
  phoneNumber: PhoneNumber | undefined;
  otpCode: string;
}

export const AUTH_SERVICE_PACKAGE_NAME = 'authService';

export interface AuthServiceClient {
  token(request: TokensRequest, metadata?: Metadata): Observable<TokensEntity>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  signup(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Observable<MessageResponse>;

  verifyOtpCode(
    request: OtpValidationCodeRequest,
    metadata?: Metadata,
  ): Observable<UserEntity>;

  /** comprises of permission-sets used to define user-resource access */

  getRoles(
    request: EmptyValue,
    metadata?: Metadata,
  ): Observable<RoleEntityList>;

  createRoles(
    request: CreateRolesRequest,
    metadata?: Metadata,
  ): Observable<RoleEntityList>;

  assignRoles(
    request: AssignRolesRequest,
    metadata?: Metadata,
  ): Observable<MessageResponse>;

  /** defines a scope to user-role (eg. operations - work group) */

  getWorkGroups(
    request: QueryParamsUsers,
    metadata?: Metadata,
  ): Observable<WorkGroupEntityList>;

  createWorkGroup(
    request: CreateWorkGroupRequest,
    metadata?: Metadata,
  ): Observable<CreateWorkGroupResponse>;
}

export interface AuthServiceController {
  token(
    request: TokensRequest,
    metadata?: Metadata,
  ): Promise<TokensEntity> | Observable<TokensEntity> | TokensEntity;

  login(
    request: LoginRequest,
    metadata?: Metadata,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  signup(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;

  verifyOtpCode(
    request: OtpValidationCodeRequest,
    metadata?: Metadata,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  /** comprises of permission-sets used to define user-resource access */

  getRoles(
    request: EmptyValue,
    metadata?: Metadata,
  ): Promise<RoleEntityList> | Observable<RoleEntityList> | RoleEntityList;

  createRoles(
    request: CreateRolesRequest,
    metadata?: Metadata,
  ): Promise<RoleEntityList> | Observable<RoleEntityList> | RoleEntityList;

  assignRoles(
    request: AssignRolesRequest,
    metadata?: Metadata,
  ): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;

  /** defines a scope to user-role (eg. operations - work group) */

  getWorkGroups(
    request: QueryParamsUsers,
    metadata?: Metadata,
  ):
    | Promise<WorkGroupEntityList>
    | Observable<WorkGroupEntityList>
    | WorkGroupEntityList;

  createWorkGroup(
    request: CreateWorkGroupRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateWorkGroupResponse>
    | Observable<CreateWorkGroupResponse>
    | CreateWorkGroupResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'token',
      'login',
      'signup',
      'verifyOtpCode',
      'getRoles',
      'createRoles',
      'assignRoles',
      'getWorkGroups',
      'createWorkGroup',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('AuthService', method)(
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
      GrpcStreamMethod('AuthService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const AUTH_SERVICE_NAME = 'AuthService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
