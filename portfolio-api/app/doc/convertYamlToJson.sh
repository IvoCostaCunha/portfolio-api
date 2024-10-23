#! /bin/bash
swagger-codegen generate -i swagger.yaml -l openapi
rm -rf swagger.json
mv openapi.json swagger.json
rm -rf .swagger-codegen .swagger-codegen-ignore README.md