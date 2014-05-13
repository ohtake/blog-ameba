title アメブロ バックアップ %~n0

pushd %~dp0

echo %~p0
echo %~n0

::set ame_page_limit=10

ame-0.0.14.exe %~n0

pause

