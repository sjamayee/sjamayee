var ModelObjectsTextsHeader = function() {
  this.Extends = ObjectsTextsHeader;

	this.initialize = function() {
		this.parent(ModelObjectsTextsHeader.ID);
	};
};
ModelObjectsTextsHeader = new Class(new ModelObjectsTextsHeader());
ModelObjectsTextsHeader.ID = "modelObjectsTextsHeader";
