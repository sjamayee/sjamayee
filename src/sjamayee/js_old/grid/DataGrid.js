var DataGrid = function() {
	this.Extends = Grid;
	
	this.initialize = function() {
	  try {
			this.parent(DataGrid.ID);
			var facade = SjamayeeFacade.getInstance();
      this.setTypeProxy(facade.retrieveProxy(DataTypeProxy.ID));
      this.setEntityProxy(facade.retrieveProxy(DataEntityProxy.ID));
      this.setRelationProxy(facade.retrieveProxy(DataRelationProxy.ID));
      this.setAttributeProxy(facade.retrieveProxy(DataAttributeProxy.ID));
	  } catch(error) {
			Utils.alert("DataGrid/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
};
DataGrid = new Class(new DataGrid());
DataGrid.ID = "DataGrid";
