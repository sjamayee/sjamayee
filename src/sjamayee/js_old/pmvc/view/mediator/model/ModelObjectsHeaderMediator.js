var ModelObjectsHeaderMediator = function() {
	this.Extends = ObjectsHeaderMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelObjectsHeaderMediator.ID,viewComponent);
		var header = this.getViewComponent();
	};

	this.onObjectsRefOpChange = function()	{
	  this.sendNotification(SjamayeeFacade.OLIST_REFOP_CHANGE);
	  this.sendNotification(SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE);
	};
	
	this.onObjectsTypeChange = function()		{
    var typeName = this.getViewComponent().typeSelect.value;
		//alert("ModelObjectsHeaderMediator/onObjectsTypeChange - typeName: "+typeName);
	  this.sendNotification(SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE,typeName);
	};
	
	this.onObjectsFilterClick = function() {
	  this.onObjectsTypeChange();
	  this.sendNotification(SjamayeeFacade.OLIST_MODEL_FILTER_CLICK);
	};

	this.listNotificationInterests = function()	{
	  var result = this.parent();
		return result.concat([
			SjamayeeFacade.OLIST_MODEL_HEADER_SHOW,
			SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_MODEL_HEADER_SHOW:
		  //alert("ModelObjectsHeaderMediator/handleNotification - OLIST_MODEL_HEADER_SHOW");
			this.hide();
			header.setAttribute("style","display:block;");
			break;
			case SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE:
			var typeName = note.getBody();
		  //alert("ModelObjectsHeaderMediator/handleNotification - OLIST_MODEL_TYPE_CHANGE - typeName: "+typeName);
		  this.setTypeNameSelected(typeName);
			break;
		}
	};
};
ModelObjectsHeaderMediator = new Class(new ModelObjectsHeaderMediator());
ModelObjectsHeaderMediator.ID = "ModelObjectsHeaderMediator";
