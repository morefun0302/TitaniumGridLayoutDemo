/**
 * @author chenjw
 */
function CoverImg(){
	var self=Ti.UI.createView({
		width:Ti.Platform.displayCaps.platformWidth,
		height:Ti.Platform.displayCaps.platformHeight-20
	});
	
	var logoView=Ti.UI.createImageView({
		width:293,
		height:180,
		image:'images/base/logo.png',
		zIndex:2,
		top:70
	});
	//图片
	var imgView=Ti.UI.createImageView({
		width:1024,
		height:1024,
		image:'images/base/bg.jpg',
		zIndex:1
	});
	//下载按钮
	var downView=Ti.UI.createButton({
		width:23,
		height:34,
		backgroundImage:'images/base/cover_down.png',
		zIndex:2,
		left:40,
		bottom:40
	});
	//翻页按钮
	var upView=Ti.UI.createButton({
		width:97,
		height:98,
		backgroundImage:'images/base/cover_up.png',
		zIndex:2,
		right:40,
		bottom:40
	});
	
	self.add(imgView);
	self.add(logoView);
	self.add(downView);
	self.add(upView);
	
	
	//事件
	downView.addEventListener('click',function(e){
		var a = Titanium.UI.createAlertDialog({
			title:'提示',
			message:'是否保存封面图片？',
			buttonNames:['否','是'],
			cancel:0
		});
		//console.log(Titanium.Filesystem.applicationDirectory);
		a.show();
		a.addEventListener('click',function(e){
			if(e.index==1){
				var f=imgView.toBlob();
				Titanium.Media.saveToPhotoGallery(f,{
					success: function(e) {
						g_win._showTips('已经保存到相册！');				
					},
					error: function(e) {
						g_win._showTips('保存到相册失败！');
					}
				});
				f=null;
				delete f;
			}
		});
	});
	
	//更新界面
	upView.addEventListener('click',function(e){
		this.fireEvent('moveCoverPage',{_index:1});
	});
	
	/**监测屏幕旋转
	Titanium.Gesture.addEventListener('orientationchange',function(e){
		self.updateLayout({
			width:Ti.Platform.displayCaps.platformWidth,
			height:Ti.Platform.displayCaps.platformHeight-20
		});
	});
	**/
	return self;
}
module.exports = CoverImg;