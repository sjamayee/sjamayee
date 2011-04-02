var DataObjectsHeaderMediator = function() {
	this.Extends = ObjectsHeaderMediator;
  
	this.initialize = function(viewComponent)	{
		this.parent(DataObjectsHeaderMediator.ID,viewComponent);
		var header = this.getViewComponent();
	/*alert("DataObjectsHeaderMediator - initialize:"+
		      "\n"+header.dataModelSelect.id+
		      "\n"+header.referenceOperatorSelect.id+
		      "\n"+header.referenceFilter.id+
		      "\n"+header.typeSelect.id+
		      "\n"+header.filter.id+
		      "\n"+header.filterButton.id+
		      "\n"+header.settingSelect.id+
		      "\n"+header.settingButton.id+
		      "\n"+header.helpLink.id);*/
		header.typeSelect.innerHTML = DataType.getTypeOptions();
	};

	this.onObjectsRefOpChange = function()	{
	  this.sendNotification(SjamayeeFacade.OLIST_REFOP_CHANGE);
	  this.sendNotification(SjamayeeFacade.OLIST_DATA_REFOP_CHANGE);
	};
	
	this.onObjectsTypeChange = function()		{
    var typeName = this.getViewComponent().typeSelect.value;
		//alert("DataObjectsHeaderMediator/onObjectsTypeChange - typeName: "+typeName);
	  this.sendNotification(SjamayeeFacade.OLIST_DATA_TYPE_CHANGE,typeName);
	};
	
	this.onObjectsFilterClick = function() {
	  this.onObjectsTypeChange();
	  this.sendNotification(SjamayeeFacade.OLIST_DATA_FILTER_CLICK);
	};

	this.listNotificationInterests = function()	{
	  var result = this.parent();
		return result.concat([
			SjamayeeFacade.OLIST_DATA_HEADER_SHOW,
			SjamayeeFacade.OLIST_DATA_TYPE_CHANGE
		]);
	};

	this.handleNotification = function(note) {
	  this.parent(note);
		var app = this.facade.getApplication();
		var header = this.getViewComponent();
		switch (note.getName())	{
			case SjamayeeFacade.OLIST_DATA_HEADER_SHOW:
		  //alert("DataObjectsHeaderMediator/handleNotification - OLIST_DATA_HEADER_SHOW");
			this.hide();
			header.setAttribute("style","display:block;");
			break;
			case SjamayeeFacade.OLIST_DATA_TYPE_CHANGE:
			var typeName = note.getBody();
		  //alert("DataObjectsHeaderMediator/handleNotification - OLIST_DATA_TYPE_CHANGE - typeName: "+typeName);
		  this.setTypeNameSelected(typeName);
			break;
		}
	};
};
DataObjectsHeaderMediator = new Class(new DataObjectsHeaderMediator());
DataObjectsHeaderMediator.ID = "DataObjectsHeaderMediator";
