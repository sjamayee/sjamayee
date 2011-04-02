var ModelGrid = function() {
	this.Extends = Grid;
	
	this.initialize = function() {
	  try {
			this.parent(ModelGrid.ID);
			var facade = SjamayeeFacade.getInstance();
      this.setTypeProxy(facade.retrieveProxy(ModelTypeProxy.ID));
      this.setEntityProxy(facade.retrieveProxy(ModelEntityProxy.ID));
      this.setRelationProxy(facade.retrieveProxy(ModelRelationProxy.ID));
      this.setAttributeProxy(facade.retrieveProxy(ModelAttributeProxy.ID));
	  } catch(error) {
			Utils.alert("ModelGrid/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  }
	};
};
ModelGrid = new Class(new ModelGrid());
ModelGrid.ID = "ModelGrid";
