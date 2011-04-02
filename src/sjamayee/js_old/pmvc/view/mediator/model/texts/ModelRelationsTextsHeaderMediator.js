var ModelRelationsTextsHeaderMediator = function() {
	this.Extends = TextsHeaderMediator;
  
	this.initialize = function(viewComponent)	{
		this.parent(ModelRelationsTextsHeaderMediator.ID,viewComponent);
	};

	this.listNotificationInterests = function()	{
	  var result = this.parent();
		return result.concat([
      SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW:
		  //alert("ModelRelationsTextsHeaderMediator/handleNotification - GRID_MODEL_TEXT_HEADER_SHOW");
			this.hide();
			header.relationText.innerHTML = "ParentModelObjectName.TYPE  >  ChildModelObjectName.TYPE";
			header.setAttribute("style","display:block;");
			break;
		}
	};
};
ModelRelationsTextsHeaderMediator = new Class(new ModelRelationsTextsHeaderMediator());
ModelRelationsTextsHeaderMediator.ID = "ModelRelationsTextsHeaderMediator";
