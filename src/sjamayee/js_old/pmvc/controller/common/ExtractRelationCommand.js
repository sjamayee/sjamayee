//Abstract
var ExtractRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("ExtractRelationCommand");
  	var nok = false;
  	try {
      var mediator = null; //parameter !!!
  		var grid = mediator.grid;
  		var gridView = grid.getGridView();
			var cell = gridView.getCurrentCell();
			if (cell) {
  			//mediator.childRelation = Relation.clone(cell.getRelation());
				mediator.childRelation = (cell.getRelation())?cell.getRelation().clone():null;
				if (mediator.childRelation) {
					if (mediator.childRelation.hasChildRelations() === false) {
						nok = true;
					} else {
						if (cell.getNivo() < Position.NIVO_ROOT()) {
  						mediator.childRelation = new Relation(null,"",null,mediator.childRelation.getPei(),null,null);
						}
						var groupId = null;
						var sourceName = null;
						var command = new RelationCommand(Command.EXT);
						if (command) {
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
								sourceName = Command.EXT+"_"+groupId;								
							}
							command.setSourceName(sourceName);
							//ATT: After setting sourceName, get groupName to construct final sourceName !!!
							var seq1Id = command.getId();
							command.setSourceName(command.getGroupName()+"/"+seq1Id);
						}
  				}
  			}
  		}
      //this.sendNotification(SjamayeeFacade.RELATION_EXTRACTED,mediator);
  	} catch(error) {
  		Utils.alert("ExtractRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return nok;
  	}
	};
};
ExtractRelationCommand = new Class(new ExtractRelationCommand());
