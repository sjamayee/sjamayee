//Abstract
var RelationsGridMediator = function() {
	this.Extends = GridListMediator;
	this.firstTime = true;
	this.viewComponentLeft = null;
	this.viewComponentRight = null;
	this.relationsGridLeft = null;
	this.relationsGridRight = null;
	this.grid = null;
  this.pageSize = null;
  this.messageText = null;
	this.typeProxy = null;
	this.entityProxy = null;
	this.relationProxy = null;
	this.attributeProxy = null;
	//For relational linking!
	this.parentRelation = null;
	this.childRelation = null;
	this.previousRelation = null;
	this.currentRelation = null;
	this.nextRelation = null;
	//For navigation!
	this.currentCellId = null;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.facade.registerMediator(new RelationsGridLeftMediator(this.getRelationsGridLeft()));
		this.facade.registerMediator(new RelationsGridRightMediator(this.getRelationsGridRight()));
		this.onGridClick = this.onGridClick.bindWithEvent(this);
		this.onCellClick = this.onCellClick.bindWithEvent(this);
  	this.onCellMouseOver = this.onCellMouseOver.bindWithEvent(this);
  	this.onCellMouseOut = this.onCellMouseOut.bindWithEvent(this);
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
		//Initialize list.
		this.setBeginOfList(Position.ROW_TOP());
		//this.setEndOfList(GridView.DEFAULT_ROWS - 1); //RelationsGridMediator.PAGE_SIZE_MAX
		this.setPageSize(RelationsGridMediator.PAGE_SIZE_MIN);
		this.setEndOfList(this.getPageSize() - 1);
		this.setCurrentNivo(Position.NIVO_ROOT());
		//Current cellId
		this.currentCellId = this.getRootCellId();
	};

	this.setMessageText = function(messageText) {
	  if (this.messageText === null) {
	    var toolBar = null;
	    if (this instanceof ModelRelationsGridMediator) {
	      toolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
	    } else {
	      toolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
	    }
      this.messageText = toolBar.messageText;
    }
    this.messageText.value = messageText;
	};

  this.setDisplay = function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_DISPLAY) {
      this.sendNotification(SjamayeeFacade.PARENT_DETAIL);
      this.sendNotification(SjamayeeFacade.CHILD_DETAIL);
    }
    return mode;
  };

  this.getCurrentCellId = function() {
    return this.currentCellId;
  };
  
  this.setCurrentCellId = function(cellId) {
    var oldCurrentCellId = null;
    if (cellId != this.getCurrentCellId()) {
      oldCurrentCellId = this.getCurrentCellId();
    }
    //Set new current cell.
    this.currentCellId = cellId;
    this.highlite(null,cellId);
    //Reset old current cell.
    if (oldCurrentCellId) {
      this.highlite(null,oldCurrentCellId);
    }
  }; 

  this.onCurrentCellId = function(cellId) {
    return (this.getCurrentCellId() == cellId);
  };

  this.isCurrentCellIdOnRoot = function() {
    var result = false;
    var cellId = this.getCurrentCellId();
    var leftColumnId = this.getViewComponentLeft()+RelationsGridLeft.COLUMN_ID;
    if (cellId.substr(0,leftColumnId.length) == leftColumnId) {
      var col = this.getColumnFromCellId(cellId);
  	  var nivo = (this.getGrid().getNivoBase() + Number(col)); //TODO: ATT!!! IS CORRECTION OKE ???
      result = (nivo == Position.NIVO_ROOT())?true:false;
    }
    return result;
  };
  
  this.getRootRow = function() {
    var eol = this.getEndOfList();
    if (this.isGridFull()) { eol = eol - 1; }
    return Math.floor(eol / 2);
  };

  this.getRootCellId = function() {
    return this.getRelationsGridLeft().getCellId(this.getRootRow(),Position.COLUMN_ROOT()); //TODO: NOK !!! COLUMN_ROOT !!!
  };
  
	this.getRelationsGridLeft = function() {
	  if (this.relationsGridLeft === null) {
      if (this instanceof ModelRelationsGridMediator) {
    		this.relationsGridLeft = this.getViewComponent().gridListSplitter.left.modelRelationsGrid;
      } else {
    		this.relationsGridLeft = this.getViewComponent().gridListSplitter.left.dataRelationsGrid;
      }
    }
		return this.relationsGridLeft;
	};

	this.getRelationsGridRight = function() {
	  if (this.relationsGridRight === null) {
      if (this instanceof ModelRelationsGridMediator) {
    		this.relationsGridRight = this.getViewComponent().gridListSplitter.right.modelRelationsGrid;
      } else {
    		this.relationsGridRight = this.getViewComponent().gridListSplitter.right.dataRelationsGrid;
      }
    }
		return this.relationsGridRight;
	};

  this.getViewComponentLeft = function() {
    if (this.viewComponentLeft === null) {
      if (this instanceof ModelRelationsGridMediator) {
        this.viewComponentLeft = ModelRelationsGridLeft.ID;
      } else {
        this.viewComponentLeft = DataRelationsGridLeft.ID;
      }
    }
    return this.viewComponentLeft;
  };

  this.getViewComponentRight = function() {
    if (this.viewComponentRight === null) {
      if (this instanceof ModelRelationsGridMediator) {
        this.viewComponentRight = ModelRelationsGridRight.ID;
      } else {
        this.viewComponentRight = DataRelationsGridRight.ID;
      }
    }
    return this.viewComponentRight;
  };

  this.getRowFromCellId = function(cellId) {
    var result = 0;
    var leftColumnId = this.getViewComponentLeft()+RelationsGridLeft.COLUMN_ID;
    var rightColumnId = this.getViewComponentRight()+RelationsGridRight.COLUMN_ID;
    if (cellId.substr(0,leftColumnId.length) == leftColumnId) {
      result = cellId.substr(cellId.length-(Sjamayee.ID_PAD_SIZE*2+1),Sjamayee.ID_PAD_SIZE);
    } else if (cellId.substr(0,rightColumnId.length) == rightColumnId) {
      result = cellId.substr(cellId.length-Sjamayee.ID_PAD_SIZE);
    }
    return result;
  };

  this.getColumnFromCellId = function(cellId) {
    var result = 0;
    var leftColumnId = this.getViewComponentLeft()+RelationsGridLeft.COLUMN_ID;
    if (cellId.substr(0,leftColumnId.length) == leftColumnId) {
      result = cellId.substr(cellId.length-Sjamayee.ID_PAD_SIZE);
    }
    return result;
  };
  
	this.isCellEmpty = function(cell) {
	  var value = cell.innerHTML;
    return ((value === undefined) || (value === null) || (value == '&nbsp;') || (value.length === 0))?true:false;
  }; 

  this.getLastNotEmptyCell = function(cellId) {
    //alert("RelationsGridMediator/getLastNotEmptyCell - cellId: "+cellId);
    var result = null;
    var col = null; //TODO: MAKE VARIABLE !!!
    var gridUic = this.getRelationsGridRight();
    var leftColumnId = this.getViewComponentLeft()+RelationsGridLeft.COLUMN_ID;
    if (cellId.substr(0,leftColumnId.length) == leftColumnId) {
      gridUic = this.getRelationsGridLeft();
      col = this.getColumnFromCellId(cellId);
    }
    if (cellId) {
      if (col) {
    	  var nivo = (this.getGrid().getNivoBase() + Number(col)); //TODO: ATT!!! IS CORRECTION OKE ???
    	  if (nivo == Position.NIVO_ROOT()) {
          result = $(this.getRootCellId());
        }
      }
      if (result === null) {
        for (var row = this.getRowFromCellId(cellId); row >= Position.ROW_TOP(); row--) {
          var cell = null;
          if (col) {
            cell = $(gridUic.getCellId(row,col));
          } else {
            cell = $(gridUic.getCellId(row));
          }
          if (cell) {
            if (!this.isCellEmpty(cell)) {
              result = cell;
              break;
            }
          }
        }
      }
    }
    return result;
  };

  this.onGridClick = function()	  {}; //alert("RelationsGridMediator/onGridClick"); };
