var Filter = function(text) {
	this.Extends = SjamayeeBase;
	this.initialize = function(text) {
		try {
			this.parent();
			this.setText(text);
		} catch(error) {
			Utils.alert("Filter/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters&Setters
	this.getText = function() {
		var result = null;
		if (this.text !== undefined) {
			result = this.text;
		}
	  return result;
	};
	this.setText = function(text) {
		if (text) {
			this.text = text;
		}
		return this;
	};
	//Functions
	this.filter = function(name) {
		var _name = (name !== undefined)?name.toLowerCase():null;
		var result = false;
		try {
	  //alert('Filter/filter - filter:/n'+this.print());
	  //alert('Filter/filter - filter: '+this.getText()+' name: '+_name);
			if (_name !== null) {
				var _filter = this.getText();
				if (_filter) {
					_filter = _filter.toLowerCase();
	      //alert('Filter/filter - filter '+_filter);
		      var filters = _filter.split(' ');
		      if (filters.length > 0) {
						result = true;
	        //alert('Filter/filter - filter '+_filter+' length: '+filters.length+' result: '+result);
		        var startsWithFilter = null;
		        var f1 = filters[0];
		        if (f1) {
		          if ((f1.charAt(0) == '<') && (f1.length > 1)) {
		            startsWithFilter = f1.substring(1);
		            filters.splice(0,1);
		          }
		        }         
		        var endsWithFilter = null;
		        if (filters.length > 0) {
		          var index = filters.length - 1;
		          var f2 = filters[index];
		          if (f2) {
		            if ((f2.charAt(f2.length-1) == '>') && (f2.length > 1)) {
		              endsWithFilter = f2.substring(0,(f2.length - 1));
		              filters.splice(index,1);
		            }
		          }  
		        }
	          if (startsWithFilter) {
	            if (_name.indexOf(startsWithFilter) !== 0) {
	              result = false;
	            } 
	          }   
	          if (endsWithFilter) {
	            var lasti = (_name.length - endsWithFilter.length);
	            if (_name.lastIndexOf(endsWithFilter) != lasti) {
	              result = false;
	            } 
	          }
	          for (var i2 = 0; i2 < filters.length; i2++) {
	            var filter = filters[i2];
	          //Utils.alert('Filter/filter - for filter: '+filter+' _name: '+_name);
	          //alert('Filter/filter - for i2: '+i2+' filter: '+filter+' _name: '+_name);
	            if (filter) {
	              if (_name.search(filter) == -1) {
	                result = false;
	                break;
	              }
	            } 
	          }
		      }
		    }			
			}
		} catch(error) {
			Utils.alert("Filter/filter Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
	this.print = function(html,keysOnly) {
		var _html = ((html !== undefined) && (html !== null))?html:false;
		var _keysOnly = ((keysOnly !== undefined) && (keysOnly !== null))?keysOnly:false;
		var _nl = (_html)?'<br/>':'\n';
		var result = 'Filter:'+_nl;
		try {
			result += this.parent();
		} catch(error) {
			Utils.alert("Filter/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
Filter = new Class(new Filter());
