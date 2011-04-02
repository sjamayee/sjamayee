//Abstract
var ChildNTD = function() {
  this.Extends = DetailNTD;
  this.buttons = null;

	this.initialize = function(name,properties) {
		var html = '<div id="'+name+ChildNTD.HEADER_ID+'" class="'+DetailNTD.HEADER_CLASS_ID+'">'+ChildNTD.HEADER_VALUE+'</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ChildNTD.NAME_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.NAME_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.NAME_ID+'" class="'+DetailNTD.NAME_FIELD_CLASS_ID+'">Child *** Sjamayee *** Sjamayee *** Child 123456 78 90123 45 6789 012345 678 90</div>'+
				 		 	 '</div><br/>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ChildNTD.TYPE_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.TYPE_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.TYPE_ID+'" class="'+DetailNTD.TYPE_FIELD_CLASS_ID+'">Account</div>'+
				 		 	 '</div><br/>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ChildNTD.DESC_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.DESC_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.DESC_ID+'" class="'+DetailNTD.DESC_FIELD_CLASS_ID+'">Sjamayee is now *** CHILD *** CHILD *** CHILD *** jssjsj dldldld mfmfmfmf kekeke mdmdmdm kqkqkqk l lsslsl 123456790 14226 djdjjd jkfkfk</div>'+
				 		 	 '</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ChildNTD.CBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.CBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Jan Creemers 2011-10-12 13:54:07</div>'+
				 		 	 '</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ChildNTD.MBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.MBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.CBY_ID+'" class="'+DetailNTD.MBY_FIELD_CLASS_ID+'">Steve Jobs 2009-02-10 03:14:27</div>'+
				 		 	 '</div><br/>'+
               '<div id="'+ChildNTD.BUTTONS_ID+'" class="'+DetailNTD.BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ChildNTD.GO_BUTTON_ID+'" type="button" class="'+DetailNTD.GO_BUTTON_CLASS_ID+'">'+DetailNTD.SALESFORCE_BUTTON_LABEL+'</button>'+
               '<button id="'+name+ChildNTD.NOGO_BUTTON_ID+'" type="button" class="'+DetailNTD.NOGO_BUTTON_CLASS_ID+'">'+DetailNTD.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>';
		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
	  //alert("ChildNTD/initializeChildren");
	  var name = this.getUicName();
		this.name = $(name+ChildNTD.NAME_ID);
		this.type = $(name+ChildNTD.TYPE_ID);
		this.description = $(name+ChildNTD.DESC_ID);
		this.createdBy = $(name+ChildNTD.CBY_ID);
		this.modifiedBy = $(name+ChildNTD.MBY_ID);
		this.buttons = $(name+ChildNTD.BUTTONS_ID);
		this.goButton = $(name+ChildNTD.GO_BUTTON_ID);
		this.noGoButton = $(name+ChildNTD.NOGO_BUTTON_ID);
  };
};
ChildNTD = new Class(new ChildNTD());
//ChildNTD.ID = "childNTD";
ChildNTD.CLASS_ID = "childNTD";
//ChildNTD.HEADER_CLASS_ID = "childNTDHeader";
ChildNTD.HEADER_ID = "NTDHeader";
ChildNTD.HEADER_VALUE = "Child";
ChildNTD.NAME_ID = "NTDName";
ChildNTD.TYPE_ID = "NTDType";
ChildNTD.DESC_ID = "NTDDescription";
ChildNTD.CBY_ID = "NTDCreatedBy";
ChildNTD.MBY_ID = "NTDModifiedBy";
ChildNTD.BUTTONS_ID = "NTDButtons";
ChildNTD.GO_BUTTON_ID = "NTDGoButton";
ChildNTD.NOGO_BUTTON_ID = "NTDNoGoButton";
