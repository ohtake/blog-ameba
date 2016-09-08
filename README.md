# blog-ameba

[![Code Climate](https://codeclimate.com/github/ohtake/blog-ameba/badges/gpa.svg)](https://codeclimate.com/github/ohtake/blog-ameba)
[![Dependency Status](https://www.versioneye.com/user/projects/57cebba39b4cc20044fffd40/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57cebba39b4cc20044fffd40)

[http://ameblo.jp/ohtaket/](http://ameblo.jp/ohtaket/) の原稿置場。

## 更新手順

1. 本文をMarkdownおよびその派生で書く。
   * 画像がある場合にはGitHubの絶対URIとなるようにする。心配ならば先に画像だけをコミットしてプッシュする。
     * 昔はMarkdownからの相対パスに対応していなかったからそのように決めたが、今はFlickrかPicasaから画像を読み込むことがほとんどなのでもう不要。
1. 書いたMarkdownを変換できるプログラムを使って変換する。
   * tableやcodeなどの独自文法に注意。
1. 変換されたHTMLでAmebloに投稿する。
   * 画像はGitHub、Flickr、Picasaに上げられているものを使うのでAmebloに画像をアップロードしない。
   * scriptタグなどはたいてい規制されているので使えない。YouTubeなどの埋め込み用スクリプトはホワイトリストに入っているようである。

## 記法規約

* UTF-8
* 改行はLF
* [オリジナルのMarkdown](http://daringfireball.net/projects/markdown/)にあるが使わないもの
  * Inline HTML
  * Emphasis
    * GFMで無効化されていたりするので使わない。変換プログラムによってはURL中のアンダースコアを勝手にイタリックにしたりするので気を付けよう。
  * Code blocks
    * 替わりにGFMのFenced code blocksで。
  * Horizontal rules
  * Automatic links
    * 絶対URIに対してリンクを張るときでも明示的にリンクの記法を使う。変換プログラムによっては明示的なリンクしかリンクにしてくれないため。
* [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)にあるが使わないもの
  * Newlines
    * 段落中に改行は入れない。変換プログラムによっては改行を改行として扱ってしまうため。改行を入れたければスペース2つで
  * Task lists
  * Strikethrough
  * Emoji
  * References (SHA, issue, username, ...)

他は [markdownlint](https://github.com/DavidAnson/markdownlint) に従う。設定は `.markdownlint.json` にあり[Visual Studio Code](https://code.visualstudio.com/)の[markdownlint extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)でも用いられる。[Code Climate Markdownlint](https://docs.codeclimate.com/docs/markdownlint)は設定を読んでくれないようだ。

ついでで[remark-lint](https://github.com/wooorm/remark-lint)にも従っておく。ただしmarkdownlintと相性が悪いルールは変更。

`npm test` により両方のlintを並行で実行する。

## カスタマイズ

`custom` ディレクトリを参照。
