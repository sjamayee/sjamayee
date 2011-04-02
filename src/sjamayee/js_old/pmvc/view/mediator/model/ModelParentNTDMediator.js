var ModelParentNTDMediator = function() {
	this.Extends = ParentNTDMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelParentNTDMediator.ID,viewComponent);
	};
	
	this.onGoClick = function() {
    var relationsMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    //relationsMediator.showSFDCObject();
	  relationsMediator.setDisplay(true); //FORCED !!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_MODEL_SFDC_SHOW);
	};
};
ModelParentNTDMediator = new Class(new ModelParentNTDMediator());
ModelParentNTDMediator.ID = "ModelParentNTDMediator";
