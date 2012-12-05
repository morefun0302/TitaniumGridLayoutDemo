/**
 * @author chenjw
 * mailTo: chenjw1985@gmail.com
 */

//设置背景颜色
Titanium.UI.setBackgroundColor('#000');

// 创建主window
var app=Ti.UI.createWindow({
	_index:0
});

// 设置设备可用方向
app.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

//tips显示
app._showTips=function(text,top){
	var t=Titanium.UI.createLabel({
			backgroundColor:'#000',
			opacity:0.8,
			height:50,
			color: '#FFF',
			font: { fontSize:26 },
			shadowColor: '#666',
			shadowOffset: {x:1, y:1},
			text: ' '+text,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			bottom:-100,
			//borderWidth:15,
			borderRadius:5,
			borderColor:'#000'
		});
	g_win.add(t);
	//动画显示
	t.animate({
		duration:300,
		bottom:!!top?top:(Ti.Platform.displayCaps.platformHeight-20)/2
	},function(){
		t.animate({
			delay:1500,
			duration:300,
			bottom:-100
		},function(){
			g_win.remove(t);
		});
	});
}

//获得设备方向
app._getDir=function(){
	return Ti.Platform.displayCaps.platformWidth==768?'vertical':'horizontal';
}
//排版布局
app._layout={
	//竖向
	"vertical":{
		grid:[
			[102,93],[302,93],[502,93],
			[102,293],[302,293],[502,293],
			[102,493],[302,493],[502,493],
			[102,693],[302,693],[502,693]
		],
		pt:93,
		pl:102
	},
	//横向
	"horizontal":{
		grid:[
  			[112,74],[312,74],[512,74],[712,74],
			[112,274],[312,274],[512,274],[712,274],
			[112,474],[312,474],[512,474],[712,474]
  		],
		pt:74,
		pl:112
	}
}

app.open();


//创建封面视图容器
var CoverView=require('ui/tablet/CoverView');
var coverView=new CoverView();
app.add(coverView);
