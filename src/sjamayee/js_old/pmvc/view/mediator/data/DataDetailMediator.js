//Abstract
var DataDetailMediator = function() {
	this.Extends = DetailMediator;

	this.initialize = function(name,viewComponent)	{
		this.parent(name,viewComponent);
		var detail = this.getViewComponent();
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_DATA_SHOW,
			SjamayeeFacade.GRID_DATA_SHOW,
			SjamayeeFacade.GRID_DATA_PARENT_SHOW,
			SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW,
			SjamayeeFacade.GRID_DATA_CHILD_SHOW
		]);
	};

	this.handleNotification = function(note)	{
	  this.parent(note);
		var app = this.facade.getApplication();
		var detail = this.getViewComponent();
		switch (note.getName())	{
  		case SjamayeeFacade.OLIST_DATA_SHOW:
		  //alert("DataDetailMediator/handleNotification - OLIST_DATA_SHOW");
		  this.hide();			
			//detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");			
			//detail.splitter.left.dataObjectNTD.setHeader(DataObjectNTD.HEADER_ID, ObjectNTD.HEADER_VALUE);
			detail.splitter.left.dataObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.left.dataObjectNTD.header.innerHTML = ObjectNTD.HEADER_VALUE;
			//detail.splitter.right.dataObjectProperties.setHeader(DataObjectProperties.HEADER_ID, ObjectProperties.HEADER_VALUE);
	  	detail.splitter.right.dataObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
			var objectPropertiesMediator = this.facade.retrieveMediator(DataObjectPropertiesMediator.ID);
			objectPropertiesMediator.setType(AttributeListMediator.TYPE_OBJECT);
			break;
			case SjamayeeFacade.GRID_DATA_SHOW:
		  //alert("DataDetailMediator/handleNotification - GRID_DATA_SHOW");
			this.hide();
			detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");
			switch (this.getState()) {
				case DetailMediator.STATE_PARENT:
				this.sendNotification(SjamayeeFacade.GRID_DATA_PARENT_SHOW);
				break;
				case DetailMediator.STATE_CHILD:
				this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
				break;
				default:
				this.sendNotification(SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW);
				break;
			}
			break;
			case SjamayeeFacade.GRID_DATA_PARENT_SHOW:
		  //alert("DataDetailMediator/handleNotification - GRID_DATA_PARENT_SHOW");
			this.hide();
			//detail.splitter.left.dataObjectNTD.setHeader(DataParentNTD.HEADER_ID, ParentNTD.HEADER_VALUE);
			detail.splitter.left.dataObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.left.dataObjectNTD.header.innerHTML = ParentNTD.HEADER_VALUE;
			//detail.splitter.right.dataObjectProperties.setHeader(DataParentProperties.HEADER_ID, DataParentProperties.HEADER_VALUE);
	  	detail.splitter.right.dataObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
		  this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
		  //this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
			break;
			case SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW:
		  //alert("DataDetailMediator/handleNotification - GRID_DATA_PARENTANDCHILD_SHOW");
			this.hide();
			detail.splitter.left.dataParentDetail.setAttribute("style","width:100%;height:100%;display:block;");
	  	detail.splitter.right.dataChildDetail.setAttribute("style","width:100%;height:100%;display:block;");	  	
			this.setState(DetailMediator.STATE_PARENT_CHILD);
    	this.sendNotification(SjamayeeFacade.PARENT_DETAIL);
    	this.sendNotification(SjamayeeFacade.CHILD_DETAIL);	  	
		  this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
		  //this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
			break;
			case SjamayeeFacade.GRID_DATA_CHILD_SHOW:
		  //alert("DataDetailMediator/handleNotification - GRID_DATA_CHILD_SHOW");
			this.hide();
			//detail.splitter.left.dataObjectNTD.setHeader(DataChildNTD.HEADER_ID, ChildNTD.HEADER_VALUE);
			detail.splitter.left.dataObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
			detail.splitter.left.dataObjectNTD.header.innerHTML = ChildNTD.HEADER_VALUE;
			//detail.splitter.right.dataObjectProperties.setHeader(DataChildProperties.HEADER_ID, DataChildProperties.HEADER_VALUE);
	  	detail.splitter.right.dataObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
		  this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
		  //this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
			break;
		}
	};
};
DataDetailMediator = new Class(new DataDetailMediator());