//this.onCellClick = function(evt){ alert("RelationsGridMediator/onCellClick"); };
//this.onKeyPress = function()		{	alert("RelationsGridMediator/onKeyPress"); };
	this.onEscape = function()			{ alert("RelationsGridMediator/onEscape"); };
	this.onSpace = function()				{	alert("RelationsGridMediator/onSpace"); };
	this.onHome = function()        { alert("RelationsGridMediator/onHome"); };
	this.onPrevious = function()    { alert("RelationsGridMediator/onPrevious"); };
	this.onUp = function()	        { alert("RelationsGridMediator/onUp"); };
	this.onLeft = function()        { alert("RelationsGridMediator/onLeft"); };
	this.onRight = function()	      { alert("RelationsGridMediator/onRight"); };
	this.onDown = function()        { alert("RelationsGridMediator/onDown"); };
	this.onNext = function()        { alert("RelationsGridMediator/onNext"); };
	this.onEnd = function()         { alert("RelationsGridMediator/onEnd"); };
	this.onKeyDown = function(subEvent)	{}; //alert("RelationsGridMediator/onKeyDown - subEvent: "+subEvent); };

  this.onCellClick = function(evt) {
    var id = evt.target.id;
    //alert("RelationsGridMediator/onCellClick - target/id: "+id);
    var cell = $(id);
		if (cell) {
	    cell = this.getLastNotEmptyCell(id);
      //alert("RelationsGridMediator/onCellClick - target/id: "+id+" cell: "+cell);
  		if (cell) {
        this.setCurrentCellId(cell.id);
      }
		}
  };

  this.onCellMouseOver = function(evt,color) {
    var id = evt.target.id;
    //alert("RelationsGridMediator/onCellMouseOver - target/id: "+id);
    var cell = $(id);
    if (cell) { this.highlite(null,cell.id,color); }
  };

  this.onCellMouseOut = function(evt) {
    var id = evt.target.id;
    //alert("RelationsGridMediator/onCellMouseOut - target/id: "+id);
    var cell = $(id);
    if (cell) { this.highlite(null,cell.id); }
  };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
		/*SjamayeeFacade.GRID_CLICK,*/
			SjamayeeFacade.GRID_CELL_CLICK,
		/*SjamayeeFacade.GRID_ESCAPE,
			SjamayeeFacade.GRID_SPACE,
			SjamayeeFacade.GRID_ENTER,
			SjamayeeFacade.GRID_HOME,
			SjamayeeFacade.GRID_PREVIOUS,
			SjamayeeFacade.GRID_UP,
			SjamayeeFacade.GRID_LEFT,
			SjamayeeFacade.GRID_RIGHT,
			SjamayeeFacade.GRID_DOWN,
			SjamayeeFacade.GRID_NEXT,
			SjamayeeFacade.GRID_END,
			SjamayeeFacade.GRID_FOCUS,*/
			SjamayeeFacade.GRID_4X_SHOW,
			SjamayeeFacade.GRID_4C_SHOW,
			SjamayeeFacade.GRID_5C_SHOW,
			SjamayeeFacade.GRID_6C_SHOW,
			SjamayeeFacade.GRID_7C_SHOW,
			SjamayeeFacade.GRID_8C_SHOW
	  ]);
  };

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_CLICK:
		  //alert("RelationsGridMediator/handleNotification - GRID_CLICK - name: "+this.getUicName());
			break;
			case SjamayeeFacade.GRID_CELL_CLICK:
			var evt = note.getBody();
			//alert("RelationsGridMediator/handleNotification - GRID_CELL_CLICK");
			//alert("RelationsGridMediator/handleNotification - GRID_CELL_CLICK - t/id: "+evt.target.id); //+" ct/id: "+evt.currentTarget.id);
			//this.setCurrentPosition(evt);
			var position = this.getPosition();
			var column = this.getGrid().getColumnByIndex(position.getColumn());
			this.setCurrentNivo(column.getNivo());
		  alert("RelationsGridMediator/handleNotification - GRID_CELL_CLICK\nposition/row: "+position.getRow()+", column: "+position.getColumn()+"\nnivo: "+this.getCurrentNivo());
		  var cell = this.getCell();
		  var cellValue = this.getCellValue(position.getRow());
		  //if (cellValue.length == 0) {
		  //if (cellValue == '&nbsp;') {
      if (cellValue === null) {
        if (this.getCurrentNivo() == Position.NIVO_ROOT()) {
          //cell = this.getCell(this.getRootRow());
          this.setPosition(new Position(this.getRootRow(),position.getColumn()));
          //this.setPosition(new Position(Position.ROW_ROOT(),position.getColumn()));
			  } else if (column.isSelected() === true){
			    var savedCell = column.getSavedCell();
          this.setPosition(new Position(savedCell.getPosition().getRow(),position.getColumn()));
			  } else {
          //this.setPosition(new Position(Position.ROW_TOP(),position.getColumn()));			  
			    var lastRow = this.getLastLine(); //Row();
          this.setPosition(new Position(lastRow,position.getColumn()));			  
        }
			}
		  this.sendNotification(SjamayeeFacade.GRID_FOCUS, cell);			
			break;
			case SjamayeeFacade.GRID_KEYPRESS:
		//alert("RelationsGridMediator/handleNotification - GRID_KEYPRESS");
			break;
		/*case SjamayeeFacade.GRID_ESCAPE:
			alert("RelationsGridMediator/handleNotification - GRID_ESCAPE");
			break;
			case SjamayeeFacade.GRID_SPACE:
			//alert("RelationsGridMediator/handleNotification - GRID_SPACE");
			var position = this.getPosition();
			position.setRow(this.getRootRow());																	//TODO: Refactor !!!
			position.setColumn(Position.COLUMN_ROOT());
			this.setCurrentNivo(Position.NIVO_ROOT());						
			break;
			case SjamayeeFacade.GRID_ENTER:
			var position = this.getPosition();
			alert("RelationsGridMediator/handleNotification - GRID_ENTER\nposition/column: "+position.getColumn()+
			      ", row: "+position.getRow()+"\nnivo: "+this.getCurrentNivo()+"\nname: "+this.getUicName());
			//this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.COLUMN_ID+'c00');
			this.sendNotification(SjamayeeFacade.FOCUS, CommonToolBar.MESSAGE_TEXT_ID);
			break;
			case SjamayeeFacade.GRID_HOME:
			//alert("RelationsGridMediator/handleNotification - GRID_HOME");
			var position = this.getPosition();
			position.setRow(this.getBeginOfList());
			this.home();
			break;
			case SjamayeeFacade.GRID_PREVIOUS:
			//alert("RelationsGridMediator/handleNotification - GRID_PREVIOUS");
			break;
			case SjamayeeFacade.GRID_UP:
			//alert("RelationsGridMediator/handleNotification - GRID_UP");
			//var position = this.getPosition();
			//position.setRow(position.getRow()-1);
			this.lineUp();
			//Fill grid.
			this.fillGrid();			
			break;
			case SjamayeeFacade.GRID_LEFT:
			//alert("RelationsGridMediator/handleNotification - GRID_LEFT - name: "+this.getUicName()+" nivo: "+this.getCurrentNivo());
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
**			
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
**
			//var col = this.getPosition().getColumn();
			//var row = this.getPosition().getRow();
			//alert("RelationsGridMediator/handleNotification - GRID_LEFT - nivo: "+nivo+" column: "+col+" row: "+row);
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_RIGHT:
			//alert("RelationsGridMediator/handleNotification - GRID_RIGHT");
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
**
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
**
			//var col = this.getPosition().getColumn();
			//var row = this.getPosition().getRow();
			//alert("RelationsGridMediator/handleNotification - GRID_RIGHT - nivo: "+nivo+" column: "+col+" row: "+row);			
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_DOWN:
			//alert("RelationsGridMediator/handleNotification - GRID_DOWN");
			//var position = this.getPosition();
			//position.setRow(position.getRow()+1);
			this.lineDown();
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_NEXT:
			//alert("RelationsGridMediator/handleNotification - GRID_NEXT");
			break;
			case SjamayeeFacade.GRID_END:
			//alert("RelationsGridMediator/handleNotification - GRID_END");
			var position = this.getPosition();
			position.setRow(this.getEndOfList());
			this.end();
			break;*/
			case SjamayeeFacade.GRID_FOCUS:
			//var element = note.getBody();
			//alert("RelationsGridMediator/handleNotification - GRID_FOCUS - element: "+element);
			//element.focus();
			//Fill grid.
			this.fillGrid();
			break;
			case SjamayeeFacade.GRID_4X_SHOW:
      //Set Column Classes: 4(What/25)
      var columnId = RelationsGridLeft.getColumnId(0);
      this.getRelationsGridLeft().removeClass(columnId);
		  $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
			$(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
      columnId = RelationsGridLeft.getColumnId(1);
      this.getRelationsGridLeft().removeClass(columnId);
		  $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
			$(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
			if (Position.COLUMNS_MAX() > 2) {
        columnId = RelationsGridLeft.getColumnId(2);
        this.getRelationsGridLeft().removeClass(columnId);
		    $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
			  $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
			}
			if (Position.COLUMNS_MAX() > 3) {
        columnId = RelationsGridLeft.getColumnId(3);
        this.getRelationsGridLeft().removeClass(columnId);
		    $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
			  $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
			}
			//Set show/hide
			$(RelationsGridLeft.getColumnId(0)).setAttribute("style","display:block;");
			$(RelationsGridLeft.getColumnId(1)).setAttribute("style","display:block;");
			if (Position.COLUMNS_MAX() > 2) {
			  $(RelationsGridLeft.getColumnId(2)).setAttribute("style","display:block;");
		  }
			if (Position.COLUMNS_MAX() > 3) {
			  $(RelationsGridLeft.getColumnId(3)).setAttribute("style","display:block;");
	    }
	    for (var i = Position.COLUMN_WHAT_FIRST(); i < Position.COLUMNS_MAX(); i++) {
			  $(RelationsGridLeft.getColumnId(i)).setAttribute("style","display:none;");
	    }
			gridList.gridListSplitter.left.setAttribute("style","width:35%;height:100%;display:block;");
			gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
			this.resizeSplitter();
			break;			
			case SjamayeeFacade.GRID_4C_SHOW:
			var root = note.getBody();
			if ((root === undefined) || (root === null)) { root = RelationsGridLeft.getColumnId(3); }
      //Set Column Classes: 3(Where/23)+1(Root/31)
	    for (var i = Position.COLUMN_FIRST(); i < Position.COLUMN_WHAT_FIRST(); i++) {
        var columnId = RelationsGridLeft.getColumnId(i);
        this.getRelationsGridLeft().removeClass(columnId);
        if (columnId == root) {
    		  $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
  			  $(columnId).addClass(GridColumn.ROOT_4C_CLASS_ID);        
        } else if (columnId < root) {
    		  $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
  			  $(columnId).addClass(GridColumn.WHERE_USED_4C_CLASS_ID);
  			} else {
    		  $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
    		  $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4C_CLASS_ID);			   
  			}
	    }      
			//Set show/hide
			$(RelationsGridLeft.getColumnId(0)).setAttribute("style","display:block;");
			$(RelationsGridLeft.getColumnId(1)).setAttribute("style","display:block;");
			if (Position.COLUMNS_MAX() > 2) {
			  $(RelationsGridLeft.getColumnId(2)).setAttribute("style","display:block;");
		  }
			if (Position.COLUMNS_MAX() > 3) {
			  $(RelationsGridLeft.getColumnId(3)).setAttribute("style","display:block;");
	    }
	    for (var i = Position.COLUMN_WHAT_FIRST(); i < Position.COLUMNS_MAX(); i++) {
			  $(RelationsGridLeft.getColumnId(i)).setAttribute("style","display:none;");
	    }
			gridList.gridListSplitter.left.setAttribute("style","width:35%;height:100%;display:block;");
			gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
			this.resizeSplitter();
			break;
			case SjamayeeFacade.GRID_5C_SHOW:
      //Set Column Classes: 4(Where/18.5)+1(Root/26)
	    for (var i = Position.COLUMN_FIRST(); i < (Position.COLUMNS_MAX() - 4); i++) {
        var columnId = RelationsGridLeft.getColumnId(i);
        this.getRelationsGridLeft().removeClass(columnId);
  		  $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
  			$(columnId).addClass(GridColumn.WHERE_USED_5C_CLASS_ID);
	    }
      this.getRelationsGridLeft().removeClass(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-4));
		  $(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-4)).addClass(GridColumn.WHERE_USED_CLASS_ID);
			$(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-4)).addClass(GridColumn.ROOT_5C_CLASS_ID);
      //Set show/hide
			$(RelationsGridLeft.getColumnId(0)).setAttribute("style","display:block;");
			$(RelationsGridLeft.getColumnId(1)).setAttribute("style","display:block;");
			if (Position.COLUMNS_MAX() > 2) {
			  $(RelationsGridLeft.getColumnId(2)).setAttribute("style","display:block;");
		  }
			if (Position.COLUMNS_MAX() > 3) {
			  $(RelationsGridLeft.getColumnId(3)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 4) {
			  $(RelationsGridLeft.getColumnId(4)).setAttribute("style","display:block;");
	    }
	    for (var i = (Position.COLUMN_WHAT_FIRST() + 1); i < Position.COLUMNS_MAX(); i++) {
			  $(RelationsGridLeft.getColumnId(i)).setAttribute("style","display:none;");
	    }
			gridList.gridListSplitter.left.setAttribute("style","width:52%;height:100%;display:block;");
			gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
			this.resizeSplitter();
			break;
			case SjamayeeFacade.GRID_6C_SHOW:
      //Set Column Classes: 5(Where/16)+1(Root/20)
	    for (var i = Position.COLUMN_FIRST(); i < (Position.COLUMNS_MAX() - 3); i++) {
        var columnId = RelationsGridLeft.getColumnId(i);
        this.getRelationsGridLeft().removeClass(columnId);
  		  $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
  			$(columnId).addClass(GridColumn.WHERE_USED_6C_CLASS_ID);
	    }
      this.getRelationsGridLeft().removeClass(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-3));
		  $(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-3)).addClass(GridColumn.WHERE_USED_CLASS_ID);
			$(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-3)).addClass(GridColumn.ROOT_6C_CLASS_ID);			
			//Set show/hide
			$(RelationsGridLeft.getColumnId(0)).setAttribute("style","display:block;");
			$(RelationsGridLeft.getColumnId(1)).setAttribute("style","display:block;");
			if (Position.COLUMNS_MAX() > 2) {
			  $(RelationsGridLeft.getColumnId(2)).setAttribute("style","display:block;");
		  }
			if (Position.COLUMNS_MAX() > 3) {
			  $(RelationsGridLeft.getColumnId(3)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 4) {
			  $(RelationsGridLeft.getColumnId(4)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 5) {
			  $(RelationsGridLeft.getColumnId(5)).setAttribute("style","display:block;");
	    }
	    for (var i = (Position.COLUMN_WHAT_FIRST() + 2); i < Position.COLUMNS_MAX(); i++) {
			  $(RelationsGridLeft.getColumnId(i)).setAttribute("style","display:none;");
	    }
			gridList.gridListSplitter.left.setAttribute("style","width:68%;height:100%;display:block;");
			gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
			this.resizeSplitter();
			break;
			case SjamayeeFacade.GRID_7C_SHOW:
      //Set Column Classes: 6(Where/14)+1(Root/16)
	    for (var i = Position.COLUMN_FIRST(); i < (Position.COLUMNS_MAX() - 2); i++) {
        var columnId = RelationsGridLeft.getColumnId(i);
        this.getRelationsGridLeft().removeClass(columnId);
  		  $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
  			$(columnId).addClass(GridColumn.WHERE_USED_7C_CLASS_ID);
	    }
      this.getRelationsGridLeft().removeClass(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-2));
		  $(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-2)).addClass(GridColumn.WHERE_USED_CLASS_ID);
			$(RelationsGridLeft.getColumnId(Position.COLUMNS_MAX()-2)).addClass(GridColumn.ROOT_7C_CLASS_ID);
			//Set show/hide
			$(RelationsGridLeft.getColumnId(0)).setAttribute("style","display:block;");
			$(RelationsGridLeft.getColumnId(1)).setAttribute("style","display:block;");
			if (Position.COLUMNS_MAX() > 2) {
			  $(RelationsGridLeft.getColumnId(2)).setAttribute("style","display:block;");
		  }
			if (Position.COLUMNS_MAX() > 3) {
			  $(RelationsGridLeft.getColumnId(3)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 4) {
			  $(RelationsGridLeft.getColumnId(4)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 5) {
			  $(RelationsGridLeft.getColumnId(5)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 6) {
			  $(RelationsGridLeft.getColumnId(6)).setAttribute("style","display:block;");
	    }
	    for (var i = (Position.COLUMN_WHAT_FIRST() + 3); i < Position.COLUMNS_MAX(); i++) {
			  $(RelationsGridLeft.getColumnId(i)).setAttribute("style","display:none;");
	    }
			gridList.gridListSplitter.left.setAttribute("style","width:87.5%;height:100%;display:block;");
			gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
			this.resizeSplitter();
			break;
			case SjamayeeFacade.GRID_8C_SHOW:
      //Set Column Classes: 8(Where/12.5)
	    for (var i = Position.COLUMN_FIRST(); i < Position.COLUMNS_MAX(); i++) {
        var columnId = RelationsGridLeft.getColumnId(i);
        this.getRelationsGridLeft().removeClass(columnId);
  		  $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
  			$(columnId).addClass(GridColumn.WHERE_USED_8C_CLASS_ID);
	    }      			
      //Set show/hide
			$(RelationsGridLeft.getColumnId(0)).setAttribute("style","display:block;");
			$(RelationsGridLeft.getColumnId(1)).setAttribute("style","display:block;");
			if (Position.COLUMNS_MAX() > 2) {
			  $(RelationsGridLeft.getColumnId(2)).setAttribute("style","display:block;");
		  }
			if (Position.COLUMNS_MAX() > 3) {
			  $(RelationsGridLeft.getColumnId(3)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 4) {
			  $(RelationsGridLeft.getColumnId(4)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 5) {
			  $(RelationsGridLeft.getColumnId(5)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 6) {
			  $(RelationsGridLeft.getColumnId(6)).setAttribute("style","display:block;");
	    }
			if (Position.COLUMNS_MAX() > 7) {
			  $(RelationsGridLeft.getColumnId(7)).setAttribute("style","display:block;");
	    }
			gridList.gridListSplitter.left.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.setAttribute("style","display:none;");
			this.resizeSplitter();
			break;
		}
	};

  this.getGrid = function()                         { return this.grid; };
  this.setGrid = function(grid)                     { this.grid = grid; };
  this.getTypeProxy = function()                    { return this.typeProxy; };
	this.setTypeProxy = function(typeProxy)           { this.typeProxy = typeProxy; };
  this.getEntityProxy = function()                  { return this.entityProxy; };
	this.setEntityProxy = function(entityProxy)       { this.entityProxy = entityProxy; };
  this.getRelationProxy = function()                { return this.relationProxy; };
	this.setRelationProxy = function(relationProxy)   { this.relationProxy = relationProxy; };
  this.getAttributeProxy = function()               { return this.attributeProxy; };
	this.setAttributeProxy = function(attributeProxy) { this.attributeProxy = attributeProxy; };
	
	this.resizeSplitter = function() {
	//alert("RelationsGridMediator/resizeSplitter - cn: "+this.getCurrentNivo());
		if (dijit) {
			var splitter = dijit.byId(GridListSplitter.ID);
			if (splitter) { splitter.resize(); }
		}
	};
	
	this.getGridSize = function() {
		return this.getListSize();
	};

	this.getPageSize = function() {
		return this.pageSize;
	};

  this.setPageSize = function(pageSize) {
    this.pageSize = pageSize;
  };

	this.gridResize = function(gridSize) {
	  if (gridSize !== undefined) {
	    this.setGridSize(gridSize);
	  } else {
	    if (this.isGridNormal() === true) {
	      this.setGridSize(SjamayeeFacade.SIZE_FULL);
	    } else {
	      this.setGridSize(SjamayeeFacade.SIZE_NORMAL);
	    }
	  }
	};

  this.isGridNormal = function() {
    return (this.getGridSize() == SjamayeeFacade.SIZE_NORMAL)?true:false;
  };

  this.isGridFull = function() {
    return (this.getGridSize() == SjamayeeFacade.SIZE_FULL)?true:false;
  };

  this.getMaxOfList = function() {
    return (RelationsGridMediator.PAGE_SIZE_MAX - 1);
  };

  //Abstract
  this.setResizeButtonText = function(text) {};
	
	this.setPosition = function(position) {
		this.getGrid().getPosition().setRow(position.getRow());
		this.getGrid().getPosition().setColumn(position.getColumn());
	};
	
	this.getPosition = function() {
		return this.getGrid().getPosition();
	};
/*TODO: STILL NEEDED / CONFLICTS !!!
	this.setCurrentPosition = function(evt) {
		var elementId = evt.target.id; //evt.currentTarget.id; //evt.target.id;
		**var elementId = null;
		if (evt.target) {
		  elementId = evt.target.id;
		}**
		if (elementId) {
  		if (elementId.length > 0) {
  			var lastPosition = (elementId.length - 1);
  			if ((elementId.charAt(lastPosition) == "D") ||
  			    (elementId.charAt(lastPosition) == "a")) {
  				lastPosition = (lastPosition - 1);
  			}
  			var row = elementId.charAt(lastPosition);
  			var column = elementId.charAt(lastPosition-1);
  			this.setPosition(new Position(row,column));
  		}
		}
	//alert("RelationsGridMediator/setCurrentPosition - elementId: "+elementId+" lastPosition: "+lastPosition+" position: "+position);
	}
*/
  this.getCell = function(line) {
    var position = this.getPosition();
    var _line = ((line !== undefined) && (line !== null))?line:position.getRow();
    //ATT: WHAT-column is equal to last WHERE-column !!!
    var id = RelationsGridLeft.COLUMN_ID+"c"+position.getColumn()+_line; //+"a";
    return $(id);
  };

  this.getCellValue = function(line) {
    var result = null; //'';
    var cell = this.getCell(line);
    if (cell) {
      /*if (cell.innerHTML.length > 0) {
        result = cell.innerHTML;
      }*/
      var cellAnchor = $(cell.id+'a');
      if (cellAnchor) {
        if (cellAnchor.innerHTML.length > 0) {
          result = cellAnchor.innerHTML;
        }
      }
    }
    //alert("RelationsGridMediator/getCellValue - id: "+cell.id+" value: "+cell.innerHTML);
    return result;
  };

  this.highlite = function(cell,cellId,bgColor) {
  /*if (cell) {
      //Highlite selected cell.
      if (cell.isSelected()) {
        if (cell.getNivo() < Position.NIVO_ROOT()) {
          $(cellId).addClass(GridCell.WHERE_USED_SELECTED_CLASS_ID);
        } else if (cell.getNivo() > Position.NIVO_ROOT()) {
          $(cellId).addClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
        }
      }
      //Highlite focused cell.
      //alert("RelationsGridMediator/highlite - 1 - cell: "+cell+" cell/position: "+cell.getPosition()+" cellId: "+cellId);
      //alert("RelationsGridMediator/highlite - 2 - cell/position:\n"+cell.getPosition().print()+"\n\ncurrentPosition:\n"+this.getPosition().print()+
      //                                         "\ncell/nivo: "+cell.getNivo()+" cn: "+this.getCurrentNivo());
      if (cell.getPosition().getRow() == this.getPosition().getRow()) {
        if (cell.getNivo() == this.getCurrentNivo()) {            
          if (cell.getNivo() == Position.NIVO_ROOT()) {
            $(cellId).addClass(GridCell.ROOT_FOCUSED_CLASS_ID);        
          } else if (cell.getNivo() < Position.NIVO_ROOT()) {
            $(cellId).addClass(GridCell.WHERE_USED_FOCUSED_CLASS_ID);
          } else if (cell.getNivo() > Position.NIVO_ROOT()) {
            $(cellId).addClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
          }
        }
      }
    }*/
    //Current position - focus (NEW)
    if ($(cellId)) {
      $(cellId).removeAttribute("style");
      var _bgColor = "inherit";
      if (bgColor) { _bgColor = bgColor; }
      var color = "inherit";
      var fontWeight = ";";
      if (cellId == this.getRootCellId()) {
        _bgColor = FontStyle.COLOR_ROOT();
        color = "black";
        /*alert("RelationsGridMediator/highlite - cellId: "+cellId+" rootCellId: "+this.getRootCellId()+
              "\ncurrentCellId: "+this.getCurrentCellId()+" onCurrentCellId: "+this.onCurrentCellId(cellId));*/
        if (this.onCurrentCellId(cellId)) {
          color = "white";
        }
        fontWeight = ";font-weight:bold;";
      }
      if (this.onCurrentCellId(cellId)) {      
        fontWeight = ";font-weight:bold;";
      }
      $(cellId).setAttribute("style","background-color:"+_bgColor+";color:"+color+fontWeight);
    }
  };

	this.getLine = function() {
	  var result = this.getPosition().getRow();
	  if (result < this.getBeginOfList()) {
	    result = this.getBeginOfList();
	  } else if (result > this.getEndOfList()) {
  	  result = this.getEndOfList();
  	} 
		return result;
	};
	
	this.setLine = function(line) {
		this.getPosition().setRow(line);
	};

	this.lineEmpty = function(line) {
	  var value = this.getCellValue(line);
    return ((value === undefined) || (value === null) || (value.length == 0))?true:false;
  };
	
	this.lineUp = function() {
		try {
			var line = this.getLine();
			if (line > this.getBeginOfList()) {
			  var previousLine = (line - 1);
			  if (!this.lineEmpty(previousLine)) {
    			this.setLine(previousLine);
			  }
			}
		} catch(error) {
			Utils.alert("RelationsGridMediator/lineUp Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

	this.lineDown = function() {
		try {
			var line = this.getLine();
			if (line < this.getEndOfList()) {
			  var nextLine = (line + 1);
			  if (!this.lineEmpty(nextLine)) {
    			this.setLine(nextLine);
			  }
			}
		} catch(error) {
			Utils.alert("RelationsGridMediator/lineDown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};
	
	this.getCurrentNivo = function() {
		//return this.getGrid().getCurrentNivo();
		var result = Position.NIVO_ROOT();
		if (this.getGrid()) {
		  result = this.getGrid().getCurrentNivo();
		}
		return result;
	};

	this.setCurrentNivo = function(nivo) {
		var _nivo = nivo;
    if (_nivo < Position.WHERE_MAX()) {
			_nivo = Position.WHERE_MAX();
		//alert("RelationsGridMediator/setCurrentNivo - NIVO: "+_nivo);
		}
    if (_nivo > Position.WHAT_MAX()) {
			_nivo = Position.WHAT_MAX();
		//alert("RelationsGridMediator/setCurrentNivo - NIVO: "+_nivo);
		}
		var currentNivo = this.getCurrentNivo();
		if (_nivo != currentNivo) {
			//this.currentNivo = _nivo;
		  this.getGrid().setCurrentNivo(_nivo);
			if (_nivo > 4) {
				this.sendNotification(SjamayeeFacade.GRID_4X_SHOW);
			} else if (_nivo >= -3) {
			  var root = RelationsGridLeft.getColumnId(3);
			  if (_nivo == 2) { root = RelationsGridLeft.getColumnId(2); }
			  if (_nivo == 3) { root = RelationsGridLeft.getColumnId(1); }
			  if (_nivo == 4) { root = RelationsGridLeft.getColumnId(0); }
				this.sendNotification(SjamayeeFacade.GRID_4C_SHOW,root);
			} else if (_nivo >= -4) {
				this.sendNotification(SjamayeeFacade.GRID_5C_SHOW);
			} else if (_nivo >= -5) {
				this.sendNotification(SjamayeeFacade.GRID_6C_SHOW);
			} else if (_nivo >= -6) {
				this.sendNotification(SjamayeeFacade.GRID_7C_SHOW);
			} else if (_nivo < -6) {
				this.sendNotification(SjamayeeFacade.GRID_8C_SHOW);  			
			}
		}
	};

	//Abstract
  this.createRelationVO = function(entity) { return undefined; };
  this.createRelation = function(vo)       { return undefined; };
	
	this.switchEntity = function(entityName) {
	//alert("RelationsGridMediator/switchEntity - entityName: "+entityName);
		var _entityName = (entityName !== undefined)?entityName:null;
		var entitySwitched = false;
		try {
			if (_entityName) {
				var entity = this.entityProxy.getByName(_entityName);
    	//alert("RelationsGridMediator/switchEntity - 1 - entity: "+entity); //.print());
				if (entity) {
					var gridView = this.getGrid().getGridView();
					if (gridView) {
						if (gridView.isRootSelectionValid(entity)) {
							//this.setEntityNameSelected(_entityName);
							var root = this.relationProxy.getFirstParentForEntity(entity);
          	  //alert("RelationsGridMediator/switchEntity - 2 - root: "+root); //.print());
							if (root === null) {
								//root = new ModelRelationVO(null,"",null,entity.getId(),null,null);
								root = this.createRelationVO(entity);
							}
          	  //alert("RelationsGridMediator/switchEntity - 3 - root: "+root); //.print());
							if (root) {
							  var rootRelation = this.createRelation(root);
            	//alert("RelationsGridMediator/switchEntity - 4 - rootRelation: "+rootRelation.print());
								this.getGrid().setRootCommand(null);
								entitySwitched = this.setRoot(new GridCell(rootRelation));
								if (entitySwitched) {
                  this.setCurrentCellId(this.getRootCellId());
								}
							}
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("RelationsGridMediator/switchEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (entitySwitched === false) { Utils.beep(1); }
			return entitySwitched;
		}
	};

	this.setRoot = function(root) {
		//alert("RelationsGridMediator/setRoot - root: "+root.print());
		var result = false;
		try {
			if (root) {
				var currentRoot = this.getGrid().getRoot();
				//TODO: ROW_ROOT = EndOfList/2 = 4 of 9 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//currentRoot.setPosition(new Position(this.getRootRow(),Position.COLUMN_ROOT()));
				//currentRoot.setPosition(new Position(Position.ROW_ROOT(),Position.COLUMN_ROOT()));
				var currentGridSnapShot = null; //this.getGrid().getSnapShot();  //TODO; SNAPSHOTS !!!
			  //result = this.getGrid().setRoot(root);
				result = this.setRootNow(root);
				if (result === true) {
					//this.setEntitySelected(this.getGrid().getRootEntity().getName());
					var append = false;
					var command = null;
					if (command === null) {
						append = true;
						command = new RootCommand();
					}
					if (currentRoot) {
						command.setRelation(root.getRelation());
						if (currentGridSnapShot) {
							command.setSnapShot(currentGridSnapShot);
							//this.setLastRootCommand(command,append);                     //TODO: *** !!! ***
						}
					}
				}
			}
		} catch(error) {
			Utils.alert("RelationsGridMediator/setRoot - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};

	this.setRootNow = function(root) {
	  //alert("RelationsGridMediator/setRootNow - root: "+root.print());
		var result = false;
	  try {
			if (root) {
				var rootRelation = root.getRelation();
				if (rootRelation) {
					var rootEntity = this.entityProxy.getById(rootRelation.getCei());
				  //alert("RelationsGridMediator/setRootNow - cei: "+rootRelation.getCei()+" rootEntity: "+rootEntity); //.print());
					if (rootEntity) {
						var gridView = this.getGrid().getGridView();
						if (gridView) {
							if (gridView.isRootSelectionValid(rootEntity)) {
								this.setCurrentNivo(Position.NIVO_ROOT()); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ***
						    this.getGrid().clear();
						    //this.getGrid().root = new GridCell(root.getRelation());
						    this.getGrid().setRoot(new GridCell(root.getRelation()));
						    //this.getGrid().init();
								result = true;
							} else {
								Utils.beep(1);
							}
						}
					}
				}
			}
	  } catch(error) {
			Utils.alert("RelationsGridMediator/setRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};

	this.clear = function() {
    this.getRelationsGridLeft().clear();
    this.getRelationsGridRight().clear();
	};

	this.fillGrid = function() {
	  var grid = this.getGrid();
	  //alert("RelationsGridMediator/fillGrid - grid/id: "+grid.getId());
    //Clear Grid.
    this.clear();
    //RESET GRIDVIEW !!!
    grid.setGridView(null);
    grid.getGridView();
    //Fill cells.
    var columns = grid.getColumns();

    var columnCellCount = "";
    for (var i = Position.COLUMN_FIRST(); i < columns.length; i++) {
      if (columns[i]) {
        columnCellCount += i+": "+columns[i].getSize()+"\n";
      }
    }
    //TODO: several times fillgrid (data/model - left/right) ??????
    //alert("RelationsGridMediator/fillGrid -left- columns: "+columns.length+" columnCellCount:\n"+columnCellCount);
    
    //Fill cells in relationsGridLeft.
    for (var col = Position.COLUMN_FIRST(); col < (columns.length-1); col++) {
      var column = columns[col];
      if (column) {
        var nivo = column.getNivo();
    	//alert("RelationsGridMediator/fillGrid - columns: "+columns.length+" col: "+col+" columnNivo: "+nivo+"\column: "+column.print());
        //column.setRefreshNow();
  		  //column.refresh();
    	  //***************************************************
    	  //TODO: REFACTOR *** DEFAULT_ROWS / ROOT_COLUMN / ***
        //***************************************************
        //Set Column Class & Column Header Class.
        var columnHeaderId = this.getRelationsGridLeft().getColumnHeaderId(col); //RelationsGridLeft.COLUMN_ID+col+'h';
        $(columnHeaderId).removeClass(GridColumn.HEADER_FIRST_CLASS_ID);
        if (col == Position.COLUMN_FIRST()) {
          $(columnHeaderId).addClass(GridColumn.HEADER_FIRST_CLASS_ID);
        }
        //Fill header.
        var columnHeader = nivo;
        var columnHeaderAnchorId = this.getRelationsGridLeft().getColumnHeaderAnchorId(col); //RelationsGridLeft.COLUMN_ID+col+'ha';
        var styleColor = FontStyle.COLOR_WHERE();
        if (nivo == Position.NIVO_ROOT()) {
          styleColor = FontStyle.COLOR_ROOT();
        } else if (nivo > Position.NIVO_ROOT()) { 
          styleColor = FontStyle.COLOR_WHAT();
        }
        var columnHeaderStyles = new Array();
        columnHeaderStyles["position"] = "relative";
        columnHeaderStyles["left"] = "2px";
        columnHeaderStyles["color"] = styleColor;
        //$(columnHeaderAnchorId).set('styles', {position:'relative',left:'2px',color:'black'});
        $(columnHeaderAnchorId).set('styles', columnHeaderStyles);
        $(columnHeaderAnchorId).innerHTML = columnHeader;
        //Fill cells.
        //alert("RelationsGridMediator/fillGrid -left- col: "+col+" cells: "+column.getSize());
        var rootCellId = null;
        var rootCellValue = null;
        //for (var row = this.getBeginOfList(); row <= this.getEndOfList(); row++) {
        for (var row = this.getBeginOfList(); row <= RelationsGridMediator.PAGE_SIZE_MAX; row++) {
          var cellId = this.getRelationsGridLeft().getCellId(row,col); //RelationsGridLeft.COLUMN_ID+'c'+col+row;
          if (nivo > Position.NIVO_ROOT()) {
            cellId = this.getRelationsGridRight().getCellId(row);
          }
          if ($(cellId)) {
            $(cellId).removeAttribute("style");            
            //Remove Cell Classes.                    
            $(cellId).removeClass(GridCell.LEFT_CLASS_ID);          
            $(cellId).removeClass(GridCell.FIRST_CLASS_ID);          
            $(cellId).removeClass(GridCell.WHERE_USED_FOCUSED_CLASS_ID);
            $(cellId).removeClass(GridCell.WHERE_USED_SELECTED_CLASS_ID);
            //$(cellId).removeClass(GridCell.ROOT_CLASS_ID);
            //$(cellId).removeClass(GridCell.ROOT_FOCUSED_CLASS_ID);
            $(cellId).removeClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
            $(cellId).removeClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
            //Set cell classes.
            if ((nivo > Position.NIVO_ROOT()) || (col == Position.COLUMN_FIRST())) {
              $(cellId).addClass(GridCell.LEFT_CLASS_ID);
            }
            if (row == this.getBeginOfList()) {
              $(cellId).addClass(GridCell.FIRST_CLASS_ID);
            }
          }
          if (row <= this.getEndOfList()) {
            var cell = column.getCell(row);
            if (cell) {
              //Set focus/selected classes.
              if (nivo == Position.NIVO_ROOT()) {
                if (rootCellId === null) {
                  if (!cell.isEmpty()) {
                    //rootCellId = this.getRootCellId(); //TODO: IS NOT VARIABLE YET !!!
                    rootCellId = this.getRelationsGridLeft().getCellId(this.getRootRow(),col);
                    rootCellValue = cell.getValue(); //innerHTML; //getValue();
                  }
                }
              }
              //Highlite cell.
              this.highlite(cell,cellId);
              //Set value.
              var cellAnchorId = this.getRelationsGridLeft().getCellAnchorId(row,col); //RelationsGridLeft.COLUMN_ID+'c'+col+row+'a';
              if (nivo > Position.NIVO_ROOT()) {
                cellAnchorId = this.getRelationsGridLeft().getCellAnchorId(row,col);
              }
              //this.getRelationsGridLeft().setCell(cellAnchorId,cell.getValueHtml());
              //var cellValue = '&nbsp;';
              var cellValue = '';
              if (cell.getValue() !== '') {
                //cellValue = '<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+cell.getValueHtml()+'</a>';
                //NO LINKS !!!
                cellValue = cell.getValue();
              }
              if (nivo > Position.NIVO_ROOT()) {
                this.getRelationsGridRight().setCell(cellId,cellValue);
              //} else {
              } else if (nivo < Position.NIVO_ROOT()) {
                this.getRelationsGridLeft().setCell(cellId,cellValue);
              }
              //alert("RelationsGridMediator/fillGrid -left- id: "+cellId+" value: "+cellValue);  
            }
          }
        }
        //Fill root cell!!!
        //Doit here, because of variable place (RESIZE/MIN/MAX)!
        if (rootCellId) {
          //Remove Cell Classes.                    
          $(rootCellId).removeClass(GridCell.LEFT_CLASS_ID);          
          $(rootCellId).removeClass(GridCell.FIRST_CLASS_ID);          
          $(rootCellId).removeClass(GridCell.WHERE_USED_FOCUSED_CLASS_ID);
          $(rootCellId).removeClass(GridCell.WHERE_USED_SELECTED_CLASS_ID);
          //$(rootCellId).removeClass(GridCell.ROOT_CLASS_ID);
          //$(rootCellId).removeClass(GridCell.ROOT_FOCUSED_CLASS_ID);
          $(rootCellId).removeClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
          $(rootCellId).removeClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
          //Reset ROOT class.
          //$(rootCellId).addClass(GridCell.ROOT_CLASS_ID);          
          this.getRelationsGridLeft().setCell(rootCellId,rootCellValue);
          if (this.isCurrentCellIdOnRoot()) {
            this.setCurrentCellId(rootCellId);
          } else {
            this.highlite(null,rootCellId);                   //TODO: Integrate in setCell ??? ON MEDIATORS !!!
          }
        }
      }
    }
    //alert("RelationsGridMediator/fillGrid - Fill cells in relationsGridRight");
    //Fill cells in relationsGridRight.
    var lastNivo = grid.getLastNivo();    
    var column = grid.getColumnByNivo(lastNivo);
    if (column) {
    //alert("RelationsGridMediator/fillGrid - columns: "+columns.length+" lastNivo: "+lastNivo+"\column: "+column.print());
      //column.setRefreshNow();
		  //column.refresh();
  	  //***************************************************
  	  //TODO: REFACTOR *** DEFAULT_ROWS / ROOT_COLUMN / ***
      //***************************************************
      //Fill header.
      var columnHeader = lastNivo;
      //$(RelationsGridRight.COLUMN_HEADER_ANCHOR_ID).innerHTML = columnHeader;
      $(this.getRelationsGridRight().getColumnHeaderAnchorId()).innerHTML = columnHeader;
      //Fill cells.
      //alert("RelationsGridMediator/fillGrid -right- col: "+columns.length+" cells: "+column.getSize());        
      //for (var row = this.getBeginOfList(); row < this.getEndOfList(); row++) {
      for (var row = this.getBeginOfList(); row <= RelationsGridMediator.PAGE_SIZE_MAX; row++) {        
        var cellId = this.getRelationsGridRight().getCellId(row);
        if ($(cellId)) {
          //Remove Cell Classes.
          $(cellId).removeClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
          $(cellId).removeClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
        }
        if (row <= this.getEndOfList()) {        
          var cell = column.getCell(row);
          if (cell) {
          /*if (cell.isSelected()) {
              $(cellId).addClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
            }
            if (row == this.getPosition().getRow()) {
              if (cell.getNivo() == this.getCurrentNivo()) {            
                $(cellId).addClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
              }
            }*/
            //Highlite cell.
            this.highlite(cell,cellId);
            //Set value.
            var cellAnchorId = this.getRelationsGridRight().getCellAnchorId(row); //RelationsGridRight.COLUMN_ID+'c0'+row+'a';
            //this.getRelationsGridRight().setCell(cellAnchorId,cell.getValueHtml());
            //var cellValue = '&nbsp;';
            var cellValue = '';
            if (cell.getValue() !== '') {
              //cellValue = '<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+cell.getValueHtml()+'</a>';            
              //NO LINKS !!!
              cellValue = cell.getValue();
            }
            this.getRelationsGridRight().setCell(cellId,cellValue);
            //alert("RelationsGridMediator/fillGrid -right- id: "+cellId+" value: "+cellValue);
          }
        }
      }
    }
	};
};
RelationsGridMediator = new Class(new RelationsGridMediator());
RelationsGridMediator.PAGE_SIZE_MIN = 10;
RelationsGridMediator.PAGE_SIZE_MAX = 21;
