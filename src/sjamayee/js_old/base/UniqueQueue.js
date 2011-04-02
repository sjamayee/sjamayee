var UniqueQueue = function() {
	this.Extends = Queue;
	this.initialize = function() {
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("UniqueQueue/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	//Functions
	this.get = function(key) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null)) {
				var queue = this.queue;
				if (queue) {
					for (var i = 0; i < queue.length; i++) {
						var relation = queue[i];
						if (relation) {
							if (relation.getPei()) {						
								if (relation.getPei() == key) {
									result = relation;
									break;
								}
							}
						}
					}  
				}
			}
		} catch(error) {
			Utils.alert("UniqueQueue/get Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.put = function(key,relation) {
		Utils.alert("UniqueQueue/put - key: "+key+" relation: "+relation);
		var result = null;
		try {
			if ((key !== undefined) && (key !== null) &&
					(relation !== undefined) && (relation !== null)) {
				var queue = this.queue;
				if (queue) {
					result = this.get(key);
					if (result === null) {
						if (queue.length >= this.getMaximumSize()) {
							queue.shift();
						}
						queue.push(relation);
						result = relation;
					}
				}
			} 
		} catch(error) {
			Utils.alert("UniqueQueue/put Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.containsKey = function(key) {
		var result = false;
		if ((key !== undefined) && (key !== null)) {
			result = (this.get(key) !== null);
		}
		return result;
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'UniqueQueue:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("UniqueQueue/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
UniqueQueue = new Class(new UniqueQueue());
