//ObjectsListLeft
buildHtml: function(name) {
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
               '  <a id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Type</a>'+
               ' </div>'+
               ' <div id="listColumnTypeCells" style="background-color:white">'+typeCells+'</div>'+
               '</div>';
  return result;    
}

//ObjectsListRight
buildHtml: function(name) {
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
}

//RelationsGridLeft
buildHtml: function(name) {
  var result = '';
  var nivoBase = Position.NIVO_COLUMN_FIRST();
  for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
    var columnId = this.getColumnId(col,name);
    var nivo = (nivoBase + col);
    var columnHeader = nivo;
    var columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHERE_USED_CLASS_ID+" "+GridColumn.WHERE_USED_4C_CLASS_ID;
    var columnHeaderClass = GridColumn.HEADER_CLASS_ID;
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
    result += '<div id="'+columnId+'" class="'+columnClass+'">'+
              '<div id="'+columnId+'h" class="'+columnHeaderClass+'">'+
              '<div id="'+columnId+'ha" style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+'</div>'+
              '</div>';
    var _cellClass = cellClass;
    for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
      var cellId = this.getCellId(row,col,name);
      var cellAnchorId = cellId+'a';
      result += '<div id="'+cellId+'" class="'+cellClass+'">'+ //+'" '+cellStyle+'>'+
                '</div>';
    }
    result += '</div>';
  }
  return result;
}

//RelationsGridRight
buildHtml: function(name) {
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
}

