//Abstract
var ObjectNTD = function() {
  this.Extends = DetailNTD;
  this.buttons = null;

	this.initialize = function(name,properties) {
		var html = '<div id="'+name+ObjectNTD.HEADER_ID+'" class="'+DetailNTD.HEADER_CLASS_ID+'">'+ObjectNTD.HEADER_VALUE+'</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ObjectNTD.NAME_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.NAME_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.NAME_ID+'" class="'+DetailNTD.NAME_FIELD_CLASS_ID+'">Sjamayee is in the house! The time is now!</div>'+
				 		 	 '</div><br/>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ObjectNTD.TYPE_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.TYPE_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.TYPE_ID+'" class="'+DetailNTD.TYPE_FIELD_CLASS_ID+'">Lead</div>'+
				 		 	 '</div><br/>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ObjectNTD.DESC_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.DESC_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.DESC_ID+'" class="'+DetailNTD.DESC_FIELD_CLASS_ID+'">Sjamayee is now *** Object *** jssjsj dldldld mfmfmfmf kekeke mdmdmdm kqkqkqk l lsslsl 123456790 14226 djdjjd jkfkfkfkf skksks lqlqlql zyzzyu hdhdhd jfff jfjjf fjfjfjf vcvc dsds 123</div>'+
				 		 	 '</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ObjectNTD.CBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.CBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Jan Creemers 2011-10-12 13:54:07</div>'+
				 		 	 '</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ObjectNTD.MBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.MBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.MBY_ID+'" class="'+DetailNTD.MBY_FIELD_CLASS_ID+'">Alma VandenBroeck 2011-10-17 23:14:12</div>'+
				 		 	 '</div><br/>'+
               '<div id="'+ObjectNTD.BUTTONS_ID+'" class="'+DetailNTD.BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ObjectNTD.GO_BUTTON_ID+'" type="button" class="'+DetailNTD.GO_BUTTON_CLASS_ID+'">'+DetailNTD.SALESFORCE_BUTTON_LABEL+'</button>'+
               '<button id="'+name+ObjectNTD.NOGO_BUTTON_ID+'" type="button" class="'+DetailNTD.NOGO_BUTTON_CLASS_ID+'">'+DetailNTD.CANCEL_BUTTON_LABEL+'</button>'+
				 		 	 '</div>';
		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
	  //alert("DetailNTD/initializeChildren");
	  var name = this.getUicName();
	  this.header = $(name+ObjectNTD.HEADER_ID);
		this.name = $(name+ObjectNTD.NAME_ID);
		this.type = $(name+ObjectNTD.TYPE_ID);
		this.description = $(name+ObjectNTD.DESC_ID);
		this.createdBy = $(name+ObjectNTD.CBY_ID);
		this.modifiedBy = $(name+ObjectNTD.MBY_ID);
		this.buttons = $(name+ObjectNTD.BUTTONS_ID);
		this.goButton = $(name+ObjectNTD.GO_BUTTON_ID);
		this.noGoButton = $(name+ObjectNTD.NOGO_BUTTON_ID);
  };
  
  this.childrenInitialized = function() {
		this.goButton.addEvent(SjamayeeFacade.CLICK, this.goButton_clickHandler);
		this.noGoButton.addEvent(SjamayeeFacade.CLICK, this.noGoButton_clickHandler);
	};
};
ObjectNTD = new Class(new ObjectNTD());
ObjectNTD.CLASS_ID = "objectNTD";
//ObjectNTD.HEADER_CLASS_ID = "objectNTDHeader";
ObjectNTD.HEADER_ID = "NTDHeader";
ObjectNTD.HEADER_VALUE = "Object";
ObjectNTD.NAME_ID = "NTDName";
ObjectNTD.TYPE_ID = "NTDType";
ObjectNTD.DESC_ID = "NTDDescription";
ObjectNTD.CBY_ID = "NTDCreatedBy";
ObjectNTD.MBY_ID = "NTDModifiedBy";
ObjectNTD.BUTTONS_ID = "NTDButtons";
ObjectNTD.GO_BUTTON_ID = "NTDGoButton";
ObjectNTD.NOGO_BUTTON_ID = "NTDNogoButton";
