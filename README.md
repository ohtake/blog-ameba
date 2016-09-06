# blog-ameba

[![Code Climate](https://codeclimate.com/github/ohtake/blog-ameba/badges/gpa.svg)](https://codeclimate.com/github/ohtake/blog-ameba)
[![Dependency Status](https://www.versioneye.com/user/projects/57cebba39b4cc20044fffd40/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57cebba39b4cc20044fffd40)

[http://ameblo.jp/ohtaket/](http://ameblo.jp/ohtaket/) の原稿置場です。

## 更新手順

1. 本文を Markdown およびその派生で書く。
    * 画像がある場合には GitHub の絶対 URI になるようにする。心配ならば先に画像だけをコミットしてプッシュする。
        * 昔は Markdown からの相対パスに対応していなかったからそのように決めたが、今は Flickr か Picasa から画像を読み込むことがほとんどなのでもう不要かも。
1. 書いた Markdown を変換できるプログラムを使って変換する。
    * table とか code とかの独自文法に注意。
1. 変換された HTML で Ameblo に投稿する
    * 画像は GitHub や Flickr や Picasa に上げられているのを使うので Ameblo に画像をアップロードしない。
    * script タグなどはたいてい規制されているので使えない。YouTube などの埋め込み用スクリプトはホワイトリストに入っているっぽい。

## 確定分の記法規約

* UTF-8
* 改行は LF
* [オリジナルの Markdown](http://daringfireball.net/projects/markdown/) にあるが使わないもの
  * Inline HTML
  * Emphasis: GFM で無効化されていたりするので使わない。変換プログラムによっては URL 中のアンダーバーを勝手にイタリックにしたりするので気を付けよう。
  * Code blocks: 替わりに GFM の Fenced code blocks で。
  * Horizontal rules
  * Automatic links: 絶対URIに対してリンクを張るときでも明示的にリンクの記法を使う。変換プログラムによっては明示的なリンクしかリンクにしてくれないため。
* GFM にあるが使わないもの
  * Newlines: 段落中に改行は入れない。変換プログラムによっては改行を改行として扱ってしまうため。改行を入れたければスペース2つで。
  * Task lists
  * Strikethrough
  * Emoji
  * References (SHA, issue, username, ...)

他は[markdownlint](https://github.com/DavidAnson/markdownlint) に従う。markdownlint を実行するには `npm test` で。設定は `.markdownlint.json` にあり [Visual Studio Code](https://code.visualstudio.com/) の [markdownlint extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) でも用いられる。[Code Climate Markdownlint](https://docs.codeclimate.com/docs/markdownlint)は設定を読んでくれないようだ。

## カスタマイズ

custom ディレクトリを参照。
