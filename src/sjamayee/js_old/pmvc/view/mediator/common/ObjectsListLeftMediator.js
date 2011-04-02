var ObjectsListLeftMediator = function() {
	this.Extends = GridListMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ObjectsListLeftMediator.ID,viewComponent);
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
		list.addEvent(SjamayeeFacade.OLIST_HOME, this.onHome);
		//list.addEvent(SjamayeeFacade.LIST_HOME, this.onHome);
		list.addEvent(SjamayeeFacade.OLIST_PREVIOUS, this.onPrevious);
		list.addEvent(SjamayeeFacade.OLIST_UP, this.onUp);
		list.addEvent(SjamayeeFacade.OLIST_DOWN, this.onDown);
		list.addEvent(SjamayeeFacade.OLIST_NEXT, this.onNext);
		list.addEvent(SjamayeeFacade.OLIST_END, this.onEnd);			
		//list.addEvent(SjamayeeFacade.LIST_END, this.onEnd);			
	};

	this.onListClick = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_CLICK); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_CLICK); }
	};
	this.onLineClick = function(evt) {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_LINE_CLICK, evt); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_LINE_CLICK, evt); }
	};
//this.onKeyPress = function()			{	this.sendNotification(SjamayeeFacade.OLIST_KEYPRESS); };
	this.onEscape = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_ESCAPE); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_ESCAPE); }
	};
	this.onSpace = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_SPACE); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_SPACE); }
	};
	this.onEnter = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_ENTER); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_ENTER); }
	};
	this.onHome = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_HOME); }
	};
	this.onPrevious = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_PREVIOUS); }
	};
	this.onUp = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_UP); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_UP); }
	};
	this.onDown = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_DOWN); }
	};
	this.onNext = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_NEXT); }	
	};
	this.onEnd = function()						{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.OLIST_DATA_END); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.OLIST_MODEL_END); }
	};
	this.onKeyDown = function(leftRight, subEvent)	{
	  //alert("ObjectsListLeftMediator/onKeyDown - leftRight: "+leftRight+" subEvent: "+subEvent);
	  if (leftRight != ObjectsListLeft.ID) { return; }
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
ObjectsListLeftMediator = new Class(new ObjectsListLeftMediator());
ObjectsListLeftMediator.ID = "ObjectsListLeftMediator";