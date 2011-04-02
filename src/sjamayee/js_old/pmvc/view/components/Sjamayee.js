var Sjamayee = function() {
  this.Extends = UIComponent;
	this.appName = "Sjamayee!";

	this.header = null;
	this.gridList = null;
	this.toolBar = null;
	this.detail = null;
  //Reference to the SjamayeeFacade for calling 'startup'
  this.facade = null;

  this.initialize = function(element, properties) {
		this.facade = SjamayeeFacade.getInstance();
		this.parent(Sjamayee.FORM);	
  };

  this.initializeChildren = function() {
	//alert("Sjamayee/initializeChildren");
		//this.parent();
	  this.header = new Header();
	  this.addChild(this.header);
	  this.gridList = new GridList();
		this.addChild(this.gridList);
		this.toolBar = new ToolBar();
		this.addChild(this.toolBar);
		this.detail = new Detail();
		this.addChild(this.detail);
	//alert("Sjamayee/initializeChildren - end");
  };

  this.initializationComplete = function() {
	//alert("Sjamayee/initializationComplete");
		this.facade.startup(this);
  };
};
Sjamayee = new Class(new Sjamayee());
Sjamayee.FORM = "sjamayeeForm";
Sjamayee.ID_PAD_SIZE = 3;
