var ModelRelationsGridMediator = function() {
	this.Extends = RelationsGridMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelRelationsGridMediator.ID,viewComponent);
	  var gridList = this.getViewComponent();
	  var gridLeft = gridList.gridListSplitter.left.modelRelationsGrid;
	  var gridRight = gridList.gridListSplitter.right.modelRelationsGrid;	  
    /*gridList.gridListSplitter.left.modelRelationsGrid.addEvent(SjamayeeFacade.GRID_MODEL_LEFT_CELL_MOUSEOVER, this.onCellMouseOver);
    gridList.gridListSplitter.left.modelRelationsGrid.addEvent(SjamayeeFacade.GRID_MODEL_LEFT_CELL_MOUSEOUT, this.onCellMouseOut);
    gridList.gridListSplitter.right.modelRelationsGrid.addEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOVER, this.onCellMouseOver);
    gridList.gridListSplitter.right.modelRelationsGrid.addEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOUT, this.onCellMouseOut);
    gridList.gridListSplitter.left.modelRelationsGrid.addEvent(SjamayeeFacade.GRID_MODEL_LEFT_CELL_CLICK, this.onCellClick);
    gridList.gridListSplitter.right.modelRelationsGrid.addEvent(SjamayeeFacade.GRID_MODEL_RIGHT_CELL_CLICK, this.onCellClick);*/

    gridList.addEvent(SjamayeeFacade.GRID_MODEL_CELL_CLICK, this.onCellClick);

    gridLeft.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, this.onCellMouseOver);
    gridLeft.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, this.onCellMouseOut);
    gridRight.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, this.onCellMouseOver);
    gridRight.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, this.onCellMouseOut);
    gridLeft.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    gridRight.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    //Grid left
    gridLeft.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
    //gridLeft.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    gridLeft.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
    //gridLeft.addEvent(SjamayeeFacade.GRID_KEYPRESS, this.onKeyPress);
    gridLeft.addEvent(SjamayeeFacade.GRID_ESCAPE, this.onEscape);
    gridLeft.addEvent(SjamayeeFacade.GRID_SPACE, this.onSpace);
    gridLeft.addEvent(SjamayeeFacade.GRID_ENTER, this.onEnter);		
    gridLeft.addEvent(SjamayeeFacade.GRID_HOME, this.onHome);
    gridLeft.addEvent(SjamayeeFacade.GRID_PREVIOUS, this.onPrevious);
    gridLeft.addEvent(SjamayeeFacade.GRID_UP, this.onUp);		
    gridLeft.addEvent(SjamayeeFacade.GRID_LEFT, this.onLeft);

    gridList.addEvent(SjamayeeFacade.GRID_MODEL_LEFT, this.onLeft);
    gridList.addEvent(SjamayeeFacade.GRID_MODEL_RIGHT, this.onRight);
    
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
    //Grid right
    gridRight.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
    //gridRight.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
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
    gridRight.addEvent(SjamayeeFacade.ESCAPE, this.onEscape);
    gridRight.addEvent(SjamayeeFacade.SPACE, this.onSpace);
    gridRight.addEvent(SjamayeeFacade.ENTER, this.onEnter);		
    gridRight.addEvent(SjamayeeFacade.HOME, this.onHome);
    gridRight.addEvent(SjamayeeFacade.PREVIOUS, this.onPrevious);
    gridRight.addEvent(SjamayeeFacade.UP, this.onUp);		
    gridRight.addEvent(SjamayeeFacade.LEFT, this.onLeft);
    gridRight.addEvent(SjamayeeFacade.RIGHT, this.onRight);
    gridRight.addEvent(SjamayeeFacade.DOWN, this.onDown);
    gridRight.addEvent(SjamayeeFacade.NEXT, this.onNext);
    gridRight.addEvent(SjamayeeFacade.END, this.onEnd);
		//Initialize grid.
		this.setGrid(new ModelGrid());
  	this.setTypeProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelTypeProxy.ID));
  	this.setEntityProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID));
  	this.setRelationProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID));
  	this.setAttributeProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelAttributeProxy.ID));

		gridLeft.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
		gridRight.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
    gridList.gridListSplitter.left.dataObjectsList.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
    gridList.gridListSplitter.right.dataObjectsList.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeyDown);
	};

  this.onCellMouseOver = function(evt) {
    var color = "#FAE4DB;";
    this.parent(evt,color);
  };

  this.onKeyDown = function(subEvent) {
		alert("ModelRelationsGridMediator/onKeyDown - subEvent: "+subEvent);
  };

	this.listNotificationInterests = function()	{
	  var result = this.parent();
	  return result.concat([
			SjamayeeFacade.MODEL_TYPES_RELOAD,
			SjamayeeFacade.GRID_MODEL_SHOW,
			SjamayeeFacade.GRID_MODEL_REFRESH,
			SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,
			SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,
			SjamayeeFacade.GRID_MODEL_FILTER_CLICK,
  		SjamayeeFacade.MODEL_ROOT_UNDO,
  		SjamayeeFacade.MODEL_ROOT_SELECT,
  		SjamayeeFacade.MODEL_ROOT_REDO,
			SjamayeeFacade.FOCUS,
			SjamayeeFacade.GRID_MODEL_HOME,
  		SjamayeeFacade.GRID_MODEL_PREVIOUS,
  		SjamayeeFacade.GRID_MODEL_UP,
  		SjamayeeFacade.GRID_MODEL_LEFT,
  		SjamayeeFacade.GRID_MODEL_RIGHT,
  		SjamayeeFacade.GRID_MODEL_DOWN,
  		SjamayeeFacade.GRID_MODEL_NEXT,
  		SjamayeeFacade.GRID_MODEL_END,
  		SjamayeeFacade.GRID_MODEL_RESIZE,
  		SjamayeeFacade.GRID_MODEL_RELATION_ADD,
  		SjamayeeFacade.GRID_MODEL_RELATION_DELETE,
  		SjamayeeFacade.GRID_MODEL_RELATION_EDIT,
  		SjamayeeFacade.GRID_MODEL_RELATION_EXTRACT,
  		SjamayeeFacade.GRID_MODEL_RELATION_COPY,
  		SjamayeeFacade.GRID_MODEL_RELATION_PASTE,
  		SjamayeeFacade.GRID_MODEL_RELATION_UNDO,
  		SjamayeeFacade.GRID_MODEL_RELATION_REDO,
  		SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR,
  		SjamayeeFacade.GRID_MODEL_TEXT_EDIT,
  		SjamayeeFacade.GRID_MODEL_RESET			
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_MODEL_SHOW:
		  //alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_SHOW");
    	//this.sendNotification(SjamayeeFacade.MODEL_SHOW);
			//this.sendNotification(SjamayeeFacade.GRID_SHOW);			
      var state = null;
      var entityName = null;
			var properties = note.getBody();
    	if (properties) {
    	  if (properties.state !== undefined) { state = properties.state; }
    	  if (properties.entityName !== undefined) { entityName = properties.entityName; }
    	}
			if (state) { this.setState(state); }
			if (this.getState() == SjamayeeMediator.STATE_TEXT) {
      	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_EDIT);			  
			  break;
			}			
			this.hide();
		/*this.objectsListLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
			if (this.relationsGridLeftWidth !== null) {
				gridList.gridListSplitter.left.setStyle("width", this.relationsGridLeftWidth);
				if (dijit) {
					var splitter = dijit.byId(GridListSplitter.ID);
					if (splitter) { splitter.resize(); }
				}				
			}
			var splitterStyle = this.getSplitterStyle();
			if (splitterStyle === null) {
  	    //splitterStyle = "background-color:white;width:100%;height:100%;display:block;";
  	    splitterStyle = "display:block;";
  	  }
  	  gridList.gridListSplitter.setAttribute("style",splitterStyle); */
    	this.sendNotification(SjamayeeFacade.GRID_MODEL_HEADER_SHOW);
    	this.sendNotification(SjamayeeFacade.GRID_MODEL_TOOLBAR_SHOW);  	  
			gridList.gridListSplitter.left.modelRelationsGrid.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.modelRelationsGrid.setAttribute("style","width:100%;height:100%;display:block;");  	  
    	this.setGridSize(this.getGridSize());
    	if (this.firstTime) {
    	  this.firstTime = false;
    	  if (entityName === null) { entityName = "Account"; }    	  
			  if (entityName) {
          this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,entityName);
			  } else {
          this.sendNotification(SjamayeeFacade.GRID_MODEL_REFRESH);
        }
      }
			break;		  
			case SjamayeeFacade.GRID_MODEL_REFRESH:
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_REFRESH");
			this.fillGrid();
      /*                                IS SOMETHING LIKE THIS NEEDED ???
      switch (this.getLastNavigation()) {
      	case SjamayeeFacade.OLIST_DATA_HOME:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME); break;
      	case SjamayeeFacade.OLIST_DATA_PREVIOUS:	this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS); break;
      	case SjamayeeFacade.OLIST_DATA_UP:	      this.sendNotification(SjamayeeFacade.OLIST_DATA_UP); break;
      	case SjamayeeFacade.OLIST_DATA_DOWN:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN); break;
      	case SjamayeeFacade.OLIST_DATA_NEXT:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT); break;
      	case SjamayeeFacade.OLIST_DATA_END:	    this.sendNotification(SjamayeeFacade.OLIST_DATA_END); break;
      }
      */			
			break;
		  case SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE:
			var entityName = note.getBody();
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_ENTITY_CHANGE - entityName: "+entityName);
			var entitySwitched = this.switchEntity(entityName);
			if (entitySwitched === true) {
				this.sendNotification(SjamayeeFacade.GRID_MODEL_REFRESH);		    
			}
			//this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.ID);
			break;
	    case SjamayeeFacade.GRID_MODEL_TYPE_CHANGE:
			var typeName = note.getBody();
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_TYPE_CHANGE - typeName: "+typeName);
			//this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.ID);
			break;    
  		case SjamayeeFacade.GRID_MODEL_FILTER_CLICK:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_FILTER_CLICK");
  		break;
			case SjamayeeFacade.GRID_MODEL_HOME:
		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_HOME");
			var position = this.getPosition();
			position.setRow(this.getBeginOfList());
			this.home();
			break;
			case SjamayeeFacade.GRID_MODEL_PREVIOUS:
		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_PREVIOUS");
			break;
			case SjamayeeFacade.GRID_MODEL_UP:
		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_UP");
			//var position = this.getPosition();
			//position.setRow(position.getRow()-1);
			this.lineUp();
			//Fill grid.
			this.fillGrid();			
			break;
			case SjamayeeFacade.GRID_MODEL_LEFT:
		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_LEFT - name: "+this.getUicName()+" nivo: "+this.getCurrentNivo());
			var ok = false;
			var homeView = false;
			var relation = null;
			var nextColumn = null;
			var savedCell = null;
			var selectedCell = null;
			var relation = null;			
			var position = this.getPosition();			
      if (position) {
			  var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
    			this.setCurrentNivo(column.getNivo());
			    var cell = column.getCell(position.getRow());
    		  if (!cell) {
    				if (this.getCurrentNivo() > Position.NIVO_ROOT()) {
    					//TO RETURN FROM EMPTY COLUMN!
    					ok = true;
    				}
    			} else {
    				if (cell.navigationLeft()) {
    					relation = cell.getRelation();
    					ok = true;
    				}
    			}
    			if (ok) {
    			  var cn = this.getCurrentNivo();
    				if (cn > Position.WHERE_MAX()) {
    					cn = (cn - 1);                           // TEST LIMIT !!!
    					if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
  							column.setSavedCell(cell);			       // TODO: # cells -> clear column !!!
    					} else if (cn >= Position.NIVO_ROOT()) {
  							selectedCell = column.getSavedCell();
  							if ((column.getNivo() >= this.getGrid().getWhatUsedNivo()) || (column.isSelected() === false)) {
  								column.setSavedCell(cell);
    						}
    					}
    				  //alert("GridView/left BEFORE - cn: "+cn);
    					nextColumn = this.getGrid().getColumnByNivo(cn);
    				  //alert("GridView/left - 1 - result: "+result+" nextColumn: "+nextColumn+" cn: "+cn+" gridCell: "+gridCell+" navigationLeft: "+((gridCell)?gridCell.navigationLeft():false));				
    					if (nextColumn) {
    						//result = true;
    						this.setCurrentNivo(cn);
    						if (cn <= Position.NIVO_ROOT()) {
    						//alert("GridView/left AFTER - cn: "+cn);
    							//homeView = this.isHomeView();
    						}
    				  	if (cn < this.getGrid().getWhereUsedNivo()) {
    							this.getGrid().setWhereUsedNivo(cn);
    						}
    						savedCell = nextColumn.getSavedCell();
    						if (position) { position.left(savedCell); }
    						if (homeView === true) {
    						//alert("GridView/left - initial - position: "+position.print());
    							if (nextColumn.isMasterChanged() === false) {
    								if (selectedCell) {
    								//selectedCell.touch(((selectedCell.isSelected())?true:false));
    									selectedCell.touch(selectedCell.isSelected());
    								}
    							//cell.touch(((gridCell.isSelected())?true:false));
    								cell.touch(gridCell.isSelected());
    								savedCell.touch(true);
    								//this.setParentAndChild(savedCell);
    							//result = false;
    							}
    						}
    					}
    				}
    			}
			  }  
			}
