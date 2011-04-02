var ModelRelationsHeader = function() {
  this.Extends = RelationsHeader;

	this.initialize = function() {
		this.parent(ModelRelationsHeader.ID);
	};
};
ModelRelationsHeader = new Class(new ModelRelationsHeader());
ModelRelationsHeader.ID = "modelRelationsHeader";
