//Abstract
var ObjectsListLeft = function() {
  this.Extends = ListUIComponent;

	this.initialize = function(name,properties) {
    var html = this.buildHtml(name);
		//alert("ObjectsListLeft/initialize - html: "+html);
		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
    this.parent();
	//alert("ObjectsListLeft/initializeChildren");
		//List cells
		var i = 0;
		var cells = [];
		for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
			var refCell = $(this.getRefCellId(i));
			if (refCell) {
				cells.push(refCell);
			}
			var nameCell = $(this.getNameCellId(i));
			if (nameCell) {
				cells.push(nameCell);
			}
			var typeCell = $(this.getTypeCellId(i));
			if (typeCell) {
			 	cells.push(typeCell);
			}
		}
		this.setCells(cells);
  };
    
  this.getRefCellId = function(index,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+ObjectsListLeft.REF_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
    //alert("ObjectsListLeft/getRefCellId - id: "+result);
    return result;
  };

  this.getRefAnchorId = function(index,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+ObjectsListLeft.REF_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
    //alert("ObjectsListLeft/getRefAnchorId - id: "+result);
    return result;
  };

  this.getNameCellId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+ObjectsListLeft.NAME_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.getNameAnchorId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+ObjectsListLeft.NAME_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.getTypeCellId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+ObjectsListLeft.TYPE_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.getTypeAnchorId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+ObjectsListLeft.TYPE_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

/*
  this.childrenInitialized = function() {
	  //alert("ObjectsListLeft/childrenInitialized");
	  //on ALL CELL's !!!
    this.xxx.addEvent(SjamayeeFacade.MOUSEOVER, this.lineMouseOver_Handler);
	}
*/
  this.buildHtml = function(name) {
		var result = '';
		var i = 0;
		var referenceCells ='';
		var nameCells ='';
		var typeCells ='';
		for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
			var cellClass = ObjectsListMediator.CELL_CLASS_ID;
			var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
			if (i === 0) {
				cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
				cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
			}
		//referenceCells += '<div id="'+name+ObjectsListLeft.REF_COLUMN_ID+'0'+i+'" class="'+cell01Class+'" style="padding:1px 5px 1px 1px;text-align:right;" onclick="_cf.setObjectListIndex('+i+');">&nbsp;</div>';
		//nameCells += '<div id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'0'+i+'" class="'+cellClass+'" onclick="_cf.setObjectListIndex('+i+');">&nbsp;</div>';
		//typeCells += '<div id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'0'+i+'" class="'+cellClass+'" onclick="_cf.setObjectListIndex('+i+');">&nbsp;</div>';
			referenceCells += '<div id="'+this.getRefCellId(i,name)+'" class="'+cell01Class+'" style="padding:1px 5px 1px 1px;text-align:right;">&nbsp;</div>';
			nameCells += '<div id="'+this.getNameCellId(i,name)+'" class="'+cellClass+'">&nbsp;</div>';
			typeCells += '<div id="'+this.getTypeCellId(i,name)+'" class="'+cellClass+'">&nbsp;</div>';
		}
		var result = '<div id="'+name+ObjectsListLeft.REF_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListLeft.COLUMN_REF_CLASS_ID+'" style="width:12%;display:block;">'+
							   ' <div id="'+name+ObjectsListLeft.REF_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_01_CLASS_ID+" "+ObjectsListLeft.COLUMN_HEADER_REF_CLASS_ID+'">'+
					 		   '  <a id="'+name+ObjectsListLeft.REF_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Ref.</a>'+
							   ' </div>'+
							   ' <div id="listColumnReferenceCells" style="background-color:white">'+referenceCells+'</div>'+
							   '</div>'+
							   '<div id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListLeft.COLUMN_NAME_CLASS_ID+'" style="width:65%;display:block;">'+
							   ' <div id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_CLASS_ID+" "+ObjectsListLeft.COLUMN_HEADER_NAME_CLASS_ID+'">'+
							   '  <a id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Name</a>'+
							   ' </div>'+
							   ' <div id="listColumnNameCells" style="background-color:white">'+nameCells+'</div>'+
							   '</div>'+
							   '<div id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListLeft.COLUMN_TYPE_CLASS_ID+'" style="width:23%;display:block;">'+
							   ' <div id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_CLASS_ID+" "+ObjectsListLeft.COLUMN_HEADER_TYPE_CLASS_ID+'">'+
							//'  <a id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'ha" href="" style="padding:0px 0px 0px 19px;" tabindex="-1" onclick="">Type</a>'+
							   '  <a id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Type</a>'+
							   ' </div>'+
							   ' <div id="listColumnTypeCells" style="background-color:white">'+typeCells+'</div>'+
							   '</div>';
 		return result;		
  };
};
ObjectsListLeft = new Class(new ObjectsListLeft());
ObjectsListLeft.REF_COLUMN_ID = "lcreference";
ObjectsListLeft.REF_ANCHOR_ID = "lcrefa";
ObjectsListLeft.NAME_COLUMN_ID = "lcname";
ObjectsListLeft.NAME_ANCHOR_ID = "lcnama";
ObjectsListLeft.TYPE_COLUMN_ID = "lctype";
ObjectsListLeft.TYPE_ANCHOR_ID = "lctypa";
ObjectsListLeft.COLUMN_REF_CLASS_ID = "listColumnReference";
ObjectsListLeft.COLUMN_NAME_CLASS_ID = "listColumnName";
ObjectsListLeft.COLUMN_TYPE_CLASS_ID = "listColumnType";
ObjectsListLeft.COLUMN_HEADER_REF_CLASS_ID = "listColumnHeaderReference";
ObjectsListLeft.COLUMN_HEADER_NAME_CLASS_ID = "listColumnHeaderName";
ObjectsListLeft.COLUMN_HEADER_TYPE_CLASS_ID = "listColumnHeaderType";
ObjectsListLeft.COLUMN_HEADER_DESC_CLASS_ID = "listColumnHeaderDescription";
