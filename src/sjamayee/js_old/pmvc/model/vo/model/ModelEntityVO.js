var ModelEntityVO = function() {
  this.Extends = EntityVO;

	this.tid = null;

	this.initialize = function(id,name,desc,tid,oid,firstAttributes,references) {
		try {
			this.parent(id,name,desc,oid,firstAttributes,references);
			if (tid !== null)
				this.tid = tid;
		} catch(error) {
			Utils.alert("ModelEntityVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ModelEntityVO = new Class(new ModelEntityVO());
