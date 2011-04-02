var ModelObjectsListRight = function() {
  this.Extends = ObjectsListRight;

	this.initialize = function(name,properties) {
		this.parent(ModelObjectsListRight.ID, properties);
	};
};
ModelObjectsListRight = new Class(new ModelObjectsListRight());
ModelObjectsListRight.ID = "modelObjectsListRight";
