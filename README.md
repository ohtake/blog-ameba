# blog-ameba

[![Code Climate](https://codeclimate.com/github/ohtake/blog-ameba/badges/gpa.svg)](https://codeclimate.com/github/ohtake/blog-ameba)

[http://ameblo.jp/ohtaket/](http://ameblo.jp/ohtaket/) の原稿置場です。

## 更新手順

1. 本文を Markdown およびその派生で書く。
    * 画像がある場合には GitHub の絶対 URI になるようにする。心配ならば先に画像だけをコミットしてプッシュする。
        * 昔は Markdown からの相対パスに対応していなかったからそのように決めたが、今は Flickr か Picasa から画像を読み込むことがほとんどなのでもう不要かも。
1. 書いた Markdown を変換できるプログラムを使って変換する。
    * table とか code とかの独自文法に注意。
    * 変換プログラム・サービスの例は以下。リストで上の方ほど高機能。
        * [Haroopad](http://pad.haroopress.com/)
        * [Jenkins](https://jenkins-ci.org/) に [PegDown Formatter Plugin](https://wiki.jenkins-ci.org/display/JENKINS/PegDown+Formatter+Plugin) を導入してプレビュー
        * GitHub, GitHub Wiki, Gist
        * [MarkdownPad](http://markdownpad.com/)
        * [Markdown: Dingus](http://daringfireball.net/projects/markdown/dingus)
1. 変換された HTML で Ameblo に投稿する
    * 画像は GitHub や Flickr や Picasa に上げられているのを使うので Ameblo に画像をアップロードしない。
    * script タグなどはたいてい規制されているので使えない。YouTube などの埋め込み用スクリプトはホワイトリストに入っているっぽい。

## 確定分の記法規約

[GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) (GFM) のサブセットとする。

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

TODO CommonMark

## テキストファイルの形式

* UTF-8
* BOM は未定義
* 改行は LF

## カスタマイズ

custom ディレクトリを参照。

