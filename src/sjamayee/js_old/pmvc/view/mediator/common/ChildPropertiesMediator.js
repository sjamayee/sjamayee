//Abstract
var ChildPropertiesMediator = function() {
	this.Extends = AttributeListMediator;
	
	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};

	this.setLine = function(line) {
		try {
			this.line = line;
			this.setChildLine(this.getLine());
		} finally {
			//$(ChildProperties.ID+AttributeListUIComponent.VALUE_ID+"6D").focus();
			$(this.getViewComponent().getValueCellId(6)).focus();
		}
	};

	this.onKeyPress = function()		{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS); };
	this.onListClick = function()		{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_CLICK); };
	this.onLineClick = function(evt){	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK, evt); };
	this.onEscape = function()			{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE); };
	this.onSpace = function()		  	{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE); };
	this.onEnter = function()				{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER); };
	this.onHome = function()		  	{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME); };
	this.onPrevious = function()  	{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS); };
	this.onUp = function()			  	{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP); };
	this.onDown = function()		  	{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN); };
	this.onNext = function()		  	{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT); };
	this.onEnd = function()		  		{	this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END); };
	this.onNameClick = function()	{
		this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK);
	};
	this.onValueClick = function() {
		this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK);
	};
	this.onLineMouseOver = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ChildPropertiesMediator/onLineMouseOver - target/id: "+id+" line: "+line);
		var attributeList = this.getViewComponent();
		$(attributeList.getNameCellId(line)).setAttribute("style","background-color:lightgray;");
		$(attributeList.getValueCellId(line)).setAttribute("style","background-color:lightgray;");
	};
	this.onLineMouseOut = function(evt) {
	  var id = evt.target.id;
  	var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
	  //alert("ChildPropertiesMediator/onLineMouseOut - target/id: "+id+" line: "+line);
		var attributeList = this.getViewComponent();
		$(attributeList.getNameCellId(line)).setAttribute("style","background-color:inherit;");
		$(attributeList.getValueCellId(line)).setAttribute("style","background-color:inherit;");
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_CLICK,
			SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK,
			SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK,
			SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT,
			SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var attributeList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS:
			alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_KEYPRESS");
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_CLICK:
		  alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_CLICK");
			this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ACTIVATE);
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK:
			var evt = note.getBody();
			this.setCurrentLine(evt);
			//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LINE_CLICK - id: "+evt.target.id);
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK:
		//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_NAME_CLICK");
			break;			
			case SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK:
		//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_VALUE_CLICK");
			break;			
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE:
			alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_ESCAPE");
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE:
			alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_SPACE");
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER:
			alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_ENTER - line: "+this.getLine());
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME:
			this.home();
		//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_HOME - line: "+this.getLine());
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS:
			alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_PREVIOUS - line: "+this.getLine());
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP:
			this.lineUp();
		//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_UP - line: "+this.getLine());
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN:
			this.lineDown();
		//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_DOWN - line: "+this.getLine());
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT:
			alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_NEXT");
			break;
			case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END:
			this.end();
		//alert("ChildPropertiesMediator/handleNotification - CHILD_ATTRIBUTE_LIST_END - line: "+this.getLine());
			break;
		}
	};
};
ChildPropertiesMediator = new Class(new ChildPropertiesMediator());
