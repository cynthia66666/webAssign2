const product = {

    fakeDb : [],


    init(){
        this.fakeDb.push({title : `ps4`,price : `330`,cate : `Electronics & Accessories`,img : `img/category1.jpg`,bs : false});
        this.fakeDb.push({title : `Sofa`,price : `1533`,cate : `Revamp your home`,img : `img/category2.jpg`,bs : false});
        this.fakeDb.push({title : `CholocateS`, price : `18.77`,cate : `Shop Valentine's Day gifts`,img : `img/category3.jpg`,bs : true});
        this.fakeDb.push({title : `Cardio`,price : `280`,cate : `Fitness,Cardio and more`,img : `img/category4.jpg`,bs : false });
        this.fakeDb.push({title : `Camera`,price : `27.99`,cate : `Shop Valentine's Day gifts`,img : `img/bs1.jpg`,bs : true});
        this.fakeDb.push({title : `Camping Gear`,price : `99.45`,cate : `Fitness,Cardio and more`,img : `img/bs4.jpg`,bs : true});
        this.fakeDb.push({title : `Fitness bands`,price : `5.78`,cate : `Fitness,Cardio and more`,img : `img/bs3.jpg`,bs : false});  
        this.fakeDb.push({title : `Tooth Care`,price : `5.78`,cate : `Shop Valentine's Day gifts`,img : `img/bs2.jpg`,bs : true});},
    
    getAllProduct(){
        return this.fakeDb;
    },

    getbS(){
        var bs = [];
        this.fakeDb.forEach(element => {
            if(element.bs == true)
                bs.push(element);
        });
        return bs; 
    },

    getcate(){
        var category = [];
        var collect = {};
        var cate;
        var count;
        for(let i=0; i<this.fakeDb.length; i++){
            cate = this.fakeDb[i].cate;
            count = collect[cate] || 0;
            collect[cate] = count + 1;
            if(count == 0)
                category.push(this.fakeDb[i]);
        }

        return category;
    }


}
product.init();


module.exports=product;