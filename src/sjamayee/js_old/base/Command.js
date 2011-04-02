//Abstract
////////////////////////////////////////////////////////////////////
//HAS NOTHING TODO WITH PMVC CONTRLLER COMMAND = SJAMAYEE_COMMAND //
////////////////////////////////////////////////////////////////////
var Command = function(name) {
	this.Extends = SjamayeeBase;
	this.initialize = function(name) {
		try {
			this.parent();
			this.setName(name);
		} catch(error) {
			Utils.alert("Command/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getId = function() {
		var result = null;
		if (this.id !== undefined) {
			result = this.id;
		}
		return result;
	};
	this.setId = function(id) {
		if (id !== null) {
			this.id = id;
		}
		return this;
	};
	this.getName = function() {
		var result = null;
		if (this.name !== undefined) {
			result = this.name;
		}
		return result;
	};
	this.setName = function(name) {
		if (name !== null) {
			this.name = name;
		}
		return this;
	};
	this.getSourceName = function() {
		var result = null;
		if (this.sourceName !== undefined) {
			result = this.sourceName;
		}
		return result;
	};
	this.setSourceName = function(sourceName) {
		if (sourceName !== null) {
			this.sourceName = sourceName;
		}
		return this;
	};
	this.getGroupName = function() {
		var result = null;
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			if (this.getGroupId()) {
				result = sourceName.substr(0,3)+"_"+this.getGroupId();
			} else {
				result = sourceName;
			/*var s = sourceName.split("/");
				if (s.length > 1) {
					result = s[0];
				}*/
				var s = sourceName.split("/");
				if (s.length > 0) {
					result = s[0];
				}			
			}
		}
		return result;
	};
	this.getSnapShot = function() {
		var result = null;
		if (this.snapShot !== undefined) {
			result = this.snapShot;
		}
		return result;
	};
	this.setSnapShot = function(snapShot) {
		if (snapShot !== null) {
			this.snapShot = snapShot;
		}
		return this;
	};
	this.setPosition = function(position) {
		if (position) {
	 		this.position = position.clone();
		}
	  return this;
	};
	this.getPosition = function() {
		var result = null;
		if (this.position !== undefined) {
			result = this.position;
		}
	  return result;
	};
	this.setNivo = function(nivo) {
		if (nivo !== null) {
	  	this.nivo = nivo;
		}
	  return this;
	};
	this.getNivo = function() {
		var result = Position.NIVO_ROOT();
		if (this.nivo !== undefined) {
			result = this.nivo;
		}
	  return result;
	};
	this.getUnDone = function() {
		var result = false;
		if ((this.unDone !== undefined) && (this.unDone !== null)) {
			result = this.unDone;
		}
		return result;
	};
	this.setUnDone = function(unDone) {
		if (unDone !== null) {
			this.unDone = unDone;
		}
		return this;
	};
	this.isDone = function() {
		//return ((this.getName() == Command.CKP)?false:(this.getUnDone() === false));
		//return ((this.getName() in Utils.arrayHash([Command.CKP,Command.NAV]))?false:(this.getUnDone() === false));
		var result = false;
		if (this.getName() == Command.CKP) {
			result = false;
		} else if (this.getName() == Command.NAV) {
			result = true;
		} else {
			result = (this.getUnDone() === false);
		}
		return result;
	};
	this.isUnDone = function() {
		//return ((this.getName() == Command.CKP)?false:(this.getUnDone() === true));
		//return ((this.getName() in Utils.arrayHash([Command.CKP,Command.NAV]))?false:(this.getUnDone() === true));
		var result = false;
		if (this.getName() == Command.CKP) {
			result = false;
		} else if (this.getName() == Command.NAV) {
			result = true;
		} else {
			result = (this.getUnDone() === true);
		}
		return result;
	};
	this.getGroupId = function() {
		var result = null;
	/*if (this.groupId !== undefined) {
			result = this.groupId;
		}*/
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			var s = sourceName.split("_");
			if (s.length > 1) {
				var s1 = s[1];
				if (s1) {
					var groupId = s1;
					var g = s1.split("/");
					if (g.length > 1) {
						groupId = g[0];
					}
					result = groupId;
				}
			}			
		}
		return result;
	};
	//Functions
	//Abstract
	this.clone = function() {
		Utils.alert("Command/clone - abstract.");
		return undefined;
	};
	this.inSameGroup = function(command) {
		Utils.alert("Command/inSameGroup");
		var result = false;
		try {
			if (command) {
				var groupName1 = this.getGroupName();
				if (groupName1) {
					if (groupName1.substr(0,3) != Command.GRP) {
						groupName1 = this.getSourceName();
					}			
					var groupName2 = command.getGroupName();
					if (groupName2) {
						if (groupName2.substr(0,3) != Command.GRP) {
							groupName2 = command.getSourceName();
						}
						result = (groupName1 == groupName2);
					}
				}			
			}
		} catch(error) {
			Utils.alert("Command/inSameGroup Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.getSeq1Id = function() {
		var result = "0";
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			var s = sourceName.split("/");
			if (s.length > 1) {
				//Split x.y => x = seq1Id / y = seq2Id
				result = s[1];
				var r = result.split(".");
				if (r.length > 1) {
					result = r[0];
				}				
			}
		}
		if (result == "0") {
			result = this.getId();
		}
		return result;
	};
	this.getSeq2Id = function() {
		var result = "0";
		var sourceName = this.getSourceName();
		if (sourceName !== null) {
			var s1 = sourceName.split("/");
			if (s1.length > 1) {
				//Split x.y => x = seq1Id / y = seq2Id
				result = s1[1];
				var r = result.split(".");
				if (r.length > 1) {
					result = r[1];
				}				
			}
		}
		return result;
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Command:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Command/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Command = new Class(new Command());
//Statics
Command.CHAR_INITIAL = "&nbsp;"; //Initial space
Command.CHAR_A = "A"; 			//Add
Command.CHAR_a = "a"; 			//add
Command.CHAR_C = "C"; 			//Copy
Command.CHAR_c = "c"; 			//copy
Command.CHAR_E = "E"; 			//Edit
Command.CHAR_e = "e"; 			//edit
Command.CHAR_N = "&nbsp;";  //"N"; 			//Navigate
//Command.CHAR_n = "&nbsp;";	//nav = space 
//Command.CHAR_n = null;			//nav = null 
Command.CHAR_n = "n";				//navigate
Command.CHAR_T = "T"; 			//exTract
Command.CHAR_t = "t"; 			//extract
Command.CHAR_V = "&nbsp;";  //"V"; 			//Paste
Command.CHAR_v = "&nbsp;";  //"v"; 			//paste
Command.CHAR_X = "X"; 			//Delete
Command.CHAR_x = "x"; 			//delete
Command.CHAR_Z = "Z"; 			//Z..
///////////////////////////////////////////////////
//      Real Commands: ADD,DEL,EDT,EXT,CPY 			 //
//    Unreal Commands: PST								 			 //
//   Virtual Commands: GRP,UND,RDO				 			 //
//CheckPoint Commands: CKP								 			 //
//      Root Commands: ROOT 							 			 //
//Navigation Commands: NAV - enter,space,click,  //
//													 up,down,left,right, //
//													 top,bottom,home,end //
///////////////////////////////////////////////////
//Real Commands (works on the grid or takes info from the grid)
Command.ADD  = "ADD";		//Add relation and save a copy in the copy_buffer.
Command.CPY  = "CPY";		//Copy relation into copy_buffer.
Command.DEL  = "DEL";		//Delete relation and save a copy in the copy_buffer.
Command.EDT  = "EDT";		//Edit relation and save a copy in the copy_buffer.
Command.EXT  = "EXT";		//Extract relation (child relations) into the copy_buffer.
//Unreal Commands (works with the result of the real commands)
Command.PST  = "PST";		//Paste content (relations) from copy_buffer.
//Virtual Commands (these commands are not stored in the commandBuffer)
Command.GRP  = "GRP";		//Group command.
Command.RDO  = "RDO";		//Redo commands from redo_buffer.
Command.UDO  = "UDO";		//Undo commands from redo_buffer.
//CheckPoint Commands (creates removable chunks in the commandBuffer)
Command.CKP	 = "CKP";		//Checkpoint for clean-up of commands from buffers.
//Root Commands (keeps history of the root switches with snapshots of the grid)
Command.ROOT = "ROOT";	//Switch root.
//Navgation commands (works on the grid and the other lists - objects,attributes)
//these commands are wiped-out by the commands (ADD,CPY,DEL,EDT,EXT,PST).
Command.NAV = "NAV";
//Command.NOOP = "NOOP";
