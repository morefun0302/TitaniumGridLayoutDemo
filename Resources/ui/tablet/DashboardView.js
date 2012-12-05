/**
 * @author chenjw
 * mailTo: chenjw1985@gmail.com
 */

function DashboardView(){
	var grids=[],tpx=tpy=fixx=fixy=0,_cacheindex,targetIndex;
	//栏目数组
  	var items=[
  			[
		  		{"name":"我的收藏","note":"","type":"system","action":"myfav","icon":"images/default/fav.png"},
		  		{"name":"新浪微博","note":"","type":"system","action":"sinaweibo","icon":"images/default/sinaweibo.png"},
		  		{"name":"腾讯微博","note":"","type":"system","action":"qqweibo","icon":"images/default/qqweibo.png"},
		  		{"name":"全文检索","note":"","type":"system","action":"search","icon":"images/default/search.png"},
		  		{"name":"","note":"添加栏目","type":"system","action":"addcolum","icon":"images/default/add.png"},
		  		{"name":"测试栏目","note":"","type":"system","action":"article","icon":"images/logo.png"}
	  		],
	  		[
		  		{"name":"栏目六"},
		  		{"name":"栏目七"},
		  		{"name":"栏目八"},
		  		{"name":"栏目九"},
		  		{"name":"栏目十"},
		  		{"name":"栏目十一"},
		  		{"name":"栏目十二"}
	  		],
	  		[
		  		{"name":"栏目十三"},
		  		{"name":"栏目十四"},
		  		{"name":"栏目十五"},
		  		{"name":"栏目十六"},
		  		{"name":"栏目十七"},
		  		{"name":"栏目十八"},
		  		{"name":"栏目十九"}
	  		]
  	];
	
	//封面、导航、栏目视图
	var self=Ti.UI.createView({
		backgroundColor:'#f5f5f5',
		width:Ti.Platform.displayCaps.platformWidth,
		height:Ti.Platform.displayCaps.platformHeight-20,
		_index:0,
		_state:0	//0:正常、1：编辑、2：拖拽
	});
	
	//DashboardView实体容器
	var container=Ti.UI.createView({
		_type:'dashboardview',
		backgroundColor:'#f5f5f5',
		left:0,
		top:0,
		width:Ti.Platform.displayCaps.platformWidth*items.length,
		height:Ti.Platform.displayCaps.platformHeight-20
	});
	self.add(container);
	
	//标志logo
	var LogoView=require('ui/plugin/LogoView');
	var logoView=new LogoView();
	self.add(logoView);
	
  	//栏目类
  	var ColumnItemView=require('ui/tablet/ColumnItemView');
  	
  	//分页标识
	var PagePoint=require('ui/plugin/PagePoint');
	var pagepoint=new PagePoint(items.length,0);
	self.add(pagepoint);
	
	//执行初始化
	initLayout();
	
	/**
	 * 监听点击的事件 
	 */
	container.addEventListener('singletap',function(e){
		if(e.source._type=='dashboardview'){
			self._state=0;
			//退出编辑状态
			transformItems(0,-1);
			//移除空白页面
			resetContainer();
		}else if(e.source._type=='delcolumn'){
			Ti.API.info(e.source._getIndex());
		}
	});
	/**
	 * 监听长按事件 
	 */
	container.addEventListener('longpress',function(e){
		//在栏目上长按进入编辑状态
		if(e.source._type=='column'){
			self._state=2;
			var l=grids[self._index].length;
			if(self._index==l-1&&grids[self._index].length>1){
				console.log('resetContainer');
				resetContainer(true);
			}
			
			e.source._transformState(2,true);
			//进入编辑状态
			transformItems(1,e.source._index);
			/**
			 * 拖拽事件开始
			 */
			tpx=e.x;
			tpy=e.y;
			fixx=e.source.left;
			fixy=e.source.top;
			//从数组中移除
			grids[self._index].splice(e.source._index,1);
			
			e.source.addEventListener('touchmove',touchmoveFn);
			e.source.addEventListener('touchend',touchendFn);
		}
	});
	
	function touchendFn(e){
		tpx=tpy=fixx=fixy=0;
		var dir=app._getDir();
		if(self._state==2&&e.source._type=='column'){
			grids[self._index].splice(e.source._index,0,e.source);
			e.source.animate({
				top:app._layout[dir].grid[e.source._index][1],
				left:app._layout[dir].grid[e.source._index][0]+self._index*Ti.Platform.displayCaps.platformWidth,
				duration : 200
			},function(){
				e.source.updateLayout({
					top:app._layout[dir].grid[e.source._index][1],
					left:app._layout[dir].grid[e.source._index][0]+self._index*Ti.Platform.displayCaps.platformWidth
				});
			});
			//退出编辑状态
			self._state=1;
			e.source._transformState(1,true);
			e.source.removeEventListener('touchmove',touchmoveFn);
			e.source.removeEventListener('touchend',touchendFn);
			//重设
			resetLayout();
		}
	}
	function touchmoveFn(e){
		//计算位置
		fixx=fixx + e.x - tpx;
	    fixy=fixy + e.y - tpy;
	    
	    e.source.animate({left:fixx,top:fixy, duration:1});
	    //保存index
		_cacheindex=e.source._index;
		
		
	    //判断目标位置
	    var dir=app._getDir(),targetIndex,cwidth=(dir=='vertical')?600:800,cheight=(dir=='vertical')?800:600;
	    var _x=fixx+tpx-self._index*Ti.Platform.displayCaps.platformWidth,
	    	_y=fixy+tpy;
	    if(_x<app._layout[dir].pl&&_y<app._layout[dir].pt){
	    	targetIndex=0;
	    }else if(_x>app._layout[dir].pl+cwidth&&_y>app._layout[dir].pt+cheight){
	    	targetIndex=grids[self._index].length;
	    }else{
	    	targetIndex=Math.floor((_x-app._layout[dir].pl)/200)+Math.floor((_y-app._layout[dir].pt)/200)*(dir=='vertical'?3:4);
	    }
	    targetIndex=targetIndex<0?0:(targetIndex>grids[self._index].length?grids[self._index].length:targetIndex);
	   	e.source._setName(targetIndex);
	   	e.source._index=targetIndex;
	   	//开始交换位置
	   	if(targetIndex!=_cacheindex){
			if(targetIndex>_cacheindex){			//向后交换
				for(var i=_cacheindex;i<targetIndex;i++){
					grids[self._index][i]._index=i;
					grids[self._index][i]._setName(i);
					grids[self._index][i].animate({
						left:app._layout[dir].grid[i][0]+(self._index*Ti.Platform.displayCaps.platformWidth),
						top:app._layout[dir].grid[i][1],
						duration:500
					});
				}
				
			}else if(targetIndex<_cacheindex){	//向前交换
				for(var i=_cacheindex-1;i>=targetIndex;i--){
					grids[self._index][i]._index=i+1;
					grids[self._index][i]._setName(i+1);
					grids[self._index][i].animate({
						left:app._layout[dir].grid[i+1][0]+(self._index*Ti.Platform.displayCaps.platformWidth),
						top:app._layout[dir].grid[i+1][1],
						duration:500
					});
				}
			}
		}
	}
	

	//监听手势翻页
	self.addEventListener('swipe',function(e){
		if(self._state==2){
			return false;
		}
		if(e.direction==='left'){
			var l=grids.length-1;
			//向后一页
			self._index=self._index>=l?l:self._index+1;
			pagepoint._go(self._index);
			container.animate({
				duration:300,
				left:-1*self._index*Ti.Platform.displayCaps.platformWidth
			},function(){
				container.updateLayout({left:-1*self._index*Ti.Platform.displayCaps.platformWidth});
			});
		}else if(e.direction==='right'){
			//向前一页
			self._index=self._index<=0?0:self._index-1;
			pagepoint._go(self._index);
			container.animate({
				duration:300,
				left:-1*self._index*(Ti.Platform.displayCaps.platformWidth)
			},function(){
				container.updateLayout({left:-1*self._index*Ti.Platform.displayCaps.platformWidth});
			});
		}
	});
	
	/**监测屏幕旋转**/
	Titanium.Gesture.addEventListener('orientationchange',function(e){
		container.updateLayout({
			left:-1*self._index*Ti.Platform.displayCaps.platformWidth,
			top:0,
			width:Ti.Platform.displayCaps.platformWidth*grids.length,
			height:Ti.Platform.displayCaps.platformHeight-20
		});
		resetLayout();
	});
	
  	//初始化栏目位置
	function initLayout(){
		var citem=null;
		//获得设备方向
		var i=0,l=items.length,dir=app._getDir();
		for(i;i<l;i++){
			if(!grids[i]){
				grids[i]=[];
			};
			for(var ii=0,ll=items[i].length;ii<ll;ii++){
				citem=new ColumnItemView(items[i][ii],0,ii,i,dir);
				grids[i].push(citem);
				container.add(citem);
			}
		}
		citem=null;
	}
	
	//重置栏目位置
	function resetLayout(){
		//获得设备方向
		var i=0,l=grids.length,dir=app._getDir();
		for(i;i<l;i++){
			for(var ii=0,ll=grids[i].length;ii<ll;ii++){
				grids[i][ii].updateLayout({
					left:app._layout[dir].grid[ii][0]+i*Ti.Platform.displayCaps.platformWidth,
					top:app._layout[dir].grid[ii][1]
				});
				grids[i][ii]._index=ii;
			}
		}
	}
	
	//缩放效果
	function transformItems(state,index){
		var i=0,l=grids.length;
		for(i;i<l;i++){
			for(var ii=0,ll=grids[i].length;ii<ll;ii++){
				if(i==self._index){
					if(grids[i][ii]._index!==index) grids[i][ii]._transformState(state,true);
				}else{
					grids[i][ii]._transformState(state,false);
				}
			}
		}
		i=l=null;
	}
	
	//添加或删除页面
	function resetContainer(bool){
		if(bool==true){
			grids.push([]);
		}else{
			//delpage被移除的页面，
			var delpage=[];
			for(var i=0,l=grids.length;i<l;i++){
				
				if(grids[i].length<=0){
					delpage.push(i);
				}
			}
			for(var i=0,l=delpage.length;i<l;i++){
				grids.splice(delpage[i]-i,1);
			}
		}
		self._index=self._index>grids.length-1?grids.length-1:self._index;
		
		container.animate({
			left:-1*self._index*Ti.Platform.displayCaps.platformWidth
		},function(){
			container.updateLayout({
				left:-1*self._index*Ti.Platform.displayCaps.platformWidth,
				top:0,
				width:Ti.Platform.displayCaps.platformWidth*grids.length,
				height:Ti.Platform.displayCaps.platformHeight-20
			});
		});
		
		pagepoint._reset(grids.length,self._index);
		//重置栏目坐标
		resetLayout();
	}
	
	return self;
}
module.exports = DashboardView;

