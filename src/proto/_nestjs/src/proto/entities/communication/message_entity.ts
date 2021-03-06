/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

/** CommunicationService messages */
export interface MessageSucessResponse {
  type: string;
  status: number;
  smsId: string;
  error: string;
  receiverNumbers: string[];
  detail: string;
}

export interface MessageFailureResponse {
  type: string;
  code: number;
  error: string;
  detail: string;
}

/** MessageUnitBalance messages */
export interface MessageUnitBalanceResponse {
  status: string;
  response: string;
  totalUnit: number;
  totalBonus: number;
}

/** MessageDLRReport messages */
export interface MessageDlrReportResponse {
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
