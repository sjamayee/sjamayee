//Abstract
var SaveRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("SaveRelationCommand");
  	try {
      var mediator = null; //parameter !!!
  		var grid = mediator.grid;
  		var gridView = grid.getGridView();
  		var originalEntityValues = null;
  		var commandName = Command.EDT;
  		if (mediator.childRelation.getId() === null) {
  			commandName = Command.ADD;
  		}
  		if (commandName == Command.EDT) {
  			if (mediator.childRelation.getCei()) {
  				var entity = Entity.getById(mediator.childRelation.getCei());
  			  //originalEntityValues = Entity.clone(entity);
  				originalEntityValues = (entity)?entity.clone():null;
  				originalEntityValues.setTypeObject(entity.getTypeObject());
  			  //originalEntityValues.setAttributeList(entity.getAttributeList());
  				originalEntityValues.setAttributeList(entity.getChildAttributeList());
  			}
  		}
  		var relation = mediator.childRelation.save(mediator);
  		if (relation) {
  			var command = new RelationCommand(commandName);
  			if (command) {
  				command.setRelation(relation);
  				if (gridView) {	
  					command.setNivo(gridView.getCurrentNivo());
  					command.setPosition(gridView.getPosition());
  				}				
  				this.setLastCommand(command,true);                          //TODO: this !!!!
  				if ((mediator.sourceName == Command.EDT) ||
  				 		(mediator.sourceName == Command.GRP)) {
  					mediator.sourceName += ("_"+command.getId()+"/0");
  				}
  				if (mediator.sourceName.length == 3) {
  					mediator.sourceName += ("_"+command.getId());
  				}
  				command.setSourceName(mediator.sourceName);
  				//ATT: After setting sourceName, get groupName to construct final sourceName !!!
  				var seq1Id = command.getSeq1Id();
  				if (commandName != Command.EDT) {
  					command.setSourceName(command.getGroupName()+"/"+seq1Id);
  				} else {
  					if (mediator.sourceName.substr(0,3) != Command.GRP) {
  						command.setSourceName(command.getGroupName()+"/"+seq1Id);
  					} else {
  						var seq2Id = command.getSeq2Id();
  						var seq2Nbr = new Number(seq2Id);
  						seq2Nbr = (seq2Nbr + 1);
  						seq2Id = seq2Nbr.toString();
  						command.setSourceName(command.getGroupName()+"/"+seq1Id+"."+seq2Id);
  					}
  					if (originalEntityValues) {
  						originalEntityValues.setKey(command.getSourceName());
  						//_oe.push(originalEntityValues);                                      //TODO: _oe
  					}
  				}
  			}
  		}
      //this.sendNotification(SjamayeeFacade.RELATION_SAVED,mediator);  // + !!! relation !!!
  	} catch(error) {
  		Utils.alert("SaveRelationCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	}
	};
};
SaveRelationCommand = new Class(new SaveRelationCommand());
