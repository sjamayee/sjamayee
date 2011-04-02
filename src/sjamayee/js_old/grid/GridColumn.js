var GridColumn = function() {
	this.Extends = SjamayeeBase;
	
	this.initialize = function(nivo,grid,savedCell) {
		var _nivo = (nivo !== undefined && nivo !== null)?nivo:Position.NIVO_ROOT();
	  try {
			this.parent();
	    this.clear();
	    this.setNivo(_nivo);
	    this.setGrid(grid);
  		if (savedCell !== undefined) {
			  this.setSavedCell(savedCell);
	    }
		/*if ((nivo == -3) || (nivo == 1)) {
				this.setSortOrder(Cache.SORT_DESCENDING);
			}*/
	  } catch(error) {
			Utils.alert("GridColumn/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	//Getters & Setters
	this.getNivo = function() {
	  var result = Position.NIVO_ROOT();
	  if (this.nivo !== undefined) {
	    result = this.nivo;
	  }
	  return result;
	};
	this.setNivo = function(nivo) {
		if (nivo !== undefined && nivo !== null) {
	  	this.nivo = nivo;
		}
	};
  //Get GRID!
	this.getGrid = function() {
	  var result = null;
	  if (this.grid !== undefined) {
	    result = this.grid;
	  }
	  return result;
	};
	this.setGrid = function(grid) {
  	this.grid = grid;
	};
	this.getGridView = function() {
		var result = null;
		var grid = this.getGrid();
		if (grid) {
			result = grid.getGridView();
		}
	  return result;
	};
	this.getMaster = function() {
		Utils.alert("GridColumn/getMaster");
		var result = null;
		var nivo = this.getNivo();
		try {
			if (Math.abs(nivo) == (Position.NIVO_ROOT()+1)) {
				result = this.getGrid().getRoot();
			} else if (Math.abs(nivo) > (Position.NIVO_ROOT()+1)) {
				//Get savedCell from previous column.
				var increment = -1;
				if (nivo > Position.NIVO_ROOT()) {
					increment = 1;
				}
				var previousNivo = (nivo - increment);
				var previousColumn = this.getGrid().getColumnByNivo(previousNivo);
				if (previousColumn) {
					result = previousColumn.getSavedCell();			
				}
			}
		} catch(error) {
			Utils.alert("GridColumn/getMaster Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
	  	return result;
		}
	};
	this.isSortDescending = function() {
	  return (this.getSortOrder() == Cache.SORT_DESCENDING);
	};
	this.getSortOrder = function() {
	  var result = Cache.SORT_ASCENDING;
	  if (this.sortOrder !== undefined && this.sortOrder !== null) {
	    result = this.sortOrder;
	  }
	  return result;
	};
	this.setSortOrder = function(sortOrder) {
		if (sortOrder !== undefined && sortOrder !== null) {
			this.sortOrder = sortOrder;
		}
	};
	this.toggleSortOrder = function() {
		var sortOrder = this.getSortOrder();
		Utils.alert("GridColumn/toggleSortOrder - sortOrder: "+sortOrder);
		try {
	    switch (sortOrder) {
	      case Cache.SORT_ASCENDING:
	        this.setSortOrder(Cache.SORT_DESCENDING);
	        break;
	      case Cache.SORT_DESCENDING:
	        this.setSortOrder(Cache.SORT_ASCENDING);
	        break;
	      default:
	        break;
	    }
	  } catch(error) {
			Utils.alert("GridColumn/toggleSortOrder Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return this;
	  }
	};
	this.getSavedLocation = function() {
	  var result = null;
	  if (this.savedLocation !== undefined) {
	    result = this.savedLocation;
	  }
	  return result;
	};
	this.setSavedLocation = function(savedLocation) {
		if (savedLocation !== undefined) {
			this.savedLocation = savedLocation;
		}
	};
	this.getSavedCell = function() {
	  var result = null;
		var savedLocation = this.getSavedLocation();
		if (savedLocation) {
			result = savedLocation.getSavedCell();
		}
	  return result;
	};
	////////////////////////////////////
	// TODO: # cells -> clear column !!!
	////////////////////////////////////
	this.setSavedCell = function(savedCell) {
		if (savedCell) {
		  savedCell.setGridColumn(this);
			var savedLocation = this.getSavedLocation();
			if (savedLocation === null) {
				savedLocation = new SavedLocation(savedCell, this.getTopCell());
				this.setSavedLocation(savedLocation);
			} else {
				savedLocation.setSavedCell(savedCell);
				savedLocation.setTopCell(this.getTopCell());
			}
		}
		this.load(savedCell);
		
	/*		
			if ((this.getSavedCell() === null) || (this.getSavedCell().getId() != savedCell.getId())) {
				var nivo = this.getNivo();
				if (nivo < Position.NIVO_ROOT()) {
					this.getGrid().updateWhereUsed(this);
			  } else if (nivo > Position.NIVO_ROOT()) {
					this.getGrid().updateWhatUsed(this);
				}
			//alert("GridColumn/setSavedCell - nivo: "+nivo+" savedCell: "+savedCell);
			}
		//this.savedCell = GridCell.clone(savedCell);
			this.savedCell = savedCell.clone();
		}
	*/
	};
	this.getTopCell = function() {
	  var result = null;
	  if (this.topCell !== undefined) {
	    result = this.topCell;
	  }
	  return result;
	};
	this.setTopCell = function(topCell) {
		if (topCell !== undefined) {
			this.topCell = topCell.clone();
		}
	};
	this.getColumnNumber = function() {
		var result = Position.COLUMN_FIRST();
		try {
			var gridRange = new GridRange(this.getCurrentNivo());
			if (gridRange) {
				result = gridRange.getColumnNumber(this.getNivo());
			}
	  } catch(error) {
			Utils.alert("GridColumn/getColumnNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return result;
	  }
	};
	this.getSelected = function() {
	 	var result = this.getSavedCell()?true:false;
	  return result;
	};
	this.isSelected = function() {
	  return this.getSelected();
	};
	this.getSort = function() {
	  var result = Cache.SORT_ASCENDING;
	  if (this.sort !== undefined && this.sort !== null) {
	    result = this.sort;
	  }
	  return result;
	};
	this.setSort = function(sort) {
		if (sort !== undefined && sort !== null) {
	  	this.sort = sort;
		}
	};
	this.getCellPosition = function() {
	  var result = 1;
	  if (this.cellPosition !== undefined && this.cellPosition !== null) {
	    result = this.cellPosition;
	  }
	  return result;
	};
	this.setCellPosition = function(cellPosition) {
		if (cellPosition !== undefined && cellPosition !== null) {
	  	this.cellPosition = cellPosition;
		}
	};
	this.isEmpty = function() {
	  return (this.getSize() === 0);
	};
	this.isRoot = function() {
	  return (this.getNivo() == Position.NIVO_ROOT());
	};
	this.isMasterChanged = function() {
		var result = true; //(this.isRoot())?false:true;
		if (this.isRoot() === false) {
			var m1 = this.master;
			var m2 = this.getMaster();
		/*if (m1 && m2)   {
				result = (m1.getId() != m2.getId())?true:false;
			}*/
		}
		return result;
	};
	//Functions
	this.clear = function() {
		Utils.alert("GridColumn/clear - this: "+this);
	  try {
			this.master = null;
	    this.clearCells();
	  } catch(error) {
			Utils.alert("GridColumn/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	this.clearCells = function() {
	  this.cells = [];
		//this.savedLocation = null;
		this.topCell = null;
	  //this.setCellCount(0);
	  this.setCellPosition(1);
	  this.setSort(Cache.SORT_ASCENDING);
	};
	this.getSize = function() {
	  return this.cells.length;
	};
	this.getActualPosition = function(cell) {
	  var result = null;
	  try {
	  //result = new Position(Position.ROW_TOP(),999);                    //TODO: 999 = columnNumber !!!
	  	result = new Position(Position.ROW_TOP(),this.getColumnNumber());
	    for (var i = 0; i < this.getSize(); i++) {
	      var c = this.getCell(i);
	      if (c == cell) {
	        result = c.getPosition();
	        break;
	      }
	    }
	  } catch(error) {
			Utils.alert("GridColumn/getActualPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getCurrentNivo = function() {
	  var result = (Position.NIVO_ROOT() + 1);
	  try {
	    var grid = this.getGrid();
	    if (grid) {
	      result = grid.getCurrentNivo();
	    }
	  } catch(error) {
			Utils.alert("GridColumn/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.reverseSort = function() {
		Utils.alert("GridColumn/reverseSort - this: "+this);
	  try {
	    var m1 = "GridColumn/reverseSort - from: "+this.getSort();
	    var sort = this.getSort();
	    if (sort == Cache.SORT_ASCENDING) {
	      sort = Cache.SORT_DESCENDING;
	    } else {
	      sort = Cache.SORT_ASCENDING;
	    }
	    this.setSort(sort);
	    this.setCellPosition(1);
	    m1 += " to: "+this.getSort(); 
	  //Utils.alert(m1);
	  } catch(error) {
			Utils.alert("GridColumn/reverseSort Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	this.getLastRow = function() {
	  var result = Position.ROW_TOP();
	  try {
	    if (this.getSize() > result) {
	      result = (this.getSize() - 1);
	    }
	  } catch(error) {
			Utils.alert("GridColumn/getLastRow Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getIndex = function() {
	  var result = null;
	  try {
	    result = this.getNivo();
	    if (result != Position.NIVO_ROOT()) {
	      result = (Math.abs(result) - 1);
	    }
	  } catch(error) {
			Utils.alert("GridColumn/getIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.pushCellOnTop = function(gridCell) {
		Utils.alert("GridColumn/pushCellOnTop - gridCell: "+gridCell);
	  var result = null;
	  try {
	    if (gridCell) {
	      gridCell.setGridColumn(this);
	      this.cells.splice(0,0,gridCell);
	      if (this.getSize() > Position.ROWS_MAX()) {
	        result = this.removeCell(Position.ROWS_MAX());
	      }
	      //Increment references!
	    	//relation.reference();
				this.setTopCell(this.getCell(Position.ROW_TOP()));
				/*                                                                   OKE !!!
				//Update column view !!!
				if (document) {
					var columnNumber = this.getColumnNumber();
					var columnId = (Grid.COLUMN_ID+columnNumber);
				//var nivo = this.getNivo();
				//var sortDescending = this.isSortDescending();
				//var columnContentHtml = '<div id="'+columnId+'h">'+GridColumn.buildHeaderHtml(columnNumber,nivo,sortDescending)+'</div>';
					var columnContentHtml = '<div id="'+columnId+'h">'+this.buildHeaderHtml()+'</div>';
					for (var row = Position.ROW_TOP(); row < this.getGrid().getNbrOfRows(); row++) {
						var cell = this.getCell(row);
						var cellId = Grid.COLUMN_ID+'c'+columnNumber+row;
					//columnContentHtml += GridCell.buildContentHtml(columnNumber,row,cell);
						columnContentHtml += cell.buildContentHtml();
					}
					columnContentHtml += '</div>';
					document.getElementById(columnId).innerHTML = columnContentHtml;
				}
				*/
				this.setCellPosition(1); //this.getCellPosition() - 1);
	    }
	  } catch(error) {
			Utils.alert("GridColumn/pushCellOnTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.pushCellOnBottom = function(gridCell) {
		Utils.alert("GridColumn/pushCellOnBottom - gridCell: "+gridCell);
	  var result = null;
	  try {
	    if (gridCell) {
	      gridCell.setGridColumn(this);
	      var lastRow = this.getLastRow();
	      this.cells.splice((lastRow+1),0,gridCell);
	      if (this.getSize() > Position.ROWS_MAX()) {
	        result = this.removeCell(Position.ROW_TOP());
	      }  
	      //Increment references!
	    //relation.reference();
	    }
	  } catch(error) {
			Utils.alert("GridColumn/pushCellOnBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.appendCell = function(gridCell) {
		Utils.alert("GridColumn/appendCell - gridCell: "+gridCell);
	  try {
	    if (gridCell) {
	      gridCell.setGridColumn(this);
	      this.cells.push(gridCell);
	      //Increment references!
	    //relation.reference();
	    }
	  } catch(error) {
			Utils.alert("GridColumn/appendCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	this.removeCell = function(index) {
		Utils.alert("GridColumn/removeCell - index: "+index);
	  var result = null;
	  try {
	    if (index < this.getSize()) {
	      result = this.getCell(index);
	      //Decrement references!
	      // if (result) {
	      // //relation.dereference();
	      // }
	      this.cells.splice(index,1);
	    }
	  } catch(error) {
			Utils.alert("GridColumn/removeCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getCell = function(index) {
	  var result = null;
	  try {
	    if (index < this.getSize()) {
	      result = this.cells[index];
	      if (result) {
	       	result.setPosition(new Position(index,this.getColumnNumber()));
					result.setGridColumn(this);
	      }
	    }
	  } catch(error) {
			Utils.alert("GridColumn/getCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getRelation = function(index) {
	  var result = null;
	  try {
	    var gridCell = this.getCell(index);
	    if (gridCell) {
	     result = gridCell.getRelation();
	    }
	  } catch(error) {
			Utils.alert("GridColumn/getRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.setRoot = function(gridCell) {
		//alert("GridColumn/setRoot - gridCell: "+gridCell.print());
	  try {
	    if (gridCell) {
	      this.clear();
	      //var index = ((this.getGrid().getNbrOfRows() / 2) - 1);
	      //var index = Math.floor(this.getGrid().getNbrOfRows() / 2);
	      ///////////////////////////////////////////////////////////////////////////////////////
	      // PUT ROOT TEMPORARILY IN FIRST CELL, WILL BE REPLACED IN MIDDLE OF COLUMN LATER... //
	      ///////////////////////////////////////////////////////////////////////////////////////
	      this.cells[Position.ROW_TOP()] = gridCell;
	    }
	  } catch(error) {
			Utils.alert("GridColumn/setRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	this.pup = function(gridCell) {
		Utils.alert("GridColumn/pup - gridCell: "+gridCell);
		var result = false;
	  try {
	  //this.refreshNow(false);
	    var nivo = this.getNivo();
	  //Utils.alert("GridColumn/pup - nivo: "+nivo);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (gridCell) {
	        var sort = this.getSort();
	        var cells = null;
	        if (nivo < Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            cells = gridCell.getPreviousParentCells(this.getGrid().getNbrOfRows(),sort);
	          } else {
	            cells = gridCell.getNextParentCells(this.getGrid().getNbrOfRows(),sort);
	          }          
	        } else if (nivo > Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            cells = gridCell.getPreviousChildCells(this.getGrid().getNbrOfRows(),sort);
	          } else {
	            cells = gridCell.getNextChildCells(this.getGrid().getNbrOfRows(),sort);
	          }  
	        }
	        if (cells) {
						result = true;
	          this.clearCells();
	          this.setCellPosition(this.getCellPosition() - this.getGrid().getNbrOfRows());      
	          for (var i = 0; i < cells.length; i++) {
	            var c1 = cells[i];
	            this.appendCell(c1);
	          }
	        	if (this.cells && this.cells.length > 0) {
	          	//IF ON TOP: BETTER DO A REFRESH!!!
	          	if (this.cells.length < Position.ROWS_MAX()) {
	            	this.setCellPosition(1);
							}
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("GridColumn/pup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return result;
	  }
	};
	//TODO: NOT USED ??? OK - SCROLL !!!
	this.up = function(gridCell) {
	//alert("GridColumn/up - position: "+gridCell.getPosition().print());
		Utils.alert("GridColumn/up - gridCell: "+gridCell);
		var result = false;
	  try {
	    var nivo = this.getNivo();
	  //Utils.alert("GridColumn/up - nivo: "+nivo);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (gridCell) {
	        var sort = this.getSort();
	        var previousCell = null;
	        if (nivo < Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            previousCell = gridCell.getPreviousParent();
	          } else {
	            previousCell = gridCell.getNextParent();
	          }
	        } else if (nivo > Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            previousCell = gridCell.getPreviousChild();
	          } else {
	            previousCell = gridCell.getNextChild();
	          }
	        }
					if (previousCell) {
	        	this.pushCellOnTop(previousCell);
	        //this.setCellPosition(this.getCellPosition() - 1);
					//this.setTopCell(previousCell);
					//result = true;
					}
	      }
	    }
	    _rf.setColumnInfo(this);
	  } catch(error) {
			Utils.alert("GridColumn/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return result;
		}
	};
	this.load = function(gridCell) {
		//alert("GridColumn/load - gridCell: "+gridCell.print());
		var result = false;
	  try {
	    var nivo = this.getNivo();
	  //Utils.alert("GridColumn/pdn - nivo: "+nivo);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (gridCell) {
	        var sort = this.getSort();
	        var cells = null;
	        if (nivo < Position.NIVO_ROOT()) {
            cells = gridCell.getParentCells(this.getGrid().getNbrOfRows(),sort);
	        } else if (nivo > Position.NIVO_ROOT()) {
            cells = gridCell.getChildCells(this.getGrid().getNbrOfRows(),sort);
	        }
	        if (cells) {
						result = true;
        		//alert("GridColumn/load - result: "+result+" cells: "+cells.length);
	          this.clearCells();
	          this.setCellPosition(this.getCellPosition() + this.getGrid().getNbrOfRows());
	          for (var i = 0; i < cells.length; i++) {
	            var c1 = cells[i];
	            this.appendCell(c1);
	          }
	        }
	      }
	    }
  		//alert("GridColumn/load - result: "+result+" this.cells: "+this.getSize());
	  } catch(error) {
			Utils.alert("GridColumn/load Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return result;
	  }
	};
	this.pdn = function(gridCell) {
		Utils.alert("GridColumn/pdn - gridCell: "+gridCell);
		var result = false;
	  try {
	    var nivo = this.getNivo();
	  //Utils.alert("GridColumn/pdn - nivo: "+nivo);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (gridCell) {
	        var sort = this.getSort();
	        var cells = null;
	        if (nivo < Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            cells = gridCell.getNextParentCells(this.getGrid().getNbrOfRows(),sort);
	          } else {
	            cells = gridCell.getPreviousParentCells(this.getGrid().getNbrOfRows(),sort);
	          }
	        } else if (nivo > Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            cells = gridCell.getNextChildCells(this.getGrid().getNbrOfRows(),sort);
	          } else {
	            cells = gridCell.getPreviousChildCells(this.getGrid().getNbrOfRows(),sort);
	          }
	        }
	        if (cells) {
						result = true;
	          this.clearCells();
	          this.setCellPosition(this.getCellPosition() + this.getGrid().getNbrOfRows());
	          for (var i = 0; i < cells.length; i++) {
	            var c1 = cells[i];
	            this.appendCell(c1);
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("GridColumn/pdn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return result;
	  }
	};
	//TODO: NOT USED ??? OK - SCROLL !!!
	this.down = function(gridCell) {
	//alert("GridColumn/down - position: "+gridCell.getPosition().print());
		Utils.alert("GridColumn/down - gridCell: "+gridCell);
		var result = false;
	  try {
	    var nivo = this.getNivo();
	  //Utils.alert("GridColumn/down - nivo: "+nivo);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (gridCell) {
	        var sort = this.getSort();
	        var nextCell = null;
	        if (nivo < Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            nextCell = gridCell.getNextParent();
	          } else {
	            nextCell = gridCell.getPreviousParent();
	          }
	        } else if (nivo > Position.NIVO_ROOT()) {
	          if (sort == Cache.SORT_ASCENDING) {
	            nextCell = gridCell.getNextChild();
	          } else {
	            nextCell = gridCell.getPreviousChild();
	          }
	        }
					if (nextCell) {
	        	this.pushCellOnBottom(nextCell);
	        	this.setCellPosition(this.getCellPosition() + 1);
						this.setTopCell(this.getCell(Position.ROW_TOP()));
						result = true;
					}
	      }
	    }
	    _rf.setColumnInfo(this);
	  } catch(error) {
			Utils.alert("GridColumn/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return result;
		}
	};
/*
//this.buildHtml = function(columnNumber,sortDescending) {
	this.buildHtml = function(columnNumber) {
		var _cnr = (columnNumber !== undefined && columnNumber !== null)?columnNumber:null; //GridColumn.COLUMN_9;
	//var _sortDescending = (sortDescending !== undefined && sortDescending !== null)?sortDescending:false;
	//alert("GridColumn/buildHtml");
		Utils.alert("GridColumn/buildHtml");
	  var result = '';
	  try {
			var columnClass = GridColumn.CLASS_ID; //+" "+GridColumn.WHERE_USED_CLASS_ID;	
			var columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHERE_USED_FIRST_CLASS_ID;
			var _columnNumber = this.getColumnNumber();
			if (_cnr) {	_columnNumber = _cnr;	}
			var columnId = Grid.COLUMN_ID+_columnNumber;
		//alert("GridColumn/buildHtml - columnId: "+columnId+" _cnr: "+_cnr+" gc/columnNumber: "+_columnNumber+" ");
			var columnHeader = '&nbsp;';
			var styleColor = 'black';		
			var nivo = (Position.NIVO_ROOT() + 1);
			var width = 0;
			var what = false;
			var display = 'none';
			var padding = '0px 0px 0px 0px';
	    switch (_columnNumber) {
	      case GridColumn.COLUMN_1:
					nivo = Position.NIVO_COLUMN_FIRST();
	      	width = 23;
					display = 'block';
	        break;
	      case GridColumn.COLUMN_2:
					nivo = (Position.NIVO_COLUMN_FIRST() + 1);
	      	width = 23;
					display = 'block';
	        break;
	      case GridColumn.COLUMN_3:
					nivo = (Position.NIVO_COLUMN_FIRST() + 2);
	      	width = 23;
					display = 'block';
	        break;
	      case GridColumn.COLUMN_4:
		    	columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_ROOT_CLASS_ID;
					nivo = Position.NIVO_ROOT();
		      width = 31;
					display = 'block';
	        break;
	      case GridColumn.COLUMN_9:
	        what = true;
					columnId = Grid.COLUMN_WHAT_ID;
					nivo = (Position.NIVO_ROOT() + 1);
	      	width = 100;
					display = 'block';
				//padding = '0px 0px 0px 19px';
	        break;
	      default:
	        break;
	    }
			columnHeader = nivo;
			if (nivo > Position.NIVO_ROOT()) {
				columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;				
			}
			result = '<div id="'+columnId+'" class="'+columnClass+'" style="width:'+width+'%;display:'+display+';">'+
//						 ' <div id="'+columnId+'h" style="padding:'+padding+'">'+GridColumn.buildHeaderHtml(_columnNumber,nivo,_sortDescending)+'</div>';
							 ' <div id="'+columnId+'h" style="padding:'+padding+'">'+this.buildHeaderHtml(_columnNumber,what)+'</div>';
			var row = null;
			for (row = Position.ROW_TOP(); row < this.getGrid().getNbrOfRows(); row++) {
			//result += GridCell.buildHtml(_columnNumber,row);
				var gridCell = new GridCell();
				if (gridCell) {
					result += gridCell.buildHtml(this,row,what);
				}
			}
			result += '</div>';
	  } catch(error) {
			Utils.alert("GridColumn/buildHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
**this.buildHeaderHtml = function(columnNumber,nivo,sortDescending) {
		var _columnNumber = (columnNumber !== undefined && columnNumber !== null)?columnNumber:GridColumn.COLUMN_9;
		var _nivo = (nivo !== undefined && nivo !== null)?nivo:(Position.NIVO_ROOT() + 1);
		var _sortDescending = (sortDescending !== undefined && sortDescending !== null)?sortDescending:false;**
	this.buildHeaderHtml = function(columnNumber,what) {
		var _cnr = (columnNumber !== undefined && columnNumber !== null)?columnNumber:null; //GridColumn.COLUMN_9;
		var _what = (what !== undefined && what !== null)?what:false;		
		Utils.alert("GridColumn/buildHeaderHtml");
	  var result = '';
	  try {
			var _columnNumber = this.getColumnNumber();
			if (_cnr) {
				_columnNumber = _cnr;
			}
			var _sortDescending = this.getSort();
			var _nivo = this.getNivo();
    	if (_what === true) {
    	  var grid = this.getGrid();
    	  if (grid) {
          _nivo = grid.getLastNivo();
        }
      }
			
			var columnClass = GridColumn.CLASS_ID; //+" "+GridColumn.WHERE_USED_CLASS_ID;	
			var columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHERE_USED_CLASS_ID;
			if (_columnNumber == Position.COLUMN_FIRST()) {
				columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHERE_USED_FIRST_CLASS_ID;
			}
			var columnHeader = _nivo;
			styleColor = FontStyle.COLOR_PARENT(_nivo);
			if (_nivo == Position.NIVO_ROOT()) {
				columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_ROOT_CLASS_ID;
				if (_columnNumber == Position.COLUMN_FIRST()) {
					columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_ROOT_FIRST_CLASS_ID;
				}
			} else if (_nivo > Position.NIVO_ROOT()) {
				styleColor = FontStyle.COLOR_CHILD(_nivo);
				columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;	
				columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHAT_USED_LEFT_CLASS_ID;
				if (_columnNumber == Position.COLUMN_FIRST()) {
					columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHAT_USED_LEFT_FIRST_CLASS_ID;
				}
			}
    	if (_what === true) {
				columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;	
				columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHAT_USED_CLASS_ID;
			}		
			//result = '<div style="color:'+styleColor+';" class="'+columnHeaderClass+'" onclick="toggleSortOrder('+_nivo+');_cf.setEventHappened(true);_cf.setFocusOnList();">';
			result = '<div style="color:'+styleColor+';" class="'+columnHeaderClass+'">';
    	if (_what === true) {
	    	result += '<div style="float:left;width:20px;background-color:'+FontStyle.COLOR_LIGHTGRAY+';">&nbsp;</div>';
			}
		  result += '<div style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+((_sortDescending)?'<font color="red">!</font>':'')+'</div></div>';
	  } catch(error) {
			Utils.alert("GridColumn/buildHeaderHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
*/
	this.print = function() {
	  var result = '';
	  try {
	    result = "\nGridColumn:";
	    result += '\nnivo: '+this.getNivo();
	    var master = this.getMaster();
	    if (master) {
	      result += '\nmaster/'+master.print();
	    }
	   	var savedCell = this.getSavedCell();
	   	if (savedCell) {
	     	result += '\nsavedCell/'+savedCell.print();
	    }
	    var i = 0;
	    result += '\ncells:';
	    this.cells.forEach(function(c) {
	      if (c) {
	        result += c.print(i);
	      }
	      i++;
	    });
	  } catch(error) {
			Utils.alert("GridColumn/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
};
GridColumn = new Class(new GridColumn());
//Statics
GridColumn.CLASS_ID = "gridColumn";
GridColumn.WHERE_USED_CLASS_ID = "gridColumnWhereUsed";
GridColumn.WHERE_USED_4C_CLASS_ID = "gridColumnWhereUsed_4C";
GridColumn.WHERE_USED_5C_CLASS_ID = "gridColumnWhereUsed_5C";
GridColumn.WHERE_USED_6C_CLASS_ID = "gridColumnWhereUsed_6C";
GridColumn.WHERE_USED_7C_CLASS_ID = "gridColumnWhereUsed_7C";
GridColumn.WHERE_USED_8C_CLASS_ID = "gridColumnWhereUsed_8C";
GridColumn.ROOT_CLASS_ID = "gridColumnRoot";
GridColumn.ROOT_4C_CLASS_ID = "gridColumnRoot_4C";
GridColumn.ROOT_5C_CLASS_ID = "gridColumnRoot_5C";
GridColumn.ROOT_6C_CLASS_ID = "gridColumnRoot_6C";
GridColumn.ROOT_7C_CLASS_ID = "gridColumnRoot_7C";
GridColumn.WHAT_USED_CLASS_ID = "gridColumnWhatUsed";
GridColumn.WHAT_USED_LEFT_CLASS_ID = "gridColumnWhatUsedLeft";
GridColumn.WHAT_USED_LEFT_4C_CLASS_ID = "gridColumnWhatUsedLeft_4C";
GridColumn.WHAT_USED_LEFT_4X_CLASS_ID = "gridColumnWhatUsedLeft_4X";
GridColumn.HEADER_CLASS_ID = "gridColumnHeader";
GridColumn.HEADER_FIRST_CLASS_ID = "gridColumnHeaderFirst";
GridColumn.HEADER_WHAT_USED_CLASS_ID = "gridColumnHeaderWhatUsed";
GridColumn.COLUMN_1 = 0; // Where / nivo: -3
GridColumn.COLUMN_2 = 1; // Where / nivo: -2
GridColumn.COLUMN_3 = 2; // Where / nivo: -1
GridColumn.COLUMN_4 = 3; // Root  / nivo:  0
GridColumn.COLUMN_5 = 4; // none  / nivo: undefined
GridColumn.COLUMN_6 = 5; // none  / nivo: undefined
GridColumn.COLUMN_7 = 6; // none  / nivo: undefined
GridColumn.COLUMN_8 = 7; // none  / nivo: undefined
GridColumn.COLUMN_9 = 8; // What  / nivo : 1
