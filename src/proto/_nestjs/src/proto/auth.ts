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
import { CreateUserRequest } from '../../src/proto/user';

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
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['token', 'login', 'signup', 'verifyOtpCode'];
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
