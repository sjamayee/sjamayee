var ModelChildPropertiesMediator = function() {
	this.Extends = ChildPropertiesMediator;
	
	this.initialize = function(viewComponent)	{
		this.parent(ModelChildPropertiesMediator.ID,viewComponent);
	};
};
ModelChildPropertiesMediator = new Class(new ModelChildPropertiesMediator());
ModelChildPropertiesMediator.ID = "ModelChildPropertiesMediator";
