var DataRelationProxy = function() {
  this.Extends = RelationProxy;

	this.initialize = function() {
		this.parent(DataRelationProxy.ID);
		//this.addItem(new DataRelationVO("1","mri1","val1","pei1","cei1","pid1","nid1"));
		//this.loadRelations();
		this.loadRelationsDemo();
	};

	this.loadRelations = function() {
	  var relationsText = sforce.apex.execute('sja.DataRelationService','getRelations',{});
    //relationsText = String(relationsText).replace("},.*{","},\n{");
		//alert("DataRelationProxy/loadRelations:\n"+relationsText);
		//Utils.writeFile("c:\\dataRelations.txt",relationsText);
		var relations = Utils.eval(relationsText,true);	
		//var relations = Utils.eval(dataRelations,true);
	  var i = 0;
	  while (relations.relations[i]) {
	    var jso = relations.relations[i];
	    this.addItem(new DataRelationVO(jso.id,jso.mri,jso.val,jso.pei,jso.cei,jso.pid,jso.nid));
	    i++;
	  }
	};
	
	this.loadRelationsDemo = function() {
  	this.setData(new Array());
		var relations = _dataRelations.relations;
	  var i = 0;
	  while (relations[i]) {
	    var jso = relations[i];
	    this.addItem(new DataRelationVO(jso.id,jso.mri,jso.val,jso.pei,jso.cei,jso.pid,jso.nid));
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
  		//alert("DataRelationProxy/getParentRelations - eid: "+eid+" number: "+_number+" sort: "+_sort);
      var relations = new UniqueQueue();
  		var cache = this.getData();
  		if (cache) {
        for (var i = 0; i < cache.length; i++) {
          if (_number <= 0) { break; }
          var r = cache[i];
          if (r) {
						if ((r.cei !== null)  && (r.pei !== null)) {
            	if (r.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == eid.substr(0,BusinessObject.ID_MIN_LENGTH)) {
          	    var r1 = new DataRelation(new DataRelationVO(r.id,r.mri,r.val,r.pei,r.cei,r.pid,r.nid));
              	relations.put(r1.getPei(),r1);
              	_number--;
							}
            }
          }
        }
  		}
  		//alert("DataRelationProxy/getParentRelations - 1 - relations/size: "+relations.getSize());
  		//Call WebService 
  		//if (relations.getSize() < _number) {
  		if (relations.getSize() == 0) {
  		  relations.clear();
  			var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getParentRelations',{'entityId':eid,'size':_number});
  			//alert("DataRelationProxy/getParentRelations - entityRelationsText:\n"+entityRelationsText);
  			var entityRelations = Utils.eval(entityRelationsText,true);  			
  			var rs = entityRelations.relations;
  	    var i = 0;
  	    while (rs[i]) {
  	      var jso = rs[i];
  	      var rvo = new DataRelationVO(jso.id,jso.mri,jso.val,jso.pei,jso.cei,jso.pid,jso.nid);
    	    this.addItem(rvo);    	    
    	    var r1 = new DataRelation(rvo);
  	      relations.put(r1.getPei(),r1);
  	      i++;
  	    }  		  
  		}
  		result = relations.getAll();
  	  //alert("DataRelationProxy/getParentRelations - 2 - relations/size: "+relations.getSize());
    /*//Utils.alert("DataRelationProxy/getParentRelations/sort - A/D: "+s+" before: "+relations);
      var namesSorted = this.parentNamesSorted(relations.getAll(),_sort);
      if (namesSorted) {
        result = this.sort("PARENT",relations.getAll(),namesSorted);
      }*/
  	} catch(error) {
  		Utils.alert("DataRelationProxy/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//alert("DataRelationProxy/getParentRelations - result:\n"+result)
  		return result;
  	}
  };

  this.getChildRelations = function(eid,number,sort) {
  	var result = [];
  	try {
  		//var _number = ((number !== undefined) && (number !== null))?number:GridView.DEFAULT_ROWS; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
  		var _number = ((number !== undefined) && (number !== null))?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
  		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
  		//alert("DataRelationProxy/getChildRelations - eid: "+eid+" number: "+_number+" sort: "+_sort);
      var relations = new UniqueQueue();
  		var cache = this.getData();
  		if (cache) {
        for (var i = 0; i < cache.length; i++) {
          if (_number <= 0) { break; }
          var r = cache[i];
          if (r) {
						if ((r.cei !== null)  && (r.pei !== null)) {
            	if (r.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == eid.substr(0,BusinessObject.ID_MIN_LENGTH)) {
          	    var r1 = new DataRelation(new DataRelationVO(r.id,r.mri,r.val,r.pei,r.cei,r.pid,r.nid));
              	relations.put(r1.getCei(),r1);
              	_number--;
							}
            }
          }
        }
  		}
  		//alert("DataRelationProxy/getChildRelations - 1 - relations/size: "+relations.getSize());
  		//Call WebService 
  		//if (relations.getSize() < _number) {
  		if (relations.getSize() == 0) {
  		  relations.clear();
  			var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getChildRelations',{'entityId':eid,'size':_number});
  			//alert("DataRelationProxy/getChildRelations - entityRelationsText:\n"+entityRelationsText);
  			var entityRelations = Utils.eval(entityRelationsText,true);  			
  			var rs = entityRelations.relations;
  	    var i = 0;
  	    while (rs[i]) {
  	      var jso = rs[i];
  	      var rvo = new DataRelationVO(jso.id,jso.mri,jso.val,jso.pei,jso.cei,jso.pid,jso.nid);
    	    this.addItem(rvo);    	    
    	    var r1 = new DataRelation(rvo);
  	      relations.put(r1.getPei(),r1);
  	      i++;
  	    }  		  
  		}
  		result = relations.getAll();
  	  alert("DataRelationProxy/getChildRelations - 2 - relations/size: "+relations.getSize());
    /*//Utils.alert("DataRelationProxy/getChildRelations/sort - A/D: "+s+" before: "+relations);
      var namesSorted = this.childNamesSorted(relations.getAll(),_sort);
      if (namesSorted) {
        result = this.sort("CHILD",relations.getAll(),namesSorted);
      }*/
  	} catch(error) {
  		Utils.alert("DataRelationProxy/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  	} finally {
  		//alert("DataRelationProxy/getChildRelations - result:\n"+result)
  		return result;
  	}
  };

  this.parentNamesSorted = function(relations,sort) {
    var result = [];
    try {
    	//Utils.alert("DataRelationProxy/parentNamesSorted - sort: "+sort+" relations: "+relations);
  		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
      for (var i = 0; i < relations.length; i++) {
        var relation = relations[i];
        if (relation) {
        //Utils.alert("DataRelationProxy/parentNamesSorted - relation: "+relation.print());
          if (relation.hasParent()) {
            var entity = relation.getParentEntity();
            if (entity) {
            //Utils.alert("DataRelationProxy/parentNamesSorted - entity: "+entity.print());
              var name = '';
              if (entity.getName()) {
                if (entity.getName().length > 0) {
                  name = entity.getName()+"/"+relation.getId();
                  if (name) {
                    result.push(name);
                  }
                }
              }
            }  
          }    
        }
      }
      //Sort DESCENDING
      result.sort(Utils.sortAscending);
  		if (_sort == Cache.SORT_DESCENDING) {
  			result.reverse();
  		}
    //Utils.alert("DataRelationProxy/parentNamesSorted - A/D: "+descending+" after: "+result);
    } catch(error) {
      Utils.alert("DataRelationProxy/parentNamesSorted Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  };
  
  this.sort = function(poc,relations,namesSorted) {
    var result = [];
    try {
      if (relations) {
        if (namesSorted) {
          while (namesSorted.length > 0) {
            var name = namesSorted.shift();
            for (var i = 0; i < relations.length; i++) {
              var r = relations[i];
              if (r) {
                if (poc == 'CHILD') {
                  if (r.getId() == name) {
                    result.push(r);
                    break;
                  }
                } else {
                  var eid = r.getPei();
                  if (eid !== null) {
                    var pe = DataEntity.getById(eid);
                    if (pe) {
                      var r_name = pe.getName()+"/"+r.getId();
                      if (r_name == name) {
                        result.push(r);
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/sort Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }; 
};
DataRelationProxy = new Class(new DataRelationProxy());
DataRelationProxy.ID = "DataRelationProxy";
