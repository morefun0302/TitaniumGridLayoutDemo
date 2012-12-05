/**
 * @author chenjw
 * mailTo: chenjw1985@gmail.com
 */

function CoverView(){
	var self=Ti.UI.createView({
		width:Ti.Platform.displayCaps.platformWidth,
		height:(Ti.Platform.displayCaps.platformHeight-20)*3,
		top:0,
		layout:'vertical',
		_index:0
	});
	
	//封面视图
	var CoverImg=require('ui/tablet/CoverImg');
	var coverImg=new CoverImg();
	self.add(coverImg);
	
	//栏目视图
	var DashboardView=require('ui/tablet/DashboardView');
	var dashboardView=new DashboardView();
	self.add(dashboardView);
	
	//文章视图
	var TitleGridView=require('ui/tablet/TitleGridView');
	var titlegridView=new TitleGridView();
	self.add(titlegridView);
	
	//监测屏幕旋转
	Titanium.Gesture.addEventListener('orientationchange',function(e){
		self.updateLayout({
			width:Ti.Platform.displayCaps.platformWidth,
			height:(Ti.Platform.displayCaps.platformHeight-20)*3,
			top:-1*self._index*(Ti.Platform.displayCaps.platformHeight-20)
		});
		coverImg.updateLayout({
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.Platform.displayCaps.platformHeight-20
		});
		dashboardView.updateLayout({
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.Platform.displayCaps.platformHeight-20
		});
		titlegridView.updateLayout({
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.Platform.displayCaps.platformHeight-20
		});
	});
	
	//封面视图翻页按钮事件监听
	self.addEventListener('moveCoverPage',function(e){
		self._index=e._index;
		self.animate({
			duration:300,
			top:-1*self._index*(Ti.Platform.displayCaps.platformHeight-20)
		},function(){
			self.setTop(-1*self._index*(Ti.Platform.displayCaps.platformHeight-20));
		});
	});
	
	self.addEventListener('swipe',function(e){
		if(e.direction==='up'){
			self._index=self._index>=1?1:self._index+1;
			self.animate({
				duration:300,
				top:-1*self._index*(Ti.Platform.displayCaps.platformHeight-20)
			},function(){
				self.setTop(-1*self._index*(Ti.Platform.displayCaps.platformHeight-20));
			});
		}else if(e.direction==='down'){
			self._index=self._index<=0?0:self._index-1;
			self.animate({
				duration:300,
				top:-1*self._index*(Ti.Platform.displayCaps.platformHeight-20)
			},function(){
				self.setTop(-1*self._index*(Ti.Platform.displayCaps.platformHeight-20));
			});
		}
	});
	

	return self;
}
module.exports = CoverView;