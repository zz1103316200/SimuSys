//@zw
var lineStyle;//存线条样式
var LineHeight="40px";
var inputPointArr=[];
var inputPortArr=[];
var inPortJson='[';
var outputPointArr=[];
var outputPortArr=[];
var outPortJson='[';
var stringlineJson='';

var j=0;//统计输入口当前行数
var k=0;//统计输出口当前行数
var configContent;//线缆JSON

/**
 * 创建一个参数
 * paramName : string 参数名称
 */
var createParam = function(paramName){
	var div = document.createElement('div');
	div.style.height = '60px';
	//div.style.fontSize = "15px";
	var span = createTips(paramName);
	div.appendChild(span);
	return div;
}
/**
 * 创建一个提示信息
 * content : string 提示内容
 */
var createTips = function(content){
	var span = document.createElement('span');
	span.style.lineHeight = '60px';
	span.style.fontSize = "20px";
	span.style.marginLeft = '10px';
	span.innerHTML = content; 
	return span;
}
/**
*列出接口配置信息
*container : dom node
*/
var configInters = function(container,that,json){
	//线缆接头对应的接口信息
	/*for(var i in totalJson){
		for(var j in totalJson[i].line){
			if(totalJson[i].line[j].lineId&&totalJson[i].line[j].lineId==){
				
			}
		}
	}*/
	//console.log("---"+getinPortList(that.source.getId()));
	//模拟json数据
	console.log(json);
	var data={"inputport":[{"portId":"001","portName":"Enter"},{"portId":"002","portName":"prto"},{"portId":"003","portName":"vulws"},{"portId":"004","portName":"sliu"}],
			  "outputport":[{"portId":"001","portName":"erweo"},{"portId":"002","portName":"weiot"}]};
	var form, div, table, tbody,select;
	/*
	*接头名称，可选接口 
	*/
	container.innerHTML="";
	form = document.createElement("form");
	form.className="form-horizontal";
	table = document.createElement("table");
	table.style.width="100%";
	tbody = document.createElement("tbody");
	tbody.id="inputTable";

	/*****************************************第一行************************/
	//创建输入可选接头，由lebel和select组成
	div= createParam("输入可选接头名称：");
	div.style.height=LineHeight;
	select = document.createElement('select');
	select.style.fontSize="18px";
	select.name = 'inputPointName';//输入接头名称
	select.id = 'inputPointName'+j;
	select.onchange=function(){
		inputPointArr=this.value;
	};
	div.appendChild(select);
	//alert(devList.length);
	/*select.options.add(new Option('接口1', '0'));
	select.options.add(new Option('接口2', '1'));*/
	for(var i=0;i<json.cableAOption.length;i++){
		select.options.add(new Option(json.cableAOption[i],json.cableAOption[i]));
	}
	tbody.insertRow(0).id=j;
	tbody.rows[0].insertCell(0).style.textAlign="center";
	tbody.rows[0].cells[0].appendChild(div);
	//创建输入可选接口，由lebel和select组成
	div= createParam("输入可选接口名称：");
	div.style.height=LineHeight;
	select = document.createElement('select');
	select.style.fontSize="18px";
	select.name = 'inputPortName';//输入接口名称
	select.id='inputPortName'+j;
	select.onchange=function(){
		//alert("inport");
		inputPortArr=this.value;
		inPortJson+='{"inputPointName":"'+inputPointArr+'","inputPortName":"'+inputPortArr+'"},';
		console.log(inPortJson);
	}
	div.appendChild(select);
	/*select.options.add(new Option('接口1', '0'));
	select.options.add(new Option('接口2', '1'));*/
	for(var i=0,len=json.interSourOption.length;i<len;i++){
		select.options.add(new Option(json.interSourOption[i],json.interSourOption[i]));
	}
	tbody.rows[0].insertCell(1);
	//添加加号
	i = document.createElement("i");
	i.className="fa fa-lg fa-fw fa-plus-circle";
	i.id="addInputRow";
	i.style.paddingLeft="15px";
		i.onclick=function(){
		newInputRow(document.getElementById("inputTable"),json);
	}
	div.appendChild(i);
	tbody.rows[0].cells[1].appendChild(div);
	//table.appendChild(tfoot);
	table.appendChild(tbody);
	form.appendChild(table);

	/***********************第二行******************************/
	table = document.createElement("table");
	table.style.width="100%";
	tbody = document.createElement("tbody");
	tbody.id="outputTable";
	table.appendChild(tbody);
	//创建输入可选接头，由lebel和select组成
	div= createParam("输出可选接头名称：");
	div.style.height=LineHeight;
	select = document.createElement('select');
	select.style.fontSize="18px";
	select.name = 'outputPointName';//输出接头名称
	select.id = 'outputPointName'+k;
	select.onchange=function(){
		 outputPointArr=this.value;
	}
	div.appendChild(select);
	for(var i=0;i<json.cableBOption.length;i++){
		select.options.add(new Option(json.cableBOption[i],json.cableBOption[i]));
	}
	tbody.insertRow(0).id=j;
	tbody.rows[0].insertCell(0).style.textAlign="center";
	tbody.rows[0].cells[0].appendChild(div);
	//创建输入可选接口，由lebel和select组成
	div= createParam("输出可选接口名称：");
	div.style.height=LineHeight;
	select = document.createElement('select');
	select.style.fontSize="18px";
	select.name = 'outputPortName';//输入接口名称
	select.id='outputPortName'+k;
	select.onchange=function(){
		outputPortArr=this.value;
		outPortJson+='{"outputPointName":"'+outputPointArr+'","outputPortName":"'+outputPortArr+'"},';
		console.log(outPortJson);
	}
	div.appendChild(select);
	for(var i=0,len=json.interTarOption.length;i<len;i++){
		select.options.add(new Option(json.interTarOption[i],json.interTarOption[i]));
	}
	tbody.rows[0].insertCell(1);
	//添加加号
	i = document.createElement("i");
	i.className="fa fa-lg fa-fw fa-plus-circle";
	i.id="addoutputRow";
	i.style.paddingLeft="15px";
	div.appendChild(i);
	tbody.rows[0].cells[1].appendChild(div);
	//添加确定按钮
	tfoot = document.createElement("tfoot");
	button = document.createElement("button");
	text = document.createTextNode("确定");
	button.appendChild(text);
	button.style.cssFloat="right";
	button.style.fontSize="18px";
	button.style.marginTop="15px";
	button.style.marginRight="9px";
	button.id="addOK";
	table.appendChild(tfoot);
	tfoot.appendChild(button);
	table.appendChild(tbody);
	form.appendChild(table);
	i.onclick=function(){
		newOutputRow(document.getElementById("outputTable"),json);
	}
	container.appendChild(form);
	//console.log(container);
	return container;
}
/*
*功能：点击动态生成一个div
*/
	function newInputRow(tbody,json){
		j=j+1;
	//创建输入可选接头
	div=createParam("输入可选接头名称：");
	div.style.height=LineHeight;
	select = document.createElement("select");
	select.style.fontSize="18px";
	div.appendChild(select);
	select.name="inputPointName";
	select.id="inputPointName"+j;
	for(var i=0;i<json.cableAOption.length;i++){
		select.options.add(new Option(json.cableAOption[i],json.cableAOption[i]));
	}
	select.onchange=function(){
		//alert("onchange");
		inputPointArr=this.value;
	}
	var tr = tbody.insertRow(-1);
		td = tr.insertCell(0);
		td.style.textAlign="center";
		td.appendChild(div);
	//创建输入可选接口
	div= createParam("输入可选接口名称：");
	div.style.height=LineHeight;
	//form.appendChild(div);
	select = document.createElement('select');
	select.style.fontSize="18px";
	div.appendChild(select);
	select.name = 'inputPortName';//输出接口名称
	select.id = "inputPortName"+j;
	select.onchange=function(){
		inputPortArr=this.value;
		inPortJson+='{"inputPointName":"'+inputPointArr+'","inputPortName":"'+inputPortArr+'"},';
		console.log(inPortJson);
	}
	
	for(var i=0,len=json.interSourOption.length;i<len;i++){
		select.options.add(new Option(json.interSourOption[i],json.interSourOption[i]));
	}
		//console.log(tr.previousSibling())
	td = tr.insertCell(-1);
	td.appendChild(div);
	return tbody;
	}

	function newOutputRow(tbody,json){
		k=k+1;
	div=createParam("输出可选接头名称：");
	div.style.height=LineHeight;
	select = document.createElement('select');
	select.style.fontSize="18px";
	div.appendChild(select);
	select.name="outputPointName";//输出接口名称
	select.id="outputPointName"+k;
	for(var i=0;i<json.cableBOption.length;i++){
		select.options.add(new Option(json.cableBOption[i],json.cableBOption[i]));
	}
	var tr = tbody.insertRow(-1);	
	var td = tr.insertCell(0);
		td.style.textAlign="center";
		td.appendChild(div);
		//创建输出可选接口
	div= createParam("输出可选接口名称：");
	div.style.height=LineHeight;
	//form.appendChild(div);
	select = document.createElement('select');
	select.style.fontSize="18px";
	div.appendChild(select);
	select.name = 'outputPortName';//输出接口名称
	select.id = "outputPortName"+k;
	select.onchange=function(){
		outputPortArr=this.value;
		outPortJson+='{"outputPointName":"'+outputPointArr+'","outputPortName":"'+outputPortArr+'"},';
		console.log(outPortJson);
	}
	//select.options.add(new Option('接口1', '1'));
	for(var i=0,len=json.interTarOption.length;i<len;i++){
		select.options.add(new Option(json.interTarOption[i],json.interTarOption[i]));
	}
	td = tr.insertCell(-1);
	td.appendChild(div);
	return tbody;
	}


	//@zw 获取线缆样式
	function getLineStyle(graph,id){
				//graph.getStylesheet().getDefaultEdgeStyle();
				//strokeWidth=5;strokeColor=blue;fontSize=2;//
				style=graph.getStylesheet().getDefaultEdgeStyle();
				style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
				style[mxConstants.STYLE_STROKEWIDTH] = '5';
				 delete style['endArrow'];
				//console.log("id---"+id);
				style[mxConstants.STYLE_STROKECOLOR] =id;

	}

	
	//@zw
	 function getToolTipValue(obj){
   		console.log(obj);
   		var toolTipValue;
   		if(obj.isVertex()){
   		var vertex=obj.getValue();
   		console.log(vertex);
   		var text=vertex.split("</h1>")[0];
   		var conmpType=text.split(",")[1];//标注是哪一个类型
   		var compName=text.split(",")[0];
   			compName=compName.split(">")[1];
   		toolTipValue="这是"+conmpType+"类型的组件"+compName+",id是"+obj.getId();
   		console.log(toolTipValue);
   		return toolTipValue;
   		}
   		else if(obj.isEdge()){
   			var line=obj.getId();
   		//	alert(vertex.getValue())
   			var source=obj.source.getId();
   			var target=obj.target.getId();
   			toolTipValue="该线的id是："+line+"输入组件id是："+source+"输出组件id是："+target;
   			console.log(toolTipValue);
   			return toolTipValue;
   		}
   		else {
   			return;
   		}

   }