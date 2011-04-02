//Abstract
var Grid = function() {
	this.Extends = SjamayeeBase;
	this.id = null;
  this.typeProxy = null;
  this.entityProxy = null;
  this.relationProxy = null;
  this.attributeProxy = null;
	
	this.initialize = function(id) {
	  try {
			this.parent();
			this.setId(id);
	    this.setDefaultCellWidth("90px");                     // 12.5%
	    this.setMinimumCellWidth("120px");
	    this.setRootCellWidth("120px");                       // 17.5%
	    this.setLastCellWidth("100%");                        // 100%
	    //Position
	  	//Utils.alert("Grid/constructor - 7");
	    this.setPosition(new Position());
	    //Keyboard
	  	//Utils.alert("Grid/constructor - 8");
	    this.setKeyboard(new SKeyboard());
	    //Current Nivo   
	    this.setCurrentNivo(Position.NIVO_ROOT());
	    //Initialize.
	    this.clear();
	  	//Utils.alert("Grid/constructor - 9");
	  } catch(error) {
			Utils.alert("Grid/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	//Getters & Setters
  this.getTypeProxy = function()                    { return this.typeProxy; };
	this.setTypeProxy = function(typeProxy)           { this.typeProxy = typeProxy; };
  this.getEntityProxy = function()                  { return this.entityProxy; };
	this.setEntityProxy = function(entityProxy)       { this.entityProxy = entityProxy; };
  this.getRelationProxy = function()                { return this.relationProxy; };
	this.setRelationProxy = function(relationProxy)   { this.relationProxy = relationProxy; };
  this.getAttributeProxy = function()               { return this.attributeProxy; };
	this.setAttributeProxy = function(attributeProxy) { this.attributeProxy = attributeProxy; };
	
	this.getId = function()   { return this.id;	};
	this.setId = function(id) { this.id = id; };
	
	this.getMode = function() { return this.mode; };
	this.setMode = function(mode) {
		if (mode !== null) {
	  	if (this.mode !== null) {
	    	if (this.mode != mode) {
	      	this.setGridView(null);
					Utils.beep(2);
				}
	    }
		  this.mode = mode;
	  }
	};
	this.isDisplay = function() {
	  return (this.mode == Grid.MODE_DISPLAY);
	};
	this.isEdit = function() {
	  return (this.mode == Grid.MODE_EDIT);
	};
	this.isInsert = function() {
	  return (this.mode == Grid.MODE_INSERT);
	};
	this.getNivo = function() {
	/*var result = Position.NIVO_ROOT();
		if (this.nivo !== undefined && this.nivo !== null) {
			result = this.nivo;
		}*/
	  return this.getCurrentNivo();
	};
	this.setNivo = function(nivo) {
	  if (nivo !== null) {
	  	//this.nivo = nivo;
	  	this.setCurrentNivo(nivo);
		}
	};
	this.getWhereUsedNivo = function() {
		Utils.alert("Grid/getWhereUsedNivo"); // - this: "+this.print());
		var result = (Position.NIVO_ROOT() - 1);
		if (this.whereUsedNivo !== undefined && this.whereUsedNivo !== null) {
			result = this.whereUsedNivo;
		}
	  return result;
	};
	this.setWhereUsedNivo = function(whereUsedNivo) {
	  if (whereUsedNivo !== null) {
	  	this.whereUsedNivo = whereUsedNivo;
		}
	};
	this.updateWhereUsed = function(column) {
		var _column = (column !== undefined)?column:null;
		Utils.alert("Grid/updateWhereUsed - column: "+_column);
	  try {
	  	var nivo = (Position.NIVO_ROOT() - 1);
			if (_column) {
				nivo = _column.getNivo();
			}
	  	var index = (Math.abs(nivo) - 1);
		  var howMany = 1;
			var length = this.whereUsed.length;
			if (index < (length - 1)) {
			  howMany = (length - index);
			}
			if (howMany > 0) {
				this.whereUsed.splice(index,howMany,_column);
			} else {
				this.whereUsed.push(_column);
			}		
			this.setWhereUsedNivo(nivo);
		} catch(error) {
			Utils.alert("Grid/updateWhereUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
	  	return this;
		}
	};
	this.getWhatUsedNivo = function() {
		var result = (Position.NIVO_ROOT() + 1);
		if (this.whatUsedNivo !== undefined && this.whatUsedNivo !== null) {
			result = this.whatUsedNivo;
		}
	/*
		if (result) {
			var n = (Position.NIVO_ROOT() + 1);
			while (n < result) {
				var column = this.getColumnByNivo(n);
				if (column) {
					if (column.isEmpty()) { break; }
					var cell = column.getMaster();
					if (column.isSelected()) {
						cell = column.getSavedCell();
					}
					if (cell) {
						var relation = cell.getRelation();
						if (relation) {
							if (relation.getFirstChildRelation()) {
								n = n + 1;
								continue;
							}
						}
					}
				}
				break;
			}
			if (this.whatUsedNivo !== undefined && this.whatUsedNivo !== null) {
				if (n < this.whatUsedNivo) {
					var c1 = this.getColumnByNivo(n);
					if (c1) {
						if (!c1.isEmpty()) {
							n = n + 1;
						}
					}
				}
			}
			result = n;
		}
	*/
		//this.setWhatUsedNivo(result);
	  return result;
	};
	this.setWhatUsedNivo = function(whatUsedNivo) {
	  if (whatUsedNivo !== null) {
	  	 this.whatUsedNivo = whatUsedNivo;
		}
	};
	this.updateWhatUsed = function(column) {
		var _column = (column !== undefined)?column:null;
		Utils.alert("Grid/updateWhatUsed - column: "+_column);
	  try {
	  	var nivo = (Position.NIVO_ROOT() + 1);
			if (_column) {
				nivo = _column.getNivo();
			}
	  	var index = (Math.abs(nivo) - 1);
		  var howMany = 1;
			var length = this.whatUsed.length;
			if (index < (length - 1)) {
			  howMany = (length - index);
			}
		//alert("Grid/updateWhatUsed - nivo: "+nivo+" index: "+index+" length: "+length+" howMany: "+howMany);
			if (howMany > 0) {
				this.whatUsed.splice(index,howMany,_column);
			} else {
				this.whatUsed.push(_column);
			}
			this.setWhatUsedNivo(nivo);		
		} catch(error) {
			Utils.alert("Grid/updateWhatUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
	  	return this;
		}
	};
	this.setPosition = function(position) {
	  if (position) {
	  	this.position = position;
		}
	};
	this.getPosition = function() {
		var result = null;
		if (this.position !== undefined) {
			result = this.position;
		}
	  return result;
	};
	this.getParentCell = function() {
		var result = null;
	/*if (this.parentCell !== undefined) {
			result = this.parentCell;
		}*/
		if (_rf) {
      result = _rf.getParentCell();
    }
	  return result;
	};
	this.setParentCell = function(parentCell) {
	  if (parentCell) {
	  //this.parentCell = parentCell;
			if (_rf) {
	      _rf.setParentCell(parentCell);
	    }
	  }
	};
	this.getChildCell = function() {
		var result = null;
	/*if (this.childCell !== undefined) {
			result = this.childCell;
		}*/
		if (_rf) {
      result = _rf.getChildCell();
    }		
	  return result;
	};
	this.setChildCell = function(childCell) {
		if (childCell) {
	  //this.childCell = childCell;
	   	if (_rf) {
	      _rf.setChildCell(childCell);
	    }
		}
	};
	this.setKeyboard = function(keyboard) {
		if (keyboard) {
	  	this.keyboard = keyboard;
		}
	};
	this.getKeyboard = function() {
		var result = null;
		if (this.keyboard !== undefined) {
			result = this.keyboard;
		}
	  return result;
	};
	this.setGridView = function(gridView) {
  	this.gridView = gridView;
	};
	this.getGridView = function() {
	  if ((this.gridView === undefined) || (this.gridView === null)) {
	    this.setGridView(new GridView(this));
	    //if (this.isEdit()) {}
	    if (this.isInsert() === true) {
	      this.gridView.insertCell();
	    }
	  }
	  return this.gridView;
	};
	this.setNivoBase = function(nivoBase) {
		if (nivoBase !== null) {
	  	this.nivoBase = nivoBase;
		}
	};
	this.getNivoBase = function() {
	  var result = Position.NIVO_COLUMN_FIRST();
	  try {
	  //return this.nivoBase;
	  //return SjamayeeForm.getNivoBase();          // *** NOK ***
	    var gridView = this.getGridView();
	    if (gridView) {
	      var gridRange = gridView.getGridRange();
	      if (gridRange) {
	        result = gridRange.getFrom();
	      }
	    }
	  } catch(error) {
			Utils.alert("Grid/getNivoBase Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.setCurrentNivo = function(currentNivo) {
		if (currentNivo !== null) {
	  	this.currentNivo = currentNivo;
		}
	};
	this.getCurrentNivo = function() {
		var result = (Position.NIVO_ROOT() + 1);
		if (this.currentNivo !== undefined && this.currentNivo !== null) {
			result = this.currentNivo;
		}
	  return result;
	};
	this.getLastNivo = function() {
	  var result = (Position.NIVO_ROOT() + 1);
	  try {
	    var gridView = this.getGridView();
	    if (gridView) {
        result = gridView.getLastNivo();
	    }
	  } catch(error) {
			Utils.alert("Grid/getLastNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getRows = function() {
	  var result = null;
	  try {
	    var gridView = this.getGridView();
	    if (gridView) {
	      result = gridView.getRows();
	    }
	  } catch(error) {
			Utils.alert("Grid/getRows Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getColumns = function() {
	  var result = null;
	  try {
	    var gridView = this.getGridView();
	    if (gridView) {
	      result = gridView.getColumns();
	    }
	  } catch(error) {
			Utils.alert("Grid/getColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getNbrOfRows = function() {
	  //var result = GridView.DEFAULT_ROWS;
	  var result = RelationsGridMediator.PAGE_SIZE_MAX;
	  // try {
	  // /*if (this.gridView) {
	  //     result = this.gridView.getNbrOfRows();
	  //   }*/
	  // } catch(error) {
	  //   Utils.alert("Grid/getNbrOfRows Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  // } finally {
	    return result;
	  // }
	};
	this.getNbrOfColumns = function() {
	  var result = GridView.DEFAULT_COLUMNS;
	  try {
	    var gridView = this.getGridView();
	    if (gridView) {
	      result = gridView.getColumns().length;
	    }
	  } catch(error) {
			Utils.alert("Grid/getNbrOfColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getColumnByIndex = function(index) {
		var _index = (index !== undefined && index !== null)?index:Position.COLUMN_FIRST();
		Utils.alert("Grid/getColumnByIndex - index: "+_index+" cols/length: "+this.getColumns().length);
		var result = null;
		try {
	    var gridView = this.getGridView();
	    if (gridView) {
				result = gridView.getColumn(_index);
			}
		} catch(error) {
			Utils.alert("Grid/getColumnByIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setDefaultCellWidth = function(defaultCellWidth) {
		if (defaultCellWidth !== null) {
	  	this.defaultCellWidth = defaultCellWidth;
		}
	  return this;
	};
	this.getDefaultCellWidth = function() {
	  return this.defaultCellWidth;
	};
	this.setMinimumCellWidth = function(minimumCellWidth) {
		if (minimumCellWidth !== null) {
	  	this.minimumCellWidth = minimumCellWidth;
		}
	  return this;
	};
	this.getMinimumCellWidth = function() {
	  return this.minimumCellWidth;
	};
	this.setRootCellWidth = function(rootCellWidth) {
		if (rootCellWidth !== null) {
	  	this.rootCellWidth = rootCellWidth;
		}
	};
	this.getRootCellWidth = function() {
	  return this.rootCellWidth;
	};
	this.setLastCellWidth = function(lastCellWidth) {
		if (lastCellWidth !== null) {
	  	this.lastCellWidth = lastCellWidth;
		}
	};
	this.getLastCellWidth = function() {
	  return this.lastCellWidth;
	};
	this.setRoot = function(root) {
		var result = false;
	  try {
			if (root) {
				var rootRelation = root.getRelation();
				if (rootRelation) {
					var rootEntityVO = this.getEntityProxy().getById(rootRelation.getCei());
					var rootEntity = null;
					if (this instanceof ModelGrid) {
  					rootEntity = new ModelEntity(rootEntityVO);
  				} else {
  					rootEntity = new DataEntity(rootEntityVO);
					}
				  //alert("Grid/setRoot - cei: "+rootRelation.getCei()+" rootEntity: "+rootEntity.print());
					if (rootEntity) {
						var gridView = this.getGridView();
  				  //alert("Grid/setRoot -1- gridView: "+gridView);
						if (gridView) {
    				  //alert("Grid/setRoot -2- gridView: "+gridView.print());
							//if (gridView.isRootSelectionValid(rootEntity)) {
      				  //alert("Grid/setRoot -3- gridView: "+gridView.print());
						    this.clear();
						    this.root = new GridCell(root.getRelation());
						    this.init();
								result = true;
							/*} else {
								Utils.beep(1);
							}*/
						}
					}
				}
			}
	  } catch(error) {
			alert("Grid/setRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getRoot = function() {
	  var result = null;
	  try {
	    var root = this.root;
	    //alert("Grid/getRoot - root: "+root);
	    if (root) {
  	    //alert("Grid/getRoot - root: "+root.print());
	      var column = new GridColumn(Position.NIVO_ROOT(),this,root);
	      if (column) {
	        column.setRoot(root);
	        root.setGridColumn(column);
					root.setPosition(new Position(Position.ROW_ROOT(),Position.COLUMN_ROOT()));
	        result = root;
	      }
	    }
	  } catch(error) {
			Utils.alert("Grid/getRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.setRootCommand = function(rootCommand) {
		if (rootCommand) {
	  	this.rootCommand = rootCommand;
		}
	};
	this.getRootCommand = function() {
		var result = null;
		if (this.rootCommand !== undefined) {
			result = this.rootCommand;
		}
	  return result;
	};
/*
	this.getRootCell = function() {
	  var result = null;
	  try {
			if (this.root !== undefined && this.root !== null) {
				result = this.root;
			}
	  } catch(error) {
			Utils.alert("Grid/getRootCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
*/
	this.getRootRelation = function() {
	  var result = null;
	  try {
			var root = this.getRoot();
			if (root) {
				result = root.getRelation();
			}
	  } catch(error) {
			Utils.alert("Grid/getRootRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getRootEntity = function() {
	  var result = null;
	  try {
			var rootRelation = this.getRootRelation();
			if (rootRelation) {			  
				var rootEntityVO = this.getEntityProxy().getById(rootRelation.getCei());
				if (this instanceof ModelGrid) {
					result = new ModelEntity(rootEntityVO);
				} else {
					result = new DataEntity(rootEntityVO);
				}
			}
	  } catch(error) {
			Utils.alert("Grid/getRootEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getColumnByNivo = function(nivo) {
	  //alert("Grid/getColumnByNivo - nivo: "+nivo);
	  var result = null;
	  try {
	    //REFACTOR !!! COMPLETE REVIEW !!! NOK !!! NOK !!! NOK !!! *** ROOT/COLUMN *** !!!
	    var index = Math.abs(nivo); //(Math.abs(nivo) - 1);
	    var savedCell = (index == 1)?this.root:null;
	    if (nivo == Position.NIVO_ROOT()) {
	      var root = this.getRoot();
	      if (root) {
	        result = root.getGridColumn();
	      } else {
	        //!!! FOR SPECIAL CASE ???
					result = new GridColumn(nivo,this,null);	
				}
	    } else if (nivo < Position.NIVO_ROOT()) {
	      result = this.whereUsed[index];
	      if ((result === undefined) || (result === null)) {
	        if (index < Math.abs(Position.WHERE_MAX())) {
	          result = new GridColumn(nivo,this,savedCell);
	        	this.whereUsed[index] = result;
					  //alert("Grid/getColumnByNivo <0 - nivo: "+nivo+" column: "+result.print());
	        }
	      }
	    } else if (nivo > Position.NIVO_ROOT()) {
	      result = this.whatUsed[index];
	      if ((result === undefined) || (result === null)) {
	        if (index < Position.WHAT_MAX()) {
	          result = new GridColumn(nivo,this,savedCell);
	        	this.whatUsed[index] = result;
					  //alert("Grid/getColumnByNivo >0 - nivo: "+nivo+" column: "+result.print());
	        }
	      }
	    }
	  } catch(error) {
			alert("Grid/getColumnByNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	/*/////////////////////////////////////////////////
	  IS THIS NEEDED --- FOR INSERTING OF A COLUMN ???
	  /////////////////////////////////////////////////
	this.setColumn = function(column) {
		Utils.alert("Grid/setColumn - column: "+column);
	  try {
	    if (column) {
	      var nivo = column.getNivo();
	      var index = (Math.abs(nivo) - 1);
	      var howMany = 1;
	      if (nivo < Position.NIVO_ROOT()) {
	        this.setWhereUsedNivo(nivo);
	        if (index < this.whereUsed.length) {
	          howMany = (this.whereUsed.length - index);
	          this.whereUsed.splice(index,howMany,column);
	        } else {
	          this.whereUsed.push(column);
	        }
	      } else if (nivo > Position.NIVO_ROOT()) {
	        this.setWhatUsedNivo(nivo);
	        if (index < this.whatUsed.length) {
	          howMany = (this.whatUsed.length - index);
	          this.whatUsed.splice(index,howMany,column);
	        } else {
	          this.whatUsed.push(column);
	        }
	      }  
	    }
	  } catch(error) {
			Utils.alert("Grid/setColumn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	*/
	//Functions
	this.home = function() {
		Utils.alert("Grid/home");
		var result = false;
		try {
			var nivo = this.getWhereUsedNivo();
		//alert("Grid/home - nivo: "+nivo);
			this.setCurrentNivo(nivo);
			var column = this.getColumnByNivo(nivo);
			if (column) {
				result = true;
				var position = this.getPosition();
				if (position) {
					var rowNumber = Position.ROW_TOP();
					var savedCell = column.getSavedCell();
					if (savedCell) {
					  var p = savedCell.getPosition();
						if (p) {
							rowNumber = p.getRow();
						}  
					}
					position.setRow(rowNumber);
				}
			}
		} catch(error) {
			Utils.alert("Grid/home Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.end = function() {
		Utils.alert("Grid/end");
		var result = false;
		try {
			var nivo = this.getWhatUsedNivo();
		//alert("Grid/end - nivo: "+nivo);
			this.setCurrentNivo(nivo);
			var column = this.getColumnByNivo(nivo);
			if (column) {
				result = true;
				var position = this.getPosition();
				if (position) {
					var rowNumber = Position.ROW_TOP();
					var savedCell = column.getSavedCell();
					if (savedCell) {
					  var p = savedCell.getPosition();
						if (p) {
							rowNumber = p.getRow();
						}  
					}
					position.setRow(rowNumber);
				}
			}
		} catch(error) {
			Utils.alert("Grid/end Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setParentAndChild = function(cell) {
	//alert("Grid/setParentAndChild - cell: "+cell);
		Utils.alert("Grid/setParentAndChild - cell: "+cell);
		try {
			if (cell) {
				this.setParentCell(cell);
				if (cell.getNivo() == Position.NIVO_ROOT()) {
					this.setChildCell(cell.getChild());
				} else {
					this.setChildCell(cell);				
				}
			}
		} catch(error) {
			Utils.alert("Grid/setParentAndChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	this.init = function() {
		//alert("Grid/init -1- this: "+this.print());
    var gridView = this.getGridView();
		var gridWhere = null;
		var gridWhat = null;
		var nivo = Position.NIVO_ROOT();
		try {
		  var rr = null;
			//ROOT - NOT SET - ONLY AT GET !!!
			var root = this.getRoot();
      //alert("Grid/init -1- root: "+root.print());
			if (root) {
				rr = root.getRelation();
        //alert("Grid/init -2- rr: "+rr);
				if (rr) {
          //alert("Grid/init -3- rr: "+rr.print());
					//Where-used columns
					if (rr.hasParentRelations() === true) {
            //alert("Grid/init -4- rr.hasParentRelations");
						nivo = Position.NIVO_ROOT() - 1;
						gridWhere = this.getColumnByNivo(nivo);
					}
					//What-used columns
					if (rr.hasChildRelations() === true) {
            //alert("Grid/init -5- rr.hasChildRelations");
						nivo = Position.NIVO_ROOT() + 1;
						gridWhat = this.getColumnByNivo(nivo);
					}
				}   
			}
			this.setNivo(Position.NIVO_ROOT());
      //alert("Grid/init -6- root: "+root+" gridWhere: "+gridWhere+" gridWhat: "+gridWhat+" nivo: "+this.getNivo());
  		//alert("Grid/init -9- this: "+this.print());
		} catch(error) {
			alert("Grid/init Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			//Set position to ROOT or to First Child (What-Used).
			//this.setFocusOnRootOrWhat();
			return this;
		}
	};
	this.clear = function() {
		//alert("Grid/clear"); // - this: "+this.print());
	  try {
	    //GridView
	    this.setGridView(null);
	  //this.setStatusMessage(null);
	    //Mode: DISPLAY
	    this.setMode(Grid.MODE_DISPLAY);
	  /*//ParentCell
	    this.setParentCell(null);
	    //ChildCell
	    this.setChildCell(null);*/
	    //Filtered Entities!
	    this.filteredEntities = [];
	    //Where-used columns
	    this.whereUsed = [];
	    this.setWhereUsedNivo(null); //-1); //Position.NIVO_ROOT(); //TODO: 0 -> -1,-2,-3 ???
	    //ROOT
	    this.root = null;
	    //What-used columns
	    this.whatUsed = [];
	    this.setWhatUsedNivo(null); //1); //Position.NIVO_ROOT(); //TODO: 0 -> 1 ???
			//INITIALIZE ***
			//this.init(); !!! root is NULL !!!
	  } catch(error) {
			Utils.alert("Grid/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	this.print = function(html,keysOnly) {
		var _html = (html !== undefined && html !== null)?html:false;
		var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
		var _nl = (_html === true)?'<br/>':'\n';
		var result = 'Grid:'+_nl;
		try {
			result += this.parent();
	  } catch(error) {
			Utils.alert("Grid/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
};
Grid = new Class(new Grid());
//Statics
Grid.PAGE_SIZE = 10;
Grid.MODE_DISPLAY = "DISPLAY";
Grid.MODE_EDIT = "EDIT";
Grid.MODE_INSERT = "INSERT";
//Grid.WHERE_USED_MAX = -15;
//Grid.WHAT_USED_MAX = 25;
Grid.COLUMN_ID      = "gcolumn";
Grid.COLUMN_WHAT_ID = "gcwhat";
Grid.CELL_ANCHOR_ID = "gca"; //gca<row><column> ex. gca25
