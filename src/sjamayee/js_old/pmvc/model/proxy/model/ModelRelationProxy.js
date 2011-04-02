var ModelRelationProxy = function() {
  this.Extends = RelationProxy;

	this.initialize = function() {
		this.parent(ModelRelationProxy.ID);
		//this.addItem(new ModelRelationVO("1","val1", "pei1", "cei1", "pid1", "nid1"));
		//this.loadRelations();
		this.loadRelationsDemo();
	};

	this.loadRelations = function() {
	  var relationsText = sforce.apex.execute('sja.ModelRelationService','getRelations',{});
    //relationsText = String(relationsText).replace("},.*{","},\n{");
		//alert("ModelRelationProxy/loadRelations:\n"+relationsText);	 
		//Utils.writeFile("c:\\modelRelations.txt",relationsText);
		var relations = Utils.eval(relationsText,true);		 
		//var relations = Utils.eval(modelRelations,true);
	  var i = 0;
	  while (relations.relations[i]) {
	    var jso = relations.relations[i];
	    this.addItem(new ModelRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid));
	    i++;
	  }
	};
	
	this.loadRelationsDemo = function() {
  	this.setData(new Array());
		var relations = _modelRelations.relations;
	  var i = 0;
	  while (relations[i]) {
	    var jso = relations[i];
	    this.addItem(new ModelRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid));
	    i++;
	  }
		return i;
	};
	
  this.getParentRelations = function(eid,number,sort) {
  	var result = [];
  	try {
  		//var _number = ((number !== undefined) && (number !== null))?number:GridView.DEFAULT_ROWS; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
  		var _number = ((number !== undefined) && (number !== null))?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
  		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
  		//alert("ModelRelationProxy/getParentRelations - eid: "+eid+" number: "+_number+" sort: "+_sort);
      var relations = new UniqueQueue();
  		var cache = this.getData();
  		if (cache) {
        for (var i = 0; i < cache.length; i++) {
          if (_number <= 0) { break; }
          var r = cache[i];
          if (r) {
						if ((r.cei !== null)  && (r.pei !== null)) {
            	if (r.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == eid.substr(0,BusinessObject.ID_MIN_LENGTH)) {
          	    var r1 = new ModelRelation(new ModelRelationVO(r.id,r.val,r.pei,r.cei,r.pid,r.nid));
              	relations.put(r1.getPei(),r1);
              	_number--;
							}
            }
          }
        }
  		}
  		//alert("ModelRelationProxy/getParentRelations - 1 - relations/size: "+relations.getSize());
  		//Call WebService 
  		//if (relations.getSize() < _number) {
  		if (relations.getSize() == 0) {
  		  relations.clear();
  			var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getParentRelations',{'entityId':eid,'size':_number});
  			//alert("ModelRelationProxy/getParentRelations - entityRelationsText:\n"+entityRelationsText);
  			var entityRelations = Utils.eval(entityRelationsText,true);  			
  			var rs = entityRelations.relations;
  	    var i = 0;
  	    while (rs[i]) {
  	      var jso = rs[i];
  	      var rvo = new ModelRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid);
    	    this.addItem(rvo);    	    
    	    var r1 = new ModelRelation(rvo);
  	      relations.put(r1.getPei(),r1);
  	      i++;
  	    }  		  
  		}
  		result = relations.getAll();
  	  //alert("ModelRelationProxy/getParentRelations - 2 - relations/size: "+relations.getSize());
    /*//Utils.alert("ModelRelationProxy/getParentRelations/sort - A/D: "+s+" before: "+relations);
      var namesSorted = this.parentNamesSorted(relations.getAll(),_sort);
      if (namesSorted) {
        result = this.sort("PARENT",relations.getAll(),namesSorted);
      }*/
  	} catch(error) {
  		Utils.alert("ModelRelationProxy/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//alert("ModelRelationProxy/getParentRelations - result:\n"+result)
  		return result;
  	}
  };

  this.getChildRelations = function(eid,number,sort) {
  	var result = [];
  	try {
  		//var _number = ((number !== undefined) && (number !== null))?number:GridView.DEFAULT_ROWS; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
  		var _number = ((number !== undefined) && (number !== null))?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
  		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
  		//alert("ModelRelationProxy/getChildRelations - eid: "+eid+" number: "+_number+" sort: "+_sort);
      var relations = new UniqueQueue();
  		var cache = this.getData();
  		if (cache) {
        for (var i = 0; i < cache.length; i++) {
          if (_number <= 0) { break; }
          var r = cache[i];
          if (r) {
						if ((r.cei !== null)  && (r.pei !== null)) {
            	if (r.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == eid.substr(0,BusinessObject.ID_MIN_LENGTH)) {
          	    var r1 = new ModelRelation(new ModelRelationVO(r.id,r.val,r.pei,r.cei,r.pid,r.nid));
              	relations.put(r1.getCei(),r1);
              	_number--;
							}
            }
          }
        }
  		}
  		//alert("ModelRelationProxy/getChildRelations - 1 - relations/size: "+relations.getSize());
  		//Call WebService 
  		//if (relations.getSize() < _number) {
  		if (relations.getSize() == 0) {
  		  relations.clear();
  			var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getChildRelations',{'entityId':eid,'size':_number});
  			//alert("ModelRelationProxy/getChildRelations - entityRelationsText:\n"+entityRelationsText);
  			var entityRelations = Utils.eval(entityRelationsText,true);  			
  			var rs = entityRelations.relations;
  	    var i = 0;
  	    while (rs[i]) {
  	      var jso = rs[i];
  	      var rvo = new ModelRelationVO(jso.id,jso.val,jso.pei,jso.cei,jso.pid,jso.nid);
    	    this.addItem(rvo);    	    
    	    var r1 = new ModelRelation(rvo);
  	      relations.put(r1.getPei(),r1);
  	      i++;
  	    }  		  
  		}
  		result = relations.getAll();
  	  //alert("ModelRelationProxy/getChildRelations - 2 - relations/size: "+relations.getSize());
    /*//Utils.alert("ModelRelationProxy/getChildRelations/sort - A/D: "+s+" before: "+relations);
      var namesSorted = this.childNamesSorted(relations.getAll(),_sort);
      if (namesSorted) {
        result = this.sort("CHILD",relations.getAll(),namesSorted);
      }*/
  	} catch(error) {
  		Utils.alert("ModelRelationProxy/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//alert("ModelRelationProxy/getChildRelations - result:\n"+result)
  		return result;
  	}
  };
};
ModelRelationProxy = new Class(new ModelRelationProxy());
ModelRelationProxy.ID = "ModelRelationProxy";
