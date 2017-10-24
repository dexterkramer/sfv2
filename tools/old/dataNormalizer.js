var dataNormalizer = function(dataDescriptor){
    this.dataDescriptor = dataDescriptor;
};

dataNormalizer.prototype = {
    normalizeItem : function(elem, param, dat)
    {
        param.datas.forEach(function(data, ind){
            if(data.relation == "one")
            {
                if(elem[data.name] != null)
                {
                    elem[data.name] = dat[data.from][elem[data.name]];
                }
            }
            else if(data.relation == "array")
            {
                elem[data.name].forEach(function(item, ind){
                    if(item != null)
                    {
                        elem[data.name][ind] = dat[data.from][item];
                    }
                });
            }
        });
    },
    normalize : function(dat)
    {
        var newData = this.chargeIndex(dat);
        var that = this;
        this.dataDescriptor.forEach(function(param, ind){
            newData[param.name].forEach(function(elem, ind){
                if(elem != null)
                {
                    that.normalizeItem(elem, param, newData);
                }
            });
        });
        return newData;
    }, 
    chargeIndex : function(dat)
    {
        var newData = {};
        this.dataDescriptor.forEach(function(param, ind){
            newData[param.name] = [];
            dat[param.name].forEach(function(elem, ind){
                if(elem != null)
                {
                    newData[param.name][elem.id] = JSON.parse(JSON.stringify(elem));
                }
            });
        });
        return newData;
    }
}