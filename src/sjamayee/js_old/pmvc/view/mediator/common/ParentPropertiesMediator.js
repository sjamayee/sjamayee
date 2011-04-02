//Abstract
var ParentPropertiesMediator = function() {
	this.Extends = AttributeListMediator;
	
	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};

	this.setLine = function(line) {
		try {
			this.line = line;
			this.setParentLine(this.getLine());
		} finally {
			//$(ParentProperties.ID+AttributeListUIComponent.VALUE_ID+"4D").focus();
			$(this.getViewComponent().getValueCellId(4)).focus();
		}
	};

	this.onKeyPress = function()		{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS); };
	this.onListClick = function()	 	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_CLICK); };
	this.onLineClick = function(evt){	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK, evt); };
	this.onEscape = function()			{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE); };
	this.onSpace = function()		  	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE); };
	this.onEnter = function()				{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER); };
	this.onHome = function()		  	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME); };
	this.onPrevious = function()  	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS); };
	this.onUp = function()			  	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP); };
	this.onDown = function()		  	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN); };
	this.onNext = function()		  	{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT); };
	this.onEnd = function()		  		{	this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END); };
	this.onNameClick = function()	{
		this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK);
	};
	this.onValueClick = function() {
		this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK);
	};
	this.onLineMouseOver = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ParentPropertiesMediator/onLineMouseOver - target/id: "+id+" line: "+line);
		var attributeList = this.getViewComponent();
		$(attributeList.getNameCellId(line)).setAttribute("style","background-color:lightgray;");
		$(attributeList.getValueCellId(line)).setAttribute("style","background-color:lightgray;");
	};
	this.onLineMouseOut = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ParentPropertiesMediator/onLineMouseOut - target/id: "+id+" line: "+line);
		var attributeList = this.getViewComponent();
		$(attributeList.getNameCellId(line)).setAttribute("style","background-color:inherit;");
		$(attributeList.getValueCellId(line)).setAttribute("style","background-color:inherit;");
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_CLICK,
			SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK,
			SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK,
			SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT,
			SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var attributeList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS:
			alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_KEYPRESS");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_CLICK:
		  alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_CLICK");
			this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ACTIVATE);
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK:
			var evt = note.getBody();
			this.setCurrentLine(evt);
			//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LINE_CLICK - id: "+evt.target.id);
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK:
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_NAME_CLICK");
			break;			
			case SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK:
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_VALUE_CLICK");
			break;			
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE:
			alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_ESCAPE");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE:
			alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_SPACE");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER:
			alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_ENTER - line: "+this.getLine());
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME:
			this.home();
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_HOME");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS:
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_PREVIOUS");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP:
			this.lineUp();
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_UP");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN:
			this.lineDown();
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_DOWN");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT:
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_NEXT");
			break;
			case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END:
			this.end();
		//alert("ParentPropertiesMediator/handleNotification - PARENT_ATTRIBUTE_LIST_END");
			break;
		}
	};
};
ParentPropertiesMediator = new Class(new ParentPropertiesMediator());
