class ChartCreator {
    
    constructor(chartType, dataframe, rowdata){
        this.chartType = chartType;
        this.dataframe = dataframe;
        this.rowdata = rowdata;  
    }
//        switch (this.chartType) {
//            case "bar" :
////                alert(this.chartType);
//                new BarChart();
//                break;
//        }
//    }
    selectCreator(){
//        var chartType = getcharttype();
        let chartType = this.chartType;
        let dataframe = this.dataframe;
        let rowdata = this.rowdata;        
        switch (this.chartType) {
            case "bar" :
                //alert(this.chartType+"inside switch");
                //alert(this.dataframe.show());
                var bar = new BarCreator(chartType,dataframe,rowdata);
                //alert(column.toString());
                bar.configBar();
                //bar.newbarchart();
                break;
            case "line" : 
            	 var line = new LineCreator(chartType,dataframe,rowdata);
                 //alert(column.toString());
                 line.configBar();
                 //bar.newbarchart();
                 break;
            case "pie" : 
           	 var pie = new PieCreator(chartType,dataframe,rowdata);
                //alert(column.toString());
                pie.configBar();
                //bar.newbarchart();
                break;
            case "polar" : 
              	 var polar = new PolarCreator(chartType,dataframe,rowdata);
                   //alert(column.toString());
                   polar.configBar();
                   //bar.newbarchart();
                   break;
            	
        }
        
    }    
    getcharttype(){
        return this.chartType;
    }
    
    getdataframe(){
        //let dt = this.dataframe
        //alert(dt.show());
        return this.dataframe;
    }
    
    getrowdata(){
        return this.rowdata;
    }
    
}