//AttributeListUIComponent
  var html = '<div id="'+name+AttributeListUIComponent.HEADER_ID+'" class="'+AttributeListUIComponent.HEADER_CLASS_ID+'">'+headerValue+'</div>'+
             '<div id="'+name+'X" style="position:relative;float:top;top:23px;height:100%;">'+
             '<div id="'+name+AttributeListUIComponent.NAMES_ID+'" class="'+AttributeListUIComponent.NAMES_CLASS_ID+'">'+
             ' <div id="'+name+AttributeListUIComponent.NAME_HEADER_ID+'" class="'+AttributeListUIComponent.NAME_HEADER_CLASS_ID+'">'+AttributeListUIComponent.NAME_HEADER_VALUE+'</div>'+
             ' <div id="'+this.getNameCellId(1,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(1,name)+'">1111111111</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(2,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(2,name)+'">22222</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(3,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(3,name)+'">333</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(4,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(4,name)+'">n4</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(5,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(5,name)+'">&nbsp;</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(6,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(6,name)+'">n6</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(7,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(7,name)+'">&nbsp;</a>'+
             ' </div>'+
             ' <div id="'+this.getNameCellId(8,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
             '   <a id="'+this.getNameAnchorId(8,name)+'">n8</a>'+
             ' </div>'+
             '</div>'+
             '<div id="'+name+AttributeListUIComponent.VALUES_ID+'" class="'+AttributeListUIComponent.VALUES_CLASS_ID+'">'+
             ' <div id="'+name+AttributeListUIComponent.VALUE_HEADER_ID+'" class="'+AttributeListUIComponent.VALUE_HEADER_CLASS_ID+'">'+AttributeListUIComponent.VALUE_HEADER_VALUE+'</div>'+
             ' <div id="'+this.getValueCellId(1,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(1,name)+'">1111111111111</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(2,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(2,name)+'">&nbsp;</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(3,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(3,name)+'">&nbsp;</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(4,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(4,name)+'">&nbsp;</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(5,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(5,name)+'">55555</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(6,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(6,name)+'">666666</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(7,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(7,name)+'">&nbsp;</a>'+
             ' </div>'+
             ' <div id="'+this.getValueCellId(8,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
             '   <a id="'+this.getValueAnchorId(8,name)+'">88888888</a>'+
             ' </div>'+
             '</div>'+
             '</div>';


/*********************************************************************************************************/

//Class: UIComponent
var UIComponent = new Class({
  initialize: function(element, properties) {
    this.initialized = false;
    this.element = null;
    this.element = $(element);
  //this.element = document.id(element);
  //this.element = document.getElementById(element);

  //alert("Element - element: "+this.element+" "+this.element.toString());
    if (!this.element)
      this.element = new Element(element, properties);
    else
      this.element.setProperties(properties);

    //Copy methods of the Element object to 'this' and bind the functions to the element itself.
    //This creates a transparent wrapper in the UIComponent for each method of the Element.
    var e = this.element;
    for (var key in e) {
      var type = null;
      try {
        //IE 7+ has a problem with this sometimes.
        type = typeof e[key];
      } catch(e){ } //alert("UIComponent/initialize - IE7 - e: "+e.message); }    //TODO: SILENT CATCH !!!
      if (type == "function" && !this[key]) {
        try {
          //Safari has trouble here with some function binding
          this[key] = e[key].bind(e);
        }
        catch(e){ } //alert("UIComponent/initialize - Safari - e: "+e.message); } //TODO: SILENT CATCH !!!
      }
    }
  },
  initializeChildren: function(){},
  childrenInitialized: function(){},
  initializationComplete: function() {
    this.initialized = true;
  },
  addChild: function(child) {
    this.grab(child.element);
    //Initialize child
    child.initializeChildren();
    child.childrenInitialized();
    child.initializationComplete();
    //Fire an added event
    child.fireEvent("added");
    return this;
  }
});

//Abstract
//Class: SjamayeeUIComponent
var SjamayeeUIComponent = new Class({
  Extends: UIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
    this.id = name;
  },
  setElement: function(id,value) {
    if ($(id) !== null) {
      $(id).innerHTML = value;
    }
  }
});

//Abstract
//Class: ListUIComponent
var ListUIComponent = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);   
    this.cells = [];
    this.list_clickHandler = this.list_clickHandler.bindWithEvent(this);  
    this.line_clickHandler = this.line_clickHandler.bindWithEvent(this);
    this.line_mouseOverHandler = this.line_mouseOverHandler.bindWithEvent(this);
    this.line_mouseOutHandler = this.line_mouseOutHandler.bindWithEvent(this);
    this.keypressHandler = this.keypressHandler.bindWithEvent(this);  
    this.keydownHandler = this.keydownHandler.bindWithEvent(this);  
    //Create keyboard.        
    this.keyboardEventTypes = new Array();    
    this.keyboardEventTypes['defaultEventType'] = SjamayeeFacade.KEYDOWN;
    this.keyboard = new Keyboard(this.keyboardEventTypes);
    this.keyboardEvents = new Array();
    //Add List events.
    this.keyboardEvents[SjamayeeFacade.ESCAPE] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.SPACE] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.ENTER] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.HOME] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.UP] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.DOWN] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.PREVIOUS] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.NEXT] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.END] = this.keydownHandler;
    this.keyboard.addEvents(this.keyboardEvents);
  },
  childrenInitialized: function() {
    //Add handlers on cells.
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.addEvent(SjamayeeFacade.CLICK, this.line_clickHandler);  
      cell.addEvent(SjamayeeFacade.MOUSEOVER, this.line_mouseOverHandler);
      cell.addEvent(SjamayeeFacade.MOUSEOUT, this.line_mouseOutHandler);
    }
    this.addEvent(SjamayeeFacade.CLICK, this.list_clickHandler);
  },
  getCells: function() {
    return this.cells;
  },
  setCells: function(cells) {
    this.cells = cells;
  },
  clear: function() {
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
    }
  },
  getValues: function() {
    return null; //this.cells;
  },
  setCell: function(id,value) {
  /*$(id).innerHTML = value;*/
    this.setElement(id,value);
  },
  list_clickHandler: function()    { this.fireEvent(SjamayeeFacade.LIST_CLICK); }, // alert("ListUIComponent/list_clickHandler"); },
  line_clickHandler: function(evt) {
/*
    var cellIds = '';
    var j = 0;
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cellIds += cell.id;
      j++;
      if (j < 10) {
        cellIds += ",";
      } else {
        cellIds += "\n";
        j = 0;
      }
    }
    this.fireEvent(SjamayeeFacade.LINE_CLICK, evt);
*/    
    //var id = evt.target.id;
    //var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
    //alert("ListUIComponent/line_clickHandler - target/id: "+id+" line: "+line);
    this.fireEvent(SjamayeeFacade.LINE_CLICK,evt);
  },
  line_mouseOverHandler: function(evt) { this.fireEvent(SjamayeeFacade.LINE_MOUSEOVER, evt); },
  line_mouseOutHandler: function(evt)  { this.fireEvent(SjamayeeFacade.LINE_MOUSEOUT, evt); },
  keypressHandler: function()          {  this.fireEvent(SjamayeeFacade.LIST_KEYPRESS); },
  keydownHandler: function(evt) {
    var subEvent = null;
    switch (evt.key) {
      case SjamayeeFacade.ESCAPE:
      subEvent = SjamayeeFacade.ESCAPE;
      break;
      case SjamayeeFacade.SPACE:
      subEvent = SjamayeeFacade.SPACE;
      break;
      case SjamayeeFacade.ENTER:
      subEvent = SjamayeeFacade.ENTER;
      break;
      case SjamayeeFacade.UP:
      subEvent = SjamayeeFacade.UP;
      break;
      case SjamayeeFacade.DOWN:
      subEvent = SjamayeeFacade.DOWN;
      break;
      case SjamayeeFacade.PREVIOUS:
      subEvent = SjamayeeFacade.PREVIOUS;
      break;
      case SjamayeeFacade.NEXT:
      subEvent = SjamayeeFacade.NEXT;
      break;
      case SjamayeeFacade.HOME:
      subEvent = SjamayeeFacade.HOME;
      break;
      case SjamayeeFacade.END:
      subEvent = SjamayeeFacade.END;
      break;
    }
    this.fireEvent(SjamayeeFacade.LIST_KEYDOWN, [evt,subEvent]);
    return subEvent;
  }
});

