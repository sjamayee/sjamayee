var ModelRelationsTextsEditorLeft = function() {
  this.Extends = SjamayeeUIComponent;
  this.relationTextButton = null;
  this.parentTextButton = null;
  this.childTextButton = null;

	this.initialize = function(name,properties) {
    var html = this.buildHtml();
		//alert("ModelRelationsTextsEditorLeft/initialize - html: "+html);
		this.parent(ModelRelationsTextsEditorLeft.ID, {html: html});
    this.relationTextButton_clickHandler = this.relationTextButton_clickHandler.bindWithEvent(this);
    this.parentTextButton_clickHandler = this.parentTextButton_clickHandler.bindWithEvent(this);
    this.childTextButton_clickHandler = this.childTextButton_clickHandler.bindWithEvent(this);
	};

  this.buildHtml = function() {
    var name = ModelRelationsTextsEditorLeft.ID;
   	//var result = '<div style="position:relative;float:left;width:100%;height:100%;background-color:#FF887A;text-align:center;">'+
    var result = '<br/><br/><h2>'+ModelRelationsTextsEditorLeft.LABEL+'</h2><br/><br/>'+
      	         '<button id="'+name+ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_ID+'" class="'+TextsEditor.BUTTON_CLASS_ID+'">'+ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_VALUE+'</button>'+
                 '<br/><br/>'+
      	         '<button id="'+name+ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_ID+'" class="'+TextsEditor.BUTTON_CLASS_ID+'">'+ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_VALUE+'</button>'+
                 '<br/><br/>'+
      	         '<button id="'+name+ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_ID+'" class="'+TextsEditor.BUTTON_CLASS_ID+'">'+ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_VALUE+'</button>';
    //             '</div>';
 		return result;		
  };

  this.initializeChildren = function() {
    //this.parent();
    var name = this.getUicName();
  	//alert("ModelRelationsTextsEditorLeft/initializeChildren - name: "+name);
    this.relationTextButton = $(name+ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_ID);
    this.parentTextButton = $(name+ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_ID);
    this.childTextButton = $(name+ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_ID);
  };
  
  this.childrenInitialized = function() {
    //this.parent();
  	//alert("ModelRelationsTextsEditorLeft/childrenInitialized");
    this.relationTextButton.addEvent(SjamayeeFacade.CLICK, this.relationTextButton_clickHandler);
    this.parentTextButton.addEvent(SjamayeeFacade.CLICK, this.parentTextButton_clickHandler);
    this.childTextButton.addEvent(SjamayeeFacade.CLICK, this.childTextButton_clickHandler);
  };

  this.relationTextButton_clickHandler = function()	{	this.fireEvent(SjamayeeFacade.TEXT_RELATION_EDIT); };
  this.parentTextButton_clickHandler = function()	  {	this.fireEvent(SjamayeeFacade.TEXT_PARENT_EDIT); };
  this.childTextButton_clickHandler = function()	  {	this.fireEvent(SjamayeeFacade.TEXT_CHILD_EDIT); };
};
ModelRelationsTextsEditorLeft = new Class(new ModelRelationsTextsEditorLeft());
ModelRelationsTextsEditorLeft.ID = "modelRelationsTextsEditorLeft";
ModelRelationsTextsEditorLeft.LABEL = "TEXT EDITOR";
ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_ID = "relationTextButton";
ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_VALUE = "Relation";
ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_ID = "parentTextButton";
ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_VALUE = "Parent";
ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_ID = "childTextButton";
ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_VALUE = "Child";
