var RelationsGridLeftMediator = function() {
	this.Extends = GridListMediator;

	this.initialize = function(viewComponent)	{
		this.parent(RelationsGridLeftMediator.ID,viewComponent);
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
		var gridLeft = this.getViewComponent();
		gridLeft.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
		gridLeft.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
		gridLeft.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
	  //gridLeft.addEvent(SjamayeeFacade.GRID_KEYPRESS, this.onKeyPress);
	  gridLeft.addEvent(SjamayeeFacade.GRID_ESCAPE, this.onEscape);
		gridLeft.addEvent(SjamayeeFacade.GRID_SPACE, this.onSpace);
		gridLeft.addEvent(SjamayeeFacade.GRID_ENTER, this.onEnter);		
		gridLeft.addEvent(SjamayeeFacade.GRID_HOME, this.onHome);
		gridLeft.addEvent(SjamayeeFacade.GRID_PREVIOUS, this.onPrevious);
		gridLeft.addEvent(SjamayeeFacade.GRID_UP, this.onUp);		
		gridLeft.addEvent(SjamayeeFacade.GRID_LEFT, this.onLeft);
		gridLeft.addEvent(SjamayeeFacade.GRID_RIGHT, this.onRight);
		gridLeft.addEvent(SjamayeeFacade.GRID_DOWN, this.onDown);
		gridLeft.addEvent(SjamayeeFacade.GRID_NEXT, this.onNext);
		gridLeft.addEvent(SjamayeeFacade.GRID_END, this.onEnd);

	  gridLeft.addEvent(SjamayeeFacade.ESCAPE, this.onEscape);
		gridLeft.addEvent(SjamayeeFacade.SPACE, this.onSpace);
		gridLeft.addEvent(SjamayeeFacade.ENTER, this.onEnter);		
		gridLeft.addEvent(SjamayeeFacade.HOME, this.onHome);
		gridLeft.addEvent(SjamayeeFacade.PREVIOUS, this.onPrevious);
		gridLeft.addEvent(SjamayeeFacade.UP, this.onUp);		
		gridLeft.addEvent(SjamayeeFacade.LEFT, this.onLeft);
		gridLeft.addEvent(SjamayeeFacade.RIGHT, this.onRight);
		gridLeft.addEvent(SjamayeeFacade.DOWN, this.onDown);
		gridLeft.addEvent(SjamayeeFacade.NEXT, this.onNext);
		gridLeft.addEvent(SjamayeeFacade.END, this.onEnd);
	};

	this.onGridClick = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_CLICK); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_CLICK); }
	};
	this.onCellClick = function(evt){
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_CELL_CLICK, evt); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_CELL_CLICK, evt); }
	};
//this.onKeyPress = function()		{	this.sendNotification(SjamayeeFacade.GRID_KEYPRESS); }
	this.onEscape = function()			{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_ESCAPE); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_ESCAPE); }
	};
	this.onSpace = function()				{	this.sendNotification(SjamayeeFacade.GRID_SPACE); };
	this.onEnter = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_ENTER); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTER); }
	};
	this.onHome = function()  {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_HOME); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_HOME); }
	};
	this.onPrevious = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_PREVIOUS); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_PREVIOUS); }
	};
	this.onUp = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_UP); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_UP); }
	};
	this.onLeft = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_LEFT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_LEFT); }
	};
	this.onRight = function()	{
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_RIGHT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_RIGHT); }
	};
	this.onDown = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_DOWN); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_DOWN); }
	};
	this.onNext = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_NEXT); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_NEXT); }
	};
	this.onEnd = function() {
	  if (this.isData() === true)   { this.sendNotification(SjamayeeFacade.GRID_DATA_END); }
	  if (this.isModel() === true)  { this.sendNotification(SjamayeeFacade.GRID_MODEL_END); }
	};
	this.onKeyDown = function(subEvent)	{
	  alert("RelationsGridLeftMediator/onKeyDown - subEvent: "+subEvent);
	  if (leftRight != RelationsGridLeft.ID) { return; }
		var gridLeft = this.getViewComponent();
		switch (subEvent)	{
			case SjamayeeFacade.ESCAPE:
			gridLeft.fireEvent(SjamayeeFacade.GRID_ESCAPE, this.onEscape);
			break;
			case SjamayeeFacade.SPACE:
			gridLeft.fireEvent(SjamayeeFacade.GRID_SPACE, this.onSpace);
			break;
			case SjamayeeFacade.ENTER:
			gridLeft.fireEvent(SjamayeeFacade.GRID_ENTER, this.onEnter);
			break;			
			case SjamayeeFacade.HOME:
			gridLeft.fireEvent(SjamayeeFacade.GRID_HOME, this.onHome);
			break;
			case SjamayeeFacade.PREVIOUS:
			gridLeft.fireEvent(SjamayeeFacade.GRID_PREVIOUS, this.onPrevious);
			break;
			case SjamayeeFacade.UP:
			gridLeft.fireEvent(SjamayeeFacade.GRID_UP, this.onUp);
			break;
			case SjamayeeFacade.LEFT:
			gridLeft.fireEvent(SjamayeeFacade.GRID_LEFT, this.onLeft);
			break;
			case SjamayeeFacade.RIGHT:
			gridLeft.fireEvent(SjamayeeFacade.GRID_RIGHT, this.onRight);
			break;
			case SjamayeeFacade.DOWN:
			gridLeft.fireEvent(SjamayeeFacade.GRID_DOWN, this.onDown);
			break;
			case SjamayeeFacade.NEXT:
			gridLeft.fireEvent(SjamayeeFacade.GRID_NEXT, this.onNext);
			break;
			case SjamayeeFacade.END:
			gridLeft.fireEvent(SjamayeeFacade.GRID_END, this.onEnd);
			break;
		}
	};
};
RelationsGridLeftMediator = new Class(new RelationsGridLeftMediator());
RelationsGridLeftMediator.ID = "RelationsGridLeftMediator";
