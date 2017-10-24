var mongoConnector = function(objectToCollectionSchema){
    this.objectToCollectionSchema = objectToCollectionSchema;
    this.objectSchema = null;
};

mongoConnector.prototype = {
    setObjectSchema : function(objectSchema)
    {
        this.objectSchema = objectSchema;
    }

};