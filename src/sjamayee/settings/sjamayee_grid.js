// $Id$

/*////////////////////////////
// GLOBAL VARIABLES - START //
//////////////////////////////
var _test             = false; //TEST ***
var _gridFocus        = null;
var _grid             = null;  //Grid
var _dataGrid         = null;  //DataGrid
var _modelGrid        = null;  //ModelGrid
var _parentRelation   = null;
var _childRelation    = null;
var _previousRelation = null;
var _currentRelation  = null;
var _nextRelation     = null;
var _object           = null;
var _id               = 1000;
var _sourceName       = null;
var _groupId          = null;
var _cNc              = 0;     //Counter for Navigation commands

var _cf               = null;  //CURRENT FORM
var _of               = null;  //ObjectsForm
var _rf               = null;  //RelationsForm

var _logger           = null;  //Logger
////////////////////////////
// GLOBAL VARIABLES - END //
//////////////////////////*/

//Static
//Class: FontStyle
var FontStyle = new Class({
  initialize: function() { return undefined; }
});
//Statics
FontStyle.FONT_STYLE_NORMAL = "normal";
FontStyle.FONT_STYLE_ITALIC = "italic";
FontStyle.FONT_WEIGHT_NORMAL = "normal";
FontStyle.FONT_WEIGHT_BOLD = "bold";
FontStyle.COLOR_INHERIT = "inherit";
FontStyle.COLOR_BLACK = "black";
FontStyle.COLOR_WHITE = "white";
FontStyle.COLOR_LIGHTGRAY = "#F2F2F2";
FontStyle.COLOR_DEBUG = "black";
FontStyle.COLOR_INFO = "lightgreen"; //lightgreen
FontStyle.COLOR_WARN = "lightred"; //orange
FontStyle.COLOR_ERROR = "red";
FontStyle.COLOR_FATAL = "red";
FontStyle.normal = function(cell,selected,nivo) {
  var _cell = (cell !== undefined)?cell:null;
  var _selected = (selected !== undefined && selected !== null)?selected:false;
  var _nivo = (nivo !== undefined && nivo !== null)?nivo:Position.NIVO_ROOT();
  if (_cell) {
    _selected = _cell.isSelected();
    _nivo = _cell.getNivo();
  }
  var result = '';
  try {
    var bgColor = FontStyle.COLOR_INHERIT;
    var fontColor = FontStyle.COLOR_FOR_NIVO(_nivo);
    if (_nivo == Position.NIVO_ROOT()) {
      bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
      fontColor = FontStyle.COLOR_WHITE;
    }   
    var fontStyle = FontStyle.FONT_STYLE_NORMAL;
    var fontWeight = FontStyle.FONT_WEIGHT_NORMAL;
    if (_cell) {
      var relation = cell.getRelation();
      if (_nivo == Position.NIVO_ROOT()) {
        fontWeight = FontStyle.FONT_WEIGHT_BOLD;
        if (relation) {
          var relationHasNoChild = (relation.getFirstChildRelation() === null)?true:false;
          if (!relation.hasParent() && relationHasNoChild) {
            bgColor = FontStyle.COLOR_WHITE;
            fontColor = FontStyle.COLOR_FOR_NIVO(_nivo);
          }
        }       
      }
      if (_selected) {
        fontColor = FontStyle.COLOR_BLACK; //FontStyle.COLOR_WHITE;
        if (_nivo == Position.NIVO_ROOT()) {
          bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
        } else {
          bgColor = 'light'+FontStyle.COLOR_FOR_NIVO(_nivo);
          if (_nivo < Position.NIVO_ROOT()) {
            if (relation.hasParentRelations() === true) {
              fontWeight = FontStyle.FONT_WEIGHT_BOLD;
            }
          } else if (_nivo > Position.NIVO_ROOT()) {
            if (relation.hasChildRelations() === true) {
              fontWeight = FontStyle.FONT_WEIGHT_BOLD;
            }
          }
        }
      }
      _cell.setFontWeight(fontWeight);      
    }
    result += 'background-color:'+bgColor;
    result += ';color:'+fontColor;
    result += ';font-style:'+fontStyle;
    result += ';font-weight:'+fontWeight+';';
  } catch(error) {
    Utils.alert("FontStyle/normal Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
FontStyle.focused = function(cell,selected,nivo) {
  var _cell = (cell !== undefined)?cell:null;
  var _selected = (selected !== undefined && selected !== null)?selected:false;
  var _nivo = (nivo !== undefined && nivo !== null)?nivo:Position.NIVO_ROOT();
  if (_cell) {
    _selected = _cell.isSelected();
    _nivo = _cell.getNivo();
  }
  var result = '';
  try {
    var bgColor = FontStyle.COLOR_INHERIT;
    var fontColor = fontColor = FontStyle.COLOR_BLACK;
    var fontStyle = FontStyle.FONT_STYLE_ITALIC;
    var fontWeight = FontStyle.FONT_WEIGHT_NORMAL;
    if (_cell) {
      var relation = cell.getRelation();
      if (_nivo == Position.NIVO_ROOT()) {
        fontWeight = FontStyle.FONT_WEIGHT_BOLD;
        bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
        if (relation) {
          var relationHasNoChild = (relation.getFirstChildRelation() === null)?true:false;
          if (!relation.hasParent() && relationtHasNoChild) {
            bgColor = FontStyle.COLOR_WHITE;
          }
        }
      }
      if (_selected) {
        if (_nivo == Position.NIVO_ROOT()) {
          bgColor = FontStyle.COLOR_FOR_NIVO(_nivo);
        } else {
          bgColor = 'light'+FontStyle.COLOR_FOR_NIVO(_nivo);
          if (_nivo < Position.NIVO_ROOT()) {
            if (relation.hasParentRelations() === true) {
              fontWeight = FontStyle.FONT_WEIGHT_BOLD;
            }
          } else if (_nivo > Position.NIVO_ROOT()) {
            if (relation.hasChildRelations() === true) {
              fontWeight = FontStyle.FONT_WEIGHT_BOLD;
            }
          }
        }
        /* NOK GLOBAL GRID NOK *******************************************************************
        if (!_grid.getPosition().isEqual(_cell.getPosition())) {        
          if (_nivo == Position.NIVO_ROOT()) {
            fontColor = FontStyle.COLOR_WHITE;
          } else {
            fontColor = FontStyle.COLOR_FOR_NIVO(_nivo);
          }
        }*/
      }
      _cell.setFontWeight(fontWeight);
    }
    result += 'background-color:'+bgColor;
    result += ';color:'+fontColor;
    result += ';font-style:'+fontStyle;
    result += ';font-weight:'+fontWeight+';';
  } catch(error) {
    Utils.alert("FontStyle/focused Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
FontStyle.COLOR_FOR_NIVO = function(nivo) {
  var result = FontStyle.COLOR_ROOT();
  try {
    if (nivo  < Position.NIVO_ROOT()) {
      result = FontStyle.COLOR_WHERE();
    } else if (nivo > Position.NIVO_ROOT()) {
      result = FontStyle.COLOR_WHAT();
    }
  } catch(error) {
    Utils.alert("FontStyle/COLOR_FOR_NIVO Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
FontStyle.COLOR_WHERE = function() {
  return "blue";
};
FontStyle.COLOR_ROOT = function() {
  return "red";
};
FontStyle.COLOR_WHAT = function() {
  return "green";
};
FontStyle.COLOR_PARENT = function(nivo) {
  var result = FontStyle.COLOR_WHERE();
  try {
    /*if (nivo == (Position.NIVO_ROOT() + 1)) {
    result = FontStyle.COLOR_ROOT();
    } else if (nivo > (Position.NIVO_ROOT() + 1)) {
    result = FontStyle.COLOR_WHAT();
    }*/
    if (nivo == Position.NIVO_ROOT()) {
      result = FontStyle.COLOR_ROOT();
    } else if (nivo > Position.NIVO_ROOT()) {
      result = FontStyle.COLOR_WHAT();
    }
  } catch(error) {
    Utils.alert("FontStyle/COLOR_PARENT Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
FontStyle.COLOR_CHILD = function(nivo) {
  var result = FontStyle.COLOR_WHAT();
  try {
    if (nivo == Position.NIVO_ROOT()) {
      result = FontStyle.COLOR_ROOT();
    } else if (nivo < Position.NIVO_ROOT()) {
      result = FontStyle.COLOR_WHERE();
    }
  } catch(error) {
    Utils.alert("FontStyle/COLOR_CHILD Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//Abstract
//Class: Grid
var Grid = new Class({
  Extends: SjamayeeBase,
  
  initialize: function(id) {
    try {
      this.parent();
      this.id = null;
      this.typeProxy = null;
      this.entityProxy = null;
      this.relationProxy = null;
      this.attributeProxy = null;
      this.setId(id);
      this.setDefaultCellWidth("90px");                     // 12.5%
      this.setMinimumCellWidth("120px");
      this.setRootCellWidth("120px");                       // 17.5%
      this.setLastCellWidth("100%");                        // 100%
      //Position
      this.setPosition(new Position());
      //Keyboard
      this.setKeyboard(new SKeyboard());
      //Current Nivo   
      this.setCurrentNivo(Position.NIVO_ROOT());
      //Initialize.
      this.clear();
    } catch(error) {
      Utils.alert("Grid/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getTypeProxy: function()                    { return this.typeProxy; },
  setTypeProxy: function(typeProxy)           { this.typeProxy = typeProxy; },
  getEntityProxy: function()                  { return this.entityProxy; },
  setEntityProxy: function(entityProxy)       { this.entityProxy = entityProxy; },
  getRelationProxy: function()                { return this.relationProxy; },
  setRelationProxy: function(relationProxy)   { this.relationProxy = relationProxy; },
  getAttributeProxy: function()               { return this.attributeProxy; },
  setAttributeProxy: function(attributeProxy) { this.attributeProxy = attributeProxy; },
  
  getId: function()   { return this.id; },
  setId: function(id) { this.id = id; },
  
  getMode: function() { return this.mode; },
  setMode: function(mode) {
    if (mode !== null) {
      if (this.mode !== null) {
        if (this.mode != mode) {
          this.setGridView(null);
          Utils.beep(2);
        }
      }
      this.mode = mode;
    }
  },
  isDisplay: function() {
    return (this.mode == Grid.MODE_DISPLAY);
  },
  isEdit: function() {
    return (this.mode == Grid.MODE_EDIT);
  },
  isInsert: function() {
    return (this.mode == Grid.MODE_INSERT);
  },
  getNivo: function() {
  /*var result = Position.NIVO_ROOT();
    if (this.nivo !== undefined && this.nivo !== null) {
      result = this.nivo;
    }*/
    return this.getCurrentNivo();
  },
  setNivo: function(nivo) {
    if (nivo !== null) {
      //this.nivo = nivo;
      this.setCurrentNivo(nivo);
    }
  },
  getWhereUsedNivo: function() {
    var result = (Position.NIVO_ROOT() - 1);
    if (this.whereUsedNivo !== undefined && this.whereUsedNivo !== null) {
      result = this.whereUsedNivo;
    }
    return result;
  },
  setWhereUsedNivo: function(whereUsedNivo) {
    if (whereUsedNivo !== null) {
      this.whereUsedNivo = whereUsedNivo;
    }
  },
  updateWhereUsed: function(column) {
    var _column = (column !== undefined)?column:null;
    try {
      var nivo = (Position.NIVO_ROOT() - 1);
      if (_column) {
        nivo = _column.getNivo();
      }
      var index = (Math.abs(nivo) - 1);
      var howMany = 1;
      var length = this.whereUsed.length;
      if (index < (length - 1)) {
        howMany = (length - index);
      }
      if (howMany > 0) {
        this.whereUsed.splice(index,howMany,_column);
      } else {
        this.whereUsed.push(_column);
      }   
      this.setWhereUsedNivo(nivo);
    } catch(error) {
      Utils.alert("Grid/updateWhereUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  getWhatUsedNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    if (this.whatUsedNivo !== undefined && this.whatUsedNivo !== null) {
      result = this.whatUsedNivo;
    }
  /*
    if (result) {
      var n = (Position.NIVO_ROOT() + 1);
      while (n < result) {
        var column = this.getColumnByNivo(n);
        if (column) {
          if (column.isEmpty()) { break; }
          var cell = column.getMaster();
          if (column.isSelected()) {
            cell = column.getSavedCell();
          }
          if (cell) {
            var relation = cell.getRelation();
            if (relation) {
              if (relation.getFirstChildRelation()) {
                n = n + 1;
                continue;
              }
            }
          }
        }
        break;
      }
      if (this.whatUsedNivo !== undefined && this.whatUsedNivo !== null) {
        if (n < this.whatUsedNivo) {
          var c1 = this.getColumnByNivo(n);
          if (c1) {
            if (!c1.isEmpty()) {
              n = n + 1;
            }
          }
        }
      }
      result = n;
    }
  */
    //this.setWhatUsedNivo(result);
    return result;
  },
  setWhatUsedNivo: function(whatUsedNivo) {
    if (whatUsedNivo !== null) {
       this.whatUsedNivo = whatUsedNivo;
    }
  },
  updateWhatUsed: function(column) {
    var _column = (column !== undefined)?column:null;
    try {
      var nivo = (Position.NIVO_ROOT() + 1);
      if (_column) {
        nivo = _column.getNivo();
      }
      var index = (Math.abs(nivo) - 1);
      var howMany = 1;
      var length = this.whatUsed.length;
      if (index < (length - 1)) {
        howMany = (length - index);
      }
      if (howMany > 0) {
        this.whatUsed.splice(index,howMany,_column);
      } else {
        this.whatUsed.push(_column);
      }
      this.setWhatUsedNivo(nivo);   
    } catch(error) {
      Utils.alert("Grid/updateWhatUsed Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  setPosition: function(position) {
    if (position) {
      this.position = position;
    }
  },
  getPosition: function() {
    var result = null;
    if (this.position !== undefined) {
      result = this.position;
    }
    return result;
  },
  getParentCell: function() {
    var result = null;
  /*if (this.parentCell !== undefined) {
      result = this.parentCell;
    }*/
    if (_rf) {
      result = _rf.getParentCell();
    }
    return result;
  },
  setParentCell: function(parentCell) {
    if (parentCell) {
    //this.parentCell = parentCell;
      if (_rf) {
        _rf.setParentCell(parentCell);
      }
    }
  },
  getChildCell: function() {
    var result = null;
  /*if (this.childCell !== undefined) {
      result = this.childCell;
    }*/
    if (_rf) {
      result = _rf.getChildCell();
    }   
    return result;
  },
  setChildCell: function(childCell) {
    if (childCell) {
    //this.childCell = childCell;
      if (_rf) {
        _rf.setChildCell(childCell);
      }
    }
  },
  setKeyboard: function(keyboard) {
    if (keyboard) {
      this.keyboard = keyboard;
    }
  },
  getKeyboard: function() {
    var result = null;
    if (this.keyboard !== undefined) {
      result = this.keyboard;
    }
    return result;
  },
  setGridView: function(gridView) {
    this.gridView = gridView;
  },
  getGridView: function() {
    if ((this.gridView === undefined) || (this.gridView === null)) {
      this.setGridView(new GridView(this));
      //if (this.isEdit()) {}
      if (this.isInsert() === true) {
        this.gridView.insertCell();
      }
    }
    return this.gridView;
  },
  setNivoBase: function(nivoBase) {
    if (nivoBase !== null) {
      this.nivoBase = nivoBase;
    }
  },
  getNivoBase: function() {
    var result = Position.NIVO_COLUMN_FIRST();
    try {
    //return this.nivoBase;
    //return SjamayeeForm.getNivoBase();          // *** NOK ***
      var gridView = this.getGridView();
      if (gridView) {
        var gridRange = gridView.getGridRange();
        if (gridRange) {
          result = gridRange.getFrom();
        }
      }
    } catch(error) {
      Utils.alert("Grid/getNivoBase Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setCurrentNivo: function(currentNivo) {
    if (currentNivo !== null) {
      this.currentNivo = currentNivo;
    }
  },
  getCurrentNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    if (this.currentNivo !== undefined && this.currentNivo !== null) {
      result = this.currentNivo;
    }
    return result;
  },
  getLastNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    try {
      var gridView = this.getGridView();
      if (gridView) {
        result = gridView.getLastNivo();
      }
    } catch(error) {
      Utils.alert("Grid/getLastNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRows: function() {
    var result = null;
    try {
      var gridView = this.getGridView();
      if (gridView) {
        result = gridView.getRows();
      }
    } catch(error) {
      Utils.alert("Grid/getRows Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getColumns: function() {
    var result = null;
    try {
      var gridView = this.getGridView();
      if (gridView) {
        result = gridView.getColumns();
      }
    } catch(error) {
      Utils.alert("Grid/getColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNbrOfRows: function() {
    //var result = GridView.DEFAULT_ROWS;
    var result = RelationsGridMediator.PAGE_SIZE_MAX;
    // try {
    // /*if (this.gridView) {
    //     result = this.gridView.getNbrOfRows();
    //   }*/
    // } catch(error) {
    //   Utils.alert("Grid/getNbrOfRows Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    // } finally {
      return result;
    // }
  },
  getNbrOfColumns: function() {
    var result = GridView.DEFAULT_COLUMNS;
    try {
      var gridView = this.getGridView();
      if (gridView) {
        result = gridView.getColumns().length;
      }
    } catch(error) {
      Utils.alert("Grid/getNbrOfColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getColumnByIndex: function(index) {
    var _index = (index !== undefined && index !== null)?index:Position.COLUMN_FIRST();
    var result = null;
    try {
      var gridView = this.getGridView();
      if (gridView) {
        result = gridView.getColumn(_index);
      }
    } catch(error) {
      Utils.alert("Grid/getColumnByIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setDefaultCellWidth: function(defaultCellWidth) {
    if (defaultCellWidth !== null) {
      this.defaultCellWidth = defaultCellWidth;
    }
    return this;
  },
  getDefaultCellWidth: function() {
    return this.defaultCellWidth;
  },
  setMinimumCellWidth: function(minimumCellWidth) {
    if (minimumCellWidth !== null) {
      this.minimumCellWidth = minimumCellWidth;
    }
    return this;
  },
  getMinimumCellWidth: function() {
    return this.minimumCellWidth;
  },
  setRootCellWidth: function(rootCellWidth) {
    if (rootCellWidth !== null) {
      this.rootCellWidth = rootCellWidth;
    }
  },
  getRootCellWidth: function() {
    return this.rootCellWidth;
  },
  setLastCellWidth: function(lastCellWidth) {
    if (lastCellWidth !== null) {
      this.lastCellWidth = lastCellWidth;
    }
  },
  getLastCellWidth: function() {
    return this.lastCellWidth;
  },
  setRoot: function(root) {
    var result = false;
    try {
      if (root) {
        var rootRelation = root.getRelation();
        if (rootRelation) {
          var rootEntity = null;
          /*var rootEntityVO = this.getEntityProxy().getById(rootRelation.getCei());
          //if (this instanceof ModelGrid) {
          if (rootEntityVO instanceof ModelEntityVO) {
            rootEntity = new ModelEntity(rootEntityVO);
          } else {
            rootEntity = new DataEntity(rootEntityVO);
          }*/
          var rootEntity = rootRelation.getChildEntity();
          if (rootEntity) {
            var gridView = this.getGridView();
            if (gridView) {
              this.clear();
              this.root = root;
              this.init();
              result = true;
            }
          }
        }
      }
    } catch(error) {
      alert("Grid/setRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRoot: function() {
    var result = null;
    try {
      var root = this.root;
      if (root) {
        var column = new GridColumn(Position.NIVO_ROOT(),this,root);
        if (column) {
          column.setRoot(root);
          root.setGridColumn(column);
          root.setPosition(new Position(Position.ROW_ROOT(),Position.COLUMN_ROOT()));
          result = root;
        }
      }
    } catch(error) {
      Utils.alert("Grid/getRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setRootCommand: function(rootCommand) {
    if (rootCommand) {
      this.rootCommand = rootCommand;
    }
  },
  getRootCommand: function() {
    var result = null;
    if (this.rootCommand !== undefined) {
      result = this.rootCommand;
    }
    return result;
  },
/*
  getRootCell: function() {
    var result = null;
    try {
      if (this.root !== undefined && this.root !== null) {
        result = this.root;
      }
    } catch(error) {
      Utils.alert("Grid/getRootCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
*/
  getRootRelation: function() {
    var result = null;
    try {
      var root = this.getRoot();
      if (root) {
        result = root.getRelation();
      }
    } catch(error) {
      Utils.alert("Grid/getRootRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRootEntity: function() {
    var result = null;
    try {
      var rootRelation = this.getRootRelation();
      if (rootRelation) {       
        /*var rootEntityVO = this.getEntityProxy().getById(rootRelation.getCei());
        if (this instanceof ModelGrid) {
          result = new ModelEntity(rootEntityVO);
        } else {
          result = new DataEntity(rootEntityVO);
        }*/
        var result = rootRelation.getChildEntity();
      }
    } catch(error) {
      Utils.alert("Grid/getRootEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getColumnByNivo: function(nivo) {
    var result = null;
    try {
      //REFACTOR !!! COMPLETE REVIEW !!! NOK !!! NOK !!! NOK !!! *** ROOT/COLUMN *** !!!
      var index = Math.abs(nivo); //(Math.abs(nivo) - 1);
      var savedCell = (index == 1)?this.root:null;
      if (nivo == Position.NIVO_ROOT()) {
        var root = this.getRoot();
        if (root) {
          result = root.getGridColumn();
        } else {
          //!!! FOR SPECIAL CASE ???
          result = new GridColumn(nivo,this,null);  
        }
      } else if (nivo < Position.NIVO_ROOT()) {
        result = this.whereUsed[index];
        if ((result === undefined) || (result === null)) {
          if (index < Math.abs(Position.WHERE_MAX())) {
            result = new GridColumn(nivo,this,savedCell);
            this.whereUsed[index] = result;
          }
        }
      } else if (nivo > Position.NIVO_ROOT()) {
        result = this.whatUsed[index];
        if ((result === undefined) || (result === null)) {
          if (index < Position.WHAT_MAX()) {
            result = new GridColumn(nivo,this,savedCell);
            this.whatUsed[index] = result;
          }
        }
      }
    } catch(error) {
      alert("Grid/getColumnByNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  /*/////////////////////////////////////////////////
    IS THIS NEEDED --- FOR INSERTING OF A COLUMN ???
    /////////////////////////////////////////////////
  setColumn: function(column) {
    try {
      if (column) {
        var nivo = column.getNivo();
        var index = (Math.abs(nivo) - 1);
        var howMany = 1;
        if (nivo < Position.NIVO_ROOT()) {
          this.setWhereUsedNivo(nivo);
          if (index < this.whereUsed.length) {
            howMany = (this.whereUsed.length - index);
            this.whereUsed.splice(index,howMany,column);
          } else {
            this.whereUsed.push(column);
          }
        } else if (nivo > Position.NIVO_ROOT()) {
          this.setWhatUsedNivo(nivo);
          if (index < this.whatUsed.length) {
            howMany = (this.whatUsed.length - index);
            this.whatUsed.splice(index,howMany,column);
          } else {
            this.whatUsed.push(column);
          }
        }  
      }
    } catch(error) {
      Utils.alert("Grid/setColumn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  */
  //Functions
  home: function() {
    var result = false;
    try {
      var nivo = this.getWhereUsedNivo();
      this.setCurrentNivo(nivo);
      var column = this.getColumnByNivo(nivo);
      if (column) {
        result = true;
        var position = this.getPosition();
        if (position) {
          var rowNumber = Position.ROW_TOP();
          var savedCell = column.getSavedCell();
          if (savedCell) {
            var p = savedCell.getPosition();
            if (p) {
              rowNumber = p.getRow();
            }  
          }
          position.setRow(rowNumber);
        }
      }
    } catch(error) {
      Utils.alert("Grid/home Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  end: function() {
    var result = false;
    try {
      var nivo = this.getWhatUsedNivo();
      this.setCurrentNivo(nivo);
      var column = this.getColumnByNivo(nivo);
      if (column) {
        result = true;
        var position = this.getPosition();
        if (position) {
          var rowNumber = Position.ROW_TOP();
          var savedCell = column.getSavedCell();
          if (savedCell) {
            var p = savedCell.getPosition();
            if (p) {
              rowNumber = p.getRow();
            }  
          }
          position.setRow(rowNumber);
        }
      }
    } catch(error) {
      Utils.alert("Grid/end Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setParentAndChild: function(cell) {
    try {
      if (cell) {
        this.setParentCell(cell);
        if (cell.getNivo() == Position.NIVO_ROOT()) {
          this.setChildCell(cell.getChild());
        } else {
          this.setChildCell(cell);        
        }
      }
    } catch(error) {
      Utils.alert("Grid/setParentAndChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  init: function() {
    var gridView = this.getGridView();
    var gridWhere = null;
    var gridWhat = null;
    var nivo = Position.NIVO_ROOT();
    try {
      var rr = null;
      //ROOT - NOT SET - ONLY AT GET !!!
      var root = this.getRoot();
      if (root) {
        rr = root.getRelation();
        if (rr) {
          //Where-used columns
          if (rr.hasParentRelations() === true) {
            nivo = Position.NIVO_ROOT() - 1;
            gridWhere = this.getColumnByNivo(nivo);
          }
          //What-used columns
          if (rr.hasChildRelations() === true) {
            nivo = Position.NIVO_ROOT() + 1;
            gridWhat = this.getColumnByNivo(nivo);
          }
        }   
      }
      this.setNivo(Position.NIVO_ROOT());
    } catch(error) {
      alert("Grid/init Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Set position to ROOT or to First Child (What-Used).
      //this.setFocusOnRootOrWhat();
      return this;
    }
  },
  clear: function() {
    try {
      //GridView
      this.setGridView(null);
    //this.setStatusMessage(null);
      //Mode: DISPLAY
      this.setMode(Grid.MODE_DISPLAY);
    /*//ParentCell
      this.setParentCell(null);
      //ChildCell
      this.setChildCell(null);*/
      //Filtered Entities!
      this.filteredEntities = [];
      //Where-used columns
      this.whereUsed = [];
      this.setWhereUsedNivo(null); //-1); //Position.NIVO_ROOT(); //TODO: 0 -> -1,-2,-3 ???
      //ROOT
      this.root = null;
      //What-used columns
      this.whatUsed = [];
      this.setWhatUsedNivo(null); //1); //Position.NIVO_ROOT(); //TODO: 0 -> 1 ???
      //INITIALIZE ***
      //this.init(); !!! root is NULL !!!
    } catch(error) {
      Utils.alert("Grid/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html === true)?'<br/>':'\n';
    var result = 'Grid:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("Grid/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
Grid.PAGE_SIZE = 10;
Grid.MODE_DISPLAY = "DISPLAY";
Grid.MODE_EDIT = "EDIT";
Grid.MODE_INSERT = "INSERT";
//Grid.WHERE_USED_MAX = -15;
//Grid.WHAT_USED_MAX = 25;
Grid.COLUMN_ID      = "gcolumn";
Grid.COLUMN_WHAT_ID = "gcwhat";
Grid.CELL_ANCHOR_ID = "gca"; //gca<row><column> ex. gca25

//Class: GridCell
var GridCell = new Class({
  Extends: SjamayeeBase,
  
  initialize: function(relation) {
    try {
      this.parent();
      this.clear();
      if (relation !== undefined) {
        this.setRelation(relation);
      }
    } catch(error) {
      Utils.alert("GridCell/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getId: function() {
    var result = null;
    try {
      var relation = this.getRelation();
      if (relation) {
        result = relation.getId();
      }
    } catch(error) {
      Utils.alert("GridCell/getId Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRelation: function() {
    var result = null;
    if (this.relation !== undefined) {
      result = this.relation;
      if (result) {
        result.setGridCell(this);
      }
    }
    return result;
  },
  setRelation: function(relation) {
    if (relation !== undefined) {
      this.relation = relation;
    }
  },
  //Get GRID!
  getGrid: function() {
    var result = null;
    var gridColumn = this.getGridColumn();
    if (gridColumn) {
      result = gridColumn.getGrid();
    }
    return result;
  },
  getGridView: function() {
    var result = null;
    var grid = this.getGrid();
    if (grid) {
      result = grid.getGridView();
    }
    return result;
  },
  getGridColumn: function() {
    var result = null;
    if (this.gridColumn !== undefined) {
      result = this.gridColumn;
    }
    return result;
  },
  setGridColumn: function(gridColumn) {
    if (gridColumn !== undefined) {
      this.gridColumn = gridColumn;
    }
  },
  getColumnNumber: function() {
    var result = Position.COLUMN_FIRST();
    try {
      var gridColumn = this.getGridColumn();
      if (gridColumn) {
        result = gridColumn.getColumnNumber();
      }
    } catch(error) {
      Utils.alert("GridCell/getColumnNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRowNumber: function() {
    var result = Position.ROW_TOP();
    try {
      var position = this.getPosition();
      if (position) {
        result = position.getRow();
      }
    } catch(error) {
      Utils.alert("GridCell/getRowNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  isRoot: function() {
    var result = false;
    try {
      var column = this.getGridColumn();
      if (column) {
        result = (column.getNivo() == Position.NIVO_ROOT());
        if (result === true) {
          result = (this.getValue() !== '');
        }
      }
    } catch(error) {
      Utils.alert("GridCell/isRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getOutputLength: function() {
    var result = GridCell.DEFAULT_OUTPUT_LENGTH;
    if (this.outputLength !== undefined) {
      result = this.outputLength;
    }
    return result;
  },
  setOutputLength: function(outputLength) {
    if (outputLength !== null) {
      this.outputLength = outputLength;
    }
  },
  getFirstParent: function() {
    var result = null;
    if (this.firstParent !== undefined) {
      result = this.firstParent;
    }
    return result;
  },
  setFirstParent: function(firstParent) {
    if (firstParent !== undefined) {
      this.firstParent = firstParent;
    }
  },
  getPreviousParent: function() {
    var result = null;
    if (this.previousParent !== undefined) {
      result = this.previousParent;
    }
    return result;
  },
  setPreviousParent: function(previousParent) {
    if (previousParent !== undefined) {
      this.previousParent = previousParent;
    }
  },
  getNextParent: function() {
    var result = null;
    if (this.nextParent !== undefined) {
      result = this.nextParent;
    }
    return result;
  },
  setNextParent: function(nextParent) {
    if (nextParent !== undefined) {
      this.nextParent = nextParent;
    }
  },
  getPosition: function() {
    var result = null;
    if (this.position !== undefined) {
      result = this.position;
    }
    return result;
  },
  setPosition: function(position) {
    if (position !== undefined) {
      this.position = position;
    }
  },
  /*
  getFontWeight: function() {
    var result = FontStyle.FONT_WEIGHT_NORMAL;
    if (this.isRoot() === true) {
      result = FontStyle.FONT_WEIGHT_BOLD;
    }
    if (this.fontWeight !== undefined && this.fontWeight !== null) {
      result = this.fontWeight;
    }
    return result;
  },
  */
  setFontWeight: function(fontWeight) {
    if (fontWeight !== null) {
      this.fontWeight = fontWeight;
    }
  },
  getNivo: function() {
    var result = Position.NIVO_ROOT();
    try {
      var column = this.getGridColumn();
      if (column) {
        result = column.getNivo();
      }
    } catch(error) {
      Utils.alert("GridCell/getNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  //Functions
  clone: function() {
    var result = null;
    try {
      result = new GridCell(this.getRelation());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key in properties) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("GridCell/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  touch: function(selected) {
    var _selected = (selected !== undefined && selected !== null)?selected:false;
    try {
      var position = this.getPosition();
      var r = position.getRow();
      var c = position.getColumn();
      var cellId = Grid.COLUMN_ID+'c'+c+r;
      if (c >= GridColumn.COLUMN_5) {             //TODO: OKE ????????????????
        c = GridColumn.COLUMN_9;
        cellId = Grid.COLUMN_WHAT_ID+'c'+c+r;
      }
    //document.getElementById(cellId).innerHTML = GridCell.buildContentHtml(c,r,this);
    //document.getElementById(cellId).innerHTML = this.buildContentHtml();                 <<<<<<<< OK
    } catch(error) {
      Utils.alert("GridCell/touch Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  clear: function() {
    try {
      this.setRelation(null);
      this.setOutputLength(GridCell.DEFAULT_OUTPUT_LENGTH);
      this.setFirstParent(null);
      this.setPreviousParent(null);
      this.setNextParent(null);
      this.setFontWeight(FontStyle.FONT_WEIGHT_NORMAL);
    } catch(error) {
      Utils.alert("GridCell/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  getParent: function() {
    var result = null;
    try {
      if (this.getNivo() > Position.NIVO_ROOT()) {
        var column = this.getGridColumn();
        if (column) {
          result = column.getMaster();
        }
      }
    } catch(error) {
      Utils.alert("GridCell/getParent Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getChild: function() {
    //***********************************************************//
    // WHERE-USED : child = masterCell/savedCell of rightColumn. //
    // ROOT +                                                    //
    // WHAT-USED  : child = firstCell/savedCell of rightColumn.  //
    //***********************************************************//
    var result = null;
    try {
      var column = null;
      var nivo = this.getNivo();
      if (nivo < Position.NIVO_ROOT()) {
        column = this.getGridColumn();
        if (column) {
          result = column.getMaster();
        }
      } else {
        nivo = nivo + 1;
        var grid = this.getGrid();
        if (grid) {
          column = grid.getColumnByNivo(nivo);
          if (column) {
            result = column.getMaster();
          }
        }
      }
    } catch(error) {
      Utils.alert("GridCell/getChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getValue: function(focused) {
    var _focused = (focused !== undefined && focused !== null)?focused:false;
    var result = '';
    //var dot = '<b><font color="'+ApplicationFacade.COLOR_DOT+'">&middot;</font></b>';
    //var dot_root = '<b><font color="'+ApplicationFacade.COLOR_DOT_ROOT+'">&middot;</font></b>';
    //var dot_root_focused = '<b><font color="'+ApplicationFacade.COLOR_DOT_ROOT_FOCUSED+'">&middot;</font></b>';
    var dot = '<b>&middot;</b>';
    var dot_root = '<b>&middot;</b>';
    var dot_root_focused = '<b>&middot;</b>';
    try {
      var entity = null;
      var relation = this.getRelation();
      if (relation) {
        var instantModelEntity = null;
        var headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
        if (headerMediator) {
          var typeSelected = headerMediator.getTypeSelected();
          if (typeSelected) {
            var modelEntity = ModelEntity.getById(typeSelected.getMei());
            if (modelEntity) {
              instantModelEntity = modelEntity;
            }
          }
        }
        var nivo = this.getNivo();
        if (nivo < Position.NIVO_ROOT()) {
          entity = relation.getParentEntity();
          if (entity) {
            result = entity.getName();
            if (entity instanceof DataEntity) {
              if (nivo == (Position.NIVO_ROOT() - 1)) {
                ////////////////////////////////////////////////////////////////////////////
                //For MULTITYPED BASE ROOT display NAME+TYPE in first column
                //TODO: ONLY FOR THE ANCESTOR REFERENCES - NOT FOR THE NORMAL REFERENCES !!!
                ////////////////////////////////////////////////////////////////////////////
                var grid = this.getGrid();
                if (grid) {
                  //var modelRelation = relation.getModelRelation();
                  //ATT: rootModelRelation of virtual relations is NULL !!!
                  var typeName = null;
                  var parentModelEntity = relation.getParentModelEntity();
                  if (parentModelEntity) {
                    if (parentModelEntity.getCode() !== null) {
                      typeName = parentModelEntity.getCode();
                    }
                  }
                  /*if (typeName === null) {
                    var modelRelation = relation.getModelRelation();
                    if (modelRelation) {
                      var modelParentEntity = modelRelation.getParentEntity();
                      if (modelParentEntity) {
                        if (modelParentEntity.getCode() !== null) {
                          typeName = modelParentEntity.getCode();
                        }
                      }
                    }
                  }*/
                  if (typeName === null) {
                    if (entity.getModelType()) {
                      typeName = entity.getModelType().getCode();
                    }
                  }
                  result = entity.getName()+dot+typeName;
                  if (relation.getPei() === relation.getCei() &&
                      relation.getParentModelEntity().getId() === relation.getChildModelEntity().getId()) {
                    result = "***RECURSIVE***";
                  }
                }
              }
            }
          }
        } else {
          entity = relation.getChildEntity();
          if (entity) {
            var typeName = null; //(entity instanceof DataEntity)?entity.getModelType().getCode():entity.getType().getCode();
            if (nivo == Position.NIVO_ROOT()) {
              if (entity instanceof ModelEntity) {
                typeName = entity.getType().getCode();
              } else {
                typeName = null;
                //TODO:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //      - isSingleType()
                //      - this block 
                //      - switchEntity()
                //      - check CMS.PROJ(2011-03-10/2011-03-21), CMS.ITPR(2011-03-15/2011-03-21)
                //      - PSDT(2011-03-15) > CMS.ITPR
                
                //      - PROJ > CMS.PROJ,CMS.ITPR,BH.FPRO,BH.ITPR,<7>.PROJ !!! ALL MISSING !!!
                
                //      - CMS.ITPR has children from CMS.PRO + CMS.ITPR !!!
                //      - CMS is NOT marked as MULTITYPE (CMS.PROJ,CMS.ITPR) !!!
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!              
                //IS THIS BLOCK SPECIAL in <, ==, > ???
                //2011-03-15 > PSDT - CMS.ITPR
                //2011-03-15 > PEDT - 3 (BH.FPRO,NGCS.PROJ,WTK.PROJ)
                //2011-03-15 > CDAT - PEDT (PSDT is missing !!!)
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                /*var instantModelEntity = null;
                var headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
                if (headerMediator) {
                  var typeSelected = headerMediator.getTypeSelected();
                  if (typeSelected) {
                    var modelEntity = ModelEntity.getById(typeSelected.getMei());
                    if (modelEntity) {
                      instantModelEntity = modelEntity;
                    }
                  }
                }
                if (instantModelEntity === null) {*/
                  
                rootModelEntity = instantModelEntity;
                if (rootModelEntity === null) {
                  //SingleType / SpecialType / ALL,BaseType(ex. CDAT,PROJ): null
                  if (entity.isSingleType()) {
                    //instantModelEntity = entity.getInstantModelEntity(relation,RelationB.CHILD);
                    rootModelEntity = relation.getChildModelEntity();
                    if (rootModelEntity === null) {
                      rootModelEntity = entity.getModelEntity();
                    }
                  }
                }
                if (rootModelEntity) {
                  if (rootModelEntity.getCode() !== null) {
                    typeName = rootModelEntity.getCode();
                  }
                }
                if (typeName === null) {
                  if (entity.getModelType()) {
                    typeName = entity.getModelType().getCode();
                  }
                }
              }
            } else if (nivo > Position.NIVO_ROOT()) {
              if (entity instanceof ModelEntity) {
                typeName = entity.getType().getCode();
              } else {
                typeName = null;
                var childModelEntity = relation.getChildModelEntity();
                if (childModelEntity) {
                  if (childModelEntity.getCode() !== null) {
                    typeName = childModelEntity.getCode();
                  }
                }
                /*if (typeName === null) {
                  var modelRelation = relation.getModelRelation();
                  if (modelRelation) {
                    var modelChildEntity = modelRelation.getChildEntity();
                    if (modelChildEntity) {
                      if (modelChildEntity.getCode() !== null) {
                        typeName = modelChildEntity.getCode();
                      }
                    }
                  }
                }*/
                if (typeName === null) {
                  if (entity.getModelType()) {
                    typeName = entity.getModelType().getCode();
                  }
                }
              }
            }                               
            result = entity.getName();
            if (nivo == Position.NIVO_ROOT()) {
              result += (_focused === true)?dot_root_focused:dot_root;
              if (typeName) { result += typeName; }
            }
            if (nivo > Position.NIVO_ROOT() && nivo >= this.getCurrentNivo()) {
              dot = '<b><font color="red">&middot;</font></b>';
              if (relation instanceof ModelRelation) {
                //result = relation.getName()+dot+typeName+dot+entity.getDesc()+dot+entity.getId()+dot+relation.getId()+
                //         dot+relation.getPei()+dot+relation.getCei()+dot+relation.getPid()+dot+relation.getNid();
                result = relation.getName();
                if (typeName) { result += dot+typeName; }
                //result += dot+entity.getDesc()+dot+entity.getId()+dot+relation.getId()+
                //          dot+relation.getPei()+dot+relation.getCei()+dot+relation.getPid()+dot+relation.getNid();
                var entityDesc = entity.getDesc();
                if (entityDesc === null || entityDesc.length === 0) { entityDesc = "Model Entity Description is not defined!"; }
                result += dot+entityDesc;
              } else {
                if (typeName) { result += dot+typeName; }
                //result += dot+entity.getDesc()+dot+entity.getId()+dot+relation.getId()+
                //          dot+relation.getPei()+dot+relation.getCei()+dot+relation.getPid()+dot+relation.getNid();
                var entityDesc = entity.getDesc();
                if (entityDesc === null || entityDesc.length === 0) { entityDesc = "Data Entity Description is not defined!"; }
                result += dot+entityDesc;
                if (relation.getPei() === relation.getCei() &&
                    relation.getParentModelEntity().getId() === relation.getChildModelEntity().getId()) {
                  result = "***RECURSIVE***";
                }
              }
            }
          }  
        }
      }
    } catch(error) {
      alert("GridCell/getValue Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getImageHtml: function(size,style) {
    var result = null;
    try {
      var entity = null;
      var relation = this.getRelation();
      if (relation) {
        var nivo = this.getNivo();
        if (nivo < Position.NIVO_ROOT()) {
          entity = relation.getParentEntity();
        } else {
          entity = relation.getChildEntity();
        }
        if (entity) {
          result = entity.getImageHtml(size,style);
        }
      }
    } catch(error) {
      Utils.alert("GridCell/getImageHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getValueHtml: function(focused) {
    var _focused = (focused !== undefined && focused !== null)?focused:false;
    var result = null;
    try {
      var lineColor = "inherit";
      var cellSelected = this.isSelected();
    //var cellValue = this.getValue(cellSelected);
      var cellValue = this.getValue(_focused);
      var cellStyle = FontStyle.normal(this); //,cellSelected,nivo);
      if (cellSelected === true) {
        cellStyle = FontStyle.focused(this); //,cellSelected,nivo);       
      }
      var row = this.getRowNumber();
      var column = this.getColumnNumber();
      var cellStatus = this.getStatus();
      if (cellStatus === null) {
        cellStatus = '&nbsp;';
      }
      var cellClass = GridCell.CLASS_ID;
      var cellContentClass = GridCell.CONTENT_CLASS_ID;
      cellStyle += "vertical-align:top;"; //middle;";   
    //result = '<a id="'+Grid.CELL_ANCHOR_ID+row+column+'" style="'+cellStyle+'position:relative;left:2px;" class="'+cellContentClass+'"'+
      result = '<a id="'+Grid.CELL_ANCHOR_ID+column+row+'" style="'+cellStyle+'position:relative;left:0px;" class="'+cellContentClass+'"'+
    //         '   href="#" tabindex="-1" onclick="_grid.clickOnCell(event,'+row+','+column+');">'+cellValue+'</a>';
               '   href="#" tabindex="-1">'+cellValue+'</a>';
    } catch(error) {
      Utils.alert("GridCell/getValueHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
    //return '<a href="#" tabindex="-1">'+cellValue+'</a>'; //result;
    //return '<a href="#">'+cellValue+'</a>'; //result;
      return cellValue; //result;
    }
  },
  getValueTranslated: function() {
    var result = this.getValue();
    if (result !== null && result != '&nbsp;') {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  getStatus: function() {
    var result = null;
    try {
      //Get the status of the relation in the commandBuffer.
      var relation = this.getRelation();
      if (relation) {
        var nivo = this.getNivo();
      //if ((nivo >= Position.NIVO_ROOT()) &&
      //    (nivo >= this.getCurrentNivo())) {
        if (nivo >= Position.NIVO_ROOT()) {
          var commandBuffer = _rf.getCommandBuffer();
          if (commandBuffer) {
            result = commandBuffer.checkRelation(relation.getId(),nivo);
          }  
        }
      }
    } catch(error) {
      Utils.alert("GridCell/getStatus Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
    /*if (!result) {
        result = '&nbsp;';
      }*/
      return result;
    }
  },
  getActualPosition: function() {
    var result = null;
    try {
      var column = this.getGridColumn();
      if (column) {
        result = column.getActualPosition(this);
      }
    } catch(error) {
      Utils.alert("GridCell/getActualPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getCurrentNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    try {
      var gridColumn = this.getGridColumn();
      if (gridColumn) {
        result = gridColumn.getCurrentNivo();
      }
    } catch(error) {
      Utils.alert("GridCell/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  isFirstParent: function() {
    return (this.getFirstParent() === null);
  },
  hasPrevious: function() {
    var result = false;
    try {
      var nivo = this.getNivo();
      var sort = Cache.SORT_ASCENDING;
      var column = this.getGridColumn();
      if (column) {
        sort = column.getSort();
      }
      if (nivo != Position.NIVO_ROOT()) {
        if (nivo < Position.NIVO_ROOT()) {
          if (sort == Cache.SORT_ASCENDING) {
            result = (this.getPreviousParent() !== null);
          } else {
            result = (this.getNextParent() !== null);
          }
        } else {
          if (sort == Cache.SORT_ASCENDING) {
            result = (this.getPreviousChild() !== null);
          } else {
            result = (this.getNextChild() !== null);
          }
        //result = true;
        }
      }
    } catch(error) {
      Utils.alert("GridCell/hasPrevious Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  hasNext: function() {
    var result = false;
    try {
      var nivo = this.getNivo();
      var sort = Cache.SORT_ASCENDING;
      var column = this.getGridColumn();
      if (column) {
        sort = column.getSort();
      }
      if (nivo != Position.NIVO_ROOT()) {
        if (nivo < Position.NIVO_ROOT()) {
          if (sort == Cache.SORT_ASCENDING) {
            result = (this.getNextParent() !== null);
          } else {
            result = (this.getPreviousParent() !== null);
          }
        } else {
          if (sort == Cache.SORT_ASCENDING) {
            result = (this.getNextChild() !== null);
          } else {
            result = (this.getPreviousChild() !== null);
          }
        //result = true;
        }
      }
    } catch(error) {
      Utils.alert("GridCell/hasNext Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousChild: function() {
    var result = null;
    try {
      var previousRelation = null;
      var relation = this.getRelation();
      if (relation) {
        previousRelation = relation.getPrevious();
        if (previousRelation) {
          result = new GridCell(previousRelation);
        }
      }
    } catch(error) {
      Utils.alert("GridCell/getPreviousChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextChild: function() {
    var result = null;
    try {
      var nextRelation = null;
      var relation = this.getRelation();
      if (relation) {
        nextRelation = relation.getNext();
        if (nextRelation) {
          result = new GridCell(nextRelation);
        }
      }
    } catch(error) {
      Utils.alert("GridCell/getNextChild Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getParentCells: function(number,sort) {
    var result = [];
    try {
      var relation = this.getRelation();
      if (relation) {
        var entityProxy = this.getGrid().getEntityProxy();
        var relationProxy = this.getGrid().getRelationProxy();
        var relations = null;
        var modelEntity = null;
        var entity = null;
        var instantModelEntity = null;
        var nivo = this.getNivo(); //null;
        if (this.getNivo() == Position.NIVO_ROOT()) {
          entity = relation.getChildEntity();
          if (entity && entity instanceof DataEntity) {
            instantModelEntity = relation.getChildModelEntity();
          }                 
        //TODO: VERIFY THIS !!! ALWAYS PROBLEMS !!! FROM ROOT TO - 1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
        } else if (this.getNivo() == (Position.NIVO_ROOT() - 1)) {
          entity = relation.getChildEntity();
          if (entity && entity instanceof DataEntity) {
            instantModelEntity = relation.getChildModelEntity();
          }                 
        } else {
          entity = relation.getParentEntity();
          if (entity && entity instanceof DataEntity) {
            instantModelEntity = relation.getParentModelEntity();
          }                 
        }
        /*if (entity && entity instanceof DataEntity) {
          //SingleType / SpecialType / ALL,BaseType(ex. CDAT,PROJ): null
          if (entity.isSingleType()) {
            instantModelEntity = entity.getInstantModelEntity(relation.getRelationVO());
            if (instantModelEntity === null) {
              instantModelEntity = entity.getModelEntity();
            }
          }
        }*/
        if (instantModelEntity === null) {
          var headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
          if (headerMediator) {
            var typeSelected = headerMediator.getTypeSelected();
            if (typeSelected) {
              var modelEntity = ModelEntity.getById(typeSelected.getMei());
              if (modelEntity) {
                instantModelEntity = modelEntity;
              }
            }
          }
        }        
        relations = relationProxy.getParentRelations(entity.getId(),number,sort,instantModelEntity,nivo);
        //Link parents previous/next.
        var previousParent = null;
        var nextParent = null;
        if (relations) {
          for (var i = 0; i < relations.length; i++) {
            var r1 = relations[i];
            if (r1) {
              var c1 = new GridCell(r1);
              if (c1) {
                if (sort == Cache.SORT_ASCENDING) {
                  if (previousParent) {
                    previousParent.setNextParent(c1);
                  }  
                  c1.setPreviousParent(previousParent);
                  previousParent = c1;
                  result.push(previousParent);
                } else {
                  if (nextParent) {
                    nextParent.setPreviousParent(c1);
                  }  
                  c1.setNextParent(nextParent);
                  nextParent = c1;
                  result.push(nextParent);
                }
              }
            }
          }
        }
      }
    } catch(error) {
      alert("GridCell/getParentCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousParentCells: function(number,sort) {
    var result = [];
    try {
      var n = number;
      if ((n === undefined) || (n === null)) {
        n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
      }
      var cell = this;
      while (cell) {
        if (n <= 0) { break; }
        cell = cell.getPreviousParent();
        if (cell === null) { break; }
        if (sort == Cache.SORT_ASCENDING) {
          result.splice(0,0,cell);
        } else {
          result.push(cell);
        }
        n--;
      }
    } catch(error) {
      Utils.alert("GridCell/getPreviousParentCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextParentCells: function(number,sort) {
    var result = [];
    try {
      var n = number;
      if ((n === undefined) || (n === null)) {
        n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
      }
      var cell = this;
      while (cell) {
        if (n <= 0) { break; }
        cell = cell.getNextParent();
        if (cell === null) { break; }
        if (sort == Cache.SORT_ASCENDING) {
          result.push(cell);
        } else {
          result.splice(0,0,cell);
        }
        n--;
      }
    } catch(error) {
      Utils.alert("GridCell/getNextParentCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getChildCells: function(number,sort) {
    var result = [];
    try {
      var relation = this.getRelation();
      if (relation) {
        var relationProxy = this.getGrid().getRelationProxy();
        var instantModelEntity = null;
        var nivo = this.getNivo(); //null;
        var entity = relation.getChildEntity();
        if (entity && entity instanceof DataEntity) {
          //SingleType / SpecialType / ALL,BaseType(ex. CDAT,PROJ): null
          /*if (entity.isSingleType()) {
            instantModelEntity = entity.getInstantModelEntity(relation.getRelationVO());
            **if (instantModelEntity === null) {
              instantModelEntity = entity.getModelEntity();
            }**
          }*/
          instantModelEntity = relation.getChildModelEntity();
        }
        if (instantModelEntity === null) {
          var headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
          if (headerMediator) {
            var typeSelected = headerMediator.getTypeSelected();
            if (typeSelected) {
              var modelEntity = ModelEntity.getById(typeSelected.getMei());
              if (modelEntity) {
                instantModelEntity = modelEntity;
              }
            }
          }
        }
        var relations = relationProxy.getChildRelations(relation.getCei(),number,sort,instantModelEntity,nivo);
        if (relations) {
          for (var i = 0; i < relations.length; i++) {
            var r1 = relations[i];
            if (r1) {
              var c1 = new GridCell(r1);
              if (c1) {
                result.push(c1);
              }
            }
          }
        }       
      }
    } catch(error) {
      alert("GridCell/getChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousChildCells: function(number,sort) {
    var result = [];
    try {
      var n = number;
      if ((n === undefined) || (n === null)) {
        n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
      }
      var cell = this;
      while (cell) {
        if (n <= 0) { break; }
        cell = cell.getPreviousChild();
        if (cell === null) { break; }
        if (sort == Cache.SORT_ASCENDING) {
          result.splice(0,0,cell);
        } else {
          result.push(cell);
        }
        n--;
      }
    } catch(error) {
      Utils.alert("GridCell/getPreviousChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextChildCells: function(number,sort) {
    var result = [];
    try {
      var n = number;
      if ((n === undefined) || (n === null)) {
        n = (this.getGrid().getNbrOfRows()*ApplicationFacade.PAGE_MULTIPLIER);
      }
      var cell = this;
      while (cell) {
        if (n <= 0) { break; }
        cell = cell.getNextChild();
        if (cell === null) { break; }
        if (sort == Cache.SORT_ASCENDING) {
          result.push(cell);
        } else {
          result.splice(0,0,cell);
        }
        n--;
      }
    } catch(error) {
      Utils.alert("GridCell/getNextChildCells Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
/*
  buildHtml: function(gridColumn,row,what) {
    var _row = (row !== undefined && row !== null)?row:Position.ROW_TOP();
    var _what = (what !== undefined && what !== null)?what:false;
    var result = '';
    try {
      if (gridColumn !== undefined && gridColumn !== null) {
        var nivo = Position.NIVO_ROOT();
        var relation = this.getRelation();
        if (relation) { nivo = this.getNivo(); }        
        var columnNumber = gridColumn.getColumnNumber();
        var cellId = Grid.COLUMN_ID+'c'+columnNumber+_row;
        //if (columnNumber == GridColumn.COLUMN_9) {
        if (_what === true) {
          cellId = Grid.COLUMN_WHAT_ID+'c0'+_row;
        }
        var cellClass = GridCell.CLASS_ID+" "+GridCell.WHAT_USED_LEFT_CLASS_ID;
        if ((columnNumber == GridColumn.COLUMN_9) || (columnNumber == Position.COLUMN_FIRST())) {
          cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHAT_USED_LEFT_FIRST_CLASS_ID;
        }     
        if (nivo == Position.NIVO_ROOT()) {
          cellClass = GridCell.CLASS_ID+" "+GridCell.ROOT_CLASS_ID;
          if (columnNumber == Position.COLUMN_FIRST()) {
            cellClass = GridCell.CLASS_ID; //+" "+GridCell.ROOT_FIRST_CLASS_ID;
          }
        } else if (nivo < Position.NIVO_ROOT()) {
          cellClass = GridCell.CLASS_ID+" "+GridCell.WHERE_USED_CLASS_ID;
          if (columnNumber == Position.COLUMN_FIRST()) {
            cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHERE_USED_FIRST_CLASS_ID;
          }
        }
        if (_what === true) {
          var cellClass = GridCell.CLASS_ID+" "+GridCell.WHAT_USED_CLASS_ID;
        }     
        var cellStyle = 'style="width:100%;height:17px;"';
        if (_row == Position.ROW_TOP()) {
          cellStyle = 'style="width:100%;height:17px;border-top:none;"';
        }
        var value = 'x'+columnNumber+_row;
        result = '<div id="'+cellId+'" '+cellStyle+'>'+value+'</div>';
        //if (_row == 0) { alert("GridCell/buildHtml - result: "+result) }
        
      //result = '<div id="'+cellId+'" '+cellStyle+'>&nbsp;</div>';
      //result = '<div id="'+cellId+'" class="'+cellClass+'" '+cellStyle+'>&nbsp;</div>';
      //result = '<div id="'+cellId+'" class="'+cellClass+'" '+cellStyle+'>'+this.buildContentHtml(columnNumber,_row)+'</div>';
      }
    } catch(error) {
      Utils.alert("GridCell/buildHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  buildContentHtml: function(columnNumber,row) {
    var _cnr = (columnNumber !== undefined && columnNumber !== null)?columnNumber:null;
    var _rnr = (row !== undefined && row !== null)?row:null;
    var result = '';
    try {
      var _columnNumber = this.getColumnNumber();
      if (_cnr) {
        _columnNumber = _cnr;
      }
      var _row = this.getRowNumber();
      if (_rnr) {
        _row = _rnr;
      }
      var column = (Position.COLUMN_ROOT() + 1);
      switch (_columnNumber) {
        case GridColumn.COLUMN_1:
          column = Position.COLUMN_FIRST();
          break;
        case GridColumn.COLUMN_2:
          column = (Position.COLUMN_FIRST() + 1);
          break;
        case GridColumn.COLUMN_3:
          column = (Position.COLUMN_FIRST() + 2);
          break;
        case GridColumn.COLUMN_4:
          column = (Position.COLUMN_FIRST() + 3);
          break;
        case GridColumn.COLUMN_5:
          column = (Position.COLUMN_FIRST() + 4);
          break;
        case GridColumn.COLUMN_6:
          column = (Position.COLUMN_FIRST() + 5);
          break;
        case GridColumn.COLUMN_7:
          column = (Position.COLUMN_FIRST() + 6);
          break;
        case GridColumn.COLUMN_8:
          column = Position.COLUMN_LAST();
          break;
        case GridColumn.COLUMN_9:
          column = (Position.COLUMN_ROOT() + 1);
          if (this.getGrid().getCurrentNivo() < Position.NIVO_COLUMN_FIRST()) {
            column = GridColumn.COLUMN_9;
          }
          break;
        default:
          break;
      }
      var nivo = Position.NIVO_ROOT();
      var lineColor = "inherit";
      var cellStyle = null;                           //TODO: cellStyle !!! *** !!!!
      var cellValue = null;
      var cellStatus = null;
      var cellSelected = false;
      var relation = this.getRelation();
      if (relation) {
        nivo = this.getNivo();
        cellStatus = this.getStatus();
        cellSelected = this.isSelected();
        cellValue = this.getValue(cellSelected);
        cellStyle = FontStyle.normal(this); //,cellSelected,nivo);
        if (cellSelected === true) {
          cellStyle = FontStyle.focused(this); //,cellSelected,nivo);       
        }
      } else {
        var emptyColumn = GridColumn.COLUMN_5;
        if (this.getGrid().getCurrentNivo() < Position.NIVO_COLUMN_FIRST()) {
          emptyColumn = GridColumn.COLUMN_9;
        }
        if (this.getGrid().getRoot() && column == emptyColumn && _row == Position.ROW_TOP()) {
          cellStyle = FontStyle.normal(this,true,(Position.NIVO_ROOT() + 1));
        }
      }
      var columnId = Grid.COLUMN_ID;
      if (_columnNumber == GridColumn.COLUMN_9) {
        columnId = Grid.COLUMN_WHAT_ID;
      }
      var cellClass = GridCell.CLASS_ID+" "+GridCell.WHAT_USED_LEFT_CLASS_ID;
      var cellContentClass = GridCell.CONTENT_CLASS_ID+" "+GridCell.CONTENT_WHAT_USED_LEFT_CLASS_ID;
      if ((_columnNumber == GridColumn.COLUMN_9) || (column == Position.COLUMN_FIRST())) {
        cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHAT_USED_LEFT_FIRST_CLASS_ID;
      }     
      if (nivo == Position.NIVO_ROOT()) {
        cellClass = GridCell.CLASS_ID+" "+GridCell.ROOT_CLASS_ID;
        cellContentClass = GridCell.CONTENT_CLASS_ID+" "+GridCell.CONTENT_ROOT_CLASS_ID;      
        if (column == Position.COLUMN_FIRST()) {
          cellClass = GridCell.CLASS_ID; //+" "+GridCell.ROOT_FIRST_CLASS_ID;
        }
      } else if (nivo < Position.NIVO_ROOT()) {
        cellClass = GridCell.CLASS_ID+" "+GridCell.WHERE_USED_CLASS_ID;
        cellContentClass = GridCell.CONTENT_CLASS_ID+" "+GridCell.CONTENT_WHERE_USED_CLASS_ID;      
        if (column == Position.COLUMN_FIRST()) {
          cellClass = GridCell.CLASS_ID; //+" "+GridCell.WHERE_USED_FIRST_CLASS_ID;
        }
      }
      result = '';
**    MOVED TO cell.buildHtml !!!
      if (_row == Position.ROW_TOP()) {
      //result += '<div class="'+cellClass+'" style="border-top:none;'+cellStyle+'" onclick="this.getGrid().clickOnCell(event,'+_row+','+column+');">';
      //result += '<div class="'+cellClass+'" style="border-top:none;'+cellStyle+'">';
        result += '<div class="'+cellClass+'" style="border-top:none;">';
      } else {
      //result += '<div class="'+cellClass+'" style="'+cellStyle+'" onclick="this.getGrid().clickOnCell(event,'+_row+','+column+');">';
      //result += '<div class="'+cellClass+'" style="'+cellStyle+'">';
        result += '<div class="'+cellClass+'">';
      }
**
      result += '<div style="clear:both;text-align:left;position:relative;width:100%;height:100%;background-color:'+lineColor+';">';
      if (cellValue === null) {
        result += '&nbsp;';
      } else {
      //if (_columnNumber == GridColumn.COLUMN_9) {
          if (cellStatus !== null) {
          //result += '<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:'+FontStyle.COLOR_LIGHTGRAY+';text-align:center;">'+cellStatus+'</div>';
            result += '<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:inherit;text-align:center;">'+cellStatus+'</div>';
          } else {
            result += _cell.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;padding:0px 1px 0px 0px;"); //0px 3px 0px 1px;");          
          }
      **} else {
          result += _cell.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;padding:0px 1px 0px 0px;"); //0px 3px 0px 1px;");
        }**
        result += this.getValueHtml();
      }
      //result += '</div></div>'; //1 MOVED TO cell.buildHtml !!!
      result += '</div>';
    } catch(error) {
      Utils.alert("GridCell/buildContentHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
*/
  print: function(i) {
    var result = "";
    try {
      result = "\nGridCell: ";
      if (i !== undefined && i !== null) {
        result += "("+i+"): ";
      }
    //var gridColumn = this.getGridColumn();
      result += '\nnivo: '+this.getNivo();
      result += '\noutputLength: '+this.getOutputLength();
      result += '\nempty: '+this.isEmpty();
      var relation = this.getRelation();
      if (relation) {
        result += relation.print();
      }  
      var firstParent = this.getFirstParent();
      if (firstParent) {
        result += '\nfirstParent: '+this.getFirstParent();
      }
      var previousParent = this.getPreviousParent();
      if (previousParent) {
        result += '\npreviousParent: '+previousParent; //.print();
      }
      var nextParent = this.getNextParent();
      if (nextParent) {
        result += '\nnextParent: '+nextParent; //.print();
      }
    } catch(error) {
      Utils.alert("GridCell/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  //Navigation
  isRoot: function() {
    return (this.getNivo() == Position.NIVO_ROOT());
  },
  isSelected: function() {
    var result = false;
    try {
      if (this.getNivo() != Position.NIVO_ROOT()) {
        var column = this.getGridColumn();
        if (column) {
          if (column.isSelected() === true) {
            var savedLocation = column.getSavedLocation();
            if (savedLocation) {
              result = (this.getId() == savedLocation.getSavedCell().getId());
            }
          }
        }
      }
      //TODO: Temporary solution !!! ==> savedCell & position !!!
      if (this.getGrid().getPosition().isEqual(this.getPosition())) {
        result = true;
      }   
    } catch(error) {
      Utils.alert("GridCell/isSelected Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  isEmpty: function() {
    return (this.getValue() === '');
  },
  navigationUp: function() {
    return this.hasPrevious();
  },
  navigationDown: function() {
    return this.hasNext();
  },
  navigationLeft: function() {
    var result = false;
    try {
      result = (this.getNivo() > Position.NIVO_ROOT());
      if (result === false) {
        var relation = this.getRelation();
        if (relation) {
          if (this.getNivo() == Position.NIVO_ROOT()) {
            var rootEntity = relation.getChildEntity();
            if (rootEntity) {
              result = (RelationB.getFirstParentForEntity(rootEntity) !== null);
            }
          } else {
            if (relation.hasParent() === true) {
              result = (relation.getFirstParentRelation() !== null);            
            }
          }  
        }
      }
    } catch(error) {
      Utils.alert("GridCell/navigationLeft Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  navigationRight: function() {
    var result = false;
    try {
      result = (this.getNivo() < Position.NIVO_ROOT());
      if (result === false) {
        var relation = this.getRelation();
        if (relation) {
          //result = true;
          /*if (relation.hasChild()) {
            result = (relation.getFirstChildRelation() !== null);
          }*/
          if (this.getNivo() == Position.NIVO_ROOT()) {
            var rootEntity = relation.getChildEntity();
            if (rootEntity) {
              result = (RelationB.getFirstChildForEntity(rootEntity) !== null);
            }
          } else {
            if (relation.hasChild() === true) {
              result = (relation.getFirstChildRelation() !== null);           
            }
          }  
        }
      }
    } catch(error) {
      Utils.alert("GridCell/navigationRight Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
GridCell.DEFAULT_OUTPUT_LENGTH = 10;
GridCell.CLASS_ID = "gridCell";
GridCell.FIRST_CLASS_ID = "gridCellFirst";
GridCell.LEFT_CLASS_ID = "gridCellLeft";
//GridCell.WHERE_USED_CLASS_ID = "gridCellWhereUsed";
GridCell.WHERE_USED_FOCUSED_CLASS_ID = "gridCellWhereUsedFocused";
GridCell.WHERE_USED_SELECTED_CLASS_ID = "gridCellWhereUsedSelected";
GridCell.ROOT_CLASS_ID = "gridCellRoot";
GridCell.ROOT_FOCUSED_CLASS_ID = "gridCellRootFocused";
//GridCell.WHAT_USED_CLASS_ID = "gridCellWhatUsed";
//GridCell.WHAT_USED_LEFT_CLASS_ID = "gridCellWhatUsedLeft";
GridCell.WHAT_USED_FOCUSED_CLASS_ID = "gridCellWhatUsedFocused";
GridCell.WHAT_USED_SELECTED_CLASS_ID = "gridCellWhatUsedSelected";
GridCell.CONTENT_CLASS_ID = "gridCellContent";
GridCell.CONTENT_WHERE_USED_CLASS_ID = "gridCellContentWhereUsed";
GridCell.CONTENT_ROOT_CLASS_ID = "gridCellContentRoot";
GridCell.CONTENT_WHAT_USED_CLASS_ID = "gridCellContentWhatUsed";

//Class: GridColumn
var GridColumn = new Class({
  Extends: SjamayeeBase,
  
  initialize: function(nivo,grid,savedCell) {
    var _nivo = (nivo !== undefined && nivo !== null)?nivo:Position.NIVO_ROOT();
    try {
      this.parent();
      this.clear();
      this.setNivo(_nivo);
      this.setGrid(grid);
      if (savedCell !== undefined) {
        this.setSavedCell(savedCell);
      }
    /*if ((nivo == -3) || (nivo == 1)) {
        this.setSortOrder(Cache.SORT_DESCENDING);
      }*/
    } catch(error) {
      Utils.alert("GridColumn/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getNivo: function() {
    var result = Position.NIVO_ROOT();
    if (this.nivo !== undefined) {
      result = this.nivo;
    }
    return result;
  },
  setNivo: function(nivo) {
    if (nivo !== undefined && nivo !== null) {
      this.nivo = nivo;
    }
  },
  //Get GRID!
  getGrid: function() {
    var result = null;
    if (this.grid !== undefined) {
      result = this.grid;
    }
    return result;
  },
  setGrid: function(grid) {
    this.grid = grid;
  },
  getGridView: function() {
    var result = null;
    var grid = this.getGrid();
    if (grid) {
      result = grid.getGridView();
    }
    return result;
  },
  getMaster: function() {
    var result = null;
    var nivo = this.getNivo();
    try {
      if (Math.abs(nivo) == (Position.NIVO_ROOT()+1)) {
        result = this.getGrid().getRoot();
      } else if (Math.abs(nivo) > (Position.NIVO_ROOT()+1)) {
        //Get savedCell from previous column.
        var increment = -1;
        if (nivo > Position.NIVO_ROOT()) {
          increment = 1;
        }
        var previousNivo = (nivo - increment);
        var previousColumn = this.getGrid().getColumnByNivo(previousNivo);
        if (previousColumn) {
          result = previousColumn.getSavedCell();     
        }
      }
    } catch(error) {
      Utils.alert("GridColumn/getMaster Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  isSortDescending: function() {
    return (this.getSortOrder() == Cache.SORT_DESCENDING);
  },
  getSortOrder: function() {
    var result = Cache.SORT_ASCENDING;
    if (this.sortOrder !== undefined && this.sortOrder !== null) {
      result = this.sortOrder;
    }
    return result;
  },
  setSortOrder: function(sortOrder) {
    if (sortOrder !== undefined && sortOrder !== null) {
      this.sortOrder = sortOrder;
    }
  },
  toggleSortOrder: function() {
    var sortOrder = this.getSortOrder();
    try {
      switch (sortOrder) {
        case Cache.SORT_ASCENDING:
          this.setSortOrder(Cache.SORT_DESCENDING);
          break;
        case Cache.SORT_DESCENDING:
          this.setSortOrder(Cache.SORT_ASCENDING);
          break;
        default:
          break;
      }
    } catch(error) {
      Utils.alert("GridColumn/toggleSortOrder Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  getSavedLocation: function() {
    var result = null;
    if (this.savedLocation !== undefined) {
      result = this.savedLocation;
    }
    return result;
  },
  setSavedLocation: function(savedLocation) {
    if (savedLocation !== undefined) {
      this.savedLocation = savedLocation;
    }
  },
  getSavedCell: function() {
    var result = null;
    var savedLocation = this.getSavedLocation();
    if (savedLocation) {
      result = savedLocation.getSavedCell();
    }
    return result;
  },
  ////////////////////////////////////
  // TODO: # cells -> clear column !!!
  ////////////////////////////////////
  setSavedCell: function(savedCell) {
    if (savedCell) {
      savedCell.setGridColumn(this);
      var savedLocation = this.getSavedLocation();
      if (savedLocation === null) {
        savedLocation = new SavedLocation(savedCell, this.getTopCell());
        this.setSavedLocation(savedLocation);
      } else {
        savedLocation.setSavedCell(savedCell);
        savedLocation.setTopCell(this.getTopCell());
      }
    }
    this.load(savedCell);
    
  /*    
      if ((this.getSavedCell() === null) || (this.getSavedCell().getId() != savedCell.getId())) {
        var nivo = this.getNivo();
        if (nivo < Position.NIVO_ROOT()) {
          this.getGrid().updateWhereUsed(this);
        } else if (nivo > Position.NIVO_ROOT()) {
          this.getGrid().updateWhatUsed(this);
        }
      }
    //this.savedCell = GridCell.clone(savedCell);
      this.savedCell = savedCell.clone();
    }
  */
  },
  getTopCell: function() {
    var result = null;
    if (this.topCell !== undefined) {
      result = this.topCell;
    }
    return result;
  },
  setTopCell: function(topCell) {
    if (topCell !== undefined) {
      this.topCell = topCell.clone();
    }
  },
  getColumnNumber: function() {
    var result = Position.COLUMN_FIRST();
    try {
      var gridRange = new GridRange(this.getCurrentNivo());
      if (gridRange) {
        result = gridRange.getColumnNumber(this.getNivo());
      }
    } catch(error) {
      Utils.alert("GridColumn/getColumnNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getSelected: function() {
    var result = this.getSavedCell()?true:false;
    return result;
  },
  isSelected: function() {
    return this.getSelected();
  },
  getSort: function() {
    var result = Cache.SORT_ASCENDING;
    if (this.sort !== undefined && this.sort !== null) {
      result = this.sort;
    }
    return result;
  },
  setSort: function(sort) {
    if (sort !== undefined && sort !== null) {
      this.sort = sort;
    }
  },
  getCellPosition: function() {
    var result = 1;
    if (this.cellPosition !== undefined && this.cellPosition !== null) {
      result = this.cellPosition;
    }
    return result;
  },
  setCellPosition: function(cellPosition) {
    if (cellPosition !== undefined && cellPosition !== null) {
      this.cellPosition = cellPosition;
    }
  },
  isEmpty: function() {
    return (this.getSize() === 0);
  },
  isRoot: function() {
    return (this.getNivo() == Position.NIVO_ROOT());
  },
  isMasterChanged: function() {
    var result = true; //(this.isRoot())?false:true;
    if (this.isRoot() === false) {
      var m1 = this.master;
      var m2 = this.getMaster();
    /*if (m1 && m2)   {
        result = (m1.getId() != m2.getId())?true:false;
      }*/
    }
    return result;
  },
  //Functions
  clear: function() {
    try {
      this.master = null;
      this.clearCells();
    } catch(error) {
      Utils.alert("GridColumn/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  clearCells: function() {
    this.cells = [];
    //this.savedLocation = null;
    this.topCell = null;
    //this.setCellCount(0);
    this.setCellPosition(1);
    this.setSort(Cache.SORT_ASCENDING);
  },
  getSize: function() {
    return this.cells.length;
  },
  getActualPosition: function(cell) {
    var result = null;
    try {
    //result = new Position(Position.ROW_TOP(),999);                    //TODO: 999 = columnNumber !!!
      result = new Position(Position.ROW_TOP(),this.getColumnNumber());
      for (var i = 0; i < this.getSize(); i++) {
        var c = this.getCell(i);
        if (c == cell) {
          result = c.getPosition();
          break;
        }
      }
    } catch(error) {
      Utils.alert("GridColumn/getActualPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getCurrentNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    try {
      var grid = this.getGrid();
      if (grid) {
        result = grid.getCurrentNivo();
      }
    } catch(error) {
      Utils.alert("GridColumn/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  reverseSort: function() {
    try {
      var m1 = "GridColumn/reverseSort - from: "+this.getSort();
      var sort = this.getSort();
      if (sort == Cache.SORT_ASCENDING) {
        sort = Cache.SORT_DESCENDING;
      } else {
        sort = Cache.SORT_ASCENDING;
      }
      this.setSort(sort);
      this.setCellPosition(1);
      m1 += " to: "+this.getSort(); 
    //Utils.alert(m1);
    } catch(error) {
      Utils.alert("GridColumn/reverseSort Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  getLastRow: function() {
    var result = Position.ROW_TOP();
    try {
      if (this.getSize() > result) {
        result = (this.getSize() - 1);
      }
    } catch(error) {
      Utils.alert("GridColumn/getLastRow Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getIndex: function() {
    var result = null;
    try {
      result = this.getNivo();
      if (result != Position.NIVO_ROOT()) {
        result = (Math.abs(result) - 1);
      }
    } catch(error) {
      Utils.alert("GridColumn/getIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  pushCellOnTop: function(gridCell) {
    var result = null;
    try {
      if (gridCell) {
        gridCell.setGridColumn(this);
        this.cells.splice(0,0,gridCell);
        if (this.getSize() > Position.ROWS_MAX()) {
          result = this.removeCell(Position.ROWS_MAX());
        }
        //Increment references!
        //relation.reference();
        this.setTopCell(this.getCell(Position.ROW_TOP()));
        /*                                                                   OKE !!!
        //Update column view !!!
        if (document) {
          var columnNumber = this.getColumnNumber();
          var columnId = (Grid.COLUMN_ID+columnNumber);
        //var nivo = this.getNivo();
        //var sortDescending = this.isSortDescending();
        //var columnContentHtml = '<div id="'+columnId+'h">'+GridColumn.buildHeaderHtml(columnNumber,nivo,sortDescending)+'</div>';
          var columnContentHtml = '<div id="'+columnId+'h">'+this.buildHeaderHtml()+'</div>';
          for (var row = Position.ROW_TOP(); row < this.getGrid().getNbrOfRows(); row++) {
            var cell = this.getCell(row);
            var cellId = Grid.COLUMN_ID+'c'+columnNumber+row;
          //columnContentHtml += GridCell.buildContentHtml(columnNumber,row,cell);
            columnContentHtml += cell.buildContentHtml();
          }
          columnContentHtml += '</div>';
          document.getElementById(columnId).innerHTML = columnContentHtml;
        }
        */
        this.setCellPosition(1); //this.getCellPosition() - 1);
      }
    } catch(error) {
      Utils.alert("GridColumn/pushCellOnTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  pushCellOnBottom: function(gridCell) {
    var result = null;
    try {
      if (gridCell) {
        gridCell.setGridColumn(this);
        var lastRow = this.getLastRow();
        this.cells.splice((lastRow+1),0,gridCell);
        if (this.getSize() > Position.ROWS_MAX()) {
          result = this.removeCell(Position.ROW_TOP());
        }  
        //Increment references!
      //relation.reference();
      }
    } catch(error) {
      Utils.alert("GridColumn/pushCellOnBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  appendCell: function(gridCell) {
    try {
      if (gridCell) {
        gridCell.setGridColumn(this);
        this.cells.push(gridCell);
        //Increment references!
      //relation.reference();
      }
    } catch(error) {
      Utils.alert("GridColumn/appendCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  removeCell: function(index) {
    var result = null;
    try {
      if (index < this.getSize()) {
        result = this.getCell(index);
        //Decrement references!
        // if (result) {
        // //relation.dereference();
        // }
        this.cells.splice(index,1);
      }
    } catch(error) {
      Utils.alert("GridColumn/removeCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getCell: function(index) {
    var result = null;
    try {
      if (this.getNivo() === Position.NIVO_ROOT()) {
        result = this.getGrid().getRoot();
      } else {
        if (index < this.getSize()) {
          result = this.cells[index];
          if (result) {
            result.setPosition(new Position(index,this.getColumnNumber()));
            result.setGridColumn(this);
          }
        }
      }
    } catch(error) {
      Utils.alert("GridColumn/getCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRelation: function(index) {
    var result = null;
    try {
      var gridCell = this.getCell(index);
      if (gridCell) {
       result = gridCell.getRelation();
      }
    } catch(error) {
      Utils.alert("GridColumn/getRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setRoot: function(gridCell) {
    try {
      if (gridCell) {
        this.clear();
        //var index = ((this.getGrid().getNbrOfRows() / 2) - 1);
        //var index = Math.floor(this.getGrid().getNbrOfRows() / 2);
        ///////////////////////////////////////////////////////////////////////////////////////
        // PUT ROOT TEMPORARILY IN FIRST CELL, WILL BE REPLACED IN MIDDLE OF COLUMN LATER... //
        ///////////////////////////////////////////////////////////////////////////////////////
        this.cells[Position.ROW_TOP()] = gridCell;
      }
    } catch(error) {
      Utils.alert("GridColumn/setRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  pup: function(gridCell) {
    var result = false;
    try {
    //this.refreshNow(false);
      var nivo = this.getNivo();
      if (nivo != Position.NIVO_ROOT()) {
        if (gridCell) {
          var sort = this.getSort();
          var cells = null;
          if (nivo < Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              cells = gridCell.getPreviousParentCells(this.getGrid().getNbrOfRows(),sort);
            } else {
              cells = gridCell.getNextParentCells(this.getGrid().getNbrOfRows(),sort);
            }          
          } else if (nivo > Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              cells = gridCell.getPreviousChildCells(this.getGrid().getNbrOfRows(),sort);
            } else {
              cells = gridCell.getNextChildCells(this.getGrid().getNbrOfRows(),sort);
            }  
          }
          if (cells) {
            result = true;
            this.clearCells();
            this.setCellPosition(this.getCellPosition() - this.getGrid().getNbrOfRows());      
            for (var i = 0; i < cells.length; i++) {
              var c1 = cells[i];
              this.appendCell(c1);
            }
            if (this.cells && this.cells.length > 0) {
              //IF ON TOP: BETTER DO A REFRESH!!!
              if (this.cells.length < Position.ROWS_MAX()) {
                this.setCellPosition(1);
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("GridColumn/pup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  //TODO: NOT USED ??? OK - SCROLL !!!
  up: function(gridCell) {
    var result = false;
    try {
      var nivo = this.getNivo();
      if (nivo != Position.NIVO_ROOT()) {
        if (gridCell) {
          var sort = this.getSort();
          var previousCell = null;
          if (nivo < Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              previousCell = gridCell.getPreviousParent();
            } else {
              previousCell = gridCell.getNextParent();
            }
          } else if (nivo > Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              previousCell = gridCell.getPreviousChild();
            } else {
              previousCell = gridCell.getNextChild();
            }
          }
          if (previousCell) {
            this.pushCellOnTop(previousCell);
          //this.setCellPosition(this.getCellPosition() - 1);
          //this.setTopCell(previousCell);
          //result = true;
          }
        }
      }
      _rf.setColumnInfo(this);
    } catch(error) {
      Utils.alert("GridColumn/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  load: function(gridCell) {
    var result = false;
    try {
      var nivo = this.getNivo();
      if (nivo != Position.NIVO_ROOT()) {
        if (gridCell) {
          var sort = this.getSort();
          var cells = null;
          if (nivo < Position.NIVO_ROOT()) {
            cells = gridCell.getParentCells(this.getGrid().getNbrOfRows(),sort);
          } else if (nivo > Position.NIVO_ROOT()) {
            cells = gridCell.getChildCells(this.getGrid().getNbrOfRows(),sort);
          }
          if (cells) {
            result = true;
            this.clearCells();
            this.setCellPosition(this.getCellPosition() + this.getGrid().getNbrOfRows());
            for (var i = 0; i < cells.length; i++) {
              var c1 = cells[i];
              this.appendCell(c1);
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("GridColumn/load Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  pdn: function(gridCell) {
    var result = false;
    try {
      var nivo = this.getNivo();
      if (nivo != Position.NIVO_ROOT()) {
        if (gridCell) {
          var sort = this.getSort();
          var cells = null;
          if (nivo < Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              cells = gridCell.getNextParentCells(this.getGrid().getNbrOfRows(),sort);
            } else {
              cells = gridCell.getPreviousParentCells(this.getGrid().getNbrOfRows(),sort);
            }
          } else if (nivo > Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              cells = gridCell.getNextChildCells(this.getGrid().getNbrOfRows(),sort);
            } else {
              cells = gridCell.getPreviousChildCells(this.getGrid().getNbrOfRows(),sort);
            }
          }
          if (cells) {
            result = true;
            this.clearCells();
            this.setCellPosition(this.getCellPosition() + this.getGrid().getNbrOfRows());
            for (var i = 0; i < cells.length; i++) {
              var c1 = cells[i];
              this.appendCell(c1);
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("GridColumn/pdn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  //TODO: NOT USED ??? OK - SCROLL !!!
  down: function(gridCell) {
    var result = false;
    try {
      var nivo = this.getNivo();
      if (nivo != Position.NIVO_ROOT()) {
        if (gridCell) {
          var sort = this.getSort();
          var nextCell = null;
          if (nivo < Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              nextCell = gridCell.getNextParent();
            } else {
              nextCell = gridCell.getPreviousParent();
            }
          } else if (nivo > Position.NIVO_ROOT()) {
            if (sort == Cache.SORT_ASCENDING) {
              nextCell = gridCell.getNextChild();
            } else {
              nextCell = gridCell.getPreviousChild();
            }
          }
          if (nextCell) {
            this.pushCellOnBottom(nextCell);
            this.setCellPosition(this.getCellPosition() + 1);
            this.setTopCell(this.getCell(Position.ROW_TOP()));
            result = true;
          }
        }
      }
      _rf.setColumnInfo(this);
    } catch(error) {
      Utils.alert("GridColumn/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
/*
//buildHtml: function(columnNumber,sortDescending) {
  buildHtml: function(columnNumber) {
    var _cnr = (columnNumber !== undefined && columnNumber !== null)?columnNumber:null; //GridColumn.COLUMN_9;
  //var _sortDescending = (sortDescending !== undefined && sortDescending !== null)?sortDescending:false;
    var result = '';
    try {
      var columnClass = GridColumn.CLASS_ID; //+" "+GridColumn.WHERE_USED_CLASS_ID; 
      var columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHERE_USED_FIRST_CLASS_ID;
      var _columnNumber = this.getColumnNumber();
      if (_cnr) { _columnNumber = _cnr; }
      var columnId = Grid.COLUMN_ID+_columnNumber;
      var columnHeader = '&nbsp;';
      var styleColor = 'black';   
      var nivo = (Position.NIVO_ROOT() + 1);
      var width = 0;
      var what = false;
      var display = 'none';
      var padding = '0px 0px 0px 0px';
      switch (_columnNumber) {
        case GridColumn.COLUMN_1:
          nivo = Position.NIVO_COLUMN_FIRST();
          width = 23;
          display = 'block';
          break;
        case GridColumn.COLUMN_2:
          nivo = (Position.NIVO_COLUMN_FIRST() + 1);
          width = 23;
          display = 'block';
          break;
        case GridColumn.COLUMN_3:
          nivo = (Position.NIVO_COLUMN_FIRST() + 2);
          width = 23;
          display = 'block';
          break;
        case GridColumn.COLUMN_4:
          columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_ROOT_CLASS_ID;
          nivo = Position.NIVO_ROOT();
          width = 31;
          display = 'block';
          break;
        case GridColumn.COLUMN_9:
          what = true;
          columnId = Grid.COLUMN_WHAT_ID;
          nivo = (Position.NIVO_ROOT() + 1);
          width = 100;
          display = 'block';
        //padding = '0px 0px 0px 19px';
          break;
        default:
          break;
      }
      columnHeader = nivo;
      if (nivo > Position.NIVO_ROOT()) {
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;        
      }
      result = '<div id="'+columnId+'" class="'+columnClass+'" style="width:'+width+'%;display:'+display+';">'+
//             ' <div id="'+columnId+'h" style="padding:'+padding+'">'+GridColumn.buildHeaderHtml(_columnNumber,nivo,_sortDescending)+'</div>';
               ' <div id="'+columnId+'h" style="padding:'+padding+'">'+this.buildHeaderHtml(_columnNumber,what)+'</div>';
      var row = null;
      for (row = Position.ROW_TOP(); row < this.getGrid().getNbrOfRows(); row++) {
      //result += GridCell.buildHtml(_columnNumber,row);
        var gridCell = new GridCell();
        if (gridCell) {
          result += gridCell.buildHtml(this,row,what);
        }
      }
      result += '</div>';
    } catch(error) {
      Utils.alert("GridColumn/buildHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
**buildHeaderHtml: function(columnNumber,nivo,sortDescending) {
    var _columnNumber = (columnNumber !== undefined && columnNumber !== null)?columnNumber:GridColumn.COLUMN_9;
    var _nivo = (nivo !== undefined && nivo !== null)?nivo:(Position.NIVO_ROOT() + 1);
    var _sortDescending = (sortDescending !== undefined && sortDescending !== null)?sortDescending:false;**
  buildHeaderHtml: function(columnNumber,what) {
    var _cnr = (columnNumber !== undefined && columnNumber !== null)?columnNumber:null; //GridColumn.COLUMN_9;
    var _what = (what !== undefined && what !== null)?what:false;   
    var result = '';
    try {
      var _columnNumber = this.getColumnNumber();
      if (_cnr) {
        _columnNumber = _cnr;
      }
      var _sortDescending = this.getSort();
      var _nivo = this.getNivo();
      if (_what === true) {
        var grid = this.getGrid();
        if (grid) {
          _nivo = grid.getLastNivo();
        }
      }
      
      var columnClass = GridColumn.CLASS_ID; //+" "+GridColumn.WHERE_USED_CLASS_ID; 
      var columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHERE_USED_CLASS_ID;
      if (_columnNumber == Position.COLUMN_FIRST()) {
        columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHERE_USED_FIRST_CLASS_ID;
      }
      var columnHeader = _nivo;
      styleColor = FontStyle.COLOR_PARENT(_nivo);
      if (_nivo == Position.NIVO_ROOT()) {
        columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_ROOT_CLASS_ID;
        if (_columnNumber == Position.COLUMN_FIRST()) {
          columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_ROOT_FIRST_CLASS_ID;
        }
      } else if (_nivo > Position.NIVO_ROOT()) {
        styleColor = FontStyle.COLOR_CHILD(_nivo);
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;  
        columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHAT_USED_LEFT_CLASS_ID;
        if (_columnNumber == Position.COLUMN_FIRST()) {
          columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHAT_USED_LEFT_FIRST_CLASS_ID;
        }
      }
      if (_what === true) {
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;  
        columnHeaderClass = GridColumn.HEADER_CLASS_ID; //+" "+GridColumn.HEADER_WHAT_USED_CLASS_ID;
      }   
      //result = '<div style="color:'+styleColor+';" class="'+columnHeaderClass+'" onclick="toggleSortOrder('+_nivo+');_cf.setEventHappened(true);_cf.setFocusOnList();">';
      result = '<div style="color:'+styleColor+';" class="'+columnHeaderClass+'">';
      if (_what === true) {
        result += '<div style="float:left;width:20px;background-color:'+FontStyle.COLOR_LIGHTGRAY+';">&nbsp;</div>';
      }
      result += '<div style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+((_sortDescending)?'<font color="red">!</font>':'')+'</div></div>';
    } catch(error) {
      Utils.alert("GridColumn/buildHeaderHtml Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
*/
  print: function() {
    var result = '';
    try {
      result = "\nGridColumn:";
      result += '\nnivo: '+this.getNivo();
      var master = this.getMaster();
      if (master) {
        result += '\nmaster/'+master.print();
      }
      var savedCell = this.getSavedCell();
      if (savedCell) {
        result += '\nsavedCell/'+savedCell.print();
      }
      var i = 0;
      result += '\ncells:';
      this.cells.forEach(function(c) {
        if (c) {
          result += c.print(i);
        }
        i++;
      });
    } catch(error) {
      Utils.alert("GridColumn/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
GridColumn.CLASS_ID = "gridColumn";
GridColumn.WHERE_USED_CLASS_ID = "gridColumnWhereUsed";
GridColumn.WHERE_USED_4C_CLASS_ID = "gridColumnWhereUsed_4C";
GridColumn.WHERE_USED_5C_CLASS_ID = "gridColumnWhereUsed_5C";
GridColumn.WHERE_USED_6C_CLASS_ID = "gridColumnWhereUsed_6C";
GridColumn.WHERE_USED_7C_CLASS_ID = "gridColumnWhereUsed_7C";
GridColumn.WHERE_USED_8C_CLASS_ID = "gridColumnWhereUsed_8C";
GridColumn.ROOT_CLASS_ID = "gridColumnRoot";
GridColumn.ROOT_4C_CLASS_ID = "gridColumnRoot_4C";
GridColumn.ROOT_5C_CLASS_ID = "gridColumnRoot_5C";
GridColumn.ROOT_6C_CLASS_ID = "gridColumnRoot_6C";
GridColumn.ROOT_7C_CLASS_ID = "gridColumnRoot_7C";
GridColumn.WHAT_USED_CLASS_ID = "gridColumnWhatUsed";
GridColumn.WHAT_USED_LEFT_CLASS_ID = "gridColumnWhatUsedLeft";
GridColumn.WHAT_USED_LEFT_4C_CLASS_ID = "gridColumnWhatUsedLeft_4C";
GridColumn.WHAT_USED_LEFT_4X_CLASS_ID = "gridColumnWhatUsedLeft_4X";
GridColumn.HEADER_CLASS_ID = "gridColumnHeader";
GridColumn.HEADER_FIRST_CLASS_ID = "gridColumnHeaderFirst";
GridColumn.HEADER_WHAT_USED_CLASS_ID = "gridColumnHeaderWhatUsed";
GridColumn.COLUMN_1 = 0; // Where / nivo: -3
GridColumn.COLUMN_2 = 1; // Where / nivo: -2
GridColumn.COLUMN_3 = 2; // Where / nivo: -1
GridColumn.COLUMN_4 = 3; // Root  / nivo:  0
GridColumn.COLUMN_5 = 4; // none  / nivo: undefined
GridColumn.COLUMN_6 = 5; // none  / nivo: undefined
GridColumn.COLUMN_7 = 6; // none  / nivo: undefined
GridColumn.COLUMN_8 = 7; // none  / nivo: undefined
GridColumn.COLUMN_9 = 8; // What  / nivo : 1

//Class: GridView
var GridView = new Class({
  Extends: SjamayeeBase,
  
  initialize: function(grid) {
    try {
      this.parent();
      this.grid = grid;
      //Update reference in the GRID!
      this.getGrid().setGridView(this);
      this.clear();
      //Determine Grid range.
      this.gridRange = this.getGridRange(); //this.getCurrentNivo());
      //Select columns for Grid View.
      //var columnNumber = Position.COLUMN_FIRST();
      while (this.gridRange.getNext() === true) {
        var nivo = this.gridRange.getIndex();
        var gridColumn = this.getGrid().getColumnByNivo(nivo);
        if (gridColumn) {
          this.appendColumn(gridColumn);
        }
      }
    } catch(error) {
      Utils.alert("GridView/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getGrid: function() {
    return this.grid;
  },
  setPosition: function(position) {
    if (position) {
      this.getGrid().setPosition(position);
    }
  },
  getPosition: function() {
    var result = null;
    try {
      result = this.getGrid().getPosition();
    } catch(error) {
      Utils.alert("GridView/getPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  //Functions
  clone: function() {
    var result = null;
    try {
      result = new GridView();
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key in properties) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("GridView/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  clear: function() {
    try {
      this.columns = [];
    } catch(error) {
      Utils.alert("GridView/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally { 
      return this;
    }
  },
  isHomeView: function(entity) {
    return false; //this.getGridRange().isInitial();
  },
  isRootSelectionValid: function(entity) {
    var result = (entity !== undefined && entity !== null)?true:false;
    try {
      //TODO: ??????????????????????????????????????????????
      //if (this.isHomeView() === true) {
      //  var rootEntity = this.getGrid().getRootEntity();
  /*    if (rootEntity) {
          if (rootEntity.getId() == entity.getId()) { result = false; }
        }*/
      //}
    } catch(error) {
      Utils.alert("GridView/isRootSelectionValid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRootEntity: function() {
    var result = null;
    try {
      result = this.getGrid().getRoot();
    } catch(error) {
      Utils.alert("GridView/getRootEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRoot: function() {
    var result = null;
    try {
      result = this.getGrid().getRoot();
    } catch(error) {
      Utils.alert("GridView/getRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getCell: function(index) {
    var result = null;
    try {
      var column = null;
      var nivo = this.getCurrentNivo();
      column = this.getGrid().getColumnByNivo(nivo);
      if (column) {
        result = column.getCell(index);
      }
    } catch(error) {
      Utils.alert("GridView/getCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getCurrentCell: function() {
    var result = null;
    try {
      var position = this.getPosition(); 
      if (position) {
        var column = this.getColumn(position.getColumn()); 
        if (column) {
          if (column.getNivo() == Position.NIVO_ROOT()) {
            result = this.getRoot();
          } else {
            result = column.getCell(position.getRow());
          }  
        }
      }
    } catch(error) {
      Utils.alert("GridView/getCurrentCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setParentAndChild: function(cell) {
    if (cell) {
      this.getGrid().setParentAndChild(cell);
    }
  },
  getNivoBase: function() {
    var nivoBase = Position.NIVO_COLUMN_FIRST();
    try {
      nivoBase = this.getGrid().getNivoBase();
    } catch(error) {
      Utils.alert("GridView/getNivoBase Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return nivoBase;
    }
  },
  setCurrentNivo: function(nivo) {
    if (nivo !== null) {
      this.getGrid().setCurrentNivo(nivo);
    }
  },
  setCurrentNivoByColumn: function(column) {
    if (column) {
      var gridViewColumn = this.getColumn(column);
      if (gridViewColumn) {
        this.setCurrentNivo(gridViewColumn.getNivo());
      }
    }
  },
  getCurrentNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    try {
      result = this.getGrid().getCurrentNivo();
    } catch(error) {
      Utils.alert("GridView/getCurrentNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getLastNivo: function() {
    var result = (Position.NIVO_ROOT() + 1);
    try {
      var gridRange = this.getGridRange();
      if (gridRange) {
        result = gridRange.getUntil();
      }
    } catch(error) {
      Utils.alert("GridView/getLastNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getColumns: function() {
    return this.columns;
  },
  appendColumn: function(column) {
    try {
      if (column) {
        this.columns.push(column);
      }
    } catch(error) {
      Utils.alert("GridView/appendColumn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally { 
      return this;
    }
  },
  getColumn: function(index) {
    var _index = (index !== undefined && index !== null)?index:Position.COLUMN_FIRST();
    var result = null;
    try {
      var columns = this.getColumns();
      if (columns) {
        if (_index == RelationsGridRight.COLUMN_VALUE) {
          _index = (columns.length - 1);
        }
        if (_index < columns.length) {
          result = columns[_index];
          //result.setGridView(this);                    // TODO: VERIFY !!!!!!!!! NEEDED ????
        }
      }
    } catch(error) {
      Utils.alert("GridView/getColumn Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  insertCell: function() {
    //if (this.getGrid().isInsert()) { Utils.alert("GridView/insertCell - INSERT!"); }
    return this;
  },
  //TODO: nivo??? / what if (nivo < 0) ???
  getGridRange: function() {
    var result = null;
    try {
      if ((this.gridRange === undefined) || (this.gridRange === null)) {
        this.gridRange = new GridRange(this.getCurrentNivo());
      }
      result = this.gridRange;

  /*var nivo = this.getCurrentNivo();
    var result = new GridRange(nivo);
    try {
      var a = 123;*/

    /*TODO: WHAT IS THIS - FOR WHAT ???
      - ga naar de eerste lege kolom vanaf nivo 2 !!!
      - ZORG VOOR RECURSION ON EMPTY COLUMN !!!
      /////////////////////////////////
      if (nivo > (Position.NIVO_ROOT() + 1)) {
        var column = this.getGrid().getColumnByNivo(nivo);
        if (column) {
          if (column.isEmpty() === true) {
            var position = this.getPosition();          
            var n1 = this.getGrid().getWhatUsedNivo();
            if (n1) {
              if (nivo != n1) {
                nivo = n1;
                //this.setCurrentNivo(nivo);
              }
            }
            column = this.getGrid().getColumnByNivo(nivo);
            if (column) {
              if (position) {
                position.setRow(Position.ROW_TOP());
                position.setColumn(Position.COLUMN_WHAT_FIRST());
                //LAST COLUMN !!!
                result = new GridRange(nivo);
                **if (result) {
                  var lastColumn = (gridRange.getNbrOfColumns() - 1);        
                  position.setColumn(lastColumn);
                }**
                var c1 = column.getSavedCell();          
                if (c1) {
                  var p1 = c1.getPosition();
                  if (p1) {
                    position.setRow(p1.getRow());
                  }  
                }
              }
            }
            //RESET GRIDVIEW !!!
            this.getGrid().setGridView(null);
            var gridView = this.getGrid().getGridView();
            if (gridView) {
              gridView.setCurrentNivo(nivo);
            }
          }
        }
      }*/
    } catch(error) {
      Utils.alert("GridView/getGridRange Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setFocusOrEditRelation: function(e,row,column) {
    var _e = (e !== undefined)?e:window.event;
    try {
    //this.setFocus(row,column);
      this.getGrid().setFocus(row,column);
      if (_rf.hasFocusOnRight() && _e && _e.altKey) {
        //////////////////////////////////////
        //TODO: ONLY OK FOR WHAT(1)-COLUMN !!!
        //////////////////////////////////////
        //var gridView = this.getGridView();
        _rf.editRelation();
      } else {
        //Write navigation command for previous "setFocus"
        var relation = null;
        //RESET GRIDVIEW !!!
      //this.setGridView(null);                                                   // !!! 2010/08/16 !!!
      //var gridView = this.getGridView();
      //if (gridView) {
        //var gridCell = gridView.getCurrentCell();
          var gridCell = this.getCurrentCell();
          if (gridCell) {
            relation = gridCell.getRelation();
            var gridColumn = gridCell.getGridColumn();
            var masterRelation = (gridColumn)?gridColumn.getMaster().getRelation():null;          
            _cf.writeNavigationCommand(gridView,NavigationCommand.NAV_CLICK,relation,masterRelation);     
          }
      //}
      }
    } catch(error) {
      Utils.alert("GridView/setFocusOrEditRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  getNbrOfRows: function() {
    //return GridView.DEFAULT_ROWS; //this.getRows().length;
    return this.getGrid().getNbrOfRows();
  },
  getNbrOfColumns: function() {
    var result = GridView.DEFAULT_COLUMNS;
    try {
      result = this.getGrid().getNbrOfColumns();
    } catch(error) {
      Utils.alert("GridView/getNbrOfColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
/*
  //Navigation
  firstPage: function() {
    var result = false;
    try {
      var column = null;
      var relation = null;
      var currentNivo = this.getCurrentNivo();
      if (currentNivo !== null) {
        column = this.getGrid().getColumnByNivo(currentNivo);
        if (column) {
          var savedCell = column.getSavedCell();
          column.clear();
          var position = this.getPosition();
          if (position) {
            position.setRow(Position.ROW_TOP());
          }
          column.setSavedCell(savedCell);
          result = true;
        }
      }
    } catch(error) {
      Utils.alert("GridView/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
  previousPage: function() {
    var result = false;
    try {
      var ok = false;
      var column = null;
      var relation = null;
      var nivo = this.getCurrentNivo();
      var position = this.getPosition();
      var gridCell = this.getCell(Position.ROW_TOP());
      if (gridCell) {
        relation = gridCell.getRelation();
        if (gridCell.hasPrevious()) {
          if (position) {
            column = this.getGrid().getColumnByNivo(nivo);
            if (column) {
              result = column.pup(gridCell);
              ok = true;
            }
          }
        }
      }
      if (!ok) {
        Utils.beep(0);
        column = this.getGrid().getColumnByNivo(nivo);    
        if (column) {
          if (position) {
            position.setRow(Position.ROW_TOP());
            if (column.getSelected() === false) {    
              column.setSavedCell(column.getCell(position.getRow()));
            }
          }
        }
      } else { 
        if (column) {
          var lastRow = column.getLastRow();
          if (position.getRow() > lastRow) {
            position.setRow(lastRow);
          }
          if (column.getSelected() === false) {
            column.setSavedCell(column.getCell(position.getRow()));
          }
        }
        //_cf.writeNavigationCommand(this,NavigationCommand.NAV_PUP,relation);
      }
    } catch(error) {
      Utils.alert("GridView/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
  up: function() {
    var result = false;
    try {
      var ok = false;
      var column = null;
      var relation = null;
      var position = this.getPosition();
      var gridCell = this.getCurrentCell();
      if (gridCell) {
        relation = gridCell.getRelation();
        if (gridCell.hasPrevious()) {
          if (position) {
            var nivo = this.getCurrentNivo();
            column = this.getGrid().getColumnByNivo(nivo);
            if (position.getRow() > Position.ROW_TOP()) {
              ok = true;
              position.up();
              var previousCell = this.getCurrentCell();
              if (previousCell) {
                gridCell.touch(false);
                previousCell.touch(true);
                this.setParentAndChild(previousCell);
              }
            } else {
              ok = true;
              result = column.up(gridCell);
            }
          }
        }
      }
      if (ok === false) {
        Utils.beep(0);
      } else {  
        gridCell = this.getCurrentCell();
        if (gridCell) {
          relation = gridCell.getRelation();
          var masterRelation = (column)?column.getMaster().getRelation():null;
          _cf.writeNavigationCommand(this,NavigationCommand.NAV_UP,relation,masterRelation);
        }
      }
    } catch(error) {
      Utils.alert("GridView/up Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
  left: function() {
    var result = false;
    try {
      var ok = false;
      //var cn = Position.NIVO_ROOT();
      var cn = this.getCurrentNivo();
      var column = null;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var homeView = false;   
      var position = this.getPosition();  
      var gridCell = this.getCurrentCell();
      if (!gridCell) {
        if (cn > Position.NIVO_ROOT()) {
          //TO RETURN FROM EMPTY COLUMN!
          ok = true;
        }
      } else {
        if (gridCell.navigationLeft()) {
          relation = gridCell.getRelation();
          ok = true;
        }
      }
      if (ok) {
        column = this.getGrid().getColumnByNivo(cn);
      **if (cn != Position.NIVO_ROOT()) {
          column = this.getGrid().getColumnByNivo(cn);
        }**
        if (cn > Position.WHERE_MAX()) {
          cn = (cn - 1);                           // TEST LIMIT !!!
          if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
            if (column) {
              column.setSavedCell(gridCell);       // TODO: # cells -> clear column !!!
            }
          } else if (cn >= Position.NIVO_ROOT()) {
            if (column) {
              selectedCell = column.getSavedCell();
              if ((column.getNivo() >= this.getGrid().getWhatUsedNivo()) || (column.isSelected() === false)) {
                column.setSavedCell(gridCell);
              }
            }
          }
          nextColumn = this.getGrid().getColumnByNivo(cn);
          if (nextColumn) {
            result = true;
            this.setCurrentNivo(cn);
            if (cn <= Position.NIVO_ROOT()) {
              homeView = this.isHomeView();
            }
            if (cn < this.getGrid().getWhereUsedNivo()) {
              this.getGrid().setWhereUsedNivo(cn);
            }
            savedCell = nextColumn.getSavedCell();
            if (position) { position.left(savedCell); }
            if (homeView === true) {
              if (nextColumn.isMasterChanged() === false) {
                if (selectedCell) {
                //selectedCell.touch(((selectedCell.isSelected())?true:false));
                  selectedCell.touch(selectedCell.isSelected());
                }
              //gridCell.touch(((gridCell.isSelected())?true:false));
                gridCell.touch(gridCell.isSelected());
                savedCell.touch(true);
                this.setParentAndChild(savedCell);
              //result = false;
              }
            }
          }
        }
      }
      if (!ok) {
        Utils.beep(0);
      } else {
        //Write navigation command.
        var rto = null;
        //RESET GRIDVIEW !!!
        this.getGrid().setGridView(null);
        var gridView = this.getGrid().getGridView();
        if (gridView) {
          gridCell = gridView.getCurrentCell();
          if (gridCell) {
            rto = gridCell.getRelation();
            _cf.writeNavigationCommand(gridView,NavigationCommand.NAV_LEFT,rto,relation);
          }
        }
      }
      var m1 = "GridView/left - currentNivo: "+cn+"\n";
      if (position) { m1 += " p: "+position.print()+"\n"; }
      if (savedCell) { m1 += "sc: "+savedCell.print(); }
    } catch(error) {
      Utils.alert("GridView/left Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
  root: function() {
    try {
      this.setCurrentNivo(Position.NIVO_ROOT());
      var position = this.getPosition();
      position.root();
      //Set Focus !!!
      _rf.setColumnInfo(this.getGrid().getColumnByNivo(Position.NIVO_ROOT()));
    } catch(error) {
      Utils.alert("GridView/root Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return '\nGridView/Root';
    }
  }
  right: function() {
    var result = false;
    try {
      var ok = false;
      var cn = this.getCurrentNivo();
      var column = null;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var homeView = false;
      var position = this.getPosition();  
      var gridCell = this.getCurrentCell();
      if (gridCell) {
        relation = gridCell.getRelation();
        if (gridCell.navigationRight()) {
          column = this.getGrid().getColumnByNivo(cn);
        **if (cn != Position.NIVO_ROOT()) {
            column = this.getGrid().getColumnByNivo(cn);
          }**
          if (cn < Position.WHAT_MAX()) {
            cn = (cn + 1);                           // TEST LIMIT !!!
            if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
              if (column) {
                column.setSavedCell(gridCell);       // TODO: # cells -> clear column !!!
              }  
            } else if (cn <= Position.NIVO_ROOT()) {
              if (column) {
                selectedCell = column.getSavedCell();
                if ((column.getNivo() <= this.getGrid().getWhereUsedNivo()) || (column.isSelected() === false)) {                 
                  column.setSavedCell(gridCell);
                }
              }  
            }
            nextColumn = this.getGrid().getColumnByNivo(cn);
            if (nextColumn) {
              result = true;
              this.setCurrentNivo(cn);
              if (cn > Position.NIVO_COLUMN_FIRST()) {
                homeView = this.isHomeView();       
              }
              if (cn > this.getGrid().getWhatUsedNivo()) {
                this.getGrid().setWhatUsedNivo(cn);
              }
              savedCell = nextColumn.getSavedCell();               
              if (position) { position.right(savedCell); }
              ok = true;
              if (homeView === true) {
                if (!nextColumn.isMasterChanged() === true) {
                  if (selectedCell) {
                  //selectedCell.touch(((selectedCell.isSelected())?true:false));
                    selectedCell.touch(selectedCell.isSelected());
                  }
                //gridCell.touch(((gridCell.isSelected())?true:false));
                  gridCell.touch(gridCell.isSelected());
                  savedCell.touch(true);
                  this.setParentAndChild(savedCell);
                //result = false;
                }
              }
            }
          }
        }
      }
      if (!ok) {
        Utils.beep(0);
      } else {
        //Write navigation command.
        var rto = null;
        //RESET GRIDVIEW !!!
        this.getGrid().setGridView(null);
        var gridView = this.getGrid().getGridView();
        if (gridView) {
          gridCell = gridView.getCurrentCell();
          if (gridCell) {
            rto = gridCell.getRelation();
            _cf.writeNavigationCommand(gridView,NavigationCommand.NAV_RIGHT,rto,relation);
          }
        }
      }  
      var m1 = "GridView/right - currentNivo: "+cn+"\n";
      if (position) { m1 += " p: "+position.print()+"\n"; }
      if (savedCell) { m1 += "sc: "+savedCell.print(); }
      //Utils.alert(m1);
    } catch(error) {
      Utils.alert("GridView/right Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result; 
    }
  }
  down: function() {
    var result = false;
    try {
      var ok = false;
      var column = null;
      var relation = null;
      var position = this.getPosition();
      var gridCell = this.getCurrentCell();
      if (gridCell) {
        relation = gridCell.getRelation();
        if (gridCell.hasNext()) {
          if (position) {
            var nivo = this.getCurrentNivo();
            column = this.getGrid().getColumnByNivo(nivo);
            var lastRow = column.getLastRow();
            if (position.getRow() < lastRow) {
              ok = true;
              position.down();
              var nextCell = this.getCurrentCell();
              if (nextCell) {
                gridCell.touch(false);
                nextCell.touch(true);
                this.setParentAndChild(nextCell);
              }
            } else {
              ok = true;
              result = column.down(gridCell);
            }
          }
        }
      }
      if (ok === false) {
        Utils.beep(0);
      } else { 
        gridCell = this.getCurrentCell();
        if (gridCell) {
          relation = gridCell.getRelation();
          var masterRelation = (column)?column.getMaster().getRelation():null;        
          _cf.writeNavigationCommand(this,NavigationCommand.NAV_DOWN,relation,masterRelation);
        }
      }
    } catch(error) {
      Utils.alert("GridView/down Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
  nextPage: function() {
    var result = false;
    try {
      var ok = false;
      var column = null;
      var relation = null;
      var nivo = this.getCurrentNivo();
      var lastRow = Position.ROW_TOP();
      var position = this.getPosition();
      var gridCell = this.getCell(Position.ROW_BOTTOM());
      if (gridCell) {
        relation = gridCell.getRelation();
        if (gridCell.hasNext()) {
          if (position) {
            column = this.getGrid().getColumnByNivo(nivo);
            if (column) {
              result = column.pdn(gridCell);
              ok = true;
            }
          }
        }
      }
      if (ok === false) {
        Utils.beep(0);
        if (column) {
          if (position) {
            lastRow = column.getLastRow();
            position.setRow(lastRow);
            if (column.getSelected() === false) {
              column.setSavedCell(column.getCell(position.getRow()));
            }
          }
        }
      } else {
        if (column) {
          lastRow = column.getLastRow();
          if (position.getRow() > lastRow) {
            position.setRow(lastRow);
          }
          if (column.getSelected() === false) {
            column.setSavedCell(column.getCell(position.getRow()));
          }
        }
        //_cf.writeNavigationCommand(this,NavigationCommand.NAV_PDN,relation);
      }
    } catch(error) {
      Utils.alert("GridView/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
  lastPage: function() {
    var result = false;
    try {
      var column = null;
      var relation = null;
      var currentNivo = this.getCurrentNivo();
      if (currentNivo !== null) {
        column = this.getGrid().getColumnByNivo(currentNivo);
        if (column) {
          var savedCell = column.getSavedCell();
          column.clear();
          var position = this.getPosition();
          if (position) {
            position.setRow(Position.ROW_TOP());
          }
          column.setSavedCell(savedCell);
          result = true;
        }
      }
    } catch(error) {
      Utils.alert("GridView/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
*/
  setFocusOnPosition: function() {
    try {
      var position = this.getPosition();
      if (position) {
        var cell = this.getCurrentCell();
        if (cell !== undefined && cell !== null && !cell.isEmpty()) {
          //this.setParentAndChild(cell);
          var abc = 1;
        } else {
          while (position.getRow() > Position.ROW_TOP()) {
            //this.setPosition(position.up());
            position.up();
            cell = this.getCurrentCell();
            if (cell !== undefined && cell !== null && !cell.isEmpty()) {
              break;
            }
            if ((position.getRow() <= Position.ROW_TOP()) || ((cell === undefined) || (cell === null) || (cell.isEmpty() === true))) { break; }
          }
        }
        if (cell) {
        /*var cn = this.getCurrentNivo();
          if (cn != Position.NIVO_ROOT()) {
            var column = this.getGrid().getColumnByNivo(cn);
          }*/
          this.setParentAndChild(cell);       
        }
        if (document) {
          if (document.getElementById(position.id())) {
            document.getElementById(position.id()).focus();
          }
          //TODO: REVIEW IN GENERAL !!! (setFocusOnPanel) !!!
          if (document.getElementById(ApplicationFacade.NAVIGATION_CONTROL_ID)) {
            document.getElementById(ApplicationFacade.NAVIGATION_CONTROL_ID).focus();
          }
        }
    /*} else {
          if (_rf) {
            var row = position.getRow();
            if (row > Position.ROW_TOP) {
              position.setRow(row-1);
              this.getGrid().setFocus(position.getRow(),position.getColumn());
            }
          }
        }*/
      }
    } catch(error) {
      Utils.alert("GridView/setFocusOnPosition Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Mode: DISPLAY
    //_cf.setMode(Grid.MODE_DISPLAY);
    }
  },
  setFocusOnColumnSavedCell: function(cell) {
    try {
      var position = this.getPosition();
      if (position) {
        var row = Position.ROW_TOP();
        var column = Position.COLUMN_WHAT_FIRST();
        if (cell !== undefined && cell !== null) {
          var cellPosition = cell.getPosition();
          if (cellPosition) {
            row = cellPosition.getRow();
          //column = cellPosition.getColumn();
          }
        }
        position.setRow(row);
        position.setColumn(column);
        this.setFocusOnPosition();
      }
    } catch(error) {
      Utils.alert("GridView/setFocusOnColumnSavedCell Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Mode: DISPLAY
      if (_cf) { _cf.setMode(Grid.MODE_DISPLAY); }
    }
  },
  setFocusOnRoot: function() {
    this.getGrid().setFocusOnRoot();
  },
  print: function() {
    var result = "";
    try {
      var columns = this.getNbrOfColumns();
      result = "\nGridView:";
      for (var i = 0; i < this.columns.length; i++) {
        if (columns <= 0) { break; }
        var c = this.columns[i];
        result += (c)?c.print():'';
        columns--;
      }
    } catch(error) {
      Utils.alert("GridView/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  } 
});
//Statics
GridView.DEFAULT_ROWS = 10;
GridView.DEFAULT_COLUMNS = 5;
GridView.MAXIMUM_COLUMNS = 8;
GridView.columnNumberOfNivo = function(nivo) {
  var result = Position.COLUMN_FIRST();
  try {
    //Determine columnNumber for this Nivo!
    if (nivo > Position.NIVO_COLUMN_FIRST()) {
      result++;
    }
    if (nivo == (Position.NIVO_ROOT() - 1)) {
      result++;
    }
    if (nivo == Position.NIVO_ROOT()) {
      result = Position.COLUMN_ROOT();
    }
    if (nivo > Position.NIVO_ROOT()) {
      result = Position.COLUMN_WHAT_FIRST();
    }
  } catch(error) {
    Utils.alert("GridView/columnNumberOfNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
GridView.setFocusOnHome = function() {
  try {
    var position = this.getPosition();
    if (position) {
      position.leftTop();
      var nivo = position.getCurrentNivo();   //getNivo();
      var row = -1; //currentRow(nivo);       //TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      if (row == -1) { row = Position.ROW_TOP(); }
      position.home();
      this.setFocusOnPosition();
    }
  } catch(error) {
    Utils.alert("GridView/setFocusOnHome Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  }
};
GridView.setFocusOnEnd = function() {
  this.setFocusOnPosition();
};
GridView.setFocusOnLeftTop = function() {
  try {
    var position = this.getPosition();
    if (position) {
      if (position.getColumn() == Position.COLUMN_FIRST()) {
        position.leftTop();
      }
      this.setFocusOnPosition();
    }
  } catch(error) {
    Utils.alert("GridView/setFocusOnLeftTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  }
};
GridView.setFocusOnRightTop = function() {
  try {
    var gridColumns = RelationsForm.getGridColumns();
    var position = this.getPosition();
    if (position) {
      if (position.getColumn() >= gridColumns) {
        position.rightTop();
      }
      this.setFocusOnPosition();
    }
  } catch(error) {
    Utils.alert("GridView/setFocusOnRightTop Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  }
};
GridView.setFocusOnRoot = function() {
  try {
    var a = 1;
    //_grid.setFocusOnRoot();
  } catch(error) {
    Utils.alert("GridView/setFocusOnRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  }
};

//Class: GridRange
var GridRange = new Class({
  Extends: SjamayeeBase,
  
  initialize: function(nivo) {
    try {
      this.parent();
      if (nivo !== undefined) {
        this.setNivo(nivo);
      }
      this.reset();
    } catch(error) {
      Utils.alert("GridRange/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getNivo: function() {
    var result = Position.NIVO_ROOT();
    if (this.nivo !== undefined) {
      result = this.nivo;
    }
    return result;
  },
  setNivo: function(nivo) {
    if (nivo !== null) {
      this.nivo = nivo;
    }
  },
  isInitial: function() {
    var result = (this.getFrom() == Position.NIVO_COLUMN_FIRST())?true:false;
    return result;
  },
  //Functions
  getNbrOfColumns: function() {
    var result = GridView.DEFAULT_COLUMNS;
    try {
      var nivo = this.getNivo();
      if (nivo < -3) { result = 6; }
      if (nivo < -4) { result = 7; }
      if (nivo < -5) { result = 8; }
    } catch(error) {
      Utils.alert("GridRange/getNbrOfColumns Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  reset: function() {
    this.index = this.getFrom() - 1;
    return this;
  },
  getNext: function() {
    var result = false;
    try {
      if (this.index < this.getFrom()) {
        this.index = this.getFrom();
        result = true;
      } else if (this.getIndex() < this.getUntil()) {
        this.index++;
        result = true;
      }
    } catch(error) {
      Utils.alert("GridRange/getNext Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getIndex: function() {
    var result = null;
    try {
      result = this.index;
      if (this.index < this.getFrom()) {
        result = this.getFrom();
      }
    } catch(error) {
      Utils.alert("GridRange/getIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getColumnNumber: function(nivo) {
    var result = Position.COLUMN_FIRST();
    try {
    /*if (this.getFrom() < Position.NIVO_ROOT() && nivo > Position.NIVO_ROOT()) {
        result++;
      }*/
    //result += (nivo + this.getFrom());
      result = (Math.abs(this.getFrom() - nivo));
    } catch(error) {
      Utils.alert("GridRange/getColumnNumber Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }, 
  getNextColumnHeader: function() {
    var result = '**';
    try {
      if (this.next()) {
        result = '' + this.getIndex();         
      }
    } catch(error) {
      Utils.alert("GridRange/getNextColumnHeader Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }, 
  getFrom: function() {
    var result = Position.NIVO_COLUMN_FIRST();
    try {
      //For -4 < nivo <  2 : from = -3
      //For      nivo < -3 : from = nivo
      //For      nivo >  1 : from = nivo - 4
      if ((this.getNivo() < Position.NIVO_COLUMN_FIRST()) || (this.getNivo() > 1)) {
        if (this.getNivo() < Position.NIVO_ROOT()) {
          result = this.getNivo();
        } else {
          result = this.getNivo() - 4;
        }
      }
      //Limits!
      //Lower (where_used): -15
      if (result < Position.WHERE_MAX()) {
        result = Position.WHERE_MAX(); 
      }
      //Upper (what_used): 21 (25 - 4)
      if (result > (Position.WHAT_MAX() - 4)) {
        result = (Position.WHAT_MAX() - 4);
      }
    } catch(error) {
      Utils.alert("GridRange/getFrom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getUntil: function() {
    var result = (this.getFrom() + (this.getNbrOfColumns() - 1));
    try {
      var from = this.getFrom();
      if (from >= Position.NIVO_COLUMN_FIRST()) {
        result = (from + 4);
      } else if (from >= -6) {
        result = (from + Math.abs(from) + 1);
      }
    } catch(error) {
      Utils.alert("GridRange/getUntil Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = 'GridRange:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("GridRange/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});

//Class: SavedLocation
var SavedLocation = new Class({
  Extends: SjamayeeBase,
  
  initialize: function(savedCell,topCell) {
    try {
      this.parent();
      if (savedCell !== undefined) {
        this.setSavedCell(savedCell);
      }
      if (topCell !== undefined) {
        this.setTopCell(topCell);
      }
    } catch(error) {
      Utils.alert("SavedLocation/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  setSavedCell: function(savedCell) {
    if (savedCell) {
      this.savedCell = savedCell.clone();
    }
  },
  getSavedCell: function() {
    var result = null;
    if (this.savedCell !== undefined) {
      result = this.savedCell;
    }
    return result;
  },
  setTopCell: function(topCell) {
    if (topCell) {
      this.topCell = topCell.clone();
    }
  },
  getTopCell: function() {
    var result = null;
    if (this.topCell !== undefined) {
      result = this.topCell;
    }
    return result;
  }
});

////////////////////
// INITIALISATION //
////////////////////
_logger     = new Logger();
//_aq         = new AsyncQueue();
//_gridFocus  = SjamayeeForm.RIGHT;
_grid       = new Grid();
//_dataGrid   = new DataGrid();
//_modelGrid  = new ModelGrid();
