//Abstract
var ObjectsHeaderMediator = function() {
	this.Extends = SjamayeeMediator;
	this.typeNameSelected = null;
	this.typeSelected = null;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		//this.onRelationsMouseover = this.onRelationsMouseover.bindWithEvent(this);
		this.onObjectsRefOpChange = this.onObjectsRefOpChange.bindWithEvent(this);
		this.onObjectsTypeChange = this.onObjectsTypeChange.bindWithEvent(this);
		this.onObjectsFilterClick = this.onObjectsFilterClick.bindWithEvent(this);
		this.onObjectsFilterChange = this.onObjectsFilterChange.bindWithEvent(this);
		this.onObjectsFilterCaseClick = this.onObjectsFilterCaseClick.bindWithEvent(this);
		var header = this.getViewComponent();
		//header.addEvent(SjamayeeFacade.GRID_MOUSEOVER, this.onRelationsMouseover);
		header.addEvent(SjamayeeFacade.OLIST_REFOP_CHANGE, this.onObjectsRefOpChange);
		header.addEvent(SjamayeeFacade.OLIST_TYPE_CHANGE, this.onObjectsTypeChange);
		header.addEvent(SjamayeeFacade.OLIST_FILTER_CLICK, this.onObjectsFilterClick);
		header.addEvent(SjamayeeFacade.OLIST_FILTER_CHANGE, this.onObjectsFilterChange);
		header.addEvent(SjamayeeFacade.OLIST_FILTER_CASE_CLICK, this.onObjectsFilterCaseClick);
		//Initialize SelectLists.
		header.typeSelect.innerHTML = ModelType.getTypeOptions();
	};

	//this.onRelationsMouseover = function()  {	alert("ObjectsHeaderMediator/onRelationsMoueOver"); };
	this.onObjectsRefOpChange = function()  { alert("ObjectsHeaderMediator/onObjectsRefOpChange"); };
	this.onObjectsTypeChange = function()	  { alert("ObjectsHeaderMediator/onObjectsTypeChange"); };
	this.onObjectsFilterClick = function()  { alert("ObjectsHeaderMediator/onObjectsFilterClick"); };

	this.onObjectsFilterChange = function() {
	  this.onObjectsFilterClick();
	};
	this.onObjectsFilterCaseClick = function() {
    if (this.getViewComponent().filter.value.length > 0) {
	    this.onObjectsFilterClick();
	  }
	};

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

	this.getEntityFilterValue = function() {
	  return this.getViewComponent().filter.value;
	};

	this.getEntityFilterCase = function() {
	  return this.getViewComponent().filterCaseCheckBox.checked;
	};
};
ObjectsHeaderMediator = new Class(new ObjectsHeaderMediator());
