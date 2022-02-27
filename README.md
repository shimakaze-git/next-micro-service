# front_server_side

Next.jsを使用したWeb

## 追加したライブラリ

- nookies
- firebase : v9.6.7
  - FirebaseのSDK、認証処理を行うのに使う
- firebase-admin : v10.0.2
  - 管理者用のSDK、セッション ID の検証などに使う

# Firebaseの初期設定

`firebase-tools`を導入して、下記コマンドを実行

```bash
$ firebase login

# 新しいプロジェクトを作成する.
$ firebase init
```
