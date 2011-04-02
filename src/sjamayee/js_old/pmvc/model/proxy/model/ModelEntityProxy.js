var ModelEntityProxy = function() {
  this.Extends = EntityProxy;
  this.headerMediator = null;  

	this.initialize = function() {
		this.parent(ModelEntityProxy.ID);
		//this.addItem(new ModelEntityVO("1","name1","desc1","tid1","oid1","firstAttributes1","references1"));
		//this.loadEntities();
		this.loadEntitiesDemo();
	};

	this.loadEntities = function() {
		var entitiesText = sforce.apex.execute('sja.ModelEntityService','getEntities',{});
		//alert("ModelEntityProxy/loadEntities - entitiesText:\n"+String(entitiesText).substring(0,500));
    //entitiesText = String(entitiesText).replace("},.*{","},\\n{");
		//alert("ModelEntityProxy/loadEntities:\n"+entitiesText);
		//Utils.writeFile("c:\\modelEntities.txt",entitiesText);    
		var entities = Utils.eval(entitiesText,true);
		//var entities = Utils.eval(modelEntities,true);
		var i = 0;
		while (entities.entities[i]) {
			var jso = entities.entities[i];
	  /*switch (jso.type) {
	      case "ACCT": typeType = "Account";
        break;
	      case "CASE": typeType = "Case";
        break;
	      case "CONT": typeType = "Contact";
        break;
	      case "CNTR": typeType = "Contract";
        break;
	      case "LEAD": typeType = "Lead";
        break;
	      case "OPPO": typeType = "Opportunity";
        break;
	      case "SOLU": typeType = "Solution";
        break;
	      case "USER": typeType = "User";
        break;
	      default:
        break;
	    }*/
			this.addItem(new ModelEntityVO(jso.id,jso.name,jso.desc,jso.tid)); //,jso.oid,jso.firstAttributes,jso.references));
			i++;
		}
    //Sort ASCENDING
    var data = this.getData();
    data.sort(ModelEntityProxy.sortName);
	};
	
	this.loadEntitiesDemo = function() {
  	this.setData(new Array());
		var entities = _modelEntities.entities;
		var i = 0;
		while (entities[i]) {
			var jso = entities[i];
			this.addItem(new ModelEntityVO(jso.id,jso.name,jso.desc,jso.tid)); //,jso.oid,jso.firstAttributes,jso.references));
			i++;
		}
    //Sort ASCENDING
    var data = this.getData();
    data.sort(ModelEntityProxy.sortName);
		return i;
		alert("ModelEntityProxy/loadEntitiesDemo - entities: "+entities+" i: "+i);		
	};

  this.getListObject = function(modelEntityVO) {
    return new ModelEntity(modelEntityVO);
  };
  
  this.getHeaderMediator = function() {
    if (this.headerMediator === null) {
      this.headerMediator = SjamayeeFacade.getInstance().retrieveMediator(ModelObjectsHeaderMediator.ID);
    }
    return this.headerMediator;
  };
};
ModelEntityProxy = new Class(new ModelEntityProxy());
ModelEntityProxy.ID = "ModelEntityProxy";
ModelEntityProxy.sortName = function(a,b) {
  return a.name - b.name;
};
