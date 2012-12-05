/**
 * @author chenjw
 * mailTo: chenjw1985@gmail.com
 */
function PagePoint(size,index){
	var i=0,l=size;
	var self=Ti.UI.createView({
		width:l*20,
		height:20,
		bottom:20,
		left:(Ti.Platform.displayCaps.platformWidth-l*20)/2,
		backgroundImage:'images/base/point-grey.png',
		backgroundRepeat:true
	});
	
	var point=Ti.UI.createImageView({
		image:'images/base/point-blue.png',
		width:20,
		height:20,
		left:0
	});
	
	//添加一页
	self._reset=function(size,index){
		self.updateLayout({
			width:size*20,
			left:(Ti.Platform.displayCaps.platformWidth-size*20)/2
		});
		self._go(index);
	}
	
	//删除一页
	self._go=function(index){
		point.animate({
			left:index*20
		},function(){
			point.setLeft(index*20);
		});
	}
	
	//添加point
	self.add(point);
	
	/**监测屏幕旋转**/
	Titanium.Gesture.addEventListener('orientationchange',function(e){
		self.updateLayout({
			left:(Ti.Platform.displayCaps.platformWidth-self.getWidth())/2
		});
	});
	
	return self;
}
module.exports = PagePoint;