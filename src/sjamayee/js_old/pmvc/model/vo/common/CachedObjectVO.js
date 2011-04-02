var CachedObjectVO = function() {
	this.id = null;

	this.initialize = function(id) {
		try {
			if (id !== null)
				this.id = id;
		} catch(error) {
			Utils.alert("CachedObjectVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
CachedObjectVO = new Class(new CachedObjectVO());
