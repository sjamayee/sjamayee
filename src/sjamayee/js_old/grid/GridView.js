var GridView = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function(grid) {
		try {
			this.parent();
			this.grid = grid;
			//Update reference in the GRID!
			this.getGrid().setGridView(this);
			this.clear();
			//Determine Grid range.
			this.gridRange = this.getGridRange(); //this.getCurrentNivo());
			//Select columns for Grid View.
		  //var columnNumber = Position.COLUMN_FIRST();
			while (this.gridRange.getNext() === true) {
				var nivo = this.gridRange.getIndex();
			  //alert("GridView/initialize - nivo: "+nivo);
				var gridColumn = this.getGrid().getColumnByNivo(nivo);
			  //alert("GridView/initialize - nivo: "+nivo+" gridColumn:\n"+gridColumn.print());
				if (gridColumn) {
					this.appendColumn(gridColumn);
				}
			}
		} catch(error) {
			Utils.alert("GridView/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getGrid = function() {
	  return this.grid;
	};
	this.setPosition = function(position) {
		if (position) {
			this.getGrid().setPosition(position);
		}
	};
	this.getPosition = function() {
		var result = null;
		try {
			result = this.getGrid().getPosition();
		} catch(error) {
			Utils.alert("GridView/getPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	//Functions
	this.clone = function() {
		Utils.alert("GridView/clone");
		var result = null;
		try {
			result = new GridView();
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("GridView/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.clear = function() {
		Utils.alert("GridView/clear");
		try {
			this.columns = [];
		} catch(error) {
			Utils.alert("GridView/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally { 
			return this;
		}
	};
	this.isHomeView = function(entity) {
		return false; //this.getGridRange().isInitial();
	};
	this.isRootSelectionValid = function(entity) {
		var result = (entity !== undefined && entity !== null)?true:false;
		try {
			if (this.isHomeView() === true) {
				var rootEntity = this.getGrid().getRootEntity();
	/*		if (rootEntity) {
					//Utils.alert("GridView/isRootSelectionValid"+
					//      			"\n\nroot: "+rootEntity.print()+"\n\nentity: "+entity.print());
					if (rootEntity.getId() == entity.getId()) { result = false; }
				}*/
			}
		} catch(error) {
			Utils.alert("GridView/isRootSelectionValid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getRootEntity = function() {
		var result = null;
		try {
			result = this.getGrid().getRoot();
		} catch(error) {
			Utils.alert("GridView/getRootEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getRoot = function() {
		var result = null;
		try {
			result = this.getGrid().getRoot();
		} catch(error) {
			Utils.alert("GridView/getRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getCell = function(index) {
		var result = null;
		try {
			var column = null;
			var nivo = this.getCurrentNivo();
			column = this.getGrid().getColumnByNivo(nivo);
			if (column) {
				result = column.getCell(index);
			}
		} catch(error) {
			Utils.alert("GridView/getCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getCurrentCell = function() {
		var result = null;
		try {
			var position = this.getPosition(); 
		//alert("GridView/getCurrentCell - position: "+((position)?position.print():null)); 
			if (position) {
				var column = this.getColumn(position.getColumn()); 
				if (column) {
					if (column.getNivo() == Position.NIVO_ROOT()) {
						result = this.getRoot();
					} else {
						result = column.getCell(position.getRow());
					}  
				}
			}
		} catch(error) {
			Utils.alert("GridView/getCurrentCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setParentAndChild = function(cell) {
		if (cell) {
			this.getGrid().setParentAndChild(cell);
		}
	};
	this.getNivoBase = function() {
		var nivoBase = Position.NIVO_COLUMN_FIRST();
		try {
			nivoBase = this.getGrid().getNivoBase();
		} catch(error) {
			Utils.alert("GridView/getNivoBase Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return nivoBase;
		}
	};
	this.setCurrentNivo = function(nivo) {
		if (nivo !== null) {
			this.getGrid().setCurrentNivo(nivo);
		}
	};
	this.setCurrentNivoByColumn = function(column) {
		if (column) {
			var gridViewColumn = this.getColumn(column);
			if (gridViewColumn) {
				this.setCurrentNivo(gridViewColumn.getNivo());
			}
		}
	};
	this.getCurrentNivo = function() {
		var result = (Position.NIVO_ROOT() + 1);
		try {
			result = this.getGrid().getCurrentNivo();
		} catch(error) {
			Utils.alert("GridView/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getLastNivo = function() {
	  var result = (Position.NIVO_ROOT() + 1);
	  try {
      var gridRange = this.getGridRange();
      if (gridRange) {
        result = gridRange.getUntil();
      }
	  } catch(error) {
			Utils.alert("GridView/getLastNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getColumns = function() {
		return this.columns;
	};
	this.appendColumn = function(column) {
		Utils.alert("GridView/appendColumn - column: "+column);
		try {
			if (column) {
				this.columns.push(column);
			}
		} catch(error) {
			Utils.alert("GridView/appendColumn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally { 
			return this;
		}
	};
	this.getColumn = function(index) {
		var _index = (index !== undefined && index !== null)?index:Position.COLUMN_FIRST();
	//alert("GridView/getColumn - index: "+_index+" cols/length: "+this.getColumns().length);
		Utils.alert("GridView/getColumn - index: "+_index+" cols/length: "+this.getColumns().length);
		var result = null;
		try {
			var columns = this.getColumns();
			if (columns) {
				if (_index < columns.length) {
  				result = columns[_index];
  				column.setGridView(this);                    // TODO: VERIFY !!!!!!!!! NEEDED ????
				}
			}
		} catch(error) {
			Utils.alert("GridView/getColumn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};

	this.insertCell = function() {
	/*if (this.getGrid().isInsert()) {
		//Utils.alert("GridView/insertCell - INSERT!");
		}*/
		return this;
	};
	//TODO: nivo??? / what if (nivo < 0) ???
	this.getGridRange = function() {
		var result = null;
		try {
			if ((this.gridRange === undefined) || (this.gridRange === null)) {
				this.gridRange = new GridRange(this.getCurrentNivo());
			}
			result = this.gridRange;

	/*var nivo = this.getCurrentNivo();
		var result = new GridRange(nivo);
		try {
			var a = 123;*/

		/*TODO: WHAT IS THIS - FOR WHAT ???
		  - ga naar de eerste lege kolom vanaf nivo 2 !!!
			- ZORG VOOR RECURSION ON EMPTY COLUMN !!!
			/////////////////////////////////
			if (nivo > (Position.NIVO_ROOT() + 1)) {
				var column = this.getGrid().getColumnByNivo(nivo);
				if (column) {
					if (column.isEmpty() === true) {
						var position = this.getPosition();					
						var n1 = this.getGrid().getWhatUsedNivo();
						if (n1) {
							if (nivo != n1) {
								nivo = n1;
								//this.setCurrentNivo(nivo);
							}
						}
						column = this.getGrid().getColumnByNivo(nivo);
						if (column) {
							if (position) {
								position.setRow(Position.ROW_TOP());
								position.setColumn(Position.COLUMN_WHAT_FIRST());
								//LAST COLUMN !!!
								result = new GridRange(nivo);
								**if (result) {
									var lastColumn = (gridRange.getNbrOfColumns() - 1);        
									position.setColumn(lastColumn);
								}**
								var c1 = column.getSavedCell();          
								if (c1) {
									var p1 = c1.getPosition();
									if (p1) {
										position.setRow(p1.getRow());
									}  
								}
							}
						}
						//RESET GRIDVIEW !!!
						this.getGrid().setGridView(null);
						var gridView = this.getGrid().getGridView();
						if (gridView) {
							gridView.setCurrentNivo(nivo);
						}
					}
				}
			}*/
		} catch(error) {
			Utils.alert("GridView/getGridRange Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setFocusOrEditRelation = function(e,row,column) {
		var _e = (e !== undefined)?e:window.event;
		Utils.alert("GridView/setFocusOrEditRelation - e: "+_e+"e.type: "+_e.type+" row: "+row+" column: "+column);
	  try {
	  //this.setFocus(row,column);
	    this.getGrid().setFocus(row,column);
	    if (_rf.hasFocusOnRight() && _e && _e.altKey) {
	      //////////////////////////////////////
	      //TODO: ONLY OK FOR WHAT(1)-COLUMN !!!
	      //////////////////////////////////////
	      //var gridView = this.getGridView();
	      //Utils.alert("Grid/setFocusOrEditRelation - goiing to edit row: "+row+", column:"+column+"\n"+
	      //      			"Cell: "+gridView.getCurrentCell().print());
	      _rf.editRelation();
	    } else {
				//Write navigation command for previous "setFocus"
				var relation = null;
				//RESET GRIDVIEW !!!
			//this.setGridView(null);                                                   // !!! 2010/08/16 !!!
			//var gridView = this.getGridView();
			//if (gridView) {
				//var gridCell = gridView.getCurrentCell();
					var gridCell = this.getCurrentCell();
					if (gridCell) {
						relation = gridCell.getRelation();
						var gridColumn = gridCell.getGridColumn();
						var masterRelation = (gridColumn)?gridColumn.getMaster().getRelation():null;					
						_cf.writeNavigationCommand(gridView,NavigationCommand.NAV_CLICK,relation,masterRelation);			
					}
			//}
			}
	  } catch(error) {
			Utils.alert("GridView/setFocusOrEditRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	this.getNbrOfRows = function() {
		//return GridView.DEFAULT_ROWS; //this.getRows().length;
		return this.getGrid().getNbrOfRows();
	};
	this.getNbrOfColumns = function() {
		var result = GridView.DEFAULT_COLUMNS;
		try {
			result = this.getGrid().getNbrOfColumns();
		} catch(error) {
			Utils.alert("GridView/getNbrOfColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function() {
		var result = "";
		try {
			var columns = this.getNbrOfColumns();
			result = "\nGridView:";
			for (var i = 0; i < this.columns.length; i++) {
				if (columns <= 0) { break; }
				var c = this.columns[i];
				result += (c)?c.print():'';
				columns--;
			}
		} catch(error) {
			Utils.alert("GridView/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
/*
	//Navigation
	this.firstPage = function() {
		Utils.alert("GridView/firstPage");
		var result = false;
		try {
			var column = null;
			var relation = null;
			var currentNivo = this.getCurrentNivo();
			if (currentNivo !== null) {
				column = this.getGrid().getColumnByNivo(currentNivo);
				if (column) {
					var savedCell = column.getSavedCell();
					column.clear();
					var position = this.getPosition();
					if (position) {
						position.setRow(Position.ROW_TOP());
					}
					column.setSavedCell(savedCell);
					result = true;
				}
			}
		} catch(error) {
			Utils.alert("GridView/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.previousPage = function() {
		Utils.alert("GridView/previousPage"); // - this: "+this.print());
		var result = false;
		try {
			var ok = false;
			var column = null;
			var relation = null;
			var nivo = this.getCurrentNivo();
			var position = this.getPosition();
			var gridCell = this.getCell(Position.ROW_TOP());
			if (gridCell) {
				relation = gridCell.getRelation();
				if (gridCell.hasPrevious()) {
					if (position) {
						column = this.getGrid().getColumnByNivo(nivo);
						if (column) {
							result = column.pup(gridCell);
							ok = true;
						}
					}
				}
			}
			if (!ok) {
				Utils.beep(0);
				column = this.getGrid().getColumnByNivo(nivo);    
				if (column) {
					if (position) {
						position.setRow(Position.ROW_TOP());
						if (column.getSelected() === false) {    
							column.setSavedCell(column.getCell(position.getRow()));
						}
					}
				}
			} else { 
				if (column) {
					var lastRow = column.getLastRow();
					if (position.getRow() > lastRow) {
						position.setRow(lastRow);
					}
					if (column.getSelected() === false) {
						column.setSavedCell(column.getCell(position.getRow()));
					}
				}
				//_cf.writeNavigationCommand(this,NavigationCommand.NAV_PUP,relation);
			}
		} catch(error) {
			Utils.alert("GridView/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.up = function() {
	//alert("GridView/up");
		Utils.alert("GridView/up"); // - this: "+this.print());
		var result = false;
		try {
			var ok = false;
			var column = null;
			var relation = null;
			var position = this.getPosition();
			var gridCell = this.getCurrentCell();
			if (gridCell) {
				relation = gridCell.getRelation();
				if (gridCell.hasPrevious()) {
					if (position) {
						var nivo = this.getCurrentNivo();
					//alert("GridView/up - cn: "+nivo);
						column = this.getGrid().getColumnByNivo(nivo);
						if (position.getRow() > Position.ROW_TOP()) {
							ok = true;
							position.up();
							var previousCell = this.getCurrentCell();
							if (previousCell) {
								gridCell.touch(false);
								previousCell.touch(true);
								this.setParentAndChild(previousCell);
							}
						} else {
							ok = true;
							result = column.up(gridCell);
						}
					}
				}
			}
			if (ok === false) {
				Utils.beep(0);
			} else {  
				gridCell = this.getCurrentCell();
				if (gridCell) {
					relation = gridCell.getRelation();
					var masterRelation = (column)?column.getMaster().getRelation():null;
					_cf.writeNavigationCommand(this,NavigationCommand.NAV_UP,relation,masterRelation);
				}
			}
		} catch(error) {
			Utils.alert("GridView/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.left = function() {
		Utils.alert("GridView/left"); // - this: "+this.print());
		var result = false;
		try {
			var ok = false;
			//var cn = Position.NIVO_ROOT();
			var cn = this.getCurrentNivo();
		//alert("GridView/left - cn: "+cn);
			var column = null;
			var relation = null;
			var nextColumn = null;
			var savedCell = null;
			var selectedCell = null;
			var homeView = false;		
			var position = this.getPosition();  
		//alert("GridView/left cn: "+cn+
		//			"\nposition:\n"+position.print());
			var gridCell = this.getCurrentCell();
		  if (!gridCell) {
				if (cn > Position.NIVO_ROOT()) {
					//TO RETURN FROM EMPTY COLUMN!
					ok = true;
				}
			} else {
				if (gridCell.navigationLeft()) {
					relation = gridCell.getRelation();
					ok = true;
				}
			}
			if (ok) {
				column = this.getGrid().getColumnByNivo(cn);
			**if (cn != Position.NIVO_ROOT()) {
					column = this.getGrid().getColumnByNivo(cn);
				}**
				if (cn > Position.WHERE_MAX()) {
					cn = (cn - 1);                           // TEST LIMIT !!!
					if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
						if (column) {
							column.setSavedCell(gridCell);			 // TODO: # cells -> clear column !!!
						}
					} else if (cn >= Position.NIVO_ROOT()) {
						if (column) {
							selectedCell = column.getSavedCell();
							if ((column.getNivo() >= this.getGrid().getWhatUsedNivo()) || (column.isSelected() === false)) {
								column.setSavedCell(gridCell);
							}
						}
					}
				//alert("GridView/left BEFORE - cn: "+cn);
					nextColumn = this.getGrid().getColumnByNivo(cn);
				//alert("GridView/left - 1 - result: "+result+" nextColumn: "+nextColumn+" cn: "+cn+" gridCell: "+gridCell+" navigationLeft: "+((gridCell)?gridCell.navigationLeft():false));				
					if (nextColumn) {
						result = true;
						this.setCurrentNivo(cn);
						if (cn <= Position.NIVO_ROOT()) {
						//alert("GridView/left AFTER - cn: "+cn);
							homeView = this.isHomeView();
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
							//gridCell.touch(((gridCell.isSelected())?true:false));
								gridCell.touch(gridCell.isSelected());
								savedCell.touch(true);
								this.setParentAndChild(savedCell);
							//result = false;
							}
						}
					}
				}
			}
			if (!ok) {
				Utils.beep(0);
			} else {
				//Write navigation command.
				var rto = null;
				//RESET GRIDVIEW !!!
				this.getGrid().setGridView(null);
				var gridView = this.getGrid().getGridView();
				if (gridView) {
					gridCell = gridView.getCurrentCell();
					if (gridCell) {
						rto = gridCell.getRelation();
						_cf.writeNavigationCommand(gridView,NavigationCommand.NAV_LEFT,rto,relation);
					}
				}
			}
			var m1 = "GridView/left - currentNivo: "+cn+"\n";
			if (position) { m1 += " p: "+position.print()+"\n"; }
			if (savedCell) { m1 += "sc: "+savedCell.print(); }
		//alert("GridView/left - 2 - result: "+result+" nextColumn: "+nextColumn+" cn: "+cn+" gridCell: "+gridCell+" navigationLeft: "+((gridCell)?gridCell.navigationLeft():false));		
		} catch(error) {
			Utils.alert("GridView/left Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
	this.root = function() {
		Utils.alert("GridView/root"); // - this: "+this.print());
		try {
			this.setCurrentNivo(Position.NIVO_ROOT());
			var position = this.getPosition();
			position.root();
			//Set Focus !!!
			_rf.setColumnInfo(this.getGrid().getColumnByNivo(Position.NIVO_ROOT()));
		} catch(error) {
			Utils.alert("GridView/root Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return '\nGridView/Root';
		}
	}
	this.right = function() {
		Utils.alert("GridView/right"); // - this: "+this.print());
		var result = false;
		try {
			var ok = false;
			var cn = this.getCurrentNivo();
		//alert("GridView/right - cn: "+cn);
			var column = null;
			var relation = null;
			var nextColumn = null;
			var savedCell = null;
			var selectedCell = null;
			var homeView = false;
			var position = this.getPosition();  
			var gridCell = this.getCurrentCell();
			if (gridCell) {
				relation = gridCell.getRelation();
				if (gridCell.navigationRight()) {
					column = this.getGrid().getColumnByNivo(cn);
				**if (cn != Position.NIVO_ROOT()) {
						column = this.getGrid().getColumnByNivo(cn);
					}**
				//alert("GridView/right - cn: "+cn+" column: "+column);
					if (cn < Position.WHAT_MAX()) {
						cn = (cn + 1);                           // TEST LIMIT !!!
						if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
							if (column) {
								column.setSavedCell(gridCell);			 // TODO: # cells -> clear column !!!
							}  
						} else if (cn <= Position.NIVO_ROOT()) {
							if (column) {
								selectedCell = column.getSavedCell();
								if ((column.getNivo() <= this.getGrid().getWhereUsedNivo()) || (column.isSelected() === false)) {									
									column.setSavedCell(gridCell);
								}
							}  
						}
					//alert("GridView/right BEFORE - cn: "+cn+" nextColumn: "+nextColumn);
						nextColumn = this.getGrid().getColumnByNivo(cn);
						if (nextColumn) {
							result = true;
						//alert("GridView/right AFTER - cn: "+cn+" nextColumn: "+nextColumn);
							this.setCurrentNivo(cn);
							if (cn > Position.NIVO_COLUMN_FIRST()) {
								homeView = this.isHomeView();				
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
									gridCell.touch(gridCell.isSelected());
									savedCell.touch(true);
									this.setParentAndChild(savedCell);
								//result = false;
								}
							}
						}
					}
				}
			}
			if (!ok) {
				Utils.beep(0);
			} else {
				//Write navigation command.
				var rto = null;
				//RESET GRIDVIEW !!!
				this.getGrid().setGridView(null);
				var gridView = this.getGrid().getGridView();
				if (gridView) {
					gridCell = gridView.getCurrentCell();
					if (gridCell) {
						rto = gridCell.getRelation();
						_cf.writeNavigationCommand(gridView,NavigationCommand.NAV_RIGHT,rto,relation);
					}
				}
			}  
			var m1 = "GridView/right - currentNivo: "+cn+"\n";
			if (position) { m1 += " p: "+position.print()+"\n"; }
			if (savedCell) { m1 += "sc: "+savedCell.print(); }
			//Utils.alert(m1);
		//alert("GridView/right - result: "+result+" nextColumn: "+nextColumn+" cn: "+cn+" gridCell: "+gridCell+" navigationRight: "+gridCell.navigationRight());
		} catch(error) {
			Utils.alert("GridView/right Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result; 
		}
	}
	this.down = function() {
		Utils.alert("GridView/down");
		var result = false;
		try {
			var ok = false;
			var column = null;
			var relation = null;
			var position = this.getPosition();
			var gridCell = this.getCurrentCell();
			if (gridCell) {
				relation = gridCell.getRelation();
				if (gridCell.hasNext()) {
					if (position) {
						var nivo = this.getCurrentNivo();
					//alert("GridView/down - cn: "+nivo);
						column = this.getGrid().getColumnByNivo(nivo);
						var lastRow = column.getLastRow();
						if (position.getRow() < lastRow) {
							ok = true;
							position.down();
							var nextCell = this.getCurrentCell();
							if (nextCell) {
								gridCell.touch(false);
								nextCell.touch(true);
								this.setParentAndChild(nextCell);
							}
						} else {
							ok = true;
							result = column.down(gridCell);
						}
					}
				}
			}
			if (ok === false) {
				Utils.beep(0);
			} else { 
				gridCell = this.getCurrentCell();
				if (gridCell) {
					relation = gridCell.getRelation();
					var masterRelation = (column)?column.getMaster().getRelation():null;				
					_cf.writeNavigationCommand(this,NavigationCommand.NAV_DOWN,relation,masterRelation);
				}
			}
		} catch(error) {
			Utils.alert("GridView/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
	this.nextPage = function() {
		Utils.alert("GridView/nextPage");
		var result = false;
		try {
			var ok = false;
			var column = null;
			var relation = null;
			var nivo = this.getCurrentNivo();
			var lastRow = Position.ROW_TOP();
			var position = this.getPosition();
			var gridCell = this.getCell(Position.ROW_BOTTOM());
			if (gridCell) {
				relation = gridCell.getRelation();
				if (gridCell.hasNext()) {
					if (position) {
						column = this.getGrid().getColumnByNivo(nivo);
						if (column) {
							result = column.pdn(gridCell);
							ok = true;
						}
					}
				}
			}
			if (ok === false) {
				Utils.beep(0);
				if (column) {
					if (position) {
						lastRow = column.getLastRow();
						position.setRow(lastRow);
						if (column.getSelected() === false) {
							column.setSavedCell(column.getCell(position.getRow()));
						}
					}
				}
			} else {
				if (column) {
					lastRow = column.getLastRow();
					if (position.getRow() > lastRow) {
						position.setRow(lastRow);
					}
					if (column.getSelected() === false) {
						column.setSavedCell(column.getCell(position.getRow()));
					}
				}
				//_cf.writeNavigationCommand(this,NavigationCommand.NAV_PDN,relation);
			}
		} catch(error) {
			Utils.alert("GridView/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
	this.lastPage = function() {
		Utils.alert("GridView/lastPage");
		var result = false;
		try {
			var column = null;
			var relation = null;
			var currentNivo = this.getCurrentNivo();
			if (currentNivo !== null) {
				column = this.getGrid().getColumnByNivo(currentNivo);
				if (column) {
					var savedCell = column.getSavedCell();
					column.clear();
					var position = this.getPosition();
					if (position) {
						position.setRow(Position.ROW_TOP());
					}
					column.setSavedCell(savedCell);
					result = true;
				}
			}
		} catch(error) {
			Utils.alert("GridView/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}
*/
	this.setFocusOnPosition = function() {
		Utils.alert("GridView/setFocusOnPosition"); // - this: "+this.print());
		try {
			var position = this.getPosition();
			//alert("GridView/setFocusOnPosition 1 position: "+position.print());
			if (position) {
				var cell = this.getCurrentCell();
				if (cell !== undefined && cell !== null && !cell.isEmpty()) {
					//alert("GridView/setFocusOnPosition 1 position: "+position.print());
					//this.setParentAndChild(cell);
					var abc = 1;
				} else {
					//alert("GridView/setFocusOnPosition 2 position: "+position.print());
					while (position.getRow() > Position.ROW_TOP()) {
						//this.setPosition(position.up());
						position.up();
						//alert("GridView/setFocusOnPosition 3 position: "+position.print());
						cell = this.getCurrentCell();
						if (cell !== undefined && cell !== null && !cell.isEmpty()) {
							break;
						}
						if ((position.getRow() <= Position.ROW_TOP()) || ((cell === undefined) || (cell === null) || (cell.isEmpty() === true))) { break; }
					}
				}
				if (cell) {
				/*var cn = this.getCurrentNivo();
					if (cn != Position.NIVO_ROOT()) {
						var column = this.getGrid().getColumnByNivo(cn);
					}*/
					this.setParentAndChild(cell);				
				}
				if (document) {
					if (document.getElementById(position.id())) {
						document.getElementById(position.id()).focus();
					}
					//TODO: REVIEW IN GENERAL !!! (setFocusOnPanel) !!!
					if (document.getElementById(ApplicationFacade.NAVIGATION_CONTROL_ID)) {
						document.getElementById(ApplicationFacade.NAVIGATION_CONTROL_ID).focus();
					}
				}
	/*
				} else {
					if (_rf) {
						var row = position.getRow();
						if (row > Position.ROW_TOP) {
							position.setRow(row-1);
							this.getGrid().setFocus(position.getRow(),position.getColumn());
						}
					}
				}
				//Utils.alert("GridView/1/position (r/c): "+position.getRow()+"/"+position.getColumn());
	*/
			}
		} catch(error) {
			Utils.alert("GridView/setFocusOnPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			//Mode: DISPLAY
		//_cf.setMode(Grid.MODE_DISPLAY);
		}
	};
	this.setFocusOnColumnSavedCell = function(cell) {
		Utils.alert("GridView/setFocusOnColumnSavedCell - cell: "+cell);
		try {
			var position = this.getPosition();
			if (position) {
				var row = Position.ROW_TOP();
				var column = Position.COLUMN_WHAT_FIRST();
				if (cell !== undefined && cell !== null) {
					var cellPosition = cell.getPosition();
					if (cellPosition) {
						row = cellPosition.getRow();
					//column = cellPosition.getColumn();
					}
				}
				position.setRow(row);
				position.setColumn(column);
				this.setFocusOnPosition();
			}
		} catch(error) {
			Utils.alert("GridView/setFocusOnColumnSavedCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			//Mode: DISPLAY
			if (_cf) { _cf.setMode(Grid.MODE_DISPLAY); }
		}
	};
	this.setFocusOnRoot = function() {
		Utils.alert("GridView/setFocusOnRoot");
		this.getGrid().setFocusOnRoot();
	};
};
GridView = new Class(new GridView());
//Statics
GridView.DEFAULT_ROWS = 10;
GridView.DEFAULT_COLUMNS = 5;
GridView.MAXIMUM_COLUMNS = 8;
GridView.columnNumberOfNivo = function(nivo) {
	Utils.alert("GridView/columnNumberOfNivo - nivo: "+nivo);
	var result = Position.COLUMN_FIRST();
	try {
		//Determine columnNumber for this Nivo!
		if (nivo > Position.NIVO_COLUMN_FIRST()) {
			result++;
		}
		if (nivo == (Position.NIVO_ROOT() - 1)) {
			result++;
		}
		if (nivo == Position.NIVO_ROOT()) {
			result = Position.COLUMN_ROOT();
		}
		if (nivo > Position.NIVO_ROOT()) {
			result = Position.COLUMN_WHAT_FIRST();
		}
	} catch(error) {
		Utils.alert("GridView/columnNumberOfNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
GridView.setFocusOnHome = function() {
	Utils.alert("GridView/setFocusOnHome");
	try {
		var position = this.getPosition();
		if (position) {
			position.leftTop();
			var nivo = position.getCurrentNivo();   //getNivo();
			var row = -1; //currentRow(nivo);       //TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if (row == -1) { row = Position.ROW_TOP(); }
			position.home();
			this.setFocusOnPosition();
		}
	} catch(error) {
		Utils.alert("GridView/setFocusOnHome Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
GridView.setFocusOnEnd = function() {
	Utils.alert("GridView/setFocusOnEnd");
	this.setFocusOnPosition();
};
GridView.setFocusOnLeftTop = function() {
	Utils.alert("GridView/setFocusOnLeftTop");
	try {
		var position = this.getPosition();
		if (position) {
			if (position.getColumn() == Position.COLUMN_FIRST()) {
				position.leftTop();
			}
			this.setFocusOnPosition();
		}
	} catch(error) {
		Utils.alert("GridView/setFocusOnLeftTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
GridView.setFocusOnRightTop = function() {
	Utils.alert("GridView/setFocusOnRightTop");
	try {
		var gridColumns = RelationsForm.getGridColumns();
		var position = this.getPosition();
		if (position) {
			if (position.getColumn() >= gridColumns) {
				position.rightTop();
			}
			this.setFocusOnPosition();
		}
	} catch(error) {
		Utils.alert("GridView/setFocusOnRightTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
GridView.setFocusOnRoot = function() {
//alert("GridView/setFocusOnRoot - NOK NOK NOK !!!");
	try {
	  var a = 1;
		//_grid.setFocusOnRoot();
	} catch(error) {
		Utils.alert("GridView/setFocusOnRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
};
