var ModelRelationsTextsEditorRight = function() {
  this.Extends = TextsEditor;
  this.textarea = null;
  
	this.initialize = function(name,properties) {
    var html = this.buildHtml();
		//alert("ModelRelationsTextsEditorRight/initialize - html: "+html);
		this.parent(ModelRelationsTextsEditorRight.ID, {html: html});		
	};
	
  this.buildHtml = function() {
    var textEditorId = ModelRelationsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
   	//var result = '<div id="'+ModelRelationsTextsEditorRight.ID+'" style="position:relative;float:left;width:65%;height:100%;'+
    //         //'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler_gif\');background-position:left top;background-repeat:no-repeat;">'+
    //           'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler91_gif\');background-position:left top;background-repeat:no-repeat;">'+
    var result = '<textarea id="'+textEditorId+'" name="'+textEditorId+'"body" class="'+TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID+'">'+
                 'Example: ----------------------------------------- RELATIONS - START\n'+
                 '-\n'+
                 '#                                                a81*TAB\n'+
                 '#                                                a82*-\n'+
                 '-\n'+
                 '# Entity number                                  y75*0\n'+
                 '#                                                y76*0\n'+
                 '#                                                d01*1\n'+
                 '#                                                y04*0    005\n'+
                 '# Loop 1                                  ta   1 a02=dele     ex\n'+
                 '# Generation WHERE-clause                        a02=rest        tb\n'+
                 '#                                              8 x01+rest\n'+
                 '#                                                d01*2        ta ta\n'+
                 '#                                         tb     a02=tab  001    ta\n'+
                 '#                                                d01*2        ta ta\n'+
                 '-\n'+
                 '# Exit                                    ex              006 00 00\n'+
                 '-\n'+
                 '/001\n'+
                 '               DELETE FROM £b02 £a51                                #b04=\n'+
                 '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
                 '/005\n'+
                 '           EXEC SQL\n'+
                 '/006\n'+
                 '           END-EXEC.\n'+
                 'Example: ------------------------------------------------------- END\n'+
                 '</textarea>';
    //           '</div>';               
 		return result;		
	};
	
  this.initializeChildren = function() {
    //this.parent();
    //var name = this.getUicName();
  	//alert("ModelRelationsTextsEditorRight/initializeChildren - name: "+name);
  	var textEditorId = ModelRelationsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
    this.textarea = $(textEditorId);
  };
};
ModelRelationsTextsEditorRight = new Class(new ModelRelationsTextsEditorRight());
ModelRelationsTextsEditorRight.ID = "modelRelationsTextsEditorRight";
