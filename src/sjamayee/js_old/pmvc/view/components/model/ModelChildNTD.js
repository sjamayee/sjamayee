var ModelChildNTD = function() {
  this.Extends = ChildNTD;
  this.buttons = null;

	this.initialize = function() {
	  this.parent(ModelChildNTD.ID);
	};
};
ModelChildNTD = new Class(new ModelChildNTD());
ModelChildNTD.ID = "modelChildNTD";
ModelChildNTD.HEADER_ID = ModelChildNTD.ID+ChildNTD.HEADER_ID;
