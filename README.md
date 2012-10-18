# jQuery.animationstep.js


## Description

CSS3 keyframes アニメーションの状態を、DOMのクラス名に反映させるプラグイン.

## Usage

CSS3アニメーションを適用している要素でプラグラインを実行する.

```html
<div class='container'></div>
```

```css
.container {
  -webkit-animation-name: name;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: 3;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: both;
}

@-webkit-keyframes name{
  0%  { background-color: #000000; }
  100%{ background-color: #FFFFFF; }
}
```

```JavaScript
$(function (){
	var options = {};
	$('div.container').animationstep(options);
});
```

アニメーション開始時と、終了時にクラス名が切り替わる.
追加されるクラス名は [animation-name]-start, [animation-name]-end となる.


## Options

複数の書き方をサポート

+ 1.単一のコールバック関数

```JavaScript
var options = callback;
```

+ 2.アニメーション名(animation-name)とコールバック関数のオブジェクト

```JavaScript
var options = {
	animation1: callback,
	animation2: callback
}
```

+ 3.アニメーション名とステータス、コールバック関数のオブジェクト

```JavaScript
var options = {
	animation1: {
		'start': callback,
		'iteration': callback,
		'end': callback
	}
	animation2: {
		'start': callback,
		'iteration': callback,
		'end': callback
	}
}
```

### コールバック関数の引数

```
function (name, state, iteration, event) { }
```

+ name (string)
	アニメーション名
+ state (string)
	start, iteration, end のどれか
+ iteration (Number)
	アニメーション毎の iteration 回数
+ event (jQuery.Event)
	イベントオブジェクト
