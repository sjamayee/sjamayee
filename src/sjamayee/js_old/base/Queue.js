var Queue = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			this.clear();
		} catch(error) {
			Utils.alert("Queue/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getMaximumSize = function() {
		var result = Queue.LIMIT_SIZE;
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
	this.getSize = function() {
	  return this.queue.length;
	};
	//Functions
	this.clear = function() {
		Utils.alert("Queue/clear");
		try {
			this.queue = [];
		} catch(error) {
			Utils.alert("Queue/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.getAll = function() {
		Utils.alert("Queue/getAll");
		var result = null;
		try {
			if (this.queue !== undefined) {
				result = this.queue;
			}
		} catch(error) {
			Utils.alert("Queue/getAll Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	/*
	this.getByIndex = function(index) {
		var result = null;
		try {
			if ((index !== undefined) && (index !== null)) {
				var queue = this.queue;
				if (queue) {
					if (index < queue.length) {
						result = queue[index];
					}
				}
			}
		} catch(error) {
			Utils.alert("Queue/getByIndex Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};   
	this.getById = function(id) {
		return this.get(id);
	};
	this.get = function(key) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null)) {
				var queue = this.queue;
				if (queue) {
					for (var i = 0; i < queue.length; i++) {
						var objekt = queue[i];
						if (objekt) {
							if (objekt.getKey() == key) {
								result = objekt;
								break;
							}
						}
					}  
				}
			}
		} catch(error) {
			Utils.alert("Queue/get Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	*/
	this.put = function(objekt) {
		var result = null;
		try {
			if ((objekt !== undefined) && (objekt !== null)) {
				var queue = this.queue;
				if (queue) {
					if (queue.length >= this.getMaximumSize()) {
						queue.shift();
					}
					queue.push(objekt);
				}
				result = objekt;
			} 
		} catch(error) {
			Utils.alert("Queue/put Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	/*
	this.replace = function(objekt) {
		var result = null;
		try {
			if ((objekt !== undefined) && (objekt !== null)) {
				var queue = this.queue;
				if (queue) {
					for (var i = 0; i < queue.length; i++) {
						var q1 = queue[i];
						if (q1) {
							if (q1.getKey() == objekt.getKey()) {
								result = queue.splice(i,1,objekt);
								break;
							}
						}
					}  
				}
			}
		} catch(error) {
			Utils.alert("Queue/replace Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.remove = function(key) {
		var result = null;
		try {
			if ((key !== undefined) && (key !== null)) {
				var objekt = this.get(key);
				if (objekt) {
					var queue = this.queue;
					if (queue) {
						for (var i = 0; i < queue.length; i++) {
							var q1 = queue[i];
							if (q1) {
								if (q1.getKey() == objekt.getKey()) {
									result = queue.splice(i,1);
									break;
								}
							}
						}  
					}  
				}
			}
		} catch(error) {
			Utils.alert("Queue/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	*/
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Queue:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Queue/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Queue = new Class(new Queue());
//Statics
Queue.LIMIT_SIZE = 300; //30;
//Queue.SORT_ASCENDING  = 'ASC';
//Queue.SORT_DESCENDING = 'DSC';
