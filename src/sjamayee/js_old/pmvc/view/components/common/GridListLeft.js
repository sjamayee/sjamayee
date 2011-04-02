var GridListLeft = function() {
  this.Extends = SjamayeeUIComponent;

	this.dataObjectsList = null;
	this.dataRelationsGrid = null;
	this.modelObjectsList = null;
	this.modelObjectsTextsEditor = null;
	this.modelRelationsGrid = null;
	this.modelRelationsTextsEditor = null;

	this.initialize = function(name,properties) {
		var html = '<div id="'+DataObjectsListLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
		           '<div id="'+DataRelationsGridLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
		           '<div id="'+ModelObjectsListLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
							 '<div id="'+ModelObjectsTextsEditorLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
							 '<div id="'+ModelRelationsGridLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
							 '<div id="'+ModelRelationsTextsEditorLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>';
		this.parent(GridListLeft.ID, {html: html});
	};

  this.initializeChildren = function() {
	//alert("GridListLeft/initializeChildren");
		this.dataObjectsList = new DataObjectsListLeft();
		this.addChild(this.dataObjectsList);
		this.dataRelationsGrid = new DataRelationsGridLeft();
		this.addChild(this.dataRelationsGrid);
		this.modelObjectsList = new ModelObjectsListLeft();
		this.addChild(this.modelObjectsList);
		this.modelObjectsTextsEditor = new ModelObjectsTextsEditorLeft();
		this.addChild(this.modelObjectsTextsEditor);
		this.modelRelationsGrid = new ModelRelationsGridLeft();
		this.addChild(this.modelRelationsGrid);
		this.modelRelationsTextsEditor = new ModelRelationsTextsEditorLeft();
		this.addChild(this.modelRelationsTextsEditor);
  };
};
GridListLeft = new Class(new GridListLeft());
GridListLeft.ID = "listPaneLeft";
GridListLeft.CLASS_ID = "listLeft";
