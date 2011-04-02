var GridCell = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function(relation) {
	  try {
			this.parent();
			this.clear();
  		if (relation !== undefined) {
			  this.setRelation(relation);
			}
	  } catch(error) {
			Utils.alert("GridCell/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	//Getters & Setters
	this.getId = function() {
	  var result = null;
	  try {
	    var relation = this.getRelation();
	    if (relation) {
	      result = relation.getId();
	    }
	  } catch(error) {
			Utils.alert("GridCell/getId Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getRelation = function() {
	  var result = null;
	  if (this.relation !== undefined) {
	    result = this.relation;
			if (result) {
				result.setGridCell(this);
			}
	  }
	  return result;
	};
	this.setRelation = function(relation) {
		if (relation !== undefined) {
	  	this.relation = relation;
		}
	};
  //Get GRID!
	this.getGrid = function() {
	  var result = null;
	  var gridColumn = this.getGridColumn();
	  if (gridColumn) {
	    result = gridColumn.getGrid();
	  }
	  return result;
	};
	this.getGridView = function() {
		var result = null;
    var grid = this.getGrid();
		if (grid) {
			result = grid.getGridView();
		}
	  return result;
	};
	this.getGridColumn = function() {
	  var result = null;
	  if (this.gridColumn !== undefined) {
	    result = this.gridColumn;
	  }
	  return result;
	};
	this.setGridColumn = function(gridColumn) {
		if (gridColumn !== undefined) {
	  	this.gridColumn = gridColumn;
		}
	};
	this.getColumnNumber = function() {
		var result = Position.COLUMN_FIRST();
		try {
			var gridColumn = this.getGridColumn();
			if (gridColumn) {
				result = gridColumn.getColumnNumber();
			}
	  } catch(error) {
			Utils.alert("GridCell/getColumnNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return result;
	  }
	};
	this.getRowNumber = function() {
		var result = Position.ROW_TOP();
		try {
			var position = this.getPosition();
			if (position) {
				result = position.getRow();
			}
	  } catch(error) {
			Utils.alert("GridCell/getRowNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
		  return result;
	  }
	};
	this.isRoot = function() {
		Utils.alert("GridCell/isRoot");
	  var result = false;
	  try {
	    var column = this.getGridColumn();
	    if (column) {
	      result = (column.getNivo() == Position.NIVO_ROOT());
	      if (result === true) {
	        result = (this.getValue() !== '');
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/isRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getOutputLength = function() {
	  var result = GridCell.DEFAULT_OUTPUT_LENGTH;
	  if (this.outputLength !== undefined) {
	    result = this.outputLength;
	  }
	  return result;
	};
	this.setOutputLength = function(outputLength) {
		if (outputLength !== null) {
	  	this.outputLength = outputLength;
		}
	};
	this.getFirstParent = function() {
	  var result = null;
	  if (this.firstParent !== undefined) {
	    result = this.firstParent;
	  }
	  return result;
	};
	this.setFirstParent = function(firstParent) {
		if (firstParent !== undefined) {
	  	this.firstParent = firstParent;
		}
	};
	this.getPreviousParent = function() {
	  var result = null;
	  if (this.previousParent !== undefined) {
	    result = this.previousParent;
	  }
	  return result;
	};
	this.setPreviousParent = function(previousParent) {
		if (previousParent !== undefined) {
	  	this.previousParent = previousParent;
		}
	};
	this.getNextParent = function() {
	  var result = null;
	  if (this.nextParent !== undefined) {
	    result = this.nextParent;
	  }
	  return result;
	};
	this.setNextParent = function(nextParent) {
		if (nextParent !== undefined) {
	  	this.nextParent = nextParent;
		}
	};
	this.getPosition = function() {
	  var result = null;
	  if (this.position !== undefined) {
	    result = this.position;
	  }
	  return result;
	};
	this.setPosition = function(position) {
		if (position !== undefined) {
	  	this.position = position;
		}
	};
	/*
	this.getFontWeight = function() {
	  var result = FontStyle.FONT_WEIGHT_NORMAL;
		if (this.isRoot() === true) {
			result = FontStyle.FONT_WEIGHT_BOLD;
		}
	  if (this.fontWeight !== undefined && this.fontWeight !== null) {
	    result = this.fontWeight;
	  }
	  return result;
	};
	*/
	this.setFontWeight = function(fontWeight) {
		if (fontWeight !== null) {
	  	this.fontWeight = fontWeight;
		}
	};
	this.getNivo = function() {
	  var result = Position.NIVO_ROOT();
	  try {
	    var column = this.getGridColumn();
	    if (column) {
	      result = column.getNivo();
	    }
	  } catch(error) {
			Utils.alert("GridCell/getNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	//Functions
	this.clone = function() {
		Utils.alert("GridCell/clone");
		var result = null;
		try {
			result = new GridCell(this.getRelation());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("GridCell/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.touch = function(selected) {
		var _selected = (selected !== undefined && selected !== null)?selected:false;
	//alert("GridCell/touch");
		Utils.alert("GridCell/touch - this: "+this);
	  try {
			var position = this.getPosition();
			var r = position.getRow();
			var c = position.getColumn();
			var cellId = Grid.COLUMN_ID+'c'+c+r;
			if (c >= GridColumn.COLUMN_5) {             //TODO: OKE ????????????????
				c = GridColumn.COLUMN_9;
				cellId = Grid.COLUMN_WHAT_ID+'c'+c+r;
			}
		//document.getElementById(cellId).innerHTML = GridCell.buildContentHtml(c,r,this);
		//document.getElementById(cellId).innerHTML = this.buildContentHtml();                 <<<<<<<< OK
	  } catch(error) {
			Utils.alert("GridCell/touch Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	this.clear = function() {
		Utils.alert("GridCell/clear - this: "+this);	
	  try {
	    this.setRelation(null);
	    this.setOutputLength(GridCell.DEFAULT_OUTPUT_LENGTH);
	    this.setFirstParent(null);
	    this.setPreviousParent(null);
	    this.setNextParent(null);
	    this.setFontWeight(FontStyle.FONT_WEIGHT_NORMAL);
	  } catch(error) {
			Utils.alert("GridCell/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return this;
	  }
	};
	this.getParent = function() {
	  var result = null;
	  try {
	    if (this.getNivo() > Position.NIVO_ROOT()) {
	      var column = this.getGridColumn();
	      if (column) {
	        result = column.getMaster();
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/getParent Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getChild = function() {
		//***********************************************************//
		// WHERE-USED : child = masterCell/savedCell of rightColumn. //
		// ROOT +                                                    //
		// WHAT-USED  : child = firstCell/savedCell of rightColumn.  //
		//***********************************************************//
		var result = null;
		try {
			var column = null;
			var nivo = this.getNivo();
			if (nivo < Position.NIVO_ROOT()) {
				column = this.getGridColumn();
				if (column) {
					result = column.getMaster();
				}
			} else {
				nivo = nivo + 1;
				var grid = this.getGrid();
				if (grid) {
				  column = grid.getColumnByNivo(nivo);
				  if (column) {
					  result = column.getMaster();
					}
				}
			}
		} catch(error) {
			Utils.alert("GridCell/getChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getValue = function(focused) {
		var _focused = (focused !== undefined && focused !== null)?focused:false;
		//alert("GridCell/getValue - focused: "+_focused);
		var result = '';
		//var dot = '<b><font color="'+ApplicationFacade.COLOR_DOT+'">&middot;</font></b>';
		//var dot_root = '<b><font color="'+ApplicationFacade.COLOR_DOT_ROOT+'">&middot;</font></b>';
		//var dot_root_focused = '<b><font color="'+ApplicationFacade.COLOR_DOT_ROOT_FOCUSED+'">&middot;</font></b>';
		var dot = '<b>&middot;</b>';
		var dot_root = '<b>&middot;</b>';
		var dot_root_focused = '<b>&middot;</b>';
		try {
			var entity = null;
			var relation = this.getRelation();
			if (relation) {
				var nivo = this.getNivo();
    		//alert("GridCell/getValue - nivo: "+nivo+" relation: "+relation.print());
				if (nivo < Position.NIVO_ROOT()) {
					entity = relation.getParentEntity();
					if (entity) {
						result = entity.getName();
        		//alert("GridCell/getValue -1- entity/name: "+result);
					}
				} else {
					entity = relation.getChildEntity();
					if (entity) {
						var typeName = (entity instanceof DataEntity)?entity.getModelEntity().getModelType().getName():entity.getModelType().getName();
						result = entity.getName();
        		//alert("GridCell/getValue -2- entity/name: "+result);
					//alert("GridCell/getValue - result: "+result);
						if (nivo == Position.NIVO_ROOT()) {
							result += (_focused === true)?dot_root_focused:dot_root;
  						result += typeName;
						}
						if (nivo > Position.NIVO_ROOT() && nivo >= this.getCurrentNivo()) {
							result += dot+typeName+dot+entity.getDesc()+dot+entity.getId()+dot+relation.getId()+
							          dot+relation.getPei()+dot+relation.getCei()+dot+relation.getPid()+dot+relation.getNid();
						}
					}  
				}
			}
			//alert("GridCell/getValue - result: "+result);
		} catch(error) {
			alert("GridCell/getValue Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getImageHtml = function(size,style) {
		var result = null;
		try {
			var entity = null;
			var relation = this.getRelation();
			if (relation) {
				var nivo = this.getNivo();
				if (nivo < Position.NIVO_ROOT()) {
					entity = relation.getParentEntity();
				} else {
					entity = relation.getChildEntity();
				}
				if (entity) {
					result = entity.getImageHtml(size,style);
				}
			}
		} catch(error) {
			Utils.alert("GridCell/getImageHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getValueHtml = function(focused) {
		var _focused = (focused !== undefined && focused !== null)?focused:false;
		var result = null;
		try {
			var lineColor = "inherit";
			var	cellSelected = this.isSelected();
		//var	cellValue = this.getValue(cellSelected);
			var	cellValue = this.getValue(_focused);
			var	cellStyle = FontStyle.normal(this); //,cellSelected,nivo);
			if (cellSelected === true) {
				cellStyle = FontStyle.focused(this); //,cellSelected,nivo);				
			}
			var row = this.getRowNumber();
			var	column = this.getColumnNumber();
			var cellStatus = this.getStatus();
			if (cellStatus === null) {
				cellStatus = '&nbsp;';
			}
			var cellClass = GridCell.CLASS_ID;
			var cellContentClass = GridCell.CONTENT_CLASS_ID;
			cellStyle += "vertical-align:top;"; //middle;";		
		//result = '<a id="'+Grid.CELL_ANCHOR_ID+row+column+'" style="'+cellStyle+'position:relative;left:2px;" class="'+cellContentClass+'"'+
			result = '<a id="'+Grid.CELL_ANCHOR_ID+column+row+'" style="'+cellStyle+'position:relative;left:0px;" class="'+cellContentClass+'"'+
		//		 	 	 '   href="#" tabindex="-1" onclick="_grid.clickOnCell(event,'+row+','+column+');">'+cellValue+'</a>';
					 	 	 '   href="#" tabindex="-1">'+cellValue+'</a>';
		} catch(error) {
			Utils.alert("GridCell/getValueHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
		//return '<a href="#" tabindex="-1">'+cellValue+'</a>'; //result;
		//return '<a href="#">'+cellValue+'</a>'; //result;
			return cellValue; //result;
		}
	};
	this.getValueTranslated = function() {
		var result = this.getValue();
		if (result !== null && result != '&nbsp;') {
			result = Utils.translate(result,"es");
		}
		return result;
	};
	this.getStatus = function() {
		var result = null;
		try {
			//Get the status of the relation in the commandBuffer.
			var relation = this.getRelation();
			if (relation) {
				var nivo = this.getNivo();
			//if ((nivo >= Position.NIVO_ROOT()) &&
			//		(nivo >= this.getCurrentNivo())) {
				if (nivo >= Position.NIVO_ROOT()) {
					var commandBuffer = _rf.getCommandBuffer();
					if (commandBuffer) {
						result = commandBuffer.checkRelation(relation.getId(),nivo);
					}  
				}
			}
		} catch(error) {
			Utils.alert("GridCell/getStatus Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
		/*if (!result) {
				result = '&nbsp;';
			}*/
			return result;
		}
	};
	this.getActualPosition = function() {
		var result = null;
		try {
			var column = this.getGridColumn();
			if (column) {
				result = column.getActualPosition(this);
			}
		} catch(error) {
			Utils.alert("GridCell/getActualPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getCurrentNivo = function() {
		var result = (Position.NIVO_ROOT() + 1);
		try {
			var gridColumn = this.getGridColumn();
			if (gridColumn) {
				result = gridColumn.getCurrentNivo();
			}
		} catch(error) {
			Utils.alert("GridCell/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.isFirstParent = function() {
	  return (this.getFirstParent() === null);
	};
	this.hasPrevious = function() {
		Utils.alert("GridCell/hasPrevious - this: "+this);
	  var result = false;
	  try {
	    var nivo = this.getNivo();
	    var sort = Cache.SORT_ASCENDING;
	    var column = this.getGridColumn();
	    if (column) {
	      sort = column.getSort();
	    }
	  //Utils.alert("GridCell/hasPrevious - nivo: "+nivo+" sort: "+sort);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (nivo < Position.NIVO_ROOT()) {
	        if (sort == Cache.SORT_ASCENDING) {
	          result = (this.getPreviousParent() !== null);
	        } else {
	          result = (this.getNextParent() !== null);
	        }
	      } else {
	        if (sort == Cache.SORT_ASCENDING) {
	          result = (this.getPreviousChild() !== null);
	        } else {
	          result = (this.getNextChild() !== null);
	        }
	      //result = true;
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/hasPrevious Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.hasNext = function() {
		Utils.alert("GridCell/hasNext - this: "+this);
	  var result = false;
	  try {
	    var nivo = this.getNivo();
	    var sort = Cache.SORT_ASCENDING;
	    var column = this.getGridColumn();
	    if (column) {
	      sort = column.getSort();
	    }
	  //Utils.alert("GridCell/hasNext - nivo: "+nivo+" sort: "+sort);
	    if (nivo != Position.NIVO_ROOT()) {
	      if (nivo < Position.NIVO_ROOT()) {
	        if (sort == Cache.SORT_ASCENDING) {
	          result = (this.getNextParent() !== null);
	        } else {
	          result = (this.getPreviousParent() !== null);
	        }
	      } else {
	        if (sort == Cache.SORT_ASCENDING) {
	          result = (this.getNextChild() !== null);
	        } else {
	          result = (this.getPreviousChild() !== null);
	        }
	      //result = true;
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/hasNext Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getPreviousChild = function() {
	  var result = null;
	  try {
	    var previousRelation = null;
	    var relation = this.getRelation();
	    if (relation) {
	      previousRelation = relation.getPrevious();
	      if (previousRelation) {
	        result = new GridCell(previousRelation);
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/getPreviousChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getNextChild = function() {
	  var result = null;
	  try {
	    var nextRelation = null;
	    var relation = this.getRelation();
	    if (relation) {
	      nextRelation = relation.getNext();
	      if (nextRelation) {
	        result = new GridCell(nextRelation);
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/getNextChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getParentCells = function(number,sort) {
		alert("GridCell/getParentCells - number: "+number+" sort: "+sort+" this: "+this+" relation: "+this.getRelation());
	  var result = [];
	  try {
	    var relation = this.getRelation();
	    if (relation) {
    		var relationProxy = this.getGrid().getRelationProxy();
	      var relations = null;
	      var eid = null;
		  	//Utils.alert("GridCell/getParentCells - number: "+number+" sort: "+sort+" nivo: "+this.getNivo()+" this: "+this);
	      if (this.getNivo() == Position.NIVO_ROOT()) {
	        var entity = null;
	        if (relation.hasChild() === true) {
	          entity = relation.getChildEntity();
	          if (entity) {
      		  	eid = entity.getId();
	          }
	        }
	      //TODO: VERIFY THIS !!! ALWAYS PROBLEMS !!! FROM ROOT TO - 1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
	      } else if (this.getNivo() == (Position.NIVO_ROOT() - 1)) {
  		  	eid = relation.getCei();
	      } else {
    			if (relation.hasParent() === true) {
    		  	eid = relation.getPei();
          }
	      }  
        if (eid) {
          relations = relationProxy.getParentRelations(eid,number,sort);
        }
		  	alert("GridCell/getParentCells - eid: "+eid+" relations/size: "+relations.length);
	      //Link parents previous/next.
	      var previousParent = null;
	      var nextParent = null;
    		//alert("GridCell/getParentCells - relations: "+relations.length);
	      if (relations) {
	        for (var i = 0; i < relations.length; i++) {
	          var r1 = relations[i];
	          if (r1) {
	            var c1 = new GridCell(r1);
	            if (c1) {
	              if (sort == Cache.SORT_ASCENDING) {
	                if (previousParent) {
	                  previousParent.setNextParent(c1);
	                }  
	                c1.setPreviousParent(previousParent);
	                previousParent = c1;
	                result.push(previousParent);
	              } else {
	                if (nextParent) {
	                  nextParent.setPreviousParent(c1);
	                }  
	                c1.setNextParent(nextParent);
	                nextParent = c1;
	                result.push(nextParent);
	              }
	            }
	          }
	        }
	      }
	    }
  		//alert("GridCell/getParentCells - number: "+number+" sort: "+sort+" result/length: "+result.length);
	  } catch(error) {
			alert("GridCell/getParentCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getPreviousParentCells = function(number,sort) {
		Utils.alert("GridCell/getPreviousParentCells - number: "+number+" sort: "+sort);
	  var result = [];
	  try {
	  //Utils.alert("GridCell/getPreviousParentCells - number: "+number+" sort: "+sort+" this: "+this);
	    var n = number;
	    if ((n === undefined) || (n === null)) {
	      n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
	    }
	    var cell = this;
	    while (cell) {
	      if (n <= 0) { break; }
	      cell = cell.getPreviousParent();
	      if (cell === null) { break; }
	      if (sort == Cache.SORT_ASCENDING) {
	        result.splice(0,0,cell);
	      } else {
	        result.push(cell);
	      }
	      n--;
	    }
	  } catch(error) {
			Utils.alert("GridCell/getPreviousParentCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getNextParentCells = function(number,sort) {
		Utils.alert("GridCell/getNextParentCells - number: "+number+" sort: "+sort);
	  var result = [];
	  try {
	  //Utils.alert("GridCell/getNextParentCells - number: "+number+" sort: "+sort+" this: "+this);
	    var n = number;
	    if ((n === undefined) || (n === null)) {
	      n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
	    }
	    var cell = this;
	    while (cell) {
	      if (n <= 0) { break; }
	      cell = cell.getNextParent();
	      if (cell === null) { break; }
	      if (sort == Cache.SORT_ASCENDING) {
	        result.push(cell);
	      } else {
	        result.splice(0,0,cell);
	      }
	      n--;
	    }
	  } catch(error) {
			Utils.alert("GridCell/getNextParentCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
/* OLDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
	this.getChildCells = function(number,sort) {
    alert("GridCell/getChildCells - number: "+number+" sort: "+sort);
		Utils.alert("GridCell/getChildCells - number: "+number+" sort: "+sort);
	  var result = [];
	  try {
	  //Utils.alert("GridCell/getChildCells - number: "+number+" sort: "+sort+" this: "+this);
	    var relation = this.getRelation();
	    if (relation) {
	      var relations = relation.getChildRelations(number,sort);
	      if (relations) {
	        for (var i = 0; i < relations.length; i++) {
	          var r1 = relations[i];
	          if (r1) {
	            result.push(new GridCell(r1));
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("GridCell/getChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
*/
	this.getChildCells = function(number,sort) {
		alert("GridCell/getChildCells - number: "+number+" sort: "+sort+" this: "+this);
	  var result = [];
	  try {
	    var relation = this.getRelation();
	    if (relation) {
	      var relations = [];
    		var relationProxy = this.getGrid().getRelationProxy();
		  	//Utils.alert("GridCell/getChildCells - number: "+number+" sort: "+sort+" nivo: "+this.getNivo()+" this: "+this);
	      if (this.getNivo() == Position.NIVO_ROOT()) {
	        var entity = null;
	        if (relation.hasChild() === true) {
	          entity = relation.getChildEntity();
	          if (entity) {
              relations = relationProxy.getChildRelations(entity.getId(),number,sort);    
	          }
	        }  
	      } else {
    			if (relation.hasChild() === true) {
            relations = relationProxy.getChildRelations(relation.getCei(),number,sort);
          }
	      }
	      if (relations) {
	        for (var i = 0; i < relations.length; i++) {
	          var r1 = relations[i];
	          if (r1) {
	            var c1 = new GridCell(r1);
	            if (c1) {
                result.push(c1);
	            }
	          }
	        }
	      }	      
	    }
  		alert("GridCell/getChildCells - number: "+number+" sort: "+sort+" result/length: "+result.length);
	  } catch(error) {
			alert("GridCell/getChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getPreviousChildCells = function(number,sort) {
		Utils.alert("GridCell/getPreviousChildCells - number: "+number+" sort: "+sort);
	  var result = [];
	  try {
	  //Utils.alert("GridCell/getPreviousChildCells - number: "+number+" sort: "+sort+" this: "+this);
	    var n = number;
	    if ((n === undefined) || (n === null)) {
	      n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
	    }
	    var cell = this;
	    while (cell) {
	      if (n <= 0) { break; }
	      cell = cell.getPreviousChild();
	      if (cell === null) { break; }
	      if (sort == Cache.SORT_ASCENDING) {
	        result.splice(0,0,cell);
	      } else {
	        result.push(cell);
	      }
	      n--;
	    }
	  } catch(error) {
			Utils.alert("GridCell/getPreviousChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getNextChildCells = function(number,sort) {
		Utils.alert("GridCell/getNextChildCells - number: "+number+" sort: "+sort);
	  var result = [];
	  try {
	  //Utils.alert("GridCell/getNextChildCells - number: "+number+" sort: "+sort+" this: "+this);
	    var n = number;
	    if ((n === undefined) || (n === null)) {
	      n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
	    }
	    var cell = this;
	    while (cell) {
	      if (n <= 0) { break; }
	      cell = cell.getNextChild();
	      if (cell === null) { break; }
	      if (sort == Cache.SORT_ASCENDING) {
	        result.push(cell);
	      } else {
	        result.splice(0,0,cell);
	      }
	      n--;
	    }
	  } catch(error) {
			Utils.alert("GridCell/getNextChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
/*
	this.buildHtml = function(gridColumn,row,what) {
		var _row = (row !== undefined && row !== null)?row:Position.ROW_TOP();
		var _what = (what !== undefined && what !== null)?what:false;
		Utils.alert("GridCell/buildHtml - gridColumn: "+gridColumn+" row: "+_row);
	  var result = '';
	  try {
			if (gridColumn !== undefined && gridColumn !== null) {
				var nivo = Position.NIVO_ROOT();
				var relation = this.getRelation();
				if (relation) {	nivo = this.getNivo(); }				
				var columnNumber = gridColumn.getColumnNumber();
				var cellId = Grid.COLUMN_ID+'c'+columnNumber+_row;
	    	//if (columnNumber == GridColumn.COLUMN_9) {
	    	if (_what === true) {
					cellId = Grid.COLUMN_WHAT_ID+'c0'+_row;
				}
				var cellClass = GridCell.CLASS_ID+" "+GridCell.WHAT_USED_LEFT_CLASS_ID;
		    if ((columnNumber == GridColumn.COLUMN_9) || (columnNumber == Position.COLUMN_FIRST())) {
					cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHAT_USED_LEFT_FIRST_CLASS_ID;
				}			
				if (nivo == Position.NIVO_ROOT()) {
					cellClass = GridCell.CLASS_ID+" "+GridCell.ROOT_CLASS_ID;
					if (columnNumber == Position.COLUMN_FIRST()) {
						cellClass = GridCell.CLASS_ID; //+" "+GridCell.ROOT_FIRST_CLASS_ID;
					}
				} else if (nivo < Position.NIVO_ROOT()) {
					cellClass = GridCell.CLASS_ID+" "+GridCell.WHERE_USED_CLASS_ID;
					if (columnNumber == Position.COLUMN_FIRST()) {
						cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHERE_USED_FIRST_CLASS_ID;
					}
				}
        if (_what === true) {
				  var cellClass = GridCell.CLASS_ID+" "+GridCell.WHAT_USED_CLASS_ID;
				}			
				var cellStyle = 'style="width:100%;height:17px;"';
				if (_row == Position.ROW_TOP()) {
			    cellStyle = 'style="width:100%;height:17px;border-top:none;"';
				}
				var value = 'x'+columnNumber+_row;
				result = '<div id="'+cellId+'" '+cellStyle+'>'+value+'</div>';
				//if (_row == 0) { alert("GridCell/buildHtml - result: "+result) }
				
			//result = '<div id="'+cellId+'" '+cellStyle+'>&nbsp;</div>';
			//result = '<div id="'+cellId+'" class="'+cellClass+'" '+cellStyle+'>&nbsp;</div>';
			//result = '<div id="'+cellId+'" class="'+cellClass+'" '+cellStyle+'>'+this.buildContentHtml(columnNumber,_row)+'</div>';
			}
	  } catch(error) {
			Utils.alert("GridCell/buildHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.buildContentHtml = function(columnNumber,row) {
		var _cnr = (columnNumber !== undefined && columnNumber !== null)?columnNumber:null;
		var _rnr = (row !== undefined && row !== null)?row:null;
		Utils.alert("GridCell/buildContentHtml - columnNumber: "+_columnNumber+" row: "+_row);
	  var result = '';
	  try {
			var _columnNumber = this.getColumnNumber();
			if (_cnr) {
				_columnNumber = _cnr;
			}
			var _row = this.getRowNumber();
			if (_rnr) {
				_row = _rnr;
			}
			var column = (Position.COLUMN_ROOT() + 1);
	    switch (_columnNumber) {
	      case GridColumn.COLUMN_1:
					column = Position.COLUMN_FIRST();
	        break;
	      case GridColumn.COLUMN_2:
					column = (Position.COLUMN_FIRST() + 1);
	        break;
	      case GridColumn.COLUMN_3:
					column = (Position.COLUMN_FIRST() + 2);
	        break;
	      case GridColumn.COLUMN_4:
					column = (Position.COLUMN_FIRST() + 3);
	        break;
	      case GridColumn.COLUMN_5:
					column = (Position.COLUMN_FIRST() + 4);
	        break;
	      case GridColumn.COLUMN_6:
					column = (Position.COLUMN_FIRST() + 5);
	        break;
	      case GridColumn.COLUMN_7:
					column = (Position.COLUMN_FIRST() + 6);
	        break;
	      case GridColumn.COLUMN_8:
					column = Position.COLUMN_LAST();
	        break;
	      case GridColumn.COLUMN_9:
					column = (Position.COLUMN_ROOT() + 1);
					if (this.getGrid().getCurrentNivo() < Position.NIVO_COLUMN_FIRST()) {
						column = GridColumn.COLUMN_9;
					}
	        break;
	      default:
	        break;
	    }
			var nivo = Position.NIVO_ROOT();
			var lineColor = "inherit";
			var cellStyle = null;                           //TODO: cellStyle !!! *** !!!!
			var cellValue = null;
			var cellStatus = null;
			var cellSelected = false;
			var relation = this.getRelation();
			if (relation) {
				nivo = this.getNivo();
				cellStatus = this.getStatus();
				cellSelected = this.isSelected();
				cellValue = this.getValue(cellSelected);
				cellStyle = FontStyle.normal(this); //,cellSelected,nivo);
				if (cellSelected === true) {
					cellStyle = FontStyle.focused(this); //,cellSelected,nivo);				
				}
			} else {
				var emptyColumn = GridColumn.COLUMN_5;
				if (this.getGrid().getCurrentNivo() < Position.NIVO_COLUMN_FIRST()) {
					emptyColumn = GridColumn.COLUMN_9;
				}
				if (this.getGrid().getRoot() && column == emptyColumn && _row == Position.ROW_TOP()) {
					cellStyle = FontStyle.normal(this,true,(Position.NIVO_ROOT() + 1));
				}
			}
			var columnId = Grid.COLUMN_ID;
	    if (_columnNumber == GridColumn.COLUMN_9) {
				columnId = Grid.COLUMN_WHAT_ID;
			}
			var cellClass = GridCell.CLASS_ID+" "+GridCell.WHAT_USED_LEFT_CLASS_ID;
			var cellContentClass = GridCell.CONTENT_CLASS_ID+" "+GridCell.CONTENT_WHAT_USED_LEFT_CLASS_ID;
	    if ((_columnNumber == GridColumn.COLUMN_9) || (column == Position.COLUMN_FIRST())) {
				cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHAT_USED_LEFT_FIRST_CLASS_ID;
			}			
			if (nivo == Position.NIVO_ROOT()) {
				cellClass = GridCell.CLASS_ID+" "+GridCell.ROOT_CLASS_ID;
				cellContentClass = GridCell.CONTENT_CLASS_ID+" "+GridCell.CONTENT_ROOT_CLASS_ID;			
				if (column == Position.COLUMN_FIRST()) {
					cellClass = GridCell.CLASS_ID; //+" "+GridCell.ROOT_FIRST_CLASS_ID;
				}
			} else if (nivo < Position.NIVO_ROOT()) {
				cellClass = GridCell.CLASS_ID+" "+GridCell.WHERE_USED_CLASS_ID;
				cellContentClass = GridCell.CONTENT_CLASS_ID+" "+GridCell.CONTENT_WHERE_USED_CLASS_ID;			
				if (column == Position.COLUMN_FIRST()) {
					cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHERE_USED_FIRST_CLASS_ID;
				}
			}
			result = '';
**		MOVED TO cell.buildHtml !!!
			if (_row == Position.ROW_TOP()) {
		  //result += '<div class="'+cellClass+'" style="border-top:none;'+cellStyle+'" onclick="this.getGrid().clickOnCell(event,'+_row+','+column+');">';
		  //result += '<div class="'+cellClass+'" style="border-top:none;'+cellStyle+'">';
		    result += '<div class="'+cellClass+'" style="border-top:none;">';
			} else {
			//result += '<div class="'+cellClass+'" style="'+cellStyle+'" onclick="this.getGrid().clickOnCell(event,'+_row+','+column+');">';
			//result += '<div class="'+cellClass+'" style="'+cellStyle+'">';
			  result += '<div class="'+cellClass+'">';
			}
**
			result += '<div style="clear:both;text-align:left;position:relative;width:100%;height:100%;background-color:'+lineColor+';">';
			if (cellValue === null) {
				result += '&nbsp;';
			} else {
			//if (_columnNumber == GridColumn.COLUMN_9) {
					if (cellStatus !== null) {
					//result += '<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:'+FontStyle.COLOR_LIGHTGRAY+';text-align:center;">'+cellStatus+'</div>';
						result += '<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:inherit;text-align:center;">'+cellStatus+'</div>';
					} else {
						result += _cell.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;padding:0px 1px 0px 0px;"); //0px 3px 0px 1px;");					
					}
			**} else {
					result += _cell.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;padding:0px 1px 0px 0px;"); //0px 3px 0px 1px;");
				}**
				result += this.getValueHtml();
			}
			//result += '</div></div>'; //1 MOVED TO cell.buildHtml !!!
			result += '</div>';
	  } catch(error) {
			Utils.alert("GridCell/buildContentHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
*/
	this.print = function(i) {
	  var result = "";
	  try {
	    result = "\nGridCell: ";
	    if (i !== undefined && i !== null) {
	      result += "("+i+"): ";
	    }
	  //var gridColumn = this.getGridColumn();
      result += '\nnivo: '+this.getNivo();
	    result += '\noutputLength: '+this.getOutputLength();
	    result += '\nempty: '+this.isEmpty();
	    var relation = this.getRelation();
	    if (relation) {
	      result += relation.print();
	    }  
			var firstParent = this.getFirstParent();
			if (firstParent) {
	    	result += '\nfirstParent: '+this.getFirstParent();
			}
	    var previousParent = this.getPreviousParent();
	    if (previousParent) {
	      result += '\npreviousParent: '+previousParent; //.print();
	    }
	    var nextParent = this.getNextParent();
	    if (nextParent) {
	      result += '\nnextParent: '+nextParent; //.print();
	    }
	  } catch(error) {
			Utils.alert("GridCell/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	//Navigation
	this.isRoot = function() {
	  return (this.getNivo() == Position.NIVO_ROOT());
	};
	this.isSelected = function() {
		var result = false;
		try {
			if (this.getNivo() != Position.NIVO_ROOT()) {
				var column = this.getGridColumn();
				if (column) {
					if (column.isSelected() === true) {
						var savedLocation = column.getSavedLocation();
						if (savedLocation) {
							result = (this.getId() == savedLocation.getSavedCell().getId());
						}
					}
				}
			}
			//TODO: Temporary solution !!! ==> savedCell & position !!!
		  if (this.getGrid().getPosition().isEqual(this.getPosition())) {
				result = true;
			}		
	  } catch(error) {
			Utils.alert("GridCell/isSelected Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.isEmpty = function() {
	  return (this.getValue() === '');
	};
	this.navigationUp = function() {
	  return this.hasPrevious();
	};
	this.navigationDown = function() {
	  return this.hasNext();
	};
	this.navigationLeft = function() {
		//Utils.alert("GridCell/navigationLeft");
	  var result = false;
	  try {
	    result = (this.getNivo() > Position.NIVO_ROOT());
	    if (result === false) {
	      var relation = this.getRelation();
	      if (relation) {
					if (this.getNivo() == Position.NIVO_ROOT()) {
						var rootEntity = relation.getChildEntity();
						if (rootEntity) {
							result = (Relation.getFirstParentForEntity(rootEntity) !== null); //TODO: getGrid-relationProxy ...
						}
					} else {
		      	if (relation.hasParent() === true) {
		          result = (relation.getFirstParentRelation() !== null);						
						}
	        }  
	      }
	    }
	  //alert("GridCell/navigationLeft - result: "+result+" nivo: "+this.getNivo());
	  } catch(error) {
			Utils.alert("GridCell/navigationLeft Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.navigationRight = function() {
	  var result = false;
	  try {
	    result = (this.getNivo() < Position.NIVO_ROOT());
	    if (result === false) {
	      var relation = this.getRelation();
	      if (relation) {
					result = true;
	      /*if (relation.hasChild()) {
	          result = (relation.getFirstChildRelation() !== null);
	        }*/  
	      }
	    }
	  //alert("GridCell/navigationRight - result: "+result+" nivo: "+this.getNivo());
	  } catch(error) {
			Utils.alert("GridCell/navigationRight Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
};
GridCell = new Class(new GridCell());
//Statics
GridCell.DEFAULT_OUTPUT_LENGTH = 10;
GridCell.CLASS_ID = "gridCell";
GridCell.FIRST_CLASS_ID = "gridCellFirst";
GridCell.LEFT_CLASS_ID = "gridCellLeft";
//GridCell.WHERE_USED_CLASS_ID = "gridCellWhereUsed";
GridCell.WHERE_USED_FOCUSED_CLASS_ID = "gridCellWhereUsedFocused";
GridCell.WHERE_USED_SELECTED_CLASS_ID = "gridCellWhereUsedSelected";
GridCell.ROOT_CLASS_ID = "gridCellRoot";
GridCell.ROOT_FOCUSED_CLASS_ID = "gridCellRootFocused";
//GridCell.WHAT_USED_CLASS_ID = "gridCellWhatUsed";
//GridCell.WHAT_USED_LEFT_CLASS_ID = "gridCellWhatUsedLeft";
GridCell.WHAT_USED_FOCUSED_CLASS_ID = "gridCellWhatUsedFocused";
GridCell.WHAT_USED_SELECTED_CLASS_ID = "gridCellWhatUsedSelected";
GridCell.CONTENT_CLASS_ID = "gridCellContent";
GridCell.CONTENT_WHERE_USED_CLASS_ID = "gridCellContentWhereUsed";
GridCell.CONTENT_ROOT_CLASS_ID = "gridCellContentRoot";
GridCell.CONTENT_WHAT_USED_CLASS_ID = "gridCellContentWhatUsed";
