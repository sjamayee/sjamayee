//Class: DrupalScrambler
var DrupalScrambler = new Class({
  Extends: Scrambler,
  initialize: function(options) {
    this.parent(options);
    alert("ScramblerMediator/drupal"+
          "\nurl: "+options.url+
          "\nclear: "+options.clear);
  },
  scramble: function() {
    alert("DrupalScrambler/scramble");
  }
});
