//Abstract
var ParentNTDMediator = function() {
	this.Extends = DetailNTDMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};

	this.onNTDClick = function() 		{	this.sendNotification(SjamayeeFacade.PARENT_NTD_CLICK); };
	this.onNTDKeypress = function()	{	this.sendNotification(SjamayeeFacade.PARENT_NTD_KEYPRESS); };
	this.onNTDKeydown = function()  {
		var e = new Event(e);
		alert("ParentNTDMediator/onObjectNTDKeydown - keyCode: "+e.keyCode+" code: "+e.code+" key: "+e.key);
		this.sendNotification(SjamayeeFacade.PARENT_NTD_KEYDOWN);
	};
	this.onNameClick = function() 		{	this.sendNotification(SjamayeeFacade.PARENT_NAME_CLICK); };
	this.onNameKeypress = function() 	{	this.sendNotification(SjamayeeFacade.PARENT_NAME_KEYPRESS); };
	this.onNameKeydown = function() 	{	this.sendNotification(SjamayeeFacade.PARENT_NAME_KEYDOWN); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
		  SjamayeeFacade.PARENT_DETAIL,
			SjamayeeFacade.PARENT_NTD_CLICK,
			SjamayeeFacade.PARENT_NTD_KEYPRESS,
			SjamayeeFacade.PARENT_NTD_KEYDOWN,
			SjamayeeFacade.PARENT_NAME_CLICK,
			SjamayeeFacade.PARENT_NAME_KEYPRESS,
			SjamayeeFacade.PARENT_NAME_KEYDOWN
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var ntd = this.getViewComponent();
		switch (note.getName())	{
		  case SjamayeeFacade.PARENT_DETAIL:
			//alert("ParentNTDMediator/handleNotification - PARENT_DETAIL");
      //Display buttons.
      var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
      //var goButtonScript = "_rf.showSFDCParentObject();";
			if (relationsMediator.isEdit()) {
      	goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
      	//goButtonScript = "_rf.saveParentObject();";
      }
      ntd.goButton.innerHTML = goButtonLabel;
		  //ntd.goButton.setAttribute("onclick",goButtonScript);      
		  var noGoStyle = "display:none;";
			if (relationsMediator.isEdit()) { noGoStyle = "display:block;background-color:lightblue;"; }
		  ntd.noGoButton.setAttribute("style",noGoStyle);
			break;
			case SjamayeeFacade.PARENT_NTD_CLICK:
			alert("ParentNTDMediator/handleNotification - PARENT_NTD_CLICK");
			break;
			case SjamayeeFacade.PARENT_NTD_KEYPRESS:
			alert("ParentNTDMediator/handleNotification - PARENT_NTD_KEYPRESS");
			break;
			case SjamayeeFacade.PARENT_NTD_KEYDOWN:
			alert("ParentNTDMediator/handleNotification - PARENT_NTD_KEYDOWN");
			break;
			case SjamayeeFacade.PARENT_NAME_CLICK:
			alert("ParentNTDMediator/handleNotification - PARENT_NAME_CLICK");
			break;
			case SjamayeeFacade.PARENT_NAME_KEYPRESS:
			alert("ParentNTDMediator/handleNotification - PARENT_NAME_KEYPRESS");
			break;
			case SjamayeeFacade.PARENT_NAME_KEYDOWN:
			alert("ParentNTDMediator/handleNotification - PARENT_NAME_KEYDOWN");
			break;
		}
	};
};
ParentNTDMediator = new Class(new ParentNTDMediator());
