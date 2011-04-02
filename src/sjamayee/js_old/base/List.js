var List = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("List/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters&Setters
	this.getForm = function() {
		var result = null;
		if (this.form !== undefined) {
			result = this.form;
		}
	  return result;
	};
	this.setForm = function(form) {
		if (form) {
			this.form = form;
		}
		return this;
	};
	this.getMode = function() {
		var result = List.MODE_DISPLAY;
		if ((this.mode !== undefined) && (this.mode !== null)) {
			result = this.mode;
		}
	  return result;
	};
	this.setMode = function(mode) {
		if (mode) {
			this.mode = mode;
		}
		return this;
	};
	this.isDisplay = function() {
		return (this.getMode() == List.MODE_DISPLAY);
	};
	this.isEdit = function() {
		return (this.getMode() == List.MODE_EDIT);
	};
	this.isInsert = function() {
		return (this.getMode() == List.MODE_INSERT);
	};
	//Abstract
	this.getMaximumLines = function() {
		//Utils.alert("List/getMaximumLines - abstract");
		//return undefined;
		return 0;
	};
	this.getIndexMinimum = function() {
		return 0;
	};
	this.getIndexMaximum = function() {
		return (this.getMaximumLines() - 1);
	};
	this.getIndexLast = function() {
		var result = this.getIndexMaximum();
		try {
			var emptyLine = false;
			while (result > this.getIndexMinimum()) {
				emptyLine = (ObjectList.isLineEmpty(result));
				if (emptyLine === false) { break; }
				result = result - 1;
			}
		} catch(error) {
			Utils.alert("List/getIndexLast Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getIndex = function() {
		var result = this.getIndexMinimum();
		if ((this.index !== undefined) && (this.index !== null)) {
			result = this.index;
		}
	  return result;
	};
	this.setIndex = function(index) {
		try {
			if (index !== null) {
				var _index = index;
				if (index < this.getIndexMinimum()) {
					_index = this.getIndexMinimum();
				} else if (index > this.getIndexLast()) {
					_index = this.getIndexLast();
				}
				this.index = _index;
			}
		} catch(error) {
			Utils.alert("List/setIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.getListObjects = function() {
	//alert("List/getListObjects");
		var result = [];
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getCache();
			}
		} catch(error) {
			Utils.alert("List/getListObjects Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	};
	
	this.getCache = function() {
		var result = null;
		if (this.cache !== undefined) {
			result = this.cache;
		}
		return result;
	};
	this.setCache = function(cache) {
		if (cache) {
			this.cache = cache;
		}
	  return this;
	};
	this.getSize = function() {
		var result = 0;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getSize();
			}
		} catch(error) {
			Utils.alert("List/getSize Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	};
	this.getMaximumSize = function() {
		var result = 0;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getMaximumSize();
			}
		} catch(error) {
			Utils.alert("List/getMaximumSize Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	};
	this.getEndOfData = function() {
		var result = false;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getEndOfData();
			}
		} catch(error) {
			Utils.alert("List/getEndOfData Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
			return result;
		}
	};
	this.getTopOfList = function() {
		var result = false;
		var cache = this.getCache();
		try {
			//result = this.getEndOfData();
			if (cache) {
				result = (((this.getTopOid() !== null) && (cache.getTopOid() !== null)) &&
									 (this.getTopOid() == cache.getTopOid()));
			}  
		} catch(error) {
			Utils.alert("List/getTopOfList Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
		/*if (result === true) {
				Utils.alert("List/getTopOfList - result: "+result+
							"\nthis.topOid: "+this.getTopOid()+
							"\ncache.topOid: "+cache.getTopOid());
			}*/
			return result;
		}
	};
	this.getBottomOfList = function() {
		var result = false;
		var cache = this.getCache();
		try {
			//result = this.getEndOfData();
			if (cache) {
				result = (((this.getBottomOid() !== null) && (cache.getBottomOid() !== null)) &&
									 (this.getBottomOid() == cache.getBottomOid()));
			}
		} catch(error) {
			Utils.alert("List/getBottomOfList Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {  
		/*if (result === true) {
				Utils.alert("List/getBottomOfList - result: "+result+
							"\nthis.bottomOid: "+this.getBottomOid()+
							"\ncache.bottomOid: "+cache.getBottomOid());
			}*/
			return result;
		}
	};
	this.getPreviousMethod = function() {
		var result = List.METHOD_FIRST;
		if ((this.previousMethod !== undefined) && (this.previousMethod !== null)) {
			result = this.previousMethod;
		}
		return result;
	};
	this.setPreviousMethod = function(previousMethod) {
		if (previousMethod !== null) {
			this.previousMethod = previousMethod;
		}
		return this;
	};
	this.getTopOid = function() {
		var result = null;
		if (this.topOid !== undefined) {
			result = this.topOid;
		}
		return result;
	};
	this.setTopOid = function(topOid) {
		if (topOid !== null) {
			this.topOid = topOid;
		}
		return this;
	};
	this.getBottomOid = function() {
		var result = null;
		if (this.bottomOid !== undefined) {
			result = this.bottomOid;
		}
		return result;
	};
	this.setBottomOid = function(bottomOid) {
		if (bottomOid !== null) {
			this.bottomOid = bottomOid;
		}
		return this;
	};
	this.getDirectionChanged = function() {
		var result = true;
		if ((this.directionChanged !== undefined) && (this.directionChanged !== null)) {
			result = this.directionChanged;
		}
	  return result;
	};
	this.setDirectionChanged = function(directionChanged) {
		if (directionChanged !== null) {
			this.directionChanged = directionChanged;
		}
		return this;
	};
	this.isDirectionChanged = function() {
		return this.getDirectionChanged();
	};
	this.getCurrentOid = function() {
		var result = null;
		if (this.currentOid !== undefined) {
			result = this.currentOid;
		}
		return result;
	};
	this.setCurrentOid = function(currentOid) {
		if (currentOid !== null) {
			this.currentOid = currentOid;
		}
		return this;
	};
	//Functions
	this.clear = function() {
		Utils.alert("List/clear"); // - this: "+this.print());
		try {
			//Mode: DISPLAY
			if (this.getCache() !== null) {
				this.getCache().clear();
			}
			this.setMode(List.MODE_DISPLAY);
			this.setIndex(this.getIndexMinimum());
			this.setCurrentOid(null);
			this.setTopOid(null);
			this.setBottomOid(null);
			this.setPreviousMethod(null);
			this.setDirectionChanged(false);
		} catch(error) {
			Utils.alert("List/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.getById = function(id) {
		var result = null;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.getById(id);
			}
		} catch(error) {
			Utils.alert("List/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	//Abstract
	this.showPage = function(method,oid) {
		Utils.alert("List/showPage - abstract.");
		return undefined;
	};
	this.firstPage = function() {
		Utils.alert("List/firstPage"); // - this: "+this.print());
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_FIRST_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_FIRST);
			if (this.getTopOfList() !== true) {
				this.clear();
				this.getCache().firstPage();
			}
			if (this.getTopOfList() === true) {
				this.setIndex(this.getIndexMinimum());
				this.setCurrentOid(this.getTopOid());
			}
			this.showPage(List.METHOD_FIRST,null);
		} catch(error) {
			Utils.alert("List/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getBottomOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_END_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	};
	this.previousPage = function() {
		Utils.alert("List/previousPage"); // - this: "+this.print());
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_PREVIOUS_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_PREVIOUS);
			if (this.getTopOfList() !== true) {
				if (!this.showPage(List.METHOD_PREVIOUS,this.getTopOid())) {
					this.getCache().previousPage();
					//Utils.alert("List.previousPage - cache/length: "+this.getCache().getCache().length);
					this.showPage(List.METHOD_PREVIOUS,this.getTopOid());
				}
			}
			if (this.getTopOfList() === true) {		
				this.setIndex(this.getIndexMinimum());
				this.setCurrentOid(this.getTopOid());
			}
		//this.showPage(List.METHOD_PREVIOUS,this.getTopOid());		
		} catch(error) {
			Utils.alert("List/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getTopOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_BEGIN_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	};
	this.nextPage = function() {
		Utils.alert("List/nextPage"); // - this: "+this.print());
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_NEXT_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_NEXT);
			if (this.getBottomOfList() !== true) {
				if (!this.showPage(List.METHOD_NEXT,this.getBottomOid())) {
					this.getCache().nextPage();
					//Utils.alert("List.nextPage - cache/length: "+this.getCache().getCache().length);
					this.showPage(List.METHOD_NEXT,this.getBottomOid());
				}
			}
			if (this.getBottomOfList() === true) {		
				this.setIndex(this.getIndexLast());
				this.setCurrentOid(this.getBottomOid());
			}
		//this.showPage(List.METHOD_NEXT,this.getBottomOid());
		} catch(error) {
			Utils.alert("List/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally { 
			if (this.getBottomOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_END_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	};
	this.lastPage = function() {
		Utils.alert("List/lastPage");
		var result = false;
		var form = this.getForm();
		try {
			if (form) {
				form.setStatusMessage(List.STATUS_MESSAGE_LAST_PAGE_LBL,true);
			}
			this.changeDirection(List.METHOD_LAST);
			if (this.getBottomOfList() !== true) {
				this.clear();
				this.getCache().lastPage();
			}
			if (this.getBottomOfList() === true) {
				this.setIndex(this.getIndexLast());
				this.setCurrentOid(this.getBottomOid());
			}
			this.showPage(List.METHOD_LAST,null);
		} catch(error) {
			Utils.alert("List/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getTopOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_BEGIN_LBL,true);
					Utils.beep(0);
				}
			} else {
				result = true;
			}
			return result;
		}
	};
	this.down = function() {
		Utils.alert("List/down"); // - this: "+this.print());
		var result = false;
		var form = this.getForm();
		try {
			if (this.getIndex() < this.getIndexLast()) {
				this.setIndex(this.getIndex() + 1);
			} else {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_DOWN_LBL,true);
				}
				this.changeDirection(List.METHOD_DOWN);
				if (this.getBottomOfList() !== true) {
					if (!this.showPage(List.METHOD_DOWN,this.getBottomOid())) {
						this.getCache().nextPage();
						this.showPage(List.METHOD_DOWN,this.getBottomOid());
					}
				}
			}
		} catch(error) {
			Utils.alert("List/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getBottomOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_END_LBL,true);
					Utils.beep(0);
				}
			}
			return result;
		}
	};
	this.up = function() {
		Utils.alert("List/up"); // - this: "+this.print());
		var result = false;
		var form = this.getForm();
		try {
			if (this.getIndex() > this.getIndexMinimum()) {
				this.setIndex(this.getIndex() - 1);
			} else {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_UP_LBL,true);
				}
				this.changeDirection(List.METHOD_UP);
				if (this.getTopOfList() !== true) {
					if (!this.showPage(List.METHOD_UP,this.getTopOid())) {
						this.getCache().previousPage();
						this.showPage(List.METHOD_UP,this.getTopOid());
					}
				}
			}
		} catch(error) {
			Utils.alert("List/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (this.getTopOfList() === true) {
				if (form) {
					form.setStatusMessage(List.STATUS_MESSAGE_BEGIN_LBL,true);
					Utils.beep(0);
				}
			}
			return result;
		}
	};
	this.changeDirection = function(method) {
		Utils.alert("List/changeDirection - method: "+method);
		try {
			var previousMethod = this.getPreviousMethod();
			if (previousMethod === null) {
				previousMethod = method;
				this.setPreviousMethod(previousMethod);
			}
			var cache = this.getCache();
			if (cache) {
				var endOfData = cache.getEndOfData();
				switch (method) {
					case List.METHOD_FIRST:
						this.direction = List.DIRECTION_DOWN;
						if ((previousMethod == List.METHOD_UP) ||
								(previousMethod == List.METHOD_NEXT) ||
								(previousMethod == List.METHOD_PREVIOUS) ||
								(previousMethod == List.METHOD_LAST)) {
							this.setDirectionChanged(true);
							endOfData = false;
						}
						break;
					case List.METHOD_NEXT:
						this.direction = List.DIRECTION_DOWN;
						if ((previousMethod == List.METHOD_LAST) ||
								(previousMethod == List.METHOD_PREVIOUS) ||
								(previousMethod == List.METHOD_UP)) {
							this.setDirectionChanged(true);
							endOfData = false;
						}
						break;
					case List.METHOD_DOWN:
					this.direction = List.DIRECTION_DOWN;
					if ((previousMethod == List.METHOD_LAST) ||
							(previousMethod == List.METHOD_PREVIOUS) ||
							(previousMethod == List.METHOD_UP)) {
						this.setDirectionChanged(true);
						endOfData = false;
					}
					break;
				case List.METHOD_PREVIOUS:
					this.direction = List.DIRECTION_UP;
					if ((previousMethod == List.METHOD_DOWN) ||
							(previousMethod == List.METHOD_NEXT) ||
							(previousMethod == List.METHOD_FIRST)) {
						this.setDirectionChanged(true);
						endOfData = false;
					}
					break;
				case List.METHOD_UP:
					this.direction = List.DIRECTION_UP;
					if ((previousMethod == List.METHOD_DOWN) ||
							(previousMethod == List.METHOD_NEXT) ||
							(previousMethod == List.METHOD_FIRST)) {
						this.setDirectionChanged(true);
						endOfData = false;
					}
					break;
				case List.METHOD_LAST:
					this.direction = List.DIRECTION_UP;
					if ((previousMethod == List.METHOD_FIRST) ||
							(previousMethod == List.METHOD_NEXT) ||
							(previousMethod == List.METHOD_PREVIOUS) ||
							(previousMethod == List.METHOD_DOWN) ||
							(previousMethod == List.METHOD_UP)) {
						this.setDirectionChanged(true);
						endOfData = false;
						}
						break;
					default:
						break;
				}
				cache.setEndOfData(endOfData);
			}
		} catch(error) {
			Utils.alert("List/changeDirection Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	//Abstract
	this.getPaneLeft = function() {
		return undefined;
	};
	//Abstract
	this.getPaneRight = function() {
		return undefined;
	};
	//Abstract
	this.fill = function() {
		return undefined;
	};
	this.print = function() {
		var result = null;
		try {
			result = "List:\n";
			var listObjects = this.getListObjects();
			if (listObjects) {
				for (var i in listObjects) {
					if (listObjects[i]) {
						result += listObjects[i].print();
					}
				}
			}
		} catch(error) {
			Utils.alert("List/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
List = new Class(new List());
//Statics
List.MODE_DISPLAY = "DISPLAY";
List.MODE_EDIT = "EDIT";
List.MODE_INSERT = "INSERT";

List.METHOD_FIRST = "FIRST";
List.METHOD_NEXT = "NEXT";
List.METHOD_DOWN = "DOWN";
List.METHOD_UP = "UP";
List.METHOD_PREVIOUS = "PREVIOUS";
List.METHOD_LAST = "LAST";
List.METHOD_REFRESH = "REFRESH";

List.STATUS_MESSAGE_FIRST_PAGE_LBL = "First page...";
List.STATUS_MESSAGE_NEXT_PAGE_LBL = "Next page...";
List.STATUS_MESSAGE_DOWN_LBL = "Line down...";
List.STATUS_MESSAGE_UP_LBL = "Line up...";
List.STATUS_MESSAGE_PREVIOUS_PAGE_LBL = "Previous page...";
List.STATUS_MESSAGE_LAST_PAGE_LBL = "Last page...";
List.STATUS_MESSAGE_BEGIN_LBL = "Begin of list.";
List.STATUS_MESSAGE_END_LBL = "End of list.";

List.DIRECTION_UP = "UP";
List.DIRECTION_DOWN = "DOWN";

//List                                                           //TODO: VERIFYYYYYYYYYYYYY (method showPage) !!!!!!!
//TODO: EXTEND WITH OTHER CLASSES (listCell,listColumn,...)
//List.CELL_CONTENT_CLASS_ID = "listCellContent";
//List.OBJECT_NAME_TEXTAREA_CLASS_ID = "objectNameTextArea";     // VERIFY !!!
//List.OBJECT_DESC_TEXTAREA_CLASS_ID = "objectDescTextArea";     // VERIFY !!!
/*
List.LINES_MAX = function() {
return ListCache.PAGE_SIZE;
};
*/
