var ModelParentNTD = function() {
  this.Extends = ParentNTD;

	this.initialize = function() {
	  this.parent(ModelParentNTD.ID);
	};
};
ModelParentNTD = new Class(new ModelParentNTD());
ModelParentNTD.ID = "modelParentNTD";
//ModelParentNTD.HEADER_ID = ModelParentNTD.ID+ParentNTD.HEADER_ID;
