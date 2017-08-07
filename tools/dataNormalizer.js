var dataNormalizer = function(dataDescriptor){
    this.dataDescriptor = dataDescriptor;
};

dataNormalizer.prototype = {
    normalizeItem : function(elem, param, gameDatas)
    {
        param.datas.forEach(function(data, ind){
            if(data.relation == "one")
            {
                if(elem[data.name] != null)
                {
                    elem[data.name] = gameDatas[data.from][elem[data.name]];
                }
            }
            else if(data.relation == "array")
            {
                elem[data.name].forEach(function(item, ind){
                    if(item != null)
                    {
                        elem[data.name][ind] = gameDatas[data.from][item];
                    }
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
                if(elem != null)
                {
                    that.normalizeItem(elem, param, newGameData);
                }
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
                if(elem != null)
                {
                    newGameData[param.name][elem.id] = JSON.parse(JSON.stringify(elem));
                }
            });
        });
        return newGameData;
    }
}