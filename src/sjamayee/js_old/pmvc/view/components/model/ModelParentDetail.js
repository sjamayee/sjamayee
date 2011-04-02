var ModelParentDetail = function() {
  this.Extends = ParentDetail;
/*
	this.initialize = function() {
		this.parent(ModelParentDetail.ID);
	};
*/
  this.initialize = function() {
	  var html = '<div id="'+ModelParentNTD.ID+'" class="'+ParentNTD.CLASS_ID+'"></div>'+
						   '<div id="'+ModelParentProperties.ID+'" class="'+ParentProperties.CLASS_ID+'"></div>';
	  this.parent(ModelParentDetail.ID,{html:html});
  };

  this.initializeChildren = function() {
	  //alert("ModelParentDetail/initializeChildren");
		this.ntd = new ModelParentNTD();
		this.addChild(this.ntd);
		this.properties = new ModelParentProperties();
		this.addChild(this.properties);
  };
};
ModelParentDetail = new Class(new ModelParentDetail());
ModelParentDetail.ID = "modelParentDetail";
