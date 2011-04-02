//Abstract
var DetailMediator = function() {
	this.Extends = SjamayeeMediator;
	this.state = null;

	//this.initialize = function(name,viewComponent)	{
		//this.parent(name,viewComponent);
	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		var detail = this.getViewComponent();
  	//this.onDetailBlur = this.onDetailBlur.bindWithEvent(this);
  	//detail.addEvent(SjamayeeFacade.BLUR, this.onDetailBlur);
	};

	this.getState = function() {
		return this.state;
	};
	
	this.setState = function(state) {
		this.state = state;
		var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
		switch (this.state) {
			case DetailMediator.STATE_PARENT:
			relationsMediator.setDisplay();
			break;
			case DetailMediator.STATE_PARENT_CHILD:
			relationsMediator.setDisplay();
			break;
		}		
	};

  this.onDetailBlur = function() {
    alert("DetailMediator/onDetailBlur");
  };
	
	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_SHOW,
			SjamayeeFacade.GRID_SHOW,
			SjamayeeFacade.GRID_PARENT_SHOW,
			SjamayeeFacade.GRID_PARENTANDCHILD_SHOW,			
			SjamayeeFacade.GRID_CHILD_SHOW
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var detail = this.getViewComponent();
		switch (note.getName())	{
		  case SjamayeeFacade.OLIST_SHOW:
		  //alert("DetailMediator/handleNotification - OLIST_SHOW");
			//this.hide();			
			//detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");			
			/*detail.splitter.left.dataObjectNTD.setHeader(ObjectNTD.HEADER_ID, ObjectNTD.HEADER_VALUE);			
			detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.right.dataObjectProperties.setHeader(ObjectProperties.HEADER_ID, ObjectProperties.HEADER_VALUE);
	  	detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
			var objectPropertiesMediator = this.facade.retrieveMediator(ObjectPropertiesMediator.ID);
			objectPropertiesMediator.setType(AttributeListMediator.TYPE_OBJECT);*/
			break;
			case SjamayeeFacade.GRID_SHOW:
		  //alert("DetailMediator/handleNotification - GRID_SHOW");
			/*this.hide();
			//detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");
			switch (this.getState()) {
				case DetailMediator.STATE_PARENT:
				this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW);
				break;
				case DetailMediator.STATE_CHILD:
				this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW);
				break;
				default:
				this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW);
				break;
			}*/
			break;
			case SjamayeeFacade.GRID_PARENT_SHOW:
		  //alert("DetailMediator/handleNotification - GRID_PARENT_SHOW");
			//this.setState(DetailMediator.STATE_PARENT);
		  /*this.hide();
			detail.splitter.left.objectNTD.setHeader(ObjectNTD.HEADER_ID, ParentNTD.HEADER_VALUE);
			detail.splitter.left.objectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.right.objectProperties.setHeader(ObjectProperties.HEADER_ID, ParentProperties.HEADER_VALUE);
	  	detail.splitter.right.objectProperties.setAttribute("style","width:100%;height:100%;display:block;");*/
			/*var objectPropertiesMediator = this.facade.retrieveMediator(DataObjectPropertiesMediator.ID);
			objectPropertiesMediator.setType(AttributeListMediator.TYPE_PARENT);
			this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ACTIVATE);
    	this.sendNotification(SjamayeeFacade.PARENT_DETAIL);*/
			//this.facade.setMessageText("Parent detail.");
			break;
			case SjamayeeFacade.GRID_PARENTANDCHILD_SHOW:
		  //alert("DetailMediator/handleNotification - GRID_PARENTANDCHILD_SHOW");
			/*this.setState(DetailMediator.STATE_PARENT_CHILD);
		  //this.hide();
			detail.splitter.left.parentDetail.setAttribute("style","width:100%;height:100%;display:block;");
	  	detail.splitter.right.childDetail.setAttribute("style","width:100%;height:100%;display:block;");
    	this.sendNotification(SjamayeeFacade.PARENT_DETAIL);
    	this.sendNotification(SjamayeeFacade.CHILD_DETAIL);
			//this.facade.setMessageText("Parent & Child detail.");*/
			break;
			case SjamayeeFacade.GRID_CHILD_SHOW:
		  //alert("DetailMediator/handleNotification - GRID_CHILD_SHOW");
			//this.setState(DetailMediator.STATE_CHILD);
		  /*this.hide();
			detail.splitter.left.objectNTD.setHeader(ObjectNTD.HEADER_ID, ChildNTD.HEADER_VALUE);
			detail.splitter.left.objectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.right.objectProperties.setHeader(ObjectProperties.HEADER_ID, ChildProperties.HEADER_VALUE);
	  	detail.splitter.right.objectProperties.setAttribute("style","width:100%;height:100%;display:block;");*/
			/*var objectPropertiesMediator = this.facade.retrieveMediator(DataObjectPropertiesMediator.ID);
			objectPropertiesMediator.setType(AttributeListMediator.TYPE_CHILD);
			this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ACTIVATE);
    	this.sendNotification(SjamayeeFacade.CHILD_DETAIL);*/
			//this.facade.setMessageText("Child detail.");
			break;
		}
	};

	this.hide = function() {
	  var detail = this.getViewComponent();
  	detail.splitter.left.dataObjectNTD.setAttribute("style","display:none;");
	  detail.splitter.left.dataParentDetail.setAttribute("style","display:none;");
  	detail.splitter.left.modelObjectNTD.setAttribute("style","display:none;");
	  detail.splitter.left.modelParentDetail.setAttribute("style","display:none;");
	  detail.splitter.right.dataChildDetail.setAttribute("style","display:none;");
  	detail.splitter.right.dataObjectProperties.setAttribute("style","display:none;");
	  detail.splitter.right.modelChildDetail.setAttribute("style","display:none;");
  	detail.splitter.right.modelObjectProperties.setAttribute("style","display:none;");
	};
};
DetailMediator = new Class(new DetailMediator());
DetailMediator.STATE_PARENT = "PARENT";
DetailMediator.STATE_CHILD = "CHILD";
DetailMediator.STATE_PARENT_CHILD = "PARENT_CHILD";
