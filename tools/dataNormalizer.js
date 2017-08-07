var dataNormalizer = function(){
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

dataNormalizer.prototype = {
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
    },
    normalize : function(gameDatas)
    {
        var newGameData = this.chargeIndex(gameDatas);
        var that = this;
        this.dataDescriptor.forEach(function(param, ind){
            newGameData[param.name].forEach(function(elem, ind){
                that.normalizeItem(elem, param, newGameData);
            });
        });
        return newGameData;
    }, 
    chargeIndex : function(gameDatas)
    {
        var newGameData = {};
        this.dataDescriptor.forEach(function(param, ind){
            newGameData[param.name] = [];
            gameDatas[param.name].forEach(function(elem, ind){
                newGameData[param.name][elem.id] = JSON.parse(JSON.stringify(elem));
            });
        });
        return newGameData;
    }
}