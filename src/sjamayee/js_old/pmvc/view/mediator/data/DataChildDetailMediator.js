var DataChildDetailMediator = function() {
	this.Extends = DataDetailMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataChildDetailMediator.ID,viewComponent);
		var detail = this.getViewComponent();
		this.facade.registerMediator(new DataChildNTDMediator(detail.splitter.right.dataChildDetail.ntd));
		this.facade.registerMediator(new DataChildPropertiesMediator(detail.splitter.right.dataChildDetail.properties));
	};
};
DataChildDetailMediator = new Class(new DataChildDetailMediator());
DataChildDetailMediator.ID = "DataChildDetailMediator";
