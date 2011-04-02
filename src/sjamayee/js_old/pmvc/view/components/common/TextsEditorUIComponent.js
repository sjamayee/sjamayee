//Abstract
var TextsEditorUIComponent = function() {
  this.Extends = SjamayeeUIComponent;
  //this.relationTextButton = null;
  //this.parentTextButton = null;
  //this.childTextButton = null;

	this.initialize = function(name,properties) {
		this.parent(name,properties);
  };
/*
	this.initialize = function(name,properties) {
	  var textEditorId = name+TextsEditorUIComponent.COMPONENT_ID;
	  alert("TextsEditorUIComponent/initialize - textEditorId: "+textEditorId);
		var html = '<div id="'+name+'" style="width:100%;height:100%;">'+
		           '<div id="'+name+TextsEditorUIComponent.LEFT_PANE_ID+'" style="position:relative;float:left;width:35%;height:100%;background-color:#FF887A;text-align:center;">'+
	             '<br/><br/><h2>MODEL TEXT EDITOR</h2><br/><br/>';
    if (name == ModelRelationsTextsEditor.ID) {
   	  html += '<button id="'+name+TextsEditorUIComponent.RELATION_TEXT_BUTTON_ID+'" class="'+TextsEditorUIComponent.BUTTON_CLASS_ID+'">'+TextsEditorUIComponent.RELATION_TEXT_BUTTON_VALUE+'</button>'+
              '<br/><br/>'+
   	          '<button id="'+name+TextsEditorUIComponent.PARENT_TEXT_BUTTON_ID+'" class="'+TextsEditorUIComponent.BUTTON_CLASS_ID+'">'+TextsEditorUIComponent.PARENT_TEXT_BUTTON_VALUE+'</button>'+
              '<br/><br/>'+
   	          '<button id="'+name+TextsEditorUIComponent.CHILD_TEXT_BUTTON_ID+'" class="'+TextsEditorUIComponent.BUTTON_CLASS_ID+'">'+TextsEditorUIComponent.CHILD_TEXT_BUTTON_VALUE+'</button>';
   	}
    html += '</div>'+
            '<div id="'+name+TextsEditorUIComponent.RIGHT_PANE_ID+'" style="position:relative;float:left;width:65%;height:100%;'+
            //'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler_gif\');background-position:left top;background-repeat:no-repeat;">'+
            'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler91_gif\');background-position:left top;background-repeat:no-repeat;">'+
            '<textarea id="'+textEditorId+'" name="body">'+ //class="'+TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID+'">'+
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
            '</textarea>'+
            '</div>'+
            '</div>';               
		this.parent(name,{html:html});
    this.keyup_Handler = this.keyup_Handler.bindWithEvent(this);
    this.addEvent(SjamayeeFacade.KEYUP, this.keyup_Handler);
    if (name == ModelRelationsTextsEditor.ID) {		
      this.relationTextButton_clickHandler = this.relationTextButton_clickHandler.bindWithEvent(this);
      this.parentTextButton_clickHandler = this.parentTextButton_clickHandler.bindWithEvent(this);
      this.childTextButton_clickHandler = this.childTextButton_clickHandler.bindWithEvent(this);
    }
	}

  this.initializeChildren = function() {
    this.parent();
    var name = this.getUicName();
  	alert("TextsEditorUIComponent/initializeChildren - name: "+name);
    if (name == ModelRelationsTextsEditor.ID) {
      this.relationTextButton = $(name+TextsEditorUIComponent.RELATION_TEXT_BUTTON_ID);
      this.parentTextButton = $(name+TextsEditorUIComponent.PARENT_TEXT_BUTTON_ID);
      this.childTextButton = $(name+TextsEditorUIComponent.CHILD_TEXT_BUTTON_ID);
    }
  }
  
  this.childrenInitialized = function() {
    this.parent();
    var name = this.getUicName();
  	alert("TextsEditorUIComponent/childrenInitialized - name: "+name);
    if (name == ModelRelationsTextsEditor.ID) {
      this.relationTextButton.addEvent(SjamayeeFacade.CLICK, this.relationTextButton_clickHandler);
      this.parentTextButton.addEvent(SjamayeeFacade.CLICK, this.parentTextButton_clickHandler);
      this.childTextButton.addEvent(SjamayeeFacade.CLICK, this.childTextButton_clickHandler);
    }
  }

  this.keyup_Handler = function()	{
  	this.fireEvent(SjamayeeFacade.TEXT_KEYUP);
  }
  
  this.relationTextButton_clickHandler = function()	{
  	//alert("TextsEditorUIComponent/relationTextButton_clickHandler - TEXT_RELATION_EDIT");
  	this.fireEvent(SjamayeeFacade.TEXT_RELATION_EDIT);
  }

  this.parentTextButton_clickHandler = function()	{
  	this.fireEvent(SjamayeeFacade.TEXT_PARENT_EDIT);
  }

  this.childTextButton_clickHandler = function()	{
  	this.fireEvent(SjamayeeFacade.TEXT_CHILD_EDIT);
  }
*/
};
TextsEditorUIComponent = new Class(new TextsEditorUIComponent());
TextsEditorUIComponent.CLASS_ID = "TextsEditorUIComponent";
TextsEditorUIComponent.CLASS_NORMAL_ID = "TextsEditorUIC_Normal";
TextsEditorUIComponent.CLASS_MAXIMUM_ID = "TextsEditorUIC_Maximum";
TextsEditorUIComponent.COMPONENT_ID = "textsEditorUICBody";
//TextsEditorUIComponent.LEFT_PANE_ID = "textsEditorUICLeft";
//TextsEditorUIComponent.RIGHT_PANE_ID = "textsEditorUICRight";
//TextsEditorUIComponent.BUTTON_CLASS_ID = "textsEditorUICButton";
//TextsEditorUIComponent.RELATION_TEXT_BUTTON_ID = "relationTextButton";
//TextsEditorUIComponent.RELATION_TEXT_BUTTON_VALUE = "Relation";
//TextsEditorUIComponent.PARENT_TEXT_BUTTON_ID = "parentTextButton";
//TextsEditorUIComponent.PARENT_TEXT_BUTTON_VALUE = "Parent";
//TextsEditorUIComponent.CHILD_TEXT_BUTTON_ID = "childTextButton";
//TextsEditorUIComponent.CHILD_TEXT_BUTTON_VALUE = "Child";
