class PieCreator extends ChartCreator {
    constructor(chart,data,rowdata){
        super(chart,data,rowdata);
    }
    
    configBar(){
        let data = super.getdataframe();
//        //let data = this.dataframe;
        //let col = super.getcolumn();
        let chart = super.getcharttype();
        let labels = data.listColumns();
        let rowdata = super.getrowdata();
     //   let coldata = super.getcoldata();
//        col = array of cols
        
        //alert(col);
        let colddata = data;
        let allvals = [];
        let alldata = [];
        
        //alert(col[1]);
//        for (var x=0; x<col.length;x++){
//            colddata = data.select(col[x]);
//            allvals = colddata.toArray();
//            alldata.push(allvals);
//            
////            for(var y=0; y<allvals.length; allvals++){
////                //alldata.push(colddata[y]);
////                alldata[y] = colddata[y];
////            }
//            
//        }
//        alert(alldata.toString());
        
        
        
        
        
        //alert(allvals);
        
        
        
//        let coldata = data.select(col);
//        coldata = coldata.toArray();
        //alert(coldata[0]);
        
        
//        data = data.toArray();
//        labels = Array.from(labels);
//        labels+='';
//        labels = labels.split(',');
//        //var bgcolor1, bgcolor2, bcolor3 = [];
        let bgcolor = [];
        let bordercolor = [];
        for (var x=0; x<rowdata.length; x++){
            bgcolor[x] = 'rgba('+(Math.floor(Math.random() * 255) + 1)+','+
                (Math.floor(Math.random() * 255) + 1)+','+
                (Math.floor(Math.random() * 255) + 1)+',0.8)';
        }
        
        bordercolor = bgcolor;
        //setbordercolor(bordercolor);
        //setbgcolor(bgcolor);
        
        
        
//        var chartData = [];
//        var label = [];
//        for (var x=0; x<labels.length; x++){
//            //chartData += data[x]
//            //label = labels[x];
//            chartData[x] = data[x]
//            label = data[x];
//            //alert(data[x]);
//        }
//        
//        alert(data.show());
//        alert(chartData[2]);
////        
////        var dataset = [];
////        for (var x=0; x<labels.length; x++){
////            dataset["label"]=labels[x];
////            dataset["data"] = chartData[x];
////        }
////        
////        alert(dataset.toString());
        
        //let dataset = [];
        var daset = {};
        let label = [];
        let dset = [];
        
//        for(var x=0; x<alldata.length;alldata++){
//            alert(col[x]);
////            daset = {
////                label : col[x],
////                data : alldata[x],
////                backgroundColor: bgcolor,
////                borderColor: bordercolor,
////                borderWidth: 1
////                
////            };
//          //  dset.push(daset);
//        }
        
        //alert(dset[0].label);
        
//        
        var ctx = document.getElementById("displaychart");
        var mychart = new Chart(ctx,{
            type: 'pie',
//            data : daset,
            data: {
                labels: rowdata,
                datasets: [{
                    //label: label,
                    label: ['UK'],
                    //data: coldata,
                    data: rowdata,
                   
                    backgroundColor: bgcolor,
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ], 
                    borderWidth: 3
              
            }
//                    ,{
//                    //label: label,
//                    label: ['NorthernIreland'],
//                    //data: coldata,
//                    data: ['1498','1693','2345'],
//                    backgroundColor: bgcolor,
//                borderColor: bordercolor,
//                borderWidth: 1
//            }             
                    ]
    },
        //options: {
        //    scales: {
        //        yAxes: [{
        //            ticks: {
        //                beginAtZero:true
        //            }
         //       }]
        //    }
       // }
   options: {
    	  responsive: true,
    	maintainAspectRatio: true,
    	    //animateScale: false
	}
})
        
        //alert(bgcolor1);
     //   var bgcolor = 
    }
//    
    set bordercolor(bordercolor){
        this.bordercolor = bordercolor;
    }
    
    set bgcolor(bgcolor){
        this.bgcolor = bgcolor;
    }
    
    get bordercolor(){
        return this.bordercolor;
    }
    
    get bgcolor(){
        return this.bgcolor;
    }
     
    

}