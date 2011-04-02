//Abstract
var TypeProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function(name) {
		this.parent(name);
		//this.addItem(new ModelTypeVO("1","type1","name1","desc1","objekt1","inUse1"));
  	//Initialize data.
  	//this.setData(new Array());  	
  	//this.loadTypes();
	};

	this.getTypes = function() {
	  //this.loadTypes();
	  var result = this.getData();
    //Sort DESCENDING
    result.sort();
	  return result;
	};
/*
	this.loadTypes = function() {
  	var typesText = sforce.apex.execute('sja.TypeService','getTypes',{});
		//alert("ModelTypeProxy/loadTypes - typesText:\n"+String(typesText).substring(0,500));
		var types = Utils.eval(typesText,true);		 
    var i = 0;
    while (types.types[i]) {
      var jso = types.types[i];
      this.addItem(new ModelTypeVO(jso.id,jso.type,jso.name,jso.desc,jso.objekt,jso.inUse));
	    i++;
    }
	}
*/
	this.loadTypesDemo = function() {
    //ATT: NOT STORED !!! ONLY RETURNED !!!
    var result = [];
		var types = _types.types;
		var i = 0;
		while (types[i]) {
			var jso = types[i];
      result.push(new ModelTypeVO(jso.id,jso.type,jso.name,jso.desc,jso.objekt,jso.inUse));
      i++;
		}
    //Sort ASCENDING
    //result.sort(TypeProxy.sortName);
		alert("TypeProxy/loadTypesDemo - types: "+result.length);		
		return result;
	};
  
  this.getByType = function(type) {
  	//Utils.alert("ModelTypeProxy/getByType - type: "+type);
  	var result = null;
  	try {
  		if (type) {
  	    var items = this.getData();
  		//alert("ModelTypeProxy/getByType - items/length: "+items.length);
  	    if (items) {
  	      for (var i in items) {
  	        if (items[i]) {
  	          var item = items[i];
        		  if (item.type == type) {
  	            result = item;
  	            break;
  	          }
  	        }
  	      }
  			}
  		}
  	} catch(error) {
  		Utils.alert("ModelTypeProxy/getByType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
    	//alert("ModelTypeProxy/getByType - type: "+type+" result: "+result);
  		return result;
  	}
  };
};
TypeProxy = new Class(new TypeProxy());
//TypeProxy.ID = "TypeProxy";
TypeProxy.sortName = function(a,b) {
  return a.name - b.name;
};
