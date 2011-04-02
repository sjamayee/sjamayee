var Logger = function() {
	this.Extends = List;
	this.initialize = function() {
		try {
			this.parent();
			this.setCache([]);		
		} catch(error) {
			//*** RECURSIVE !!! *** Utils.alert("Logger/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getSize = function() {
	  return this.getCache().length;
	};
	//Functions
	this.clear = function() {
		//***Utils.alert("Logger/clear");
		try {
			this.parent();
		} catch(error) {
			//***Utils.alert("Logger/clear Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.append = function(message) {
		//***Utils.alert("Logger/append");
		try {
			var cache = this.getCache();
			if (cache) {
				cache.push(message);
				if (this.getSize() > Logger.MAX_SIZE) {
					cache.shift();
				}
			}
		} catch(error) {
			//***Utils.alert("Logger/append Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return this;
		}
	};
	this.getHtml = function() {
		var result = "";
		try {
			var cache = this.getCache();
			if (cache) {
				result += "size: "+cache.length+"<br/><br/>";
				//document.writeln("<h1>size: "+cache.length+"</h1><br/><br/>");
				var i = 1;
				cache.forEach(function(message) {
					result += ""+i+": "+message+"<br/>";
					//document.writeln("<h1>"+i+": "+message+"</h1><br/>");
					i++;
				});
			}
		} catch(error) {
			//***Utils.alert("Logger/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
			//return this;
		}
	};
	this.print = function() {
		var result = "";
		try {
			var cache = this.getCache();
			if (cache) {
				result += "Logger\n";
				result += "size: "+cache.length+"\n\n";
				var i = 1;
				cache.forEach(function(message) {
					result += i+": "+message+"\n";
					i++;
				});
			}
		} catch(error) {
			//*** RECURSIVE !!! *** Utils.alert("Logger/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Logger = new Class(new Logger());
//Statics
Logger.MAX_SIZE = 2000;
Logger.PAGE_SIZE = 10;
