var ModelParentPropertiesMediator = function() {
	this.Extends = ParentPropertiesMediator;
	
	this.initialize = function(viewComponent)	{
		this.parent(ModelParentPropertiesMediator.ID,viewComponent);
	};
};
ModelParentPropertiesMediator = new Class(new ModelParentPropertiesMediator());
ModelParentPropertiesMediator.ID = "ModelParentPropertiesMediator";
