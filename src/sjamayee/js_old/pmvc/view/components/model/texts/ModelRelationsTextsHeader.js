var ModelRelationsTextsHeader = function() {
  this.Extends = RelationsTextsHeader;

	this.initialize = function() {
		this.parent(ModelRelationsTextsHeader.ID);
	};
};
ModelRelationsTextsHeader = new Class(new ModelRelationsTextsHeader());
ModelRelationsTextsHeader.ID = "modelRelationsTextsHeader";
