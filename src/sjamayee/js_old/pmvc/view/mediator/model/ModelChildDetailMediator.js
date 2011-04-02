var ModelChildDetailMediator = function() {
	this.Extends = ModelDetailMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelChildDetailMediator.ID,viewComponent);
		var detail = this.getViewComponent();
		this.facade.registerMediator(new ModelChildNTDMediator(detail.splitter.right.modelChildDetail.ntd));
		this.facade.registerMediator(new ModelChildPropertiesMediator(detail.splitter.right.modelChildDetail.properties));
	};
};
ModelChildDetailMediator = new Class(new ModelChildDetailMediator());
ModelChildDetailMediator.ID = "ModelChildDetailMediator";
