var DataEntityProxy = function() {
  this.Extends = EntityProxy;
  this.headerMediator = null;

	this.initialize = function() {
		this.parent(DataEntityProxy.ID);
		//this.addItem(new DataEntityVO("1","name1","desc1","mei1","oid1","firstAttributes1","references1"));
		//this.loadEntities();
		this.loadEntitiesDemo();
	};

	this.loadEntities = function() {
		var entitiesText = sforce.apex.execute('sja.DataEntityService','getEntities',{});
		//alert("DataEntityProxy/loadEntities - entitiesText:\n"+String(entitiesText).substring(0,500));
    //entitiesText = String(entitiesText).replace("},.*{","},\n{");
		//alert("DataEntityProxy/loadEntities:\n"+entitiesText);	 
		//Utils.writeFile("c:\\dataEntities.txt",entitiesText);    
		var entities = Utils.eval(entitiesText,true);
		//var entities = Utils.eval(dataEntities,true);
		var i = 0;
		while (entities.entities[i]) {
			var jso = entities.entities[i];
			/*if (i < 3) {
			  var vo = new DataEntityVO(jso.id,jso.name,jso.desc,jso.mei,jso.oid,jso.firstAttributes,jso.references);
			  var dataEntity = new DataEntity(vo);
			  alert("DataEntityProxy/loadEntities - entity:\n"+dataEntity.print());
			}*/
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
			this.addItem(new DataEntityVO(jso.id,jso.name,jso.desc,jso.mei,jso.oid,jso.firstAttributes,jso.references));
			i++;
		}
    //Sort ASCENDING
    //var data = this.getData();
    //data.sort(DataEntityProxy.sortName);
	};

	this.loadEntitiesDemo = function() {
  	this.setData(new Array());
		var entities = _dataEntities.entities;
		var i = 0;
		while (entities[i]) {
			var jso = entities[i];
			this.addItem(new DataEntityVO(jso.id,jso.name,jso.desc,jso.mei,jso.oid,jso.firstAttributes,jso.references));
			i++;
		}
		return i;
		alert("DataEntityProxy/loadEntitiesDemo - entities: "+entities+" i: "+i);
	};

  this.getListObject = function(dataEntityVO) {
    return new DataEntity(dataEntityVO);
  };

  this.getHeaderMediator = function() {
    if (this.headerMediator === null) {
      this.headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataObjectsHeaderMediator.ID);
    }
    return this.headerMediator;
  };
};
DataEntityProxy = new Class(new DataEntityProxy());
DataEntityProxy.ID = "DataEntityProxy";
DataEntityProxy.sortName = function(a,b) {
  return a.name - b.name;
};
