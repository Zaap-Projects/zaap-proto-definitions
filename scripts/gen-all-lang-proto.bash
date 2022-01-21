# # run all scripts
# for SCRIPT in ./scripts/*
# do
# chmod u+x SCRIPT
# # if [ -f $SCRIPT -a -x $SCRIPT ]
# # then
# $SCRIPT
# fi
# done

# #!/bin/bash
# set -e
# for f in ./scripts/*.sh; do
#     bash "$f"
# done

# only execute nestjs-gen scripts
./scripts/gen-nestjs-proto.sh