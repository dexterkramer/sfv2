var dataSerializer = function(){
    this.dataDescriptor = [
        { 
            "name" : "players",
            "datas" : [
                {
                    "name" : "fleat",
                    "relation" : "one",
                    "from" : "fleats"
                }
            ]
        },
        {
            "name" : "fleats",
            "datas" : [
                {
                    "name" : "player",
                    "relation" : "one",
                    "from" : "players"
                },
                {
                    "name" : "capitalShip",
                    "relation" : "one",
                    "from" : "ships"
                },
                {
                    "name" : "deployedShips",
                    "relation" : "array",
                    "from" : "ships"
                }
            ]
        },
        {
            "name" : "ships",
            "datas" : [
                {
                    "name" : "fleat",
                    "relation" : "one",
                    "from" : "fleats"
                }
            ]
        }
    ];
};

dataSerializer.prototype = {
    serializeItem : function(item, param, gameDatas)
    {
        param.datas.forEach(function(data, ind){
            if(data.relation == "one")
            {
                item[data.name] = item[data.name].id;
            }
            else if(data.relation == "array")
            {
                item[data.name].forEach(function(it, ind){
                   item[data.name][ind] = it.id;
                });
            }
        });
        var newItem = JSON.parse(JSON.stringify(item));
        this.normalizeItem(item, param, gameDatas);
        return newItem;
    },
    serialize : function(gameDatas)
    {
        var that = this;
        var newGameData = {};
        this.dataDescriptor.forEach(function(param, ind){
            newGameData[param.name] = [];
            gameDatas[param.name].forEach(function(elem, ind){
                newGameData[param.name].push(that.serializeItem(elem, param, gameDatas));
            });
        });
        return newGameData;
    },
    normalizeItem : function(elem, param, gameDatas)
    {
        param.datas.forEach(function(data, ind){
            if(data.relation == "one")
            {
                elem[data.name] = gameDatas[data.from][elem[data.name]];
            }
            else if(data.relation == "array")
            {
                elem[data.name].forEach(function(item, ind){
                    elem[data.name][ind] = gameDatas[data.from][item];
                });
            }
        });
    }

}