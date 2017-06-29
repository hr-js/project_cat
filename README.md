# project_cat
不満解消アプリ

# set up

## 1. node.jsをインストール
`brew install node`

## 2. yarn(npmのようなパッケージマネージャー)インストール
`npm install -g yarn`

## 3. packageをインストール
### package.jsonがあるディレクトリで以下のコマンドを実行  
`yarn install`  

## 4. mongoDBをインストール
`brew install mongodb`
### mongoDB起動
`brew services start mongodb`
### mongoDB接続
`sudo mongo`

## 5. アプリケーション起動
`yarn start`
### URL
`http://localhost:3000/`