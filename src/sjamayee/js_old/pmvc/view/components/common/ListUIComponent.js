//Abstract
var ListUIComponent = function() {
  this.Extends = SjamayeeUIComponent;
  this.kbEventTypes = null;
	this.kbKeydown = null;
	this.kbEvents = null;

	this.cells = [];

	this.initialize = function(name,properties) {
		this.parent(name,properties);		
		this.list_clickHandler = this.list_clickHandler.bindWithEvent(this);	
		this.line_clickHandler = this.line_clickHandler.bindWithEvent(this);
    this.line_mouseOverHandler = this.line_mouseOverHandler.bindWithEvent(this);
    this.line_mouseOutHandler = this.line_mouseOutHandler.bindWithEvent(this);
		this.keypressHandler = this.keypressHandler.bindWithEvent(this);	
		this.keydownHandler = this.keydownHandler.bindWithEvent(this);	
	};

  this.childrenInitialized = function() {
		//alert("ListUIComponent/childrenInitialized");
		//Create keyboard.
    this.kbEventTypes = new Array();    
    this.kbEventTypes['defaultEventType'] = SjamayeeFacade.KEYDOWN;
		this.kbKeydown = new Keyboard(this.kbEventTypes);
    this.kbEvents = new Array();
    this.kbEvents[SjamayeeFacade.ESCAPE] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.SPACE] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.ENTER] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.UP] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.DOWN] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.PREVIOUS] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.NEXT] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.HOME] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.END] = this.keydownHandler;
		this.kbKeydown.addEvents(this.kbEvents);
		//Add handlers on cells.
		var cells = this.getCells();
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.addEvent(SjamayeeFacade.CLICK, this.line_clickHandler);	
      cell.addEvent(SjamayeeFacade.MOUSEOVER, this.line_mouseOverHandler);
      cell.addEvent(SjamayeeFacade.MOUSEOUT, this.line_mouseOutHandler);
		}
		this.addEvent(SjamayeeFacade.CLICK, this.list_clickHandler);
		this.addEvents(this.kbEvents);
	};

	this.getCells = function() {
		return this.cells;
	};

	this.setCells = function(cells) {
		this.cells = cells;
	};
	
	this.clear = function() {
	  //alert("ListUIComponent/clear - cells: "+this.getCells().length);
		var cells = this.getCells();
		for (var i = 0; i < cells.length; i++) {
		  cells[i].innerHTML = '';
		}
	};

	this.getValues = function() {
		return null; //this.cells;
	};

	this.setCell = function(id,value) {
	/*if ($(id) == null) {
	    //alert("ListUIComponent/setCell - id: "+id+" value: "+value);
	  }
		$(id).innerHTML = value;*/
		this.setElement(id,value);
	};

	this.list_clickHandler = function() 	 {	this.fireEvent(SjamayeeFacade.LIST_CLICK); };
	this.line_clickHandler = function(evt) {
	  var cellIds = '';
		var j = 0;
		var cells = this.getCells();
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cellIds += cell.id;
			j++;
			if (j < 10) {
				cellIds += ",";
			} else {
				cellIds += "\n";
				j = 0;
			}
		}
		alert("ListUIComponent/line_clickHandler - cells: "+cells.length+" cellIds:\n"+cellIds);
		this.fireEvent(SjamayeeFacade.LIST_LINE_CLICK, evt);
	};

  this.line_mouseOverHandler = function(evt) { this.fireEvent(SjamayeeFacade.LIST_LINE_MOUSEOVER, evt); };
  this.line_mouseOutHandler = function(evt)  { this.fireEvent(SjamayeeFacade.LIST_LINE_MOUSEOUT, evt); };

	this.keypressHandler = function() 	{	this.fireEvent(SjamayeeFacade.LIST_KEYPRESS); };
	this.keydownHandler = function(evt) {
		var subEvent = null;
		switch (evt.key) {
			case SjamayeeFacade.ESCAPE:
			subEvent = SjamayeeFacade.ESCAPE;
			break;
			case SjamayeeFacade.SPACE:
			subEvent = SjamayeeFacade.SPACE;
			break;
			case SjamayeeFacade.ENTER:
			subEvent = SjamayeeFacade.ENTER;
			break;
			case SjamayeeFacade.UP:
			subEvent = SjamayeeFacade.UP;
			break;
			case SjamayeeFacade.DOWN:
			subEvent = SjamayeeFacade.DOWN;
			break;
			case SjamayeeFacade.PREVIOUS:
			subEvent = SjamayeeFacade.PREVIOUS;
			break;
			case SjamayeeFacade.NEXT:
			subEvent = SjamayeeFacade.NEXT;
			break;
			case SjamayeeFacade.HOME:
			subEvent = SjamayeeFacade.HOME;
			break;
			case SjamayeeFacade.END:
			subEvent = SjamayeeFacade.END;
			break;
		}
    this.fireEvent(SjamayeeFacade.GRID_KEYDOWN, subEvent);
		/*if (subEvent) {
		  if ((this.getUicName() != RelationsGridLeft.ID) && (this.getUicName() != RelationsGridRight.ID)) {
	      this.fireEvent(SjamayeeFacade.LIST_KEYDOWN, [this.getUicName(), subEvent]);
      }
		}*/
	  //alert("ListUIComponent/keydownHandler - code: "+evt.code+" key: "+evt.key+" subEvent: "+subEvent);
		return subEvent;
	};
};
ListUIComponent = new Class(new ListUIComponent());
