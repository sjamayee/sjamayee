//Abstract
var CopyRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("CopyRelationCommand");
  	try {
      var mediator = null; //parameter !!!
  		var grid = mediator.grid;
  		var gridView = grid.getGridView();
			var cell = gridView.getCurrentCell();
  		if (cell) {
  		  //mediator.childRelation = Relation.clone(cell.getRelation());
				mediator.childRelation = (cell.getRelation())?cell.getRelation().clone():null;
				if (mediator.childRelation) {
					//alert("CopyRelationCommand - childRelation: "+mediator.childRelation.print());
					if (cell.getNivo() < Position.NIVO_ROOT()) {
						mediator.childRelation = new Relation(null,"",null,mediator.childRelation.getPei(),null,null);
					}
					var groupId = null;
					var sourceName = null;
					var command = new RelationCommand(Command.CPY);
					if (command) {
  					//alert("CopyRelationCommand - command: "+command.print());
  					command.setRelation(mediator.childRelation);
  					command.setNivo(gridView.getCurrentNivo());
  					command.setPosition(gridView.getPosition());
  					var lastGroupCommand = mediator.getLastGroupCommand();
  					mediator.setLastCommand(command,true);
  					if (Utils.group() === true) {
  						if (lastGroupCommand) {
  							sourceName = lastGroupCommand.getSourceName();
  							groupId = lastGroupCommand.getGroupId();
  						} 
  						if (groupId === null) {	groupId = command.getId(); }
  						if (sourceName === null) { sourceName = Command.GRP+"_"+groupId; }
  					} else {
  						groupId = command.getId();
  						sourceName = Command.CPY+"_"+groupId;							
  					}
  					command.setSourceName(sourceName);
  					//ATT: After setting sourceName, get groupName to construct final sourceName !!!
  					var seq1Id = command.getId();
  					command.setSourceName(command.getGroupName()+"/"+seq1Id);
  				}
  			}
  		}
      //this.sendNotification(SjamayeeFacade.RELATION_COPIED,mediator);
  	} catch(error) {
  		Utils.alert("CopyRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
CopyRelationCommand = new Class(new CopyRelationCommand());
