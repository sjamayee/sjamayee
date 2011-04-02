var DetailLeft = function() {
  this.Extends = SjamayeeUIComponent;

	this.dataObjectNTD = null;
	this.dataParentDetail = null;
	this.modelObjectNTD = null;
	this.modelParentDetail = null;

	this.initialize = function() {
		var html = '<div id="'+DataObjectNTD.ID+'" class="'+ObjectNTD.CLASS_ID+'"></div>'+
							 '<div id="'+DataParentDetail.ID+'" class="'+ParentDetail.CLASS_ID+'"></div>'+
		           '<div id="'+ModelObjectNTD.ID+'" class="'+ObjectNTD.CLASS_ID+'"></div>'+
           		 '<div id="'+ModelParentDetail.ID+'" class="'+ParentDetail.CLASS_ID+'"></div>';	
		this.parent(DetailLeft.ID, {html: html});
	};

  this.initializeChildren = function() {
	  //alert("DetailLeft/initializeChildren");
		this.dataObjectNTD = new DataObjectNTD();
		this.addChild(this.dataObjectNTD);
		this.dataParentDetail = new DataParentDetail();
		this.addChild(this.dataParentDetail);
		this.modelObjectNTD = new ModelObjectNTD();
		this.addChild(this.modelObjectNTD);
		this.modelParentDetail = new ModelParentDetail();
		this.addChild(this.modelParentDetail);
  };
};
DetailLeft = new Class(new DetailLeft());
DetailLeft.ID = "detailPaneLeft";
