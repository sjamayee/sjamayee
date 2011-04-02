var ModelParentDetailMediator = function() {
	this.Extends = ModelDetailMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelParentDetailMediator.ID,viewComponent);
		var detail = this.getViewComponent();
		this.facade.registerMediator(new ModelParentNTDMediator(detail.splitter.left.modelParentDetail.ntd));
		this.facade.registerMediator(new ModelParentPropertiesMediator(detail.splitter.left.modelParentDetail.properties));
	};
};
ModelParentDetailMediator = new Class(new ModelParentDetailMediator());
ModelParentDetailMediator.ID = "ModelParentDetailMediator";
