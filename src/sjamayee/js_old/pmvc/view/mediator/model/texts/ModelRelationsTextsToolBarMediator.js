var ModelRelationsTextsToolBarMediator = function() {
	this.Extends = ModelTextsToolBarMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelRelationsTextsToolBarMediator.ID,viewComponent);
	};

	this.onSave = function()      {	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_SAVE); };
	this.onCancel = function()    { this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_CANCEL);	};
  this.onResize = function()    {	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_RESIZE);	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var toolBar = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW:
		  //alert("ModelRelationsTextsToolBarMediator/handleNotification - GRID_MODEL_TEXT_TOOLBAR_SHOW");
			this.hide();
			toolBar.setAttribute("style","display:block;");
			break;
		}
	};
/*
  this.onResizeClick = function() {
		//alert("ModelRelationsTextsToolBarMediator/onResizeClick - textSize: "+this.getTextSize());
  	//this.textResize();
  	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_RESIZE);
  	this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE);
	**Resize panes.		
	  var detail = this.facade.retrieveMediator(ModelDetailMediator.ID).getViewComponent();
	  //var gridList = this.facade.retrieveMediator(ModelGridListMediator.ID).getViewComponent();
	  var gridList = this.facade.retrieveMediator(ModelRelationsTextsEditorMediator.ID).getViewComponent();
	  var modelObjectsTextsEditor = this.facade.retrieveMediator(ModelObjectsTextsEditorMediator.ID).getViewComponent().modelObjectsTextsEditor;
	  var modelRelationsTextEditor = this.facade.retrieveMediator(ModelRelationsTextsEditorMediator.ID).getViewComponent().modelRelationsTextsEditor;
    if (this.isTextFull() === true) {
		  detail.setAttribute("style","display:none;");
		  gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
		  //modelObjectsTextsEditor.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
		  modelRelationsTextsEditor.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
		  //$(TextsEditorUIComponent.COMPONENT_ID).setAttribute("style","width:"+TextsEditor.WIDTH+"px;height:"+TextsEditor.MAXIMUM_SIZE+"px;margin-top:5px;border:none;padding:0px 5px 5px 2px;font:normal normal normal 100% courier new;");
		} else {
			detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
			gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");		  
			//modelObjectsTextsEditor.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");		  
			modelRelationsTextsEditor.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");		  
		  //$(TextsEditorUIComponent.COMPONENT_ID).setAttribute("style","width:"+TextsEditor.WIDTH+"px;height:"+TextsEditor.NORMAL_SIZE+"px;margin-top:5px;border:none;padding:0px 5px 5px 2px;font:normal normal normal 100% courier new;");
		}**
  };*/
};
ModelRelationsTextsToolBarMediator = new Class(new ModelRelationsTextsToolBarMediator());
ModelRelationsTextsToolBarMediator.ID = "ModelRelationsTextsToolBarMediator";