/*			
			var nivo = this.getCurrentNivo();
			if (nivo <= (Position.NIVO_ROOT()+1)) {
				var position = this.getPosition();
				var column = position.getColumn();
				if (column > Position.COLUMN_FIRST()) {
					column = (column - 1);
					position.setColumn(column);
				}
			}
			if (nivo > Position.WHERE_MAX()) {
				nivo = (nivo - 1);
				this.setCurrentNivo(nivo);				
			}
*/
			//var col = this.getPosition().getColumn();
			//var row = this.getPosition().getRow();
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_LEFT - nivo: "+nivo+" column: "+col+" row: "+row);
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_MODEL_RIGHT:
		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RIGHT");
			var ok = false;
			var homeView = false;
			var relation = null;
			var nextColumn = null;
			var savedCell = null;
			var selectedCell = null;
			var relation = null;
			var position = this.getPosition();
      if (position) {
			  var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
    			this.setCurrentNivo(column.getNivo());
			    var cell = column.getCell(position.getRow());
  				relation = cell.getRelation();
  				if (cell.navigationRight()) {
  				  var cn = this.getCurrentNivo();

  					if (cn < Position.WHAT_MAX()) {
  						cn = (cn + 1);                           // TEST LIMIT !!!
  						if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
								column.setSavedCell(cell);			       // TODO: # cells -> clear column !!!
  						} else if (cn <= Position.NIVO_ROOT()) {
								selectedCell = column.getSavedCell();
								if ((column.getNivo() <= this.getGrid().getWhereUsedNivo()) || (column.isSelected() === false)) {									
									column.setSavedCell(cell);
								}
  						}
  					//alert("GridView/right BEFORE - cn: "+cn+" nextColumn: "+nextColumn);
  						nextColumn = this.getGrid().getColumnByNivo(cn);
  						if (nextColumn) {
  							//result = true;
  						//alert("GridView/right AFTER - cn: "+cn+" nextColumn: "+nextColumn);
  							this.setCurrentNivo(cn);
  							if (cn > Position.NIVO_COLUMN_FIRST()) {
  								//homeView = this.isHomeView();				
  							}
  				  		if (cn > this.getGrid().getWhatUsedNivo()) {
  								this.getGrid().setWhatUsedNivo(cn);
  							}
  							savedCell = nextColumn.getSavedCell();               
  							if (position) { position.right(savedCell); }
  							ok = true;
  							if (homeView === true) {
  							//alert("GridView/right - initial - position: "+position.print());
  								if (!nextColumn.isMasterChanged() === true) {
  									if (selectedCell) {
  									//selectedCell.touch(((selectedCell.isSelected())?true:false));
  										selectedCell.touch(selectedCell.isSelected());
  									}
  								//gridCell.touch(((gridCell.isSelected())?true:false));
  									cell.touch(cell.isSelected());
  									savedCell.touch(true);
  									this.setParentAndChild(savedCell);
  								//result = false;
  								}
  							}
  						}
  					}
  				}			    
			  }  
			}
