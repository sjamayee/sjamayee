//Abstract
var RelationsGridRight = function() {
  this.Extends = GridUIComponent;

	this.initialize = function(name,properties) {
    var html = this.buildHtml(name);
		//alert("RelationsGridRight/initialize - html: "+html);
		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
    this.parent();
	//alert("RelationsGridRight/initializeChildren");
		var cells = [];
		//for (var j = 0; j < Grid.PAGE_SIZE; j++) {
		//for (var row = Position.ROW_TOP(); row < GridView.DEFAULT_ROWS; row++) { //RelationsGridMediator.PAGE_SIZE_MAX
		for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
		  //var cell = $(RelationsGridRight.COLUMN_ID+'c0'+row);
		  var cell = $(this.getCellId(row));
	    var cellAnchorId = cell.id+'a';
	    //this.setCell(cellAnchorId,('c0'+row));
      var cellValue = ''; //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+('c0'+row)+'</a>';
      this.setCell(cell.id,cellValue);
			cells.push(cell);
		//if (row == 0) { alert("RelationsGridRight/initializeChildren - cell: "+cell+" id: "+(RelationsGridRight.COLUMN_ID+'c0'+row)); }
		}
		this.setCells(cells);		
  };

  this.getColumnHeaderId = function(name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_HEADER_ID;
    //alert("RelationsGridRight/getColumnHeaderId - id: "+result);
    return result;
  };

  this.getColumnHeaderAnchorId = function(name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_HEADER_ANCHOR_ID;
    //alert("RelationsGridRight/getColumnHeaderId - id: "+result);
    return result;
  };

  this.getColumnId = function(name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID;
    //alert("RelationsGridRight/getColumnId - id: "+result);
    return result;
  };
  
  this.getCellId = function(row,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE);
    //alert("RelationsGridRight/getCellId - id: "+result);
    return result;
  };

  this.getCellAnchorId = function(row,name)  {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'a';
    //alert("RelationsGridRight/getCellAnchorId - id: "+result);
    return result;
  };

  this.buildHtml = function(name) {
		var result = '';
		var nivo = Position.NIVO_ROOT(); //_grid.getLastNivo(); //TODO: initial build withouth GRID !!! - LEFT/RIGHT !!!
    var columnHeader = nivo;
    var columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;
    var columnHeaderClass = GridColumn.HEADER_CLASS_ID+" "+GridColumn.HEADER_FIRST_CLASS_ID+" "+GridColumn.HEADER_WHAT_USED_CLASS_ID;
    var lineColor = "inherit";
		result = '<div id="'+this.getColumnId(name)+'" class="'+columnClass+'">'+
		         '<div id="'+this.getColumnHeaderId(name)+'" class="'+columnHeaderClass+'">'+
           	 '<div style="float:left;width:20px;background-color:'+FontStyle.COLOR_LIGHTGRAY+';">&nbsp;</div>'+
             '<div id="'+this.getColumnHeaderAnchorId(name)+'" style="position:relative;left:2px;color:'+FontStyle.COLOR_CHILD()+';" tabindex="-1">'+columnHeader+'</div>'+
             '</div>';
		//for (var row = Position.ROW_TOP(); row < GridView.DEFAULT_ROWS; row++) { //RelationsGridMediator.PAGE_SIZE_MAX
		for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
		  var cellId = this.getCellId(row,name); //RelationsGridRight.COLUMN_ID+'c0'+row;
		  var cellAnchorId = cellId+'a';
    	//var cellClass = GridCell.CLASS_ID;
    	var cellClass = RelationsGridRight.CELL_CLASS_ID;
  	  result += '<div id="'+cellId+'" class="'+cellClass+'">'+
  	            //cell content.
  	            //'<div style="clear:both;text-align:left;position:relative;width:100%;height:100%;background-color:'+lineColor+';">'+
                //'<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:inherit;text-align:center;">&nbsp;</div>'+
                //cell value.
                //'<a id="'+cellAnchorId+'" style="background-color:inherit;;color:inherit;" href="#" style="width:100%;"></a>'+
                //'</div>'+
  	            '</div>';	
		}
		result += '</div>';
		return result;
  };
};
RelationsGridRight = new Class(new RelationsGridRight());
RelationsGridRight.COLUMN_ID = Grid.COLUMN_WHAT_ID;
RelationsGridRight.COLUMN_HEADER_ID = RelationsGridRight.COLUMN_ID+'h';
RelationsGridRight.COLUMN_HEADER_ANCHOR_ID = RelationsGridRight.COLUMN_ID+'ha';
RelationsGridRight.CELL_CLASS_ID = "relationsGridRightCell";
