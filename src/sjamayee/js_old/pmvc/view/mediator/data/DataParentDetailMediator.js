var DataParentDetailMediator = function() {
	this.Extends = DataDetailMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataParentDetailMediator.ID,viewComponent);
		var detail = this.getViewComponent();
		this.facade.registerMediator(new DataParentNTDMediator(detail.splitter.left.dataParentDetail.ntd));
		this.facade.registerMediator(new DataParentPropertiesMediator(detail.splitter.left.dataParentDetail.properties));
	};
};
DataParentDetailMediator = new Class(new DataParentDetailMediator());
DataParentDetailMediator.ID = "DataParentDetailMediator";
