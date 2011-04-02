var ToolBar = function() {
  this.Extends = SjamayeeUIComponent;
  
	this.dataObjectsToolBar = null;
	this.dataRelationsToolBar = null;
	this.modelObjectsToolBar = null;
	this.modelRelationsToolBar = null;
	this.modelObjectsTextsToolBar = null;
	this.modelRelationsTextsToolBar = null;
	
	this.initialize = function(name,properties) {
    var html = '<div id="'+DataObjectsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>'+
               '<div id="'+DataRelationsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>';
 	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {               
      html += '<div id="'+ModelObjectsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>'+
              '<div id="'+ModelRelationsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>'+
              '<div id="'+ModelObjectsTextsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>';
              '<div id="'+ModelRelationsTextsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>';
    }
		//alert("ToolBar/initialize - html:\n"+html);
		this.parent(ToolBar.ID,{html: html});
	};

  this.initializeChildren = function() {
		this.dataObjectsToolBar = new DataObjectsToolBar();
	  this.addChild(this.dataObjectsToolBar);
		this.dataRelationsToolBar = new DataRelationsToolBar();
	  this.addChild(this.dataRelationsToolBar);
	  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {	  
		  this.modelObjectsToolBar = new ModelObjectsToolBar();
	    this.addChild(this.modelObjectsToolBar);
		  this.modelRelationsToolBar = new ModelRelationsToolBar();
	    this.addChild(this.modelRelationsToolBar);		
		  this.modelObjectsTextsToolBar = new ModelObjectsTextsToolBar();
	    this.addChild(this.modelObjectsTextsToolBar);
		  this.modelRelationsTextsToolBar = new ModelRelationsTextsToolBar();
	    this.addChild(this.modelRelationsTextsToolBar);
	  }
  };
};
ToolBar = new Class(new ToolBar());
ToolBar.ID = "toolBarPane";
ToolBar.CLASS_ID = "toolBar";
ToolBar.COMMON_TOOLBAR_ID = "commonToolBar";
ToolBar.COMMON_TOOLBAR_CLASS_ID = "commonToolBar";
ToolBar.MESSAGE_TEXT_ID = "messageText";
ToolBar.MESSAGE_TEXT_CLASS_ID = "messageText";
ToolBar.SPECIAL_CLASS_ID = "specialTB";
ToolBar.NAVIGATION_BUTTONS_CLASS_ID = "navigationButtonsTB";
ToolBar.UPDATE_BUTTONS_CLASS_ID = "updateButtonsTB";
ToolBar.BUTTON_CLASS_ID = "toolBarButton";
