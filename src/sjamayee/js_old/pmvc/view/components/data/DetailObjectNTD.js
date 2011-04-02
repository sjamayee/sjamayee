var DataObjectNTD = function() {
  this.Extends = ObjectNTD;

	this.initialize = function() {
	  this.parent(DataObjectNTD.ID);
  };
};
DataObjectNTD = new Class(new DataObjectNTD());
DataObjectNTD.ID = "dataObjectNTD";
//DataObjectNTD.HEADER_ID = DataObjectNTD.ID+ObjectNTD.HEADER_ID;
