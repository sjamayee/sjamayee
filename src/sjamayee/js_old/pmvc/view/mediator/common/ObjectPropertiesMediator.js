//Abstract
var ObjectPropertiesMediator = function() {
	this.Extends = AttributeListMediator;
	this.type = null;
	this.topOid = null;
	this.bottomOid = null;
	this.currentOid = null;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	//alert("ObjectPropertiesMediator/initialize - lineSaved: "+this.getLineSaved());
	};

	this.onKeyPress = function()	 	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS); };
	this.onListClick = function()	 	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_CLICK); };
	this.onLineClick = function(evt){	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK, evt); };
	this.onEscape = function()		 	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE); };
	this.onSpace = function()		   	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE); };
	this.onEnter = function()			 	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER); };
	this.onHome = function()		   	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME); };
	this.onPrevious = function()   	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS); };
	this.onUp = function()			  	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP); };
	this.onDown = function()		   	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN); };
	this.onNext = function()		   	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT); };
	this.onEnd = function()		  	 	{	this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END); };
	this.onNameClick = function()	 {
		this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK);
	};
	this.onValueClick = function() {
		this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK);
	};
	this.onLineMouseOver = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ObjectPropertiesMediator/onLineMouseOver - target/id: "+id+" line: "+line);
		var attributeList = this.getViewComponent();
		$(attributeList.getNameCellId(line)).setAttribute("style","background-color:lightgray;");
		$(attributeList.getValueCellId(line)).setAttribute("style","background-color:lightgray;");
	};
	this.onLineMouseOut = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ObjectPropertiesMediator/onLineMouseOut - target/id: "+id+" line: "+line);
		var attributeList = this.getViewComponent();
		$(attributeList.getNameCellId(line)).setAttribute("style","background-color:inherit;");
		$(attributeList.getValueCellId(line)).setAttribute("style","background-color:inherit;");
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
		  //SjamayeeFacade.OBJECT_DETAIL,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_CLICK,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK,
			SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK,
			SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT,
			SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var attributeList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OBJECT_DETAIL:
			//alert("ObjectPropertiesMediator/handleNotification - OBJECT_DETAIL");
  		//Initialize list.
  		//this.setList(new AttributeList(object));
  		//this.setList(object.getSfdcAttributes());
			//alert("ObjectPropertiesMediator/handleNotification - OBJECT_DETAIL - object:\n"+object.print()+"\nattributeList: "+this.getList());
  		this.setBeginOfList(1);
  		this.setEndOfList(AttributeListUIComponent.PAGE_SIZE);
  		this.home();
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS:
			alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_KEYPRESS");
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_CLICK:
		//alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_CLICK");
			this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ACTIVATE);
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK:
			var evt = note.getBody();
			this.setCurrentLine(evt);
			//alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LINE_CLICK - id: "+evt.target.id);
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK:
		//alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_NAME_CLICK");
			break;			
			case SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK:
		//alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_VALUE_CLICK");
			break;			
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE:
			alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_ESCAPE");
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE:
			alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_SPACE");
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER:
			alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_ENTER - line: "+this.getLine()+" type: "+this.getType());
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME:
		  //alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_HOME - line: "+this.getLine());
		  this.home();
      this.firstPage();
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS:
		  //alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_PREVIOUS");
      this.previousPage();
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP:
  		//alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_UP");
			this.lineUp();
      this.previousLine();
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN:
  		//alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_DOWN");
			this.lineDown();
      this.nextLine();
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT:
		  //alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_NEXT");
      this.nextPage();
			break;
			case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END:
  		alert("ObjectPropertiesMediator/handleNotification - OBJECT_ATTRIBUTE_LIST_END");
			this.end();
      this.lastPage();
			break;
		}
	};
	
	this.setType = function(type) {
		this.type = type;
		switch (this.type) {
			case AttributeListMediator.TYPE_OBJECT:
			this.setLine(this.getObjectLine());
			break;
			case AttributeListMediator.TYPE_PARENT:
			this.setLine(this.getParentLine());
			break;
			case AttributeListMediator.TYPE_CHILD:
			this.setLine(this.getChildLine());
			break;
		}
	};
	
	this.getType = function() {
		return this.type;
	};
