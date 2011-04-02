var SettingProxy = function() {
  this.Extends = CachingProxy;

	this.initialize = function() {
		this.parent(SettingProxy.ID);
		this.addItem(new SettingVO("1","Setting1", "Setting1 Description"));
		this.addItem(new SettingVO("2","Setting2", "Setting2 Description"));
	};
/*
	this.getAll = function(sort) {
		Utils.alert('SettingCache/getAll - sort: '+sort);
		var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
	  var result = [];
	  try {
	    var cache = this.getCache();
	    if (cache) {
	      for (var i = 0; i < cache.length; i++) {
	        result.push(cache[i]);
	      }
	      //Sort DESCENDING
	    //Utils.alert("SettingCache/getAll - A/D: "+descending+" before: "+result);  
				if (_sort == Cache.SORT_DESCENDING) {
					result.reverse();
				}
	    }
	  //Utils.alert("SettingCache/getAll - A/D: "+descending+" after: "+result);
	  } catch(error) {
			Utils.alert("SettingCache/getAll Error: "+error.message,Utils.LOG_LEVEL_ERROR);
	  } finally {
	    return result;
	  }
	}
*/
};
SettingProxy = new Class(new SettingProxy());
SettingProxy.ID = "SettingProxy";