var ModelObjectsTextsEditorMediator = function() {
	this.Extends = ModelTextsEditorMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelObjectsTextsEditorMediator.ID,viewComponent);
		var textEditorLeft = this.getViewComponent().gridListSplitter.left.modelObjectsTextsEditor;
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
  	textEditorRight.addEvent(SjamayeeFacade.TEXT_KEYUP, this.onTextKeyup);  	
	};

	this.onTextKeyup = function() { alert("ModelObjectsTextsEditorMediator/handleNotification - TEXT_KEYUP"); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_MODEL_TEXT_SHOW,
			SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE,
			SjamayeeFacade.OLIST_MODEL_TEXT_SAVE,
			SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL			
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();		
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_MODEL_TEXT_SHOW:
		  //alert("ModelObjectsTextsEditorMediator/handleNotification - OLIST_MODEL_TEXT_SHOW");
    	this.setTextSize(this.getTextSize());
		  this.hide();
    	this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW);
    	this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_TOOLBAR_SHOW);
			//gridList.modelObjectsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.left.modelObjectsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.modelObjectsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
			this.setInitialTextHash(HashGenerator.getInstance().generateSHA1(this.getText()));
			break;
			case SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE:
		  //alert("ModelObjectsTextsEditorMediator/handleNotification - OLIST_MODEL_TEXT_RESIZE");
		  this.textResize();
		  this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_RESIZED, this.isTextNormal());
  	  var detail = this.facade.retrieveMediator(ModelObjectDetailMediator.ID).getViewComponent();		  
      if (this.isTextFull() === true) {
  		  detail.setAttribute("style","display:none;");
  		  gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;display:block;");
  		} else {
  			detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
  			gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;display:block;");
  		}
			break;
			case SjamayeeFacade.OLIST_MODEL_TEXT_SAVE:
    	//alert("ModelObjectsTextsEditorMediator/handleNotification - OLIST_MODEL_TEXT_SAVE");
      var textEditor = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
    	this.sendNotification(SjamayeeFacade.TEXT_SAVE,this);
			break;
			case SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL:
  	  //alert("ModelObjectsTextsEditorMediator/handleNotification - OLIST_MODEL_TEXT_CANCEL");
      var textEditor = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
  	  this.sendNotification(SjamayeeFacade.TEXT_CANCEL,this);
			break;
		}
	};

	this.getTextSize = function() {
		var textSize = this.facade.retrieveMediator(ModelObjectsListMediator.ID).getListSize();
	  if ((textSize === undefined) || (textSize === null)) {
	    textSize = SjamayeeFacade.SIZE_NORMAL;
	    this.setTextSize(textSize);
	  }
		return textSize;
	};

	this.setTextSize = function(textSize) {
		this.facade.retrieveMediator(ModelObjectsListMediator.ID).setListSize(textSize);
  	var textEditorRight = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
	  //alert("ModelObjectsTextsEditorMediator/setTextSize - textSize: "+textSize);
		//var gridList = this.getViewComponent();		
	  var resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
		if (this.isTextFull() === true) {
  		resizeButtonText = TextsToolBar.RESIZE_BUTTON_FULL_VALUE;
  		textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_MAXIMUM_ID);
		} else {
  	  resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
  		textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID);
		}
		this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = resizeButtonText;
	};

	this.getText = function() {
	  var result = null;
  	var textEditorRight = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
    var text = textEditorRight.textarea.value;
    //alert("ModelObjectsTextsEditorMediator/getText - textEditorRight: "+textEditorRight+" text: "+text);
	  if (text.length > 0) {
	    result = text;
	  }
	  return result;
	};
};
ModelObjectsTextsEditorMediator = new Class(new ModelObjectsTextsEditorMediator());
ModelObjectsTextsEditorMediator.ID = "ModelObjectsTextsEditorMediator";
