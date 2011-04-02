var ModelObjectsListLeft = function() {
  this.Extends = ObjectsListLeft;

	this.initialize = function(name,properties) {
		this.parent(ModelObjectsListLeft.ID, properties);
	};
};
ModelObjectsListLeft = new Class(new ModelObjectsListLeft());
ModelObjectsListLeft.ID = "modelObjectsListLeft";
