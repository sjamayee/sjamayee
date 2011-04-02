//Abstract
var ParentNTD = function() {
  this.Extends = DetailNTD;
  this.buttons = null;

	this.initialize = function(name,properties) {
		var html = '<div id="'+name+ParentNTD.HEADER_ID+'" class="'+DetailNTD.HEADER_CLASS_ID+'">'+ParentNTD.HEADER_VALUE+'</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ParentNTD.NAME_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.NAME_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.NAME_ID+'" class="'+DetailNTD.NAME_FIELD_CLASS_ID+'">Parent *** Sjamayee *** Parent 1234567890 123456789012 345678901234 567890ABC DEFGHIJKLMNO</div>'+
				 		 	 '</div><br/>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ParentNTD.TYPE_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.TYPE_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.TYPE_ID+'" class="'+DetailNTD.TYPE_FIELD_CLASS_ID+'">Opportunity</div>'+
				 		 	 '</div><br/>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ParentNTD.DESC_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.DESC_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.DESC_ID+'" class="'+DetailNTD.DESC_FIELD_CLASS_ID+'">Sjamayee is now *** Parent ***jssjsj dldldld mfmfmfmf kek 111 22 33 44 55 hqhhshshssh slsl 123456790 14226  aez hdhd mqmmq qlqlql zyzzyu hdhdhd jfff jfjjf fjfjfjf vcvc dsds 123</div>'+
				 		 	 '</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ParentNTD.CBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.CBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Jan Creemers 2011-10-12 13:54:07</div>'+
				 		 	 '</div>'+
						 	 '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
				 		 	 ' <label for="'+name+ParentNTD.MBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.MBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Bill Gates 2010-11-15 14:14:17</div>'+
               '</div><br/>'+
               '<div id="'+name+ParentNTD.BUTTONS_ID+'" class="'+DetailNTD.BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ParentNTD.GO_BUTTON_ID+'" type="button" class="'+DetailNTD.GO_BUTTON_CLASS_ID+'">'+DetailNTD.SALESFORCE_BUTTON_LABEL+'</button>'+
               '<button id="'+name+ParentNTD.NOGO_BUTTON_ID+'" type="button" class="'+DetailNTD.NOGO_BUTTON_CLASS_ID+'">'+DetailNTD.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>';
		this.parent(name,{html:html});
	};

  this.initializeChildren = function() {
	  //alert("ParentNTD/initializeChildren");
	  var name = this.getUicName();
		this.name = $(name+ParentNTD.NAME_ID);
		this.type = $(name+ParentNTD.TYPE_ID);
		this.description = $(name+ParentNTD.DESC_ID);
		this.createdBy = $(name+ParentNTD.CBY_ID);
		this.modifiedBy = $(name+ParentNTD.MBY_ID);
		this.buttons = $(name+ParentNTD.BUTTONS_ID);
		this.goButton = $(name+ParentNTD.GO_BUTTON_ID);
		this.noGoButton = $(name+ParentNTD.NOGO_BUTTON_ID);
  };
};
ParentNTD = new Class(new ParentNTD());
//ParentNTD.ID = "parentNTD";
ParentNTD.CLASS_ID = "parentNTD";
//ParentNTD.HEADER_CLASS_ID = "parentNTDHeader";
ParentNTD.HEADER_ID = "NTDHeader";
ParentNTD.HEADER_VALUE = "Parent";
ParentNTD.NAME_ID = "NTDName";
ParentNTD.TYPE_ID = "NTDType";
ParentNTD.DESC_ID = "NTDDescription";
ParentNTD.CBY_ID = "NTDCreatedBy";
ParentNTD.MBY_ID = "NTDModifiedBy";
ParentNTD.BUTTONS_ID = "NTDButtons";
ParentNTD.GO_BUTTON_ID = "NTDGoButton";
ParentNTD.NOGO_BUTTON_ID = "NTDNoGoButton";
