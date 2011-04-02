var GridListSplitter = function() {
  this.Extends = SjamayeeUIComponent;

	this.left = null;
	this.right = null;
	
	this.initialize = function(name,properties) {
		this.parent(GridListSplitter.ID);
	};

  this.initializeChildren = function() {
	//alert("GridListSplitter/initializeChildren");
		this.left = new GridListLeft();
		this.addChild(this.left);
		this.right = new GridListRight();		
		this.addChild(this.right);
  };
};
GridListSplitter = new Class(new GridListSplitter());
GridListSplitter.ID = "listSplitter";
