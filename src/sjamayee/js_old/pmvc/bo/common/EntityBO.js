//Abstract
//Class: EntityBO
var EntityBO = function() {
	this.Extends = BusinessObject;
	
	this.initialize = function(vo) {
		try {
			this.parent(vo);
  		this.setName(vo.name);
  		this.setDesc(vo.desc);
			this.setOid(vo.oid);
			//this.setSfdcObject(null);
			//this.setAttributeValues(null);
			this.setExpanded(false);
			this.setReferences(vo.references);
		} catch(error) {
			Utils.alert("EntityBO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	this.getName = function() {
		return this.name;
	};
	this.getNameTranslated = function() {
		var result = this.getName();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	};
	this.setName = function(name) {
		if (name !== null) {
			this.name = name;
		}
	};
	this.getName50 = function() {
	  var result = this.getName().substr(0,50);
	  //var i = result.length;
	  //while (i++ < 50) { result += "&nbsp;"; }
	  return result;
	};
	this.getDesc = function() {
		var result = null;
		if (this.desc !== undefined) {
			result = this.desc;
		}
		return result;
	};
	this.getDescTranslated = function() {
		var result = this.getDesc();
		if (result) {
			result = Utils.translate(result,"es");
		}
		return result;
	};
	this.setDesc = function(desc) {
		if (desc !== null) {
			this.desc = desc;
		}
	};
	this.getOid = function() {
		var result = null;
		if ((this.oid !== undefined) && (this.oid !== null)) {
			result = this.oid.substr(0,BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setOid = function(oid) {
		if (oid !== null) {
			if ((oid !== undefined) && (oid != 'null')) {
				this.oid = oid;
			}
		}
	};
	this.getReferences = function() {
		var result = BusinessObject.RELATIONS_UNDEFINED;
		if ((this.references !== undefined) && (this.references !== null)) {
			result = this.references;
		}
		return result;
	};
	this.setReferences = function(references) {
		if (references !== null) {
			this.references = references;
		}
	};
	this.getFirstAttributes = function() {
		return [];
	};
	this.setExpanded = function(expanded) {
		if (expanded !== null) {
			this.expanded = expanded;
			this.attributeList = null;
		}
	};
	this.isEditable = function() {
		Utils.alert("EntityBO/isEditable - this: "+this);
		var result = false;
		try {
			var t1 = Type.getById(this.getTid());
			if (t1) {
				if ((t1.getType().toUpperCase() == 'LEAD') ||
						(t1.getType().toUpperCase() == 'USER') ||
						(t1.getType().toUpperCase() == 'MAP') ||
						((t1 !== null) && (t1.isSjamayee() === true))) {
					result = true;
				}
			}
		} catch(error) {
			Utils.alert("EntityBO/isEditable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return true; //result;  // !!! FOR TEST !!!
		}
	};
	this.isScrollable = function() {
		Utils.alert("EntityBO/isScrollable");
		var result = false;
		//var typeObject = Type.getById(this.getTid());
		var typeObject = this.getTypeObject();
		if (typeObject) {
			result = (typeObject.isSjamayee() === true)?true:this.isExpanded();
		}
		return result;
	};
	this.isSjamayee = function() {
		var result = null;
		try {
			var typeObject = this.getTypeObject();
			if (typeObject) {
				result = typeObject.isSjamayee();
			}
		} catch (error) {
			Utils.alert("EntityBO/isSjamayee Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
EntityBO = new Class(new EntityBO());
//Statics
//States
EntityBO.STATE_PARENT = "PARENT";
EntityBO.STATE_CHILD = "CHILD";
EntityBO.STATE_OBJECT = "OBJECT";
//Parent
EntityBO.PARENT_NAME_ID = "parentName";
EntityBO.PARENT_NAME_ANCHOR_ID = EntityBO.PARENT_NAME_ID+"Anchor";
EntityBO.PARENT_NAME_TEXTAREA_ID = EntityBO.PARENT_NAME_ID+"TextArea";
EntityBO.PARENT_NAME_TEXTAREA_CLASS_ID = EntityBO.PARENT_NAME_ID+"TextArea";
EntityBO.PARENT_TYPE_ID = "parentType";
EntityBO.PARENT_TYPE_ANCHOR_ID = EntityBO.PARENT_TYPE_ID+"Anchor";
EntityBO.PARENT_DESC_ID = "parentDesc";
//EntityBO.PARENT_DESC_ANCHOR_ID = EntityBO.PARENT_DESC_ID+"Anchor";
EntityBO.PARENT_DESC_DISPLAY_ID = EntityBO.PARENT_DESC_ID+"Display";
EntityBO.PARENT_DESC_TEXTAREA_ID = EntityBO.PARENT_DESC_ID+"TextArea";
EntityBO.PARENT_DESC_TEXTAREA_CLASS_ID = EntityBO.PARENT_DESC_ID+"TextArea";
EntityBO.PARENT_CBY_ID = "parentCby";
EntityBO.PARENT_CBY_ANCHOR_ID = EntityBO.PARENT_CBY_ID+"Anchor";
EntityBO.PARENT_MBY_ID = "parentMby";
EntityBO.PARENT_MBY_ANCHOR_ID = EntityBO.PARENT_MBY_ID+"Anchor";
//Child
EntityBO.CHILD_NAME_ID = "childName";
EntityBO.CHILD_NAME_ANCHOR_ID = EntityBO.CHILD_NAME_ID+"Anchor";
EntityBO.CHILD_NAME_TEXTAREA_ID = EntityBO.CHILD_NAME_ID+"TextArea";
EntityBO.CHILD_NAME_TEXTAREA_CLASS_ID = EntityBO.CHILD_NAME_ID+"TextArea";
EntityBO.CHILD_TYPE_ID = "childType";
EntityBO.CHILD_TYPE_ANCHOR_ID = EntityBO.CHILD_TYPE_ID+"Anchor";
EntityBO.CHILD_TYPE_SELECTION_ID = "CHILD_TYPE_SELECTION_ID";
EntityBO.CHILD_DESC_ID = "childDesc";
EntityBO.CHILD_DESC_ANCHOR_ID = EntityBO.CHILD_DESC_ID+"Anchor";
EntityBO.CHILD_DESC_EDIT_ID = EntityBO.CHILD_DESC_ID+"Edit";
EntityBO.CHILD_DESC_DISPLAY_ID = EntityBO.CHILD_DESC_ID+"Display";
EntityBO.CHILD_DESC_TEXTAREA_ID = EntityBO.CHILD_DESC_ID+"TextArea";
EntityBO.CHILD_DESC_TEXTAREA_CLASS_ID = EntityBO.CHILD_DESC_ID+"TextArea";             //TODO: parent - name, desc classes ???
EntityBO.CHILD_CBY_ID = "childCby";
EntityBO.CHILD_CBY_ANCHOR_ID = EntityBO.CHILD_CBY_ID+"Anchor";
EntityBO.CHILD_MBY_ID = "childMby";
EntityBO.CHILD_MBY_ANCHOR_ID = EntityBO.CHILD_MBY_ID+"Anchor";
//Object
EntityBO.OBJECT_NAME_ID = "objectName";
EntityBO.OBJECT_NAME_ANCHOR_ID = EntityBO.OBJECT_NAME_ID+"Anchor";
EntityBO.OBJECT_NAME_TEXTAREA_ID = EntityBO.OBJECT_NAME_ID+"TextArea";
EntityBO.OBJECT_NAME_TEXTAREA_CLASS_ID = EntityBO.OBJECT_NAME_ID+"TextArea";
EntityBO.OBJECT_TYPE_ID = "objectType";
EntityBO.OBJECT_TYPE_ANCHOR_ID = EntityBO.OBJECT_TYPE_ID+"Anchor";
EntityBO.OBJECT_TYPE_SELECTION_ID = "OBJECT_TYPE_SELECTION_ID";
EntityBO.OBJECT_DESC_ID = "objectDesc";
EntityBO.OBJECT_DESC_ANCHOR_ID = EntityBO.OBJECT_DESC_ID+"Anchor";
EntityBO.OBJECT_DESC_EDIT_ID = EntityBO.OBJECT_DESC_ID+"Edit";
EntityBO.OBJECT_DESC_DISPLAY_ID = EntityBO.OBJECT_DESC_ID+"Display";
EntityBO.OBJECT_DESC_TEXTAREA_ID = EntityBO.OBJECT_DESC_ID+"TextArea";
EntityBO.OBJECT_DESC_TEXTAREA_CLASS_ID = EntityBO.OBJECT_DESC_ID+"TextArea";
EntityBO.OBJECT_CBY_ID = "objectCby";
EntityBO.OBJECT_CBY_ANCHOR_ID = EntityBO.OBJECT_CBY_ID+"Anchor";
EntityBO.OBJECT_MBY_ID = "objectMby";
EntityBO.OBJECT_MBY_ANCHOR_ID = EntityBO.OBJECT_MBY_ID+"Anchor";

EntityBO.SFDC_OID = "page:sja_form:soid";
EntityBO.SFDC_OID_PARENT = "page:sja_form:sfdcOidParent";
EntityBO.SFDC_OID_CHILD = "page:sja_form:sfdcOidChild";
EntityBO.SFDC_OID_OBJECT = "page:sja_form:sfdcOidObject";

EntityBO.FILTER_ID = "entityFilter";
EntityBO.SELECT_ID = "selectionEntityPanel";
EntityBO.SELECTION_ID = "ENTITY_SELECTION_ID";
