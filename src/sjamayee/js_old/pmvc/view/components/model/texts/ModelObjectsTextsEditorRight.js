var ModelObjectsTextsEditorRight = function() {
  this.Extends = TextsEditor;
  this.textarea = null;

	this.initialize = function(name,properties) {
    var html = this.buildHtml();
		//alert("ModelObjectsTextsEditorRight/initialize - html: "+html);
		this.parent(ModelObjectsTextsEditorRight.ID, {html: html});		
	};
	
  this.buildHtml = function() {
    var textEditorId = ModelObjectsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
   	//var result = '<div id="'+ModelObjectsTextsEditorRight.ID+'" style="position:relative;float:left;width:65%;height:100%;'+
    //         //'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler_gif\');background-position:left top;background-repeat:no-repeat;">'+
    //           'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler91_gif\');background-position:left top;background-repeat:no-repeat;">'+
    var result = '<textarea id="'+textEditorId+'" name="'+textEditorId+'"body" class="'+TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID+'">'+
                 'X             : Line marker (-,#,/,SPACE)\n'+
                 'LL            : Label\n'+
                 'Y             : Code\n'+
                 'Z             : Code\n'+
                 'SSSSSSSS      : Statement\n'+
                 'PPP           : Paragraph\n'+
                 'TR            : TRUE-label\n'+
                 'FA            : FALSE-label\n'+
                 'CCCCCCCCCCCCCC: Line condition\n'+
                 '-Comment\n'+
                 ' 01-01: Comment marker (-)\n'+
                 ' 02-80:Text\n'+
                 '#Logic\n'+
                 ' 01-01: Logic marker (#)\n'+
                 ' 02-39: Description\n'+
                 ' 41-42: Label (xx)\n'+
                 ' 44-44: Code ???\n'+
                 ' 46-46: Code (n:0-9)\n'+
                 ' 48-55: Statement\n'+
                 '        48-50: Operand1/Variable (a00-z99)\n'+
                 '        51-51: Operator (*,=,#,+)\n'+
                 '        52-55: Operand2/Variable/Constant\n'+
                 ' 57-59: Paragraph\n'+
                 ' 61-62: TRUE-label\n'+
                 ' 64-65: FALSE-label\n'+
                 '/Paragraph name\n'+
                 ' 01-01: Paragraph marker (/)\n'+
                 ' 02-04: Paragraph (000-999)\n'+
                 ' Paragraph text (evt. with Line_condition/Statement)                #xxx..........\n'+
                 ' 01-01: Paragraph marker (SPACE-character)\n'+
                 ' 02-66: Text with variable substitution.\n'+
                 ' Line condition:\n'+
                 ' 67-67: Condition marker (#)\n'+
                 ' 68-70: Operand1/Variable (a00-z99)\n'+
                 ' 71-71: Operator (*,=,#,+)\n'+
                 ' 72-80: Operand2/Variable/Constant\n'+
                 '&nbsp;\n'+
                 'Example:\n'+
                 '--------------------------------------------------------------------\n'+
                 '#                                        |  | | |a81*TAB |   |  |  |\n'+
                 '#                                        |  | | |a82*-   |   |  |  |\n'+
                 '--------------------------------------------------------------------\n'+
                 '# Entity number                          |  | | |y75*0   |   |  |  |\n'+
                 '#                                        |  | | |y76*0   |   |  |  |\n'+
                 '#                                        |  | | |d01*1   |   |  |  |\n'+
                 '#                                        |  | | |y04*0   |005|  |  |\n'+
                 '# Loop 1                                 |ta| |1|a02=dele|   |ex|  |\n'+
                 '# Generation WHERE-clause                |  | | |a02=rest|   |  |tb|\n'+
                 '#                                        |  | |8|x01+rest|   |  |  |\n'+
                 '#                                        |  | | |d01*2   |   |ta|ta|\n'+
                 '#                                        |tb| | |a02=tab |001|  |ta|\n'+
                 '#                                        |  | | |d01*2   |   |ta|ta|\n'+
                 '--------------------------------------------------------------------\n'+
                 '# Exit                                   |ex| | |        |006|00|00|\n'+
                 '--------------------------------------------------------------------\n'+
                 '/001\n'+
                 '               DELETE FROM £b02 £a51                                #b04=\n'+
                 '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
                 '/005\n'+
                 '           EXEC SQL\n'+
                 '/006\n'+
                 '           END-EXEC.\n'+
                 '--------------------------------------------------------------------\n'+
                 'Example 2: ----------------------------------------------------START\n'+
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
                 'Example 2: ------------------------------------------------------END\n'+
                 '</textarea>';
    //           '</div>';               
 		return result;		
	};
	
  this.initializeChildren = function() {
    //this.parent();
    //var name = this.getUicName();
  	//alert("ModelObjectsTextsEditorRight/initializeChildren - name: "+name);
  	var textEditorId = ModelObjectsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
    this.textarea = $(textEditorId);
  };
};
ModelObjectsTextsEditorRight = new Class(new ModelObjectsTextsEditorRight());
ModelObjectsTextsEditorRight.ID = "modelObjectsTextsEditorRight";
