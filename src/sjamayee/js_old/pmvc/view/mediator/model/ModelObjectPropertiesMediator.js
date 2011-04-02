var ModelObjectPropertiesMediator = function() {
	this.Extends = ObjectPropertiesMediator;

	this.initialize = function(viewComponent)	{
    this.parent(ModelObjectPropertiesMediator.ID,viewComponent);
	};

  //OK - NEEDED !!!
	this.setLine = function(line) {
		try {
			this.line = line;
			var type = this.getType();
			if (type) {
				switch (type) {
					case AttributeListMediator.TYPE_OBJECT:
					this.setObjectLine(this.getLine());
					break;
					case AttributeListMediator.TYPE_PARENT:
					this.setParentLine(this.getLine());
					var parentPropertiesMediator = this.facade.retrieveMediator(ModelParentPropertiesMediator.ID);
					parentPropertiesMediator.setLine(this.getLine());
					break;
					case AttributeListMediator.TYPE_CHILD:
					this.setChildLine(this.getLine());
					var childPropertiesMediator = this.facade.retrieveMediator(ModelChildPropertiesMediator.ID);
					childPropertiesMediator.setLine(this.getLine());
					break;
				}
			}
		} finally {
			$(this.getViewComponent().getNameCellId(2)).focus();
		//$(ObjectProperties.ID+AttributeListUIComponent.NAME_ID+"2D").focus();
		//$(ObjectProperties.ID+AttributeListUIComponent.VALUE_ID+"2D").focus();
		}
	};
};
ModelObjectPropertiesMediator = new Class(new ModelObjectPropertiesMediator());
ModelObjectPropertiesMediator.ID = "ModelObjectPropertiesMediator";
