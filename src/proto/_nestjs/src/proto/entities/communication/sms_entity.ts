/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

/** CommunicationSMSService messages */
export interface SendSMSSucessResponse {
  type: string;
  status: number;
  smsId: string;
  error: string;
  receiverNumbers: string;
  detail: string;
}

export interface SendSMSFailureResponse {
  type: string;
  code: number;
  error: string;
  detail: string;
}

/** SMSUnitBalance messages */
export interface SmsUnitBalanceResponse {
  status: string;
  response: string;
  totalUnit: number;
  totalBonus: number;
}

/** SMSDLRReport messages */
export interface SmsDLRReportResponse {
  status: string;
  smsId: string;
  dlrStatus: string;
  messageDateTime: string;
  pageNumber: string;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
