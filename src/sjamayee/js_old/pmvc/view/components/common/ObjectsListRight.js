//Abstract
var ObjectsListRight = function() {
  this.Extends = ListUIComponent;

	this.initialize = function(name,properties) {
    var html = this.buildHtml(name);
		//alert("ObjectsListRight/initialize - html: "+html);
		this.parent(name,{html:html});
	};
	
  this.initializeChildren = function() {
    this.parent();
	//alert("ObjectsListRight/initializeChildren");
		var i = 0;
		var cells = [];
		for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
			var descCell = $(this.getDescCellId(i));
			if (descCell) {
				cells.push(descCell);
			}
		}
		this.setCells(cells);
  };

  this.getDescCellId = function(index,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+ObjectsListLeft.DESC_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.getDescAnchorId = function(index,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+ObjectsListLeft.DESC_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.buildHtml = function(name) {
		var result = '';
	  var i = 0;
	  var descriptionCells ='';
		for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
			var cellClass = ObjectsListMediator.CELL_CLASS_ID;
			var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
			if (i === 0) {
				cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
				cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
			}
			descriptionCells += '<div id="'+this.getDescCellId(i,name)+'" class="'+cell01Class+'">&nbsp;</div>';
		}
 		var result = '<div id="'+name+ObjectsListRight.DESC_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListMediator.COLUMN_DESC_CLASS_ID+'" style="width:100%;display:block;">'+
 		             ' <div id="'+name+ObjectsListRight.DESC_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_CLASS_ID+" "+ObjectsListMediator.COLUMN_HEADER_DESC_CLASS_ID+'">'+
 		             '  <a id="'+name+ObjectsListRight.DESC_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Description</a>'+
 		             ' </div>'+
 		             ' <div id="listColumnDescriptionCells" style="background-color:white">'+descriptionCells+'</div>'+
 		             '</div>';
 		return result;		
  };
};
ObjectsListRight = new Class(new ObjectsListRight());
ObjectsListRight.DESC_COLUMN_ID = "lcdescription";
ObjectsListLeft.REF_ANCHOR_ID = "lcdesca";
ObjectsListRight.DESC_COLUMN_HEADER_VALUE = "Description";
ObjectsListRight.COLUMN_DESC_CLASS_ID = "listColumnDescription";
