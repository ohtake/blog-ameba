# 翌営業日のグリーティング予報は信用できるか

ピューロランドは2015年1月17日から翌営業日のグリーティングスケジュールが公開されるようになった。時間と場所は分からないが、どのキャラクターが遊びに来るのかが分かるようになったため、計画を立てやすくなった。

ただあくまでも予定は予定であるため、変更になることはあると注意書きもあるし、実際に変更も起こりうることだろう。実際のデータを使って予報の信頼性を確かめてみる。

結論としては、失礼な言い方だが多摩にしては予想以上に信頼性が高い。折角翌営業日の予報を出してくれているので、うまく活用してピューロランドを楽しみましょう。

## 比較結果

予報のある2015年1月18日から1月31日までの14日間のデータで予報と実際のグリーティングスケジュールを後述のスクリプトで比較してみたところ、差分があったのは以下の3件のみであった。読み方としては1月20日のさっちゃん、および1月24日のパパとママが予報には出ていなかったが当日のスケジュールには載っていたということになる。予報に出ていたのに当日のスケジュールに載っていないという事例はなかった。

```txt
@{Name=風の子さっちゃん; Date=01/20/2015 00:00:00}           <=
@{Name=メアリー・ホワイト（ママ）; Date=01/24/2015 00:00:00} <=
@{Name=ジョージ・ホワイト（パパ）; Date=01/24/2015 00:00:00} <=
```

14日間でたったの3件しか差分がないというのはとても少ない数値である。2015年1月の1か月間では当日のグリーティングスケジュールは把握しているだけで57件の追加と48件の削除があった。ただし変更は追加と削除の両方に算入してある。"４Ｆフォトエリア（４Ｆ）" から "マリーランドフォトエリア（４Ｆ）" への場所名変更も含んでいるため多めに出ているとはいえ、それなりに多い。

```bash
$ git diff @^^..@^  --numstat  201501.csv
57      48      201501.csv
```

翌営業日の予報は変更が入ることも少なく <https://twitter.com/ohtaket/status/561169029583208449> で一度だけ変更を観測したのみであった。具体的には30日の朝の時点で31日に出る予定となっていたももうさとはなうさが30日の夜には削除されており、当日のスケジュールにもももうさとはなうさはいなかった。

## 比較スクリプト

<https://github.com/ohtake/spl-greeting/tree/csv> のデータに対して以下のスクリプトを実行することで先の比較結果を出した。

```ps1
[Reflection.Assembly]::LoadWithPartialName("Microsoft.VisualBasic") | Out-Null
function to-zenkaku($str) {
    [Microsoft.VisualBasic.Strings]::StrConv($str, [Microsoft.VisualBasic.VbStrConv]::Wide)
}

$foretold = Import-Csv "201501_next.csv"
$foretold |% {
    $_.Name = to-zenkaku($_.Name)
    $_.Date = [DateTime]$_.Date
}
$foretold_start = ($foretold | measure -Minimum Date).Minimum

$actual = Import-Csv "201501.csv"
$actual |% { $_ | Add-Member -MemberType NoteProperty "Date" ([DateTime]$_.Start).Date }
$actual = $actual |? {$_.Date -ge $foretold_start } | select Name,Date -Unique

diff ($actual |% {[string]$_}) ($foretold |% {[string]$_}) | ft -AutoSize
```

データは GitHub に置いてあるので、何か解析するネタを思いついて面白い結果が出たら教えてくださいな。解析例としては、2年ちょい前にキャラクターの組み合わせを検討してみたのが <http://ameblo.jp/ohtaket/entry-11410041576.html> にある。
