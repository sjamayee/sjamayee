var DataChildNTD = function() {
  this.Extends = ChildNTD;
  this.buttons = null;

	this.initialize = function() {
	  this.parent(DataChildNTD.ID);
	};
};
DataChildNTD = new Class(new DataChildNTD());
DataChildNTD.ID = "dataChildNTD";
DataChildNTD.HEADER_ID = DataChildNTD.ID+ChildNTD.HEADER_ID;
