//Abstract
var EditRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("EditRelationCommand");
  	try {
      var mediator = null; //parameter !!!
  		var grid = mediator.grid;
  		var gridView = grid.getGridView();
			var cell = gridView.getCurrentCell();
			if (cell) {
				mediator.childRelation = cell.getRelation();
				if (mediator.childRelation) {		
  				mediator.groupId = null;
  				mediator.sourceName = null;	
  				var sourceName = null;
  				if (Utils.group() === true) {
  					var lastGroupCommand = mediator.getLastGroupCommand();
  					if (lastGroupCommand) {
  						if (lastGroupCommand.getName() == Command.EDT) {
  							sourceName = lastGroupCommand.getSourceName();
  							if (lastGroupCommand.getRelation().getId() != mediator.childRelation.getId()) {
									sourceName = lastGroupCommand.getGroupName()+"/0";
								}
							} else {
								sourceName = lastGroupCommand.getGroupName()+"/0";
							}
						} 
					  if (sourceName === null) {
							sourceName = Command.GRP;
						}
					}
				  if (sourceName === null) {
						sourceName = Command.EDT;
					}
					mediator.sourceName = sourceName;
				}
  		}
      //this.sendNotification(SjamayeeFacade.RELATION_EDITING,mediator);  		
      mediator.setMessageText("Edit relation...");
  	} catch(error) {
  		Utils.alert("EditRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
EditRelationCommand = new Class(new EditRelationCommand());
