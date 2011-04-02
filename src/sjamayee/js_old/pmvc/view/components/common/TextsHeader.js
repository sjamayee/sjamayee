//Abstract
var TextsHeader = function() {
  this.Extends = SjamayeeUIComponent;

	this.initialize = function(name,properties) {
		this.parent(name,properties);
	};
};
TextsHeader = new Class(new TextsHeader());
