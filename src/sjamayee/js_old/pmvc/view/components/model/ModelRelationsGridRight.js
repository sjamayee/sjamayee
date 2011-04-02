var ModelRelationsGridRight = function() {
  this.Extends = RelationsGridRight;

	this.initialize = function(name,properties) {
		this.parent(ModelRelationsGridRight.ID, properties);
	};

	//Handlers
  //this.line_mouseOverHandler = function(evt) { alert("ModelRelationsGridRight/line_mouseOverHandler"); };
  //this.line_mouseOutHandler = function(evt)  { alert("ModelRelationsGridRight/line_mouseOutHandler"); };
  //this.cell_mouseOverHandler = function(evt) { this.fireEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOVER, evt); };
  //this.cell_mouseOutHandler = function(evt)  { this.fireEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOUT, evt); };
  this.cell_mouseOverHandler = function(evt) { this.fireEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, evt); };
  this.cell_mouseOutHandler = function(evt)  { this.fireEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, evt); };
	
	//this.grid_clickHandler = function()  {	this.fireEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CLICK);	};
	this.grid_clickHandler = function()  {	this.fireEvent(SjamayeeFacade.GRID_CLICK);	};
	this.cell_clickHandler = function(e) {
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
		//alert("ModelRelationsGridRight/cell_clickHandler - cells: "+cells.length+" cellIds:\n"+cellIds);
    var evt = e; //window.event || e;
    /*if (!evt.target) {
      evt.target = evt.srcElement;
    }*/
		//this.fireEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CELL_CLICK, e); //evt);
		this.fireEvent(SjamayeeFacade.GRID_CELL_CLICK, e); //evt);
	};

	this.keydownHandler = function(evt) {
		var subEvent = this.parent(evt);
	  this.fireEvent(SjamayeeFacade.GRID_KEYDOWN, subEvent);
	  this.fireEvent(SjamayeeFacade.GRID_MODEL_RIGHT_KEYDOWN, subEvent);
	  //alert("ModelRelationsGridRight/keydownHandler - code: "+evt.code+" key: "+evt.key+" subEvent: "+subEvent);
		return subEvent;	
	};
};
ModelRelationsGridRight = new Class(new ModelRelationsGridRight());
ModelRelationsGridRight.ID = "modelRelationsGridRight";
