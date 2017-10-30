
var playerDocument = {
	'object' : 'player',
	'document' : 'player'
}	

var fleatDocument = {
	'object' : 'fleat',
	'document' : 'fleat'
}

var mongoTranslator = function(translatorSchema){
	this.translatorSchema = [playerDocument, fleatDocument];
	this.mixedSchema = [];
	this.tmpDataManager = new dataManager();
};


mongoTranslator.prototype = {
	setObjectSchema : function(schema)
	{
		this.schema = schema;
		this.tmpDataManager.setSchema(schema);
		this.normalizeTranslatorSchema();
	},
	findInObjectSchema : function(paramName)
	{
		if(typeof this.schema != 'undefined' && this.schema != null)
		{
			var index = this.schema.findIndex(function(elem){
				return elem.object == paramName;
			});
			if(index != -1)
			{
				return this.schema[index];
			}
		}
		return null;
	},
	recurseLinks : function(schemaParam, objectList)
	{
        var that = this;
		schemaParam.links.forEach(function(link, index){
			var ind = objectList.findIndex(function(elem){
				return elem == link.object.object;
			});
			if(ind == -1)
			{
				objectList.push(link.object.object);
				that.recurseLinks(link.object, objectList);
			}
			return objectList;
		});
	},
	normalizeTranslatorSchema : function()
	{
        var that = this;
		this.translatorSchema.forEach(function(doc, ind){
			var objectList = [];
			var schemaParam = that.findInObjectSchema(doc.object);
			if(schemaParam != null)
			{
				objectList.push(schemaParam.object);
				that.recurseLinks(schemaParam, objectList);
				that.mixedSchema[schemaParam.object] = objectList;
			}
		});
	},
	save : function(extract)
	{
        var that = this;
		that.tmpDataManager.emptyDatas();
		that.tmpDataManager.add(extract);
		that.schema.forEach(function(param, ind){
			if(typeof extract[param.object] != 'undefined' && extract[param.object] != null && typeof that.mixedSchema[param.object] != 'undefined' && that.mixedSchema[param.object] != null)
			{
				 
			}
		});
	},
	retrieve : function(object, ids)
	{
		// get all document with this object
	}
};