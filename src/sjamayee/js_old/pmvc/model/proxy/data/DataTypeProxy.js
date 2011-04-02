var DataTypeProxy = function() {
  //this.Extends = ModelTypeProxy;
  this.Extends = TypeProxy;

	this.initialize = function() {
		this.parent(DataTypeProxy.ID);
		//this.addItem(new DataTypeVO("1","type1","name1","desc1","objekt1","inUse1"));
		//Initialize data.
		//this.loadTypes();
		this.loadTypesDemo();
	};
	
	this.loadTypes = function() {
		this.setData(new Array());
  	var typesText = sforce.apex.execute('sja.DataEntityService','getTypes',{});
		//alert("DataTypeProxy/loadTypes - typesText:\n"+String(typesText).substring(0,500));
		var types = Utils.eval(typesText,true);		 
    var i = 0;
    while (types.types[i]) {
      var jso = types.types[i];
      this.addItem(new DataTypeVO(jso.id,jso.type,jso.name,jso.desc,jso.objekt,jso.inUse));
	    i++;
	    //if (i > 10) { break; }
    }
	};

	this.loadTypesDemo = function() {
  	this.setData(new Array());
  	var types = this.parent();
  	if (types.length > 0) {
		  var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
		  var modelEntities = modelEntityProxy.getEntities();
		  var dataEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
		  var dataEntities = dataEntityProxy.getEntities();
  		var tids = [];
  		for (var i in dataEntities) {
        for (var j in modelEntities) {
          if (modelEntities[j].id == dataEntities[i].mei) {
            tids.push(modelEntities[j].tid);
            break;
          }
        }
  		}
      for (var i in tids) {
        for (var j in types) {
          if (types[j].id == tids[i]) {
            this.addItem(types[j]);            
            break;
          }
        }
      }
  		alert("DataTypeProxy/loadTypesDemo - types: "+this.getData().length);
		}
	};
};
DataTypeProxy = new Class(new DataTypeProxy());
DataTypeProxy.ID = "DataTypeProxy";
