/**
 * @author chenjw
 * mailTo: chenjw1985@gmail.com
 */

function ColumnItemView(obj,state,i,p,dir){
		
	//缩放动画
	var matrix95=Ti.UI.create2DMatrix(),
		matrix97=Ti.UI.create2DMatrix(),
		matrix100=Ti.UI.create2DMatrix();
		
  		matrix95 = matrix95.scale(0.95);
  		matrix97 = matrix97.scale(0.97);
  		matrix100 = matrix100.scale(1);
	
	var self=Ti.UI.createView({
		_type:'column',
		backgroundColor:'#f8661e',
		backgroundImage:obj.icon,
		width:200,
		height:200,
		transform:(state==1?matrix95:(state==2?matrix100:matrix97)),
		_index:i,
		left:app._layout[dir].grid[i][0]+p*Ti.Platform.displayCaps.platformWidth,
		top:app._layout[dir].grid[i][1],
		zIndex:0
	});
	
	var label=Ti.UI.createLabel({
		bottom:20,
		width:200,
		color:'#ffffff',
		font: { fontSize:24,fontWeight:'bold'},
		shadowColor: '#333333',
		shadowOffset: {x:1.5, y:1.5},
		text: i,//obj.name,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		touchEnabled:false,
		zIndex:2
	});
	self.add(label);
	
	var del=Ti.UI.createImageView({
		top:0,
		right:0,
		width:45,
		height:45,
		backgroundImage:'images/base/del.png',
		opacity:0,
		touchEnabled:false
	});
	self.add(del);
	
	del._getIndex=function(){
		return self._index;
	}
	
	var wv=Ti.UI.createWebView({
		url:'http://ww1.sinaimg.cn/bmiddle/62eb178ajw1dz89i06o0ej.jpg'
	});
	self.add(wv);
	
	//显示或隐藏删除按钮
	self._showDel=function(bool,animate){
		del.setTouchEnabled(bool);
		if(animate==true){
			del.animate({
				opacity:(bool==true)?1:0
			},function(){
				del.setOpacity(((bool==true)?1:0));
			});
		}else{
			del.updateLayout({opacity:((bool==true)?1:0)});
		}
	};
	
	//缩放动画
	self._transformState=function(state,animate){
		self.setZIndex(state);
		//0:默认状态，1：编辑状态，2：拖拽状态
		if(animate==true){
			self.animate({
				transform:(state==1?matrix95:(state==2?matrix100:matrix97)),
			},function(){
				self.updateLayout({transform:(state==1?matrix95:(state==2?matrix100:matrix97))});
			});
		}else{
			self.updateLayout({transform:(state==1?matrix95:(state==2?matrix100:matrix97))});
		}
		if(state==1){
			self._showDel(true,animate);
		}else{
			self._showDel(false,animate);
		}
	}
	
	self._setName=function(name){
		label.setText(name);
	}
	
	return self;
}
module.exports = ColumnItemView;