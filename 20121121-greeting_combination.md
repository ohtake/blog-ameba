# グリーティングキャラクターの組み合わせ

## モカとサフィー

2012年11月20日には[モカとサフィーがセットでグリーティングに出ていたらしい](https://twitter.com/bocyanmicstar/status/270907094067208193)。珍しい組み合わせだなあと思い、グリーティングの組み合わせを調べてみることにした。

スケジュールを収集してくるスクリプトは <https://github.com/ohtake/spl-greeting> を用い、期間は2012年6月28日から2012年11月21日までで、たまに取得忘れをしているので一部抜けがある。そうやって取得してった CSV に対して以下のスクリプトで集計をかけてみる。

```
# 調査対象のキャラクター名
$charaName = "サフィー"
# 全データ読み込み
ls *.csv | % {Import-Csv $_} |
# 6月30日、7月1日、9月1日はキャラクター大賞で特殊なため除外
? {@("20120630","20120701","20120901") -NotContains ([DateTime]$_.Start).ToString("yyyyMMdd")} |
# ハロウィンは名寄せ
% {$_.Name = $_.Name -replace "ハロウィン|・ホワイト|・スター",""; $_} |
# 開始日時と場所でグループ化
group Start,Location |
# キャラクターの組み合わせを調べたいので2以上
? {$_.Count -ge 2} |
# 4以上だとたいていの場合スぺグリなので除外しちゃう
? {$_.Count -lt 4} |
# 組み合わせの中に $charaName を含む
? {@($_.Group |% {$_.Name}) -contains $charaName} |
# $charaName 以外のキャラクターを抽出
% {$_.Group |? {$_.Name -ne $charaName}} |
# 出現回数で並び替え
group Name | sort Count -Descending
```

サフィーを起点にしてサフィーと一緒にグリーティングに出てきたキャラクターの回数を調べると以下のようになった。

```
Count Name
----- ----
    7 ガーネット
    6 ルビー
    4 おさるのもんきち
    1 ジャスパー
    1 ジョージ
    1 メアリー
    1 エスプレッソ
    1 モカ
```

やはりモカとサフィーの組み合わせは珍しいようだ。サフィーはジュエルペット以外だともんきちと仲が良いようで、その組み合わせは[2012年9月16日](https://picasaweb.google.com/103687453618299008868/20120916SPL?authuser=0&noredirect=1)に目撃もしてあった。もんきち、楽しそうにしてるなあ。

[![](https://lh5.googleusercontent.com/-Q7o-q_zGmOc/UFYZL2p3esI/AAAAAAAACn4/x7pvWXMtNMU/s480/5D3A8876%2520%25281280x853%2529.jpg)](https://picasaweb.google.com/lh/photo/ELdVK-buu7acrxkc0p7cHtMTjNZETYmyPJy0liipFm0?feat=embedwebsite)

一方でモカ起点だと以下のようになり、モカ自体がグリーティングにあまり出てこないこともあり珍しさが表出してこない。

```
Count Name
----- ----
    1 しろうさ＆くろうさ
    1 エンジェラ
    1 ももうさ＆はなうさ
    1 エスプレッソ
    1 サフィー
```

個別のキャラクターのグリ回数数え上げは以下のスクリプトで得られる。これでモカがいかに少ないかが分かるかと。

```
ls *.csv | % {Import-Csv $_} |
% {$_.Name = $_.Name -replace "ハロウィン|・ホワイト|・スター",""; $_} |
% {$_.Name} | group | sort Count -Descending
```

```
Count Name
----- ----
  225 ダニエル
  209 シナモン
  164 ウィッシュミーメル
  160 マイメロディ
  144 キティ
  113 ポムポムプリン
  105 マロンクリーム
  104 バットばつ丸
  103 ミミィ
   91 おさるのもんきち
   90 エスプレッソ
   89 エンジェラ
   85 イチゴマン
   79 うさはな
   78 クロミ
   75 本舗固歩香本
   72 リトルツインスターズ
   72 ラブラ
   72 はすのうえけろっぴ
   65 コロコロクリリン
   61 ポチャッコ
   61 ミルク
   61 ももうさ＆はなうさ
   46 しろうさ＆くろうさ
   45 サフィー
   44 メアリー
   43 ジャスパー
   40 チャロット
   37 ジョージ
   32 分部久花
   31 バッドばつ丸
   25 マーガレット
   25 ガーネット
   23 あひるのペックル
   22 チャーミー
   22 モカ
   22 ﾄﾆｰﾄﾆｰ.ﾁｮｯﾊﾟｰ
   20 ルビー
   18 アンソニー
   11 ハニーキュート
    7 カプチーノ
    5 ｼﾌｫﾝ
    5 アズキ
    3 たあ坊
    3 ノラネコランド
    2 アイルー
    2 いちごマン
    2 タキシードサム
    1 パティ＆ジミィ
    1 いちごの王様
```

キャラクターの表記に揺らぎがあるのは無視しましょう。ともかくこれだけキャラクター数が多く、尚且つ出現回数にばらつきがあるので、組み合わせにも頻繁なものと珍しいものが出てくるのもうなづける。

## シナモンと組み合わせが多いのはだれか

私が愛するシナモンはいったい誰と一緒にグリーティングしてくることが多いのだろうか。

まずは集計期間中の写真のストック内からシナモンと一緒にグリーティングをしているものを抜き出してみる。

[2012年9月10日](https://picasaweb.google.com/103687453618299008868/20120910SPL?authuser=0&noredirect=1)のけろっぴ

[![](https://lh3.googleusercontent.com/-lLdThdCBe4o/UE5pqofS-cI/AAAAAAAACdw/qUk78IEtaC8/s480/5D3A8673%2520%25281280x853%2529.jpg)](https://picasaweb.google.com/lh/photo/8-0bgv25E1BG4JfaMkvee9MTjNZETYmyPJy0liipFm0?feat=embedwebsite)

[2012年9月16日](https://picasaweb.google.com/103687453618299008868/20120916SPL?authuser=0&noredirect=1)のプリン

[![](https://lh3.googleusercontent.com/-HOwx5heVD4Q/UFYZJrHK_KI/AAAAAAAACn4/k2gvMK6Yhcw/s480/5D3A8826%2520%25281280x853%2529.jpg)](https://picasaweb.google.com/lh/photo/6xohVZAVW0WO2SspFDJJ0NMTjNZETYmyPJy0liipFm0?feat=embedwebsite)

[2012年10月2日](https://picasaweb.google.com/103687453618299008868/20121002SPL?authuser=0&noredirect=1)のミミィ

[![](https://lh5.googleusercontent.com/-MIeNSnQBmdM/UGw_aRNzs9I/AAAAAAAADVU/R1pIALlkJ8Q/s480/5D3B1010%2520%25281440x960%2529.jpg)](https://picasaweb.google.com/lh/photo/wQh0Q8r8y0GXqj68bhmBBdMTjNZETYmyPJy0liipFm0?feat=embedwebsite)

[2012年10月13日](https://picasaweb.google.com/103687453618299008868/20121013SPL?authuser=0&noredirect=1)のダニエル

[![](https://lh3.googleusercontent.com/-49w1MXuQgXI/UHoHwTJTy_I/AAAAAAAAD0U/Bp_0AYt9OXM/s480/5D3B1824%2520%25281440x960%2529.jpg)](https://picasaweb.google.com/lh/photo/ySsqlYV0eSjExLXrl-lL2dMTjNZETYmyPJy0liipFm0?feat=embedwebsite)

さて集計はどうなるかというと以下のようになった。

```
Count Name
----- ----
   19 ダニエル
   14 ミミィ
   11 ポムポムプリン
   10 はすのうえけろっぴ
    9 キティ
    6 マロンクリーム
    4 ウィッシュミーメル
    3 コロコロクリリン
    1 ミルク
    1 おさるのもんきち
    1 クロミ
    1 本舗固歩香本
    1 エンジェラ
    1 チャロット
```

見事に上位4位でそろってしまっている。自分はそんなに頻繁に通っているわけではないので、珍しい組み合わせに出会えてはいないようだ。精進しよう。

