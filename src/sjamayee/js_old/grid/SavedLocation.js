var SavedLocation = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function(savedCell,topCell) {
	  try {
			this.parent();
  		if (savedCell !== undefined) {
	   	  this.setSavedCell(savedCell);
	   	}
  		if (topCell !== undefined) {
	   	  this.setTopCell(topCell);
	   	}
	  } catch(error) {
			Utils.alert("SavedLocation/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
	//Getters & Setters
	this.setSavedCell = function(savedCell) {
		if (savedCell) {
	  	this.savedCell = savedCell.clone();
		}
	};
	this.getSavedCell = function() {
		var result = null;
		if (this.savedCell !== undefined) {
			result = this.savedCell;
		}
	  return result;
	};
	this.setTopCell = function(topCell) {
		if (topCell) {
	  	this.topCell = topCell.clone();
		}
	};
	this.getTopCell = function() {
		var result = null;
		if (this.topCell !== undefined) {
			result = this.topCell;
		}
	  return result;
	};
};
SavedLocation = new Class(new SavedLocation());
