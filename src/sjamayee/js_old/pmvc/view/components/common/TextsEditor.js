//Abstract
var TextsEditor = function() {
  this.Extends = TextsEditorUIComponent;

	this.initialize = function(name,properties) {
		this.parent(name,properties);
    this.keyup_Handler = this.keyup_Handler.bindWithEvent(this);
    this.addEvent(SjamayeeFacade.KEYUP, this.keyup_Handler);
	};

  this.keyup_Handler = function()	{	this.fireEvent(SjamayeeFacade.TEXT_KEYUP); };
};
TextsEditor = new Class(new TextsEditor());
TextsEditor.NORMAL_SIZE = "81%;";
TextsEditor.MAXIMUM_SIZE = "90.5%;";
TextsEditor.BUTTON_CLASS_ID = "textsEditorUICButton";
