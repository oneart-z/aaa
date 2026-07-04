# 採用力診断 2026

2026年の採用マーケティング動向を踏まえた、無料の採用力診断サイトです。

## 内容

- 採用広報、候補者体験、スキルベース採用、AI・データ運用の4軸で診断
- 12問の選択式フォーム
- 100点満点の総合スコア、成熟度、領域別スコア、優先施策を表示
- 回答はブラウザ内だけで処理し、外部送信しません

## 起動

```bash
npm start
```

ブラウザで `http://localhost:3000` を開きます。

## デプロイ

他の人に見せるには、次のどれかで公開URLを発行します。

### いちばん簡単: Netlify Drop

1. `public` フォルダを Netlify Drop にドラッグします。
2. 発行されたURLを共有します。

このサイトはHTML/CSS/JSだけで動くため、ビルド設定は不要です。

### GitHub Pages

1. このリポジトリをGitHubへpushします。
2. リポジトリ設定の Pages で Source を `GitHub Actions` にします。
3. 発行された `https://...github.io/.../` のURLを共有します。

`.github/workflows/pages.yml` が `public` フォルダを公開します。

### Render

Render などの Node.js Web Service にもデプロイできます。

必要な環境変数:

- `HOST`: `0.0.0.0`

このリポジトリには Render 用の `render.yaml` を入れています。
