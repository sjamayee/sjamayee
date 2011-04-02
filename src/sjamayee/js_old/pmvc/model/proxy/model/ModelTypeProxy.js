var ModelTypeProxy = function() {
  //this.Extends = CachingProxy;
  this.Extends = TypeProxy;

	this.initialize = function() {
		this.parent(ModelTypeProxy.ID);
		//this.addItem(new ModelTypeVO("1","type1","name1","desc1","objekt1","inUse1"));
  	//Initialize data.
  	//this.loadTypes();
  	this.loadTypesDemo();
	};

	this.loadTypes = function() {
  	this.setData(new Array());
  	var typesText = sforce.apex.execute('sja.ModelEntityService','getTypes',{});
		//alert("ModelTypeProxy/loadTypes - typesText:\n"+String(typesText).substring(0,500));
		var types = Utils.eval(typesText,true);		 
    var i = 0;
    while (types.types[i]) {
      var jso = types.types[i];
      this.addItem(new ModelTypeVO(jso.id,jso.type,jso.name,jso.desc,jso.objekt,jso.inUse));
	    i++;
    }
	};

	this.loadTypesDemo = function() {
  	this.setData(new Array());
  	var types = this.parent();
  	if (types.length > 0) {
		  var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);			
		  var entities = modelEntityProxy.getEntities();
  		var tids = [];
  		for (var i in entities) {
  			tids.push(entities[i].tid);
  		}
      for (var i in tids) {
        for (var j in types) {
          if (types[j].id == tids[i]) {
            this.addItem(types[j]);            
            break;
          }
        }
      }
  		alert("ModelTypeProxy/loadTypesDemo - types: "+this.getData().length);
		}
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
ModelTypeProxy = new Class(new ModelTypeProxy());
ModelTypeProxy.ID = "ModelTypeProxy";
