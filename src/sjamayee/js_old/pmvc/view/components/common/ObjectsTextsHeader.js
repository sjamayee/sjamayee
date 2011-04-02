//Abstract
var ObjectsTextsHeader = function() {
  this.Extends = TextsHeader;

	this.objectName = null;
	this.typeName = null;

	this.initialize = function(name,properties) {
	  var html = '<div id="'+name+ObjectsTextsHeader.SPECIAL_HEADER_ID+'">'+
		           '<h4 id="'+name+ObjectsTextsHeader.HEADER_LABEL_ID+'">'+ObjectsTextsHeader.HEADER_LABEL+'</h4>&nbsp;'+
		           '<font color="white">'+
							 '<h4 id="'+name+ObjectsTextsHeader.OBJECT_NAME_ID+'"></h4>&nbsp;&nbsp;&nbsp;'+
							 '<h4 id="'+name+ObjectsTextsHeader.TYPE_NAME_ID+'"></h4>'+
							 '</font>'+
							 '</div>';
 		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
	  //alert("ObjectsTextsHeader/initializeChildren - name: "+name);
		this.objectName = $(name+ObjectsTextsHeader.OBJECT_NAME_ID);
		this.typeName = $(name+ObjectsTextsHeader.TYPE_NAME_ID);
  };
};
ObjectsTextsHeader = new Class(new ObjectsTextsHeader());
ObjectsTextsHeader.HEADER_LABEL_ID = "objectTextHeader";
ObjectsTextsHeader.HEADER_LABEL = "TEXT ON OBJECT:";
ObjectsTextsHeader.OBJECT_NAME_ID = "objectName";
ObjectsTextsHeader.OBJECT_NAME_LABEL = "&nbsp;Object&nbsp;";
ObjectsTextsHeader.TYPE_NAME_ID = "typeName";
ObjectsTextsHeader.TYPE_NAME_LABEL = "&nbsp;Type&nbsp;";
