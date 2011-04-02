var PrepViewCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		var app = note.getBody();
	/*alert("PrepViewCommand - app: "+app.appName);
	  alert("PrepViewCommand - app.header: "+app.header+
	        "\napp.header.dataObjectsHeader: "+app.header.dataObjectsHeader+
	        "\napp.header.dataRelationsHeader: "+app.header.dataRelationsHeader+
	        "\napp.header.modelObjectsHeader: "+app.header.modelObjectsHeader+
	        "\napp.header.modelRelationsHeader: "+app.header.modelRelationsHeader);*/
	  this.facade.registerMediator(new HeaderMediator(app.header));
		//this.facade.registerMediator(new DataDetailMediator(app.detail));
		this.facade.registerMediator(new DataObjectNTDMediator(app.detail.splitter.left.dataObjectNTD));
		this.facade.registerMediator(new DataObjectPropertiesMediator(app.detail.splitter.right.dataObjectProperties));
		this.facade.registerMediator(new DataParentDetailMediator(app.detail));
		this.facade.registerMediator(new DataChildDetailMediator(app.detail));
		//this.facade.registerMediator(new ModelDetailMediator(app.detail));	  
		this.facade.registerMediator(new ModelObjectNTDMediator(app.detail.splitter.left.modelObjectNTD));
		this.facade.registerMediator(new ModelObjectPropertiesMediator(app.detail.splitter.right.modelObjectProperties));
		this.facade.registerMediator(new ModelParentDetailMediator(app.detail));	  
		this.facade.registerMediator(new ModelChildDetailMediator(app.detail));	  
		this.facade.registerMediator(new ToolBarMediator(app.toolBar));
		this.facade.registerMediator(new DataGridListMediator(app.gridList));
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
  	  this.facade.registerMediator(new ModelGridListMediator(app.gridList));
		  this.facade.registerMediator(new ModelObjectsTextsEditorMediator(app.gridList));
		  this.facade.registerMediator(new ModelRelationsTextsEditorMediator(app.gridList));
		}
    //this.sendNotification(SjamayeeFacade.GRID_MODEL_SHOW);
		this.sendNotification(SjamayeeFacade.GRID_DATA_SHOW);
	};
};
PrepViewCommand = new Class(new PrepViewCommand());
