Jenkins さんでキャラクター投票 (Jenkins さんはあまり関係ない)
=============================================================

注意
----

キャラクターといっても [Jenkins Ninja](https://twitter.com/#!/masanobuimai/status/200244234886983680) とかではなく、単に Jenkins を cron の代用で使っているだけの内容なので、 Jenkins 関連の話題をお探しの方にとっては役に立たないと思われます。

3行まとめ
---------

* 人間に単純作業を繰り返させると鬱になります
* Jenkins さんはビルド以外にも使えます
* シナモロールに投票しましょう (ステマ)

毎日投票可能
------------

2012年5月10日から[2012サンリオキャラクター大賞](http://sanriocharacterranking.com/)が始まりました。

Web からの投票の場合、毎日投票できるようになっており、各日とも複数キャラクターに1票ずつ投票できるようになっています。しかしながらブラウザで投票をするという単純作業を毎日繰り返すと人間は鬱になります。ましてや投票するキャラクターがたくさんいる場合は手間もかかりますし投票漏れも起こりやすくなります。

なので人間様が手を下すのではなく執事の [Jenkins](http://jenkins-ci.org/) さんにやってもらいましょう。

Job 設定
--------

セッションIDは送らなくても投票できるっぽいので、面倒なセッションIDを送らずにフォームだけを送ればよいです。仮にセッションIDがあってもメールアドレスとかを毎回送る謎仕様のようですし。

というわけで bash スクリプトで wget を実行するだけの簡単なジョブを作ります。

![Bash script](https://github.com/ohtake/blog-ameba/raw/master/20120514/bash.png)

メールアドレス、年齢、性別、都道府県などは適宜設定してください。`application/x-www-form-urlencoded` で送るので、メールアドレスにプラス記号を含んでいる場合などはエスケープすることを忘れずに。

投票するキャラクターは `CHAR_IDS` 変数で渡すようになっているので、ビルドパラメータを設定します。複数ある場合はスペース区切りでIDを書いてください。

![String parameter](https://github.com/ohtake/blog-ameba/raw/master/20120514/param.png)

あとは毎日実行するようにスケジュールを設定します。投票期間は8月末までなので8月で終わるようにします。

![Schedule](https://github.com/ohtake/blog-ameba/raw/master/20120514/cron.png)

実行後の確認
------------

投票済み等のエラーがあった場合にはクエリパラメータに error=1 が含まれるアドレスにリダイレクトされるようなので、エラーがあったことが分かるように [Groovy Postbuild Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Groovy+Postbuild+Plugin) を使ってみましょう。日によって投票先を変えるかもしれないので、どこに投票したかも表示するようにするとよいでしょう。

![Groovy script](https://github.com/ohtake/blog-ameba/raw/master/20120514/groovy.png)

Jenkins さんによる投票の後に人間がブラウザで投票すると投票済みエラーとなるし、その逆もまたしかりなので、おそらく投票できているのでしょう。黄色と青で一目瞭然。

![Build history](https://github.com/ohtake/blog-ameba/raw/master/20120514/history.png)

念のため wget が取得した HTML ファイルもアーカイブ化しておきます。後々のトラブルシューティングで必要になるかもしれませんから。

![Archive the artifacts](https://github.com/ohtake/blog-ameba/raw/master/20120514/artifact.png)

ビルド設定ファイル
------------------

最終的な config.xml はこのようになりました。

```
<?xml version='1.0' encoding='UTF-8'?>
<project>
  <actions/>
  <description></description>
  <keepDependencies>false</keepDependencies>
  <properties>
    <hudson.model.ParametersDefinitionProperty>
      <parameterDefinitions>
        <hudson.model.StringParameterDefinition>
          <name>CHAR_IDS</name>
          <description>1:US, 77:CN, 95:JL</description>
          <defaultValue>77 95 1</defaultValue>
        </hudson.model.StringParameterDefinition>
      </parameterDefinitions>
    </hudson.model.ParametersDefinitionProperty>
  </properties>
  <scm class="hudson.scm.NullSCM"/>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <jdk>(Default)</jdk>
  <triggers class="vector">
    <hudson.triggers.TimerTrigger>
      <spec>H H(2-6) * 5-8 *</spec>
    </hudson.triggers.TimerTrigger>
  </triggers>
  <concurrentBuild>false</concurrentBuild>
  <builders>
    <hudson.tasks.Shell>
      <command># export https_proxy=http://PROXY:8080

rm -rf out
mkdir out

for CHAR_ID in $CHAR_IDS ; do
wget &quot;https://sanriocharacterranking.com/vote.php?character_id=${CHAR_ID}&quot; --post-data=&quot;mail=YOURNAME@YOURHOST&amp;age=29&amp;sex=2&amp;address=14&amp;country=&amp;eventmail=1&amp;character_id=${CHAR_ID}&amp;voteButton=submit&quot; -O out/${CHAR_ID}.html
done
</command>
    </hudson.tasks.Shell>
  </builders>
  <publishers>
    <hudson.tasks.ArtifactArchiver>
      <artifacts>out/*.*</artifacts>
      <latestOnly>false</latestOnly>
    </hudson.tasks.ArtifactArchiver>
    <org.jvnet.hudson.plugins.groovypostbuild.GroovyPostbuildRecorder>
      <groovyScript>if (manager.logContains(&quot;.*error=.*&quot;)) {
    manager.buildUnstable()
}
manager.addShortText(manager.build.getBuildVariables().get(&quot;CHAR_IDS&quot;))</groovyScript>
      <behavior>0</behavior>
    </org.jvnet.hudson.plugins.groovypostbuild.GroovyPostbuildRecorder>
  </publishers>
  <buildWrappers/>
</project>
```

Twitter 連携 (未実施)
---------------------

[#scr2012 で Twitter 検索](https://twitter.com/#!/search/%23scr2012)してみてください。誰がどのキャラクターに投票したのかがおそらく出てくるかと思います。人間によるブラウザでの投票であれば、投票後に [tweet button](https://twitter.com/about/resources/buttons#tweet) でだれに投票したかを呟けるように誘導されるため、このようなツイートが現れています。

毎日投票できるようにし毎日ツイートさせることで、露出を増やそうという意図があるのでしょうが、投票を自動化してしまったことによってその意図を反故することになってしまいます。意図に従う場合には [Twitter Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Twitter+Plugin) でビルド結果をツイートさせるようにするとよいでしょう。

自分の場合はタイムラインがうるさくなりそうなので実施していません。やりたい方はご自由にどうぞ。

複数メール (未実施)
-------------------

デザイナで1番偉いお姉さんが複数のデバイスを使うことで「[毎日5票投票](http://yamaguchiyuuko.cocolog-nifty.com/blog/2012/05/post-25d8.html)」を推奨していますし、2番目に偉いお姉さんも同様に「[持てるデバイスを駆使してシナモンファンの本気を見せてくれ](https://twitter.com/#!/myumyu47/status/200471814676295680)」とのことだそうです。

実際には複数デバイスを使う必要はなく単にメールアドレスで多重投票チェックをしているだけなので wget で送るメールアドレスを変えるだけでよいです。メールアドレスなんていくらでも作れるので、ビルドスクリプトで for 文を一つ追加する程度でできるでしょう。

デバイスやメールアドレスが複数あろうが一人一票が正しいことだと個人的には思っているので、自分は未実施です。「本気」を出したい方はご自由にどうぞ。執事さんが多数の奴隷を使って本気を出したら投票どころじゃなくなるので節度のある範囲でね。

まとめ
------

というわけで[シナモロールに投票](https://sanriocharacterranking.com/vote.php?character_id=77)しましょう。

