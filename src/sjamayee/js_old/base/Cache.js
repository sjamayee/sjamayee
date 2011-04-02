var Cache = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
	//alert("Cache/constructor");
		Utils.alert("Cache/constructor");
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("Cache/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getList = function() {
		var result = null;
		try {
			if (this.list !== undefined) {
				result = this.list;
			}
		} catch(error) {
			Utils.alert("Cache/getList Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.setList = function(list) {
		if (list) {
			this.list = list;
		}
		return this;
	};
	this.getMaximumSize = function() {
		var result = Cache.LIMIT_SIZE;
		if ((this.maximumSize !== undefined) && (this.maximumSize !== null)) {
			result = this.maximumSize;
		}
		return result;
	};
	this.setMaximumSize = function(maximumSize) {
		if (maximumSize !== null) {
			this.maximumSize = maximumSize;
		}
		return this;
	};
	this.getCache = function() {
		var result = [];
		if ((this.cache !== undefined) && (this.cache !== null)) {
			result = this.cache;
		}
		return result;
	};
	this.setCache = function(cache) {
		if (cache) {
			this.cache = cache;
		}
		return this;
	};
	this.getSize = function() {
		var result = 0;
		try {
			var cache = this.getCache();
			if (cache) {
				result = cache.length;
			}
		} catch(error) {
			Utils.alert("Cache/getSize Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	//Functions
	//Abstract
	this.expand = function() {
		Utils.alert("Cache/expand - abstract.");
		return undefined;
	};
	this.sortOnReads = function(sort) {
		Utils.alert("Cache/sortOnReads - sort: "+sort);
		try {
			var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;				
			var oid = null;
			var cachedObject = null;
			var sortKey = null;
			var sortedIds = [];
			var cache = this.getCache();
			if (cache) {
				for (var i = 0; i < cache.length; i++) {
					cachedObject = cache[i];
					if (cachedObject) {
						sortKey = (cachedObject.getReads()+','+cachedObject.getId());
						sortedIds.push(sortKey);
					}    
				}
			}
			//Sort ASCENDING/DESCENDING
			//Utils.alert("Cache/sortOnReads - A/D: "+descending+" before: "+sortedIds);  
			sortedIds.sort(Utils.sortAscending);
			if (_sort == Cache.SORT_DESCENDING) {
				sortedIds.reverse();
			}
			//Utils.alert("Cache/sortOnReads - A/D: "+descending+" after: "+sortedIds);
			var sortedObjects = [];
			if (sortedIds) {
				while (sortedIds.length > 0) {
					sortKey = sortedIds.shift();
					oid = sortKey.substr((sortKey.indexOf(',')+1));
					sortedObjects.push(this.get(oid));
				}
			}  
			this.setCache(sortedObjects);
		} catch(error) {
			Utils.alert("Cache/sortOnReads Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.clear = function() {
		Utils.alert("Cache/clear");
		try {
			this.setCache([]);
		} catch(error) {
			Utils.alert("Cache/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.getByIndex = function(index) {
		var result = null;
		try {
			var cache = this.getCache();
			if (index < cache.length) {
				result = cache[index];
				result.incrementReads();
			}
		} catch(error) {
			Utils.alert("Cache/getByIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};   
	this.getById = function(id) {
		return this.get(id);
	};
	this.get = function(key) {
		Utils.alert("Cache/get - key: "+key);
		var result = null;
		try {
			var cache = this.getCache();
			for (var i = 0; i < cache.length; i++) {
				var objekt = cache[i];
				if (objekt) {
				//if (i === 0) { alert("Cache/get - key: "+key+" object/key: "+objekt.getKey()); }
					if (objekt.getKey() == key) {
					//if (i < 2) { alert("Cache/get - key: "+key+" object/key: "+objekt.getKey()); }
						result = objekt;
						result.incrementReads();					
						break;
					}  
				}
			}
		} catch(error) {
			Utils.alert("Cache/get Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
		//alert("Cache/get - key: "+key+" result/key: "+((result)?result.getKey():null));
			return result;
		}
	};
	this.put = function(objekt) {
		Utils.alert("Cache/put - objekt: "+objekt);
		var result = false;
		try {
			objekt.setCache(this);
			var cache = this.getCache();
			if (!this.containsKey(objekt.getKey())) {
				if (cache.length >= this.getMaximumSize()) {
					this.removeLeastReferencedObject();
				}
				cache.push(objekt);
			} else {
				this.replace(objekt);
			} 
			result = true;
		} catch(error) {
			Utils.alert("Cache/put Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.replace = function(objekt) {
		Utils.alert("Cache/replace - objekt: "+objekt);
		var result = null;
		try {
			objekt.setCache(this);
			var cache = this.getCache();
			for (var i = 0; i < cache.length; i++) {
				var cachedObject = cache[i];
				if (cachedObject) {
					if (cachedObject.getKey() == objekt.getKey()) {
						result = cache.splice(i,1,objekt);
						break;
					}  
				}
			}
		} catch(error) {
			Utils.alert("Cache/replace Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.remove = function(key) {
		Utils.alert("Cache/remove - key: "+key);
		var result = null;
		try {
			result = this.get(key);
			if (result) {
				var cache = this.getCache();
				for (var i = 0; i < cache.length; i++) {
					var cachedObject = cache[i];
					if (cachedObject) {
						if (cachedObject.getKey() == result.getKey()) {
							result = cache.splice(i,1);
							break;
						}  
					}  
				}
			}
		} catch(error) {
			Utils.alert("Cache/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.containsKey = function(key) {
		return (this.get(key) !== null);
	};
	/////////////////////////////////////////////
	//ATT.: Only remove if no more references !!!
	/////////////////////////////////////////////
	this.removeLeastReferencedObject = function() {
		Utils.alert("Cache/removeLeastReferencedObject");
		try {
			var leastReferencedObject = null;
			var leastReferencedObjectKey;
			var cache = this.getCache();
			for (var i = 0; i < cache.length; i++) {
				var objekt = cache[i];
				if (objekt) {
					if (!leastReferencedObject) {
						leastReferencedObject = objekt;
						leastReferencedObjectKey = objekt.getKey();
					}
					if (objekt.getReferences() < leastReferencedObject.getReferences()) {
						leastReferencedObject = objekt;
						leastReferencedObjectKey = objekt.getKey();
					}
					if (leastReferencedObject.getReferences() === 0) {
						break;
					}
				}  
			}  
			if ((leastReferencedObject) && (leastReferencedObject.getReferences() === 0)) {
				this.remove(leastReferencedObjectKey);
			}
		} catch(error) {
			Utils.alert("Cache/removeLeastReferencedObject Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	/*
	this.update = function() {
	try {
	var whereUsedColumns = [];
	var whatUsedColumns = [];
	var gridView = RelationsForm.getGridViewColumns();
	if (gridView) {
	var gridColumn = null;
	var nivoBase = gridView.getNivoBase();
	var currentNivo = gridView.currentNivo;   //getCurrentNivo() ???
	**
	//ONLY IF ROOT IS NEEDED/UPDATED !!!
	var r0 = gridView.root;
	if (r0) {
	var root = new Relation(r0.id,r0.value,r0.pei,r0.cei,r0.pid,r0.nid);
	_grid.setRoot(new GridCell(root));
	}
	**
	_grid.setCurrentNivo(currentNivo);
	var gridViewColumns = gridView.getColumns();
	var gridViewColumn = null;
	for (var i = 0; i < gridViewColumns.length; i++) {
	gridViewColumn = gridViewColumns[i];
	if (gridViewColumn) {
	gridColumn = new GridColumn(gridViewColumn.getNivo(),null);  //+++ grid +++
	var r1 = null;
	for (var j = 0; j < gridViewColumn.relations.length; j++) {
	r1 = gridViewColumn.relations[j];
	if (r1) {
	var relation = new Relation(r1.id,r1.value,r1.pei,r1.cei,r1.pid,r1.nid);
	var gridCell = new GridCell(relation);
	//Append Relation to gridColumn
	gridColumn.appendCell(gridCell);
	//Update RelationCache!                      //TODO !!! REFACTOR !!!
	//this.replace(relation.getKey(),relation);
	}   
	}
	//Utils.alert(gridViewColumn.relations);
	}
	//Save where- & what-columns for grid update!
	var nivo = gridColumn.getNivo();
	var index = Math.abs(nivo) - 1;
	if (nivo < Position.NIVO_ROOT()) {
	whereUsedColumns[index] = gridColumn;
	whereUsedColumns.length++;
	} else if (nivo > Position.NIVO_ROOT()) {
	whatUsedColumns[index] = gridColumn;
	whatUsedColumns.length++;
	}
	}
	}
	} catch(error) {
	alert("Cache/update Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	}
	}
	*/
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Cache:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Cache/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Cache = new Class(new Cache());
//Statics
Cache.LIMIT_SIZE = 1000;
Cache.SORT_ASCENDING  = 'ASC';
Cache.SORT_DESCENDING = 'DSC';
