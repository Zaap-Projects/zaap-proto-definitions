/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'userService';

export interface PhoneNumber {
  country: string;
  number: string;
}

export interface CreateUserRequest {
  firstname: string;
  lastname: string;
  phoneNumber: PhoneNumber | undefined;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  phoneNumber: PhoneNumber | undefined;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const USER_SERVICE_PACKAGE_NAME = 'userService';

export interface UserServiceClient {
  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserRequest,
  ):
    | Promise<CreateUserResponse>
    | Observable<CreateUserResponse>
    | CreateUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createUser'];
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
