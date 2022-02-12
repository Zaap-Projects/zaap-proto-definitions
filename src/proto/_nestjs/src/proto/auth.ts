/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../src/proto/entities/shared/phone_number';
import { Metadata } from '../../src/proto/entities/shared/metadata';
import { Metadata as Metadata1 } from '@grpc/grpc-js';
import {
  TokensEntity,
  ValidateAccessCredentialsResponse,
  LoginResponse,
} from '../../src/proto/entities/auth_entity';
import { MessageResponse } from '../../src/proto/entities/shared/message_response';
import { UserEntity } from '../../src/proto/entities/user_entity';
import {
  RoleEntityList,
  AccountRoleEntity,
  CreateRolesRequest,
  AssignRolesRequest,
} from '../../src/proto/entities/auth/auth_roles';
import {
  WorkGroupEntityList,
  CreateWorkGroupResponse,
  CreateWorkGroupRequest,
} from '../../src/proto/entities/auth/work_groups';
import { EmptyValue } from '../../src/proto/entities/shared/empty_value';
import { CreateUserRequest } from '../../src/proto/user';
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
  metadata: Metadata | undefined;
}

export const AUTH_SERVICE_PACKAGE_NAME = 'authService';

export interface AuthServiceClient {
  token(request: TokensRequest, metadata?: Metadata1): Observable<TokensEntity>;

  validateAccessCredentials(
    request: EmptyValue,
    metadata?: Metadata1,
  ): Observable<ValidateAccessCredentialsResponse>;

  login(request: LoginRequest, metadata?: Metadata1): Observable<LoginResponse>;

  signup(
    request: CreateUserRequest,
    metadata?: Metadata1,
  ): Observable<MessageResponse>;

  verifyOtpCode(
    request: OtpValidationCodeRequest,
    metadata?: Metadata1,
  ): Observable<UserEntity>;

  /** comprises of permission-sets used to define user-resource access */

  getRoles(
    request: EmptyValue,
    metadata?: Metadata1,
  ): Observable<RoleEntityList>;

  createRoles(
    request: CreateRolesRequest,
    metadata?: Metadata1,
  ): Observable<RoleEntityList>;

  assignRoles(
    request: AssignRolesRequest,
    metadata?: Metadata1,
  ): Observable<AccountRoleEntity>;

  /** defines a scope to user-role (eg. operations - work group) */

  getWorkGroups(
    request: QueryParamsUsers,
    metadata?: Metadata1,
  ): Observable<WorkGroupEntityList>;

  createWorkGroup(
    request: CreateWorkGroupRequest,
    metadata?: Metadata1,
  ): Observable<CreateWorkGroupResponse>;
}

export interface AuthServiceController {
  token(
    request: TokensRequest,
    metadata?: Metadata1,
  ): Promise<TokensEntity> | Observable<TokensEntity> | TokensEntity;

  validateAccessCredentials(
    request: EmptyValue,
    metadata?: Metadata1,
  ):
    | Promise<ValidateAccessCredentialsResponse>
    | Observable<ValidateAccessCredentialsResponse>
    | ValidateAccessCredentialsResponse;

  login(
    request: LoginRequest,
    metadata?: Metadata1,
  ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  signup(
    request: CreateUserRequest,
    metadata?: Metadata1,
  ): Promise<MessageResponse> | Observable<MessageResponse> | MessageResponse;

  verifyOtpCode(
    request: OtpValidationCodeRequest,
    metadata?: Metadata1,
  ): Promise<UserEntity> | Observable<UserEntity> | UserEntity;

  /** comprises of permission-sets used to define user-resource access */

  getRoles(
    request: EmptyValue,
    metadata?: Metadata1,
  ): Promise<RoleEntityList> | Observable<RoleEntityList> | RoleEntityList;

  createRoles(
    request: CreateRolesRequest,
    metadata?: Metadata1,
  ): Promise<RoleEntityList> | Observable<RoleEntityList> | RoleEntityList;

  assignRoles(
    request: AssignRolesRequest,
    metadata?: Metadata1,
  ):
    | Promise<AccountRoleEntity>
    | Observable<AccountRoleEntity>
    | AccountRoleEntity;

  /** defines a scope to user-role (eg. operations - work group) */

  getWorkGroups(
    request: QueryParamsUsers,
    metadata?: Metadata1,
  ):
    | Promise<WorkGroupEntityList>
    | Observable<WorkGroupEntityList>
    | WorkGroupEntityList;

  createWorkGroup(
    request: CreateWorkGroupRequest,
    metadata?: Metadata1,
  ):
    | Promise<CreateWorkGroupResponse>
    | Observable<CreateWorkGroupResponse>
    | CreateWorkGroupResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'token',
      'validateAccessCredentials',
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
