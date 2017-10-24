var dataSerializer = function(dataDescriptor){
    this.dataDescriptor = dataDescriptor;
};

// Stoquer tout en plat avec les références. quand modif en bdd, updater tout les object dont l'id correspond dans toute la base.

dataSerializer.prototype = {
    serializeItem : function(item, param, dat)
    {
        param.datas.forEach(function(data, ind){
            if(data.relation == "one")
            {
                if(item[data.name] != null)
                {
                    item[data.name] = item[data.name].id;
                }
            }
            else if(data.relation == "array")
            {
                item[data.name].forEach(function(it, ind){
                    if(it != null)
                    {
                        item[data.name][ind] = it.id;
                    }
                });
            }
        });
        var newItem = JSON.parse(JSON.stringify(item));
        this.normalizeItem(item, param, dat);
        return newItem;
    },
    serialize : function(dat)
    {
        var that = this;
        var newData = {};
        this.dataDescriptor.forEach(function(param, ind){
            newData[param.name] = [];
            dat[param.name].forEach(function(elem, ind){
                if(elem != null)
                {
                    newData[param.name].push(that.serializeItem(elem, param, dat));
                }
            });
        });
        return newData;
    },
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
    }
}


function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}