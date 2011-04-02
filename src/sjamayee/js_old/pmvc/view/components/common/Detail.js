var Detail = function() {
  this.Extends = SjamayeeUIComponent;

	this.splitter = null;

	this.initialize = function() {
		this.parent(Detail.ID);
		this.detail_blurHandler = this.detail_blurHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
	//alert("Detail/initializeChildren");
		this.splitter = new DetailSplitter();
		this.addChild(this.splitter);
  };
  
  this.childrenInitialized = function() {
		this.addEvent(SjamayeeFacade.BLUR, this.detail_blurHandler);
  };
  
	this.detail_blurHandler = function()	{
	  alert("Detail/detail_blurHandler");
	  //this.fireEvent(SjamayeeFacade.BLUR);
	};
};
Detail = new Class(new Detail());
Detail.ID = "detailPane";
Detail.NORMAL_SIZE = 217;
