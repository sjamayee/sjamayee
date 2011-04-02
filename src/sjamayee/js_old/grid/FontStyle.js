//Static
var FontStyle = function() {
//this.Extends = SjamayeeBase;
	this.initialize = function() {
		return undefined;
	};
};
FontStyle = new Class(new FontStyle());
//Statics
FontStyle.FONT_STYLE_NORMAL = "normal";
FontStyle.FONT_STYLE_ITALIC = "italic";
FontStyle.FONT_WEIGHT_NORMAL = "normal";
FontStyle.FONT_WEIGHT_BOLD = "bold";
FontStyle.COLOR_INHERIT = "inherit";
FontStyle.COLOR_BLACK = "black";
FontStyle.COLOR_WHITE = "white";
FontStyle.COLOR_LIGHTGRAY = "#F2F2F2";
FontStyle.COLOR_DEBUG = "black";
FontStyle.COLOR_INFO = "lightgreen"; //lightgreen
FontStyle.COLOR_WARN = "lightred"; //orange
FontStyle.COLOR_ERROR = "red";
FontStyle.COLOR_FATAL = "red";
FontStyle.normal = function(cell,selected,nivo) {
	var _cell = (cell !== undefined)?cell:null;
	var _selected = (selected !== undefined && selected !== null)?selected:false;
	var _nivo = (nivo !== undefined && nivo !== null)?nivo:Position.NIVO_ROOT();
	if (_cell) {
		_selected = _cell.isSelected();
		_nivo = _cell.getNivo();
	}
	var result = '';
	try {
		//Utils.alert("FontStyle/normal");
		var bgColor = FontStyle.COLOR_INHERIT;
		var fontColor = FontStyle.COLOR_FOR_NIVO(_nivo);
		if (_nivo == Position.NIVO_ROOT()) {
			bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
			fontColor = FontStyle.COLOR_WHITE;
		}		
		var fontStyle = FontStyle.FONT_STYLE_NORMAL;
		var fontWeight = FontStyle.FONT_WEIGHT_NORMAL;
		if (_cell) {
			var relation = cell.getRelation();
			if (_nivo == Position.NIVO_ROOT()) {
				fontWeight = FontStyle.FONT_WEIGHT_BOLD;
				if (relation) {
					var relationHasNoChild = (relation.getFirstChildRelation() === null)?true:false;
					if (!relation.hasParent() && relationHasNoChild) {
						bgColor = FontStyle.COLOR_WHITE;
						fontColor = FontStyle.COLOR_FOR_NIVO(_nivo);
					}
				}				
			}
			if (_selected) {
				fontColor = FontStyle.COLOR_BLACK; //FontStyle.COLOR_WHITE;
				if (_nivo == Position.NIVO_ROOT()) {
					bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
				} else {
					bgColor = 'light'+FontStyle.COLOR_FOR_NIVO(_nivo);
					if (_nivo < Position.NIVO_ROOT()) {
						if (relation.hasParentRelations()) {
							fontWeight = FontStyle.FONT_WEIGHT_BOLD;
						}
					} else if (_nivo > Position.NIVO_ROOT()) {
						if (relation.hasChildRelations()) {
							fontWeight = FontStyle.FONT_WEIGHT_BOLD;
						}
					}
				}
			}
			_cell.setFontWeight(fontWeight);			
		}
		result += 'background-color:'+bgColor;
		result += ';color:'+fontColor;
		result += ';font-style:'+fontStyle;
		result += ';font-weight:'+fontWeight+';';
	} catch(error) {
		Utils.alert("FontStyle/normal Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
FontStyle.focused = function(cell,selected,nivo) {
	var _cell = (cell !== undefined)?cell:null;
	var _selected = (selected !== undefined && selected !== null)?selected:false;
	var _nivo = (nivo !== undefined && nivo !== null)?nivo:Position.NIVO_ROOT();
	if (_cell) {
		_selected = _cell.isSelected();
		_nivo = _cell.getNivo();
	}
	var result = '';
	try {
		//Utils.alert("Style/focused");
		var bgColor = FontStyle.COLOR_INHERIT;
		var fontColor = fontColor = FontStyle.COLOR_BLACK;
		var fontStyle = FontStyle.FONT_STYLE_ITALIC;
		var fontWeight = FontStyle.FONT_WEIGHT_NORMAL;
		if (_cell) {
			var relation = cell.getRelation();
			if (_nivo == Position.NIVO_ROOT()) {
				fontWeight = FontStyle.FONT_WEIGHT_BOLD;
				bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
				if (relation) {
					var relationHasNoChild = (relation.getFirstChildRelation() === null)?true:false;
					if (!relation.hasParent() && relationtHasNoChild) {
						bgColor = FontStyle.COLOR_WHITE;
					}
				}
			}
			if (_selected) {
				if (_nivo == Position.NIVO_ROOT()) {
					bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
				} else {
					bgColor = 'light'+FontStyle.COLOR_FOR_NIVO(_nivo);
					if (_nivo < Position.NIVO_ROOT()) {
						if (relation.hasParentRelations()) {
							fontWeight = FontStyle.FONT_WEIGHT_BOLD;
						}
					} else if (_nivo > Position.NIVO_ROOT()) {
						if (relation.hasChildRelations()) {
							fontWeight = FontStyle.FONT_WEIGHT_BOLD;
						}
					}
				}
        /* NOK GLOBAL GRID NOK *******************************************************************
				if (!_grid.getPosition().isEqual(_cell.getPosition())) {				
					if (_nivo == Position.NIVO_ROOT()) {
						fontColor = FontStyle.COLOR_WHITE;
					} else {
						fontColor = FontStyle.COLOR_FOR_NIVO(_nivo);
					}
				}*/
			}
			_cell.setFontWeight(fontWeight);
		}
		result += 'background-color:'+bgColor;
		result += ';color:'+fontColor;
		result += ';font-style:'+fontStyle;
		result += ';font-weight:'+fontWeight+';';
	} catch(error) {
		Utils.alert("FontStyle/focused Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
FontStyle.COLOR_FOR_NIVO = function(nivo) {
	//Utils.alert("FontStyle/COLOR_FOR_NIVO - nivo: "+nivo);
	var result = FontStyle.COLOR_ROOT();
	try {
		if (nivo  < Position.NIVO_ROOT()) {
			result = FontStyle.COLOR_WHERE();
		} else if (nivo > Position.NIVO_ROOT()) {
			result = FontStyle.COLOR_WHAT();
		}
	} catch(error) {
		Utils.alert("FontStyle/COLOR_FOR_NIVO Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
FontStyle.COLOR_WHERE = function() {
	return "blue";
};
FontStyle.COLOR_ROOT = function() {
	return "red";
};
FontStyle.COLOR_WHAT = function() {
	return "green";
};
FontStyle.COLOR_PARENT = function(nivo) {
	//Utils.alert("FontStyle/COLOR_PARENT - nivo: "+nivo);
	var result = FontStyle.COLOR_WHERE();
	try {
		/*if (nivo == (Position.NIVO_ROOT() + 1)) {
		result = FontStyle.COLOR_ROOT();
		} else if (nivo > (Position.NIVO_ROOT() + 1)) {
		result = FontStyle.COLOR_WHAT();
		}*/
		if (nivo == Position.NIVO_ROOT()) {
			result = FontStyle.COLOR_ROOT();
		} else if (nivo > Position.NIVO_ROOT()) {
			result = FontStyle.COLOR_WHAT();
		}
	} catch(error) {
		Utils.alert("FontStyle/COLOR_PARENT Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
FontStyle.COLOR_CHILD = function(nivo) {
	//Utils.alert("FontStyle/COLOR_CHILD - nivo: "+nivo);
	var result = FontStyle.COLOR_WHAT();
	try {
		if (nivo == Position.NIVO_ROOT()) {
			result = FontStyle.COLOR_ROOT();
		} else if (nivo < Position.NIVO_ROOT()) {
			result = FontStyle.COLOR_WHERE();
		}
	} catch(error) {
		Utils.alert("FontStyle/COLOR_CHILD Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	} finally {
		return result;
	}
};
