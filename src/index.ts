// export public api from here
// for example:
// export * from './decorators';
export * as auth_definitions from './proto/_nestjs/src/proto/auth';
export * as user_definitions from './proto/_nestjs/src/proto/user';
export * as communication_definitions from './proto/_nestjs/src/proto/communication';

export * as auth_entity_definitions from './proto/_nestjs/src/proto/entities/auth_entity';
export * as user_entity_definitions from './proto/_nestjs/src/proto/entities/user_entity';

export * as message_entity_definitions from './proto/_nestjs/src/proto/entities/communication/message_entity';

// export * as empty_value_definitions from './proto/_nestjs/src/proto/entities/shared/empty_value';
export * as id_params_definitions from './proto/_nestjs/src/proto/entities/shared/id_params';
export * as list_meta_definitions from './proto/_nestjs/src/proto/entities/shared/list_meta';
export * as phone_number_definitions from './proto/_nestjs/src/proto/entities/shared/phone_number';
export * as query_params_users_definitions from './proto/_nestjs/src/proto/entities/shared/query_params_users';
export * as delete_status_definitions from './proto/_nestjs/src/proto/entities/shared/delete_status';
export * as message_response_definitions from './proto/_nestjs/src/proto/entities/shared/message_response';