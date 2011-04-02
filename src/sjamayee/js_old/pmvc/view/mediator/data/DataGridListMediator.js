var DataGridListMediator = function() {
	this.Extends = GridListMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataGridListMediator.ID,viewComponent);
		var gridList = this.getViewComponent();
		this.facade.registerMediator(new DataObjectsListMediator(gridList));
		this.facade.registerMediator(new DataRelationsGridMediator(gridList));
	};

	this.listNotificationInterests = function()	{
    var result = this.parent();
    return result.concat([
			SjamayeeFacade.OLIST_DATA_SHOW,
			SjamayeeFacade.GRID_DATA_SHOW,
			SjamayeeFacade.FOCUS
		]);
	};

	this.handleNotification = function(note)	{
    this.parent(note);
		var app = this.facade.getApplication();
		var gridList = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_DATA_SHOW:
		  //alert("DataGridListMediator/handleNotification - OLIST_DATA_SHOW");
    	//this.sendNotification(SjamayeeFacade.DATA_SHOW);
			//this.sendNotification(SjamayeeFacade.OLIST_SHOW);
			this.hide();
		/*this.relationsGridLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
			if (this.objectsListLeftWidth !== null) {
				gridList.gridListSplitter.left.setStyle("width", this.objectsListLeftWidth);
				if (dijit) {
					var splitter = dijit.byId(GridListSplitter.ID);
					if (splitter) { splitter.resize(); }
				}				
			}
  	  gridList.gridListSplitter.setAttribute("style",this.getSplitterStyle());*/
    	this.sendNotification(SjamayeeFacade.OLIST_DATA_HEADER_SHOW);
    	this.sendNotification(SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW);  	  
			gridList.gridListSplitter.left.dataObjectsList.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.dataObjectsList.setAttribute("style","width:100%;height:100%;display:block;");
    	this.setListSize(this.getListSize());
      //this.home();
			break;
			case SjamayeeFacade.GRID_DATA_SHOW:
		  //alert("DataGridListMediator/handleNotification - GRID_DATA_SHOW");
    	//this.sendNotification(SjamayeeFacade.DATA_SHOW);
			//this.sendNotification(SjamayeeFacade.GRID_SHOW);
			this.hide();
		/*this.objectsListLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
			if (this.relationsGridLeftWidth !== null) {
				gridList.gridListSplitter.left.setStyle("width", this.relationsGridLeftWidth);
				if (dijit) {
					var splitter = dijit.byId(GridListSplitter.ID);
					if (splitter) { splitter.resize(); }
				}				
			}
  	  gridList.gridListSplitter.setAttribute("style",this.getSplitterStyle());*/
    	this.sendNotification(SjamayeeFacade.GRID_DATA_HEADER_SHOW);
    	this.sendNotification(SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW);  	  
			gridList.gridListSplitter.left.dataRelationsGrid.setAttribute("style","width:100%;height:100%;display:block;");
			gridList.gridListSplitter.right.dataRelationsGrid.setAttribute("style","width:100%;height:100%;display:block;");
			break;
			case SjamayeeFacade.FOCUS:
			//alert("GridListMediator/handleNotification - FOCUS");
			var element = note.getBody();
			$(element).focus();
			break;
		}
	};
};
DataGridListMediator = new Class(new DataGridListMediator());
DataGridListMediator.ID = "DataGridListMediator";
