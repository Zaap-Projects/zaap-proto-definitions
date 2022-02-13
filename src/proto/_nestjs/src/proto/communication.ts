/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../src/proto/entities/shared/phone_number';
import {
  MessageSucessResponse,
  MessageFailureResponse,
  MessageUnitBalanceResponse,
  MessageDlrReportResponse,
} from '../../src/proto/entities/communication/message_entity';
import { Metadata } from '@grpc/grpc-js';
import { GeneratePublicAccessTokenResponse } from '../../src/proto/entities/shared/public_access_token_response';
import { EmptyValue } from '../../src/proto/entities/shared/empty_value';

export const protobufPackage = 'communicationService';

/** SendMessage messages */
export interface SendMessageRequest {
  phoneNumbers: PhoneNumber[];
  message: string;
}

export interface SendMessageResponse {
  success: MessageSucessResponse | undefined;
  failure: MessageFailureResponse | undefined;
}

/** MessageDlrReport messages */
export interface MessageDlrReportRequest {
  smsId?: string | undefined;
  senderId?: string | undefined;
  startFrom?: string | undefined;
  endTo?: string | undefined;
  page?: string | undefined;
}

export const COMMUNICATION_SERVICE_PACKAGE_NAME = 'communicationService';

export interface CommunicationServiceClient {
  generatePublicAccessToken(
    request: EmptyValue,
    metadata?: Metadata,
  ): Observable<GeneratePublicAccessTokenResponse>;

  /** Message service */

  sendMessage(
    request: SendMessageRequest,
    metadata?: Metadata,
  ): Observable<SendMessageResponse>;

  messageUnitBalance(
    request: EmptyValue,
    metadata?: Metadata,
  ): Observable<MessageUnitBalanceResponse>;

  messageDlrReport(
    request: MessageDlrReportRequest,
    metadata?: Metadata,
  ): Observable<MessageDlrReportResponse>;
}

export interface CommunicationServiceController {
  generatePublicAccessToken(
    request: EmptyValue,
    metadata?: Metadata,
  ):
    | Promise<GeneratePublicAccessTokenResponse>
    | Observable<GeneratePublicAccessTokenResponse>
    | GeneratePublicAccessTokenResponse;

  /** Message service */

  sendMessage(
    request: SendMessageRequest,
    metadata?: Metadata,
  ):
    | Promise<SendMessageResponse>
    | Observable<SendMessageResponse>
    | SendMessageResponse;

  messageUnitBalance(
    request: EmptyValue,
    metadata?: Metadata,
  ):
    | Promise<MessageUnitBalanceResponse>
    | Observable<MessageUnitBalanceResponse>
    | MessageUnitBalanceResponse;

  messageDlrReport(
    request: MessageDlrReportRequest,
    metadata?: Metadata,
  ):
    | Promise<MessageDlrReportResponse>
    | Observable<MessageDlrReportResponse>
    | MessageDlrReportResponse;
}

export function CommunicationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'generatePublicAccessToken',
      'sendMessage',
      'messageUnitBalance',
      'messageDlrReport',
    ];
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