//Abstract
//Class: AttributeListUIComponent
var AttributeListUIComponent = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    this.attribute01Name = null;
    this.attribute01Value = null;
    this.attribute02Name = null;
    this.attribute02Value = null;
    this.attribute03Name = null;
    this.attribute03Value = null;
    this.attribute04Name = null;
    this.attribute04Value = null;
    this.attribute05Name = null;
    this.attribute05Value = null;
    this.attribute06Name = null;
    this.attribute06Value = null;
    this.attribute07Name = null;
    this.attribute07Value = null;
    this.attribute08Name = null;
    this.attribute08Value = null;
    var headerValue = AttributeListUIComponent.PROPERTIES_HEADER_VALUE;
    if (properties) {
      if (properties['header_value']) {
        headerValue = properties['header_value'];
      }
    }
    var html = '<div id="'+name+AttributeListUIComponent.HEADER_ID+'" class="'+AttributeListUIComponent.HEADER_CLASS_ID+'">'+headerValue+'</div>'+
               '<div id="'+name+'X" style="position:relative;float:top;top:23px;height:100%;">'+
               '<div id="'+name+AttributeListUIComponent.NAMES_ID+'" class="'+AttributeListUIComponent.NAMES_CLASS_ID+'">'+
               ' <div id="'+name+AttributeListUIComponent.NAME_HEADER_ID+'" class="'+AttributeListUIComponent.NAME_HEADER_CLASS_ID+'">'+AttributeListUIComponent.NAME_HEADER_VALUE+'</div>'+
               ' <div id="'+this.getNameCellId(1,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(1,name)+'">1111111111</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(2,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(2,name)+'">22222</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(3,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(3,name)+'">333</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(4,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(4,name)+'">n4</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(5,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(5,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(6,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(6,name)+'">n6</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(7,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(7,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(8,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(8,name)+'">n8</a>'+
               ' </div>'+
               '</div>'+
               '<div id="'+name+AttributeListUIComponent.VALUES_ID+'" class="'+AttributeListUIComponent.VALUES_CLASS_ID+'">'+
               ' <div id="'+name+AttributeListUIComponent.VALUE_HEADER_ID+'" class="'+AttributeListUIComponent.VALUE_HEADER_CLASS_ID+'">'+AttributeListUIComponent.VALUE_HEADER_VALUE+'</div>'+
               ' <div id="'+this.getValueCellId(1,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(1,name)+'">1111111111111</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(2,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(2,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(3,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(3,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(4,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(4,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(5,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(5,name)+'">55555</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(6,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(6,name)+'">666666</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(7,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(7,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(8,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(8,name)+'">88888888</a>'+
               ' </div>'+
               '</div>'+
               '</div>';
    this.parent(name,{html:html});
    this.name_clickHandler = this.name_clickHandler.bindWithEvent(this);
    this.value_clickHandler = this.value_clickHandler.bindWithEvent(this);
    
    this.hsplitter = new Splitter($(name+"X"), {'handleWidth':1});
		this.hsplitter.addWidget($(name+AttributeListUIComponent.NAMES_ID)); //, {'handleWidth':1});
		this.hsplitter.addWidget($(name+AttributeListUIComponent.VALUES_ID)); //, {'handleWidth':1});
  },
  initializeChildren: function() {
    var name = this.id;
    this.attribute01Name = $(this.getNameCellId(1));
    this.attribute01Value = $(this.getValueCellId(1));
    this.attribute02Name = $(this.getNameCellId(2));
    this.attribute02Value = $(this.getValueCellId(2));
    this.attribute03Name = $(this.getNameCellId(3));
    this.attribute03Value = $(this.getValueCellId(3));
    this.attribute04Name = $(this.getNameCellId(4));
    this.attribute04Value = $(this.getValueCellId(4));
    this.attribute05Name = $(this.getNameCellId(5));
    this.attribute05Value = $(this.getValueCellId(5));
    this.attribute06Name = $(this.getNameCellId(6));
    this.attribute06Value = $(this.getValueCellId(6));
    this.attribute07Name = $(this.getNameCellId(7));
    this.attribute07Value = $(this.getValueCellId(7));
    this.attribute08Name = $(this.getNameCellId(8));
    this.attribute08Value = $(this.getValueCellId(8));
    var cells = [];
    cells.push(this.attribute01Name);
    cells.push(this.attribute01Value);
    cells.push(this.attribute02Name);
    cells.push(this.attribute02Value);
    cells.push(this.attribute03Name);
    cells.push(this.attribute03Value);
    cells.push(this.attribute04Name);
    cells.push(this.attribute04Value);
    cells.push(this.attribute05Name);
    cells.push(this.attribute05Value);
    cells.push(this.attribute06Name);
    cells.push(this.attribute06Value);
    cells.push(this.attribute07Name);
    cells.push(this.attribute07Value);
    cells.push(this.attribute08Name);
    cells.push(this.attribute08Value);
    this.setCells(cells);
  },
  childrenInitialized: function() {
    this.attribute01Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute01Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute02Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute02Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute03Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute03Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute04Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute04Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute05Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute05Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute06Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute06Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute07Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute07Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute08Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute08Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.parent();
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.addEvent(SjamayeeFacade.CLICK, this.line_clickHandler);  
    }
    this.addEvent(SjamayeeFacade.CLICK, this.list_clickHandler);
  },
  setHeader: function(id, value) {
    $(id).innerHTML = value;
  },
  name_clickHandler: function(evt)  {
    this.fireEvent(SjamayeeFacade.ATTRIBUTE_NAME_CLICK);
  },
  value_clickHandler: function(evt) {
    this.fireEvent(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK);
  },
  getNameCellId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.NAME_ID+'r'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getNameAnchorId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.NAME_ID+'a'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getValueCellId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.VALUE_ID+'r'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getValueAnchorId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.VALUE_ID+'a'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  }
});

//Abstract
//Class: ObjectsListLeft
var ObjectsListLeft = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
  },
  initializeChildren: function() {
    this.parent();
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
  },    
  buildHtml: function(name) {
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
  }
});

