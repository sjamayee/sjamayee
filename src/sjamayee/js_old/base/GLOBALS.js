//////////////////////////////
// GLOBAL VARIABLES - START //
//////////////////////////////
var _test             = false; //TEST ***
var _gridFocus        = null;
var _grid             = null;  //Grid
var _dataGrid         = null;  //DataGrid
var _modelGrid        = null;  //ModelGrid
var _tc               = null;  //TypeCache
var _mec              = null;  //ModelEntityCache
var _mrc              = null;  //ModelRelationCache
var _ec               = null;  //EntityCache
var _rc               = null;  //RelationCache
var _sc               = null;  //SettingCache
var _oc               = null;  //ObjectCache
var _oe               = null;  //Original Entity ListCache
var _kb               = null;  //Keyboard
var _aq               = null;  //AsyncQueue
var _parentRelation   = null;
var _childRelation    = null;
var _previousRelation = null;
var _currentRelation  = null;
var _nextRelation     = null;
var _object           = null;
var _id               = 1000;
var _sourceName       = null;
var _groupId          = null;
var _cNc              = 0;		 //Counter for Navigation commands

var _cf               = null;  //CURRENT FORM
var _of               = null;  //ObjectsForm
var _rf               = null;  //RelationsForm

var _logger 					= null;	 //Logger
var _ste              = null;  //Simple Text Editor
////////////////////////////
// GLOBAL VARIABLES - END //
////////////////////////////

//////////////////////////// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
//////////////////////////// VVVVVV THIS HAS TO MOVE TO A CORRECT PLACE !!! VVVVV
//////////////////////////// VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
////////////////////////////
// Application Demo Data. //
////////////////////////////
var _types = null;
var _modelEntities = null;
var _modelRelations = null;
var _dataEntities = null;
var _dataRelations = null;

//////////////////////////////
// Keyboard event key codes //
//////////////////////////////
//Possible Event key codes:
// backspace =
// delete =
// down = 40
// enter =
// esc = 27
// left = 37
// right = 39
// space = 32
// tab =
// up = 38
//Additional Event key codes:
Event.Keys.pup = 33;
Event.Keys.pdn = 34;
Event.Keys.end = 35;
Event.Keys.home = 36;
