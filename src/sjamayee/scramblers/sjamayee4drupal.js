// $Id$

//Class: DrupalScrambler
var DrupalScrambler = new Class({
  Extends: Scrambler,
  initialize: function(options) {
    this.parent(options);
    alert("ScramblerMediator/drupal"+
          "\nurl: "+options.url+
          "\nobjectsLimit: "+options.objectsLimit+
          "\nreferencesLimit: "+options.referencesLimit+
          "\nattributesLimit: "+options.attributesLimit+          
          "\nclear: "+options.clear);
  },
  scramble: function() {
    alert("DrupalScrambler/scramble");

    //Server side.
    alert("DrupalScrambler/Call REST-service and get json result.");

    //Client side.
    //alert("DrupalScrambler/Load datasets (types,texts,objects,references,attributes) from json result.");
    
    //Link all model child references for one parent by previous and next id's.
    this.linkModelReferences();
    //Link all data child references for one parent by previous and next id's.
    this.linkDataReferences();
  }
});