//Class: DataObjectsListLeft
var DataObjectsListLeft = new Class({
  Extends: ObjectsListLeft,
  initialize: function(name,properties) {
    this.parent(DataObjectsListLeft.ID, properties);
  }
});
DataObjectsListLeft.ID = "dataObjectsListLeft";

//Class: ModelObjectsListLeft
var ModelObjectsListLeft = new Class({
  Extends: ObjectsListLeft,
  initialize: function(name,properties) {
    this.parent(ModelObjectsListLeft.ID, properties);
  }
});
ModelObjectsListLeft.ID = "modelObjectsListLeft";

//Abstract
//Class: ObjectsListRight
var ObjectsListRight = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
  },  
  initializeChildren: function() {
    this.parent();
    var i = 0;
    var cells = [];
    for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
      var descCell = $(this.getDescCellId(i));
      if (descCell) {
        cells.push(descCell);
      }
    }
    this.setCells(cells);
  },
  getDescCellId: function(index,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListRight.DESC_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getDescAnchorId: function(index,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListRight.DESC_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  buildHtml: function(name) {
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
  }
});
ObjectsListRight.DESC_COLUMN_ID = "lcdescription";
ObjectsListRight.DESC_ANCHOR_ID = "lcdesca";
ObjectsListRight.DESC_COLUMN_HEADER_VALUE = "Description";
ObjectsListRight.COLUMN_DESC_CLASS_ID = "listColumnDescription";

