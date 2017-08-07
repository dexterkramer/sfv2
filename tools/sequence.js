var sequenceManager = function(){
    this.sequence = 0;
};

sequenceManager.prototype = {
    getNewId : function()
    {
        var ret = this.sequence;
        this.sequence += 1;
        return ret;
    }
}