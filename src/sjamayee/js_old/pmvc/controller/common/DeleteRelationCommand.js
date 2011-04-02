//Abstract
var DeleteRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("DeleteRelationCommand");
  	try {
      var mediator = null; //parameter !!!
  		mediator.currentRelation = null;
  		mediator.previousRelation = null;
  		mediator.nextRelation = null;
  		var grid = mediator.grid;
			var gridView = grid.getGridView();
			var cell = gridView.getCurrentCell();
  		if (cell) {
  			mediator.currentRelation = cell.getRelation();
  			if (mediator.currentRelation) {
  				mediator.previousRelation = mediator.currentRelation.getPrevious();
  				mediator.nextRelation = mediator.currentRelation.getNext();
  				//mediator.childRelation = Relation.clone(mediator.currentRelation);
  				mediator.childRelation = mediator.currentRelation.clone();
  				if (mediator.childRelation) {
  					var relation = mediator.childRelation.remove(mediator);
  					if (relation) {
  						var command = new RelationCommand(Command.DEL);
  						if (command) {
  							command.setRelation(relation);
  							command.setNivo(gridView.getCurrentNivo());
  							command.setPosition(gridView.getPosition());
  							var lastGroupCommand = mediator.getLastGroupCommand();
  							mediator.setLastCommand(command,true);
  							var groupId = null;
  							var sourceName = null;
  							if (Utils.group() === true) {
  								if (lastGroupCommand) {
  									sourceName = lastGroupCommand.getSourceName();
  									groupId = lastGroupCommand.getGroupId();
  								} 
  								if (groupId === null) {	groupId = command.getId(); }
  								if (sourceName === null) { sourceName = Command.GRP+"_"+groupId; }
  							} else {
  								groupId = command.getId();
  								sourceName = Command.DEL+"_"+groupId;
  							}
  							command.setSourceName(sourceName);
  							//ATT: After setting sourceName, get groupName to construct final sourceName !!!
  							var seq1Id = command.getId();
  							command.setSourceName(command.getGroupName()+"/"+seq1Id);
  						}
  					}
					}
  			}
  		}
      //this.sendNotification(SjamayeeFacade.RELATION_DELETED,mediator);  		
  	} catch(error) {
  		Utils.alert("DeleteRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
DeleteRelationCommand = new Class(new DeleteRelationCommand());
