/******************************************************************/
/* Splitter - http://verens.com/2007/07/08/splitter-for-mootools/ */
/******************************************************************/

var Splitter = new Class({
	initialize: function(parent,parameters) {
		if (!parameters) parameters = {};
		if (parent) {
			$(parent).setStyles({'margin': 0,	'padding': 0});
			var w = parent.offsetWidth, h = parent.offsetHeight;
			if (parent === document.body || !parent.tagName) {
				w = $pick(window.innerWidth,document.body.clientWidth); //TEST!!!
				h = $pick(window.innerHeight,document.body.clientHeight);
				//document.body.setStyle('overflow','hidden');
			}
		  h = h - (parseInt(parent.getStyle('border-top-width')) - parseInt(parent.getStyle('border-bottom-width')));
      //h = h - (parseInt(parent.getStyle('border-top-height')) - parseInt(parent.getStyle('border-bottom-height')));			
		  w = w - (parseInt(parent.getStyle('border-left-width')) - parseInt(parent.getStyle('border-right-width')));

    	//h = h - parseInt(parent.getStyle('border-top-height')) - parseInt(parent.getStyle('border-bottom-height'));
    	//w = w - parseInt(parent.getStyle('border-left-width')) - parseInt(parent.getStyle('border-right-width'));
		} else {
			var w = 0, h = 0;
		}
		var wrapper = new Element('div',{
			styles: {'position':'relative',	'width':w, 'height':h} //, 'overflow':'hidden'}
		});
		$extend(wrapper,{addWidget:Splitter__addWidget,	parentResized:Splitter__parentResized, setSizes:Splitter__setSizes,	getSizes:Splitter__getSizes});
		wrapper.handleWidth = parameters['handleWidth']?parameters['handleWidth']:1;
		wrapper.handleColor = parameters['handleColor']?parameters['handleColor']:'lightgray';
		wrapper.handleBorder = parameters['handleBorder']?parameters['handleBorder']:'none';
		wrapper.orientation = parameters['orientation']?parameters['orientation']:0; // 0 is horizontal. otherwise, vertical
		wrapper.minimumSize = parameters['minimumSize']?parameters['minimumSize']:26; //40;
		wrapper.maximumSize = parameters['maximumSize']?parameters['maximumSize']:h; //800;
		wrapper.opaqueResize = parameters['opaqueResize']?parameters['opaqueResize']:0;
		wrapper.widgets=[];
		wrapper.handles=[];
		wrapper.addClass('splitter');
		if (parent) parent.appendChild(wrapper);
		window.addEvent('resize',function() {
		  var children = $(parent).getElements('div');      
			//var children = $$('div'); //,$(parent)); //$ES('*');
			//var children = $ES('*'); //,$(parent)); //$ES('*');
			//var children = $ES('*',$(parent)); //,$(parent)); //$ES('*');
			//var children = $$('*'); //,$(parent)); //$ES('*');
			//var children = $$('*',this); //$ES('*');
			//var children = $$('div>div',this); //$ES('*');
			children.each(function(child) {
				if (child.parentResized) child.parentResized();
				//if (child.parentResized()) child.parentResized();
				//child.parentResized();
			});
		});
		return wrapper;
	}
});

