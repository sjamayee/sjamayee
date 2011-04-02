var DataObjectsListMediator = function() {
	this.Extends = ObjectsListMediator;
  
	this.initialize = function(viewComponent)	{
		this.parent(DataObjectsListMediator.ID,viewComponent);
	  var gridList = this.getViewComponent();	  
    gridList.gridListSplitter.left.dataObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, this.onLineMouseOver);
  	gridList.gridListSplitter.left.dataObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, this.onLineMouseOut);
  	gridList.gridListSplitter.right.dataObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, this.onLineMouseOver);
  	gridList.gridListSplitter.right.dataObjectsList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, this.onLineMouseOut);
		//Initialize list.
  	this.entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
	};

	this.onLineMouseOver = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("DataObjectsListMediator/onLineMouseOver - target/id: "+id+" line: "+line);
	  if (!this.lineEmpty(line)) {
  		$(this.getObjectsListLeft().getRefCellId(line)).setAttribute("style","background-color:#D7E5FE;");
  		$(this.getObjectsListLeft().getNameCellId(line)).setAttribute("style","background-color:#D7E5FE;");
  		$(this.getObjectsListLeft().getTypeCellId(line)).setAttribute("style","background-color:#D7E5FE;");
  		$(this.getObjectsListRight().getDescCellId(line)).setAttribute("style","background-color:#D7E5FE;");
  	}
	};
	this.onLineMouseOut = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("DataObjectsListMediator/onLineMouseOut - target/id: "+id+" line: "+line);
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
		  SjamayeeFacade.OLIST_DATA_SHOW,
		  SjamayeeFacade.OLIST_DATA_REFRESH,
  		SjamayeeFacade.OLIST_DATA_CLICK,
  		SjamayeeFacade.OLIST_DATA_LINE_CLICK,
  		SjamayeeFacade.OLIST_DATA_ESCAPE,
  		SjamayeeFacade.OLIST_DATA_SPACE,
  		SjamayeeFacade.OLIST_DATA_ENTER,
  	  SjamayeeFacade.OLIST_DATA_HOME,
  		SjamayeeFacade.OLIST_DATA_PREVIOUS,
  		SjamayeeFacade.OLIST_DATA_UP,
  		SjamayeeFacade.OLIST_DATA_DOWN,
  		SjamayeeFacade.OLIST_DATA_NEXT,
  		SjamayeeFacade.OLIST_DATA_END,
  		SjamayeeFacade.OLIST_DATA_RESIZE,
  		SjamayeeFacade.OLIST_DATA_OBJECT_ADD,
  		SjamayeeFacade.OLIST_DATA_OBJECT_DELETE,
  		SjamayeeFacade.OLIST_DATA_OBJECT_EDIT,
  		//SjamayeeFacade.OLIST_DATA_OBJECT_SAVE,
  		//SjamayeeFacade.OLIST_DATA_OBJECT_CANCEL,
  		SjamayeeFacade.OLIST_DATA_OBJECT_UNDO,
  		SjamayeeFacade.OLIST_DATA_OBJECT_REDO,
  		SjamayeeFacade.OLIST_DATA_BUFFER_CLEAR,
  		SjamayeeFacade.OLIST_DATA_OBJECT_UNREFS_DELETE,
			SjamayeeFacade.OLIST_DATA_TYPE_CHANGE,
  		SjamayeeFacade.OLIST_DATA_REFOP_CHANGE,
  		SjamayeeFacade.OLIST_DATA_FILTER_CLICK
	  ]);
	};

  this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();    
		switch (note.getName())	{
    	case SjamayeeFacade.OLIST_DATA_SHOW:
    	this.setListSize(this.getListSize());    	
      //this.home();
    	//this.sendNotification(SjamayeeFacade.OLIST_DATA_REFRESH);
			break;
			case SjamayeeFacade.OLIST_DATA_REFRESH:
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_REFRESH");
			switch (this.getLastNavigation()) {
  			case SjamayeeFacade.OLIST_DATA_HOME:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME); break;
  			case SjamayeeFacade.OLIST_DATA_PREVIOUS:	this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS); break;
  			case SjamayeeFacade.OLIST_DATA_UP:	      this.sendNotification(SjamayeeFacade.OLIST_DATA_UP); break;
  			case SjamayeeFacade.OLIST_DATA_DOWN:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN); break;
  			case SjamayeeFacade.OLIST_DATA_NEXT:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT); break;
  			case SjamayeeFacade.OLIST_DATA_END:	      this.sendNotification(SjamayeeFacade.OLIST_DATA_END); break;
			}
			break;			
  		case SjamayeeFacade.OLIST_DATA_CLICK:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_CLICK");
  		break;			
  		case SjamayeeFacade.OLIST_DATA_LINE_CLICK:
  		var evt = note.getBody();
  		this.setCurrentLine(evt);
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_LINE_CLICK - id: "+evt.target.id);
  		break;
  		case SjamayeeFacade.OLIST_KEYPRESS:
  		alert("DataObjectsListMediator/handleNotification - OLIST_KEYPRESS");
  		break;
  		case SjamayeeFacade.OLIST_DATA_ESCAPE:
  		alert("DataObjectsListMediator/handleNotification - OLIST_DATA_ESCAPE");
  		break;
  		case SjamayeeFacade.OLIST_DATA_SPACE:
  		alert("DataObjectsListMediator/handleNotification - OLIST_DATA_SPACE");
  		break;
  		case SjamayeeFacade.OLIST_DATA_ENTER:
  		alert("DataObjectsListMediator/handleNotification - OLIST_DATA_ENTER - line: "+this.getLine()+" name: "+this.getUicName());
  		break;
			case SjamayeeFacade.OLIST_DATA_HOME:
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_HOME");
			this.setLastNavigation(SjamayeeFacade.OLIST_DATA_HOME);
			this.home();
			//this.setMessageText("First page.");ObjectsListMediator.HOME_MESSAGE_TEXT
			break;
			case SjamayeeFacade.OLIST_DATA_PREVIOUS:
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_PREVIOUS");
			this.setLastNavigation(SjamayeeFacade.OLIST_DATA_PREVIOUS);
			this.previous();
			//this.setMessageText("Previous page.");
			break;
			case SjamayeeFacade.OLIST_DATA_UP:
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_UP");
			this.setLastNavigation(SjamayeeFacade.OLIST_DATA_UP);
		  this.lineUp();
			//this.setMessageText("Previous line.");
			break;
			case SjamayeeFacade.OLIST_DATA_DOWN:
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_DOWN");
			this.setLastNavigation(SjamayeeFacade.OLIST_DATA_DOWN);
		  this.lineDown();
			//this.setMessageText("Next line.");
			break;
			case SjamayeeFacade.OLIST_DATA_NEXT:
			alert("DataObjectsListMediator/handleNotification - OLIST_DATA_NEXT");
			this.setLastNavigation(SjamayeeFacade.OLIST_DATA_NEXT);
			this.next();
			//this.setMessageText("Next page.");
			break;
			case SjamayeeFacade.OLIST_DATA_END:
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_END");
			this.setLastNavigation(SjamayeeFacade.OLIST_DATA_END);
			this.end();
			//this.setMessageText("Last page.");
			break;
			case SjamayeeFacade.OLIST_DATA_RESIZE:
		  //alert("DataObjectsListMediator/handleNotification - OLIST_DATA_RESIZE");
		  var listSize = note.getBody();
		  this.listResize(listSize);
  		//this.home(); //TODO !!!
    	this.sendNotification(SjamayeeFacade.OLIST_DATA_REFRESH);
			break;
  		case SjamayeeFacade.OLIST_DATA_OBJECT_ADD:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_ADD");
  		//this.setEdit();
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_ADD);
  		break;
  		case SjamayeeFacade.OLIST_DATA_OBJECT_DELETE:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_DELETE");
  		//this.setDisplay();  		
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_DELETE);
  		break;
  		case SjamayeeFacade.OLIST_DATA_OBJECT_EDIT:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_EDIT");
  		//this.setEdit();
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_EDIT);
  		break;
  		/*case SjamayeeFacade.OLIST_DATA_OBJECT_SAVE:
  		alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_SAVE");
  		this.setDisplay(true);
  		break;
  		case SjamayeeFacade.OLIST_DATA_OBJECT_CANCEL:
  		alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_CANCEL");
  		this.setDisplay();
  		break;*/
  		case SjamayeeFacade.OLIST_DATA_OBJECT_UNDO:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_UNDO");
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_UNDO);
  		break;
  		case SjamayeeFacade.OLIST_DATA_OBJECT_REDO:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_REDO");
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_REDO);
  		break;
  		case SjamayeeFacade.OLIST_DATA_BUFFER_CLEAR:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_BUFFER_CLEAR");
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR);
  		break;
  		case SjamayeeFacade.OLIST_DATA_OBJECT_UNREFS_DELETE:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_OBJECT_UNREFS_DELETE");
    	this.sendNotification(SjamayeeFacade.OBJECT_DATA_UNREFS_DELETE);
  		break;
  		case SjamayeeFacade.OLIST_DATA_REFOP_CHANGE:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_REFOP_CHANGE");
  		this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
  		break;
			case SjamayeeFacade.OLIST_DATA_TYPE_CHANGE:
			var typeName = note.getBody();
			//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_TYPE_CHANGE - typeName: "+typeName);
			//this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
			this.switchType(typeName);
			this.home();
			break;
  		case SjamayeeFacade.OLIST_DATA_FILTER_CLICK:
  		//alert("DataObjectsListMediator/handleNotification - OLIST_DATA_FILTER_CLICK");
  		break;
    }
    this.parent(note);
	};

  this.setEdit = function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_EDIT) {
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_DETAIL);
    }
    return mode;
  };
	
  this.setDisplay = function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_DISPLAY) {
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_DETAIL);
    }
    return mode;
  };

	this.switchType = function(typeName) {
		//alert("DataObjectsListMediator/switchType - typeName: "+typeName);
		return this;
	};

  this.getType = function(object) {
    var result = object.getModelEntity().getModelType().getType();
		//alert("DataObjectsListMediator/getType - type: "+result);
    return result;
  };

	this.getLastNavigation = function() {
		return (this.parent())?this.parent():SjamayeeFacade.OLIST_DATA_HOME;
	};
	
	this.firstPage = function() {
		Utils.alert("DataObjectsListMediator/firstPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
		    this.parent();
		    this.fillList(this.entityProxy.firstPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.HOME_MESSAGE_TEXT);		    
		    this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		  }
		} catch(error) {
			Utils.alert("DataObjectsListMediator/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.previousPage = function() {
		Utils.alert("DataObjectsListMediator/previousPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {		  
		    this.parent();
		    this.fillList(this.entityProxy.previousPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.PREVIOUS_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		  }
		} catch(error) {
			Utils.alert("DataObjectsListMediator/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.previousLine = function() {
		Utils.alert("DataObjectsListMediator/previousLine");
		try {
		  this.parent();
		  this.fillList(this.entityProxy.previousLine(this.getEndOfList()));
			this.setMessageText(ObjectsListMediator.UP_MESSAGE_TEXT);
		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		} catch(error) {
			Utils.alert("DataObjectsListMediator/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.nextLine = function() {
		Utils.alert("DataObjectsListMediator/nextLine");
		try {
		  this.parent();
		  this.fillList(this.entityProxy.nextLine(this.getEndOfList()));
			this.setMessageText(ObjectsListMediator.DOWN_MESSAGE_TEXT);
		  this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		} catch(error) {
			Utils.alert("DataObjectsListMediator/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.nextPage = function() {
		Utils.alert("DataObjectsListMediator/nextPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {		  
		    this.parent();
		    this.fillList(this.entityProxy.nextPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.NEXT_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		  }
		} catch(error) {
			Utils.alert("DataObjectsListMediator/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.lastPage = function() {
		Utils.alert("DataObjectsListMediator/lastPage");
		try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {		  
		    this.parent();
		    this.fillList(this.entityProxy.lastPage(this.getEndOfList()));
  			this.setMessageText(ObjectsListMediator.END_MESSAGE_TEXT);
		    this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
		  }
		} catch(error) {
			Utils.alert("DataObjectsListMediator/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
  this.setResizeButtonText = function(text) {
  	this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;    
  };
  
	this.setListSize = function(listSize) {
	  //alert("DataObjectsListMediator/setListSize - listSize: "+listSize);
	  this.parent(listSize);
	  var parentDetail = this.facade.retrieveMediator(DataParentDetailMediator.ID).getViewComponent();
	  var childDetail = this.facade.retrieveMediator(DataChildDetailMediator.ID).getViewComponent();
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
DataObjectsListMediator = new Class(new DataObjectsListMediator());
DataObjectsListMediator.ID = "DataObjectsListMediator";