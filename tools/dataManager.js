

var fleat = {
	"object" : "fleat",
	"idField" : "ObjectId", 
	"links" : 
	[
		{
			"field" : "deployedShips",
			"object" : "ship",
			"relation" : "array"
		},
		{
			"field" : "player",
			"object" : "player",
			"relation" : "single"
		},
		{
			"field" : "capitalShip",
			"relation" : "single",
			"object" : "ship"
		}
	]
};

var player = {
	"object" : "player",
	"idField" : "ObjectId",
	"links" : 
	[
		{
			"field" : "fleat",
			"object" : "fleat",
			"relation" : "single"
		}
	]
};

var ship = {
	"object" : "ship",
	"idField" : "ObjectId", 
	"links" : 
	[
		{
			"field" : "fleat",
			"object" : "fleat",
			"relation" : "single"
		}
	]
}

var dataManager = function(databaseTranslator){
	this.datas = {};
	this.objectByType = [];
	this.openMode = false;
	this.schema = [player, fleat, ship];
	this.normalizeSchema();
	if(typeof databaseTranslator != 'undefined')
	{	
		this.databaseTranslator = databaseTranslator;	
		databaseTranslator.setObjectSchema(this.schema);
	}
    
};

dataManager.prototype = {
	setSchema : function(schema)
	{
		this.schema = schema;
	},
	emptyDatas : function()
	{
		this.datas = null;
		this.datas = {};
		this.objectByType = [];
	},
	normalizeSchema : function()
	{
		var that = this;
		this.schema.forEach(function(param, ind){
			param.links.forEach(function(link, ind2){
				var theIndex = that.schema.findIndex(function(elem){
					return elem.object == link.object;
				});
				if(theIndex != -1)
				{
					that.schema[ind].links[ind2].object = that.schema[theIndex];
				}
			});
		});
	},
	save : function(object)
	{
		if(typeof this.databaseTranslator != 'undefined')
		{
			this.databaseTranslator.save(this.extract(object));
		}
	},
	getSchema : function(newDatas)
	{
		if(typeof newDatas == 'undefined' || typeof newDatas.schema == 'undefined' || !this.openMode)
		{
			return this.schema;
		}
		if(typeof newDatas != 'undefined' && typeof newDatas.schema != 'undefined')
		{
			return newDatas.schema;
		}
		return null;
	},
    add : function(newDatas, refresh)
    {
        var newIndexes = this.addIndexes(newDatas, refresh);
        var that = this;
        this.getSchema(newDatas).forEach(function(param, ind){
			if(typeof newIndexes[param.object] != 'undefined')
			{
				newIndexes[param.object].forEach(function(id){
					if(id != null)
					{
						that.normalizeItem(that.datas[param.object][id], param);
					}
				})
			}
        });
    }, 
	extract : function(object, returnDatabase, param)
	{
		if(typeof returnDatabase == 'undefined')
		{
			var returnDatabase = {};
		}
		if(typeof param == 'undefined')
		{
			var param = this.getParamFromObject(object);
		}
		
		if(objType != null)
		{
			if(typeof returnDatabase[param.object][object[param.idField]] == 'undefined' || returnDatabase[param.object][object[param.idField]] == null)
			{
				returnDatabase[param.object][object[param.idField]] = object;
				param.links.forEach(function(link, ind){
					if(link.relation == 'single' )
					{
						this.extract(object[link.object.object], returnDatabase, link.object);
					}
					else if(link.relation == 'array' )
					{
						object[link.object.object].forEach(function(obj, ind){
							this.extract(obj, returnDatabase, link.object);
						});
					}
				});
			}
			else
			{
				return returnDatabase;
			}
		}
	},
	getParamFromObject : function(object)
	{
		var param = null;
		var index = this.objectByType.findIndex(function(elem){
			return elem.object == object;
		});
		if(index != -1)
		{
			param = this.objectByType[index].param;
		}
		return param;
	},
	addIndexes : function(newDatas, refresh)
	{
		var newIndexes = {};
		var that = this;
		this.getSchema(newDatas).forEach(function(param, ind){
			if(that.openMode)
			{
				let index = that.schema.findIndex(function(elem){
					return elem.object == param.object;
				});
				if(index == -1)
				{
					that.schema.push(param);
				}
			}
			if(typeof newDatas.datas[param.object] != 'undefined' && newDatas.datas[param.object] != null)
			{
				newDatas.datas[param.object].forEach(function(elem, ind){
					if(typeof that.datas[param.object] == 'undefined' || that.datas[param.object] == null)
					{
						that.datas[param.object] = [];
					}
					if(typeof that.datas[param.object][elem[param.idField]] == 'undefined' || refresh)
					{
						if(typeof newIndexes[param.object] == 'undefined')
						{
							newIndexes[param.object] = [];
						}
						that.datas[param.object][elem[param.idField]] = JSON.parse(JSON.stringify(elem));
						newIndexes[param.object].push(elem[param.idField]);
						if(typeof that.datas[param.object][elem[param.idField]] == 'undefined')
						{
							that.objectByType.push({param : param, object : that.datas[param.object][elem[param.idField]] });
						}
					}
				});
			}
		});
		return newIndexes;
	},
    normalizeItem : function(elem, param)
    {	
		var that = this;
        param.links.forEach(function(link, ind){
            if(link.relation == "one")
            {
                if(elem[link.field] != null)
                {
                    elem[link.field] = that.datas[link.object.object][elem[link.field]];
                }
            }
            else if(link.relation == "array")
            {
                elem[link.field].forEach(function(item, index){
                    if(item != null)
                    {
                        elem[link.field][index] = that.datas[link.object.object][item];
                    }
                });
            }
        });
    }
}