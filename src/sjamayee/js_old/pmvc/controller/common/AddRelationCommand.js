//Abstract
var AddRelationCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("AddRelationCommand");
  	try {
      var mediator = null; //parameter !!!
  		mediator.sourceName = null;
  		mediator.groupId = null;
  		mediator.currentRelation = null;
  		mediator.previousRelation = null;
  		mediator.nextRelation = null;
  		mediator.childRelation = new Relation(null,"",null,null,null,null);
  		var grid = mediator.grid;
			var gridView = grid.getGridView();
  		var currentNivo = grid.getCurrentNivo();			
			var gridColumn = grid.getColumnByNivo(currentNivo);
  		var cell = gridView.getCurrentCell();
  		var parentEntity = grid.getRootEntity();
  		if (gridColumn) {
  			var master = gridColumn.getMaster();
  			if (master) {
  				var masterRelation = master.getRelation();
  				if (masterRelation) {
  					parentEntity = masterRelation.getChildEntity();					
  				}
  			}
  		}
  		var childCell = null;
  		//Utils.alert("AddRelationCommand - cell: "+cell);
  		if (cell) {
  			mediator.currentRelation = cell.getRelation();
  			if (mediator.currentRelation) {
  				//parentEntity = mediator.currentRelation.getParentEntity();					
  				mediator.previousRelation = mediator.currentRelation;
  				mediator.nextRelation = null;
  				if (mediator.currentRelation.getNext()) {
  					mediator.nextRelation = mediator.currentRelation.getNext();
  				}
  				/* TODO: !!!!!!!
  				if (_kb.getShift() === true) {                                     // TODO: _kb !!!!!!
  				  mediator.previousRelation = null;
						if (mediator.currentRelation.getPrevious()) {
							mediator.previousRelation = mediator.currentRelation.getPrevious();
  					}
  					mediator.nextRelation = mediator.currentRelation;
  				}*/
  			}
  			childCell = new GridCell(mediator.childRelation);
  		}
  		if (childCell === null) {
  			//*** EMPTY CELL ***
  			//Get current cell in previous column OR Root !!!
  			//Get relation
  			//Parent Entity = this.getChildEntity()
  			//pei = this.getCei(); 
  			//Create new relation
  			//mediator.childRelation = new Relation(null,"",pei,null,null,null);
  			childCell = new GridCell(mediator.childRelation);
  			/*if (gridColumn) {
  				childCell.setGridColumn(gridColumn);
  			}*/
  		}
  		if (mediator.childRelation) {
  			if (parentEntity) {
  				mediator.childRelation.setPei(parentEntity.getId());
  			}
  			var groupId = null;
  			var sourceName = null;
  			if (Utils.group() === true) {
  				var lastGroupCommand = mediator.getLastGroupCommand();           //TODO: !!!!!
  				if (lastGroupCommand) {
  					sourceName = lastGroupCommand.getGroupName()+"/0";
  					groupId = lastGroupCommand.getGroupId();
  				}
  			  if (sourceName === null) {
  					sourceName = Command.GRP;
  				}						
  			}					
  		  if (sourceName === null) {
  				sourceName = Command.ADD;
  			}						
  			mediator.sourceName = sourceName;
  			mediator.groupId = groupId;
  			//TODO: mediator.setChildCell(childCell);   	                    //VERIFY THIS !!! >>TODO !!!
  			
  			//TODO: REFACTOR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  			//gridColumn.setRefreshNow(false);
  			//document.getElementById(Entity.CHILD_NAME_ID).focus();
  		}      
      //this.sendNotification(SjamayeeFacade.RELATION_ADDED,mediator);
  	} catch(error) {
  		Utils.alert("AddRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	};
  };
};
AddRelationCommand = new Class(new AddRelationCommand());
