var DataChildDetail = function() {
  this.Extends = ChildDetail;

  this.initialize = function() {
	  var html = '<div id="'+DataChildNTD.ID+'" class="'+ChildNTD.CLASS_ID+'"></div>'+
						   '<div id="'+DataChildProperties.ID+'" class="'+ChildProperties.CLASS_ID+'"></div>';
	  this.parent(DataChildDetail.ID,{html:html});
  };

  this.initializeChildren = function() {
	  //alert("DataChildDetail/initializeChildren");
		this.ntd = new DataChildNTD();
		this.addChild(this.ntd);
		this.properties = new DataChildProperties();
		this.addChild(this.properties);
  };
};
DataChildDetail = new Class(new DataChildDetail());
DataChildDetail.ID = "dataChildDetail";
