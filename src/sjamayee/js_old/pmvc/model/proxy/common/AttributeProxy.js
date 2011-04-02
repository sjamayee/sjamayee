//Abstract
var AttributeProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function(name) {
		this.parent(name);
	};
};
AttributeProxy = new Class(new AttributeProxy());
