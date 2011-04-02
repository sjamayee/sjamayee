//Abstract
var AttributeListMediator = function() {
	this.Extends = ListMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.onListClick = this.onListClick.bindWithEvent(this);
		this.onNameClick = this.onNameClick.bindWithEvent(this);
		this.onValueClick = this.onValueClick.bindWithEvent(this);
		var attributeList = this.getViewComponent();
		attributeList.addEvent(SjamayeeFacade.ATTRIBUTE_LIST_CLICK, this.onListClick);
		attributeList.addEvent(SjamayeeFacade.ATTRIBUTE_NAME_CLICK, this.onNameClick);
		attributeList.addEvent(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK, this.onValueClick);
  	attributeList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, this.onLineMouseOver);
  	attributeList.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, this.onLineMouseOut);
		//Initialize list.
		this.setBeginOfList(1);
		this.setEndOfList(AttributeListUIComponent.PAGE_SIZE);
		this.home();
	};
	
	this.onListClick = function()	 { this.sendNotification(SjamayeeFacade.ATTRIBUTE_LIST_CLICK); };
	this.onNameClick = function()	 {
		this.sendNotification(SjamayeeFacade.ATTRIBUTE_NAME_CLICK);
	};
	this.onValueClick = function() {
		this.sendNotification(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK);
	};
	this.onLineMouseOver = function(evt) { alert("AttributeListMediator/onLineMoueOver"); };
	this.onLineMouseOut = function(evt)  { alert("AttributeListMediator/onLineMouseOut"); };
};
AttributeListMediator = new Class(new AttributeListMediator());
AttributeListMediator.TYPE_OBJECT = "OBJECT";
AttributeListMediator.TYPE_PARENT = "PARENT";
AttributeListMediator.TYPE_CHILD = "CHILD";
