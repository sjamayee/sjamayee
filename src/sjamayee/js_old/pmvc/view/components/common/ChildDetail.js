//Abstract
var ChildDetail = function() {
  this.Extends = SjamayeeUIComponent;

	this.ntd = null;
	this.properties = null;
/*
	this.initialize = function(name,properties) {
		var html = '<div id="'+name+ChildNTD.ID+'" class="'+ChildNTD.CLASS_ID+'"></div>'+
							 '<div id="'+name+ChildProperties.ID+'" class="'+ChildProperties.CLASS_ID+'"></div>';
		this.parent(name,{html:html});
	}
*/
};
ChildDetail = new Class(new ChildDetail());
ChildDetail.CLASS_ID = "childDetail";
