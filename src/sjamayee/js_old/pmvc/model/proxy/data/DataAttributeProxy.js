var DataAttributeProxy = function() {
  this.Extends = AttributeProxy;

	this.initialize = function() {
		this.parent(DataAttributeProxy.ID);
		this.addItem(new DataAttributeVO("1","name1", "value1"));
	};
	
  this.getListObject = function(dataAttributeVO) {
    return new DataAttribute(dataAttributeVO);
  };	
};
DataAttributeProxy = new Class(new DataAttributeProxy());
DataAttributeProxy.ID = "DataAttributeProxy";
