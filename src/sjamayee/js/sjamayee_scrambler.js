// $Id$

//**********************************************************************//
//*********************** Scrambler (Main View) ************************//
//**********************************************************************//
//Class: ScramblerForm
var ScramblerForm = new Class({
  Extends: UIComponent, //SjamayeeUIComponent, //UIComponent,
  initialize: function() {  
    this.appName = "Scrambler";
    this.typeSelect = null;
    this.url = null;
    this.objectsLimit = null;
    this.referencesLimit = null;
    this.attributesLimit = null;
    this.clearCheckBox = null;
    this.okButton = null;
    this.cancelButton = null;
    var html = '<table style="height:90%;width:100%;position:relative;float:left;align:left;border:none;">'+
               '<tr style="height:40px;">'+
               '<td style="width:5%;">'+ScramblerForm.TYPE_SELECT_LABEL+'</td>'+
               '<td style="width:95%;">'+
               '<select id="'+ScramblerForm.TYPE_SELECT_ID+'">'+
               '<option>'+ScramblerForm.TYPE_DOCUMENTUM+'</option>'+
               '<option>'+ScramblerForm.TYPE_DRUPAL+'</option>'+
               '<option>'+ScramblerForm.TYPE_FACEBOOK+'</option>'+
               '<option>'+ScramblerForm.TYPE_GIT+'</option>'+
               '<option>'+ScramblerForm.TYPE_GOOGLE+'</option>'+
               '<option>'+ScramblerForm.TYPE_LINUX+'</option>'+
               '<option>'+ScramblerForm.TYPE_MYSQL+'</option>'+
               '<option>'+ScramblerForm.TYPE_OPENSOCIAL+'</option>'+
               '<option>'+ScramblerForm.TYPE_ORACLE+'</option>'+
               '<option>'+ScramblerForm.TYPE_OSX+'</option>'+
               '<option>'+ScramblerForm.TYPE_SALESFORCE+'</option>'+
               '<option>'+ScramblerForm.TYPE_SAP+'</option>'+
               '<option>'+ScramblerForm.TYPE_TEST+'</option>'+
               '<option>'+ScramblerForm.TYPE_TWITTER+'</option>'+
               '<option>'+ScramblerForm.TYPE_UNIX+'</option>'+
               '<option>'+ScramblerForm.TYPE_WIKIPEDIA+'</option>'+
               '<option>'+ScramblerForm.TYPE_YOUTUBE+'</option>'+
               '</select>'+
               '</td>'+
               '</tr>'+
               '<tr style="height:40px;">'+
               '<td>'+ScramblerForm.URL_LABEL+'</td>'+
               '<td>'+'<input type="text" id="'+ScramblerForm.URL_ID+'" value=""/>'+'</td>'+
               '</tr>'+
               '<tr style="height:40px;">'+'<td>'+ScramblerForm.LIMITS_LABEL+'</td>'+
               '<td>&nbsp;</td>'+
               '</tr>'+
               '<tr style="height:40px;">'+
               '<td>'+ScramblerForm.OBJECTS_LIMIT_LABEL+'</td>'+
               '<td>'+'<input type="text" id="'+ScramblerForm.OBJECTS_LIMIT_ID+'" value="" maxlength="6"/>'+'</td>'+
               '</tr>'+
               '<tr style="height:40px;">'+
               '<td>'+ScramblerForm.REFERENCES_LIMIT_LABEL+'</td>'+
               '<td>'+'<input type="text" id="'+ScramblerForm.REFERENCES_LIMIT_ID+'" value="" maxlength="6"/>'+'</td>'+
               '</tr>'+
               '<tr style="height:40px;">'+
               '<td>'+ScramblerForm.ATTRIBUTES_LIMIT_LABEL+'</td>'+
               '<td>'+'<input type="text" id="'+ScramblerForm.ATTRIBUTES_LIMIT_ID+'" value="" maxlength="4"/>'+'</td>'+
               '</tr>'+
               '<tr style="height:40px;">'+
               '<td>'+ScramblerForm.CLEAR_CHECKBOX_LABEL+'</td>'+
               '<td>'+'<input type="checkbox" id="'+ScramblerForm.CLEAR_CHECKBOX_ID+'" name="'+ScramblerForm.CLEAR_CHECKBOX_ID+'" value="true"/>'+'</td>'+
               '</tr>'+
               //'<tr style="height:20px;"><td>&nbsp;</td><td>&nbsp;</td></tr>'+
               '<tr style="height:40px;">'+
               '<td>&nbsp;</td>'+
               '<td>'+
               '<button id="'+ScramblerForm.OK_BUTTON_ID+'" title="'+ScramblerForm.OK_BUTTON_TITLE+'">'+ScramblerForm.OK_BUTTON_LABEL+'</button>'+
               '<button id="'+ScramblerForm.CANCEL_BUTTON_ID+'" title="'+ScramblerForm.CANCEL_BUTTON_TITLE+'">'+ScramblerForm.CANCEL_BUTTON_LABEL+'</button>'+
               '</td>'+
               '</tr>'+
               '</table>';
    this.parent(ScramblerForm.ID,{html:html, height:$pick(window.getHeight(),document.body.clientHeight)});
    this.facade = SjamayeeFacade.getInstance();
    this.typeSelect_changeHandler = this.typeSelect_changeHandler.bindWithEvent(this);
    this.okButton_clickHandler = this.okButton_clickHandler.bindWithEvent(this);
    this.cancelButton_clickHandler = this.cancelButton_clickHandler.bindWithEvent(this);    
  },
  initializeChildren: function() {
    this.typeSelect = $(ScramblerForm.TYPE_SELECT_ID);
    this.url = $(ScramblerForm.URL_ID);
    this.objectsLimit = $(ScramblerForm.OBJECTS_LIMIT_ID);
    this.referencesLimit = $(ScramblerForm.REFERENCES_LIMIT_ID);
    this.attributesLimit = $(ScramblerForm.ATTRIBUTES_LIMIT_ID);
    this.clearCheckBox = $(ScramblerForm.CLEAR_CHECKBOX_ID);
    this.okButton = $(ScramblerForm.OK_BUTTON_ID);
    this.cancelButton = $(ScramblerForm.CANCEL_BUTTON_ID);
  },
  childrenInitialized: function() {
    this.typeSelect.addEvent(SjamayeeFacade.CHANGE, this.typeSelect_changeHandler);
    this.okButton.addEvent(SjamayeeFacade.CLICK, this.okButton_clickHandler);
    this.cancelButton.addEvent(SjamayeeFacade.CLICK, this.cancelButton_clickHandler);
  },
  initializationComplete: function() {
    //Show Scrambler Form.
    //this.sendNotification(SjamayeeFacade.SCRAMBLER_SHOW);
    this.facade.registerMediator(new ScramblerMediator(this));    
    //this.facade.sendNotification(SjamayeeFacade.SCRAMBLER_SHOW);
  },
  typeSelect_changeHandler: function()  {
    //this.fireEvent(ScramblerForm.TYPE_SELECT_CHANGE);
    /*try {
      var scrambler = null;
      switch (this.typeSelect.value) {
        case 'Documentum': alert("ScramblerForm/documentum");
        break;
        case 'Drupal':
        alert("ScramblerForm/drupal");
        break;
        case 'Facebook': alert("ScramblerForm/facebook");
        break;
        case 'Git': alert("ScramblerForm/git");
        break;
        case 'Google': alert("ScramblerForm/google");
        break;
        case 'Linux': alert("ScramblerForm/linux");
        break;
        case 'Mysql': alert("ScramblerForm/mysql");
        break;
        case 'Opensocial': alert("ScramblerForm/opensocial");
        break;
        case 'Oracle': alert("ScramblerForm/oracle");
        break;
        case 'Osx': alert("ScramblerForm/osx");
        break;
        case 'Salesforce': alert("ScramblerForm/salesforce");
        break;
        case 'Sap': alert("ScramblerForm/sap");
        break;
        case 'TEST': alert("ScramblerForm/TEST");
        break;
        case 'Twitter': alert("ScramblerForm/twitter");
        break;
        case 'Unix': alert("ScramblerForm/unix");
        break;
        case 'Wikipedia': alert("ScramblerForm/wikipedia");
        break;
        case 'Youtube': alert("ScramblerForm/youtube");
        break;
      }
    } catch(error) {
      Utils.alert("ScramblerForm/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }*/
  },
  okButton_clickHandler: function() {
    //alert("ScramblerForm/okButton - click");
    this.fireEvent(ScramblerForm.OK_BUTTON_CLICK);
  },
  cancelButton_clickHandler: function() {
    //alert("ScramblerForm/cancelButton - click");
    this.fireEvent(ScramblerForm.CANCEL_BUTTON_CLICK);
  }
});
ScramblerForm.ID = "scramblerForm";
ScramblerForm.TYPE_SELECT_ID = "scramblerTypeSelect";
ScramblerForm.TYPE_SELECT_LABEL = "Type:";
ScramblerForm.TYPE_SELECT_CHANGE = Scrambler.TYPE_SELECT_ID+"Change";
ScramblerForm.TYPE_DOCUMENTUM = "Documentum";
ScramblerForm.TYPE_DRUPAL = "Drupal";
ScramblerForm.TYPE_FACEBOOK = "Facebook";
ScramblerForm.TYPE_GIT = "Git";
ScramblerForm.TYPE_GOOGLE = "Google";
ScramblerForm.TYPE_LINUX = "Linux";
ScramblerForm.TYPE_MYSQL = "Mysql";
ScramblerForm.TYPE_OPENSOCIAL = "Opensocial";
ScramblerForm.TYPE_ORACLE = "Oracle";
ScramblerForm.TYPE_OSX = "Osx";
ScramblerForm.TYPE_SALESFORCE = "Salesforce";
ScramblerForm.TYPE_SAP = "Sap";
ScramblerForm.TYPE_TEST = "TEST";
ScramblerForm.TYPE_TWITTER = "Twitter";
ScramblerForm.TYPE_UNIX = "Unix";
ScramblerForm.TYPE_WIKIPEDIA = "Wikipedia";
ScramblerForm.TYPE_YOUTUBE = "Youtube";
ScramblerForm.URL_ID = "scramblerUrl";
ScramblerForm.URL_LABEL = "Url:";
ScramblerForm.LIMITS_LABEL = "Limits";
ScramblerForm.OBJECTS_LIMIT_ID = "scramblerObjectsLimit";
ScramblerForm.OBJECTS_LIMIT_LABEL = "Objects/Scramble:";
ScramblerForm.REFERENCES_LIMIT_ID = "scramblerReferencesLimit";
ScramblerForm.REFERENCES_LIMIT_LABEL = "References/Object:";
ScramblerForm.ATTRIBUTES_LIMIT_ID = "scramblerAttributesLimit";
ScramblerForm.ATTRIBUTES_LIMIT_LABEL = "Attributes/Object:";
ScramblerForm.CLEAR_CHECKBOX_ID = "scramblerClear";
ScramblerForm.CLEAR_CHECKBOX_LABEL = "Clear before:";
ScramblerForm.OK_BUTTON_ID = "scramblerOkButton";
ScramblerForm.OK_BUTTON_LABEL = "Ok";
ScramblerForm.OK_BUTTON_CLICK = Scrambler.OK_BUTTON_ID+"Click";
ScramblerForm.CANCEL_BUTTON_ID = "scramblerCancelButton";
ScramblerForm.CANCEL_BUTTON_LABEL = "Cancel";
ScramblerForm.CANCEL_BUTTON_CLICK = Scrambler.CANCEL_BUTTON_ID+"Click";

