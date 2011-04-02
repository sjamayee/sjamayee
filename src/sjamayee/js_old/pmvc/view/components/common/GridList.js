var GridList = function() {
  this.Extends = SjamayeeUIComponent;

	this.gridListSplitter = null;
	
	this.initialize = function(name,properties) {
		this.parent(GridList.ID);
	};

  this.initializeChildren = function() {
	//alert("GridList/initializeChildren");
		this.gridListSplitter = new GridListSplitter();
		this.addChild(this.gridListSplitter);
  };
};
GridList = new Class(new GridList());
GridList.ID = "listPaneBorder";
GridList.NORMAL_SIZE = 220;
GridList.MAXIMUM_SIZE = 437;
//GridList.RELATIONS_GRID = "RelationsGrid";
//GridList.OBJECTS_LIST = "ObjectsList";
