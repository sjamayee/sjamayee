var ModelObjectsTextsHeaderMediator = function() {
	this.Extends = TextsHeaderMediator;
  
	this.initialize = function(viewComponent)	{
		this.parent(ModelObjectsTextsHeaderMediator.ID,viewComponent);
	};

	this.listNotificationInterests = function()	{
	  var result = this.parent();
		return result.concat([
      SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW:
		  //alert("ModelObjectsTextsHeaderMediator/handleNotification - OLIST_MODEL_TEXT_HEADER_SHOW");
			this.hide();
			header.objectName.innerHTML = "ModelObjectName";
			header.typeName.innerHTML = "ModelTypeName";			
			header.setAttribute("style","display:block;");
			break;
		}
	};
};
ModelObjectsTextsHeaderMediator = new Class(new ModelObjectsTextsHeaderMediator());
ModelObjectsTextsHeaderMediator.ID = "ModelObjectsTextsHeaderMediator";
