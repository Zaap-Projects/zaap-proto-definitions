# #Stop following command execution if command before failed
# set -e

# nestJs
generate_nestjs_proto_definitions() {
    # remove directory if exists
    rm -r ./src/proto/nestjs

    # make directory
    mkdir ./src/proto/nestjs

    # generate definitions
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=addGrpcMetadata=true --ts_proto_opt=nestJs=true --ts_proto_out=./src/proto/nestjs ./src/proto/user.proto
}

#TODO: automate scripts
#run bash functions
generate_nestjs_proto_definitions