#!/bin/bash

# 何がしたいか
# swaggerがあるディレクトリを辿り api cli をループで生成.
# api cliの生成元に当たるswaggerがあるディレクトリ名をコピー。
# コピーしたディレクトリが src/api/cli/ になければ作成して、先ほど生成したapi cliを該当のディレクトリに移動

# './node_modules/.bin/openapi-generator-cli'

# 生成元
Gen_Origin_PATH="src/api/docs/user/swagger.json"

# 生成先
Gen_Destination_PATH="src/api/cli/user"

# ファイルの存在確認
if [ -f $Gen_Origin_PATH ]; then
  echo 'ファイルがあることを確認'
fi

# ディレクトリの存在確認
if [ -d $Gen_Destination_PATH ]; then
  echo 'ディレクトリがあることを確認'
fi

./node_modules/.bin/openapi-generator-cli generate -g typescript-axios -i $Gen_Origin_PATH -o $Gen_Destination_PATH
