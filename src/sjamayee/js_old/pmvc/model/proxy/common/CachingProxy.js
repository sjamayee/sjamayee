//Abstract
var CachingProxy = function() {
  this.Extends = Proxy;
	this.topOid = null;
	this.bottomOid = null;
	this.currentOid = null;

	this.initialize = function(name) {
		this.parent(name, new Array());
	};

	this.addItem = function(item) {
	  var data = this.getData();
	  for (var i in data) {
	    if (data[i].id == item.id) {
	      return;
	    }
	  }
	  //Only unique items.
		data.push(item);
	};

	this.getTopOid = function() {
	  if (this.topOid === undefined) {
	    this.topOid = null;
	  }
	  return this.topOid;
	};

  this.setTopOid = function(oid) {
    this.topOid = oid;
  };
  
	this.getBottomOid = function() {
	  if (this.bottomOid === undefined) {
	    this.bottomOid = null;
	  }
	  return this.bottomOid;
	};

  this.setBottomOid = function(oid) {
    this.bottomOid = oid;
  };
	
	this.getCurrentOid = function() {
	  if (this.currentOid === undefined) {
	    this.currentOid = null;
	  }
	  return this.currentOid;
	};
	
  this.setCurrentOid = function(oid) {
    this.currentOid = oid;
  };

  this.getById = function(id) {
  	//Utils.alert("CachingProxy/getById - id: "+id);
  	var result = null;
  	try {
  		if (id) {
  	    var items = this.getData();
  			//alert("CachingProxy/getById - items/length: "+items.length);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          var item = items[i];
        		  if (item.id.substr(0,BusinessObject.ID_MIN_LENGTH) == id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
  	            result = item;
  	            break;
  	          }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("CachingProxy/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
    	//alert("CachingProxy/getById - id: "+id+" result: "+result);
  		return result;
  	}
  };

  this.getByName = function(name) {
  	Utils.alert("CachingProxy/getByName - name: "+name);
  	var result = null;
  	try {
  		if (name) {
  	    var items = this.getData();
  		//alert("CachingProxy/getById - items/length: "+items.length+" name: "+name);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          var item = items[i];
  	          if (item.name == name) {
  	            result = item;
  	            break;
  	          }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("CachingProxy/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		return result;
  	}
  };

  //Abstract
  this.getListObject = function(vo) { return null; };	
  this.filterObject = function(object) { return null; };

	this.firstPage = function(pageSize) {
		//alert("CachingProxy/firstPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_FIRST);
	    var objects = this.getData();
			//alert("CachingProxy/firstPage - objects/length: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.push(listObject);
	            if (page.length == 1) { this.setTopOid(listObject.getId()); }
	            this.setBottomOid(listObject.getId());
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	};

	this.previousPage = function(pageSize) {
		//alert("CachingProxy/previousPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_PREVIOUS);
	    var objects = this.getData();
			//alert("CachingProxy/previousPage - objects: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.unshift(listObject);
	            this.setTopOid(listObject.getId());
	            if (page.length == 1) { this.setBottomOid(listObject.getId()); }
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	};

	this.previousLine = function(pageSize) {
		//alert("CachingProxy/previousLine - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
		try {
	    var objects = this.getData();
			//alert("CachingProxy/previousLine - objects/length: "+objects.length);
			if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.unshift(listObject);
	            this.setTopOid(listObject.getId());
	            if (page.length == 1) { this.setBottomOid(listObject.getId()); }
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
			}
		} catch(error) {
			Utils.alert("CachingProxy/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return page;
		}
	};

	this.nextLine = function(pageSize) {
		Utils.alert("CachingProxy/nextLine - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
		try {
	    var objects = this.getData();
			//alert("CachingProxy/nextLine - objects/length: "+objects.length);
			if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.push(listObject);
	            if (page.length == 1) { this.setTopOid(listObject.getId()); }
	            this.setBottomOid(listObject.getId());
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
			}
		} catch(error) {
			Utils.alert("CachingProxy/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return page;
		}
	};

	this.nextPage = function(pageSize) {
		//alert("CachingProxy/nextPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_NEXT);
	    var objects = this.getData();
			//alert("CachingProxy/nextPage - objects: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.push(listObject);
	            if (page.length == 1) { this.setTopOid(listObject.getId()); }
	            this.setBottomOid(listObject.getId());
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	};

	this.lastPage = function(pageSize) {
		//alert("CachingProxy/lastPage - pageSize: "+pageSize);
    var page = [];
	  var listObject = null;
	  try {
	    //var objects = this.getData(ListCache.WEBSERVICE_METHOD_LAST);
	    var objects = this.getData();
			//alert("CachingProxy/lastPage - objects: "+objects.length);
	    if (objects) {
	      for (var i in objects) {
	        if (objects[i]) {
	          var object = objects[i];
	          listObject = this.getListObject(object);
						if (this.filterObject(listObject)) {
	            page.unshift(listObject);
	            this.setTopOid(listObject.getId());
	            if (page.length == 1) { this.setBottomOid(listObject.getId()); }
	            if (pageSize) { if (page.length > pageSize) break; }
	          }
	        }
	      }
	    }
	  } catch(error) {
			Utils.alert("CachingProxy/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
			return page;
	  }
	};
};
CachingProxy = new Class(new CachingProxy());