function Splitter__addWidget(widget,parameters) {
	if (!parameters) parameters = {};
	var numWidgets = this.widgets.length;

	var orientation = this.orientation;
	var handleWidth = parameters['handleWidth']?parameters['handleWidth']:1;
	var handleColor = parameters['handleColor']?parameters['handleColor']:'lightgray';
	var handleBorder = parameters['handleBorder']?parameters['handleBorder']:'none';
  var handleClass = orientation?'hsplitbar':'vsplitbar';
	//var handleMargin = orientation?'1px 0px 1px 0px':'0px 1px 0px 1px';
	//var minimumSize = parameters['minimumSize']?parameters['minimumSize']:40;
	//var maximumSize = parameters['maximumSize']?parameters['maximumSize']:200;
	//var opaqueResize = parameters['opaqueResize']?parameters['opaqueResize']:0;
	
	var handle = new Element('div',{
	  'class': handleClass,
		//'styles': {'background':'#aaa',	'border':'solid #999', 'position':'absolute',	'font-size':'0'}
		//'styles': {'background-color':'red', 'border':'solid white', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'background-color':'lightgray', 'border':'3px null transparent', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'background-color':'lightgray', 'border':'1px', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'border':'1px solid lightgray', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'background-color':'lightgray', 'border':'none', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'background-color':handleColor, 'border':'none', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'background-color':'red', 'border':'none', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		//'styles': {'background':'red', 'border':'solid red', 'position':'absolute', 'font-size':'0', 'overflow':'hidden'}
		'styles': {'background':handleColor,'border':handleBorder,'position':'absolute','font-size':'0','overflow':'hidden'} //,'margin':handleMargin}
	});
	//handle.setStyles(orientation?{'border-width':'10px 0','cursor':'n-resize','height':this.handleWidth - 2,'width':this.offsetWidth}
	//													  :{'border-width':'0 10px','cursor':'e-resize','width':this.handleWidth - 2,'height':this.offsetHeight});
	//handle.setStyles(orientation?{'border-width':'1px 0','cursor':'ns-resize','height':1,'width':this.offsetWidth}
	//														:{'border-width':'0 1px','cursor':'ew-resize','width':1,'height':this.offsetHeight});
	handle.setStyles(orientation?{'border-width':handleWidth+'px 0','cursor':'ns-resize','height':handleWidth+'px','width':this.offsetWidth}
															:{'border-width':'0 '+handleWidth+'px','cursor':'ew-resize','width':handleWidth+'px','height':this.offsetHeight});  
	handle.num = numWidgets;
	handle.addEvent('mousedown', function() {
		var parent = this.parentNode;
		var orientation = parent.orientation;
		var pseudoHandle = new Element('div',{
			//'styles': {'position':'absolute', 'left':this.offsetLeft, 'top':this.offsetTop, 'border':'1px dashed #000', 'font-size':'0'}
			//'styles': {'position':'absolute', 'left':this.offsetLeft, 'top':this.offsetTop, 'border':'5px solid red', 'font-size':'0'}
			'styles': {'position':'absolute', 'left':this.offsetLeft, 'top':this.offsetTop, 'border':'1px dashed black', 'font-size':'0'}
		});
		parent.appendChild(pseudoHandle);
		pseudoHandle.setStyles(orientation?{'height':parent.handleWidth - 2,'width':this.offsetWidth - 2}
																			:{'width':parent.handleWidth - 2,'height':this.offsetHeight - 2});
		//pseudoHandle.setStyles({'overflow':'hidden'});
		var xoffset = parent.getPosition().x;
		var yoffset = parent.getPosition().y;
		var min = 0;
		if (orientation) {
			var x = this.offsetTop;
			var max = parent.offsetHeight - parent.handleWidth;
		}	else {
			var x = this.offsetLeft;
			var max = parent.offsetWidth - parent.handleWidth;
		}
		if (this.num > 1) min = (orientation?parent.handles[this.num - 1].offsetTop:parent.handles[this.num - 1].offsetLeft) + parent.handleWidth;
		if (this.num < parent.handles.length - 1) max = (orientation?parent.handles[this.num + 1].offsetTop:parent.handles[this.num + 1].offsetLeft) - parent.handleWidth;
		var mousemove = function(e) {
			var e = new Event(e),p = {x:0,y:0};
			if (window.ie) try { document.selection.empty(); } catch(err) {};
			x = orientation?e.page.y - yoffset - p.y:e.page.x - xoffset - p.x;
			if (x < min) x = min;
			if (x > max) x = max;
			var dir = orientation?'top':'left';
			pseudoHandle.setStyle(dir,x);
		};
		var mouseup = function(e) {

			var e = new Event(e),p = {x:0,y:0};
			if (window.ie) try { document.selection.empty(); } catch(err) {};
			x = orientation?e.page.y - yoffset - p.y:e.page.x - xoffset - p.x;

			var diff = x - (orientation?handle.offsetTop:handle.offsetLeft);
			/*if (diff) {
			  if (diff < parent.minimumSize) { diff = parent.minimumSize; }
			  if (diff > parent.maximumSize) { diff = parent.maximumSize; }
			}*/
			var sizes = handle.parentNode.getSizes();
			sizes[handle.num-1] += diff;
			sizes[handle.num] -= diff;
			handle.parentNode.setSizes(sizes);
			pseudoHandle.destroy();
			document.removeEvent('mouseup',mouseup);
			document.removeEvent('mousemove',mousemove);
		};
		document.addEvent('mousemove',mousemove);
		document.addEvent('mouseup',mouseup);
	});
	if (!numWidgets) {
		handle.setStyle('display','none');
	}
	var widgetWrapper = new Element('div',{
		'class': 'panel',
		'styles': {'position': 'absolute', 'height': this.offsetHeight,	'width': this.offsetWidth, 'overflow': 'hidden'} //''auto'}
	});
	var sizes = [];
	var w = 0;
	if (numWidgets) w += numWidgets * this.handleWidth;
	for (var i=0; i < numWidgets; ++i) {
		var panel = this.widgets[i];
		if (orientation) {
			panel.setStyle('height',Math.floor(panel.offsetHeight * (numWidgets / (numWidgets + 1))));
			w += panel.offsetHeight;
			sizes.push(panel.offsetHeight);
		}	else {
			panel.setStyle('width',Math.floor(panel.offsetWidth * (numWidgets / (numWidgets + 1))));
			w += panel.offsetWidth;
			sizes.push(panel.offsetWidth);
		}
		//panel.setStyle('overflow','hidden'); //TEST !!!
	}
	sizes.push((orientation?this.offsetHeight:this.offsetWidth) - w);

	widgetWrapper.handleWidth = parameters['handleWidth']?parameters['handleWidth']:1;
	widgetWrapper.handleColor = parameters['handleColor']?parameters['handleColor']:'lightgray';
	widgetWrapper.handleBorder = parameters['handleBorder']?parameters['handleBorder']:'none';
	widgetWrapper.orientation = parameters['orientation']?parameters['orientation']:0; // 0 is horizontal. otherwise, vertical
	widgetWrapper.minimumSize = parameters['minimumSize']?parameters['minimumSize']:26; //40;
	widgetWrapper.maximumSize = parameters['maximumSize']?parameters['maximumSize']:200;
	widgetWrapper.opaqueResize = parameters['opaqueResize']?parameters['opaqueResize']:0;
	
	this.minimumSize += widgetWrapper.minimumSize;
	this.maximumSize += widgetWrapper.maximumSize;
	widgetWrapper.appendChild(widget);
	//handle.setStyle('background-color','red'); //TEST!!!
	this.appendChild(handle);
	this.appendChild(widgetWrapper);
	this.handles.push(handle);
	this.widgets.push(widgetWrapper);
	this.setSizes(sizes);
}

