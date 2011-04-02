var RelationsGridRightMediator = function() {
	this.Extends = GridListMediator;

	this.initialize = function(viewComponent)	{
		this.parent(RelationsGridRightMediator.ID,viewComponent);
		this.onGridClick = this.onGridClick.bindWithEvent(this);
		this.onCellClick = this.onCellClick.bindWithEvent(this);
		this.onKeyDown = this.onKeyDown.bindWithEvent(this);
	  //this.onKeyPress = this.onKeyPress.bindWithEvent(this);
		this.onEscape = this.onEscape.bindWithEvent(this);
		this.onSpace = this.onSpace.bindWithEvent(this);
		this.onEnter = this.onEnter.bindWithEvent(this);
		this.onHome = this.onHome.bindWithEvent(this);
		this.onPrevious = this.onPrevious.bindWithEvent(this);
		this.onUp = this.onUp.bindWithEvent(this);
		this.onLeft = this.onLeft.bindWithEvent(this);
		this.onRight = this.onRight.bindWithEvent(this);
		this.onDown = this.onDown.bindWithEvent(this);
		this.onNext = this.onNext.bindWithEvent(this);
		this.onEnd = this.onEnd.bindWithEvent(this);
		var gridRight = this.getViewComponent();
		gridRight.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
		gridRight.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
		gridRight.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
	  //gridRight.addEvent(SjamayeeFacade.GRID_KEYPRESS, this.onKeyPress);
	  gridRight.addEvent(SjamayeeFacade.GRID_ESCAPE, this.onEscape);
		gridRight.addEvent(SjamayeeFacade.GRID_SPACE, this.onSpace);
		gridRight.addEvent(SjamayeeFacade.GRID_ENTER, this.onEnter);
		gridRight.addEvent(SjamayeeFacade.GRID_HOME, this.onHome);
		gridRight.addEvent(SjamayeeFacade.GRID_PREVIOUS, this.onPrevious);
		gridRight.addEvent(SjamayeeFacade.GRID_UP, this.onUp);
		gridRight.addEvent(SjamayeeFacade.GRID_LEFT, this.onLeft);
		gridRight.addEvent(SjamayeeFacade.GRID_RIGHT, this.onRight);
		gridRight.addEvent(SjamayeeFacade.GRID_DOWN, this.onDown);
		gridRight.addEvent(SjamayeeFacade.GRID_NEXT, this.onNext);
		gridRight.addEvent(SjamayeeFacade.GRID_END, this.onEnd);
	};
	
	//this.onGridClick = function()		{	this.sendNotification(SjamayeeFacade.GRID_CLICK);	}
	//this.onCellClick = function(evt){	this.sendNotification(SjamayeeFacade.GRID_CELL_CLICK, evt);	}
	this.onGridClick = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_CLICK); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_CLICK); }
	};
	this.onCellClick = function(evt){
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_CELL_CLICK, evt); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_CELL_CLICK, evt); }
	};
	
//this.onKeyPress = function()		{	this.sendNotification(SjamayeeFacade.GRID_KEYPRESS); };
	this.onEscape = function()			{	this.sendNotification(SjamayeeFacade.GRID_ESCAPE); };
	this.onSpace = function()				{	this.sendNotification(SjamayeeFacade.GRID_SPACE); };
	this.onEnter = function()				{	this.sendNotification(SjamayeeFacade.GRID_ENTER); };
	this.onHome = function() {	
	  this.sendNotification(SjamayeeFacade.GRID_HOME);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_HOME); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_HOME); }
	};
	this.onPrevious = function() {
	  this.sendNotification(SjamayeeFacade.GRID_PREVIOUS);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_PREVIOUS); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_PREVIOUS); }
	};
	this.onUp = function() {
	  this.sendNotification(SjamayeeFacade.GRID_UP);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_UP); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_UP); }
	};
	this.onLeft = function() {
	  this.sendNotification(SjamayeeFacade.GRID_LEFT);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_LEFT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_LEFT); }
	};
	this.onRight = function() {
	  this.sendNotification(SjamayeeFacade.GRID_RIGHT);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_RIGHT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_RIGHT); }
	};
	this.onDown = function() {
	  this.sendNotification(SjamayeeFacade.GRID_DOWN);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_DOWN); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_DOWN); }
	};
	this.onNext = function() {
	  this.sendNotification(SjamayeeFacade.GRID_NEXT);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_NEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_NEXT); }
	};
	this.onEnd = function() {
	  this.sendNotification(SjamayeeFacade.GRID_END);
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_END); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_END); }
	};
	this.onKeyDown = function(subEvent)	{
	  alert("RelationsGridRightMediator/onKeyDown - subEvent: "+subEvent);
	  if (leftRight != RelationsGridRight.ID) { return; }
		var gridRight = this.getViewComponent();
		switch (subEvent)	{
			case SjamayeeFacade.ESCAPE:
			gridRight.fireEvent(SjamayeeFacade.GRID_ESCAPE, this.onEscape);
			break;
			case SjamayeeFacade.SPACE:
			gridRight.fireEvent(SjamayeeFacade.GRID_SPACE, this.onSpace);
			break;
			case SjamayeeFacade.ENTER:
			gridRight.fireEvent(SjamayeeFacade.GRID_ENTER, this.onEnter);
			break;
			case SjamayeeFacade.HOME:
			gridRight.fireEvent(SjamayeeFacade.GRID_HOME, this.onHome);
			break;
			case SjamayeeFacade.PREVIOUS:
			gridRight.fireEvent(SjamayeeFacade.GRID_PREVIOUS, this.onPrevious);
			break;
			case SjamayeeFacade.UP:
			gridRight.fireEvent(SjamayeeFacade.GRID_UP, this.onUp);
			break;
			case SjamayeeFacade.LEFT:
			gridRight.fireEvent(SjamayeeFacade.GRID_LEFT, this.onLeft);
			break;
			case SjamayeeFacade.RIGHT:
			gridRight.fireEvent(SjamayeeFacade.GRID_RIGHT, this.onRight);
			break;
			case SjamayeeFacade.DOWN:
			gridRight.fireEvent(SjamayeeFacade.GRID_DOWN, this.onDown);
			break;
			case SjamayeeFacade.NEXT:
			gridRight.fireEvent(SjamayeeFacade.GRID_NEXT, this.onNext);
			break;
			case SjamayeeFacade.END:
			gridRight.fireEvent(SjamayeeFacade.GRID_END, this.onEnd);
			break;
		}
	};
};
RelationsGridRightMediator = new Class(new RelationsGridRightMediator());
RelationsGridRightMediator.ID = "RelationsGridRightMediator";
