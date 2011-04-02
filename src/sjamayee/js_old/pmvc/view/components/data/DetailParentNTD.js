var DataParentNTD = function() {
  this.Extends = ParentNTD;

	this.initialize = function() {
	  this.parent(DataParentNTD.ID);
	};
};
DataParentNTD = new Class(new DataParentNTD());
DataParentNTD.ID = "dataParentNTD";
//DataParentNTD.HEADER_ID = DataParentNTD.ID+ParentNTD.HEADER_ID;
