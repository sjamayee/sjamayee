var DataChildNTDMediator = function() {
	this.Extends = ChildNTDMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataChildNTDMediator.ID,viewComponent);
	};
	
	this.onGoClick = function() {
    var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
    //relationsMediator.showSFDCObject();
	  relationsMediator.setDisplay(true); //Forced !!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_DATA_SFDC_SHOW);
	};
};
DataChildNTDMediator = new Class(new DataChildNTDMediator());
DataChildNTDMediator.ID = "DataChildNTDMediator";
