//Abstract
var RelationsGridLeft = function() {
  this.Extends = GridUIComponent;

	this.initialize = function(name,properties) {
		var html = this.buildHtml(name);
		//alert("RelationsGridLeft/initialize - html: "+html);
		this.parent(name,{html:html});
	};
	
  this.initializeChildren = function() {
    this.parent();
	//alert("RelationsGridLeft/initializeChildren");
		var cells = [];
		for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
			//for (var row = Position.ROW_TOP(); row < GridView.DEFAULT_ROWS; row++) { //RelationsGridMediator.PAGE_SIZE_MAX
  		for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
  		  //var cell = $(RelationsGridLeft.COLUMN_ID+'c'+col+row);
  		  var cell = $(this.getCellId(row,col));
  	    var cellAnchorId = cell.id+'a';
  	    //this.setCell(cellAnchorId,('c'+col+row));
        var cellValue = ''; //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+('c'+col+row)+'</a>';
        this.setCell(cell.id,cellValue);            
  			cells.push(cell);
			//if (row == 0) { alert("RelationsGridLeft/initializeChildren - cell: "+cell+" id: "+(RelationsGridLeft.COLUMN_ID+'c'+col+row)); }
			}
		}
		this.setCells(cells);
  }; 
  
  this.getColumnHeaderId = function(col,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'h';
    //alert("RelationsGridLeft/getColumnHeaderId - id: "+result);
    return result;
  };
  
  this.getColumnHeaderAnchorId = function(col,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'ha';
    //alert("RelationsGridLeft/getColumnHeaderId - id: "+result);
    return result;
  };
  
  this.getColumnId = function(col,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE);
    //alert("RelationsGridLeft/getColumnId - id: "+result);
    return result;
  };
  
  this.getCellId = function(row,col,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(col,Sjamayee.ID_PAD_SIZE);
    //alert("RelationsGridLeft/getCellId - id: "+result);
    return result;
  };
  
  this.getCellAnchorId = function(row,col,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'a';
    //alert("RelationsGridLeft/getCellAnchorId - id: "+result);
    return result;
  };
  
  this.buildHtml = function(name) {
		var result = '';
	  var nivoBase = Position.NIVO_COLUMN_FIRST();
	  //alert("RelationsGridLeft - columns: "+columns.length);
	  //for (var col = 0; col < GridView.MAXIMUM_COLUMNS; col++) {
	  for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
      //var columnId = RelationsGridLeft.COLUMN_ID+col;
      var columnId = this.getColumnId(col,name);
      var nivo = (nivoBase + col);
      var columnHeader = nivo;
      var columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHERE_USED_CLASS_ID+" "+GridColumn.WHERE_USED_4C_CLASS_ID;
      var columnHeaderClass = GridColumn.HEADER_CLASS_ID;
      //var cellClass = GridCell.CLASS_ID;
      var cellClass = RelationsGridLeft.CELL_CLASS_ID;
      if (col == Position.COLUMN_FIRST()) {
        columnHeaderClass = GridColumn.HEADER_CLASS_ID+" "+GridColumn.HEADER_FIRST_CLASS_ID;
        cellClass = RelationsGridLeft.CELL_CLASS_ID; //+" "+GridCell.LEFT_CLASS_ID;
      }
      if (nivo == Position.NIVO_ROOT()) {
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHERE_USED_CLASS_ID+" "+GridColumn.ROOT_4C_CLASS_ID;
      } else if (nivo > Position.NIVO_ROOT()) {
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_LEFT_CLASS_ID+" "+GridColumn.WHAT_USED_LEFT_4C_CLASS_ID;
      }
      var styleColor = FontStyle.COLOR_WHERE();
      if (nivo == Position.NIVO_ROOT()) {
        styleColor = FontStyle.COLOR_ROOT();
      } else if (nivo > Position.NIVO_ROOT()) { 
        styleColor = FontStyle.COLOR_WHAT();
      }
      var lineColor = "inherit";
  	/*result += '<div id="'+columnId+'" style="height:100%;width:'+width+'%;display:'+display+';" class="'+columnClass+'">'+
  		          '<div id="'+columnId+'h" style="color:'+styleColor+';padding:'+padding+'" class="'+columnHeaderClass+'">'+
                '<div id="'+columnId+'ha" style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+'</div>'+
                '</div>';*/
  	  result += '<div id="'+columnId+'" class="'+columnClass+'">'+
  		          '<div id="'+columnId+'h" class="'+columnHeaderClass+'">'+
                '<div id="'+columnId+'ha" style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+'</div>'+
                '</div>';
      var _cellClass = cellClass;
  		//for (var row = Position.ROW_TOP(); row < GridView.DEFAULT_ROWS; row++) {//RelationsGridMediator.PAGE_SIZE_MAX
  		for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
  		  //var cellId = RelationsGridLeft.COLUMN_ID+'c'+col+row;
  		  var cellId = this.getCellId(row,col,name);
        //var cellStyle = 'style="width:100%;height:17px;"';
        var cellAnchorId = cellId+'a';
        /*if (row == Position.ROW_TOP()) {
          cellClass = _cellClass+" "+GridCell.FIRST_CLASS_ID;
          //cellStyle = 'style="width:100%;height:17px;border-top:none;"';
        }*/
        result += '<div id="'+cellId+'" class="'+cellClass+'">'+ //+'" '+cellStyle+'>'+
      	          //cell content.
      	          //'<div style="clear:both;text-align:left;position:relative;width:100%;height:100%;background-color:'+lineColor+';">'+
                  //'<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:inherit;text-align:center;">&nbsp;</div>'+
                  //cell value.
                  //'<div id="'+cellAnchorId+'">&nbsp;</div>'+                      
                  //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;"></a>'+
                  //'</div>'+
      	          '</div>';
  		}
  		result += '</div>';
    }
    return result;
  };
  	
	this.removeClass = function(id) {
		$(id).removeClass(GridColumn.WHERE_USED_CLASS_ID);
		$(id).removeClass(GridColumn.WHERE_USED_4C_CLASS_ID);
		$(id).removeClass(GridColumn.WHERE_USED_5C_CLASS_ID);
		$(id).removeClass(GridColumn.WHERE_USED_6C_CLASS_ID);
		$(id).removeClass(GridColumn.WHERE_USED_7C_CLASS_ID);
		$(id).removeClass(GridColumn.WHERE_USED_8C_CLASS_ID);
		$(id).removeClass(GridColumn.ROOT_CLASS_ID);
		$(id).removeClass(GridColumn.ROOT_4C_CLASS_ID);
		$(id).removeClass(GridColumn.ROOT_5C_CLASS_ID);
		$(id).removeClass(GridColumn.ROOT_6C_CLASS_ID);
		$(id).removeClass(GridColumn.ROOT_7C_CLASS_ID);
		$(id).removeClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
		$(id).removeClass(GridColumn.WHAT_USED_LEFT_4C_CLASS_ID);
		$(id).removeClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
	};
};
RelationsGridLeft = new Class(new RelationsGridLeft());
RelationsGridLeft.COLUMN_ID = Grid.COLUMN_ID;
RelationsGridLeft.CELL_CLASS_ID = "relationsGridLeftCell";
RelationsGridLeft.getColumnId = function(columnNumber) {
  var _columnNumber = ((columnNumber !== undefined) && (columnNumber !== null))?columnNumber:Position.COLUMN_FIRST();
  if (_columnNumber > Position.COLUMNS_MAX()) {
    _columnNumber = Position.COLUMNS_MAX();
  }
  return RelationsGridLeft.COLUMN_ID+_columnNumber;
};
