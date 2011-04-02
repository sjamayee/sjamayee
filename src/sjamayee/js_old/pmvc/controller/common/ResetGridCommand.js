var ResetGridCommand = function() {
  this.Extends = ResetViewCommand;
	this.execute = function(note) {
		//alert("ResetGridCommand");
		//alert("ResetGridCommand - nivo: "+nivo+" percent: "+percent);
    //var mediator = note.getBody();
    var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
		var grid = mediator.grid;
		try {
			var nivo = grid.getCurrentNivo();
			if (nivo < Position.NIVO_COLUMN_FIRST()) {
				if (nivo == -4) {
					this.percent = 52; //55;
				} else if (nivo == -5) {
					this.percent = 68; //70;
				} else if (nivo == -6) {
					this.percent = 87.5; //85;
				} else {
					this.percent = 100;
				}
			}
			this.parent(note);
      //this.sendNotification(SjamayeeFacade.GRID_RESETED,mediator);
      mediator.setMessageText("Grid reset.");
		} catch(error) {
			Utils.alert("ResetGridCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ResetGridCommand = new Class(new ResetGridCommand());
