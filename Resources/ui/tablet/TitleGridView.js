/**
 * @author chenjw
 */
function TitleGridView(){
	var self=Ti.UI.createView({
		backgroundColor:'#f5f5f5',
		width:Ti.Platform.displayCaps.platformWidth,
		height:Ti.Platform.displayCaps.platformHeight-20
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
module.exports = TitleGridView;