//Abstract
var PagingMediator = function() {
	this.Extends = SjamayeeMediator;
	this.paging = null;
	this.bol = 0;
	this.eol = 0;
	this.line = 0;
	this.objectLine = 0;
	this.parentLine = 0;
	this.childLine = 0;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.objectLine = this.getBeginOfList();
		this.parentLine = this.getBeginOfList();
		this.childLine = this.getBeginOfList();
	};

	this.getPaging = function() {
		return this.paging;
	};

	this.setPaging = function(paging) {
		this.paging = paging;
	};

	this.getType = function () {
		return null;
	};
	
	this.getObjectLine = function() {
		return this.objectLine;
	};

	this.setObjectLine = function(line) {
		this.objectLine = line;
	};

	this.getParentLine = function() {
		return this.parentLine;
	};

	this.setParentLine = function(line) {
		this.parentLine = line;
	};

	this.getChildLine = function() {
		return this.childLine;
	};

	this.setChildLine = function(line) {
		this.childLine = line;
	};

	this.getLine = function() {
		var result = this.line;
	  if (result < this.getBeginOfList()) {
	    result = this.getBeginOfList();
	  } else if (result > this.getEndOfList()) {
  	  result = this.getEndOfList();
  	} 
		return result;
	};
	
	this.setLine = function(line) {
		this.line = line;
		//set focus!
	};
	
	this.setCurrentLine = function(evt) {
		var line = 0;
		var elementId = evt.target.id;
		if (elementId.length > 0) {
			var lastPosition = (elementId.length - 1);
			if (elementId.charAt(lastPosition) == "D") {
				lastPosition = (lastPosition - 1);
			}
			line = new Number(elementId.charAt(lastPosition));
			this.setLine(line);
		}
	//alert("PagingMediator/setCurrentLine - elementId: "+elementId+" lastPosition: "+lastPosition+" line: "+line);
	};	

	this.lineEmpty = function(line) {
    return false;
  };

  //Abstract
	this.firstPage = function()    { this.setPaging(PagingMediator.PAGE_FIRST); };
	this.previousPage = function() { this.setPaging(PagingMediator.PAGE_PREVIOUS); };
	this.previousLine = function() { this.setPaging(PagingMediator.LINE_PREVIOUS); };
	this.nextLine = function()     { this.setPaging(PagingMediator.LINE_NEXT); };
	this.nextPage = function()     { this.setPaging(PagingMediator.PAGE_NEXT); };
	this.lastPage = function()     { this.setPaging(PagingMediator.PAGE_LAST); };

	this.home = function() {
		//alert("PagingMediator/home - name: "+this.getName());
		try {
			this.setLine(this.getBeginOfList());
			this.firstPage(this.getEndOfList());
			//this.nextPage(this.getEndOfList());
		} catch(error) {
			Utils.alert("PagingMediator/home Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

	this.previous = function() {
		try {
			//this.setLine(this.getBeginOfList());
			this.previousPage(this.getEndOfList());
		} catch(error) {
			Utils.alert("PagingMediator/previous Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

	this.lineUp = function() {
		try {
			var line = this.getLine();
			if (line > this.getBeginOfList()) {
			  var previousLine = (line - 1);
			  if (!this.lineEmpty()) {
    			this.setLine(previousLine);
			  }
			} else {
			  this.previousLine();
			}
		} catch(error) {
			Utils.alert("PagingMediator/lineUp Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

	this.lineDown = function() {
		try {
			var line = this.getLine();
			if (line < this.getEndOfList()) {
			  var nextLine = (line + 1);
			  if (!this.lineEmpty()) {
    			this.setLine(nextLine);
			  }
			} else {
			  this.nextLine();
			}
		} catch(error) {
			Utils.alert("PagingMediator/lineDown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

	this.next = function() {
		try {
			//this.setLine(this.getBeginOfList());
			this.nextPage(this.getEndOfList());
		} catch(error) {
			Utils.alert("PagingMediator/next Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

	this.end = function() {
		try {
			this.setLine(this.getEndOfList());
			this.lastPage(this.getEndOfList());
		} catch(error) {
			Utils.alert("PagingMediator/end Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this.getLine();
		}
	};

  this.getLastLine = function() {
		for (var result = this.getEndOfList(); result >= this.getBeginOfList(); result--) {
      var cellValue = this.getCellValue(result);
      if (cellValue) {
        if (cellValue.length > 0) {
          break;
        }
      }
		}
    return result;
  };

	this.getBeginOfList = function()    { return this.bol; };
	this.setBeginOfList = function(bol) {	this.bol = bol;	};
	this.getEndOfList = function()      { return this.eol; };
	this.setEndOfList = function(eol)   {	this.eol = eol;	};
	this.getMaxOfList = function()      { return undefined; };
};
PagingMediator = new Class(new PagingMediator());
PagingMediator.PAGE_FIRST = "PAGE_FIRST";
PagingMediator.PAGE_PREVIOUS = "PAGE_PREVIOUS";
PagingMediator.LINE_PREVIOUS = "LINE_PREVIOUS";
PagingMediator.LINE_NEXT = "LINE_NEXT";
PagingMediator.PAGE_NEXT = "PAGE_NEXT";
PagingMediator.PAGE_LAST = "PAGE_LAST";
