var ModelChildDetail = function() {
  this.Extends = ChildDetail;
/*
	this.initialize = function() {
		this.parent(ModelChildDetail.ID);
	};
*/
  this.initialize = function() {
	  var html = '<div id="'+ModelChildNTD.ID+'" class="'+ChildNTD.CLASS_ID+'"></div>'+
						   '<div id="'+ModelChildProperties.ID+'" class="'+ChildProperties.CLASS_ID+'"></div>';
	  this.parent(ModelChildDetail.ID,{html:html});
  };
  
  this.initializeChildren = function() {
	  //alert("ModelChildDetail/initializeChildren");
		this.ntd = new ModelChildNTD();
		this.addChild(this.ntd);
		this.properties = new ModelChildProperties();
		this.addChild(this.properties);
  };
};
ModelChildDetail = new Class(new ModelChildDetail());
ModelChildDetail.ID = "modelChildDetail";
