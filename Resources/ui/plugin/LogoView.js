/**
 * @author chenjw
 * mailTo: chenjw1985@gmail.com
 */
function LogoView(){
	var self=Ti.UI.createImageView({
			image:'images/logo.png',
			width:33,
			height:120,
			left:0,
			top:app._layout[app._getDir()].pt
		});
		
	//检测点击事件
	self.addEventListener('singletap',function(e){
		//版权信息视图
		var modalwin = Titanium.UI.createWindow();
		modalwin.open({
		  modal:true,
		  modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
		  modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
		var webview=Titanium.UI.createWebView({
			url:'ui/plugin/about.html'
		});
		modalwin.add(webview);
		//关闭按钮
		var close = Titanium.UI.createButton({
			color:'#000',
	        title: '关闭',
	        font:{fontSize: 16},
	        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	    });
	    //关闭按钮事件
	    close.addEventListener('click',function(){
	    	modalwin.close();
	    });
	    //添加关闭按钮
	    modalwin.setRightNavButton(close);
	    
	});
	
	/**监测屏幕旋转**/
	Titanium.Gesture.addEventListener('orientationchange',function(e){
		self.updateLayout({
			top:app._layout[app._getDir()].pt
		});
	});
	
	return self;
}

module.exports = LogoView;