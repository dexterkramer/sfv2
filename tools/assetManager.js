var assetManager = function(){
    this.assetList = [];
};

assetManager.prototype = {
    findFromRef : function(ref)
    {
        var index  = this.assetList.findIndex(function(asset){
            return asset.ref = ref;
        });
        if( index != -1 
                && typeof this.assetList[index] != "undefined" 
                && this.assetList[index] != null ) 
        {
            return this.assetList[index];
        }
        else
        {
            return null;
        }
    },
    addAsset : function(assetObj, ref, cleaningService){
        var record = this.findFromRef(ref);
        if(record == null)
        {
            this.assetList.push({ assetObj : assetObj, ref : ref, cleaningService : cleaningService });
        }
        else
        {
            record.assetObj = assetObj;
        }
    },
    getAsset : function(ref)
    {
        var record = this.findFromRef(ref);
        if(record != null && typeof record.assetObj != "undefined" && record.assetObj != null)
        {
            return record.assetObj;
        }
        else
        {
            return null;
        }
    },
    addDatas : function(ref, datas)
    {

    },
};