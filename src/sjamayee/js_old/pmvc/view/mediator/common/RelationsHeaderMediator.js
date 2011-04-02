//Abstract
var RelationsHeaderMediator = function() {
	this.Extends = SjamayeeMediator;
	this.typeNameSelected = null;
	this.typeSelected = null;
	this.entityNameSelected = null;
	this.entitySelected = null;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.onRelationsEntityChange = this.onRelationsEntityChange.bindWithEvent(this);
		this.onRelationsTypeChange = this.onRelationsTypeChange.bindWithEvent(this);
		this.onRelationsFilterClick = this.onRelationsFilterClick.bindWithEvent(this);
		this.onRelationsFilterKeydown = this.onRelationsFilterKeydown.bindWithEvent(this);
		this.onRelationsFilterChange = this.onRelationsFilterChange.bindWithEvent(this);
		this.onRelationsFilterCaseClick = this.onRelationsFilterCaseClick.bindWithEvent(this);
		this.onRootUndoClick = this.onRootUndoClick.bindWithEvent(this);
		this.onRootSelectClick = this.onRootSelectClick.bindWithEvent(this);
		this.onRootRedoClick = this.onRootRedoClick.bindWithEvent(this);
		var header = this.getViewComponent();
		header.addEvent(SjamayeeFacade.GRID_ENTITY_CHANGE, this.onRelationsEntityChange);
		header.addEvent(SjamayeeFacade.GRID_TYPE_CHANGE, this.onRelationsTypeChange);
		header.addEvent(SjamayeeFacade.GRID_FILTER_CLICK, this.onRelationsFilterClick);
		header.addEvent(SjamayeeFacade.GRID_FILTER_KEYDOWN, this.onRelationsFilterKeydown);
		header.addEvent(SjamayeeFacade.GRID_FILTER_CHANGE, this.onRelationsFilterChange);
		header.addEvent(SjamayeeFacade.GRID_FILTER_CASE_CLICK, this.onRelationsFilterCaseClick);
		header.addEvent(SjamayeeFacade.ROOT_UNDO, this.onRootUndoClick);
		header.addEvent(SjamayeeFacade.ROOT_SELECT, this.onRootSelectClick);
		header.addEvent(SjamayeeFacade.ROOT_REDO, this.onRootRedoClick);
		//Initialize SelectLists.
	  header.typeSelect.innerHTML = ModelType.getTypeOptions();
	};

	this.onRelationsEntityChange = function()			{	alert("RelationsHeaderMediator/onRelationsEntityChange"); };
	this.onRelationsTypeChange = function()       { alert("RelationsHeaderMediator/onRelationsTypeChange"); };
	this.onRelationsFilterClick = function()      { alert("RelationsHeaderMediator/onRelationsFilterClick"); };

	this.onRelationsFilterKeydown = function(evt)	{
		var nivo = evt.target.value;
	//alert("RelationsHeaderMediator/onRelationsFilterKeydown - nivo: "+nivo);
		//var relationsGridMediator = this.facade.retrieveMediator(RelationsGridMediator.ID);
		//relationsGridMediator.setCurrentNivo(nivo);
	};
	
	this.onRelationsFilterChange = function() {
    this.onRelationsFilterClick();
	};
	
	this.onRelationsFilterCaseClick = function() {
    if (this.getViewComponent().filter.value.length > 0) {
      this.onRelationsFilterClick();
    }
	};	
	this.onRootUndoClick = function()   { alert("RelationsHeaderMediator/onRootUndoClick"); };
	this.onRootSelectClick = function()	{ alert("RelationsHeaderMediator/onRootSelectClick"); };
	this.onRootRedoClick = function()   { alert("RelationsHeaderMediator/onRootRedoClick"); };

	this.hide = function() {
		var dataObjectsHeader = this.facade.retrieveMediator(DataObjectsHeaderMediator.ID).getViewComponent();
		dataObjectsHeader.setAttribute("style","display:none;");
		var dataRelationsHeader = this.facade.retrieveMediator(DataRelationsHeaderMediator.ID).getViewComponent();
		dataRelationsHeader.setAttribute("style","display:none;");
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {		
		  var modelObjectsHeader = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID).getViewComponent();
		  modelObjectsHeader.setAttribute("style","display:none;");
		  var modelObjectsTextsHeader = this.facade.retrieveMediator(ModelObjectsTextsHeaderMediator.ID).getViewComponent();
		  modelObjectsTextsHeader.setAttribute("style","display:none;");
		  var modelRelationsHeader = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID).getViewComponent();
		  modelRelationsHeader.setAttribute("style","display:none;");
		  var modelRelationsTextsHeader = this.facade.retrieveMediator(ModelRelationsTextsHeaderMediator.ID).getViewComponent();
		  modelRelationsTextsHeader.setAttribute("style","display:none;");
		}
	};

	this.getTypeSelected = function() {
	  if (this.typeSelected === null) {
	    this.typeSelected = ModelType.getByName(this.typeNameSelected);
	  }
	  return this.typeSelected;
	};

	this.getTypeNameSelected = function() {
	  return this.typeNameSelected;
	};

	this.setTypeNameSelected = function(typeName) {
	  if (this.typeNameSelected) {
	    if (this.typeNameSelected != typeName) {
	      this.typeSelected = null;
	    }
	  }
	  this.typeNameSelected = typeName;
	};

	this.getEntityNameSelected = function() {
	  return this.entityNameSelected;
	};

	this.setEntityNameSelected = function(entityName) {
	  if (this.entityNameSelected) {
	    if (this.entityNameSelected != entityName) {
	      this.setEntitySelected(null);
	    }
	  }
	  this.entityNameSelected = entityName;
	};

	this.getEntitySelected = function() {
	  return this.entitySelected;
	};

	this.setEntitySelected = function(entity) {
	  this.entitySelected = entity;
	};

	this.getEntityFilterValue = function() {
	  return this.getViewComponent().filter.value;
	};

	this.getEntityFilterCase = function() {
	  return this.getViewComponent().filterCaseCheckBox.checked;
	};
};
RelationsHeaderMediator = new Class(new RelationsHeaderMediator());
