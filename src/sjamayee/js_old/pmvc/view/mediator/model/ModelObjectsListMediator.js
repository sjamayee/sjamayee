var ModelObjectsListMediator = function() {
	this.Extends = ObjectsListMediator;
  
	this.initialize = function(viewComponent)	{
		this.parent(ModelObjectsListMediator.ID,viewComponent);
	  var gridList = this.getViewComponent();	  
    gridList.gridListSplitter.left.modelObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, this.onLineMouseOver);
  	gridList.gridListSplitter.left.modelObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, this.onLineMouseOut);
  	gridList.gridListSplitter.right.modelObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, this.onLineMouseOver);
  	gridList.gridListSplitter.right.modelObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, this.onLineMouseOut);
		//Initialize list.
  	this.entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
	};

	this.onLineMouseOver = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ModelObjectsListMediator/onLineMouseOver - target/id: "+id+" line: "+line);
	  if (!this.lineEmpty(line)) {
  		$(this.getObjectsListLeft().getRefCellId(line)).setAttribute("style","background-color:#FAE4DB;");
  		$(this.getObjectsListLeft().getNameCellId(line)).setAttribute("style","background-color:#FAE4DB;");
  		$(this.getObjectsListLeft().getTypeCellId(line)).setAttribute("style","background-color:#FAE4DB;");
  		$(this.getObjectsListRight().getDescCellId(line)).setAttribute("style","background-color:#FAE4DB;");
  	}
	};
	this.onLineMouseOut = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ModelObjectsListMediator/onLineMouseOut - target/id: "+id+" line: "+line);
	  if (!this.lineEmpty(line)) {
  		$(this.getObjectsListLeft().getRefCellId(line)).setAttribute("style","background-color:inherit;");
  		$(this.getObjectsListLeft().getNameCellId(line)).setAttribute("style","background-color:inherit;");
  		$(this.getObjectsListLeft().getTypeCellId(line)).setAttribute("style","background-color:inherit;");
  		$(this.getObjectsListRight().getDescCellId(line)).setAttribute("style","background-color:inherit;");
  	}
	};

	this.listNotificationInterests = function()	{
	  var result = this.parent();
	  return result.concat([
  	  SjamayeeFacade.OLIST_MODEL_SHOW,
  	  SjamayeeFacade.OLIST_MODEL_REFRESH,
  		SjamayeeFacade.OLIST_MODEL_CLICK,
  		SjamayeeFacade.OLIST_MODEL_LINE_CLICK,
  		SjamayeeFacade.OLIST_MODEL_ESCAPE,
  		SjamayeeFacade.OLIST_MODEL_SPACE,
  		SjamayeeFacade.OLIST_MODEL_ENTER,
  	  SjamayeeFacade.OLIST_MODEL_HOME,
  		SjamayeeFacade.OLIST_MODEL_PREVIOUS,
  		SjamayeeFacade.OLIST_MODEL_UP,
  		SjamayeeFacade.OLIST_MODEL_DOWN,
  		SjamayeeFacade.OLIST_MODEL_NEXT,
  		SjamayeeFacade.OLIST_MODEL_END,
  		SjamayeeFacade.OLIST_MODEL_RESIZE,
  		SjamayeeFacade.OLIST_MODEL_OBJECT_ADD,
  		SjamayeeFacade.OLIST_MODEL_OBJECT_DELETE,
  		SjamayeeFacade.OLIST_MODEL_OBJECT_EDIT,
  		SjamayeeFacade.OLIST_MODEL_OBJECT_UNDO,
  		SjamayeeFacade.OLIST_MODEL_OBJECT_REDO,
  		SjamayeeFacade.OLIST_MODEL_BUFFER_CLEAR,
  		SjamayeeFacade.OLIST_MODEL_TEXT_EDIT,
  		SjamayeeFacade.OLIST_MODEL_OBJECT_UNREFS_DELETE,  		
  		SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE,
			SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE,
  		SjamayeeFacade.OLIST_MODEL_FILTER_CLICK
	  ]);
	};

  this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();
  	switch (note.getName())	{
			case SjamayeeFacade.OLIST_MODEL_SHOW:
		  //alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_SHOW");
    	//this.sendNotification(SjamayeeFacade.MODEL_SHOW);
			this.sendNotification(SjamayeeFacade.OLIST_SHOW);
      var state = null;
			var properties = note.getBody();
    	if (properties) { if (properties.state !== undefined) { state = properties.state; } }
			if (state) { this.setState(state); }
			if (this.getState() == SjamayeeMediator.STATE_TEXT) {
      	this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_EDIT);
			  break;
			}    	
			this.hide();
		/*this.relationsGridLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
			if (this.objectsListLeftWidth !== null) {
				gridList.gridListSplitter.left.setStyle("width", this.objectsListLeftWidth);
				if (dijit) {
					var splitter = dijit.byId(GridListSplitter.ID);
					if (splitter) { splitter.resize(); }
				}				
			}
			var splitterStyle = this.getSplitterStyle();
			if (splitterStyle === null) {
  	    //splitterStyle = "background-color:white;width:100%;height:100%;display:block;";
  	    splitterStyle = "display:block;";
  	  }
  	  gridList.gridListSplitter.setAttribute("style",splitterStyle); */
			this.sendNotification(SjamayeeFacade.OLIST_MODEL_HEADER_SHOW);
			this.sendNotification(SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW);
			gridList.gridListSplitter.left.modelObjectsList.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.modelObjectsList.setAttribute("style","width:100%;height:100%;display:block;");
    	this.setListSize(this.getListSize());
      //this.home();
    	//this.sendNotification(SjamayeeFacade.OLIST_MODEL_REFRESH);
			break;
			case SjamayeeFacade.OLIST_MODEL_REFRESH:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_REFRESH");
			switch (this.getLastNavigation()) {
  			case SjamayeeFacade.OLIST_MODEL_HOME:	    this.sendNotification(SjamayeeFacade.OLIST_MODEL_HOME); break;
  			case SjamayeeFacade.OLIST_MODEL_PREVIOUS:	this.sendNotification(SjamayeeFacade.OLIST_MODEL_PREVIOUS); break;
  			case SjamayeeFacade.OLIST_MODEL_UP:	      this.sendNotification(SjamayeeFacade.OLIST_MODEL_UP); break;
  			case SjamayeeFacade.OLIST_MODEL_DOWN:	    this.sendNotification(SjamayeeFacade.OLIST_MODEL_DOWN); break;
  			case SjamayeeFacade.OLIST_MODEL_NEXT:	    this.sendNotification(SjamayeeFacade.OLIST_MODEL_NEXT); break;
  			case SjamayeeFacade.OLIST_MODEL_END:	      this.sendNotification(SjamayeeFacade.OLIST_MODEL_END); break;
			}
			break;			
  		case SjamayeeFacade.OLIST_MODEL_CLICK:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_CLICK");
  		break;			
  		case SjamayeeFacade.OLIST_MODEL_LINE_CLICK:
  		var evt = note.getBody();
  		this.setCurrentLine(evt);
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_LINE_CLICK - id: "+evt.target.id);
  		break;
  		case SjamayeeFacade.OLIST_KEYPRESS:
  		alert("ModelObjectsListMediator/handleNotification - OLIST_KEYPRESS");
  		break;
  		case SjamayeeFacade.OLIST_MODEL_ESCAPE:
  		alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_ESCAPE");
  		break;
  		case SjamayeeFacade.OLIST_MODEL_SPACE:
  		alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_SPACE");
  		break;
  		case SjamayeeFacade.OLIST_MODEL_ENTER:
  		alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_ENTER - line: "+this.getLine()+" name: "+this.getUicName());
  		break;
			case SjamayeeFacade.OLIST_MODEL_HOME:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_HOME");
			this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_HOME);
			this.home();
			var messageText = note.getBody();
			if (messageText !== undefined) { this.setMessageText(messageText); }
			break;
			case SjamayeeFacade.OLIST_MODEL_PREVIOUS:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_PREVIOUS");
			this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_PREVIOUS);
			this.previous();
			var messageText = note.getBody();
			if (messageText !== undefined) { this.setMessageText(messageText); }
			break;
			case SjamayeeFacade.OLIST_MODEL_UP:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_UP");
			this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_UP);
		  this.lineUp();
			var messageText = note.getBody();
			if (messageText !== undefined) { this.setMessageText(messageText); }
			break;
			case SjamayeeFacade.OLIST_MODEL_DOWN:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_DOWN");
			this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_DOWN);
		  this.lineDown();
			var messageText = note.getBody();
			if (messageText !== undefined) { this.setMessageText(messageText); }
			break;
			case SjamayeeFacade.OLIST_MODEL_NEXT:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_NEXT");
			this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_NEXT);
			this.next();
			var messageText = note.getBody();
			if (messageText !== undefined) { this.setMessageText(messageText); }
			break;
			case SjamayeeFacade.OLIST_MODEL_END:
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_END");
			this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_END);
			this.end();
			var messageText = note.getBody();
			if (messageText !== undefined) { this.setMessageText(messageText); }
			break;
			case SjamayeeFacade.OLIST_MODEL_RESIZE:
		  //alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_RESIZE");
		  var listSize = note.getBody();
		  this.listResize(listSize);
  		//this.home(); //TODO !!!
    	this.sendNotification(SjamayeeFacade.OLIST_MODEL_REFRESH);
			break;
  		case SjamayeeFacade.OLIST_MODEL_OBJECT_ADD:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_OBJECT_ADD");
  		//this.setEdit();
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_ADD);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_OBJECT_DELETE:
  		alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_OBJECT_DELETE");
  		//this.setDisplay();  		  		
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_DELETE);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_OBJECT_EDIT:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_OBJECT_EDIT");
  		//this.setEdit();
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_EDIT);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_OBJECT_UNDO:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_OBJECT_UNDO");
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_UNDO);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_OBJECT_REDO:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_OBJECT_REDO");
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_REDO);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_BUFFER_CLEAR:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_BUFFER_CLEAR");
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_TEXT_EDIT:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_TEXT_EDIT");
    	this.setState(SjamayeeMediator.STATE_TEXT);
    	this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_SHOW);
    	this.sendNotification(SjamayeeFacade.TEXT_EDIT,this);
  		break;
  		case SjamayeeFacade.OLIST_MODEL_OBJECT_UNREFS_DELETE:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_OBJECT_UNREFS_DELETE");
    	this.sendNotification(SjamayeeFacade.OBJECT_MODEL_UNREFS_DELETE);
  		break;			
  		case SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_REFOP_CHANGE");
  		this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
  		break;
			case SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE:
			var typeName = note.getBody();
			//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_TYPE_CHANGE - typeName: "+typeName);
			//this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
			this.switchType(typeName);
			this.home();
			break;
  		case SjamayeeFacade.OLIST_MODEL_FILTER_CLICK:
  		//alert("ModelObjectsListMediator/handleNotification - OLIST_MODEL_FILTER_CLICK");
  		break;
    }
    this.parent(note);    
	};

  this.setEdit = function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_EDIT) {
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_DETAIL);
    }
    return mode;
  };
	
  this.setDisplay = function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_DISPLAY) {
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_DETAIL);
    }
    return mode;
  };

	this.switchType = function(typeName) {
		//alert("ModelObjectsListMediator/switchType - typeName: "+typeName);
		return this;
	};
	
  this.getType = function(object) {
    var result = object.getModelType().getType();
		//alert("ModelObjectsListMediator/getType - type: "+result);
    return result;
  };

	this.getLastNavigation = function() {
		return (this.parent())?this.parent():SjamayeeFacade.OLIST_MODEL_HOME;
	};

	this.firstPage = function() {
		//alert("ModelObjectsListMediator/firstPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {		  
		    this.parent();
		    this.fillList(this.entityProxy.firstPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.HOME_MESSAGE_TEXT);		    
		    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		  }
		} catch(error) {
			Utils.alert("ModelObjectsListMediator/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.previousPage = function() {
		Utils.alert("ModelObjectsListMediator/previousPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
		    this.parent();
		    this.fillList(this.entityProxy.previousPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.PREVIOUS_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		  }
		} catch(error) {
			Utils.alert("ModelObjectsListMediator/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.previousLine = function() {
		Utils.alert("ModelObjectsListMediator/previousLine");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
		    this.parent();
		    this.fillList(this.entityProxy.previousLine(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.UP_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		  }
		} catch(error) {
			Utils.alert("ModelObjectsListMediator/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.nextLine = function() {
		Utils.alert("ModelObjectsListMediator/nextLine");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
		    this.parent();
		    this.fillList(this.entityProxy.nextLine(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.DOWN_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		  }
		} catch(error) {
			Utils.alert("ModelObjectsListMediator/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.nextPage = function() {
		Utils.alert("ModelObjectsListMediator/nextPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
		    this.parent();
		    this.fillList(this.entityProxy.nextPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.NEXT_MESSAGE_TEXT);		    
		    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		  }
		} catch(error) {
			Utils.alert("ModelObjectsListMediator/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.lastPage = function() {
		Utils.alert("ModelObjectsListMediator/lastPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
		    this.parent();
		    this.fillList(this.entityProxy.lastPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.END_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
		  }
		} catch(error) {
			Utils.alert("ModelObjectsListMediator/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
  this.setResizeButtonText = function(text) {
  	this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;    
  };
  
	this.setListSize = function(listSize) {
	  //alert("ModelObjectsListMediator/setListSize - listSize: "+listSize);
	  this.parent(listSize);
	  var parentDetail = this.facade.retrieveMediator(ModelParentDetailMediator.ID).getViewComponent();
	  var childDetail = this.facade.retrieveMediator(ModelChildDetailMediator.ID).getViewComponent();
	  var gridList = this.getViewComponent();	  
    if (this.isListFull() === true) {
		  this.setPageSize(ObjectsListMediator.PAGE_SIZE_MAX);
  		this.setEndOfList(this.getPageSize() - 1);		  
		  parentDetail.setAttribute("style","display:none;");
		  childDetail.setAttribute("style","display:none;");
		  gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
		} else {
		  this.setPageSize(ObjectsListMediator.PAGE_SIZE_MIN);
  		this.setEndOfList(this.getPageSize() - 1);		  
			parentDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
			childDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
			gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");		  
		}
	  var resizeButtonText = (this.isListFull() === true)?ObjectsToolBar.RESIZE_BUTTON_FULL_VALUE:ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
		this.setResizeButtonText(resizeButtonText);
	};
};
ModelObjectsListMediator = new Class(new ModelObjectsListMediator());
ModelObjectsListMediator.ID = "ModelObjectsListMediator";
