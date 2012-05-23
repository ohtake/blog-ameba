blog-ameba
==========

[http://ameblo.jp/ohtaket/](http://ameblo.jp/ohtaket/) の原稿置場です。

更新手順
--------

1. 画像がある場合は画像を先にコミットしてプッシュ。
    * MarkdownPad も GitHub も画像の相対パスをうまく扱えないようなので絶対URIで参照する。
1. 本文を Markdown およびその派生で書く。
1. 書いた Markdown を変換できるプログラムを使って変換する。
    * table とか code とかの独自文法に注意。
    * 変換プログラム・サービスの例は以下。リストで上の方ほど高機能。
        * [Jenkins](https://jenkins-ci.org/) に [PegDown Formatter Plugin](https://wiki.jenkins-ci.org/display/JENKINS/PegDown+Formatter+Plugin) を導入してプレビュー
        * GitHub, GitHub Wiki, Gist
        * [MarkdownPad](http://markdownpad.com/)
        * [Markdown: Dingus](http://daringfireball.net/projects/markdown/dingus)
1. 変換された HTML で Ameblo に投稿する
    * 画像は GitHub に上げられているのを使うので Ameblo に画像をアップロードしない。
    * script タグなどはたいてい規制されているので使えない。YouTube などの埋め込み用スクリプトはホワイトリストに入っているっぽい。

確定分の記法規約
----------------

* 段落中に改行は入れない。変換プログラムによっては改行を改行として扱ってしまうため。
* 絶対URIに対してリンクを張るときでも明示的にリンクの記法を使う。変換プログラムによっては明示的なリンクしかリンクにしてくれないため。

カスタマイズ
------------

custom ディレクトリを参照。

