var PrepModelCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		var app = note.getBody();
		//alert("PrepModelCommand - app: "+app.appName);
		this.facade.registerProxy(new SettingProxy());
		this.facade.registerProxy(new ModelEntityProxy());
		this.facade.registerProxy(new ModelTypeProxy());		
		this.facade.registerProxy(new ModelAttributeProxy());
		this.facade.registerProxy(new ModelRelationProxy());
		this.facade.registerProxy(new DataEntityProxy());
		this.facade.registerProxy(new DataTypeProxy());
		this.facade.registerProxy(new DataAttributeProxy());
		this.facade.registerProxy(new DataRelationProxy());
		//PROXYTEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Type
  /*WebService static String getTypes()
    WebService static String getTypesAndFields()
    WebService static String getTypeExpanded(String id)
    WebService static String getSfdcFieldNames(String typeName)
    //WebService static String getSfdcAttributes()*/
	  //var typeProxy = this.facade.retrieveProxy(ModelTypeProxy.ID);
		//var types = sforce.apex.execute('sja.TypeService','getTypes',{});
    //alert("typeProxy/types: \n"+String(types).substring(0,500)); //types.substring(0,200));
		//var dataTypes = sforce.apex.execute('sja.TypeService','getDataTypes',{});
    //alert("typeProxy/dataTypes: \n"+String(dataTypes).substring(0,800));
	/*var typesAndFields = sforce.apex.execute('sja.TypeService','getTypesAndFields',{});
    alert("typeProxy/typesAndFields: \n"+String(typesAndFields).substring(0,500)); //typesAndFields.substring(0,200));
		var typeExpanded = sforce.apex.execute('sja.TypeService','getTypeExpanded',{id:'a0J80000000ekGo'});
    alert("typeProxy/typeExpanded: \n"+String(typeExpanded).substring(0,500)); //typeExpanded.substring(0,200));
		var sfdcFieldNames = sforce.apex.execute('sja.TypeService','getSfdcFieldNames',{typeName:'ACCT'});
    alert("typeProxy/sfdcFieldNames: \n"+String(sfdcFieldNames).substring(0,500)); //sfdcFieldNames.substring(0,200));
		var sfdcFieldNames = sforce.apex.execute('sja.TypeService','getSfdcFieldNames',{typeName:'Account'});
    alert("typeProxy/sfdcFieldNames: \n"+String(sfdcFieldNames).substring(0,500)); //sfdcFieldNames.substring(0,200));*/
    //DataType
	  //var dataTypeProxy = this.facade.retrieveProxy(DataTypeProxy.ID);
		//dataTypeProxy.loadTypes();		
		//var dataTypes = dataTypeProxy.getData();		
    //alert("dataTypeProxy/dataTypes: \n"+String(dataTypes).substring(0,500));
    //ModelEntity
    //WebService static String getEntities()
    //WebService static String getSfdcObject(String oid, String entityType)
    //WebService static String getSfdcAttributes()
		//var modelEntityProxy = this.facade.retrieveProxy(ModelEntityProxy.ID);
		//var modelEntities = sforce.apex.execute('sja.ModelEntityService','getEntities',{});
    //alert("modelEntityProxy/entities: \n"+String(modelEntities).substring(0,700));
		//var modelSfdcObject = sforce.apex.execute('sja.ModelEntityService','getSfdcObject',{oid:'0018000000MrOMb', entityType:'Account'}); //sForce !!!
    //alert("modelEntityProxy/modelSfdcObject: \n"+String(modelSfdcObject).substring(0,500));
		//var modelAttributes = sforce.apex.execute('sja.ModelEntityService','getSfdcAttributes',{});
    //alert("modelEntityProxy/modelAttributes: \n"+String(modelAttributes).substring(0,500));
    //DataEntity
    //WebService static String getEntities()
    //WebService static String getEntitiesByType(Integer rows)
    //WebService static String getFirst(Criteria criteria)
    //WebService static String getNext(Criteria criteria)
    //WebService static String getPrevious(Criteria criteria)
    //WebService static String getLast(Criteria criteria)
    //WebService static String getEntityExpandedById(String id, Boolean typeExpansion)
    //WebService static String getEntityExpandedByName(String name, Boolean typeExpansion)
    //WebService static String getSfdcObject(String oid, String entityType)
    //WebService static String getSfdcAttributes()
		/*var dataEntityProxy = this.facade.retrieveProxy(DataEntityProxy.ID);
		var dataEntities = sforce.apex.execute('sja.DataEntityService','getEntities',{});
    alert("dataEntityProxy/entities: \n"+String(dataEntities).substring(0,500));
		//var dataSfdcObject = sforce.apex.execute('sja.DataEntityService','getSfdcObject',{oid:'0018000000MrOMb', entityType:'Account'}); //sForce !!!
    //alert("dataEntityProxy/dataSfdcObject: \n"+String(dataSfdcObject).substring(0,500));
		var dataSfdcObject = sforce.apex.execute('sja.DataEntityService','getSfdcObject',{oid:'a0E80000001RRoZEAW', entityType:'Lead'}); //Andy Young
    alert("dataEntityProxy/dataSfdcObject: \n"+String(dataSfdcObject).substring(0,500));*/
    //DataRelation
    //WebService static String getRelations()
    //WebService static String getTypesInColumns(Integer rows)
		//var dataRelationProxy = this.facade.retrieveProxy(DataRelationProxy.ID);
		//var dataRelations = sforce.apex.execute('sja.DataRelationService','getRelations',{});
    //alert("dataRelationProxy/dataRelations: \n"+String(dataRelations).substring(0,1000));
		//var entityRelations = sforce.apex.execute('sja.DataRelationService','getParentRelations',{'entityId':'a0E80000001RRpP','size':25});
    //alert("dataRelationProxy/entityRelations: \n"+String(entityRelations).substring(0,1000));
	};
};
PrepModelCommand = new Class(new PrepModelCommand());
