var DetailRight = function() {
  this.Extends = SjamayeeUIComponent;

	this.dataObjectProperties = null;
	this.dataChildDetail = null;
	this.modelObjectProperties = null;
	this.modelChildDetail = null;

	this.initialize = function() {
		var html = '<div id="'+DataObjectProperties.ID+'" class="'+ObjectProperties.CLASS_ID+'"></div>'+
							 '<div id="'+DataChildDetail.ID+'" class="'+ChildDetail.CLASS_ID+'"></div>'+
		           '<div id="'+ModelObjectProperties.ID+'" class="'+ObjectProperties.CLASS_ID+'"></div>'+
							 '<div id="'+ModelChildDetail.ID+'" class="'+ChildDetail.CLASS_ID+'"></div>';
		this.parent(DetailRight.ID, {html: html});
	};

  this.initializeChildren = function() {
	//alert("DetailRight/initializeChildren");
		this.dataObjectProperties = new DataObjectProperties();
		this.addChild(this.dataObjectProperties);
		this.dataChildDetail = new DataChildDetail();
		this.addChild(this.dataChildDetail);
		this.modelObjectProperties = new ModelObjectProperties();
		this.addChild(this.modelObjectProperties);
		this.modelChildDetail = new ModelChildDetail();
		this.addChild(this.modelChildDetail);
  };
};
DetailRight = new Class(new DetailRight());
DetailRight.ID = "detailPaneRight";
