var ModelRelationsTextsEditorMediator = function() {
	this.Extends = ModelTextsEditorMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelRelationsTextsEditorMediator.ID,viewComponent);
  	this.onRelationEdit = this.onRelationEdit.bindWithEvent(this);
  	this.onParentEdit = this.onParentEdit.bindWithEvent(this);
  	this.onChildEdit = this.onChildEdit.bindWithEvent(this);
		var textEditorLeft = this.getViewComponent().gridListSplitter.left.modelRelationsTextsEditor;
  	textEditorLeft.addEvent(SjamayeeFacade.TEXT_RELATION_EDIT, this.onRelationEdit);
  	textEditorLeft.addEvent(SjamayeeFacade.TEXT_PARENT_EDIT, this.onParentEdit);
  	textEditorLeft.addEvent(SjamayeeFacade.TEXT_CHILD_EDIT, this.onChildEdit);
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
  	textEditorRight.addEvent(SjamayeeFacade.TEXT_KEYUP, this.onTextKeyup);  	
	};

	this.onTextKeyup = function() { alert("ModelRelationsTextsEditorMediator/handleNotification - TEXT_KEYUP"); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.GRID_MODEL_TEXT_SHOW,
			SjamayeeFacade.GRID_MODEL_TEXT_RESIZE,
			SjamayeeFacade.GRID_MODEL_TEXT_SAVE,
			SjamayeeFacade.GRID_MODEL_TEXT_CANCEL
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();		
		switch (note.getName())	{
			case SjamayeeFacade.GRID_MODEL_TEXT_SHOW:
		  //alert("ModelRelationsTextsEditorMediator/handleNotification - GRID_MODEL_TEXT_SHOW");
    	this.setTextSize(this.getTextSize());
		  this.hide();
    	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW);
    	this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW);
			//gridList.modelRelationsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.left.modelRelationsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.modelRelationsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
			this.setInitialTextHash(HashGenerator.getInstance().generateSHA1(this.getText()));
			break;
			case SjamayeeFacade.GRID_MODEL_TEXT_RESIZE:
		  //alert("ModelRelationsTextsEditorMediator/handleNotification - GRID_MODEL_TEXT_RESIZE");
		  this.textResize();
		  this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_RESIZED, this.isTextNormal());
  	  var detail = this.facade.retrieveMediator(ModelDetailMediator.ID).getViewComponent(); //TODO: ??????????????????????????
      if (this.isTextFull() === true) {
  		  detail.setAttribute("style","display:none;");
  		  gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;display:block;");
  		} else {
  			detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
  			gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;display:block;");
  		}
			break;
      /*
      var textEditor = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
      var properties = {
        "state": SjamayeeMediator.STATE_LIST
        "textEditor": textEditor
      };
      this.sendNotification(SjamayeeFacade.DATA_MODEL_CHANGE, properties);

      //this.sendNotification(SjamayeeFacade.TEXT_SAVED,gridList);
      this.facade.setMessageText("Text saved.");
      */
			case SjamayeeFacade.GRID_MODEL_TEXT_SAVE:
    	//alert("ModelRelationsTextsEditorMediator/handleNotification - GRID_MODEL_TEXT_SAVE");
      var textEditor = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
    	this.sendNotification(SjamayeeFacade.TEXT_SAVE,this);
			break;
			case SjamayeeFacade.GRID_MODEL_TEXT_CANCEL:
  	  //alert("ModelRelationsTextsEditorMediator/handleNotification - GRID_MODEL_TEXT_CANCEL");
      var textEditor = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
  	  this.sendNotification(SjamayeeFacade.TEXT_CANCEL,this);
			break;
		}
	};
	
	this.getTextSize = function() {
		var textSize = this.facade.retrieveMediator(ModelRelationsGridMediator.ID).getGridSize();
	  if ((textSize === undefined) || (textSize === null)) {
	    textSize = SjamayeeFacade.SIZE_NORMAL;
	    this.setTextSize(textSize);
	  }
		return textSize;
	};
	
	this.setTextSize = function(textSize) {
		this.facade.retrieveMediator(ModelRelationsGridMediator.ID).setGridSize(textSize);	  
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
	  //alert("ModelRelationsTextsEditorMediator/setTextSize - textSize: "+textSize);
		var gridList = this.getViewComponent();		
	  var resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
		if (this.isTextFull() === true) {
  		resizeButtonText = TextsToolBar.RESIZE_BUTTON_FULL_VALUE;
  	  textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_MAXIMUM_ID);
		} else {
  	  resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
  	  textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID);
		}
		this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = resizeButtonText;
	};

	this.getText = function() {
	  var result = null;
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
	  var text = textEditorRight.textarea.value;
    //alert("ModelRelationsTextsEditorMediator/getText - textEditorRight: "+textEditorRight+" text: "+text);
	  if (text.length > 0) {
	    result = text;
	  }
	  return result;
	};
	
	this.onRelationEdit = function() {
    //alert("ModelRelationsTextsEditorMediator/handleNotification - TEXT_RELATION_EDIT");
    var text = '#                                                a81*TAB\n'+
               '#                                                a82*-\n'+
               '-\n'+
               '# Entity number                                  y75*0\n'+
               '#                                                y76*0\n'+
               '#                                                d01*1\n'+
               '#                                                y04*0    005\n'+
               '# Loop 1                                  ta   1 a02=dele     ex\n'+
               '# Generation WHERE-clause                        a02=rest        tb\n'+
               '#                                              8 x01+rest\n'+
               '#                                                d01*2        ta ta\n'+
               '#                                         tb     a02=tab  001    ta\n'+
               '#                                                d01*2        ta ta\n'+
               '-\n'+
               '# Exit                                    ex              006 00 00\n'+
               '-\n'+
               '/001\n'+
               '               DELETE FROM £b02 £a51                                #b04=\n'+
               '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
               '/005\n'+
               '           EXEC SQL\n'+
               '/006\n'+
               '           END-EXEC.\n'+
               '------------------------------------------------------------ Text on relation\n'+
               '1111111111111\n'+
               '222222222222222222222\n'+
               '33333333333333333333333333333333333\n'+
               '4444444444444444444444444444444444444444444444\n'+
               '55555555555555555555555555555555555555555555555555555555555555\n';
 	  //var textEditorId = ModelRelationsTextsEditor.ID+TextsEditorUIComponent.COMPONENT_ID;
    //$(textEditorId).innerHTML = text;
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;	  
    textEditorRight.textarea.innerHTML = text;
	};

	this.onParentEdit = function() {
    //alert("ModelRelationsTextsEditorMediator/handleNotification - TEXT_PARENT_EDIT");
    var text = '#                                                a81*TAB\n'+
               '#                                                a82*-\n'+
               '-\n'+
               '# Entity number                                  y75*0\n'+
               '#                                                y76*0\n'+
               '#                                                d01*1\n'+
               '#                                                y04*0    005\n'+
               '# Loop 1                                  ta   1 a02=dele     ex\n'+
               '# Generation WHERE-clause                        a02=rest        tb\n'+
               '#                                              8 x01+rest\n'+
               '#                                                d01*2        ta ta\n'+
               '#                                         tb     a02=tab  001    ta\n'+
               '#                                                d01*2        ta ta\n'+
               '-\n'+
               '# Exit                                    ex              006 00 00\n'+
               '-\n'+
               '/001\n'+
               '               DELETE FROM £b02 £a51                                #b04=\n'+
               '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
               '/005\n'+
               '           EXEC SQL\n'+
               '/006\n'+
               '           END-EXEC.\n'+
               '-------------------------------------------------------------- Text on parent\n';
 	  //var textEditorId = ModelRelationsTextsEditor.ID+TextsEditorUIComponent.COMPONENT_ID;
    //$(textEditorId).innerHTML = text;
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;	  
    textEditorRight.textarea.innerHTML = text;
	};

	this.onChildEdit = function() {
    //alert("ModelRelationsTextsEditorMediator/handleNotification - TEXT_CHILD_EDIT");
    var text = '#                                                a81*TAB\n'+
               '#                                                a82*-\n'+
               '-\n'+
             /*'# Entity number                                  y75*0\n'+
               '#                                                y76*0\n'+
               '#                                                d01*1\n'+
               '#                                                y04*0    005\n'+
               '# Loop 1                                  ta   1 a02=dele     ex\n'+
               '# Generation WHERE-clause                        a02=rest        tb\n'+
               '#                                              8 x01+rest\n'+
               '#                                                d01*2        ta ta\n'+
               '#                                         tb     a02=tab  001    ta\n'+
               '#                                                d01*2        ta ta\n'+*/
               '-\n'+
               '# Exit                                    ex              006 00 00\n'+
               '-\n'+
               '/001\n'+
               '               DELETE FROM £b02 £a51                                #b04=\n'+
               '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
               '/005\n'+
               '           EXEC SQL\n'+
               '/006\n'+
               '           END-EXEC.\n'+
               '--------------------------------------------------------------- Text on child\n';
 	  //var textEditorId = ModelRelationsTextsEditor.ID+TextsEditorUIComponent.COMPONENT_ID;
    //$(textEditorId).innerHTML = text;
		var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;	  
    textEditorRight.textarea.innerHTML = text;
	};
};
ModelRelationsTextsEditorMediator = new Class(new ModelRelationsTextsEditorMediator());
ModelRelationsTextsEditorMediator.ID = "ModelRelationsTextsEditorMediator";
