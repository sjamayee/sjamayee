var DetailSplitter = function() {
  this.Extends = SjamayeeUIComponent;

	this.left = null;
	this.right = null;

	this.initialize = function() {
		this.parent(DetailSplitter.ID);
	};

  this.initializeChildren = function() {
	//alert("DetailSplitter/initializeChildren");
		this.left = new DetailLeft();
		this.addChild(this.left);
		this.right = new DetailRight();		
		this.addChild(this.right);
  };
};
DetailSplitter = new Class(new DetailSplitter());
DetailSplitter.ID = "detailSplitter";
