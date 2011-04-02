var AsyncQueue = function() {
	this.Extends = SjamayeeBase;
	this.initialize = function() {
		try {
			this.parent();
			this.queue = null;
			var that = this;
	  	YUI().use("async-queue", function(Y) {
				with(that) {
	  			that.queue = new Y.AsyncQueue();
					that.queue.defaults.timeout = 1000; //2000;
/*
					var message = "Xjamayee is here!!!";
					that.queue.add({fn: function(message) {
						Utils.alert("AsyncQueue/constructor/add - message: "+message);
					}, args: [message], id: "expandObject" });
*/
				//that.addMessage("Xjamayee is here!!!");
					//RUN!
				//that.queue.run();
				}
			});
			this.connect();				
		} catch(error) {
			Utils.alert("AsyncQueue/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getQueue = function() {
		var result = null;
		if (this.queue !== undefined) {
			result = this.queue;
		}
		return result;
	};
	//Functions
	this.connect = function() {
		Utils.alert("AsyncQueue/connect");
		//sforce.debug.trace = true;	
		sforce.connection.login(AsyncQueue.USERNAME, AsyncQueue.PASSWORD);
	};
	this.promote = function(id) {
		try {
			var q = this.getQueue();
			q.promote(id);
		} catch(error) {
			Utils.alert("AsyncQueue/promote Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.addMessage = function(message) {
		try {
			var q = this.getQueue();
			q.add({fn: function(message) {
				Utils.alert("AsyncQueue/addMessage - message: "+message);
			}, args: [message], id: "showMessage" });
		} catch(error) {
			Utils.alert("AsyncQueue/addMessage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.addExpandObject = function(object) {
		try {
			var q = this.getQueue();
			q.add({fn: function(object) {
				//Utils.alert("Asyncqueue/add - before ... object/name: "+object.getName()); 
				//object.getSfdcObject();
				if (object.getId() == 3) { Utils.alert("AsyncQueue/add - before ... object/name: "+object.getName()); }
			}, args: [object], id: "expandObject" });
		} catch(error) {
			Utils.alert("AsyncQueue/addExpandObject Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.addExpandType = function(id) {
		try {
			var q = this.getQueue();
			q.add({fn: function(id) {
				var type = _tc.getTypeExpanded(id);
			  var fieldNamesText = "";
			  var fieldNames = type.getFieldNames();
			  for (var i in fieldNames) {
					if (fieldNames[i]) {
						fieldNamesText += fieldNames[i]+"\n";
					}
			  }
			/*alert("AsyncQueue/addExpandType type/name: "+type.getName()+
							"\nlength: "+fieldNames.length+
				      "\nfieldNames:\n"+fieldNamesText);*/
			}, args: [id], id: "expandType" });
		} catch(error) {
			Utils.alert("AsyncQueue/addExpandType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	/*
	// Send the asynchronous XHR
	Y.io(MyApp.getDataUri(), { on: {
	    success : function (xid,o) {
	        try {
	            var data = Y.JSON.parse(o.responseText);
	        }
	        catch (e) {
	            MyApp.showErrorStatus();
	            q.stop();
	        }

	        MyApp.processData(data);

	        // In the XHR callback, restart the AsyncQueue if successful
	        q.run();
	    },
	    failure : function () {
	        MyApp.showErrorStatus();
	        // Stop the AsyncQueue if anything goes wrong
	        q.stop();
	    }
	}});
	*/
/*	
	this.addExpandEntity = function(id,name,timeout,asynchronous) {
		try {
			var q = this.getQueue();
			if ((asynchronous === undefined) || (asynchronous === null) || (asynchronous === false)) {
				//Pause queue!
				q.pause();
			}
			q.add({fn: function(id,name) {
				AsyncQueue.connect();
				var eText = '';
				if (id !== null) {
	  			eText = sforce.apex.execute('sja.EntityService','getEntityExpandedById',{id:id }); //typeExpansion !!!
				} else if (name !== null) {
	  			eText = sforce.apex.execute('sja.EntityService','getEntityExpandedByName',{name:name }); //typeExpansion !!!
				}
			  Utils.alert("AsyncQueue/addExpandEntity - eText: "+eText);			
				//var e = eval('(' + eText + ')');
				var e = Utils.eval(eText,true);
		    var entity = new Entity(e.entity.id,e.entity.name,e.entity.type,e.entity.desc,e.entity.mei,e.entity.oid,e.firstAttributes,e.references);
				entity.setAttributeValues(e.attributeValues); //NOK ???
				entity.setExpanded(true);
			  //Utils.alert("AsyncQueue/addExpandEntity - entity/expanded!: "+entity.print());
				_ec.put(entity);
	  		var attributesText = "";
	  		var attributes = entity.getAttributes();
	  		for (var i in attributes) {
					if (attributes[i]) {
						attributesText += attributes[i].n+": "+attributes[i].v+"\n";
					}
				}
	**
				Utils.alert("AsyncQueue/addExpandEntity"+
			     		"\nid: "+entity.getId()+
							"\nname: "+entity.getName()+
							"\nlength: "+attributes.length+
		      		"\nattributes:\n"+attributesText);
	**
			}, args: [id,name ], id: "expandEntity" });
			var _timeout = q.defaults.timeout;		
			if ((timeout !== undefined) || (timeout !== null)) {
				_timeout = timeout;
			}
			if ((asynchronous === undefined) || (asynchronous === null) || (asynchronous === false)) {			
				_timeout = AsyncQueue.SYNCHRONOUS;
			}
			//Resume queue!
			q.run(_timeout);
		} catch(error) {
			Utils.alert("AsyncQueue/addExpandEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	}
*/
	this.run = function(timeout) {
		try {
			var _timeout = ((timeout === undefined) || (timeout === null))?AsyncQueue.SYNCHRONOUS:timeout;		
			var q = this.getQueue();
			if (q) {
				if (timeout !== undefined) {
					q.defaults.timeout = _timeout;
				}
				q.run();
				Utils.alert("AsyncQueue/run/running...");
			}
		} catch(error) {
			Utils.alert("AsyncQueue/run Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'AsyncQueue:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("AsyncQueue/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};	
};
AsyncQueue = new Class(new AsyncQueue());
//Statics
AsyncQueue.USERNAME = "%usr%";
AsyncQueue.PASSWORD = "%pwd%";
AsyncQueue.SYNCHRONOUS = -1;
