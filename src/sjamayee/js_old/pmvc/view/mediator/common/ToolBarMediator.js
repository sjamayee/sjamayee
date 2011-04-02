var ToolBarMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(viewComponent)	{
	  //alert("ToolBarMediator/initialize - name: "+name);
		this.parent(ToolBarMediator.ID,viewComponent);
		var toolBar = this.getViewComponent();
		this.facade.registerMediator(new DataObjectsToolBarMediator(toolBar.dataObjectsToolBar));
		this.facade.registerMediator(new DataRelationsToolBarMediator(toolBar.dataRelationsToolBar));
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {		
		  this.facade.registerMediator(new ModelObjectsToolBarMediator(toolBar.modelObjectsToolBar));
		  this.facade.registerMediator(new ModelRelationsToolBarMediator(toolBar.modelRelationsToolBar));
		  this.facade.registerMediator(new ModelObjectsTextsToolBarMediator(toolBar.modelObjectsTextsToolBar));
		  this.facade.registerMediator(new ModelRelationsTextsToolBarMediator(toolBar.modelRelationsTextsToolBar));
		}
  	this.onMessageClick = this.onMessageClick.bindWithEvent(this);
  	toolBar.addEvent(SjamayeeFacade.MESSAGE_CLICK, this.onMessageClick);
	};

	this.onMessageClick = function()  {	this.sendNotification(SjamayeeFacade.MESSAGE_CLICK);	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.MESSAGE_CLICK
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var toolBar = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.MESSAGE_CLICK:
		//alert("ToolBarMediator/handleNotification - MESSAGE_CLICK");
			break;
		}
	};
};
ToolBarMediator = new Class(new ToolBarMediator());
ToolBarMediator.ID = "ToolBarMediator";
