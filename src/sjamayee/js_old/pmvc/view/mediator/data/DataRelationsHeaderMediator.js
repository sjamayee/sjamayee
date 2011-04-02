var DataRelationsHeaderMediator = function() {
	this.Extends = RelationsHeaderMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataRelationsHeaderMediator.ID,viewComponent);
		var header = this.getViewComponent();
    //Initialize Select Lists.
		header.entitySelect.innerHTML = DataEntity.getEntityOptions();
		header.typeSelect.innerHTML = DataType.getTypeOptions();		
	};

	this.onRelationsEntityChange = function()			{	
    var entityName = this.getViewComponent().entitySelect.value;
    //var entityName = entityName.split('&nbsp;',1)[0];
		//alert("DataRelationsHeaderMediator/onRelationsEntityChange - entityName: "+entityName);
    this.sendNotification(SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,entityName);
	};
	this.onRelationsTypeChange = function() {
    var typeName = this.getViewComponent().typeSelect.value;	  
		//alert("DataRelationsHeaderMediator/onRelationsTypeChange - typeName: "+typeName);
    this.sendNotification(SjamayeeFacade.GRID_DATA_TYPE_CHANGE,typeName);
	};
	this.onRelationsFilterClick = function() {
    this.onRelationsTypeChange();
	  this.sendNotification(SjamayeeFacade.GRID_DATA_FILTER_CLICK);
	};
	this.onRootUndoClick = function()   { this.sendNotification(SjamayeeFacade.DATA_ROOT_UNDO); };
	this.onRootSelectClick = function()	{ this.sendNotification(SjamayeeFacade.DATA_ROOT_SELECT); };
	this.onRootRedoClick = function()   { this.sendNotification(SjamayeeFacade.DATA_ROOT_REDO); };

	this.listNotificationInterests = function()	{
	  var result = this.parent();
		return result.concat([
			SjamayeeFacade.GRID_DATA_HEADER_SHOW,
    	SjamayeeFacade.GRID_DATA_TYPE_SET,
			SjamayeeFacade.GRID_DATA_TYPE_CHANGE,
			SjamayeeFacade.GRID_DATA_ENTITY_CHANGE
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_DATA_HEADER_SHOW:
		  //alert("DataRelationsHeaderMediator/handleNotification - GRID_DATA_HEADER_SHOW");
			this.hide();
			header.setAttribute("style","display:block;");
			break;
      case SjamayeeFacade.GRID_DATA_TYPE_SET:
    	var typeName = note.getBody();
    	//alert("DataRelationsHeaderMediator/handleNotification - GRID_DATA_TYPE_SET - typeName: "+typeName);
      header.typeSelect.selectedIndex = Header.DATA_TYPE_SELECT_ALL_TYPES_INDEX;
      break;
			case SjamayeeFacade.GRID_DATA_TYPE_CHANGE:
			var typeName = note.getBody();
		  //alert("DataRelationsHeaderMediator/handleNotification - GRID_DATA_TYPE_CHANGE - typeName: "+typeName);
  	  this.setTypeNameSelected(typeName);
  	  var oldEntityName = header.entitySelect.value;  	  
      //var oldEntityName = oldEntityName.split('&nbsp;',1)[0];
		  header.entitySelect.innerHTML = DataEntity.getEntityOptions(typeName,oldEntityName,this.getEntityFilterValue(),this.getEntityFilterCase());
  	  var newEntityName = header.entitySelect.value;
      //var newEntityName = newEntityName.split('&nbsp;',1)[0];
  	  if (newEntityName != oldEntityName) {
  	    this.sendNotification(SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,newEntityName);
  	  }
			break;
			case SjamayeeFacade.GRID_DATA_ENTITY_CHANGE:
			var entityName = note.getBody();
		  //alert("DataRelationsHeaderMediator/handleNotification - GRID_DATA_ENTITY_CHANGE - entityName: "+entityName);
		  header.entitySelect.innerHTML = DataEntity.getEntityOptions(this.getTypeNameSelected(),entityName,this.getEntityFilterValue(),this.getEntityFilterCase());		   		
  	  this.setEntityNameSelected(entityName);
			break;
		}
	};

	this.getEntitySelected = function() {
	  var entitySelected = this.parent();
	  if (entitySelected === null) {
	    entitySelected = DataEntity.getByName(this.getEntityNameSelected());
	    this.setEntitySelected(entitySelected);
	  }
	  return entitySelected;
	};
};
DataRelationsHeaderMediator = new Class(new DataRelationsHeaderMediator());
DataRelationsHeaderMediator.ID = "DataRelationsHeaderMediator";
