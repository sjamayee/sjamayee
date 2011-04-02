var ModelTypeVO = function() {
  this.Extends = CachedObjectVO;

	this.type = "";
	this.name = "";
	this.desc = "";
	this.inUse = false;
	this.sjamayee = false;
	this.objekt = "";

	this.initialize = function(id,type,name,desc,objekt,inUse) {
		try {
			this.parent(id);
			if (type !== null)
				this.type = type;
			if (name !== null)
				this.name = name;
			if (desc !== null)
				this.desc = desc;
			if (objekt !== null)
				this.objekt = objekt;
			if (inUse !== null)
				this.inUse = inUse;
		} catch(error) {
			Utils.alert("ModelTypeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ModelTypeVO = new Class(new ModelTypeVO());
