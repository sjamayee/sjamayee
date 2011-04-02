var SKeyboard = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			Utils.alert("Keyboard/constructor");
/*		
			if (document) {
				var listPaneLeft = document.getElementById(SjamayeeForm.LIST_PANE_LEFT_ID);
				var listPaneRight = document.getElementById(SjamayeeForm.LIST_PANE_RIGHT_ID);
				if (listPaneLeft && listPaneRight) {
					var mousewheelevt = (/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
					if (document.attachEvent) { //if IE (and Opera depending on user setting)
					//listPaneLeft.attachEvent("on"+mousewheelevt, this.displaywheel);
					//listPaneRight.attachEvent("on"+mousewheelevt, this.displaywheel);
					  listPaneLeft.attachEvent("on"+mousewheelevt, this.mouseWheelEvent); //_kb.keydown);
					  listPaneRight.attachEvent("on"+mousewheelevt, this.mouseWheelEvent); //_kb.keydown);
					} else if (document.addEventListener) { //WC3 browsers
				  //listPaneLeft.addEventListener(mousewheelevt, this.displaywheel, false);
				  //listPaneRight.addEventListener(mousewheelevt, this.displaywheel, false);
			  	  listPaneLeft.addEventListener(mousewheelevt, this.mouseWheelEvent, false); //_kb.keydown, false);
			  	  listPaneRight.addEventListener(mousewheelevt, this.mouseWheelEvent, false); //_kb.keydown, false);
					}
				} 
			}
*/
		} catch(error) {
			Utils.alert("Keyboard/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.setRow = function(row) {
		if (row !== null) {
			this.row = row;
		}
		return this;
	};
	this.getRow = function() {
		var result = Position.ROW_TOP();
		if ((this.row !== undefined) && (this.row !== null)) {
			result = this.row;
		}
		return result;
	};
	this.setKeyCode = function(keyCode) {
		if (keyCode !== null) {
			this.keyCode = keyCode;
		}
		return this;
	};
	this.getKeyCode = function() {
		var result = SKeyboard.NO_KEY;
		if ((this.keyCode !== undefined) && (this.keyCode !== null)) {
			result = this.keyCode;
		}
		return result;
	};
	this.setDelta = function(delta) {
		if (delta !== null) {
			this.delta = delta;
		}
		return this;
	};
	this.getDelta = function() {
		var result = null;
		if (this.delta !== undefined) {
			result = this.delta;
		}
		return result;
	};
	this.setKeyCodes = function(keyCodes) {
		if (keyCodes !== null) {
			this.keyCodes = keyCodes;
		}
		return this;
	};
	this.getKeyCodes = function() {
		var result = "";
		if ((this.keyCodes !== undefined) && (this.keyCodes !== null)) {
			result = this.keyCodes;
		}
		return result;
	};
	this.setShiftLock = function(shiftLock) {
		if (shiftLock !== null) {
			this.shiftLock = shiftLock;
		}
		return this;
	};
	this.getShiftLock = function() {
		var result = false;
		if ((this.shiftLock !== undefined) && (this.shiftLock !== null)) {
			result = this.shiftLock;
		}
		return result;
	};
	this.setShift = function(shift) {
		if (shift !== null) {
			this.shift = shift;
		}
		return this;
	};
	this.getShift = function() {
		var result = false;
		if ((this.shift !== undefined) && (this.shift !== null)) {
			result = this.shift;
		}
		return result;
	};
	this.toggleShift = function() {
		//this.setShift((this.getShift() === true)?false:true);
		return this;
	};
	this.setCtrl = function(ctrl) {
		if (ctrl !== null) {
			this.ctrl = ctrl;
		}
		return this;
	};
	this.getCtrl = function() {
		var result = false;
		if ((this.ctrl !== undefined) && (this.ctrl !== null)) {
			result = this.ctrl;
		}
		return result;
	};
	this.setAlt = function(alt) {
		if (alt !== null) {
			this.alt = alt;
		}
		return this;
	};
	this.getAlt = function() {
		var result = false;
		if ((this.alt !== undefined) && (this.alt !== null)) {
			result = this.alt;
		}
		return result;
	};
	this.setCmd = function(cmd) {
		if (cmd !== null) {
			this.cmd = cmd;
		}
		return this;
	};
	this.getCmd = function() {
		var result = false;
		if ((this.cmd !== undefined) && (this.cmd !== null)) {
			result = this.cmd;
		}
		return result;
	};
	this.setNumLock = function(numLock) {
		if (numLock !== null) {
			this.numLock = numLock;
		}
		return this;
	};
	this.getNumLock = function() {
		var result = false;
		if ((this.numLock !== undefined) && (this.numLock !== null)) {
			result = this.numLock;
		}
		return result;
	};
	this.toggleNumLock = function() {
		this.setNumLock((this.getNumLock() === true)?false:true);
		return this;
	};
	this.setScrollLock = function(scrollLock) {
		if (scrollLock !== null) {
			this.scrollLock = scrollLock;
		}
		return this;
	};
	this.getScrollLock = function() {
		var result = false;
		if ((this.scrollLock !== undefined) && (this.scrollLock !== null)) {
			result = this.scrollLock;
		}
		return result;
	};
	this.toggleScrollLock = function() {
		this.setScrollLock((this.getScrollLock() === true)?false:true);
		return this;
	};
	this.setCapsLock = function(capsLock) {
		if (capsLock !== null) {
			this.capsLock = capsLock;
		}
		return this;
	};
	this.getCapsLock = function() {
		var result = false;
		if ((this.capsLock !== undefined) && (this.capsLock !== null)) {
			result = this.capsLock;
		}
		return result;
	};
	this.toggleCapsLock = function() {
		this.setCapsLock((this.getCapsLock() === true)?false:true);
		return this;
	};
	//                                                           SELECT-KEY ????????
	this.setSelect = function(select) {
		if (select !== null) {
			this.select = select;
		}
		return this;
	};
	this.getSelect = function() {
		var result = false;
		if ((this.select !== undefined) && (this.select !== null)) {
			result = this.select;
		}
		return result;
	};
	//Caps = CapsLock & Shift
	this.getCaps = function() {
		var result = false;
		try {
			result = this.getCapsLock();
			if (this.getShift() === true) {
				result = (result === true)?false:true;
			}
		} catch(error) {
			Utils.alert("Keyboard/getCaps Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.isMouseScrolledUp = function() {
		var result = false;
		if ((this.getDelta() !== undefined) && (this.getDelta() !== null)) {
			if (this.getDelta() > 0) {
				result = true;
			}
		}
		return result;
	};
	this.isMouseScrolledDown = function() {
		var result = false;
		if ((this.getDelta() !== undefined) && (this.getDelta() !== null)) {
			if (this.getDelta() < 0) {
				result = true;
			}
		}
		return result;
	};
	//Virtual keys
	this.isVkLeft = function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.LEFT) {
			result = true;
		} else {
			if (this.getAlt() === true) {
				if (this.isMouseScrolledUp() === true) {
					result = true;
				}
			}
		}
		return result;
	};
	this.isVkRight = function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.RIGHT) {
			result = true;
		} else {
			if (this.getAlt() === true) {
				if (this.isMouseScrolledDown() === true) {
					result = true;
				}
			}
		}
		return result;
	};
	this.isVkUp = function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.UP) {
			result = true;
		} else {
			if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkDown = function() {
		var result = false;
		if (this.getKeyCode() == SKeyboard.DOWN) {
			result = true;
		} else {
			if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkPageUp = function() {
		var result = false;
		if (this.getShift() === true) {
			if (this.getKeyCode() == SKeyboard.UP) {
				result = true;
			} else if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkPageDown = function() {
		var result = false;
		if (this.getShift() === true) {
			if (this.getKeyCode() == SKeyboard.DOWN) {
				result = true;
			} else if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkPageTop = function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.UP) {
				result = true;
			} else if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkPageBottom = function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.DOWN) {
				result = true;
			} else if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkHome = function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.LEFT) {
				result = true;
			} else if (this.isMouseScrolledUp() === true) {
				result = true;
			}
		}
		return result;
	};
	this.isVkEnd = function() {
		var result = false;
		if (this.getCmd() === true) {
			if (this.getKeyCode() == SKeyboard.RIGHT) {
				result = true;
			} else if (this.isMouseScrolledDown() === true) {
				result = true;
			}
		}
		return result;
	};
	this.getPosition = function() {
		var result = null;
		try {
			result =  _grid.getPosition();
		} catch(error) {
			Utils.alert("Keyboard/getPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getNivo = function() {
		//return this.getGrid().getNivo();
		return _grid.getNivo();
	};
	//Functions
	this.getGridView = function() {
		var result = null;
		try {
			result = _grid.getGridView();
		} catch(error) {
			Utils.alert("Keyboard/getGridView Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.stopEventProcessing = function(e) {
		var _e = (e !== undefined)?e:window.event;
		try {
			_e.cancelBubble = true;
			if (_e.stopPropagation !== null) {
				_e.stopPropagation();
				_e.preventDefault();
			}
		} catch(error) {
			Utils.alert("Keyboard/stoprEventProcessing Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return false;
		}
	};
	this.mouseWheelEvent = function(e) {
		var _e = window.event || e;	
		alert("Keyboard/mouseWheelEvent - e: "+_e);
		Utils.alert("Keyboard/mouseWheelEvent - e: "+_e);
		var result = false;
		try {
			if (_cf) {
				//Set that an event is happened!
				_cf.setEventHappened(true);
				//Set mousewheel event.
			  var delta = _e.detail?-_e.detail/3:((window.opera)?-_e.wheelDelta/120:_e.wheelDelta/120);
				if ((delta !== null) && (delta !== 0)) {
					this.setDelta(delta);					
					if (this.isVkPageUp() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.UP_TEXT);
								result = list.up();
								this.stopEventProcessing(_e);
							} else if (position.getRow() == Position.ROW_TOP()) {
								this.setKeyCodes("PUP");        					//Utils.alert("PUP...");
								result = list.firstPage();     						//TODO:  CHECK gridview/objectsList/...
								this.stopEventProcessing(_e);
							}
						} else {
							this.setKeyCodes(SKeyboard.PAGE_UP_TEXT);  	//Utils.alert("PUP...");
							result = list.previousPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}			
					if (this.isVkPageDown() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.DOWN_TEXT);
								result = list.down();
								this.stopEventProcessing(_e);
							}
						} else {					
							this.setKeyCodes(SKeyboard.PAGE_DOWN_TEXT);  //Utils.alert("PDN...");
							result = list.nextPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}
					if (this.isVkHome() === true) {
						result = _grid.home();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageTop() === true) {
						this.setKeyCodes(SKeyboard.HOME_TEXT); 				//Utils.alert("HOME...");
					  result = list.firstPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageBottom() === true) {
						this.setKeyCodes(SKeyboard.END_TEXT); 					//Utils.alert("END...");
						result = list.lastPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkEnd() === true) {
						result = _grid.end();
				    this.stopEventProcessing(_e);
						return result;
					}				
					if (this.isVkLeft() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.LEFT_TEXT); 			//Utils.alert("LEFT...");
							result = mainList.left();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
				  	_cf.fillForm();
						return result;
					}
					if (this.isVkUp() === true) {
						this.setKeyCodes(SKeyboard.UP_TEXT);       		//Utils.alert("UP...");
						result = list.up();
				    this.stopEventProcessing(_e);
						return result;
					}			
					if (this.isVkDown() === true) {
						this.setKeyCodes(SKeyboard.DOWN_TEXT);    		  //Utils.alert("DOWN...");
						result = list.down();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkRight() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.RIGHT_TEXT); 	 	  //Utils.alert("RIGHT...");
							result = mainList.right();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
		      	_cf.fillForm();
						return result;
					}
				}
			}
		} catch(error) {
			Utils.alert("Keyboard/mouseWheelEvent - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (result === true) {
				if (_cf) {
					//REFRESH!
					_cf.setRefreshNow();
					_cf.refresh();
					if (_cf instanceof RelationsForm) {
						//Set Focus !!!
						_grid.getGridView().setFocusOnPosition();        //TODO: _cf.setFocusOnPosition() !!!
						//Set NEW focus!
						if (this.getKeyCodes() == SKeyboard.ESC_TEXT) {
							//Utils.alert("ESC position: "+position.getRow()+"/"+position.getColumn());
							if (position) {  // !!! !== NULL !!!
								position.display();
							}
						}
					}
				}
			}		
			return result;
		}
	};
	this.keypressed = function(e) {
		var _e = window.event || e;	
		//var _e = (e !== undefined)?e:window.event;	
	//alert("Keyboard/keypressed - e: "+_e);
		Utils.alert("Keyboard/keypressed - e: "+_e);
		var position = null;
		var result = false;
	//var stopEvent = false;
		try {
			if (_cf) {
				//Set that an event is happened!
				_cf.setEventHappened(true);
			/*var keyCode = -1;
			  if ((_e.which === undefined) || (_e.which === null)) {
			    keyCode = _e.keyCode; //String.fromCharCode(_e.keyCode);   // IE
			  } else if (_e.which !== 0) { // && _e.charCode !== 0) {
			    keyCode = _e.which;   //String.fromCharCode(_e.which);		 // All others
			  }
				this.setKeyCode(keyCode); */
				var keyCode = -1;
				if (_e == window.event) {
					keyCode = _e.keyCode; //IE
				} else if (_e.which) {
					keyCode = _e.which;   //Netscape/Firefox/Opera
				}
				this.setKeyCode(keyCode);
				//Set mousewheel event.
			  var delta = _e.detail?-_e.detail/3:((window.opera)?-_e.wheelDelta/120:_e.wheelDelta/120);
				this.setDelta(delta);

				///////////////
				// Position ???
				///////////////
				position = this.getPosition();
				if (position === null) { Utils.alert("Keyboard/keypressed - !position"); return result; }

				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity     BEGIN //
				/////////////////////////////////////////////////////////////
				var list = _cf.getList();
				var mainList = list;
				var listCell = null;
				var relation = null;
				var entity = null;
				var entityState = null;
				if (_cf.isFocusOnParentProperties() === true) {
					entityState = Entity.STATE_PARENT;
					listCell = _cf.getParentCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnChildProperties() === true) {
					entityState = Entity.STATE_CHILD;
					listCell = _cf.getChildCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnObjectProperties() === true) {
					entityState = Entity.STATE_OBJECT;
					listCell = _cf.getListObject();
					if (listCell) {
						entity = listCell.getObject();
					}
				}
				if (entity) {
					list = entity.getAttributeList();
					list.setState(entityState);
				}	
				/*if (list) {
					result = true;
				}*/
				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity       END //
				/////////////////////////////////////////////////////////////

				/*
				NavigationCommand.NAV_ENTER = 1;
				NavigationCommand.NAV_SPACE = 2;
				NavigationCommand.NAV_CLICK = 3;
				NavigationCommand.NAV_UP = 4;
				NavigationCommand.NAV_DOWN = 5;
				NavigationCommand.NAV_LEFT = 6;
				NavigationCommand.NAV_RIGHT = 7;
				NavigationCommand.NAV_TOP = 8;
				NavigationCommand.NAV_BOTTOM = 9;
				NavigationCommand.NAV_HOME = 10;
				NavigationCommand.NAV_END = 11;
				RelationsForm.method('writeNavigationCommand = function(list,navigation) {
				*/

				if (this.getKeyCode() == SKeyboard.ESC) 		{ _cf.cancelEditing(); this.stopEventProcessing(_e); }				

	/////////		

	if (this.getCmd() === true) {
		if (this.getShift() === true) {
			if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.redo(); this.stopEventProcessing(_e); }
		} else {
			if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.undo(); this.stopEventProcessing(_e); }
		}
		if ((this.getKeyCode() == SKeyboard.INSERT) ||
				(this.getKeyCode() == SKeyboard.CHAR_A) ||
				(this.getKeyCode() == SKeyboard.CHAR_N)) {
			_cf.addRelation();
			this.stopEventProcessing(_e);
		}				
		if ((this.getKeyCode() == SKeyboard.DELETE) ||
				(this.getKeyCode() == SKeyboard.CHAR_D) ||
				(this.getKeyCode() == SKeyboard.CHAR_X)) {
			_cf.deleteRelation();
			this.stopEventProcessing(_e);
		}				
		if (this.getKeyCode() == SKeyboard.CHAR_B) { _cf.clearBuffer(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_C) { _cf.copyRelation(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_E) { _cf.editRelation(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_G) { _cf.resetGrid(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_M) { alert("Sort (TODO)"); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_P) { alert("Print (TODO)"); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_S) {
			if (_cf.isEdit() === true) {
			  _cf.saveRelation();
			} else {
				if (_cf.isParentDisplayed() === true) {
					_cf.showSFDCParentObject();
				} else if (_cf.isChildDisplayed() === true) {
					_cf.showSFDCChildObject();
				}
			}
			this.stopEventProcessing(_e);
			return result;
		}
		if (this.getKeyCode() == SKeyboard.CHAR_T) { _cf.extractRelation(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_V) { _cf.pasteRelation(); this.stopEventProcessing(_e); }

		if (this.getKeyCode() == SKeyboard.CHAR_1) { _cf.showParent(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_2) { _cf.showParentAndChild(); this.stopEventProcessing(_e); }
		if (this.getKeyCode() == SKeyboard.CHAR_3) { _cf.showChild(); this.stopEventProcessing(_e); }

		if (this.getKeyCode() == SKeyboard.CHAR_R) {
			_cf.gotoRoot(position);
			Utils.beep(0);
			this.stopEventProcessing(_e);
			return result;
		}
	}

	/////////

	/*
	        if (delta > 0) {
	          if (_kb.getCmd() === true) {
	            if (_kb.getAlt() === true) {
	              result = _grid.home();
						    _kb.stopEventProcessing(evt);
	            } else {
	              result = gridView.firstPage();
						    _kb.stopEventProcessing(evt);
					    }
	          } else {
	            if (_kb.getAlt() === true) {
	              result = gridView.left();
						    _kb.stopEventProcessing(evt);
	            } else if (_kb.getShift() === true) {
	              result = gridView.previousPage();
						    _kb.stopEventProcessing(evt);
	            } else {
	              result = gridView.up();
						    _kb.stopEventProcessing(evt);
	            }
	          }
	        } else {
	          if (_kb.getCmd() === true) {
	            if (_kb.getAlt() === true) {
	              result = _grid.end();
						    _kb.stopEventProcessing(evt);
	        		} else {
	          		result = gridView.lastPage();
						    _kb.stopEventProcessing(evt);
	        		}
	          } else {
	            if (_kb.getAlt() === true) {
	              result = gridView.right();
						    _kb.stopEventProcessing(evt);
	            } else if (_kb.getShift() === true) {
	              result = gridView.nextPage();
						    _kb.stopEventProcessing(evt);
	            } else {
	              result = gridView.down();
						    _kb.stopEventProcessing(evt);
	            }
	          }
	        }
	*/

					if (this.isVkPageUp() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.UP_TEXT);
								result = list.up();
								this.stopEventProcessing(_e);
							} else if (position.getRow() == Position.ROW_TOP()) {
								this.setKeyCodes("PUP");        					//Utils.alert("PUP...");
								result = list.firstPage();     						//TODO:  CHECK gridview/objectsList/...
								this.stopEventProcessing(_e);
							}
						} else {
							this.setKeyCodes(SKeyboard.PAGE_UP_TEXT);  	//Utils.alert("PUP...");
							result = list.previousPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}			
					if (this.isVkPageDown() === true) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.DOWN_TEXT);
								result = list.down();
								this.stopEventProcessing(_e);
							}
						} else {					
							this.setKeyCodes(SKeyboard.PAGE_DOWN_TEXT);  //Utils.alert("PDN...");
							result = list.nextPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}
					if (this.isVkHome() === true) {
						result = _grid.home();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageTop() === true) {
						this.setKeyCodes(SKeyboard.HOME_TEXT); 				//Utils.alert("HOME...");
					  result = list.firstPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkPageBottom() === true) {
						this.setKeyCodes(SKeyboard.END_TEXT); 					//Utils.alert("END...");
						result = list.lastPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkEnd() === true) {
						result = _grid.end();
				    this.stopEventProcessing(_e);
						return result;
					}				
					if (this.isVkLeft() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.LEFT_TEXT); 			//Utils.alert("LEFT...");
							result = mainList.left();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkUp() === true) {
						this.setKeyCodes(SKeyboard.UP_TEXT);       		//Utils.alert("UP...");
						result = list.up();
				  //this.stopEventProcessing(_e);
						return result;
					}			
					if (this.isVkDown() === true) {
						this.setKeyCodes(SKeyboard.DOWN_TEXT);    		  //Utils.alert("DOWN...");
						result = list.down();
				  //this.stopEventProcessing(_e);
						return result;
					}
					if (this.isVkRight() === true) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.RIGHT_TEXT); 	 	  //Utils.alert("RIGHT...");
							result = mainList.right();
						} else {
							Utils.beep(0);
						}
				  //this.stopEventProcessing(_e);
						return result;
					}

	/*
				if (this.getShift() === true) {
					if (this.getKeyCode() == SKeyboard.UP) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.UP_TEXT);
								result = list.up();
								this.stopEventProcessing(_e);
							} else if (position.getRow() == Position.ROW_TOP()) {
								this.setKeyCodes("PUP");        					//Utils.alert("PUP...");
								result = list.firstPage();     						//TODO:  CHECK gridview/objectsList/...
								this.stopEventProcessing(_e);
							}
						} else {
							this.setKeyCodes(SKeyboard.PAGE_UP_TEXT);  	//Utils.alert("PUP...");
							result = list.previousPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}			
					if (this.getKeyCode() == SKeyboard.DOWN) {
						if (Utils.group() === true) {
							if (this.getKeyCode() == SKeyboard.CHAR_C) { //Copy group.
								_cf.copyRelation();
								this.setKeyCodes(SKeyboard.DOWN_TEXT);
								result = list.down();
								this.stopEventProcessing(_e);
							}
						} else {					
							this.setKeyCodes(SKeyboard.PAGE_DOWN_TEXT);  //Utils.alert("PDN...");
							result = list.nextPage();
					    this.stopEventProcessing(_e);
						}
						return result;
					}
				} else if (this.getCmd() === true) {
					if (this.getKeyCode() == SKeyboard.LEFT) {
						result = _grid.home();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.UP) {
						this.setKeyCodes(SKeyboard.HOME_TEXT); 				//Utils.alert("HOME...");
					  result = list.firstPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.DOWN) {
						this.setKeyCodes(SKeyboard.END_TEXT); 					//Utils.alert("END...");
						result = list.lastPage();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.RIGHT) {
						result = _grid.end();
				    this.stopEventProcessing(_e);
						return result;
					}				
				} else {
					if (this.getKeyCode() == SKeyboard.LEFT) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.LEFT_TEXT); 			//Utils.alert("LEFT...");
							result = mainList.left();
						} else {
							Utils.beep(0);
						}
			    	this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.UP) {
						this.setKeyCodes(SKeyboard.UP_TEXT);       		//Utils.alert("UP...");
						result = list.up();
				    this.stopEventProcessing(_e);
						return result;
					}			
					if (this.getKeyCode() == SKeyboard.DOWN) {
						this.setKeyCodes(SKeyboard.DOWN_TEXT);    		  //Utils.alert("DOWN...");
						result = list.down();
				    this.stopEventProcessing(_e);
						return result;
					}
					if (this.getKeyCode() == SKeyboard.RIGHT) {
						if (_cf instanceof RelationsForm) {
							_cf.setFocusOnList();
							this.setKeyCodes(SKeyboard.RIGHT_TEXT); 				//Utils.alert("RIGHT...");
							result = mainList.right();
						} else {
							Utils.beep(0);
						}
				    this.stopEventProcessing(_e);
						return result;
					}
				}
	*/
			}
		} catch(error) {
			Utils.alert("Keyboard/keypressed - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.specialKeysUp = function(e) {
		var _e = (e !== undefined)?e:window.event;
		//alert("Keyboard/specialKeysUp - e: "+_e);			
		Utils.alert("Keyboard/specialKeysUp - e: "+_e);			
		try {
			var keyCode = -1;
			if (window.event) {
				//IE
				keyCode = _e.keyCode;
			} else if (_e.which) {
				//Netscape/Firefox/Opera
				keyCode = _e.which;
			}
			this.setKeyCode(keyCode);
		/*if ((keyCode == SKeyboard.ALT) ||
					(keyCode == SKeyboard.SHIFT) ||
					(keyCode == SKeyboard.CTRL) ||
					(keyCode == SKeyboard.CMD_91) ||
					(keyCode == SKeyboard.CMD_92) ||
					(keyCode == SKeyboard.CMD_93) ||
					(keyCode == SKeyboard.CMD_219) ||
					(keyCode == SKeyboard.CMD_220) ||
					(keyCode == SKeyboard.CMD_224)) {
				alert("Keyboard/specialKeysUp - keyCode: "+keyCode);
			}*/
			switch (this.keyCode) {
				case SKeyboard.ALT:
				this.setAlt(false);
				break;
				case SKeyboard.SHIFT:
				this.setShift(false);
				break;
				case SKeyboard.CTRL:
				this.setCtrl(false);
				break;
				case SKeyboard.CMD_91:
				case SKeyboard.CMD_92:
				case SKeyboard.CMD_93:
				case SKeyboard.CMD_219:
				case SKeyboard.CMD_220:
				case SKeyboard.CMD_224:
				this.setCmd(false);
				break;
				default:
				break;
			}
		} catch(error) {
			Utils.alert("Keyboard/specialKeysUp - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.specialKeysDown = function(e) {
		var _e = (e !== undefined)?e:window.event;
		//alert("Keyboard/specialKeysDown - e: "+_e);
		Utils.alert("Keyboard/specialKeysDown - e: "+_e);
		try {
			var keyCode = -1;
			if (window.event) {
				//IE
				keyCode = _e.keyCode;
			} else if (_e.which) {
				//Netscape/Firefox/Opera
				keyCode = _e.which;
			}
			this.setKeyCode(keyCode);
		/*if ((keyCode == SKeyboard.ALT) ||
					(keyCode == SKeyboard.SHIFT) ||
					(keyCode == SKeyboard.CTRL) ||
					(keyCode == SKeyboard.CMD_91) ||
					(keyCode == SKeyboard.CMD_92) ||
					(keyCode == SKeyboard.CMD_93) ||
					(keyCode == SKeyboard.CMD_219) ||
					(keyCode == SKeyboard.CMD_220) ||
					(keyCode == SKeyboard.CMD_224)) {
				alert("Keyboard/specialKeysDown - keyCode: "+keyCode);
			}*/
			switch (this.keyCode) {
				case SKeyboard.ALT:
				this.setAlt(true);
				break;
				case SKeyboard.SHIFT:
				this.setShift(true);
				break;
				case SKeyboard.CTRL:
				this.setCtrl(true);
				break;
				case SKeyboard.CMD_91:
				case SKeyboard.CMD_92:
				case SKeyboard.CMD_93:
				case SKeyboard.CMD_219:
				case SKeyboard.CMD_220:
				case SKeyboard.CMD_224:
				this.setCmd(true);
				break;
				default:
				break;
			}
		} catch(error) {
			Utils.alert("Keyboard/specialKeysDown - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.keydown = function(e) {
		var _e = window.event || e;	
	//var _e = (e !== undefined)?e:window.event;	
		//alert("Keyboard/keydown - e: "+_e);
		Utils.alert("Keyboard/keydown - e: "+_e);
		var position = null;
		var result = false;
		var stopEvent = false;
		try {
			if (_cf) {
				//Set that an event is happened!
				_cf.setEventHappened(true);
				var keyCode = -1;
				if (_e == window.event) {
					keyCode = _e.keyCode; //IE
				} else if (_e.which) {
					keyCode = _e.which;   //Netscape/Firefox/Opera
				}
				this.setKeyCode(keyCode);			
				//Set mousewheel event.
			  var delta = _e.detail?-_e.detail/3:((window.opera)?-_e.wheelDelta/120:_e.wheelDelta/120);
				this.setDelta(delta);

				///////////////
				// Position ???
				///////////////
				position = this.getPosition();
				//Utils.alert("Keyboard/keydown - position: "+position.print());
				if (position === null) { Utils.alert("Keyboard/keydown - !position"); return result; }

				//Toggle CAPSLOCK.
				if (this.getKeyCode() == SKeyboard.CAPSLOCK) {
					this.toggleCapsLock();
				}
				if (this.getCapsLock()) {
					//Toggle shift!
					this.toggleShift();
				}
				//Toggle NUMLOCK.
				if (this.getKeyCode() == SKeyboard.NUMLOCK) {
					this.toggleNumLock();
				}
				//Toggle SCROLLLOCK.
				if (this.getKeyCode() == SKeyboard.SCROLLLOCK) {
					this.toggleScrollLock();
				}

				// Alt/Ctrl/Shift - Only - not allowed !!!
				if ( //((this.getAlt() === true)  && (this.getKeyCode() == SKeyboard.ALT)) || 
						 //((this.getShift() === true) && (this.getKeyCode() == SKeyboard.SHIFT)) ||
							 ((this.getCtrl() === true)  && (this.getKeyCode() == SKeyboard.CTRL))) {
					this.stopEventProcessing(_e);					
					return result;
				}

				if (this.getKeyCode() == SKeyboard.ESC) 		{ _cf.cancelEditing(); this.stopEventProcessing(_e); }

				if (this.getCmd() === true) {
					if (this.getKeyCode() == SKeyboard.ENTER) {
						_rf.showSFDCChildObject();
	 					this.stopEventProcessing(_e);					
						return result;
					} else if (  //(this.getKeyCode() == SKeyboard.ENTER) ||
							(this.getKeyCode() == SKeyboard.SPACE) ||
							(this.getKeyCode() == SKeyboard.ESC)) {
						Utils.beep(1);
						this.stopEventProcessing(_e);
						return result;
					}
				}

	/*
				if (this.getCmd() === true) {
					if (this.getShift() === true) {
						if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.redo(); this.stopEventProcessing(_e); }
					} else {
						if (this.getKeyCode() == SKeyboard.CHAR_Z) { _cf.undo(); this.stopEventProcessing(_e); }
					}
					if ((this.getKeyCode() == SKeyboard.INSERT) ||
							(this.getKeyCode() == SKeyboard.CHAR_A) ||
							(this.getKeyCode() == SKeyboard.CHAR_N)) {
						_cf.addRelation();
						this.stopEventProcessing(_e);
					}				
					if ((this.getKeyCode() == SKeyboard.DELETE) ||
							(this.getKeyCode() == SKeyboard.CHAR_D) ||
							(this.getKeyCode() == SKeyboard.CHAR_X)) {
						_cf.deleteRelation();
						this.stopEventProcessing(_e);
					}				
					if (this.getKeyCode() == SKeyboard.CHAR_B) { _cf.clearBuffer(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_C) { _cf.copyRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_E) { _cf.editRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_G) { _cf.resetGrid(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_M) { alert("Sort (TODO)"); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_P) { alert("Print (TODO)"); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_S) { _cf.saveRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_T) { _cf.extractRelation(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_V) { _cf.pasteRelation(); this.stopEventProcessing(_e); }

					if (this.getKeyCode() == SKeyboard.CHAR_1) { _cf.showParent(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_2) { _cf.showParentAndChild(); this.stopEventProcessing(_e); }
					if (this.getKeyCode() == SKeyboard.CHAR_3) { _cf.showChild(); this.stopEventProcessing(_e); }

					if (this.getKeyCode() == SKeyboard.CHAR_R) {
						_cf.gotoRoot(position);
						Utils.beep(0);
						this.stopEventProcessing(_e);
						return result;
					}
				}
	*/

	/*		
				//////////////////////////////////////////////////////////////////////////////////////
				// Navigation keys (HOME/PUP/UP/LEFT/RIGHT/DOWN/PDN/END) - executed in keypress !!! //
				//////////////////////////////////////////////////////////////////////////////////////
				if ((this.getKeyCode() >= SKeyboard.PAGE_UP) && (this.getKeyCode() <= SKeyboard.DOWN)) {
					this.stopEventProcessing(_e);
					return result;
				}
	*/

				result = this.keypressed(_e);
	/*
				if (this.getKeyCode() == SKeyboard.UP) {
					alert("Keyboard/keydown - UP - key: "+this.getKeyCode());
				}			
				if (this.getKeyCode() == SKeyboard.DOWN) {
					alert("Keyboard/keydown - DOWN - key: "+this.getKeyCode());
				}
	*/
				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity     BEGIN //
				/////////////////////////////////////////////////////////////
				var list = _cf.getList();
				var mainList = list;
				var listCell = null;
				var relation = null;
				var entity = null;
				var entityState = null;
				if (_cf.isFocusOnParentProperties() === true) {
					entityState = Entity.STATE_PARENT;
					listCell = _cf.getParentCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnChildProperties() === true) {
					entityState = Entity.STATE_CHILD;
					listCell = _cf.getChildCell();
					relation = listCell.getRelation();
					if (relation) {
						entity = relation.getChildEntity();
					}
				} else if (_cf.isFocusOnObjectProperties() === true) {
					entityState = Entity.STATE_OBJECT;
					listCell = _cf.getListObject();
					if (listCell) {
						entity = listCell.getObject();
					}
				}
				if (entity) {
					list = entity.getAttributeList();
					list.setState(entityState);
				}	
			/*if (list) {
					result = true;
				}*/		
				/////////////////////////////////////////////////////////////
				// DETERMINE - Current List/Cell/Relation/Entity       END //
				/////////////////////////////////////////////////////////////

				if (this.getKeyCode() == SKeyboard.BACKSPACE) {
					this.setKeyCodes("BACKSPACE");
				}
				if (this.getKeyCode() == SKeyboard.TAB) {
					if (this.getShift() === true) {
						this.setKeyCodes("BACKTAB");
					} else {
						this.setKeyCodes("TAB");
					}
					try {
						if (_cf.isFocusOnEntityFilter() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								if (_cf instanceof RelationsForm) {
									_cf.setFocusOnParentProperties();
								} else {
									_cf.setFocusOnObjectProperties();
								}
							} else {
								if (_cf instanceof ObjectsForm) {
									_cf.setFocusOnReferenceFilter();
								} else {
									_cf.setFocusOnList();
								}
							}
						} else if (_cf.isFocusOnReferenceFilter() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnEntityFilter();
							} else {
								_cf.setFocusOnList();
							}
						} else if (_cf.isFocusOnList() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								if (_cf instanceof RelationsForm) {
									_cf.setFocusOnEntityFilter();
								} else {
									_cf.setFocusOnReferenceFilter();
								}
							} else {
								if (_cf instanceof RelationsForm) {
									_cf.setFocusOnChildProperties();
								} else {
									_cf.setFocusOnObjectProperties();
								}
							}
						} else if (_cf.isFocusOnChildProperties() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnEntityFilter();
							} else {
								_cf.setFocusOnParentProperties();
							}
						} else if (_cf.isFocusOnParentProperties() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnChildProperties();
							} else {
								_cf.setFocusOnEntityFilter();
							}
						} else if (_cf.isFocusOnObjectProperties() === true) {
							if ((this.getKeyCode() == SKeyboard.TAB) && this.getShift()) {
								_cf.setFocusOnList();
							} else {
								_cf.setFocusOnEntityFilter();
							}
						}
					} catch(error1) {
						Utils.alert("Keyboard/keydown/TAB - Error1: "+error1.message);
					} finally {
						if (document) {
							if (_cf.isFocusOnEntityFilter() === true) {
								if (document.getElementById(Entity.FILTER_ID)) {
									document.getElementById(Entity.FILTER_ID).focus();
								}
							} else if (_cf.isFocusOnReferenceFilter() === true) {
								if (document.getElementById(ObjectsForm.OBJECT_REFERENCE_FILTER_ID)) {
									document.getElementById(ObjectsForm.OBJECT_REFERENCE_FILTER_ID).focus();
								}
							} else {
								if (document.getElementById(SjamayeeForm.NAVIGATION_CONTROL_ID)) {		
									document.getElementById(SjamayeeForm.NAVIGATION_CONTROL_ID).focus();
								}
							}
						}
	 					this.stopEventProcessing(_e);					
						result = true;
						return result;
					}
				}
	/*
				if (this.getCmd() === true) {
					if (this.getKeyCode() == SKeyboard.ENTER) {
						_rf.showSFDCChildObject();
	 					this.stopEventProcessing(_e);					
					} else if (  //(this.getKeyCode() == SKeyboard.ENTER) ||
							(this.getKeyCode() == SKeyboard.SPACE) ||
							(this.getKeyCode() == SKeyboard.ESC)) {
						Utils.beep(1);
						this.stopEventProcessing(_e);
						return result;
					}
				}
	*/
				//At anytime !!!
				if (this.getKeyCode() == SKeyboard.ESC) {
					//Utils.alert("Keyboard/ESC ...");
					this.setKeyCodes(SKeyboard.ESC_TEXT);
					//Mode: DISPLAY
					_cf.setMode(Grid.MODE_DISPLAY);
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}
				//SWITCH BETWEEN SJAMAYEE - SFDC!
				if ((_cf.isFocusOnList() === true) ||
						(_cf.isFocusOnChildProperties() === true) ||
						(_cf.isFocusOnParentProperties() === true)) {
					/*alert('Keyboard/keydown Focus on list: '+_cf.isFocusOnList()+'\n'+
									'detailRight: '+_cf.isFocusOnChildProperties()+'\n'+
									'detailLeft: '+_cf.isFocusOnParentProperties());*/
					//Edit - SFDC!
					if (this.getCaps() === true) {
						if (this.getKeyCode() == SKeyboard.CHAR_X) {
							if (_cf.isFocusOnChildProperties() === true) {
								_rf.editSFDCChildObject();
							}
						/*if (_cf.isFocusOnParentProperties()) {
							 	_rf.editSFDCParentObject();
							} else if (_cf.isFocusOnChildProperties()) {
						 		_rf.editSFDCChildObject();
							} else if (gridView.getCurrentNivo() > Position.NIVO_ROOT()) {
								_rf.editSFDCChildObject();
							} else {
								_rf.editSFDCParentObject();
							}*/
		 					this.stopEventProcessing(_e);					
							//return result;
						}
						/*if (this.getKeyCode() == SKeyboard.CHAR_P) {
								_rf.editSFDCParentObject();
								//Stop event processing!
								stopEvent = true;
								return result;
							}
							if (this.getKeyCode() == SKeyboard.CHAR_C) {
								_rf.editSFDCChildObject();
			 					this.stopEventProcessing(_e);					
								return result;
							}*/
					}
					//Display - SFDC!
					if (this.getKeyCode() == SKeyboard.CHAR_X) {          
						if (_cf.isFocusOnChildProperties() === true) {
							_rf.showSFDCChildObject();
						}
						/*if (_cf.isFocusOnParentProperties()) {
						_rf.showSFDCParentObject();
						} else if (_cf.isFocusOnChildProperties()) {
						_rf.showSFDCChildObject();
						} else if (gridView.getCurrentNivo() > Position.NIVO_ROOT()) {
						_rf.showSFDCChildObject();
						} else {
						_rf.showSFDCParentObject();
						}*/
	 					this.stopEventProcessing(_e);					
						return result;
					}
					/*if (this.getKeyCode() == SKeyboard.CHAR_P) {
					_rf.showSFDCParentObject();
					this.stopEventProcessing(_e);					
					return result;
					}
					if (this.getKeyCode() == SKeyboard.CHAR_C) {
					_rf.showSFDCChildObject();
					this.stopEventProcessing(_e);					
					return result;
					}*/
				}
				//Reverse sorting order (ASC/DSC) - Cmd/M.
				if ((this.getKeyCode() == SKeyboard.CHAR_M) && (this.getCmd())) {
					reverseSort(position.getNivo());
				}

				if (this.getKeyCode() == SKeyboard.ENTER) {
					//Utils.alert("ENTER...");
					this.setKeyCodes(SKeyboard.ENTER_TEXT);
					if (_cf instanceof ObjectsForm) {
						if (_of.isFocusOnList() === true) {
							_of.setFocusOnObjectProperties();
						} else {
							_of.setFocusOnList();
						}
					} else {
						_cf.setFocusOnList();
	      		// MAKE THIS ROOT !!!				
						var enterOnRoot = position.isRoot();
						var r = position.getRow();
						var c = position.getColumn();
					//_grid.switchRoot(r,c);
						var gridView = _grid.getGridView();
						if (gridView) {
							gridView.switchRoot(r,c);
						}
						if (enterOnRoot === true) {
							_grid.setFocusOnRoot();
						}
					}
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}
				if (this.getKeyCode() == SKeyboard.PAUSE) {
					this.setKeyCodes("PAUSE/BREAK");
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}
				if (this.getKeyCode() == SKeyboard.SPACE) {
					//Utils.alert("SPACE: GOTO ROOT");
					this.setKeyCodes(SKeyboard.SPACE_TEXT);
					if (_cf instanceof ObjectsForm) {
						if (_of.isFocusOnList() === true) {
							_of.setFocusOnObjectProperties();
						} else {
							_of.setFocusOnList();
						}
					} else {
						_cf.gotoRoot(position);
					}
					Utils.beep(0);			
					this.stopEventProcessing(_e);					
					result = true;
					return result;
				}

				if (this.getKeyCode() == SKeyboard.INSERT) {
					this.setKeyCodes(SKeyboard.INSERT_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.DELETE) {
					this.setKeyCodes(SKeyboard.DELETE_TEXT);
				}
				//FKEYS
				if (this.getKeyCode() == SKeyboard.F1) {
					this.setKeyCodes(SKeyboard.F1_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F2) {
					this.setKeyCodes(SKeyboard.F2_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F3) {
					this.setKeyCodes(SKeyboard.F3_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F4) {
					this.setKeyCodes(SKeyboard.F4_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F5) {
					this.setKeyCodes(SKeyboard.F5_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F6) {
					this.setKeyCodes(SKeyboard.F6_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F7) {
					this.setKeyCodes(SKeyboard.F7_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F8) {
					this.setKeyCodes(SKeyboard.F8_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F9) {
					this.setKeyCodes(SKeyboard.F9_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F10) {
					this.setKeyCodes(SKeyboard.F10_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F11) {
					this.setKeyCodes(SKeyboard.F11_TEXT);
				}
				if (this.getKeyCode() == SKeyboard.F12) {
					this.setKeyCodes(SKeyboard.F12_TEXT);
				}
				if (((this.getKeyCode() >= SKeyboard.F1) && (this.getKeyCode() <= SKeyboard.F12)) ||
					 	(this.getKeyCode().length >= 3)) {
					this.setKeyCodes(this.getKeyCode());
				} else {              
					if (((this.getKeyCode() >= 65) && (this.getKeyCode() <= 90)) ||
							((this.getKeyCode() >= 97) && (this.getKeyCode() <= 122))) {
						this.setKeyCodes(String.fromCharCode(this.getKeyCode()));
						if (!this.getCaps()) {
							this.setKeyCodes(this.getKeyCodes().toLowerCase());
						}
					} else if ((this.getKeyCode() >= 48) && (this.getKeyCode() <= 57)) {
						this.setKeyCodes(String.fromCharCode(this.getKeyCode()));
					}
				}
				/*if (!((this.getKeyCode() == 16) ||
				(this.getKeyCode() == 17) ||
				(this.getKeyCode() == 18) ||
				(this.getKeyCode() == 20))) {
				if ((count < -10) || (count > 10)) {
				Utils.alert("You clicked - keyCode: " + this.getKeyCodes() + " / capsLock: " + this.getCapsLock() + " / shift: " + this.getShift() +
										" / ctrl: " + this.getCtrl() + " / alt: " + this.getAlt()); //+ "\n" +
										" VALUE = " + document.getElementById(position.id()).innerHTML + "\n" +
										" ID = " + position.id() + "\n" +
										" NIVO = " + position.getNivo() + "\n" +
										" base = " + SjamayeeForm.getNivoBase());  // *** NOK ***
				}}*/
			}
		} catch(error) {
			Utils.alert("Keyboard/keydown - Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			if (result === true) {
			  this.stopEventProcessing(_e);			
				if (_cf) {
					//REFRESH!
					_cf.setRefreshNow();
					_cf.refresh();
					if (_cf instanceof RelationsForm) {
						//Set Focus !!!
						_grid.getGridView().setFocusOnPosition();        //TODO: _cf.setFocusOnPosition() !!!
						//Set NEW focus!
						if (this.getKeyCodes() == SKeyboard.ESC_TEXT) {
							//Utils.alert("ESC position: "+position.getRow()+"/"+position.getColumn());
							if (position) {  // !!! !== NULL !!!
								position.display();
							}
						}
					}
				}
			}
			return result;
		}
	};
	this.navigateToParentOrChild = function(nivo,mode) {
		Utils.alert("Keyboard/navigateToParentOrChild nivo: "+nivo+" mode: "+mode);
		try {
			if (document) {
				var soid = null;
				if (nivo != Position.NIVO_ROOT()) {
					if (nivo < Position.NIVO_ROOT()) {
						if (document.getElementById(Entity.SFDC_OID_PARENT)) {
							soid = document.getElementById(Entity.SFDC_OID_PARENT).value;
						}
					} else {
						if (document.getElementById(Entity.SFDC_OID_CHILD)) {
							soid = document.getElementById(Entity.SFDC_OID_CHILD).value;
						}
					}
				}
				if (soid !== null) {
					document.getElementById(Entity.SFDC_OID).value = soid;
					//navigateSFDC(mode);
					sbutton.click();
				}
			}
		} catch(error) {
			Utils.alert("Keyboard/navigateToParentOrChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;	
		}
	};
	this.storeJson = function() {
		var result = '';
		try {
			result = '{';
			result += '"sid":"'+this.getSid()+'"';
			var gridId = 'null';
			gridId = _grid.getSid();
			result += ',"gridId":"'+gridId+'"';
			result += '}';
			//SjamayeeForm.putBySid(this);
		} catch(error) {
			Utils.alert("Keyboard/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Keyboard:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Keyboard/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
SKeyboard = new Class(new SKeyboard());
//Statics
SKeyboard.NO_KEY = null;
SKeyboard.MOUSE_CLICK = 0;
SKeyboard.BACKSPACE = 8;
SKeyboard.TAB = 9;
SKeyboard.ENTER = 13;
SKeyboard.SHIFT = 16;
SKeyboard.ALT = 18;
//////////////////////////////////////////////
// Command keys					Mozilla		IE 	Opera	//
// Left Apple Command			224 		? 	 17		//
// Right Apple Command		224 		? 	 17		//
// Left Windows Start			91 			91 	 219	//
// Right Windows Start		92 			92 	 220	//
// Windows Menu						93 			93 	 0		//
//////////////////////////////////////////////
SKeyboard.CTRL = 17;
SKeyboard.CMD_91 = 91;
SKeyboard.CMD_92 = 92;
SKeyboard.CMD_93 = 93;
SKeyboard.CMD_219 = 219;
SKeyboard.CMD_220 = 220;
SKeyboard.CMD_224 = 224;
SKeyboard.PAUSE = 19;
SKeyboard.CAPSLOCK = 20;
SKeyboard.ESC = 27;
SKeyboard.SPACE = 32;
SKeyboard.PAGE_UP = 33;
SKeyboard.PAGE_DOWN = 34;
SKeyboard.END = 35;
SKeyboard.HOME = 36;
SKeyboard.LEFT = 37;
SKeyboard.UP = 38;
SKeyboard.RIGHT = 39;
SKeyboard.DOWN = 40;
SKeyboard.INSERT = 43; // + (+,A,N)
SKeyboard.DELETE = 45; // - (-,D,X)
SKeyboard.CHAR_A = 65; // Add (+,A,N)
SKeyboard.CHAR_B = 66; // Clear Buffer
SKeyboard.CHAR_C = 67; // Copy
SKeyboard.CHAR_D = 68; // Delete (-,D,X)
SKeyboard.CHAR_E = 69; // Edit
SKeyboard.CHAR_G = 71; // Reset Grid
SKeyboard.CHAR_M = 77; // Sort (TODO)
SKeyboard.CHAR_N = 78; // New
SKeyboard.CHAR_P = 80; // Print (TODO)
SKeyboard.CHAR_R = 82; // Root
SKeyboard.CHAR_S = 83; // Save
SKeyboard.CHAR_T = 84; // Extract
SKeyboard.CHAR_V = 86; // Paste
SKeyboard.CHAR_X = 88; // Delete (-,D,X)
SKeyboard.CHAR_Z = 90; // Undo/Redo
SKeyboard.CHAR_1 = 49; // Parent
SKeyboard.CHAR_2 = 50; // Parent & Child
SKeyboard.CHAR_3 = 51; // Child
SKeyboard.NUMLOCK = 144;
SKeyboard.SCROLLLOCK = 145;
SKeyboard.SELECT = 29;                 // ????? NOT FINISHED !!!
SKeyboard.F1 = 112;
SKeyboard.F2 = 113;
SKeyboard.F3 = 114;
SKeyboard.F4 = 115;
SKeyboard.F5 = 116;
SKeyboard.F6 = 117;
SKeyboard.F7 = 118;
SKeyboard.F8 = 119;
SKeyboard.F9 = 120;
SKeyboard.F10 = 121;
SKeyboard.F11 = 122;
SKeyboard.F12 = 123;
SKeyboard.CAPSLOCK_TEXT = "CAPSLOCK";
SKeyboard.NUMLOCK_TEXT = "NUMLOCK";
SKeyboard.SCROLLLOCK_TEXT = "SCROLLLOCK";
SKeyboard.BACKSPACE_TEXT = "BACKSPACE";
SKeyboard.TAB_TEXT = "TAB";
SKeyboard.ENTER_TEXT = "ENTER";
SKeyboard.ESC_TEXT = "ESC";
SKeyboard.SPACE_TEXT = "SPACE";
SKeyboard.PAGE_UP_TEXT = "PUP";
SKeyboard.PAGE_DOWN_TEXT = "PDN";
SKeyboard.END_TEXT = "END";
SKeyboard.HOME_TEXT = "HOME";
SKeyboard.LEFT_TEXT = "LEFT";
SKeyboard.UP_TEXT = "UP";
SKeyboard.RIGHT_TEXT = "RIGHT";
SKeyboard.DOWN_TEXT = "DOWN";
SKeyboard.INSERT_TEXT = "INSERT";
SKeyboard.DELETE_TEXT = "DELETE";
SKeyboard.F1_TEXT = "F01";
SKeyboard.F2_TEXT = "F02";
SKeyboard.F3_TEXT = "F03";
SKeyboard.F4_TEXT = "F04";
SKeyboard.F5_TEXT = "F05";
SKeyboard.F6_TEXT = "F06";
SKeyboard.F7_TEXT = "F07";
SKeyboard.F8_TEXT = "F08";
SKeyboard.F9_TEXT = "F09";
SKeyboard.F10_TEXT = "F10";
SKeyboard.F11_TEXT = "F11";
SKeyboard.F12_TEXT = "F12";
SKeyboard.createEvent = function(keyCode) {
	var result = null;
	try {
		if (document) {  
			result = document.createEvent("KeyboardEvent");
			result.initKeyEvent("keydown",true,true,null,true,true,false,false,keyCode,0);
			window.dispatchEvent(result);
		}
	} catch(error) {
		Utils.alert("Keyboard/createEvent Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
SKeyboard.restoreJson = function(jso) {
	var result = null;
	try {
		//Utils.alert("SKeyboard.restoreJson\n");
  	if ((jso !== undefined) && (jso !== null)) {
			/*var lgrid = null;
			if (jso.gridId != 'null') {
			lgrid = SjamayeeForm.getBySid(jso.gridId);
			}*/
			result = new SKeyboard();
			if (result) {
				result.setSid(jso.sid);
				//SjamayeeForm.putBySid(result);  
			}
		}
	} catch(error) {
		Utils.alert("Keyboard/restoreJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
SKeyboard.test = function() {
	return "Keyboard/test !!!";
	/*var result = '\nKeyboard:';
	var keyboard = null;
	var lgrid = new Grid();
	if (lgrid) {
	lgrid.show();
	var gridView = lgrid.getGridView();
	if (gridView) {
	keyboard = lgrid.getKeyboard();
	if (keyboard) {
	result += '\nEnter: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nPause: '+keyboard.keydown(SKeyboard.PAUSE);
	result += '\nEsc: '+keyboard.keydown(SKeyboard.ESC);
	result += '\nSpace: '+keyboard.keydown(SKeyboard.SPACE);
	result += '\nPage_up: '+keyboard.keydown(SKeyboard.PAGE_UP);
	result += '\nPage_down: '+keyboard.keydown(SKeyboard.PAGE_DOWN);
	result += '\nEnd: '+keyboard.keydown(SKeyboard.END);
	result += '\nHome: '+keyboard.keydown(SKeyboard.HOME);
	result += '\nLeft: '+keyboard.keydown(SKeyboard.LEFT);
	result += '\nUp: '+keyboard.keydown(SKeyboard.UP);
	result += '\nRight: '+keyboard.keydown(SKeyboard.RIGHT);
	result += '\nDown: '+keyboard.keydown(SKeyboard.DOWN);
	result += '\nInsert: '+keyboard.keydown(SKeyboard.INSERT);
	result += '\nDelete: '+keyboard.keydown(SKeyboard.DELETE);
	result += '\nF1: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nF2: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nF5: '+keyboard.keydown(SKeyboard.ENTER);
	result += '\nF12: '+keyboard.keydown(SKeyboard.ENTER);
	}
	}
	}
	return result;*/
};
