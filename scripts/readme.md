To run all scripts,

1. Make your script runnable
After saving your TypeScript file, you’ll need to update its permissions to allow it to be executed:

> (chmod u+x scripts/*.sh)
# #!/bin/bash
# set -e
# for f in ./scripts/*.sh; do
#     chmod u+x f
# done

2. Run 

> scripts

or add to package.json

"scripts": {
    "gen-proto": "./scripts/gen-all-lang-proto.bash",
    ...
},

and run 

> yarn run gen-proto

