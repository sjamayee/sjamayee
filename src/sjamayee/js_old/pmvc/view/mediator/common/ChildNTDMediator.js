//Abstract
var ChildNTDMediator = function() {
	this.Extends = DetailNTDMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};

	this.onNTDClick = function() 		{	this.sendNotification(SjamayeeFacade.CHILD_NTD_CLICK); };
	this.onNTDKeypress = function()	{	this.sendNotification(SjamayeeFacade.CHILD_NTD_KEYPRESS); };
	this.onNTDKeydown = function()  {
		var e = new Event(e);
		alert("ChildNTDMediator/onNTDKeydown - keyCode: "+e.keyCode+" code: "+e.code+" key: "+e.key);
		this.sendNotification(SjamayeeFacade.CHILD_NTD_KEYDOWN);
	};
	this.onNameClick = function() 		{	this.sendNotification(SjamayeeFacade.CHILD_NAME_CLICK); };
	this.onNameKeypress = function() 	{	this.sendNotification(SjamayeeFacade.CHILD_NAME_KEYPRESS); };
	this.onNameKeydown = function() 	{	this.sendNotification(SjamayeeFacade.CHILD_NAME_KEYDOWN); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
		  SjamayeeFacade.CHILD_DETAIL,
			SjamayeeFacade.CHILD_NTD_CLICK,
			SjamayeeFacade.CHILD_NTD_KEYPRESS,
			SjamayeeFacade.CHILD_NTD_KEYDOWN,
			SjamayeeFacade.CHILD_NAME_CLICK,
			SjamayeeFacade.CHILD_NAME_KEYPRESS,
			SjamayeeFacade.CHILD_NAME_KEYDOWN
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var ntd = this.getViewComponent();
		switch (note.getName())	{
		  case SjamayeeFacade.CHILD_DETAIL:
			//alert("ChildNTDMediator/handleNotification - CHILD_DETAIL");
      //Display buttons.
      var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
      //var goButtonScript = "_rf.showSFDCChildObject();";
			if (relationsMediator.isEdit()) {
      	goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
      	//goButtonScript = "_rf.saveChildObject();";
      }
      ntd.goButton.innerHTML = goButtonLabel;
		  //ntd.goButton.setAttribute("onclick",goButtonScript);
		  var noGoStyle = "display:none;";
			if (relationsMediator.isEdit()) { noGoStyle = "display:block;background-color:lightgreen;"; }
		  ntd.noGoButton.setAttribute("style",noGoStyle);
			break;
			case SjamayeeFacade.CHILD_NTD_CLICK:
			alert("ChildNTDMediator/handleNotification - CHILD_NTD_CLICK");
			break;
			case SjamayeeFacade.CHILD_NTD_KEYPRESS:
			alert("ChildNTDMediator/handleNotification - CHILD_NTD_KEYPRESS");
			break;
			case SjamayeeFacade.CHILD_NTD_KEYDOWN:
			alert("ChildNTDMediator/handleNotification - CHILD_NTD_KEYDOWN");
			break;
			case SjamayeeFacade.CHILD_NAME_CLICK:
			alert("ChildNTDMediator/handleNotification - CHILD_NAME_CLICK");
			break;
			case SjamayeeFacade.CHILD_NAME_KEYPRESS:
			alert("ChildNTDMediator/handleNotification - CHILD_NAME_KEYPRESS");
			break;
			case SjamayeeFacade.CHILD_NAME_KEYDOWN:
			alert("ChildNTDMediator/handleNotification - CHILD_NAME_KEYDOWN");
			break;
		}
	};
};
ChildNTDMediator = new Class(new ChildNTDMediator());
