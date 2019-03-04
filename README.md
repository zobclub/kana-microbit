# kana-microbit
KANA Display for micro:bit

Japanese Hiragana & Katakana
ひらがなとカタカナを micro:bitの 5x5 LED に表示します。

日本語モードのとき、各ブロックは日本語表記になります。

## Method
---
* Show KANA

Display KANA string
カナ文字列を表示します。表示文字列は、全角(アルファベット／数字を含む)でセットします。
２文字以上の場合は、横スクロール(Horizontal)、縦スクロール(Vertical)、切り替え(None)
の表示を行います。デフォルトは横スクロール
```
kana.showKana("いろは")
```

表示できる文字は、以下のように記号、数字、アルファベット、カタカナ、ひらがなです。
アルファベット小文字は表示できません。

 "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠
ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀";
ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッ
ツヅテデトドナニヌネノハバパヒビピフブプヘベペホポボマミムメモャヤュユ
ョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺーヽヾ";
ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっ
つづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぽぼまみむめもゃやゅゆ
ょよらりるれろゎわゐゑをんゔゕゖ゛゜ゝゞ";

濁点（゛）半濁点(゜)がある文字は、5x5のLEDでは十分な表示ができません。横スクロールの場合は、
1文字として濁点／半濁点を設定することもできます。

* Set bright

Set LED bright
LEDの明るさを指定します。0～255の範囲の値で、デフォルトは 128です。
```
kana.setBright(128)
```

* Set scroll time/direction

Set scroll time and scroll direction
１ラインスクールする時間をミリ秒で指定します。デフォルトは200mSです。切り替え表示の場合は、スクールの3倍の時間で変化します。
横スクロール(Horizontal)、縦スクロール(Vertical)、切り替え(None)のいずれかの表示を選択します。
```
kana.setScroll(200, DirEnum.Horizontal)
```

## Example
---
```
kana.setScroll(200, DirEnum.Horizontal)
kana.setBright(128)
kana.showKana("いろは")
```
## Font
---
ひらがな、カタカナのデータは、雷更新世さん作成の5x5フォントKanaFive(カナファイブ)を元に作成しています。

## License
MIT

## Supported targets

* for PXT/microbit

