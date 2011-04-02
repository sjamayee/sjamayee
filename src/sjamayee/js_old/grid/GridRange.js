var GridRange = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function(nivo) {
	  try {
			this.parent();
  		if (nivo !== undefined) {
	      this.setNivo(nivo);
	    }
	    this.reset();
	  } catch(error) {
			Utils.alert("GridRange/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
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
		if (nivo !== null) {
	  	this.nivo = nivo;
		}
	};
	this.isInitial = function() {
		var result = (this.getFrom() == Position.NIVO_COLUMN_FIRST())?true:false;
		return result;
	};
	//Functions
	this.getNbrOfColumns = function() {
		Utils.alert("GridRange/getNbrOfColumns");
	  var result = GridView.DEFAULT_COLUMNS;
	  try {
	    var nivo = this.getNivo();
	    if (nivo < -3) { result = 6; }
	    if (nivo < -4) { result = 7; }
	    if (nivo < -5) { result = 8; }
	  } catch(error) {
			Utils.alert("GridRange/getNbrOfColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.reset = function() {
	  this.index = this.getFrom() - 1;
	  return this;
	};
	this.getNext = function() {
		Utils.alert("GridRange/getNext");
	  var result = false;
	  try {
	    if (this.index < this.getFrom()) {
	      this.index = this.getFrom();
	      result = true;
	    } else if (this.getIndex() < this.getUntil()) {
		    this.index++;
	      result = true;
	    }
	  } catch(error) {
			Utils.alert("GridRange/getNext Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getIndex = function() {
		Utils.alert("GridRange/getIndex");
	  var result = null;
	  try {
	    result = this.index;
	    if (this.index < this.getFrom()) {
	      result = this.getFrom();
	    }
	  } catch(error) {
			Utils.alert("GridRange/getIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getColumnNumber = function(nivo) {
		Utils.alert("GridRange/getColumnNumber - nivo: "+nivo);
	  var result = Position.COLUMN_FIRST();
	  try {
	  /*if (this.getFrom() < Position.NIVO_ROOT() && nivo > Position.NIVO_ROOT()) {
	      result++;
	    }*/
	  //result += (nivo + this.getFrom());
			result = (Math.abs(this.getFrom() - nivo));
	  } catch(error) {
			Utils.alert("GridRange/getColumnNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	}; 
	this.getNextColumnHeader = function() {
		Utils.alert("GridRange/getNextColumnHeader");
	  var result = '**';
	  try {
	    if (this.next()) {
	      result = '' + this.getIndex();         
	    }
	  } catch(error) {
			Utils.alert("GridRange/getNextColumnHeader Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	}; 
	this.getFrom = function() {
		Utils.alert("GridRange/getFrom");
	  var result = Position.NIVO_COLUMN_FIRST();
	  try {
	    //For -4 < nivo <  2 : from = -3
	    //For      nivo < -3 : from = nivo
	    //For      nivo >  1 : from = nivo - 4
	    if ((this.getNivo() < Position.NIVO_COLUMN_FIRST()) || (this.getNivo() > 1)) {
	      if (this.getNivo() < Position.NIVO_ROOT()) {
	        result = this.getNivo();
	      } else {
	        result = this.getNivo() - 4;
	      }
	    }
	    //Limits!
	    //Lower (where_used): -15
	    if (result < Position.WHERE_MAX()) {
	      result = Position.WHERE_MAX(); 
	    }
	    //Upper (what_used): 21 (25 - 4)
	    if (result > (Position.WHAT_MAX() - 4)) {
	      result = (Position.WHAT_MAX() - 4);
	    }
	  } catch(error) {
			Utils.alert("GridRange/getFrom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.getUntil = function() {
		Utils.alert("GridRange/getUntil");
	  var result = (this.getFrom() + (this.getNbrOfColumns() - 1));
    try {
  	  var from = this.getFrom();
  	  if (from >= Position.NIVO_COLUMN_FIRST()) {
  	    result = (from + 4);
  	  } else if (from >= -6) {
  	    result = (from + Math.abs(from) + 1);
  	  }
	  } catch(error) {
			Utils.alert("GridRange/getUntil Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
	this.print = function(html,keysOnly) {
		var _html = (html !== undefined && html !== null)?html:false;
		var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'GridRange:'+_nl;
		try {
			result += this.parent();
	  } catch(error) {
			Utils.alert("GridRange/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	};
};
GridRange = new Class(new GridRange());
