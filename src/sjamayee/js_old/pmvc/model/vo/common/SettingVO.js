var SettingVO = function() {
  this.Extends = CachedObjectVO;

	this.name = "";
	this.desc = "";

	this.initialize = function(id,name,desc) {
		try {
			this.parent(id);
			if (name !== null)
				this.name = name;
			if (desc !== null)
				this.desc = desc;
		} catch(error) {
			Utils.alert("SettingVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
SettingVO = new Class(new SettingVO());
