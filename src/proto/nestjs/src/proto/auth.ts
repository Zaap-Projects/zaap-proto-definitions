/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { UserEntity, CreateUserRequest } from '../../src/proto/user';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'authService';

/** generic entities */
export interface TokensEntity {
  access: string;
  refresh: string;
}

/** token messages */
export interface TokensRequest {
  refreshToken: string;
}

/** login messages */
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  tokens: TokensEntity | undefined;
  user: UserEntity | undefined;
}

/**
 * signup messages
 * TODO: add other params eg. CreateCourierRequest, CreateFleetRequest
 */
export interface SignupAccountRequest {
  createUserRequest: CreateUserRequest | undefined;
}

export interface SignupAccountResponse {
  user: UserEntity | undefined;
}

export const AUTH_SERVICE_PACKAGE_NAME = 'authService';

export interface AuthServiceClient {
  token(request: TokensRequest, metadata?: Metadata): Observable<TokensEntity>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  signup(
    request: SignupAccountRequest,
    metadata?: Metadata,
  ): Observable<SignupAccountResponse>;
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
    request: SignupAccountRequest,
    metadata?: Metadata,
  ):
    | Promise<SignupAccountResponse>
    | Observable<SignupAccountResponse>
    | SignupAccountResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['token', 'login', 'signup'];
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
