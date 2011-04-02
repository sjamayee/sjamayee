var DataEntityVO = function() {
  this.Extends = EntityVO;

	this.mei = null;

	this.initialize = function(id,name,desc,mei,oid,firstAttributes,references) {
		try {
			this.parent(id,name,desc,oid,firstAttributes,references);
			if (mei !== null)
				this.mei = mei;
		} catch(error) {
			Utils.alert("DataEntityVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
DataEntityVO = new Class(new DataEntityVO());
