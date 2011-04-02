var DataAttributeVO = function() {
  this.Extends = AttributeVO;
  //ADD (model attribute id) !!!
  //this.mai = null;
  
	this.initialize = function(id,name,value) {
		try {
			this.parent(id,name,value);
		} catch(error) {
			Utils.alert("DataAttributeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
DataAttributeVO = new Class(new DataAttributeVO());