//Class: DataObjectsListRight
var DataObjectsListRight = new Class({
  Extends: ObjectsListRight,
  initialize: function(name,properties) {
    this.parent(DataObjectsListRight.ID, properties);
  }
});
DataObjectsListRight.ID = "dataObjectsListRight";

//Class: ModelObjectsListRight
var ModelObjectsListRight = new Class({
  Extends: ObjectsListRight,
  initialize: function(name,properties) {
    this.parent(ModelObjectsListRight.ID, properties);
  }
});
ModelObjectsListRight.ID = "modelObjectsListRight";

//Abstract
//Class: GridUIComponent
var GridUIComponent = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
    this.grid_clickHandler = this.grid_clickHandler.bindWithEvent(this);      
    this.cell_clickHandler = this.cell_clickHandler.bindWithEvent(this);
    this.cell_mouseOverHandler = this.cell_mouseOverHandler.bindWithEvent(this);
    this.cell_mouseOutHandler = this.cell_mouseOutHandler.bindWithEvent(this);    
    //Extend keyboard with Grid events.   
    this.keyboardEvents[SjamayeeFacade.LEFT] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.RIGHT] = this.keydownHandler;
    this.keyboard.removeEvents();
    this.keyboard.addEvents(this.keyboardEvents);
  },
  childrenInitialized: function() {
    this.parent();    
    //Add handlers on cells.
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.addEvent(SjamayeeFacade.CLICK, this.cell_clickHandler);  
      cell.addEvent(SjamayeeFacade.MOUSEOVER, this.cell_mouseOverHandler);
      cell.addEvent(SjamayeeFacade.MOUSEOUT, this.cell_mouseOutHandler);
    }
    this.addEvent(SjamayeeFacade.CLICK, this.grid_clickHandler);
  },
  clear: function() {
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      if (cell) {
        var cellAnchorId = cell.id+'a';
        //this.setCell(cellAnchorId,'&nbsp;');
        //this.setCell(cellAnchorId,'');
        this.setCell(cell.id,'&nbsp;');
      }
    }
  },
  grid_clickHandler: function(evt) { this.fireEvent(SjamayeeFacade.GRID_CLICK,evt); },
  cell_clickHandler: function(evt) {
    var id = evt.target.id;
    var row = id.substr(id.length-(Sjamayee.ID_PAD_SIZE*2+1),Sjamayee.ID_PAD_SIZE);
    var column = id.substr(id.length-Sjamayee.ID_PAD_SIZE);   
    this.fireEvent(SjamayeeFacade.GRID_CELL_CLICK,evt);
  },
  cell_mouseOverHandler: function(evt) { this.fireEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, evt); },
  cell_mouseOutHandler: function(evt)  { this.fireEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, evt); },
  list_clickHandler: function()    {}, //Disabled.
  line_clickHandler: function(evt) {}, //Disabled.
  line_mouseOverHandler: function(evt) {}, //Disabled.
  line_mouseOutHandler: function(evt)  {}, //Disabled.
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    switch (evt.key) {
      case SjamayeeFacade.LEFT:
      subEvent = SjamayeeFacade.LEFT;
      break;
      case SjamayeeFacade.RIGHT:
      subEvent = SjamayeeFacade.RIGHT;
      break;
    }
    this.fireEvent(SjamayeeFacade.GRID_KEYDOWN, [evt,subEvent]);    
    return subEvent;
  }
});

