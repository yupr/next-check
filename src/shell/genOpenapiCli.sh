#!/bin/bash

dir_path=(src/api/docs/*)

# 念の為、直下のフォルダのみを検出
dirs=$(find "${dir_path[0]}" -maxdepth 1 -type d)

for dir in $dirs; do
  # 生成元
  Gen_Origin_PATH="$dir/swagger.json"

  # 生成先
  Gen_Destination_PATH="src/api/cli/$(basename "$dir")"

  # APIクライアントを指定のディレクトリに生成
  ./node_modules/.bin/openapi-generator-cli generate -g typescript-axios -i "$Gen_Origin_PATH" -o "$Gen_Destination_PATH"
done
