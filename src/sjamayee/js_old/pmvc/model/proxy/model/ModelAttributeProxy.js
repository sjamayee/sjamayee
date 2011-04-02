var ModelAttributeProxy = function() {
  this.Extends = AttributeProxy;

	this.initialize = function() {
		this.parent(ModelAttributeProxy.ID);
		this.addItem(new ModelAttributeVO("1","name1", "value1"));
	};
	
  this.getListObject = function(modelAttributeVO) {
    return new ModelAttribute(modelAttributeVO);
  };
};
ModelAttributeProxy = new Class(new ModelAttributeProxy());
ModelAttributeProxy.ID = "ModelAttributeProxy";
