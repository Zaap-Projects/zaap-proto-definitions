# #Stop following command execution if command before failed
set -e

# nestJs
generate_nestjs_proto_definitions() {
    # remove directory if exists
    rm -r ./src/proto/nestjs

    # make directory
    mkdir ./src/proto/nestjs

    # generate definitions
   

    # for f in ./src/proto/*.proto; do
    #     # bash "$f"
    #     echo "$f"
    #     protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=addGrpcMetadata=true --ts_proto_opt=nestJs=true --ts_proto_out=./src/proto/nestjs f
    # done
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=addGrpcMetadata=true --ts_proto_opt=nestJs=true --ts_proto_out=./src/proto/nestjs ./src/proto/auth.proto
}

#TODO: automate scripts to generate all protos once
#run bash functions
generate_nestjs_proto_definitions