#!/bin/bash
# INFO: This script copy API url from env file and writes it into codegen.ts file.

if [[ ! $1 =~ ^(development|staging|production)$ ]]; then
    echo "Provided parameter doesn't match. Matched parameters are development, staging or production."
    return
fi

INPUT_SRC=''

case "$1" in
"development") INPUT_SRC="./.env" ;;
"staging") INPUT_SRC="./.env.staging" ;;
"production") INPUT_SRC="./.env.production" ;;
esac

OUTPUT_SRC="codegen.yml"
PROD_URL_LINE=$(cat $INPUT_SRC | grep 'MOBILE_APP_API_URL')

IFS== read -r left PROD_URL <<<$PROD_URL_LINE

REPLACED_TEXT="schema: $PROD_URL"

sed -i '' -e "2s#.*#${REPLACED_TEXT}#g" "$OUTPUT_SRC"
