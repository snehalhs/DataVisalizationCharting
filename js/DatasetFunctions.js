//let dataArray = null;
//let colArr = null;
//let dataframe = null;
//let labels = null;

//var dataArray = null;
//var colArr = null;
//var dataframe = null;
//var labels = null;
//send selected columns to chart


function scrollto(divelement){
    let target = document.getElementById(divelement);
    let scrollContainer = target;
    do {
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do {
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 20);
    }
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function reset(){
    let dname = this.currentdName;
    loadDataset(dname);
    scrollto("tablePrint");
    
}

function loadDataset(dName) {
var arr, body, tab, tr, td, tn, row, col;
        //alert(dName);
			let dfm = dfjs.DataFrame;
        let currentdName = dName;
    this.currentdName = currentdName;
            let DF = dfm;
            this.DF = DF;
			dfm.fromCSV('Datasets/'+dName+'.csv').then(
				df => { 
			df.show();
            let dataframe = df;
            this.dataframe = df;
            var collist = df.listColumns();
            //var colArr = collist.split(",");
            let colArr = Array.from(collist);
			let dataArray = df.toArray();
            let labels = colArr;
            labels+='';
            this.labels = labels.split(',');
                    var tab = "<table id='dataset1'; align='center'>";
                    for(var x=0; x<colArr.length; x++){
                        //tab+="<th onclick='sort("+x+",this)'><u>"+colArr[x]+"</u></th>";
                        tab+="<th onclick='sort("+x+")'><u>"+colArr[x]+"</u></th>";
                    }
                    for (row = 0; row < dataArray.length; row++){ 
                        
                        tab+="<tr>";
                        for (col = 0; col< dataArray[row].length; col++){
                            tab+="<td>"+dataArray[row][col]+"</td>";    
                            
                        }
                        tab+="</tr>";
                    }
                    tab+="</table>";
                    document.getElementById('tablePrint').innerHTML = tab;
                    //sessionStorage.setItem('data',arr);
                    //sessionStorage.setItem('labels',colArr);
                                            
				}
			);
}

function displayvals(){
    let selectedcols = document.getElementsByClassName('chart');
    let col = [];
    for(var x=0; x<selectedcols.length; x++){
        if(selectedcols[x].checked){
            col.push(selectedcols[x].value);
            //alert(col[x]);
        }
    }
    //let cols4chart = col;
    //this.cols4chart = cols4chart;
    this.cols4chart = col;
    let element = createmultipleselect(col);
    document.getElementById('showRows').innerHTML = element;
}
function createmultipleselect(colname){
    let ele = "";
    let selectdf = this.dataframe;
    let drpID = [];
//    alert(colname);
//    alert(selectData);
    for(var x=0; x<colname.length; x++){
        let selectData = selectdf.select(colname[x]);
        selectData = selectData.toArray();
        //selectData.join(",");
        //selectData+='';
        //selectData.join(",");
        //ele+= "<select class='"+selection[x]+"' id='chartvalues' multiple>";
        ele+= "<select class='rowdata' id='"+colname[x]+"' multiple>";
        for(var y=0; y<selectData.length; y++){
            ele+= "<option value="+selectData[y]+">"+selectData[y]+"</option>";
        }
        ele+="</select>";
        drpID.push(colname[x]);
    }
    
    this.drpID = drpID;
    return ele;
    //let 
    
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function operations(){
    //var checkedValue = [];
    var checkedValue = "";
    
    var checked = document.getElementsByClassName('cols');
    for(var x=0; x<checked.length; x++){
        if(checked[x].checked){
            //checkedValue += "'"+checked[x].value+"',";
            checkedValue += checked[x].value+',';
            //checkedValue.push(checked[x].value);
            
            
        }
    }
    
    if (checkedValue == ""){
		 alert ('please Select at least one group by column');
		 
	 }
	 else {
         checkedValue = checkedValue.substring(0, checkedValue.length-1);	

         let tablename= makeid()
         let groupdata = this.dataframe;
         groupdata.sql.register(tablename);
         let df = this.DF;
//DataFrame.sql.registerTable(groupdata,tablename,overwrite = true )
         df.sql.registerTable(groupdata,tablename,overwrite = true );
// Request on Table
//var x = DataFrame.sql.request('SELECT count(*) FROM '+ tablename +' group by '+checkedValue  )

//var x = DataFrame.sql.request('SELECT * FROM '+ tablename +' group by '+checkedValue  )
         var x = df.sql.request('SELECT * FROM '+ tablename +' group by '+checkedValue  );
//console.log(x.show())
         console.log(x.listColumns());

	 }
}




function getStats(){
    
    //var checkedValue = "";
    var checkedValue = [];
    
    var checked = document.getElementsByClassName('cols');
    for(var x=0; x<checked.length; x++){
        if(checked[x].checked){
            //checkedValue += checked[x].value+',';
            checkedValue.push(checked[x].value);
        }
    }
    
    let statDF = this.dataframe;
    let divele = "";
        for(var x=0; x<checkedValue.length;x++){
            let max = statDF.stat.max(checkedValue[x]);
            let min = statDF.stat.min(checkedValue[x]);
            let sum = statDF.stat.sum(checkedValue[x]);
            let mean = statDF.stat.mean(checkedValue[x]); 
            let sd = statDF.stat.sd(checkedValue[x]);
            divele+="<h4><u>"+checkedValue[x]+"</u></h4>";
            divele+="<h5> Maximum Value : "+max+"</h5>";
            divele+="<h5> Minimum Value : "+min+"</h5>";
            divele+="<h5> Sum : "+sum+"</h5>";
            divele+="<h5> Mean Value : "+mean+"</h5>";
            divele+="<h5> Standard Deviation : "+sd+"</h5>";
        }
      
        
        document.getElementById('statsdiv').innerHTML = divele;
}





function excludeData(){
    var checkedValue = "";
    let checkedcols = [];
    var checked = document.getElementsByClassName('list');
    for(var x=0; x<checked.length; x++){
        if(!checked[x].checked){
            //checkedValue.push(checked[x].value);
            checkedValue += checked[x].value+',';
            checkedcols.push(checked[x].value);
            
        }
    }
    //checkedValue = checkedValue.toString();
    //alert(checkedValue);
    checkedValue = checkedValue.substring(0, checkedValue.length-1);	
    var excludeDF = this.dataframe;
    let df = this.DF;
    let tablename= makeid()
    excludeDF.sql.register(tablename);
    df.sql.registerTable(excludeDF,tablename,overwrite = true );
    let exclude = df.sql.request('SELECT '+checkedValue+' FROM '+ tablename );
    excludearr = exclude.toArray();
    
    //alert(excludearr);
    
    let divele = createtable(excludearr,checkedcols);
    document.getElementById('tablePrint').innerHTML = divele;
    scrollto("tablePrint");
    //alert(exclude.show());
    
    //alert(excludeDF.select(checkedValue).show());
    
    
}

function createtable(tableArr, colArr){
    
    let tab = "<table id='excluded'; align='center'>";
                    for(var x=0; x<colArr.length; x++){
                        //tab+="<th onclick='sort("+x+",this)'><u>"+colArr[x]+"</u></th>";
                        tab+="<th><u>"+colArr[x]+"</u></th>";
                    }
                    for (var row = 0; row < tableArr.length; row++){ 
                        
                        tab+="<tr>";
                        for (var col = 0; col< tableArr[row].length; col++){
                            tab+="<td>"+tableArr[row][col]+"</td>";    
                            
                        }
                        tab+="</tr>";
                    }
                    tab+="</table>";
    return tab;   
}


function listColumns(div,classname){
    var list="";
    for(var x=0; x<this.labels.length; x++){
                list+= "<input class = "+classname+" type='checkbox' name ="+labels[x]+" value="+labels[x]+">"+labels[x];
            }
    document.getElementById(div.id).innerHTML = list;
    
}


function hide(div){
    //alert(div.id);
            let divid= document.getElementById(div.id);
            divid.style.display === 'block'
    if (divid.style.display === 'none') {
        divid.style.display = 'block';
    } else {
        divid.style.display = 'none';
    }
    
}

function createChart(){
    
    //alert("inside create chart");
    let dropdown = document.getElementById('chartoptions');
    let charttype = dropdown.options[dropdown.selectedIndex].value;
    //let rdata = rowdata.options[rowdata.selectedIndex].value;
    //let rdata = rowdata.val();
    //alert(selection);
    
    
    let chartCol = document.getElementsByClassName('rowdata');
    let selectedVal = [];
    for(var x=0; x<chartCol.length; x++){
        if(chartCol[x].checked){
            selectedVal[x] = chartCol[x].value;
        }
    }
    
    
    let selectedcols = document.getElementsByClassName('chart');
    let col = [];
    for(var x=0; x<selectedcols.length; x++){
        if(selectedcols[x].checked){
            col.push(selectedcols[x].value);
            //alert(col[x]);
        }
    }
    
    
    
    
    //alert(col.toString());
    let rdata = [];
    
    var id = this.drpID;
    for(var y=0; y< id.length; y++){
        let rowdata = document.getElementById(id[y]);
        
    for(var x=0; x<rowdata.length; x++){
        if(rowdata.options[x].selected){
            rdata.push(rowdata.options[x].value);
        }
        
        }
    }
    
    //alert(rdata);
    
//    for(var x=0; x<rdata.length;x++){
//        if (rdata[x] > '40000'){
//            alert("Yes!!!!");
//        }
//    }
    
    //conditionvals
    
    
    
    
    //selectedVal = selectedVal.toString();
    
    //alert(rdata);
    //alert(charttype);
    //let dt = this.dataframe;
    //alert(dt.show());
    
    let creator = new ChartCreator(charttype, this.dataframe, rdata);
    
    //alert(charttype);
    creator.selectCreator();
}


//function sort(x,id){
//    alert(id);
//}