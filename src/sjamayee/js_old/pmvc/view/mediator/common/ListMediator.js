//Abstract
var ListMediator = function() {
	this.Extends = PagingMediator;
	this.list = null;
	this.listObject = null;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.onListClick = this.onListClick.bindWithEvent(this);
		this.onLineClick = this.onLineClick.bindWithEvent(this);
  	this.onLineMouseOver = this.onLineMouseOver.bindWithEvent(this);
  	this.onLineMouseOut = this.onLineMouseOut.bindWithEvent(this);		
		this.onKeyDown = this.onKeyDown.bindWithEvent(this);
		this.onKeyPress = this.onKeyPress.bindWithEvent(this);
		this.onEscape = this.onEscape.bindWithEvent(this);
		this.onSpace = this.onSpace.bindWithEvent(this);
		this.onEnter = this.onEnter.bindWithEvent(this);
		this.onHome = this.onHome.bindWithEvent(this);
		this.onPrevious = this.onPrevious.bindWithEvent(this);
		this.onUp = this.onUp.bindWithEvent(this);
		this.onDown = this.onDown.bindWithEvent(this);
		this.onNext = this.onNext.bindWithEvent(this);
		this.onEnd = this.onEnd.bindWithEvent(this);
		var list = this.getViewComponent();
		list.addEvent(SjamayeeFacade.LIST_CLICK, this.onListClick);
		list.addEvent(SjamayeeFacade.LIST_LINE_CLICK, this.onLineClick);
    list.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, this.onLineMouseOver);
    list.addEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, this.onLineMouseOut);
		list.addEvent(SjamayeeFacade.LIST_KEYDOWN, this.onKeyDown);
		list.addEvent(SjamayeeFacade.LIST_KEYPRESS, this.onKeyPress);
		list.addEvent(SjamayeeFacade.LIST_ESCAPE, this.onEscape);
		list.addEvent(SjamayeeFacade.LIST_SPACE, this.onSpace);
		list.addEvent(SjamayeeFacade.LIST_ENTER, this.onEnter);
		list.addEvent(SjamayeeFacade.LIST_HOME, this.onHome);
		list.addEvent(SjamayeeFacade.LIST_PREVIOUS, this.onPrevious);
		list.addEvent(SjamayeeFacade.LIST_UP, this.onUp);
		list.addEvent(SjamayeeFacade.LIST_DOWN, this.onDown);
		list.addEvent(SjamayeeFacade.LIST_NEXT, this.onNext);
		list.addEvent(SjamayeeFacade.LIST_END, this.onEnd);
	};

	this.onListClick = function()				 { this.sendNotification(SjamayeeFacade.LIST_CLICK); };
	this.onLineClick = function()				 { this.sendNotification(SjamayeeFacade.LIST_LINE_CLICK); };
	this.onLineMouseOver = function(evt) {}; //alert("ListMediator/onLineMouseOver"); };
	this.onLineMouseOut = function(evt)  {}; // alert("ListMediator/onLineMouseOut"); };
	this.onKeyPress = function()				 { this.sendNotification(SjamayeeFacade.LIST_KEYPRESS); };
	this.onEscape = function()		  		 { this.sendNotification(SjamayeeFacade.LIST_ESCAPE); };
	this.onSpace = function()		  			 { this.sendNotification(SjamayeeFacade.LIST_SPACE); };
	this.onEnter = function()			  		 { this.sendNotification(SjamayeeFacade.LIST_ENTER); };
	this.onHome = function()		  			 { this.sendNotification(SjamayeeFacade.LIST_HOME); };
	this.onPrevious = function()  			 { this.sendNotification(SjamayeeFacade.LIST_PREVIOUS); };
	this.onUp = function()			  			 { this.sendNotification(SjamayeeFacade.LIST_UP); };
	this.onDown = function()		  			 { this.sendNotification(SjamayeeFacade.LIST_DOWN); };
	this.onNext = function()		  			 { this.sendNotification(SjamayeeFacade.LIST_NEXT); };
	this.onEnd = function()		  				 { this.sendNotification(SjamayeeFacade.LIST_END); };
	this.onKeyDown = function(subEvent)	 {
	  alert("ListMediator/onKeyDown - subEvent: "+subEvent);
	/*var list = this.getViewComponent();
		switch (subEvent)	{
			case SjamayeeFacade.ESCAPE:
			list.fireEvent(SjamayeeFacade.LIST_ESCAPE, this.onEscape);
			break;
			case SjamayeeFacade.SPACE:
			list.fireEvent(SjamayeeFacade.LIST_SPACE, this.onSpace);
			break;
			case SjamayeeFacade.ENTER:
			list.fireEvent(SjamayeeFacade.LIST_ENTER, this.onEnter);
			break;
			case SjamayeeFacade.HOME:
			list.fireEvent(SjamayeeFacade.LIST_HOME, this.onHome);
			break;
			case SjamayeeFacade.PREVIOUS:
			list.fireEvent(SjamayeeFacade.LIST_PREVIOUS, this.onPrevious);
			break;
			case SjamayeeFacade.UP:
			list.fireEvent(SjamayeeFacade.LIST_UP, this.onUp);
			break;
			case SjamayeeFacade.DOWN:
			list.fireEvent(SjamayeeFacade.LIST_DOWN, this.onDown);
			break;
			case SjamayeeFacade.NEXT:
			list.fireEvent(SjamayeeFacade.LIST_NEXT, this.onNext);
			break;
			case SjamayeeFacade.END:
			list.fireEvent(SjamayeeFacade.LIST_END, this.onEnd);
			break;
		}*/
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.LIST_HOME,
			SjamayeeFacade.LIST_END
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var list = this.getViewComponent();
		switch (note.getName())	{	}
	};
	
  this.getList = function() {
    return this.list;
  };
  
  this.setList = function(list) {
    this.list = list;
  };
  
	this.getListObject = function() {
	  if (this.listObject === undefined) {
	    this.listObject = null;
	  }
	  return this.listObject;
	};
	
  this.setListObject = function(listObject) {
    this.listObject = listObject;
  };
};
ListMediator = new Class(new ListMediator());
