var ModelObjectsHeader = function() {
  this.Extends = ObjectsHeader;

	this.initialize = function() {
		this.parent(ModelObjectsHeader.ID);
	};
};
ModelObjectsHeader = new Class(new ModelObjectsHeader());
ModelObjectsHeader.ID = "modelObjectsHeader";
