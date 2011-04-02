var DataParentNTDMediator = function() {
	this.Extends = ParentNTDMediator;

	this.initialize = function(viewComponent)	{
		this.parent(DataParentNTDMediator.ID,viewComponent);
	};
	
	this.onGoClick = function() {
    var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
    //relationsMediator.showSFDCObject();
	  relationsMediator.setDisplay(true); //FORCED!!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_DATA_SFDC_SHOW);
	};
};
DataParentNTDMediator = new Class(new DataParentNTDMediator());
DataParentNTDMediator.ID = "DataParentNTDMediator";
