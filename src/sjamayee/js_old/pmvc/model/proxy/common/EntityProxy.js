//Abstract
var EntityProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function(name) {
		this.parent(name);
	};

	this.getEntities = function() {
	  //this.loadEntities();
	  var result = this.getData();
    //Sort DESCENDING
    result.sort();
	  return result;
	};

  this.filterObject = function(object) {
    var result = object;
    var filterValue = this.getHeaderMediator().getEntityFilterValue();
    if (filterValue) {
      var re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS;
      if (this.getHeaderMediator().getEntityFilterCase() === true) {
        re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE;
      }
      var regexp = new RegExp(filterValue,re_modifiers);
      if ((object.getName().match(regexp) === null) &&
          (object.getDesc().match(regexp) === null)) {
        result = null;
      }
    }
    if (result) {
      var modelTypeId = null;
      var modelType = this.getHeaderMediator().getTypeSelected();
      if (modelType) { modelTypeId = modelType.getId();	}
    	if (modelTypeId) {
        var typeId = null;
    	  if (object instanceof DataEntity) {
      	  typeId = object.getModelEntity().getTid();
    	  }
    	  if (object instanceof ModelEntity) {
      	  typeId = object.getTid();
    	  }
    	  if ((typeId === null) || (typeId != modelTypeId)) {
    	    result = null;
    	  }
    	}
    }
    return result;
  };
};
EntityProxy = new Class(new EntityProxy());
