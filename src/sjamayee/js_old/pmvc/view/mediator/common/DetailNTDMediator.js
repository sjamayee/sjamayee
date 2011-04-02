//Abstract
var DetailNTDMediator = function() {
	this.Extends = SjamayeeMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		this.onNTDClick = this.onNTDClick.bindWithEvent(this);
		this.onNTDKeypress = this.onNTDKeypress.bindWithEvent(this);
		this.onNTDKeydown = this.onNTDKeydown.bindWithEvent(this);
		this.onNameClick = this.onNameClick.bindWithEvent(this);
		this.onNameKeypress = this.onNameKeypress.bindWithEvent(this);
		this.onNameKeydown = this.onNameKeydown.bindWithEvent(this);
		this.onGoClick = this.onGoClick.bindWithEvent(this);
		this.onNoGoClick = this.onNoGoClick.bindWithEvent(this);		
		var ntd = this.getViewComponent();
		ntd.addEvent(SjamayeeFacade.ENTITY_NTD_CLICK, this.onNTDClick);
		ntd.addEvent(SjamayeeFacade.ENTITY_NTD_KEYPRESS, this.onNTDKeypress);
		ntd.addEvent(SjamayeeFacade.ENTITY_NTD_KEYDOWN, this.onNTDKeydown);
		ntd.addEvent(SjamayeeFacade.ENTITY_NAME_CLICK, this.onNameClick);
		ntd.addEvent(SjamayeeFacade.ENTITY_NAME_KEYPRESS, this.onNameKeypress);
		ntd.addEvent(SjamayeeFacade.ENTITY_NAME_KEYDOWN, this.onNameKeydown);
		ntd.addEvent(SjamayeeFacade.GO_NTD_CLICK, this.onGoClick);
		ntd.addEvent(SjamayeeFacade.NOGO_NTD_CLICK, this.onNoGoClick);
	};

	this.onNTDClick = function() 		{	this.sendNotification(SjamayeeFacade.ENTITY_NTD_CLICK); };
	this.onNTDKeypress = function()	{	this.sendNotification(SjamayeeFacade.ENTITY_NTD_KEYPRESS); };
	this.onNTDKeydown = function()  {
		var e = new Event(e);
		alert("DetailNTDMediator/onNTDKeydown - keyCode: "+e.keyCode+" code: "+e.code+" key: "+e.key);
		this.sendNotification(SjamayeeFacade.ENTITY_NTD_KEYDOWN);
	};
	this.onNameClick = function() 	 { this.sendNotification(SjamayeeFacade.ENTITY_NAME_CLICK); };
	this.onNameKeypress = function() { this.sendNotification(SjamayeeFacade.ENTITY_NAME_KEYPRESS); };
	this.onNameKeydown = function()  { this.sendNotification(SjamayeeFacade.ENTITY_NAME_KEYDOWN); };
	this.onGoClick = function() 		 { alert("DetailNTDMediator/onGoClick"); };
	this.onNoGoClick = function()    { alert("DetailNTDMediator/onNoGoClick"); };
};
DetailNTDMediator = new Class(new DetailNTDMediator());
