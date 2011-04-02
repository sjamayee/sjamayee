var ObjectsListRightMediator = function() {
	this.Extends = GridListMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ObjectsListRightMediator.ID,viewComponent);
		this.onListClick = this.onListClick.bindWithEvent(this);
		this.onLineClick = this.onLineClick.bindWithEvent(this);
		this.onKeyDown = this.onKeyDown.bindWithEvent(this);
	  //this.onKeyPress = this.onKeyPress.bindWithEvent(this);
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
		list.addEvent(SjamayeeFacade.OLIST_CLICK, this.onListClick);
		list.addEvent(SjamayeeFacade.OLIST_LINE_CLICK, this.onLineClick);
		list.addEvent(SjamayeeFacade.OLIST_KEYDOWN, this.onKeyDown);
	  //list.addEvent(SjamayeeFacade.OLIST_KEYPRESS, this.onKeyPress);
		list.addEvent(SjamayeeFacade.OLIST_ESCAPE, this.onEscape);
		list.addEvent(SjamayeeFacade.OLIST_SPACE, this.onSpace);
		list.addEvent(SjamayeeFacade.OLIST_ENTER, this.onEnter);
		//list.addEvent(SjamayeeFacade.OLIST_HOME, this.onHome);
		list.addEvent(SjamayeeFacade.LIST_HOME, this.onHome);
		list.addEvent(SjamayeeFacade.OLIST_PREVIOUS, this.onPrevious);
		list.addEvent(SjamayeeFacade.OLIST_UP, this.onUp);
		list.addEvent(SjamayeeFacade.OLIST_DOWN, this.onDown);
		list.addEvent(SjamayeeFacade.OLIST_NEXT, this.onNext);
		//list.addEvent(SjamayeeFacade.OLIST_END, this.onEnd);	
		list.addEvent(SjamayeeFacade.LIST_END, this.onEnd);	
	};

	this.onListClick = function()			{	this.sendNotification(SjamayeeFacade.OLIST_CLICK);	};
	this.onLineClick = function(evt)	{	this.sendNotification(SjamayeeFacade.OLIST_LINE_CLICK, evt);	};	
//this.onKeyPress = function()			{	this.sendNotification(SjamayeeFacade.OLIST_KEYPRESS); };
	this.onEscape = function()				{	this.sendNotification(SjamayeeFacade.OLIST_ESCAPE); };
	this.onSpace = function()					{	this.sendNotification(SjamayeeFacade.OLIST_SPACE); };
	this.onEnter = function()					{	this.sendNotification(SjamayeeFacade.OLIST_ENTER); };
	this.onHome = function() {
	  this.sendNotification(SjamayeeFacade.OLIST_HOME);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME,ObjectsListMediator.HOME_MESSAGE_TEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_HOME,ObjectsListMediator.HOME_MESSAGE_TEXT); }
	};
	this.onPrevious = function() {
	  this.sendNotification(SjamayeeFacade.OLIST_PREVIOUS);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS,ObjectsListMediator.PREVIOUS_MESSAGE_TEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_PREVIOUS,ObjectsListMediator.PREVIOUS_MESSAGE_TEXT); }
	};
	this.onUp = function() {
	  this.sendNotification(SjamayeeFacade.OLIST_UP);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_UP,ObjectsListMediator.UP_MESSAGE_TEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_UP,ObjectsListMediator.UP_MESSAGE_TEXT); }
	};
	this.onDown = function() {
	  this.sendNotification(SjamayeeFacade.OLIST_DOWN);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN,ObjectsListMediator.DOWN_MESSAGE_TEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_DOWN,ObjectsListMediator.DOWN_MESSAGE_TEXT); }
	};
	this.onNext = function() {
	  this.sendNotification(SjamayeeFacade.OLIST_NEXT);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT,ObjectsListMediator.NEXT_MESSAGE_TEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_NEXT,ObjectsListMediator.NEXT_MESSAGE_TEXT); }
  };
	this.onEnd = function()						{
	  this.sendNotification(SjamayeeFacade.OLIST_END);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_END,ObjectsListMediator.END_MESSAGE_TEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_END,ObjectsListMediator.END_MESSAGE_TEXT); }
	};
	this.onKeyDown = function(leftRight, subEvent)	{
	  //alert("ObjectsListRightMediator/onKeyDown - leftRight: "+leftRight+" subEvent: "+subEvent);
	  if (leftRight != ObjectsListRight.ID) { return; }
		var list = this.getViewComponent();
		switch (subEvent)	{
			case SjamayeeFacade.ESCAPE:
			list.fireEvent(SjamayeeFacade.OLIST_ESCAPE, this.onEscape);
			break;
			case SjamayeeFacade.SPACE:
			list.fireEvent(SjamayeeFacade.OLIST_SPACE, this.onSpace);
			break;
			case SjamayeeFacade.ENTER:
			list.fireEvent(SjamayeeFacade.OLIST_ENTER, this.onEnter);
			break;			
			case SjamayeeFacade.HOME:
			list.fireEvent(SjamayeeFacade.OLIST_HOME, this.onHome);
			break;
			case SjamayeeFacade.PREVIOUS:
			list.fireEvent(SjamayeeFacade.OLIST_PREVIOUS, this.onPrevious);
			break;
			case SjamayeeFacade.UP:
			list.fireEvent(SjamayeeFacade.OLIST_UP, this.onUp);
			break;
			case SjamayeeFacade.DOWN:
			list.fireEvent(SjamayeeFacade.OLIST_DOWN, this.onDown);
			break;
			case SjamayeeFacade.NEXT:
			list.fireEvent(SjamayeeFacade.OLIST_NEXT, this.onNext);
			break;
			case SjamayeeFacade.END:
			list.fireEvent(SjamayeeFacade.OLIST_END, this.onEnd);
			break;
		}
	};
};
ObjectsListRightMediator = new Class(new ObjectsListRightMediator());
ObjectsListRightMediator.ID = "ObjectsListRightMediator";