/*
	this.setLine = function(line) {
		try {
			this.line = line;
			var type = this.getType();
			if (type) {
				switch (type) {
					case AttributeListMediator.TYPE_OBJECT:
					this.setObjectLine(this.getLine());
					break;
					case AttributeListMediator.TYPE_PARENT:
					this.setParentLine(this.getLine());
					//var parentPropertiesMediator = this.facade.retrieveMediator(ParentPropertiesMediator.ID);
					//parentPropertiesMediator.setLine(this.getLine());
					break;
					case AttributeListMediator.TYPE_CHILD:
					this.setChildLine(this.getLine());
					//var childPropertiesMediator = this.facade.retrieveMediator(ChildPropertiesMediator.ID);
					//childPropertiesMediator.setLine(this.getLine());
					break;
				}
			}
		} finally {
			$(this.getViewComponent().getNameCellId(2)).focus();
		//$(ObjectProperties.ID+AttributeListUIComponent.NAME_ID+"2D").focus();
		//$(ObjectProperties.ID+AttributeListUIComponent.VALUE_ID+"2D").focus();
		}
	};
*/
	this.firstPage = function() {
		//alert("ObjectPropertiesMediator/firstPage");
		try {
			var attributeList = this.getList(); //.getCache();
  		//alert("ObjectPropertiesMediator/firstPage - attributeList: "+attributeList);
			if (attributeList) {
				//attributeList.firstPage();
				//Fill list.
				this.fillList(List.METHOD_FIRST,null);
			}
		} catch(error) {
			Utils.alert("ObjectPropertiesMediator/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.previousPage = function() {
		Utils.alert("ObjectPropertiesMediator/previousPage");
		try {
			var attributeList = this.getList(); //.getCache();
			if (attributeList) {
				//attributeList.previousPage();
				//Fill list.
				this.fillList(List.METHOD_PREVIOUS,this.getTopOid());
			}
		} catch(error) {
			Utils.alert("ObjectPropertiesMediator/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.previousLine = function() {
		Utils.alert("ObjectPropertiesMediator/previousLine");
		try {
			var attributeList = this.getList(); //.getCache();
			if (attributeList) {
				//attributeList.previousLine();
				//Fill list.
				this.fillList(List.METHOD_PREVIOUS,this.getBottomOid());
			}
		} catch(error) {
			Utils.alert("ObjectPropertiesMediator/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.nextLine = function() {
		Utils.alert("ObjectPropertiesMediator/nextLine");
		try {
			var attributeList = this.getList(); //.getCache();
			if (attributeList) {
				//attributeList.nextLine();
				//Fill list.
				this.fillList(List.METHOD_NEXT,this.getTopOid());
			}
		} catch(error) {
			Utils.alert("ObjectPropertiesMediator/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.nextPage = function() {
		Utils.alert("ObjectPropertiesMediator/nextPage");
		try {
			var attributeList = this.getList(); //.getCache();
			if (attributeList) {
				//attributeList.nextPage();
				//Fill list.
				this.fillList(List.METHOD_NEXT,this.getBottomOid());
			}
		} catch(error) {
			Utils.alert("ObjectPropertiesMediator/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	
	this.lastPage = function() {
		Utils.alert("ObjectPropertiesMediator/lastPage");
		try {
			var attributeList = this.getList(); //.getCache();
			if (attributeList) {
				//attributeList.lastPage();
				//Fill list.
				this.fillList(List.METHOD_LAST,null);
			}
		} catch(error) {
			Utils.alert("ObjectPropertiesMediator/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};

	this.fillList = function(method,oid) {
		//alert("ObjectPropertiesMediator/fillList - method: "+method+" oid: "+oid);
		var result = false;
		var initial = true;
		var oidOk = false;
		var beginValue = 0;
		var endValue = 0;
		var step = 1;
		var i = 0;
		var i1 = 0;
		var iMax = this.getEndOfList();
		var j = 0;
		var oids = null;
		try {
			var attributes = this.getList(); //.getCache().getCache();
			if (attributes) {
				if ((method == List.METHOD_FIRST) ||
				    (method == List.METHOD_NEXT) ||
				    (method == List.METHOD_DOWN)) {
					//DOWN!
					endValue = (attributes.length - 1);
					if (method == List.METHOD_DOWN) {
						iMax = 0;
					}
				} else if ((method == List.METHOD_UP) ||
  				         (method == List.METHOD_PREVIOUS) ||
  				         (method == List.METHOD_LAST)) {
          //UP!
					beginValue = (attributes.length - 1);
					step = -1;
					i = this.getEndOfList();
					if (method == List.METHOD_UP) {
						i = 0;
					}
					iMax = 0;
				}
			  //alert("2ObjectPropertiesMediator/fillList"+"\nmethod: "+method+"\noid: "+oid+"\nbeginValue: "+beginValue+
				//		  " - endValue: "+endValue+"\nattributes: length("+attributes.length+")\n"+oids);
  			for (j = beginValue; j != (endValue + step); j = (j + step)) {
					//var listObject = attributes[j];
					var attribute = attributes[j];
					//alert("3ObjectPropertiesMediator/fillList - for/attribute: "+attribute);
					//alert("3ObjectPropertiesMediator/fillList - for/listObect: "+listObject);
				  //if (j == beginValue) { alert("3ObjectPropertiesMediator/fillList - for/listObject"+listObject.print()+"\nlistObjectId: "+listObject.getId()); }
					//var attribute = listObject.getObject();
					if (oidOk === false) {
						if (oid === null) {
							oidOk = true;
						} else {
							oidOk = (attribute.getId() == oid)?true:false;
							continue;
						}
					}
					if (oidOk === false) { continue; }

				  if (method == List.METHOD_FIRST) {
						if (initial === true) {
              this.setTopOid(attribute.getId());
						}
					  this.setBottomOid(attribute.getId());
  				} else if ((method == List.METHOD_NEXT) || (method == List.METHOD_DOWN)) {
						if (initial === true) {
							this.setTopOid(attribute.getId());
						}
						this.setBottomOid(attribute.getId());
  				} else if ((method == List.METHOD_PREVIOUS) || (method == List.METHOD_UP)){
						if (initial === true) {
							this.setBottomOid(attribute.getId());
						}
						this.setTopOid(attribute.getId());
  				} else if (method == List.METHOD_LAST) {
						if (initial === true) {
              this.setBottomOid(attribute.getId());
						}
						this.setTopOid(attribute.getId());
  				}
					//Set current line.
					if (i == this.getLine()) {
						this.setCurrentOid(attribute.getId());
					}
					this.fillOneLine(i,this.getLine(),attribute);
					initial = false;
					if (i == iMax) {
						result = true;    //Page OK.
						initial = result;
						break;
					}
					i = (i + step);
				}
				//Clear the remaining lines!!!
				if (initial === false) {
					if (i != (iMax + step)) {
						var j1 = 0;
						for (i; i != (iMax + step); i = (i + step)) {
							this.clearOneLine(i);
							j1++;
							if (j1 > this.getEndOfList()) { break; }
						}
					} else {
						/////////////////////////////////////////////////////////////////////////////////
						//TODO: First/Last page WITHOUT initialisation (keeps fast paging UP/DOWN !!!) //
						/////////////////////////////////////////////////////////////////////////////////
						//Align display on top of list (when Page NOK) !!!
						//if (this.getCache().getEndOfData()) {
						if (this.getList().getEndOfData()) {
							if ((method == List.METHOD_UP) ||
									(method == List.METHOD_PREVIOUS) ||
									(method == List.METHOD_LAST)) {
								this.firstPage();
								oids = "";
								i1 = 0;
								for (i1 in attributes) {
									if (attributes[i1]) {
										oids += "\n"+i1+": "+attributes[i1].getId();
									}
								}
								Utils.alert("6ObjectPropertiesMediator/fillList - align/firstPage !!!"+
											      "\nmethod: "+method+
											      "\noid: "+oid+
											      "\nbeginValue: "+beginValue+" - endValue: "+endValue+
											      "\n\nattributes: length("+attributes.length+")"+oids);
								return result;
							} else if ((method == List.METHOD_NEXT) ||
									 			 (method == List.METHOD_DOWN)) {
								this.lastPage();
								oids = "";
								i1 = 0;
								for (i1 in attributes) {
									if (attributes[i1]) {
										oids += "\n"+i1+": "+attributes[i1].getId();
									}
								}
								Utils.alert("7ObjectPropertiesMediator/fillList - align/lastPage !!!"+
											      "\nmethod: "+method+
											      "\noid: "+oid+
											      "\nbeginValue: "+beginValue+" - endValue: "+endValue+
											      "\n\nattributes: length("+attributes.length+")"+oids);
								return result;
							}
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("8ObjectPropertiesMediator/fillList Error: "+error.message+
			            "\nmethod: "+method+"\noid: "+oid+"\niMax="+iMax+"\ni="+i);
		} finally {
			return result;
		}
	};

	this.fillOneLine = function(index,currentIndex,attribute) {
		try {
			if (attribute) {
			//alert("ObjectPropertiesMediator/fillOneLine - index: "+index+" currentIndex: "+currentIndex+" attribute: "+attribute+"\nattribute:\n"+attribute.print());
/*
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
				var reference = '<a id="'+ObjectsListLeft.REF_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+listObject.getReferences()+'</a>';
			  var name = '<a id="'+ObjectsListLeft.NAME_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getNameTranslated()+'</a>';
			//var name = '<a id="'+ObjectsListLeft.NAME_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getName()+' ('+object.getId()+')'+'</a>';
			//var type = object.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;float:left;padding:0px 1px 0px 0px;")+ //0px 3px 0px 3px;")+
			//			 		 '<a id="'+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
      //var type = '<a id="'+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
        var type = '<a id="'+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getType()+'</a>'; //getType()  // TEST NULL!!!
				var description = '<a id="'+ObjectsListRight.DESC_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getDescTranslated()+'</a>';

  			this.getObjectsListLeft().setCell((ObjectsListLeft.REF_COLUMN_ID+"0"+index),reference);
  			this.getObjectsListLeft().setCell((ObjectsListLeft.NAME_COLUMN_ID+"0"+index),name);
  			this.getObjectsListLeft().setCell((ObjectsListLeft.TYPE_COLUMN_ID+"0"+index),type);
  			this.getObjectsListRight().setCell((ObjectsListRight.DESC_COLUMN_ID+"0"+index),description);
*/
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
			Utils.alert("ObjectPropertiesMediator/fillOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};

	this.clearOneLine = function(index) {
		Utils.alert("ObjectPropertiesMediator/clearOneLine - index: "+index);
		try {
/*		  
			var objectLineClass = ObjectsListMediator.NORMAL_LINE_CLASS_ID;
			var cellClass = ObjectsListMediator.CELL_CLASS_ID;
			var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
			if (index === 0) {
				cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
				cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
			}
			this.getObjectsListLeft().setCell((ObjectsListLeft.REF_COLUMN_ID+"0"+index),"&nbsp;");
			this.getObjectsListLeft().setCell((ObjectsListLeft.NAME_COLUMN_ID+"0"+index),"&nbsp;");
			this.getObjectsListLeft().setCell((ObjectsListLeft.TYPE_COLUMN_ID+"0"+index),"&nbsp;");
			this.getObjectsListRight().setCell((ObjectsListRight.DESC_COLUMN_ID+"0"+index),"&nbsp;");
*/
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
			Utils.alert("ObjectPropertiesMediator/clearOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};

	this.getTopOid = function() {
	  if (this.topOid === undefined) {
	    this.topOid = null;
	  }
	  return this.topOid;
	};

  this.setTopOid = function(oid) {
    this.topOid = oid;
  };

	this.getBottomOid = function() {
	  if (this.bottomOid === undefined) {
	    this.bottomOid = null;
	  }
	  return this.bottomOid;
	};

  this.setBottomOid = function(oid) {
    this.bottomOid = oid;
  };

	this.getCurrentOid = function() {
	  if (this.currentOid === undefined) {
	    this.currentOid = null;
	  }
	  return this.currentOid;
	};

  this.setCurrentOid = function(oid) {
    this.currentOid = oid;
  };
};
ObjectPropertiesMediator = new Class(new ObjectPropertiesMediator());
