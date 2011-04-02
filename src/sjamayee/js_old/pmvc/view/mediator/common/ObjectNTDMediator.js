//Abstract
var ObjectNTDMediator = function() {
	this.Extends = DetailNTDMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
	};

	this.onNTDClick = function() 		{	this.sendNotification(SjamayeeFacade.OBJECT_NTD_CLICK); };
	this.onNTDKeypress = function()	{	this.sendNotification(SjamayeeFacade.OBJECT_NTD_KEYPRESS); };
	this.onNTDKeydown = function()  {
		var e = new Event(e);
		alert("ObjectNTDMediator/onNTDKeydown - keyCode: "+e.keyCode+" code: "+e.code+" key: "+e.key);
		this.sendNotification(SjamayeeFacade.OBJECT_NTD_KEYDOWN);
	};
	this.onNameClick = function() 		{	this.sendNotification(SjamayeeFacade.OBJECT_NAME_CLICK); };
	this.onNameKeypress = function() 	{	this.sendNotification(SjamayeeFacade.OBJECT_NAME_KEYPRESS); };
	this.onNameKeydown = function() 	{	this.sendNotification(SjamayeeFacade.OBJECT_NAME_KEYDOWN); };

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OBJECT_NTD_CLICK,
			SjamayeeFacade.OBJECT_NTD_KEYPRESS,
			SjamayeeFacade.OBJECT_NTD_KEYDOWN,
			SjamayeeFacade.OBJECT_NAME_CLICK,
			SjamayeeFacade.OBJECT_NAME_KEYPRESS,
			SjamayeeFacade.OBJECT_NAME_KEYDOWN
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var ntd = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OBJECT_NTD_CLICK:
		  //alert("ObjectNTDMediator/handleNotification - OBJECT_NTD_CLICK");
			break;
			case SjamayeeFacade.OBJECT_NTD_KEYPRESS:
		  //alert("ObjectNTDMediator/handleNotification - OBJECT_NTD_KEYPRESS");
			break;
			case SjamayeeFacade.OBJECT_NTD_KEYDOWN:
		  //alert("ObjectNTDMediator/handleNotification - OBJECT_NTD_KEYDOWN");
			break;
			case SjamayeeFacade.OBJECT_NAME_CLICK:
		  //alert("ObjectNTDMediator/handleNotification - OBJECT_NAME_CLICK");
			break;
			case SjamayeeFacade.OBJECT_NAME_KEYPRESS:
		  //alert("ObjectNTDMediator/handleNotification - OBJECT_NAME_KEYPRESS");
			break;
			case SjamayeeFacade.OBJECT_NAME_KEYDOWN:
		  //alert("ObjectNTDMediator/handleNotification - OBJECT_NAME_KEYDOWN");
			break;
		}
	};
};
ObjectNTDMediator = new Class(new ObjectNTDMediator());
