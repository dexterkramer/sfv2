

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
			"field" : "fleats",
			"object" : "fleat",
			"relation" : "array"
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

var dataManager = function(databaseConnector){
	this.datas = {};
	this.schema = [player, fleat, ship];
    databaseConnector.setObjectSchema(this.schema);
	this.databaseConnector = databaseConnector;
};

dataManager.prototype = {
    add : function(newDatas, refresh)
    {
        var newIndexes = this.addIndexes(newDatas, refresh);
        var that = this;
        newDatas.schema.forEach(function(param, ind){
			if(typeof newIndexes[param.object] != 'undefined')
			{
				newIndexes[param.object].forEach(function(id){
					if(id != null)
					{
						that.normalizeItem(this.datas[param.object][id], param);
					}
				})
			}
        });
    }, 
	addIndexes : function(newDatas, refresh)
	{
		var newIndexes = {};
		newDatas.schema.forEach(function(param, ind){
			let index = this.schema.findIndex(function(elem){
				return elem.object == param;
			});
			if(index == -1)
			{
				this.schema.push(param);
			}
			if(typeof newDatas.datas[param.object] != 'undefined' && newDatas.datas[param.object] != null)
			{
				newDatas.datas[param.object].forEach(function(elem, ind){
					if(typeof this.datas[param.object] != 'undefined' && this.datas[param.object] != null)
					{
						this.datas[param.object] = [];
					}
					if(typeof this.datas[param.object][elem[param.idField]] == 'undefined' || refresh)
					{
						if(typeof newIndexes[param.object] == 'undefined')
						{
							newIndexes[param.object] = [];
						}
						this.datas[param.object][elem[param.idField]] = JSON.parse(JSON.stringify(elem));
						newIndexes[param.object].push(elem[param.idField]);
					}
				});
			}
		});
		return newIndexes;
	},
    normalizeItem : function(elem, param)
    {	
        param.links.forEach(function(link, ind){
            if(link.relation == "one")
            {
                if(elem[link.field] != null)
                {
                    elem[link.field] = this.datas[link.object][elem[link.field]];
                }
            }
            else if(link.relation == "array")
            {
                elem[link.field].forEach(function(item, index){
                    if(item != null)
                    {
                        elem[link.field][index] = this.datas[link.object][item];
                    }
                });
            }
        });
    }
}
