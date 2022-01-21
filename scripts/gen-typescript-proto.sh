# typescript
generate_typescript_proto_definitions() {
    # remove directory if exists
    rm -r ./src/proto/typescript

    # make directory
     mkdir ./src/proto/typescript

    # generate definitions
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./src/proto/typescript ./src/proto/user.proto
}

#TODO: automate scripts
#run bash functions
generate_typescript_proto_definitions