/*
			var nivo = this.getCurrentNivo();
			if (nivo >= Position.NIVO_COLUMN_FIRST()) {			
				var position = this.getPosition();
				var column = position.getColumn();
				if (column < 4) {										//TODO: MAX COLS ??? DEFINITION
					column = (column + 1);
					position.setColumn(column);
				}
			}
			if (nivo < Position.WHAT_MAX()) {
				nivo = (nivo + 1);
				this.setCurrentNivo(nivo);				
			}
*/
			//var col = this.getPosition().getColumn();
			//var row = this.getPosition().getRow();
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RIGHT - nivo: "+nivo+" column: "+col+" row: "+row);			
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_MODEL_DOWN:
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_DOWN");
			//var position = this.getPosition();
			//position.setRow(position.getRow()+1);
			this.lineDown();
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_MODEL_NEXT:
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_NEXT");
			break;
			case SjamayeeFacade.GRID_MODEL_END:
			//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_END");
			var position = this.getPosition();
			position.setRow(this.getEndOfList());
			this.end();
			break;
			case SjamayeeFacade.GRID_MODEL_RESIZE:
		  //alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RESIZE");
		  var gridSize = note.getBody();
		  this.gridResize(gridSize);
  		//this.home(); //TODO !!!
    	this.sendNotification(SjamayeeFacade.MODEL_TYPES_RELOAD);                 //FOR TEST ONLY !!! REMOVE LATER !!!
    	this.sendNotification(SjamayeeFacade.GRID_MODEL_REFRESH);
			break;
			case SjamayeeFacade.MODEL_TYPES_RELOAD:
		  //alert("ModelRelationsGridMediator/handleNotification - MODEL_TYPES_RELOAD");
		  var typeOptions = ModelType.getTypeOptions();
      var objectsHeaderMediator = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID);
      objectsHeaderMediator.getViewComponent().typeSelect.innerHTML = typeOptions;
      var relationsHeaderMediator = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID);
      relationsHeaderMediator.getViewComponent().typeSelect.innerHTML = typeOptions;
      var relationsEntityName = relationsHeaderMediator.getViewComponent().entitySelect.value;
	    this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,relationsEntityName);
			break;			
  		case SjamayeeFacade.GRID_MODEL_RELATION_ADD:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_ADD");
  		this.setEdit();
    	this.sendNotification(SjamayeeFacade.RELATION_ADD);
    	this.sendNotification(SjamayeeFacade.GRID_SHOW);    	
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_DELETE:
  		alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_DELETE");
    	this.sendNotification(SjamayeeFacade.RELATION_DELETE);
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_EDIT:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_EDIT");
  		//this.setEdit();
    	this.sendNotification(SjamayeeFacade.RELATION_EDIT);
    	this.sendNotification(SjamayeeFacade.GRID_SHOW);    	
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_EXTRACT:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_EXTRACT");
    	this.sendNotification(SjamayeeFacade.RELATION_EXTRACT);
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_COPY:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_COPY");
    	this.sendNotification(SjamayeeFacade.RELATION_COPY);
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_PASTE:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_PASTE");
    	this.sendNotification(SjamayeeFacade.RELATION_PASTE);
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_UNDO:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_UNDO");
    	this.sendNotification(SjamayeeFacade.RELATION_UNDO);
  		break;
  		case SjamayeeFacade.GRID_MODEL_RELATION_REDO:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RELATION_REDO");
    	this.sendNotification(SjamayeeFacade.RELATION_REDO);
  		break;
  		case SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_BUFFER_CLEAR");
    	this.sendNotification(SjamayeeFacade.GRID_BUFFER_CLEAR);
  		break;
  		case SjamayeeFacade.GRID_MODEL_TEXT_EDIT:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_TEXT_EDIT");
    	this.setState(SjamayeeMediator.STATE_TEXT);
    	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_SHOW);
    	this.sendNotification(SjamayeeFacade.TEXT_EDIT,this);
  		break;
  		case SjamayeeFacade.GRID_MODEL_RESET:
  		//alert("ModelRelationsGridMediator/handleNotification - GRID_MODEL_RESET");
    	this.sendNotification(SjamayeeFacade.GRID_RESET,this);
  		break;
  		case SjamayeeFacade.MODEL_ROOT_UNDO:
  		alert("ModelRelationsGridMediator/handleNotification - MODEL_ROOT_UNDO");
  		break;
  		case SjamayeeFacade.MODEL_ROOT_SELECT:
  		alert("ModelRelationsGridMediator/handleNotification - MODEL_ROOT_SELECT");
  		break;
  		case SjamayeeFacade.MODEL_ROOT_REDO:
  		alert("ModelRelationsGridMediator/handleNotification - MODEL_ROOT_REDO");
  		break;
    }
    this.parent(note);
  };
	
  this.setResizeButtonText = function(text) {
		this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;  	
  };

	this.setGridSize = function(gridSize) {
	  //alert("ModelRelationsGridMediator/setGridSize - gridSize: "+gridSize);
	  this.setListSize(gridSize); //OKEEE  !!! kept in listSize !!!
	  var parentDetail = this.facade.retrieveMediator(ModelParentDetailMediator.ID).getViewComponent();
	  var childDetail = this.facade.retrieveMediator(ModelChildDetailMediator.ID).getViewComponent();
	  var gridList = this.getViewComponent();
    if (this.isGridFull() === true) {
      this.setPageSize(RelationsGridMediator.PAGE_SIZE_MAX);
  		this.setEndOfList(this.getPageSize() - 1);      
		  parentDetail.setAttribute("style","display:none;");
		  childDetail.setAttribute("style","display:none;");
		  gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
		} else {
      this.setPageSize(RelationsGridMediator.PAGE_SIZE_MIN);
  		this.setEndOfList(this.getPageSize() - 1);
			parentDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
			childDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
			gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");		  
		}
	  var resizeButtonText = (this.isGridFull() === true)?RelationsToolBar.RESIZE_BUTTON_FULL_VALUE:RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
		this.setResizeButtonText(resizeButtonText);
	};

  this.createRelationVO = function(entity) {
    return new ModelRelationVO(null,"",null,entity.getId(),null,null);
  };

  this.createRelation = function(vo) {
    return new ModelRelation(vo);
  };
};
ModelRelationsGridMediator = new Class(new ModelRelationsGridMediator());
ModelRelationsGridMediator.ID = "ModelRelationsGridMediator";
