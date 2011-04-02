//Abstract
var AttributeListUIComponent = function() {
  this.Extends = ListUIComponent;

	this.attribute01Name = null;
	this.attribute01Value = null;
	this.attribute02Name = null;
	this.attribute02Value = null;
	this.attribute03Name = null;
	this.attribute03Value = null;
	this.attribute04Name = null;
	this.attribute04Value = null;
	this.attribute05Name = null;
	this.attribute05Value = null;
	this.attribute06Name = null;
	this.attribute06Value = null;
	this.attribute07Name = null;
	this.attribute07Value = null;
	this.attribute08Name = null;
	this.attribute08Value = null;

	this.initialize = function(name,properties) {
	//alert("AttributeListUIComponent/initialize - name: "+name);
		var headerValue = AttributeListUIComponent.PROPERTIES_HEADER_VALUE;
		if (properties) {
			if (properties['header_value']) {
				headerValue = properties['header_value'];
			}
		}
		var html = '<div id="'+name+AttributeListUIComponent.HEADER_ID+'" class="'+AttributeListUIComponent.HEADER_CLASS_ID+'">'+headerValue+'</div>'+
							 '<div id="'+name+AttributeListUIComponent.NAMES_ID+'" class="'+AttributeListUIComponent.NAMES_CLASS_ID+'">'+
							 ' <div id="'+name+AttributeListUIComponent.NAME_HEADER_ID+'" class="'+AttributeListUIComponent.NAME_HEADER_CLASS_ID+'">'+AttributeListUIComponent.NAME_HEADER_VALUE+'</div>'+
							 ' <div id="'+this.getNameCellId(1,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(1,name)+'">1111111111</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(2,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(2,name)+'">22222</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(3,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(3,name)+'">333</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(4,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(4,name)+'">n4</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(5,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(5,name)+'">&nbsp;</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(6,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(6,name)+'">n6</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(7,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(7,name)+'">&nbsp;</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getNameCellId(8,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
							 '   <a id="'+this.getNameAnchorId(8,name)+'">n8</a>'+
					 		 ' </div>'+
					 		 '</div>'+
							 '<div id="'+name+AttributeListUIComponent.VALUES_ID+'" class="'+AttributeListUIComponent.VALUES_CLASS_ID+'">'+
							 ' <div id="'+name+AttributeListUIComponent.VALUE_HEADER_ID+'" class="'+AttributeListUIComponent.VALUE_HEADER_CLASS_ID+'">'+AttributeListUIComponent.VALUE_HEADER_VALUE+'</div>'+
							 ' <div id="'+this.getValueCellId(1,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(1,name)+'">1111111111111</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(2,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(2,name)+'">&nbsp;</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(3,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(3,name)+'">&nbsp;</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(4,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(4,name)+'">&nbsp;</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(5,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(5,name)+'">55555</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(6,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(6,name)+'">666666</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(7,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(7,name)+'">&nbsp;</a>'+
					 		 ' </div>'+
							 ' <div id="'+this.getValueCellId(8,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
							 '   <a id="'+this.getValueAnchorId(8,name)+'">88888888</a>'+
					 		 ' </div>'+
					 		 '</div>';
		this.parent(name,{html:html});
		this.name_clickHandler = this.name_clickHandler.bindWithEvent(this);
		this.value_clickHandler = this.value_clickHandler.bindWithEvent(this);
	};

  this.initializeChildren = function() {
		var name = this.getUicName();
	//alert("AttributeListUIComponent/initializeChildren - element.name: "+name);
		this.attribute01Name = $(this.getNameCellId(1));
		this.attribute01Value = $(this.getValueCellId(1));
		this.attribute02Name = $(this.getNameCellId(2));
		this.attribute02Value = $(this.getValueCellId(2));
		this.attribute03Name = $(this.getNameCellId(3));
		this.attribute03Value = $(this.getValueCellId(3));
		this.attribute04Name = $(this.getNameCellId(4));
		this.attribute04Value = $(this.getValueCellId(4));
		this.attribute05Name = $(this.getNameCellId(5));
		this.attribute05Value = $(this.getValueCellId(5));
		this.attribute06Name = $(this.getNameCellId(6));
		this.attribute06Value = $(this.getValueCellId(6));
		this.attribute07Name = $(this.getNameCellId(7));
		this.attribute07Value = $(this.getValueCellId(7));
		this.attribute08Name = $(this.getNameCellId(8));
		this.attribute08Value = $(this.getValueCellId(8));
		var cells = [];
		cells.push(this.attribute01Name);
		cells.push(this.attribute01Value);
		cells.push(this.attribute02Name);
		cells.push(this.attribute02Value);
		cells.push(this.attribute03Name);
		cells.push(this.attribute03Value);
		cells.push(this.attribute04Name);
		cells.push(this.attribute04Value);
		cells.push(this.attribute05Name);
		cells.push(this.attribute05Value);
		cells.push(this.attribute06Name);
		cells.push(this.attribute06Value);
		cells.push(this.attribute07Name);
		cells.push(this.attribute07Value);
		cells.push(this.attribute08Name);
		cells.push(this.attribute08Value);
		this.setCells(cells);
  };

  this.childrenInitialized = function() {
	//alert("AttributeListUIComponent/childrenInitialized");
		this.attribute01Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute01Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute02Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute02Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute03Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute03Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute04Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute04Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute05Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute05Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute06Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute06Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute07Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute07Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.attribute08Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
		this.attribute08Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
		this.parent();
	/*var cells = this.getCells();
		for (var i = 0; i < cells.length; i++) {
			var cell = cells[i];
			cell.addEvent(SjamayeeFacade.CLICK, this.line_clickHandler);	
		}
		this.addEvent(SjamayeeFacade.CLICK, this.list_clickHandler);*/
	};

	this.setHeader = function(id, value) {
		$(id).innerHTML = value;
	};

//this.list_clickHandler = function(evt)	{	this.fireEvent(SjamayeeFacade.ATTRIBUTE_LIST_CLICK);	}
	this.name_clickHandler = function(evt)	{
	//alert("AttributeListUIComponent/name_clickHandler - id: "+evt.target.id);
		this.fireEvent(SjamayeeFacade.ATTRIBUTE_NAME_CLICK);
	};

	this.value_clickHandler = function(evt)	{
	//alert("AttributeListUIComponent/value_clickHandler - id: "+evt.target.id);
		this.fireEvent(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK);
	};
	
  this.getNameCellId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+AttributeListUIComponent.NAME_ID+'r'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.getNameAnchorId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+AttributeListUIComponent.NAME_ID+'a'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };
	
  this.getValueCellId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+AttributeListUIComponent.VALUE_ID+'r'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };

  this.getValueAnchorId = function(index,name) {
    var listName = this.getUicName();
    if (name !== undefined && name !== null) { listName = name; } 
    return listName+AttributeListUIComponent.VALUE_ID+'a'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  };
};
AttributeListUIComponent = new Class(new AttributeListUIComponent());
AttributeListUIComponent.PAGE_SIZE = 8;
AttributeListUIComponent.OBJECTS = "OBJECTS";
AttributeListUIComponent.PROPERTIES_HEADER_VALUE = "Properties";

AttributeListUIComponent.ATTRIBUTE = "attribute";
AttributeListUIComponent.LIST = AttributeListUIComponent.ATTRIBUTE+"List";

AttributeListUIComponent.HEADER_ID = "Header";
AttributeListUIComponent.HEADER_CLASS_ID = "propertiesHeader";
AttributeListUIComponent.NAME_HEADER_VALUE = "Name";
AttributeListUIComponent.NAMES_ID = AttributeListUIComponent.NAME_HEADER_VALUE+"s";
AttributeListUIComponent.NAMES_CLASS_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.NAMES_ID;
AttributeListUIComponent.NAME_HEADER_ID = AttributeListUIComponent.NAME_HEADER_VALUE+AttributeListUIComponent.HEADER_ID;
AttributeListUIComponent.NAME_HEADER_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.NAME_HEADER_ID;
AttributeListUIComponent.NAME_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.NAME_HEADER_VALUE; //+"0";
AttributeListUIComponent.NAME_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.NAME_HEADER_VALUE;
AttributeListUIComponent.VALUE_HEADER_VALUE = "Value";
AttributeListUIComponent.VALUES_ID = AttributeListUIComponent.VALUE_HEADER_VALUE+"s";
AttributeListUIComponent.VALUES_CLASS_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.VALUES_ID;
AttributeListUIComponent.VALUE_HEADER_ID = AttributeListUIComponent.VALUE_HEADER_VALUE+AttributeListUIComponent.HEADER_ID;
AttributeListUIComponent.VALUE_HEADER_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.VALUE_HEADER_ID;
AttributeListUIComponent.VALUE_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.VALUE_HEADER_VALUE; //+"0";
AttributeListUIComponent.VALUE_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.VALUE_HEADER_VALUE;