//Abstract
//Class: RelationsGridLeft
var RelationsGridLeft = new Class({
  Extends: GridUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
  },
  initializeChildren: function() {
    this.parent();
    var cells = [];
    for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
      for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
        var cell = $(this.getCellId(row,col));
        var cellAnchorId = cell.id+'a';
        var cellValue = ''; //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+('c'+col+row)+'</a>';
        this.setCell(cell.id,cellValue);            
        cells.push(cell);
      }
    }
    this.setCells(cells);
  },
  getColumnHeaderId: function(col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'h';
    return result;
  },
  getColumnHeaderAnchorId: function(col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'ha';
    return result;
  },
  getColumnId: function(col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getCellId: function(row,col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(col,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getCellAnchorId: function(row,col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'a';
    return result;
  },
  buildHtml: function(name) {
    var result = '';
    var nivoBase = Position.NIVO_COLUMN_FIRST();
    for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
      var columnId = this.getColumnId(col,name);
      var nivo = (nivoBase + col);
      var columnHeader = nivo;
      var columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHERE_USED_CLASS_ID+" "+GridColumn.WHERE_USED_4C_CLASS_ID;
      var columnHeaderClass = GridColumn.HEADER_CLASS_ID;
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
      result += '<div id="'+columnId+'" class="'+columnClass+'">'+
                '<div id="'+columnId+'h" class="'+columnHeaderClass+'">'+
                '<div id="'+columnId+'ha" style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+'</div>'+
                '</div>';
      var _cellClass = cellClass;
      for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
        var cellId = this.getCellId(row,col,name);
        var cellAnchorId = cellId+'a';
        result += '<div id="'+cellId+'" class="'+cellClass+'">'+ //+'" '+cellStyle+'>'+
                  '</div>';
      }
      result += '</div>';
    }
    return result;
  }
});
RelationsGridLeft.COLUMN_ID = Grid.COLUMN_ID;
RelationsGridLeft.CELL_CLASS_ID = "relationsGridLeftCell";

//Class: DataRelationsGridLeft
var DataRelationsGridLeft = new Class({
  Extends: RelationsGridLeft,
  initialize: function(name,properties) {
    this.parent(DataRelationsGridLeft.ID, properties);
  }
});
DataRelationsGridLeft.ID = "dataRelationsGridLeft";

//Class: ModelRelationsGridLeft
var ModelRelationsGridLeft = new Class({
  Extends: RelationsGridLeft,
  initialize: function(name,properties) {
    this.parent(ModelRelationsGridLeft.ID, properties);
  }
});
ModelRelationsGridLeft.ID = "modelRelationsGridLeft";

//Abstract
//Class: RelationsGridRight
var RelationsGridRight = new Class({
  Extends: GridUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
  },
  initializeChildren: function() {
    this.parent();
    var cells = [];
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
  },
  getColumnHeaderId: function(name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_HEADER_ID;
    return result;
  },
  getColumnHeaderAnchorId: function(name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_HEADER_ANCHOR_ID;
    return result;
  },
  getColumnId: function(name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID;
    return result;
  },
  getCellId: function(row,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(RelationsGridRight.COLUMN_VALUE,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getCellAnchorId: function(row,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'a';
    return result;
  },
  buildHtml: function(name) {
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
    for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
      var cellId = this.getCellId(row,name); //RelationsGridRight.COLUMN_ID+'c0'+row;
      var cellAnchorId = cellId+'a';
      //var cellClass = GridCell.CLASS_ID;
      var cellClass = RelationsGridRight.CELL_CLASS_ID;
      result += '<div id="'+cellId+'" class="'+cellClass+'">'+
                '</div>'; 
    }
    result += '</div>';
    return result;
  }
});
RelationsGridRight.COLUMN_ID = Grid.COLUMN_WHAT_ID;
RelationsGridRight.COLUMN_VALUE = 999;
RelationsGridRight.COLUMN_HEADER_ID = RelationsGridRight.COLUMN_ID+'h';
RelationsGridRight.COLUMN_HEADER_ANCHOR_ID = RelationsGridRight.COLUMN_ID+'ha';
RelationsGridRight.CELL_CLASS_ID = "relationsGridRightCell";

//Class: DataRelationsGridRight
var DataRelationsGridRight = new Class({
  Extends: RelationsGridRight,
  initialize: function(name,properties) {
    this.parent(DataRelationsGridRight.ID, properties);
  }
});
DataRelationsGridRight.ID = "dataRelationsGridRight";

//Class: ModelRelationsGridRight
var ModelRelationsGridRight = new Class({
  Extends: RelationsGridRight,
  initialize: function(name,properties) {
    this.parent(ModelRelationsGridRight.ID, properties);
  }
});
ModelRelationsGridRight.ID = "modelRelationsGridRight";
