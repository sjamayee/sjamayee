var DataRelationsHeader = function() {
  this.Extends = RelationsHeader;

	this.initialize = function() {
		this.parent(DataRelationsHeader.ID);
	};
};
DataRelationsHeader = new Class(new DataRelationsHeader());
DataRelationsHeader.ID = "dataRelationsHeader";
