var ModelAttribute = function() {
	this.Extends = AttributeBO;
	this.proxy = null;
	
	this.initialize = function(vo) {
		try {
			this.parent(vo);
			this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelAttributeProxy.ID);
		} catch(error) {
			Utils.alert("ModelAttribute/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
	//Getters & Setters
	this.getModelAttributeVO = function() {
    return new ModelAttributeVO(this.getId(),this.getName(),this.getValue());
	};
	
	//Functions
	this.clone = function() {
		Utils.alert("ModelAttribute/clone");
		var result = null;
		try {
			result = new ModelAttribute(this.getModelAttributeVO());
			if (result) {
		  	var properties = Utils.eval(this,false); //true);
			  if (properties) {
	         for (var key in properties) {
	           result[key] = properties[key];
					}
				}
			}
		} catch(error) {
			Utils.alert("ModelAttribute/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	}; 
	this.print = function() {
		var result = null;
		try {
			result = "\nModelAttribute:"; // - sid: "+this.getSid()+"\n";
			result += "\nid="+this.getId()+"\nname="+this.getName()+"\nvalue="+this.getValue();
		} catch(error) {
			Utils.alert("ModelAttribute/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		} finally {
			return result;
		}
	};
};
ModelAttribute = new Class(new ModelAttribute());
