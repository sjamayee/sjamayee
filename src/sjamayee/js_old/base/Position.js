var Position = function(row,column) {
	this.Extends = SjamayeeBase;
	this.initialize = function(row,column) {
	  try {
			var _row = ((row !== undefined) && (row !== null))?row:Position.ROW_ROOT();
			var _column = ((column !== undefined) && (column !== null))?column:Position.COLUMN_ROOT();
			this.parent();
	    this.setRow(_row);
	    this.setColumn(_column);
	  } catch(error) {
			Utils.alert("Position/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	//Getters & Setters
	this.initial = function() {
	  var result = false;
	  try {
	    if ((this.getRow() == Position.ROW_TOP()) && (this.getColumn() == Position.COLUMN_FIRST())) {
	      result = true;
	    }
	  } catch(error) {
			Utils.alert("Position/initial Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.setRow = function(row) {
		if (row !== null) {
	  	this.row = row;
		}
	  return this;
	};
	this.getRow = function() {
	  return Number(this.row);
	};
	this.setColumn = function(column) {
		if (column !== null) {
	  	this.column = column;
		}
	  return this;
	};
	this.getColumn = function() {
	  return Number(this.column);
	};
	this.setGridViewColumn = function(gridViewColumn) {
		if (gridViewColumn) {
	  	this.gridViewColumn = gridViewColumn;
		}
	  return this;
	};
	this.getGridViewColumn = function() {
	  return this.gridViewColumn;
	};
	//Functions
	this.clone = function() {
		Utils.alert("Position/clone - abstract.");
		var result = null;
		try {
			result = new Position(this.getRow(),this.getColumn());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("Position/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.init = function() {
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_FIRST());
	  } catch(error) {
			Utils.alert("Position/init Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	//ID
	this.id = function() {
	//return ("c"+this.getRow()+this.getColumn());
		return (Grid.CELL_ANCHOR_ID+this.getRow()+this.getColumn());
	};
	//Nivo
	this.getNivo = function() {
	  var result = Position.NIVO_ROOT();
	  try {
	  	result = this.getCurrentNivo();
	  } catch(error) {
			Utils.alert("Position/getNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	//////////////////////////////////
	//TODO: *** Change to whatever !!!
	//////////////////////////////////
	//CurrentNivo
	this.getCurrentNivo = function() {
	  var result = (Position.NIVO_ROOT() + 1);
	  try {
	    result = _grid.getCurrentNivo();
	  } catch(error) {
			Utils.alert("Position/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.isEqual = function(position) {
		var _position = (position !== undefined)?position:null;
		var result = false;
	  try {
			if (_position) {
				result = ((this.getRow() == _position.getRow()) &&
									(this.getColumn() == _position.getColumn()));
			}
	  } catch(error) {
			Utils.alert("Position/isEqual Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	/////////////////////////////////////
	//LEFT & RIGHT !!!!!ONLY !!! REDO !!!
	/////////////////////////////////////
	this.isRoot = function() {
	  return ((this.getRow() == Position.ROW_ROOT()) &&
	          (this.getColumn() == Position.COLUMN_ROOT()));      
	};
	this.root = function() {
		Utils.alert("Position/root - this: "+this);
	  try {
	  /*
	  //REFACTOR THIS !!! Grid5/6/7/8 !!!
	  //var nivoBase = SjamayeeForm.getNivoBase();   // *** NOK ***
	    var columnRoot = Position.COLUMN_ROOT();
	    if (document.getElementById(SjamayeeForm.GRID_COLUMNS_ID)) {
	      var gridColumns = RelationsForm.getGridColumns();
	      if (gridColumns) {
	        if (Math.abs(nivoBase) < 8) {
	          if (gridColumns == 6)                 { columnRoot = Position.COLUMN_ROOT() + 1; }
	          if (gridColumns == 7)                 { columnRoot = Position.COLUMN_ROOT() + 2; }
	          if (gridColumns == 8)                 { columnRoot = Position.COLUMN_ROOT() + 3; }
	          if (nivoBase == Position.NIVO_ROOT()) { columnRoot = Position.COLUMN_ROOT() - 3; }
	          if (nivoBase == -1)                   { columnRoot = Position.COLUMN_ROOT() - 2; }
	          if (nivoBase == -2)                   { columnRoot = Position.COLUMN_ROOT() - 1; }
	          if (nivoBase == -7)                   { columnRoot = Position.COLUMN_ROOT() + 4; }
	        }
	      }
	    }
	  */
	    var nivoBase = Position.NIVO_COLUMN_FIRST();
	    var gridColumns = Position.COLUMNS_WHERE_USED() + 2;
	    var gridView = _grid.getGridView();
	    if (gridView) {
	      nivoBase = gridView.getNivoBase();
	      gridColumns = gridView.getNbrOfColumns();
	    }    
	    var columnRoot = Position.COLUMN_ROOT();
	    if (Math.abs(nivoBase) < 8) {
	      if (gridColumns == 6)                 { columnRoot = Position.COLUMN_ROOT() + 1; }
	      if (gridColumns == 7)                 { columnRoot = Position.COLUMN_ROOT() + 2; }
	      if (gridColumns == 8)                 { columnRoot = Position.COLUMN_ROOT() + 3; }
	      if (nivoBase == Position.NIVO_ROOT()) { columnRoot = Position.COLUMN_ROOT() - 3; }
	      if (nivoBase == -1)                   { columnRoot = Position.COLUMN_ROOT() - 2; }
	      if (nivoBase == -2)                   { columnRoot = Position.COLUMN_ROOT() - 1; }
	      if (nivoBase == -7)                   { columnRoot = Position.COLUMN_ROOT() + 4; }
	    }
	    this.setRow(Position.ROW_ROOT());
	    this.setColumn(columnRoot);
	  } catch(error) {
			Utils.alert("Position/root Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	this.whatUsed = function() {
		Utils.alert("Position/whatUsed - this: "+this);
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_WHAT_FIRST());
	  } catch(error) {
			Utils.alert("Position/whatUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	this.whereUsed = function() {
		Utils.alert("Position/whereUsed - this: "+this);
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_WHERE_FIRST());
	  } catch(error) {
			Utils.alert("Position/whereUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	//Home: (first column/selection)
	this.home = function() {
		Utils.alert("Position/home - this: "+this);
	  // try {
	  // //var homePosition = SjamayeeForm.getHomePosition();
	  // //goHome();
	  // } catch(error) {
	  //   Utils.alert("Position/home Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  // }
	};
	//Page-up.
	this.pup = function() {
		Utils.alert("Position/pup - this: "+this);
	  try {
	    if (this.nivo() != Position.NIVO_ROOT()) {
	      if (this.getRow() > Position.ROW_TOP()) {
	        //CALL SERVER !!!
	        return this;
	      } else { Utils.beep(0); }
	    } else { Utils.beep(0); }
	  } catch(error) {
			Utils.alert("Position/pup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//Page-down.
	this.pdown = function() {
		Utils.alert("Position/pdown - this: "+this);
	  try {
	    if (this.nivo() != Position.NIVO_ROOT()) {
	      if (this.getRow() > Position.ROW_TOP()) {
	        //CALL SERVER !!!
	        return this;
	      } else { Utils.beep(0); }
	    } else { Utils.beep(0); }
	  } catch(error) {
			Utils.alert("Position/pdown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//Up: (1 row/column).
	this.up = function() {
		Utils.alert("Position/up - this: "+this);
	  try {
	    var cr = this.getRow();
	  //var cc = this.getColumn();
	  //Utils.alert("position/up cr/cc "+cr+"/"+cc);
	    if (cr > Position.ROW_TOP()) {
	      cr--;
	      this.setRow(cr);
	    }
	  } catch(error) {
			Utils.alert("Position/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
		}
	};
	//Left Top.
	this.leftTop = function() {
		Utils.alert("Position/leftTop - this: "+this);
	  try {
	    this.setRow(Position.ROW_TOP());
	    this.setColumn(Position.COLUMN_FIRST());
	  } catch(error) {
			Utils.alert("Position/leftTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//Left: (1 column)
	this.left = function(savedCell) {
		Utils.alert("Position/left - this: "+this);
	  try {
	    var nivo = this.getNivo();
			if (nivo == Position.NIVO_ROOT()) {
			//alert("Position/left - ROOT");
				this.root();
			} else {
	    	this.setRow(Position.ROW_TOP());
				if (nivo <= Position.NIVO_ROOT()) {
			    var cc = this.getColumn();
		   		if (cc > Position.COLUMN_FIRST()) {
		     		cc--;
		   		} else {
		     		cc = Position.COLUMN_FIRST();
					}
			    this.setColumn(cc);
				}
				if ((savedCell !== undefined) && (savedCell !== null)) {
					var p = savedCell.getPosition();
					if (p) {
						this.setRow(p.getRow());
					}  
				}
	    }
		//alert("Position/left - nivo: "+nivo+" position: "+this.print());
	  } catch(error) {
			Utils.alert("Position/left Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//Right Top.
	this.rightTop = function() {
	 	Utils.alert("Position/rightTop - this: "+this);
	  try {
	    this.setRow(Position.ROW_TOP());
	    var gridColumns = RelationsForm.getGridColumns();
	    if (gridColumns > this.getColumn()) {
	      this.setColumn(gridColumns);
	    }
	  } catch(error) {
			Utils.alert("Position/rightTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//Right: (1 column)
	this.right = function(savedCell) {
		Utils.alert("Position/right - this: "+this);
	  try {
	    var nivo = this.getNivo();
			if (nivo == Position.NIVO_ROOT()) {
			//alert("Position/right - ROOT");
				this.root();
			} else {
	    	this.setRow(Position.ROW_TOP());
				if (nivo > Position.NIVO_COLUMN_FIRST()) { 
			    var lastColumn = (Position.COLUMN_LAST() - 3); // 4(0,1,2,3,4)
			    var cc = this.getColumn();
		   		if (cc < lastColumn) {
		     		cc++;
		   		} else {
		     		cc = lastColumn;
					}
			    this.setColumn(cc);
				}
				if ((savedCell !== undefined) && (savedCell !== null)) {
				  var p = savedCell.getPosition();
					if (p) {
						this.setRow(p.getRow());
					}  
				}
	    }
		//alert("Position/right - nivo: "+nivo+" position: "+this.print());
	  } catch(error) {
			Utils.alert("Position/right Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//Down: (1 row/column)
	this.down = function() {
		Utils.alert("Position/down - this: "+this);
	  try {
	    var cr = this.getRow();
	  //var cc = this.getColumn();
	  //Utils.alert("position/down cr/cc "+cr+"/"+cc);
	    if (cr < Position.ROW_BOTTOM()) {
	      cr++;
	      this.setRow(cr);
	    }
	  } catch(error) {
			Utils.alert("Position/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return this;
	  }
	};
	//End: Last column (last column/selection).
	this.end = function() {
		Utils.alert("Position/end - this: "+this);
	  //TODO: last row/column !!!
	//var endPosition = SjamayeeForm.getEndPosition();
	//goEnd();
	};
	//Display current selection (ESC/Escape)
	this.display = function() {
		Utils.alert("Position/display - this: "+this);
	  // try {
	  // /*var gridMatrix = rf.getGridView().matrix;
	  //   Utils.alert("Position: row=" + this.getRow() + " / column=" + this.getColumn() + "\n" +
	  //               "VALUE = " + document.getElementById(this.id()).innerHTML + "\n" +
	  //               "ID = " + this.id() + "\n" +
	  //               "NIVO = " + this.nivo() + "\n" +
	  //               "Base = " + SjamayeeForm.getNivoBase() + "\n" +     // *** NOK ***
	  //               "Home : nivo = " + SjamayeeForm.getHomeNivo() +
	  //                 " position = " + SjamayeeForm.getHomePosition() + "\n" +
	  //               "-End : nivo = " + SjamayeeForm.getEndNivo() +
	  //                 " position = " + SjamayeeForm.getEndPosition() + "\n" +
	  //               "-WhereCurrent:" + whereCurrent + "\n" +
	  //               "--WhatCurrent:" + whatCurrent + "\n" +
	  //               " MATRIX: (10*8)\n" +
	  //               "- 12345678\n" +
	  //               "0 " + gridMatrix.substring(0,8) + "\n" +
	  //               "1 " + gridMatrix.substring(8,16) + "\n" +
	  //               "2 " + gridMatrix.substring(16,24) + "\n" +
	  //               "3 " + gridMatrix.substring(24,32) + "\n" +
	  //               "4 " + gridMatrix.substring(32,40) + "\n" +
	  //               "5 " + gridMatrix.substring(40,48) + "\n" +
	  //               "6 " + gridMatrix.substring(48,56) + "\n" +
	  //               "7 " + gridMatrix.substring(56,64) + "\n" +
	  //               "8 " + gridMatrix.substring(64,72) + "\n" +
	  //               "9 " + gridMatrix.substring(72,80));*/
	  // } catch(error) {
	  //   Utils.alert("Position/display Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  // }
	};
	this.storeJson = function() {
	  var result = '';
	  try {
	    result = '{';
	    result += '"sid":"'+this.getSid()+'"';
	    result += ',"row":"'+this.getRow()+'"';
	    result += ',"column":"'+this.getColumn()+'"';
	    var gridId = 'null';
	    gridId = _grid.getSid();
	    result += ',"gridId":"'+gridId+'"';
		  var gridViewColumnId = 'null';
	    var gridViewColumn = this.getGridViewColumn();
	    if (gridViewColumn) {
				gridViewColumnId = gridViewColumn.getSid();
			}
	    result += ',"gridViewColumnId":"'+gridViewColumnId+'"';
	    result += '}';
	  } catch(error) {
			Utils.alert("Position/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	  //SjamayeeForm.putBySid(this);
	    return result;
	  }
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Position:'+_nl;
		try {
			result += this.parent();
	  } catch(error) {
			Utils.alert("Position/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
};
Position = new Class(new Position());
//Statics
/************************************************
//Position.ROW_TOP = 0;
//Position.ROW_ROOT = 4;
//Position.ROW_BOTTOM = 9;
//Position.COLUMN_FIRST = 0;
//Position.NIVO_ROOT = 0;
//Position.COLUMNS_WHERE_USED = 3;
//Position.COLUMNS_WHAT_USED = 4;     //New !!!
//Position.WHERE_MAX = -15;
//Position.WHAT_MAX = 25;
//Position.NIVO_COLUMN_FIRST = -3;    //Calculated!
//Position.COLUMN_LAST = 7;           //Calculated!
//Position.COLUMN_WHERE_FIRST = 2;    //Calculated!
//Position.COLUMN_ROOT = 3;           //Calculated!
//Position.COLUMN_WHAT_FIRST = 4;     //Calculated!
//Position.COLUMNS_MAX = 8;           //Calculated!
************************************************/
Position.ROW_TOP = function() {
  return 0;
};
Position.ROW_ROOT = function() {
  return 4;
};
Position.ROW_BOTTOM = function() {
  return 9;
};
Position.COLUMN_FIRST = function() {
  return 0;
};
Position.NIVO_ROOT = function() {
  return 0;
};
Position.COLUMNS_WHERE_USED = function() {
  //return 3;
  var result = 3;
  if (GridView.MAXIMUM_COLUMNS < 5) {
    result = (GridView.MAXIMUM_COLUMNS - 2);
  }
  return result;
};
Position.COLUMNS_WHAT_USED = function() {
  return (GridView.MAXIMUM_COLUMNS - (Position.COLUMNS_WHERE_USED() + 1));
};
Position.WHERE_MAX = function() {
  return -15;
};
Position.WHAT_MAX = function() {
  return 25;
};
Position.NIVO_COLUMN_FIRST = function() {
  return (Position.NIVO_ROOT() - Position.COLUMNS_WHERE_USED());
};
Position.COLUMN_LAST = function() {
  return (Position.COLUMNS_MAX() - 1);
};
Position.COLUMN_WHERE_FIRST = function() {
  return (Position.COLUMN_ROOT() - 1);
};
Position.COLUMN_ROOT = function() {
  //return 3;
  return Position.COLUMNS_WHERE_USED();
};
Position.COLUMN_WHAT_FIRST = function() {
  return (Position.COLUMN_ROOT() + 1);
};
Position.COLUMNS_MAX = function() {
  var result = (Position.COLUMNS_WHERE_USED() + Position.COLUMNS_WHAT_USED() + 1);
  if (result > GridView.MAXIMUM_COLUMNS) {
    result = GridView.MAXIMUM_COLUMNS;
  }
  if (result < 2) { result = 2; }
  return result;
};
Position.ROWS_MAX = function() {
  return (Position.ROW_BOTTOM() + 1);
};
Position.restoreJson = function(jso) {
  var result = null;
  try {
  	//Utils.alert("Position.restoreJson\n");
  	if ((jso !== undefined) && (jso !== null)) {
      result = new Position(jso.row,jso.column);
      if (result) {
        result.setSid(jso.sid);
      //SjamayeeForm.putBySid(result);
      /*if (jso.gridId != 'null') {
          var lgrid = SjamayeeForm.getBySid(jso.gridId);
          if (lgrid) {
            result.setGrid(lgrid);
          }
        }
        if (jso.gridViewColumnId != 'null') {
          var gridViewColumn = SjamayeeForm.getBySid(jso.gridViewColumnId);
          if (gridViewColumn) {
            result.setGridViewColumn(gridViewColumn);
          }
        }*/
      }
    }
  } catch(error) {
		Utils.alert("Position/restoreJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Position.test = function() {
  var result = "";
  try {
    var p1 = new Position();
    result += p1.print();
    var p2 = new Position(1,15);
    result += "\n"+p2.print();
    var p3 = new Position(2,15);
    result += "\n"+p3.print();
  } catch(error) {
		Utils.alert("Position/test Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
