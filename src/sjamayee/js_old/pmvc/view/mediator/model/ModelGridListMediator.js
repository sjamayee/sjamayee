var ModelGridListMediator = function() {
	this.Extends = GridListMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelGridListMediator.ID,viewComponent);
		var gridList = this.getViewComponent();
		this.facade.registerMediator(new ModelObjectsListMediator(gridList));
		this.facade.registerMediator(new ModelRelationsGridMediator(gridList));		
	};
	
	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.FOCUS
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.FOCUS:
			//alert("GridListMediator/handleNotification - FOCUS");
			var element = note.getBody();
			$(element).focus();
			break;
		}
	};
};
ModelGridListMediator = new Class(new ModelGridListMediator());
ModelGridListMediator.ID = "ModelGridListMediator";
