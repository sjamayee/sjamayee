var DataTypeVO = function() {
  this.Extends = ModelTypeVO;

	this.initialize = function(id,type,name,desc,objekt,inUse) {
		try {
			this.parent(id,type,name,desc,objekt,inUse);
		} catch(error) {
			Utils.alert("DataTypeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
DataTypeVO = new Class(new DataTypeVO());
