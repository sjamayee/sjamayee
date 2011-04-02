var ModelChildNTDMediator = function() {
	this.Extends = ChildNTDMediator;

	this.initialize = function(viewComponent)	{
		this.parent(ModelChildNTDMediator.ID,viewComponent);
	};

	this.onGoClick = function() {
    var relationsMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    //relationsMediator.showSFDCObject();
	  relationsMediator.setDisplay(true); //FORCED !!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_MODEL_SFDC_SHOW);
	};
};
ModelChildNTDMediator = new Class(new ModelChildNTDMediator());
ModelChildNTDMediator.ID = "ModelChildNTDMediator";
