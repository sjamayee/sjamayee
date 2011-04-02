var DataAttribute = function() {
	this.Extends = AttributeBO;
	this.proxy = null;
	
	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataAttributeProxy.ID);
		} catch(error) {
			Utils.alert("DataAttribute/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getDataAttributeVO = function() {
    return new DataAttributeVO(this.getId(),this.getName(),this.getValue());
	};
	
	//Functions
	this.clone = function() {
		Utils.alert("DataAttribute/clone");
		var result = null;
		try {
			result = new DataAttribute(this.getDataAttributeVO());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("DataAttribute/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}; 
	this.print = function() {
		var result = null;
		try {
			result = "\nDataAttribute:"; // - sid: "+this.getSid()+"\n";
			result += "\nid="+this.getId()+"\nname="+this.getName()+"\nvalue="+this.getValue();
		} catch(error) {
			Utils.alert("DataAttribute/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
DataAttribute = new Class(new DataAttribute());
