//Abstract
var ParentDetail = function() {
  this.Extends = SjamayeeUIComponent;

	this.ntd = null;
	this.properties = null;
/*
	this.initialize = function(name,properties) {
		var html = '<div id="'+name+ParentNTD.ID+'" class="'+ParentNTD.CLASS_ID+'"></div>'+
							 '<div id="'+name+ParentProperties.ID+'" class="'+ParentProperties.CLASS_ID+'"></div>';
		this.parent(name,{html:html});
	}
*/
};
ParentDetail = new Class(new ParentDetail());
//ParentDetail.ID = "parentDetail";
ParentDetail.CLASS_ID = "parentDetail";