////////////////////////////////////////////////////////
//Mediators ////////////////////////////////////////////
////////////////////////////////////////////////////////
//Class: ScramblerMediator
var ScramblerMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(viewComponent) {
    this.parent(ScramblerMediator.ID,viewComponent);
    var form = this.getViewComponent();
    //this.onTypeChange = this.onTypeChange.bindWithEvent(this);
    this.onOkClick = this.onOkClick.bindWithEvent(this);
    this.onCancelClick = this.onCancelClick.bindWithEvent(this);
    //form.addEvent(ScramblerForm.TYPE_SELECT_CHANGE, this.onTypeChange);    
    form.addEvent(ScramblerForm.OK_BUTTON_CLICK, this.onOkClick);    
    form.addEvent(ScramblerForm.CANCEL_BUTTON_CLICK, this.onCancelClick);    
    //Initialize SelectLists.
    //form.typeSelect.innerHTML = <get Scrambler options> //Setting.getSettingOptions();
  },
  //onTypeChange: function()  { /*alert("ScramblerMediator/onTypeChange");*/ },
  onOkClick: function()     {
    //alert("ScramblerMediator/onOkClick");
    try {
      var scrambler = null;
      var form = this.getViewComponent();
      var options = {
        url:form.url.value,
        objectsLimit:form.objectsLimit.value,
        referencesLimit:form.referencesLimit.value,
        attributesLimit:form.attributesLimit.value,
        clear:(form.clearCheckBox.checked?'TRUE':'FALSE')
      };
      switch (form.typeSelect.value) {
        case 'Documentum':
        //alert("ScramblerMediator/documentum");
        break;
        case 'Drupal':
        /*alert("ScramblerMediator/drupal"+
              "\nurl: "+form.url.value+
              "\nobjectsLimit: "+form.objectsLimit.value+
              "\nreferencesLimit: "+form.referencesLimit.value+
              "\nattributesLimit: "+form.attributesLimit.value+
              "\nclear: "+(form.clearCheckBox.checked?'TRUE':'FALSE'));*/
        scrambler = new DrupalScrambler(options);
        scrambler.scramble();
        break;
        case 'Facebook':
        //alert("ScramblerMediator/facebook");
        break;
        case 'Git':
        //alert("ScramblerMediator/git");
        break;
        case 'Google':
        //alert("ScramblerMediator/google");
        break;
        case 'Linux':
        //alert("ScramblerMediator/linux");
        break;
        case 'Mysql':
        //alert("ScramblerMediator/mysql");
        break;
        case 'Opensocial':
        //alert("ScramblerMediator/opensocial");
        break;
        case 'Oracle':
        //alert("ScramblerMediator/oracle");
        break;
        case 'Osx':
        //alert("ScramblerMediator/osx");
        break;
        case 'Salesforce':
        //alert("ScramblerMediator/salesforce");
        break;
        case 'Sap':
        //alert("ScramblerMediator/sap");
        break;
        case 'TEST':
        //alert("ScramblerMediator/TEST");
        break;
        case 'Twitter':
        //alert("ScramblerMediator/twitter");
        break;
        case 'Unix':
        //alert("ScramblerMediator/unix");
        break;
        case 'Wikipedia':
        //alert("ScramblerMediator/wikipedia");
        break;
        case 'Youtube':
        //alert("ScramblerMediator/youtube");
        break;
      }
      //scrambler.scramble();
      if (!scrambler) { alert(form.typeSelect.value+"Scrambler not implemented!"); }
    } catch(error) {
      Utils.alert("ScramblerMediator/onOkClick Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  onCancelClick: function() {
    //alert("ScramblerMediator/onCancelClick");
    window.close();
  }
});
ScramblerMediator.ID = "ScramblerMediator";

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// SCRAMBLER ////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: Scrambler
var Scrambler = new Class({
  initialize: function(options) {
    this.url = options.url;
    this.clear = options.clear;    
  },
  scramble: function() {
    alert("Scrambler/scramble - not implemented.");
    //Server side.
    //Call WebService (evt.REST-service) and get json result.
    
    //Client side.
    //Load datasets (types,texts,objects,references,attributes) from json result.
    
    //Link all model child references for one parent by previous and next id's.
    this.linkModelReferences();
    //Link all data child references for one parent by previous and next id's.
    this.linkDataReferences();
  },
  linkReferences: function() {
    alert("Scrambler/linkReferences");    
  },
  linkModelReferences: function() {
    alert("Scrambler/linkModelReferences");
    this.linkReferences();
  },
  linkDataReferences: function() {
    alert("Scrambler/linkDataReferences");    
    this.linkReferences();
  }
});
Scrambler.ID = "Scrambler";

/*
//Link References.
//Link all model child references for one parent by previous and next id's.
$model_objects = db_query('select * from {' . $O . '} where mei = NULL');
foreach ($model_objects as $model_object) {
  //$model_references = db_select($R, 'r')->condition('r.pei', $model_object->id, '=')->execute();
  $model_references = db_query('select * from {' . $R . '} where pei = :pei', array(':pei' => $model_object->id));
  //_sjamayee_link_references($R, $model_references);
  _sjamayee_link_references($model_references);
}
//Link all data child references for one parent by previous and next id's.
$data_objects = db_query('select * from {' . $O . '} where mei != NULL');
foreach ($data_objects as $data_object) {
  //$data_references = db_select($R, 'r')->condition('r.pei', $data_object->id, '=')->execute();
  $data_references = db_query('select * from {' . $R . '} where pei = :pei', array(':pei' => $data_object->id));
  //_sjamayee_link_references($R, $data_references);
  _sjamayee_link_references($data_references);
}
*/
