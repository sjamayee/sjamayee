var ModelObjectNTD = function() {
  this.Extends = ObjectNTD;

	this.initialize = function() {
	  this.parent(ModelObjectNTD.ID);
  };
};
ModelObjectNTD = new Class(new ModelObjectNTD());
ModelObjectNTD.ID = "modelObjectNTD";
//ModelObjectNTD.HEADER_ID = ModelObjectNTD.ID+ObjectNTD.HEADER_ID;
