var ModelRelationVO = function() {
  this.Extends = RelationVO;

	this.initialize = function(id,val,pei,cei,pid,nid) {
		try {
			this.parent(id,val,pei,cei,pid,nid);
		} catch(error) {
			Utils.alert("ModelRelationVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};
};
ModelRelationVO = new Class(new ModelRelationVO());