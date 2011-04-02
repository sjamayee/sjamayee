var DataChildPropertiesMediator = function() {
	this.Extends = ChildPropertiesMediator;
	
	this.initialize = function(viewComponent)	{
		this.parent(DataChildPropertiesMediator.ID,viewComponent);
	};
};
DataChildPropertiesMediator = new Class(new DataChildPropertiesMediator());
DataChildPropertiesMediator.ID = "DataChildPropertiesMediator";
