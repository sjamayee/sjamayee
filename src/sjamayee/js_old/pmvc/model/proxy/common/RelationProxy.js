//Abstract
var RelationProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function(name) {
		this.parent(name);
	};

	this.getRelations = function() {
	  //this.loadRelations();
	  var result = this.getData();
    //Sort DESCENDING
    result.sort();
	  return result;
	};

  this.getFirstParentForEntity = function(entity) {
  	Utils.alert("RelationProxy/getFirstParentForEntity - entity: "+entity);
  	var result = null;
  	try {
  		if ((entity !== undefined) && (entity !== null)) {
  		  var r1 = null;
  	    var items = this.getData();
  			//alert("RelationProxy/getFirstParentForEntity - items/length: "+items.length);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          r1 = items[i];
              if (r1) {
          			//alert("RelationProxy/getFirstParentForEntity - r1/id:"+r1.id+" pei: "+r1.pei+" cei: "+r1.cei+" pid:"+r1.pid+" nid: "+r1.nid);
    						if (r1.cei !== null) {
            			//alert("RelationProxy/getFirstParentForEntity - r1.cei: "+r1.cei+" eid: "+entity.id+" length: "+entity.id.length);
            			//break;
                	if (r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                		//if (r1.isFirstParent()) {
                   	result = r1;
                   	break;
                		//}
                	}
    						}
              }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("RelationProxy/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return result;
  	}
  }; 

  this.getFirstChildForEntity = function(entity) {
  	Utils.alert("RelationProxy/getFirstChildForEntity - entity: "+entity);
  	var result = null;
  	try {
  		if ((entity !== undefined) && (entity !== null)) {
  		  var r1 = null;
  	    var items = this.getData();
  			//alert("RelationProxy/getFirstChildForEntity - items/length: "+items.length);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          r1 = items[i];
              if (r1) {
          			//alert("RelationProxy/getFirstChildForEntity - r1/id:"+r1.id+" pei: "+r1.pei+" cei: "+r1.cei+" pid:"+r1.pid+" nid: "+r1.nid);
    						if (r1.pei !== null) {
            			//alert("RelationProxy/getFirstChildForEntity - r1.pei: "+r1.pei+" eid: "+entity.id+" length: "+entity.id.length);
            			//break;
                	if (r1.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                		//if (r1.isFirstParent()) {
                   	result = r1;
                   	break;
                		//}
                	}
    						}
              }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("RelationProxy/getFirstChildForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return result;
  	}
  };
  
  this.getLastParentForEntity = function(entity) {
  	Utils.alert("RelationProxy/getLastParentForEntity - entity: "+entity);
  	var result = null;
  	try {
  		if ((entity !== undefined) && (entity !== null)) {
  		  var r1 = null;
  	    var items = this.getData();
  			//alert("RelationProxy/getLastParentForEntity - items/length: "+items.length);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          r1 = items[i];
              if (r1) {
          			//alert("RelationProxy/getLastParentForEntity - r1/id:"+r1.id+" pei: "+r1.pei+" cei: "+r1.cei+" pid:"+r1.pid+" nid: "+r1.nid);
    						if (r1.cei !== null) {
            			//alert("RelationProxy/getLastParentForEntity - r1.cei: "+r1.cei+" eid: "+entity.id+" length: "+entity.id.length);
            			//break;
                	if (r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                		//if (r1.isLastParent()) {
                   	result = r1;
                   	break;
                		//}
                	}
    						}
              }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("RelationProxy/getLastParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return result;
  	}
  }; 
};
RelationProxy = new Class(new RelationProxy());
