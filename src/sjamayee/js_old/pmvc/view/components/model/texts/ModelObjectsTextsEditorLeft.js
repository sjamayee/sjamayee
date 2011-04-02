var ModelObjectsTextsEditorLeft = function() {
  this.Extends = SjamayeeUIComponent;

	this.initialize = function(name,properties) {
    var html = this.buildHtml();
		//alert("ModelObjectsTextsEditorLeft/initialize - html: "+html);
		this.parent(ModelObjectsTextsEditorLeft.ID, {html: html});
	};
	
  this.buildHtml = function() {
   	//var result = '<div style="position:relative;float:left;width:100%;height:100%;background-color:#FF887A;text-align:center;">'+
   	//var result = '<div style="position:relative;float:left;width:100%;height:100%;background:inherit">'+
    //           '<br/><br/><h2>'+ModelObjectsTextsEditorLeft.LABEL+'</h2><br/><br/>'+
    //           '</div>';
  	var result = '<br/><br/><h2>'+ModelObjectsTextsEditorLeft.LABEL+'</h2><br/><br/>';
 		return result;		
  };
};
ModelObjectsTextsEditorLeft = new Class(new ModelObjectsTextsEditorLeft());
ModelObjectsTextsEditorLeft.ID = "modelObjectsTextsEditorLeft";
ModelObjectsTextsEditorLeft.LABEL = "TEXT EDITOR";
