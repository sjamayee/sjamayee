//Abstract
var ObjectsListMediator = function() {
	this.Extends = GridListMediator;
	this.viewComponentLeft = null;
	this.viewComponentRight = null;
	this.objectsListLeft = null;
	this.objectsListRight = null;
  this.pageSize = null;
  this.entityProxy = null;
  this.lastNavigation = null;
  this.messageText = null;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	  var gridList = this.getViewComponent();	  
		//Initialize list.
		this.setBeginOfList(0);
		this.setPageSize(ObjectsListMediator.PAGE_SIZE_MIN);
		this.setEndOfList(this.getPageSize() - 1);
	};

	this.getObjectsListLeft = function() {
	  if (this.objectsListLeft === null) {
      if (this instanceof ModelObjectsListMediator) {
    		this.objectsListLeft = this.getViewComponent().gridListSplitter.left.modelObjectsList;
      } else {
    		this.objectsListLeft = this.getViewComponent().gridListSplitter.left.dataObjectsList;
      }
    }
		return this.objectsListLeft;
	};

	this.getObjectsListRight = function() {
	  if (this.objectsListRight === null) {
      if (this instanceof ModelObjectsListMediator) {
    		this.objectsListRight = this.getViewComponent().gridListSplitter.right.modelObjectsList;
      } else {
    		this.objectsListRight = this.getViewComponent().gridListSplitter.right.dataObjectsList;
      }
    }
		return this.objectsListRight;
	};

  this.getViewComponentLeft = function() {
    if (this.viewComponentLeft === null) {
      if (this instanceof ModelObjectsListMediator) {
        this.viewComponentLeft = ModelObjectsListLeft.ID;
      } else {
        this.viewComponentLeft = DataObjectsListLeft.ID;
      }
    }
    return this.viewComponentLeft;
  };

  this.getViewComponentRight = function() {
    if (this.viewComponentRight === null) {
      if (this instanceof ModelObjectsListMediator) {
        this.viewComponentRight = ModelObjectsListRight.ID;
      } else {
        this.viewComponentRight = DataObjectsListRight.ID;
      }
    }
    return this.viewComponentRight;
  };

	this.setMessageText = function(messageText) {
	  if (this.messageText === null) {
	    var toolBar = null;
	    if (this instanceof ModelObjectsListMediator) {
	      toolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
	    } else {
	      toolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
	    }
      this.messageText = toolBar.messageText;
    }
    this.messageText.value = messageText;
	};

	this.lineEmpty = function(line) {
	  var value = this.getCellValue(line);
    return ((value === undefined) || (value === null) || (value.length == 0))?true:false;
  };

  //Abstract TODO ////////////////////////////////////////////////////////////////////////////////
  this.getNameCell = function(line) {
    //var listLeft = this.getViewComponentLeft();
    //var id = listLeft+ObjectsListLeft.NAME_COLUMN_ID+'0'+line;
    var id = this.getObjectsListLeft().getNameCellId(line);
    return $(id);
  };

  this.getCellValue = function(line) {
    var result = '';
    var name = this.getNameCell(line);
    if (name) {
      result = name.innerHTML;
    }
    //alert("ObjectsListMediator/getCellValue - id: "+name.id+" value: "+name.innerHTML);
    return result;
  };

	this.getPageSize = function()         {	return this.pageSize; };
  this.setPageSize = function(pageSize) { this.pageSize = pageSize; };
  
	this.listResize = function(listSize) {
	  if (listSize !== undefined) {
	    this.setListSize(listSize);
	  } else {
	    if (this.isListNormal() === true) {
	      this.setListSize(SjamayeeFacade.SIZE_FULL);
	    } else {
	      this.setListSize(SjamayeeFacade.SIZE_NORMAL);
	    }
	  }
	};

  this.isListNormal = function() {
    return (this.getListSize() == SjamayeeFacade.SIZE_NORMAL)?true:false;
  };

  this.isListFull = function() {
    return (this.getListSize() == SjamayeeFacade.SIZE_FULL)?true:false;
  };

  this.getMaxOfList = function() {
    return (ObjectsListMediator.PAGE_SIZE_MAX - 1);
  };

	this.getLastNavigation = function() {
	  return this.lastNavigation;
	};

  this.setLastNavigation = function(lastNavigation) {
    this.lastNavigation = lastNavigation;
  };
  
  //Abstract
  this.setResizeButtonText = function(text) {};
  
  //TODO: Abstract
	this.switchType = function(typeName) {
		//alert("ObjectsListMediator/switchType");
		return undefined;
	};

  //Abstract
  this.getType = function(object) { return null; };
  //this.filterObject = function(object) { return null; };

	this.fillList = function(page) {
	//alert("ObjectsListMediator/fillList - page/length: "+page.length);
		var j = 0;
		try {
			//var listObjects = this.getList().getListObjects();
			var listObjects = page;
			if (listObjects) {
  	    for (var i = 0; i < listObjects.length; i++) {
					var object = listObjects[i];
				  this.fillOneLine(j++,this.getLine(),object);
					if (j > this.getEndOfList()) { break; }
				}
			}
		} catch(error) {
			Utils.alert("ObjectsListMediator/fillList Error: "+error.message);
		} finally {
  		//alert("ObjectsListMediator/fillList - finally - page/length: "+page.length+" j: "+j+" xol: "+this.getMaxOfList());
			//Clear remaining lines.
			while (j <= this.getMaxOfList()) {
				this.clearOneLine(j++);
			}
			return this;
		}
	};

	this.fillOneLine = function(index,currentIndex,object) {
		//alert("ObjectsListMediator/fillOneLine - index: "+index+" currentIndex: "+currentIndex+" object:\n"+object.print());
		try {
			//Clear line.
			this.clearOneLine(index);
			if (object) {
				//alert("ObjectsListMediator/fillOneLine - name : "+name+" index: "+index+" currentIndex: "+currentIndex+" object:\n"+object.print());
				//Fill line.
				var cellClass = ObjectsListMediator.CELL_CLASS_ID;
				var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
				if (index === 0) {
					cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
					cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
				}
				//Normal line.
				var objectLineStyle = "background-color:inherit;font-weight:normal;";
				if (index == currentIndex) {
					//Current line - focused.
					//objectLineStyle = "background-color:lightgray;font-weight:bold;";
					objectLineStyle = "background-color:"+FontStyle.COLOR_LIGHTGRAY+";font-weight:bold;";
				}
        var listLeft = this.getObjectsListLeft();
        var listRight = this.getObjectsListRight();
				var reference = '<a id="'+listLeft.getRefAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getReferences()+'</a>';
			  var name = '<a id="'+listLeft.getNameAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getNameTranslated()+'</a>';
			//var name = '<a id="'+listLeft.getNameAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getName()+' ('+object.getId()+')'+'</a>';
			//var type = object.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;float:left;padding:0px 1px 0px 0px;")+ //0px 3px 0px 3px;")+
			//			 		 '<a id="'+listLeft.getTypeAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
      //var type = '<a id="'+listLeft.getTypeAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
        var dataType = this.getType(object);
        var type = '<a id="'+listLeft.getTypeAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+dataType+'</a>'; //getType()  // TEST NULL!!!
      //var type = '<a id="'+listLeft+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!          
				var description = '<a id="'+listRight.getDescAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getDescTranslated()+'</a>';

  			listLeft.setCell((listLeft.getRefCellId(index)),reference);
  			listLeft.setCell((listLeft.getNameCellId(index)),name);
  			listLeft.setCell((listLeft.getTypeCellId(index)),type);
  			listRight.setCell((listRight.getDescCellId(index)),description);
/*
				document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("class",cell01Class);
				document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle+"padding:1px 5px 1px 1px;text-align:right;");
				document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).innerHTML = reference;
				document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
				document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
				document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).innerHTML = name;
				document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
				document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
				document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).innerHTML = type;
				document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
				document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
				document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).innerHTML = description;
*/
			}
		} catch(error) {
			Utils.alert("ObjectsListMediator/fillOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};

	this.clearOneLine = function(index) {
		//alert("ObjectsListMediator/clearOneLine - index: "+index);
		try {
			var objectLineClass = ObjectsListMediator.NORMAL_LINE_CLASS_ID;
			var cellClass = ObjectsListMediator.CELL_CLASS_ID;
			var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
			if (index === 0) {
				cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
				cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
			}
      var listLeft = this.getObjectsListLeft();
      var listRight = this.getObjectsListRight();
			listLeft.setCell((listLeft.getRefCellId(index)),"&nbsp;");
			listLeft.setCell((listLeft.getNameCellId(index)),"&nbsp;");
			listLeft.setCell((listLeft.getTypeCellId(index)),"&nbsp;");
			listRight.setCell((listRight.getDescCellId(index)),"&nbsp;");
/*
			document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cell01Class);
			document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
			document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
			document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
			document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
			document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
			document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
			document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
*/
		} catch(error) {
			Utils.alert("ObjectsListMediator/clearOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ObjectsListMediator = new Class(new ObjectsListMediator());
ObjectsListMediator.PAGE_SIZE_MIN = 10;
ObjectsListMediator.PAGE_SIZE_MAX = 22;
ObjectsListMediator.NORMAL_LINE_CLASS_ID = "normalListLine";
ObjectsListMediator.FOCUSED_LINE_CLASS_ID = "focusedListLine";
ObjectsListMediator.CELL_CLASS_ID = "listCell";
ObjectsListMediator.CELL_01_CLASS_ID = "listCell01";
ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID = "listCellFirstLine";
ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID = "listCell01FirstLine";
ObjectsListMediator.CELL_CONTENT_CLASS_ID = "listCellContent";
ObjectsListMediator.COLUMN_CLASS_ID = "listColumn";
ObjectsListMediator.COLUMN_HEADER_CLASS_ID = "listColumnHeader";
ObjectsListMediator.COLUMN_HEADER_01_CLASS_ID = "listColumnHeader01";
ObjectsListMediator.HOME_MESSAGE_TEXT = "First page.";
ObjectsListMediator.PREVIOUS_MESSAGE_TEXT = "Previous page.";
ObjectsListMediator.UP_MESSAGE_TEXT = "Previous line.";
ObjectsListMediator.DOWN_MESSAGE_TEXT = "Next line.";
ObjectsListMediator.NEXT_MESSAGE_TEXT = "Next page.";
ObjectsListMediator.END_MESSAGE_TEXT = "Last page.";
