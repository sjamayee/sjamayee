//Abstract
var ModelTextsEditorMediator = function() {
	this.Extends = GridListMediator;
	this.initialTextHash = null;
	//this.messageText = null;
  
	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};

  this.getInitialTextHash = function() {
    return this.initialTextHash;
  };
  
	this.setInitialTextHash = function(textHash) {
	  this.initialTextHash = textHash;
	};
/*
	this.setMessageText = function(messageText) {
	  if (this.messageText === null) {
	    var toolBar = null;
	    if (this instanceof ModelObjectsTextsEditorMediator) {
	      toolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
	    } else {
	      toolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
	    }
      this.messageText = toolBar.messageText;
    }
    this.messageText.value = messageText;
	};
*/
  //Abstract
  this.getText = function() {};
  this.getTextSize = function() {};
	this.setTextSize = function(textSize) {};

	this.textResize = function() {
	  if (this.isTextNormal() === true) {
	    this.setTextSize(SjamayeeFacade.SIZE_FULL);
	  } else {
	    this.setTextSize(SjamayeeFacade.SIZE_NORMAL);
	  }
	};

  this.isTextNormal = function() {
    return (this.getTextSize() == SjamayeeFacade.SIZE_NORMAL)?true:false;
  };

  this.isTextFull = function() {
    return (this.getTextSize() == SjamayeeFacade.SIZE_FULL)?true:false;
  };
  
	this.getTextHash = function() {
	  var result = null;
	  var text = this.getText();
	  if (text.length > 0) {
	    result = HashGenerator.getInstance().generateSHA1(text);
	  }
	  return result;
	};
};
ModelTextsEditorMediator = new Class(new ModelTextsEditorMediator());
