//Abstract
var ModelDetailMediator = function() {
	this.Extends = DetailMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		var detail = this.getViewComponent();
	};
	
	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_MODEL_SHOW,			
			SjamayeeFacade.GRID_MODEL_SHOW,
			SjamayeeFacade.GRID_MODEL_PARENT_SHOW,
			SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW,
			SjamayeeFacade.GRID_MODEL_CHILD_SHOW
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var detail = this.getViewComponent();
		switch (note.getName())	{
		  case SjamayeeFacade.OLIST_MODEL_SHOW:
		  //alert("ModelDetailMediator/handleNotification - OLIST_MODEL_SHOW");
			this.hide();
			//detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");			
    	//detail.splitter.left.modelObjectNTD.setHeader(ModelObjectNTD.HEADER_ID, ObjectNTD.HEADER_VALUE);			
			detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.left.modelObjectNTD.header.innerHTML = ObjectNTD.HEADER_VALUE;
    	//detail.splitter.right.modelObjectProperties.setHeader(ModelObjectProperties.HEADER_ID, ObjectProperties.HEADER_VALUE);
	  	detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
			var objectPropertiesMediator = this.facade.retrieveMediator(ModelObjectPropertiesMediator.ID);
		  objectPropertiesMediator.setType(AttributeListMediator.TYPE_OBJECT);
			break;
			case SjamayeeFacade.GRID_MODEL_SHOW:
		  //alert("ModelDetailMediator/handleNotification - GRID_MODEL_SHOW");
			this.hide();
			detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");
			switch (this.getState()) {
				case DetailMediator.STATE_PARENT:
				this.sendNotification(SjamayeeFacade.GRID_MODEL_PARENT_SHOW);
				break;
				case DetailMediator.STATE_CHILD:
				this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW);
				break;
				default:
				this.sendNotification(SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW);
				break;
			}
			break;
			case SjamayeeFacade.GRID_MODEL_PARENT_SHOW:
		  //alert("ModelDetailMediator/handleNotification - GRID_MODEL_PARENT_SHOW");
			this.hide();
			//detail.splitter.left.modelObjectNTD.setHeader(ModelParentNTD.HEADER_ID, ParentNTD.HEADER_VALUE);
			detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.left.modelObjectNTD.header.innerHTML = ParentNTD.HEADER_VALUE;
			//detail.splitter.right.modelObjectProperties.setHeader(ModelParentProperties.HEADER_ID, ModelParentProperties.HEADER_VALUE);
	  	detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
		  this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
		  //this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
			break;
			case SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW:
		  //alert("ModelDetailMediator/handleNotification - GRID_MODEL_PARENTANDCHILD_SHOW");
			this.hide();
			detail.splitter.left.modelParentDetail.setAttribute("style","width:100%;height:100%;display:block;");
	  	detail.splitter.right.modelChildDetail.setAttribute("style","width:100%;height:100%;display:block;");
		  this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
		  //this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
			break;
			case SjamayeeFacade.GRID_MODEL_CHILD_SHOW:
		  //alert("ModelDetailMediator/handleNotification - GRID_MODEL_CHILD_SHOW");
			this.hide();
			//detail.splitter.left.modelObjectNTD.setHeader(ModelChildNTD.HEADER_ID, ChildNTD.HEADER_VALUE);
			detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.left.modelObjectNTD.header.innerHTML = ChildNTD.HEADER_VALUE;
			//detail.splitter.right.modelObjectProperties.setHeader(ModelChildProperties.HEADER_ID, ModelChildProperties.HEADER_VALUE);
	  	detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
		  this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
		  //this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
			break;
		}
	};
};
ModelDetailMediator = new Class(new ModelDetailMediator());
