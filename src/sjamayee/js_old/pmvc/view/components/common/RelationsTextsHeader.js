//Abstract
var RelationsTextsHeader = function() {
  this.Extends = TextsHeader;

	this.relationText = null;

	this.initialize = function(name,properties) {
	  var html = '<div id="'+name+RelationsTextsHeader.SPECIAL_HEADER_ID+'">'+
               '<h4 id="'+name+RelationsTextsHeader.HEADER_LABEL_ID+'">'+RelationsTextsHeader.HEADER_LABEL+'</h4>&nbsp;'+
               '<font color="white">'+
						   '<h4 id="'+name+RelationsTextsHeader.RELATION_TEXT_ID+'"></h4>'+
               '</font>'+
							 '</div>';
		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
	  //alert("RelationsTextsHeader/initializeChildren - name: "+name);
		this.relationText = $(name+RelationsTextsHeader.RELATION_TEXT_ID);
  };
};
RelationsTextsHeader = new Class(new RelationsTextsHeader());
RelationsTextsHeader.HEADER_LABEL_ID = "relationTextHeader";
RelationsTextsHeader.HEADER_LABEL = "TEXT ON RELATION:";
RelationsTextsHeader.RELATION_TEXT_ID = "relationText";
RelationsTextsHeader.RELATION_TEXT_LABEL = "&nbsp;Relation&nbsp;";
