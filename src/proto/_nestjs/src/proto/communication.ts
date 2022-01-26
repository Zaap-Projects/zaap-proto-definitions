/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../src/proto/entities/shared/phone_number';
import {
  SendSMSSucessResponse,
  SmsUnitBalanceResponse,
  SmsDLRReportResponse,
} from '../../src/proto/entities/communication/sms_entity';
import { Metadata } from '@grpc/grpc-js';
import { EmptyValue } from '../../src/proto/entities/shared/empty_value';

export const protobufPackage = 'communicationService';

/** CommunicationSMSService messages */
export interface SendSMSRequest {
  phoneNumbers: PhoneNumber[];
  message: string;
}

export interface SendSMSResponse {
  success: SendSMSSucessResponse | undefined;
  failure: SendSMSSucessResponse | undefined;
}

/** SMSDLRReport messages */
export interface SmsDLRReportRequest {
  smsId?: string | undefined;
  senderId?: string | undefined;
  startFrom?: string | undefined;
  endTo?: string | undefined;
  page?: string | undefined;
}

export const COMMUNICATION_SERVICE_PACKAGE_NAME = 'communicationService';

export interface CommunicationServiceClient {
  /** SMS service */

  sendSMS(
    request: SendSMSRequest,
    metadata?: Metadata,
  ): Observable<SendSMSResponse>;

  smsUnitBalance(
    request: EmptyValue,
    metadata?: Metadata,
  ): Observable<SmsUnitBalanceResponse>;

  smsDLRReport(
    request: SmsDLRReportRequest,
    metadata?: Metadata,
  ): Observable<SmsDLRReportResponse>;
}

export interface CommunicationServiceController {
  /** SMS service */

  sendSMS(
    request: SendSMSRequest,
    metadata?: Metadata,
  ): Promise<SendSMSResponse> | Observable<SendSMSResponse> | SendSMSResponse;

  smsUnitBalance(
    request: EmptyValue,
    metadata?: Metadata,
  ):
    | Promise<SmsUnitBalanceResponse>
    | Observable<SmsUnitBalanceResponse>
    | SmsUnitBalanceResponse;

  smsDLRReport(
    request: SmsDLRReportRequest,
    metadata?: Metadata,
  ):
    | Promise<SmsDLRReportResponse>
    | Observable<SmsDLRReportResponse>
    | SmsDLRReportResponse;
}

export function CommunicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sendSMS', 'smsUnitBalance', 'smsDLRReport'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('CommunicationService', method)(
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
      GrpcStreamMethod('CommunicationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const COMMUNICATION_SERVICE_NAME = 'CommunicationService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
