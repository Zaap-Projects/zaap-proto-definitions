/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

/** CommunicationSMSService messages */
export interface SendSmsSucessResponse {
  type: string;
  status: number;
  smsId: string;
  error: string;
  receiverNumbers: string[];
  detail: string;
}

export interface SendSmsFailureResponse {
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
export interface SmsDlrReportResponse {
  status: string;
  smsId: string[];
  dlrStatus: string[];
  messageDateTime: string[];
  pageNumber: number;
}

export const _PACKAGE_NAME = '';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
