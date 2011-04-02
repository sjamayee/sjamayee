//Abstract
var BusinessObject = function() {

	this.initialize = function(vo) {
		/*
		 * var type = ""; if (this instanceof BusinessObject) { type =
		 * "BusinessObject"; } else if (this instanceof Grid) { type = "Grid"; }
		 * else if (this instanceof EntityCache) { type = "EntityCache"; } else
		 * if (this instanceof RelationCache) { type = "RelationCache"; } else
		 * if (this instanceof TypeCache) { type = "TypeCache"; } else if (this
		 * instanceof SettingCache) { type = "SettingCache"; } else if (this
		 * instanceof Position) { type = "Position"; } else if (this instanceof
		 * Keyboard) { type = "Keyboard"; } else if (this instanceof
		 * RelationsForm) { type = "RelationsForm"; }
		 */
		try {
			this.setId(vo.id);
			/*
			 * BusinessObject.COUNT++; //this.setSid(BusinessObject.COUNT);
			 * //Utils.alert("BusinessObject - count: "+BusinessObject.COUNT);
			 * if (type == "Grid") { Utils.alert("BusinessObject/constructor -
			 * type: "+type+"\ncount = "+BusinessObject.COUNT); }
			 */
		} catch (error) {
			Utils.alert("BusinessObject/constructor Error: " + error.message,
					Utils.LOG_LEVEL_ERROR);
		}
	};
	// Getters & Setters
	this.getId = function() {
		var result = null;
		if ((this.id !== undefined) && (this.id !== null)) {
			result = this.id.substr(0, BusinessObject.ID_MIN_LENGTH);
		}
		return result;
	};
	this.setId = function(id) {
		if ((id !== undefined) && (id !== null)) {
			if (id != 'null') {
				this.id = id;
			}
		}
	};
	this.getSid = function() {
		return this.sid;
	};
	this.setSid = function(sid) {
		if (sid) {
			this.sid = sid;
			if (sid > BusinessObject.HIGHEST_SID) {
				BusinessObject.HIGHEST_SID = sid;
			}
		}
	};
	this.getCby = function() {
		// return this.cby;
		return "Bill Gates";
	};
	this.setCby = function(cby) {
		if (cby !== null) {
			this.cby = cby;
		}
	};
	this.getMby = function() {
		// return this.mby;
		return "Steve Jobs";
	};
	this.setMby = function(mby) {
		if (mby !== null) {
			this.mby = mby;
		}
	};
	// Functions
	// Abstract
	this.clone = function() {
		Utils.alert("BusinessObject/clone - abstract.");
		return undefined;
	};
	this.print = function(html, keysOnly) {
		var _html = ((html !== undefined) && (html !== null)) ? html : false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null)) ? keysOnly
				: false;
		var _nl = (_html) ? '<br/>' : '\n';
		var result = '\nBusinessObject:' + _nl;
		try {
			var i = 0;
			var properties = Utils.eval(this, false); // true);
			if (properties) {
				for ( var key in properties) {
					i++;
					result += (i + ' ' + key);
					if (!_keysOnly) {
						result += (': ' + properties[key]);
					}
					result += _nl;
				}
			}
		} catch (error) {
			Utils.alert("BusinessObject/print Error: " + error.message,
					Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
BusinessObject = new Class(new BusinessObject());
// Statics
BusinessObject.COUNT = 0;
BusinessObject.HIGHEST_SID = 0;
BusinessObject.ID_MIN_LENGTH = 15;
BusinessObject.RELATIONS_UNDEFINED = "*0*";
BusinessObject.initializeRestore = function() {
	BusinessObject.HIGHEST_SID = 0;
};
BusinessObject.finalizeRestore = function() {
	BusinessObject.COUNT = BusinessObject.HIGHEST_SID;
};
BusinessObject.test = function() {
	return "BusinessObject/test";
};
