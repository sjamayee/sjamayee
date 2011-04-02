var GridListRight = function() {
  this.Extends = SjamayeeUIComponent;

	this.dataObjectsList = null;
	this.dataRelationsGrid = null;
	this.modelObjectsList = null;
	this.modelObjectsTextsEditor = null;
	this.modelRelationsGrid = null;
	this.modelRelationsTextsEditor = null;

	this.initialize = function(name,properties) {
		var html = '<div id="'+DataObjectsListRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
		           '<div id="'+DataRelationsGridRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
		           '<div id="'+ModelObjectsListRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
							 '<div id="'+ModelObjectsTextsEditorRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
							 '<div id="'+ModelRelationsGridRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
							 '<div id="'+ModelRelationsTextsEditorRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>';
		this.parent(GridListRight.ID, {html: html});
	};

  this.initializeChildren = function() {
	//alert("GridListRight/initializeChildren");
		this.dataObjectsList = new DataObjectsListRight();
		this.addChild(this.dataObjectsList);
		this.dataRelationsGrid = new DataRelationsGridRight();
		this.addChild(this.dataRelationsGrid);
		this.modelObjectsList = new ModelObjectsListRight();
		this.addChild(this.modelObjectsList);
		this.modelObjectsTextsEditor = new ModelObjectsTextsEditorRight();
		this.addChild(this.modelObjectsTextsEditor);
		this.modelRelationsGrid = new ModelRelationsGridRight();
		this.addChild(this.modelRelationsGrid);
		this.modelRelationsTextsEditor = new ModelRelationsTextsEditorRight();
		this.addChild(this.modelRelationsTextsEditor);
  };
};
GridListRight = new Class(new GridListRight());
GridListRight.ID = "listPaneRight";
GridListRight.CLASS_ID = "listRight";
