var DataRelationVO = function() {
  this.Extends = RelationVO;

	this.mri = null;

	this.initialize = function(id,mri,val,pei,cei,pid,nid) {
		try {
			this.parent(id,val,pei,cei,pid,nid);
			if (mri !== null)
				this.mri = mri;
		} catch(error) {
			Utils.alert("DataRelationVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
DataRelationVO = new Class(new DataRelationVO());
