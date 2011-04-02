var DataParentDetail = function() {
  this.Extends = ParentDetail;
/*
	this.initialize = function() {
		this.parent(DataParentDetail.ID);
	}
*/
	this.initialize = function() {
		var html = '<div id="'+DataParentNTD.ID+'" class="'+ParentNTD.CLASS_ID+'"></div>'+
							 '<div id="'+DataParentProperties.ID+'" class="'+ParentProperties.CLASS_ID+'"></div>';
		this.parent(DataParentDetail.ID,{html:html});
	};
	
  this.initializeChildren = function() {
	  //alert("DataParentDetail/initializeChildren");
		this.ntd = new DataParentNTD();
		this.addChild(this.ntd);
		this.properties = new DataParentProperties();
		this.addChild(this.properties);
  };
};
DataParentDetail = new Class(new DataParentDetail());
DataParentDetail.ID = "dataParentDetail";
