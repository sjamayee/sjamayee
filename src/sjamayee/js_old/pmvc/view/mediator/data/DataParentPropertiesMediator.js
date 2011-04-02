var DataParentPropertiesMediator = function() {
	this.Extends = ParentPropertiesMediator;
	
	this.initialize = function(viewComponent)	{
		this.parent(DataParentPropertiesMediator.ID,viewComponent);
	};
};
DataParentPropertiesMediator = new Class(new DataParentPropertiesMediator());
DataParentPropertiesMediator.ID = "DataParentPropertiesMediator";
