var ModelAttributeVO = function() {
  this.Extends = AttributeVO;

	this.initialize = function(id,name,value) {
		try {
			this.parent(id,name,value);
		} catch(error) {
			Utils.alert("ModelAttributeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ModelAttributeVO = new Class(new ModelAttributeVO());
