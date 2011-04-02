var ModelRelationsHeaderMediator = function() {
	this.Extends = RelationsHeaderMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelRelationsHeaderMediator.ID,viewComponent);
		var header = this.getViewComponent();
	/*alert("ModelRelationsHeaderMediator - initialize:"+
		      "\n"+header.dataModelSelect.id+
		      "\n"+header.entitySelect.id+
		      "\n"+header.typeSelect.id+
		      "\n"+header.filter.id+
		      "\n"+header.filterButton.id+
		      "\n"+header.rootUndoButton.id+
		      "\n"+header.rootSelectButton.id+
		      "\n"+header.rootRedoButton.id+
		      "\n"+header.columnsSelect.id+
		      "\n"+header.settingSelect.id+
		      "\n"+header.settingButton.id+
		      "\n"+header.helpLink.id);*/
    //Initialize Select Lists.
		header.entitySelect.innerHTML = ModelEntity.getEntityOptions();
	};

	this.onRelationsEntityChange = function()			{	
    var entityName = this.getViewComponent().entitySelect.value;
    //var entityName = entityName.split('&nbsp;',1)[0];
		//alert("ModelRelationsHeaderMediator/onRelationsEntityChange - entityName: "+entityName);
    this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,entityName);
	};
	this.onRelationsTypeChange = function() {
    var typeName = this.getViewComponent().typeSelect.value;	  
		//alert("ModelRelationsHeaderMediator/onRelationsTypeChange - typeName: "+typeName);
    this.sendNotification(SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,typeName);
	};
	this.onRelationsFilterClick = function() {
    this.onRelationsTypeChange();
	  this.sendNotification(SjamayeeFacade.GRID_MODEL_FILTER_CLICK);
	};
	this.onRootUndoClick = function()   { this.sendNotification(SjamayeeFacade.MODEL_ROOT_UNDO); };
	this.onRootSelectClick = function()	{ this.sendNotification(SjamayeeFacade.MODEL_ROOT_SELECT); };
	this.onRootRedoClick = function()   { this.sendNotification(SjamayeeFacade.MODEL_ROOT_REDO);	};

	this.listNotificationInterests = function()	{
	  var result = this.parent();
		return result.concat([
			SjamayeeFacade.GRID_MODEL_HEADER_SHOW,
    	SjamayeeFacade.GRID_MODEL_TYPE_SET,
			SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,
			SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_MODEL_HEADER_SHOW:
		  //alert("ModelRelationsHeaderMediator/handleNotification - GRID_MODEL_HEADER_SHOW");
			this.hide();
			header.setAttribute("style","display:block;");
			break;
      case SjamayeeFacade.GRID_MODEL_TYPE_SET:
    	var typeName = note.getBody();
    	//alert("ModelRelationsHeaderMediator/handleNotification - GRID_MODEL_TYPE_SET - typeName: "+typeName);
      header.typeSelect.selectedIndex = Header.MODEL_TYPE_SELECT_ALL_TYPES_INDEX;
      break;
			case SjamayeeFacade.GRID_MODEL_TYPE_CHANGE:
      var typeName = note.getBody();
		  //alert("ModelRelationsHeaderMediator/handleNotification - GRID_MODEL_TYPE_CHANGE - typeName: "+typeName);
  	  this.setTypeNameSelected(typeName);
  	  var oldEntityName = header.entitySelect.value;
  	  //var oldEntityName = oldEntityName.split('&nbsp;',1)[0];
		  header.entitySelect.innerHTML = ModelEntity.getEntityOptions(typeName,oldEntityName,this.getEntityFilterValue(),this.getEntityFilterCase());
  	  var newEntityName = header.entitySelect.value;
      //var newEntityName = newEntityName.split('&nbsp;',1)[0];
  	  if (newEntityName != oldEntityName) {
  	    this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,newEntityName);
  	  }
			break;
			case SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE:
      var entityName = note.getBody();
		  //alert("ModelRelationsHeaderMediator/handleNotification - GRID_MODEL_ENTITY_CHANGE - entityName: "+entityName);
		  header.entitySelect.innerHTML = ModelEntity.getEntityOptions(this.getTypeNameSelected(),entityName,this.getEntityFilterValue(),this.getEntityFilterCase());
  	  this.setEntityNameSelected(entityName);
			break;
		}
	};
	
	this.getEntitySelected = function() {
	  var entitySelected = this.parent();
	  if (entitySelected === null) {
	    entitySelected = ModelEntity.getByName(this.getEntityNameSelected());
	    this.setEntitySelected(entitySelected);
	  }
	  return entitySelected;
	};
};
ModelRelationsHeaderMediator = new Class(new ModelRelationsHeaderMediator());
ModelRelationsHeaderMediator.ID = "ModelRelationsHeaderMediator";
