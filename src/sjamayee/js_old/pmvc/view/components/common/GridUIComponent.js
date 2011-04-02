//Abstract
var GridUIComponent = function() {
  this.Extends = ListUIComponent;

	this.initialize = function(name,properties) {
		this.parent(name,properties);
    this.cell_mouseOverHandler = this.cell_mouseOverHandler.bindWithEvent(this);
    this.cell_mouseOutHandler = this.cell_mouseOutHandler.bindWithEvent(this);		
		this.grid_clickHandler = this.grid_clickHandler.bindWithEvent(this);			
		this.cell_clickHandler = this.cell_clickHandler.bindWithEvent(this);
	};

  this.childrenInitialized = function() {
    this.parent();
    //Clear ALL ancestor events;
    this.removeEvents();
		//Extend keyboard.
		this.kbKeydown = new Keyboard(this.kbEventTypes);
    this.kbEvents[SjamayeeFacade.LEFT] = this.keydownHandler;
    this.kbEvents[SjamayeeFacade.RIGHT] = this.keydownHandler;
  	this.kbKeydown.addEvents(this.kbEvents);
  	//Add handlers on cells.
	  var cells = this.getCells();
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			//if (i < 3) { alert("GridUIComponent/childrenInitialized - cellId: "+cell.id); }
			cell.addEvent(SjamayeeFacade.CLICK, this.cell_clickHandler);	
      cell.addEvent(SjamayeeFacade.MOUSEOVER, this.cell_mouseOverHandler);
      cell.addEvent(SjamayeeFacade.MOUSEOUT, this.cell_mouseOutHandler);
		}
		this.addEvent(SjamayeeFacade.CLICK, this.grid_clickHandler);
		this.addEvents(this.kbEvents);		
		//alert("GridUIComponent/childrenInitialized - cells: "+cells.length);
	};

	this.clear = function() {
	  //alert("GridUIComponent/clear - cells: "+this.getCells().length);
		var cells = this.getCells();
		for (var i = 0; i < cells.length; i++) {
		  var cell = cells[i];
		  if (cell) {
		    var cellAnchorId = cell.id+'a';
		    //this.setCell(cellAnchorId,'&nbsp;');
		    //this.setCell(cellAnchorId,'');
		    this.setCell(cell.id,'&nbsp;');
		  }
		}
	};
/*
	this.setCell = function(id, value) {
	  //alert("GridUIComponent/setCell - id: "+id+" value: "+value);
		$(id).innerHTML = value;
	}
*/

  this.line_clickHandler = function(evt) {}; //Disabled.
	this.keydownHandler = function(evt) {
	  //alert("GridUIComponent/keydownHandler - code: "+evt.code+" key: "+evt.key);
		var subEvent = this.parent(evt);
		switch (evt.key) {
			case SjamayeeFacade.LEFT:
			subEvent = SjamayeeFacade.LEFT;
			break;
			case SjamayeeFacade.RIGHT:
			subEvent = SjamayeeFacade.RIGHT;
			break;
		}
    this.fireEvent(SjamayeeFacade.GRID_KEYDOWN, subEvent);
		/*if (subEvent) {
		  if ((this.getUicName() != RelationsGridLeft.ID) && (this.getUicName() != RelationsGridRight.ID)) {
	      this.fireEvent(SjamayeeFacade.LIST_KEYDOWN, [this.getUicName(), subEvent]);
      }
		}*/
	  //alert("GridUIComponent/keydownHandler - code: "+evt.code+" key: "+evt.key+" subEvent: "+subEvent);
		return subEvent;
	}; 
};
GridUIComponent = new Class(new GridUIComponent());