function Splitter__parentResized() {
	var parent = this.parentNode;
	var w = parent.offsetWidth, h = parent.offsetHeight;
	if (parent === document.body) {
		h = window.getHeight();
    w = window.getWidth(); //TEST!!!
	}
	h = h - (parseInt(parent.getStyle('border-top-width')) - parseInt(parent.getStyle('border-bottom-width')));
	//h = h - (parseInt(parent.getStyle('border-top-height')) - parseInt(parent.getStyle('border-bottom-height')));
	w = w - (parseInt(parent.getStyle('border-left-width')) - parseInt(parent.getStyle('border-right-width')));
	this.setStyles({'width': w,	'height': h}); //, 'overflow': 'hidden'});
	this.setSizes(this.getSizes());
}

function Splitter__setSizes(sizes) {
	if (!this.offsetWidth || !this.offsetHeight) return;
	if (!this.handles.length) return;
	var x = 0;
	var w = 0;
	for (var i = 0; i < sizes.length; ++i) {
		w += sizes[i];
	}
	var h = (sizes.length > 1)?this.handleWidth * (sizes.length-1):0;
	var maxSize = this.orientation?this.offsetHeight - h:this.offsetWidth - h;
	if (!w) { // panel sizes are all 0
		var panelSize = Math.floor(maxSize / this.handles.length);
		for (var i = this.handles.length - 1; i; --i) sizes[i] = panelSize;
		sizes[0] = maxSize - panelSize * (this.handles.length - 1);
	}	else if (w != maxSize) { // panel sizes don't add up
		var ratio = maxSize / w;
		var sum = 0;
		for (var i = this.handles.length-1; i; --i) {
			var newSize = Math.floor(sizes[i] * ratio);
			sizes[i] = newSize;
			sum += newSize;
		}
		sizes[0] = maxSize-sum;
	}
	if (this.minimumSize < maxSize && this.minimumSize) { // check for width constraints
		var found = 0, minTotal = 0, nonMinArr = [], nonMinTotal = 0;
		for (var i = 0; i < sizes.length; ++i) {
			if (this.widgets[i].minimumSize > sizes[i]) {
				sizes[i] = this.widgets[i].minimumSize;
				found = 1;
				minTotal += this.widgets[i].minimumSize;
			}	else {
				nonMinTotal += sizes[i];
				nonMinArr.push(i);
			}
		}
		if (found) {
			var ratio = (maxSize - minTotal) / nonMinTotal;
			for (var i = 0; i < nonMinArr.length; ++i) sizes[nonMinArr[i]] = Math.floor(sizes[nonMinArr[i]] * ratio);
			return this.setSizes(sizes);
		}
	}
	for (var i = 0; i < sizes.length ; ++i) {
		if (i) {
    	//this.handles[i].setStyle('background-color','red'); //TEST!!!
			this.handles[i].setStyles(this.orientation?{'left':0,'width':this.offsetWidth,'top':x,'overflow':'hidden'}
																								:{'left':x,'top':0,'height':this.offsetHeight,'overflow':'hidden'});
			x += this.handleWidth;
		}
		this.widgets[i].setStyles(this.orientation?{'top':x,'left':0,'width':this.offsetWidth,'height':sizes[i],'overflow':'hidden'}
																							:{'left':x,'top':0,'height':this.offsetHeight,'width':sizes[i],'overflow':'hidden'});
		x += sizes[i];
	}
  var children = this.getElements('div');
	//var children = $$('div',this); //$ES('*',this);
	//var children = $ES('*',this); //$ES('*',this);
	//var children = $ES('*',this); //$ES('*',this);
	//var children = $$('*',this); //$ES('*',this);
	//var children = $$('div>div',this); //$ES('*',this);
	children.each(function(child) {
	  //if (child.id && this.id && child.id != this.id) {
		  if (child.parentResized) child.parentResized();
		  //if (child.parentResized()) child.parentResized();
		  //child.parentResized();
		//}
	});
}

function Splitter__getSizes() {
	var result = [];
	for (var i = 0; i < this.widgets.length; ++i) {
	  result.push(this.orientation?this.widgets[i].offsetHeight:this.widgets[i].offsetWidth);
	}
	return result;
}
