	
		//用一个变量设定File的id
		var text1;
		//totalJson 每一个控件拖出来 都放到totalJson里面 
		var totalJson='[]';
		//submitJson 最后过滤过Json以后，把切实有用的Json控件传到后台
		var submitJson='[]';
        var evt;
		var cell;
    	var editor;
		var graph;
    	var model;
    	var label;
    	var image;
    	var sidebar;
        //这个是弹出的框
		var showWindow;
		var showGraph;
		var devInfo;//@rnn 调用getAllDevice.java获取的设备信息（新加）
		var showBackground;
		//初始化接口参数配置信息
		//var portConfigInfo='"portState":"Enable","rate":"Auto","duplexState":"Auto","connectType":"Access","pvid":"1","description":"","wireType":"Auto","flowControl":"Disable","broadcastType":"ratio","broadcastValue":"100","multicastType":"ratio","multicastValue":"100"';		
		
		function callback(msg)
		{
			document.getElementById("file1").outerHTML = document.getElementById("file1").outerHTML;
			document.getElementById("msg").innerHTML = "<font color='red'>"+msg+"</font>";
		}
		//处理字符串，得到组件类型
	    function getCellType(fullStr){
			var strValue=fullStr;
			var start=strValue.indexOf('">')+2;//返回数字
            var end=strValue.indexOf('</');
            var realValue=strValue.substring(start,end);
			return realValue+"";
		}
	  //处理字符串，得到组件类型
	    function getCellTypeFromImage(fullStr){
			var strValue=fullStr;
			var start=strValue.indexOf('business/')+9;//返回数字
            var end=strValue.indexOf('.png');
            var realValue=strValue.substring(start,end);
			return realValue+"";
		}		
		//这个是创造元素，
		//根据页面所给ID来得到json的ID
		function getElement(id){
			var elementId=id;
			totalJson=eval(totalJson);
			for(var i=0;i<totalJson.length;i++){
				
				if(totalJson[i].id==elementId){
					return i+"";
				}
			}
			return "";
			
		}
		//获得下一个自动生成的id
		function getTheNextId(){
			//var elementId=id;
			totalJson=eval(totalJson);
			var nowId = 0;
			for(var i=0;i<totalJson.length;i++){
				
				if(parseInt(totalJson[i].id)>nowId){
					nowId = parseInt(totalJson[i].id);
				}
			}
			return nowId+1;
			
		}
		//通过json中的id得到相应接口的名称
		function getCompName(id){
			//alert(id);
			var portid=id;
			var portName=[];
			for(var i in totalJson){
				if(totalJson[i].id==portid){
					for(var j=0;j<totalJson[i].interface.length;j++){
						portName.push(totalJson[i].interface[j].interName);
					}
				//console.log(portName);
				}
			}
			//console.log(portName.join(","));
			return portName.join(",")
		}
		//得到输入和输出的接口列表
		function getinPortList(id){
			var inid=id;
			//alert(inid)
			var portName=[];
			for(var i in totalJson){
				for(var j in totalJson[i].slot){
					if(totalJson[i].id==inid&&totalJson[i].slot[j].slotState=="undefined"){
						//alert("ddd");
						for(var k=0;k<totalJson[i].interface.length;k++){
							portName.push(totalJson[i].interface[k].interName);
						}
					//console.log("portName"+portName);
					}
				}
			}
			return portName;
		}
		//双击图标弹出的框
		function createElements(div,yuanlai,fileId){
			var type=getCellType(yuanlai).split(",")[0];
			var compType=getCellType(yuanlai).split(",")[1];
			var index=getElement(fileId);

			//一般情况下不会new 而是load 	
				if(index == ""){
				        //new 控件
					alert("error!");
				}else{  
				        totalJson=eval(totalJson);

						
						if(compType=="1"){
							if(type=="Choice"){
								
							}else if(type=="Resequence"){
							    //createResequenceElements(div,yuanlai,fileId);
							}else if(type=="Splitter"){
							    createSplitterElements(div,yuanlai,fileId);
							}else if(type=="Aggregator"){
							    createAggregatorElements(div,yuanlai,fileId);
							}else if(type=="Option"){
							    createOptionElements(div,yuanlai,fileId);
							}
						}else if(compType=="2"){
//							$.post("../servlet/getInterOfSerServlet",{name:type},function(text){
//							console.log(text);
//							var str="<form  class='form-horizontal' style='width:80%;margin-left:10%;font-size:16px;font-family:'Microsoft YaHei''>";
//							str+="<div class='form-group'><label class='control-label col-md-5'>服务名:</label><div class='col-md-6'><input type='text' disabled='true' class='form-control' id='name"+fileId+"' value='"+text.serviceName+"'   /></input></div></div>";
//							str+= "<div class='form-group'><label class='control-label col-md-5'>接口:</label><div class='col-md-6'><select class='form-control input-sm  col-md-6' style='font-size:14px' id='interfaceName"+fileId+"'>";
//							
//							for(var optionvalue in text.interfaceName){
//								console.log(text.interfaceName[optionvalue].interfaceName);
//								str+= "<option value='" + text.interfaceName[optionvalue].name +"'>" + text.interfaceName[optionvalue].name + "</option>";
//							}
//							str+= "</select></div></div>";
//							str+="<div class='form-group'><label class='control-label col-md-5'></label><div class=' col-md-6'><button type='button' style='color:green;' class='btn btn-success' onclick=Submit("+fileId+",'-1')>确定</button></div></div></form>";
//							//console.log(str);
//							div.innerHTML=str;
//						});
						}else if(compType=="3"){
							$.post("../servlet/getProtocolPropertiesServlet",{name:type},function(text){
								var str="<form  class='form-horizontal' style='width:80%;margin-left:10%;font-size:16px;font-family:'Microsoft YaHei';'>";
								
								//console.log(text.length);
								for(var i=0;i<text.length;i++){
									
									if(text[i].type=="input"){
										str+="<div class='form-group'><label class='control-label col-md-5'>"+text[i].name+"</label><div class='col-md-6'><input type='text' class='form-control' id='property"+(i+1)+fileId+"' value='"+totalJson[index]["property"+(i+1)]+"'   /></input></div></div>";
									}else if(text[i].type=="select"){
										//alert(text[i].option.length);
										//str+="<div class='control-group'><label class='control-label'>模式:</label><div class='controls'><select id='property"+(i+1)+fileId+"' ><option value='request-response' selected>request-response</option><option value='one-way'>one-way</option></select></div></div>";
										var optionValues = text[i].option.split(",");
										str+= "<div class='form-group'><label class='control-label col-md-5'>"+text[i].name+":</label><div class='col-md-6'><select class='form-control input-sm  col-md-6' style='font-size:14px' id='property" +(i+1)+fileId+"'>";

										for(var optionvalue in optionValues){
											str+= "<option value='" + optionValues[optionvalue] +"'>" + optionValues[optionvalue] + "</option>";
										}
										str+= "</select></div></div>";
									}
									
								}
								str+="<div class='form-group'><label class='control-label col-md-5'></label><div class=' col-md-6'><button type='button' style='color:green;' class='btn btn-success' onclick=Submit("+fileId+","+text.length+")>确定</button></div></div></form>";
								div.innerHTML=str;
							});
							
						}				    
				}
				
		}
		

		
		//@zz直接可视化得到的vertex初始化为json
	    function initElementVertex(id,obj){

	    	   obj.id = id;
	    	   totalJson=eval(totalJson);
	    	   totalJson[totalJson.length] = obj;
	    	   
		}
	  //@zz直接可视化得到的vertex初始化为json
	    function initElementEdge(id,obj,sourceId,targetId){
	    		//alert("  id:"+id+"  sourceId:"+sourceId+"  targetId:"+targetId);
	    		//console.log(obj);
	    	   obj.id = id;
	    	   obj.sourceId = sourceId;
	    	   obj.targetId = targetId;
	    	   totalJson=eval(totalJson);
	    	   totalJson[totalJson.length] = obj;
	    	   //console.log(totalJson);

		}
		//@任娜娜 新写的initElement
	   function initElement(id,value,obj,realImg,inter,slot,x,y,deviceUrl){
		  // alert("initElement");
   		//接口json串
   	    var interStr='[';
   	    if(inter.length==0){
   	    	interStr='""';
   	    	//console.log(interStr);
   	    }else {
   	    	for(var i=0;i<inter.length;i++){
   	   			//初始化参数配置信息
   	   			var configInfo='{';
   	   			for(var j=0;j<inter[i].parameters.length;j++){
   	   				if(inter[i].parameters[j].type == "select"){
   	   					configInfo+='"'+inter[i].parameters[j].name+'":"'+inter[i].parameters[j].option.split(",")[0]+'",';
   	   				}else if(inter[i].parameters[j].type == "input"){
   	   					configInfo+='"'+inter[i].parameters[j].name+'":"",';
   	   				}
   	   			}
   	   			configInfo=configInfo.substring(0, configInfo.length-1);
   	   			configInfo+='}';
   	   			//alert(configInfo);
   	   			interStr+='{"interId":"'+inter[i].interId+'","interName":"'+inter[i].interName+'","interCoords":"'+inter[i].interCoords+'","interConfig":'+configInfo+'},';
   	   		}
   	    	interStr=interStr.substring(0, interStr.length-1);
   	   		interStr+=']';
   	    }
   		
   		
   		//alert(interStr);
   		
   		//解析slot
   		var slotStr='[';
   		//slotStr+='{"slotId":"'+slot[0].slotId+'","slotName":"'+slot[0].slotName+'","slotCoords":"'+slot[0].slotCoords+'","slotState":"true","boardInfo":{"boardId":"board1","boardUrl":"2FE.png","bodInter":[{"interId":"inter11","interName":"接口k","coords":"35,3,65,26","config":{'+portConfigInfo+'}},{"interId":"inter12","interName":"接口l","coords":"74,3,104,26","config":{'+portConfigInfo+'}}]},"useMapId":"2FE"},';
   		if(slot.length==0){
   			slotStr='""';
   		}
   		else {
   			for(var i=0;i<slot.length;i++){
   	   			slotStr+='{"slotId":"'+slot[i].slotId+'","slotName":"'+slot[i].slotName+'","slotCoords":"'+slot[i].slotCoords+'","slotState":"'+slot[i].slotState+'","boardInfo":""},';
   	   		}
   	   		slotStr=slotStr.substring(0, slotStr.length-1);
   	   		slotStr+=']';
   		} 		
   		//console.log(slotStr);
   		
		    var strValue=value+"";
		    var realValue=getCellType(strValue).split(",")[0];
		    var compType=getCellType(strValue).split(",")[1];
		    var realId=getCellType(strValue).split(",")[2];//设备的实际id
		    // alert(realValue+" "+compType);
		    var fileContent;
		   // alert("=="+interStr);
			fileContent='[{"id": "'+id+'","deviceUrl":"'+deviceUrl+'","location_y":"'+y+'","location_x":"'+x+'","realId":"'+realId+'","realUrl":"'+realImg+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'","inter":'+interStr+',"slot":'+slotStr+'}]';
		   // alert(fileContent);
			//console.log(fileContent);
			var jsonFile= eval(fileContent);
			totalJson=eval(totalJson);
			totalJson[totalJson.length]=jsonFile[0];
			//alert(totalJson);
			console.log("拖拽--初始化之后的json:\n"+JSON.stringify(totalJson));
		}
		//这个是拖放控件的时候
		/*function initElement(id,value,obj){
			//alert(id);
			var strValue=value+"";
			   var realValue=getCellType(strValue).split(",")[0];
			   var compType=getCellType(strValue).split(",")[1];
			  // alert(realValue+" "+compType);
			   var fileContent;
			   if(compType=="2"){
				   fileContent='[{"id": "'+id+'","realId":"'+realId+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'"}]';
			   }
			   if(compType=="1"){
				   //fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'"}]';
				   if(realValue=="Splitter"){
					   fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","expression":"","compType":"'+compType+'"}]';
				   }else if(realValue=="Aggregator"){
					   fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","storePrefix":"","timeout":"","compType":"'+compType+'"}]';
				   }else if(realValue=="Option"){
					   fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","option":"","compType":"'+compType+'"}]';
				   }else{
					   fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'"}]';
				   }
			   }else if(compType=="2"){
				   //12月之前fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'","name":"","interfaceName":""}]';
				   fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'"}]';
			   }else{
				   fileContent= '[{ "id": "'+id+'","type":"vertex","realType":"'+realValue+'","compType":"'+compType+'","property1":"","property2":"","property3":"","property4":"", "property5":"","property6":"","property7":"","property8":"","property9":"","property10":""}]';
			   }
				var jsonFile= eval(fileContent);
				totalJson=eval(totalJson);
				totalJson[totalJson.length]=jsonFile[0];

		}*/
		
		function SplitterSubmit(fileId){
			
			var echoName=document.getElementById("expression"+fileId).value;
		    var index=getElement(fileId);
			totalJson[index].expression=echoName;
			//alert(JSON.stringify(totalJson));
			
			
			showGraph.setEnabled(true);
			showWindow.destroy();
			mxEffects.fadeOut(showBackground, 50, true, 10, 30, true);
		}
		
		
		function changevalue(obj){
			document.getElementById("file2").value=obj.value;
		}
		
		function getFullPath(obj){
			
			if(obj)
			{
			//ie
				if (window.navigator.userAgent.indexOf("MSIE")>=1)
				{
					obj.select();
					return document.selection.createRange().text;
				}
			//firefox
				else if(window.navigator.userAgent.indexOf("Firefox")>=1)
				{
					if(obj.files)
					{
						return obj.files.item(0).getAsDataURL();
					}
					return obj.value;
				}
			return obj.value;
			
		}
		} 

			
		 // 创建右键下拉菜单
		function createPopupMenu(editor,graph, menu, cell, evt)  
        {  
            if (cell != null)  
            {  

            	//console.log(cell.getId());
            	var jsonIndex = getElement(cell.getId());
            	menu.addItem('删除', null, function()  //可以加图片
                {  
                    //mxUtils.alert('删除');   
            		totalJson.splice(jsonIndex,1);
                    editor.execute('delete');
                    //mxUtils.alert('删除');  
                }); 
//                menu.addItem('复制', null, function()  //可以加图片
//                {  
//                	
//                	editor.execute('copy');
//                	console.log(cell.getId());
//                    //mxUtils.alert('复制');  
//                });
//                menu.addItem('粘贴', null, function()  //可以加图片
//                {  
//                	editor.execute('paste');
//                	console.log(cell.getId());
//                    //mxUtils.alert('粘贴');  
//                }); 
//                menu.addItem('剪切', null, function()  //可以加图片
//                {  
//                    editor.execute('cut');
//                    //mxUtils.alert('剪切');  
//                }); 
                menu.addSeparator();
                 menu.addItem('属性', null, function()  //可以加图片
                {  
                    //editor.execute('cut');
                    var content = document.createElement('div');
                    //alert(this);
					var str=graph.convertValueToString(cell);
					//alert(str);
					createElements(content,str,cell.getId());					
					showWindow=	showModalWindow(graph, '属性', content, 600, 403);
                }); 
            }  
            else  
            {  
            	/*
                menu.addItem('No-Cell Item', 'editors/images/image.gif', function()  
                {  
                    mxUtils.alert('MenuItem2');  
                });
				*/  
            }   
        };  
		/**;
			btnArray[]={delete,cut,copy,paste,SendJava,sumit,deploy,start,getLog};
		*/
        //顶部的四个按钮
		function addToolbarButton(editor, toolbar, action, label, image,cla, isTransparent)
		{
			var button = document.createElement('button');
			button.className=cla;
//			if(cla=="btn btn-danger"){
//				button.disabled=true;
//			}
			button.style.fontSize = '10';
			if (image != null)
			{
				var img = document.createElement('img');
				img.setAttribute('src', image);
				img.style.width = '16px';
				img.style.height = '16px';
				img.style.verticalAlign = 'middle';
				img.style.marginRight = '2px';
				button.appendChild(img);
			}
	
			if (isTransparent)
			{
				button.style.background = 'transparent';
				button.style.color = '#FFFFFF';
				button.style.border = 'none';
			}
			mxEvent.addListener(button, 'click', function(evt)
			{
				editor.execute(action);
			});
			mxUtils.write(button, label);
			toolbar.appendChild(button);
			
		};
		//使按钮不可用
		function addToolbarButton_click(editor, toolbar, action, label, image,cla, isTransparent)
		{
			var button = document.createElement('button');
			button.className=cla;
			//if(cla=="btn btn-danger"){
				button.disabled=true;
			//}
			button.style.fontSize = '10';
			if (image != null)
			{
				var img = document.createElement('img');
				img.setAttribute('src', image);
				img.style.width = '16px';
				img.style.height = '16px';
				img.style.verticalAlign = 'middle';
				img.style.marginRight = '2px';
				button.appendChild(img);
			}
	
			if (isTransparent)
			{
				button.style.background = 'transparent';
				button.style.color = '#FFFFFF';
				button.style.border = 'none';
			}
			mxEvent.addListener(button, 'click', function(evt)
			{
				editor.execute(action);
			});
			mxUtils.write(button, label);
			toolbar.appendChild(button);
			
		};

		//原始的弹框
		function showModalWindow(graph, title, content, width, height,type)
		{
			var background = document.createElement('div');
			background.style.position = 'absolute';
			background.style.left = '0px';
			background.style.top = '0px';
			background.style.right = '0px';
			background.style.bottom = '0px';
			background.style.background = 'black';
			mxUtils.setOpacity(background, 50);
			document.body.appendChild(background);
			showBackground=background;
			if (mxClient.IS_IE)
			{
				new mxDivResizer(background);
			}
			
			var x = Math.max(0, document.body.scrollWidth/2-width/3);
	//		var y = Math.max(35, (document.body.scrollHeight ||
		//				document.documentElement.scrollHeight)/2-height*2/3);
			var y = 110;
			var wnd = new mxWindow(title, content, x, y, width, false, true,null,null,null,type);
			wnd.setClosable(true);
			
			// Fades the background out after after the window has been closed
			wnd.addListener(mxEvent.DESTROY, function(evt)
			{
				graph.setEnabled(true);
				mxEffects.fadeOut(background, 50, true, 
					10, 30, true);
			});
			
			graph.setEnabled(false);
			graph.tooltipHandler.hide();
			wnd.setVisible(true);
			return wnd;
		};
		
		

		//右侧图标
		function addSidebarIcon(graph, sidebar, label, image,realImg,drag_length,drag_width,type,inter,slot,deviceUrl)
		{
			//这里进来应该先判断类型吧
			// Function that is executed when the image is dropped on
			// the graph. The cell argument points to the cell under
			// the mousepointer if there is one.
			var img = document.createElement('img');
			var compType = getCellType(label).split(",")[0];
			//alert("label:"+getCellType(label));
			img.setAttribute('src', image);
			img.style.width = '48px';
			img.style.height = '48px';
			img.title = 'This is a '+compType+' component';
			//添加li、ul、a
			var liElement = creat_li_sidebar(type);
			//alert("type____"+getCellTypeFromImage(image));
			var pElement = creat_p_sidebar(compType);
			liElement.appendChild(img);
			liElement.appendChild(pElement);
			
			var dragElt = document.createElement('div');
			dragElt.style.border = 'dashed black 1px';
			dragElt.style.width = drag_length+'px';
			dragElt.style.height = drag_width+'px';
			
			var funct = function(graph, evt, cell, x, y)
			{
				var parent = graph.getDefaultParent();
				var model = graph.getModel();
				
				var v1 = null;
				
				model.beginUpdate();
				try
				{
					v1 = graph.insertVertex(parent, null, label, x, y, drag_length, drag_width);
					//alert("  x:"+x+"   y:"+y);
					if(inter != "undefined"){//因为如果是线缆的话，inter和slot得到的是undefined
						initElement(v1.id,v1.value,v1,realImg,inter,slot,x,y,deviceUrl);
					 }
					v1.setConnectable(true);
					// Presets the collapsed size
					v1.geometry.alternateBounds = new mxRectangle(0, 0, 120, 40);
					/*var port = graph.insertVertex(v1, null, 'Input', 0, 0.5, 16, 16,
							'port;image=editors/images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
						port.geometry.offset = new mxPoint(-6, -4);
					var port = graph.insertVertex(v1, null, 'Output', 1, 0.5, 16, 16,
							'port;image=editors/images/overlays/pencil.png;spacingLeft=18', true);
						port.geometry.offset = new mxPoint(-8, -4);*/
							//下面测试port的各种属性 
						   // alert(port.getId()+" portId  ");
							//alert(port.getStyle()+"  portStyle");
							//alert(port.getParent().getId()+"  parentId");
							//alert(port.getValue()+" value");
							//alert(port.getChildCount()+" childCount");
							//alert(port.isVertex()+" vertext");
							//alert(port.isConnectable()+" portIsConnectable");
							
						//	var port = graph.insertVertex(v1, null, 'Error', 1, 0.25, 16, 16,
						//			'port;image=editors/images/overlays/error.png;spacingLeft=18', true);
						//	port.geometry.offset = new mxPoint(-8, -8);
				}
				finally
				{
					model.endUpdate();
				}
				
				graph.setSelectionCell(v1);
				//n_processor();
			};			  		
			if(type==2){
				// Creates the image which is used as the drag icon (preview)
				var ds = mxUtils.makeDraggable(img, graph, funct,dragElt, 0, 0, true, true);
				ds.setGuidesEnabled(true);
			}
			else if(type==3){
				//var lineId=getCellType(label).split(",")[2];
				img.setAttribute("linecolor",realImg);
				img.setAttribute("lineid",inter);
				img.onclick=function(event){
					color=this.getAttribute("linecolor");
					//id=this.getAttribute("lineid");
					//alert(id);
					$("img").removeClass("active");
					$(this).addClass("active");
					getLineStyle(graph,color);
			};	
		}
		}
		//右侧折叠框
		function creat_p_sidebar(str){
			
			var pElement = document.createElement("span");
			pElement.innerHTML = str;

			return pElement;
		}
		
		//右侧折叠框
		function creat_li_sidebar(num){
			//alert("num"+num);
			var liElement = document.createElement("li");
			var aElement = document.createElement("a");
			aElement.setAttribute("href", "#");
			aElement.style="font-family:  'Microsoft YaHei';font-size:16px; ";
			liElement.appendChild(aElement);
			var ulElement = $(".modelType"+num).get(0);
			//console.log(ulElement);
			//console.log(ulElement);
			ulElement.appendChild(liElement);
			return aElement;
		}
	   
	   //点保存时检查json是否有属性值没填
	   function checkSubmitJson(json){
		   $.post("../servlet/getProtocolListServlet",{},function(text){
			   var tag="true";
			   for(var i=0;i<json.length;i++){
				   if(json[i].compType=="2"){
//					   if(json[i].name==""){
//						   alert("请填写"+json[i].realType+"的名称");
//						   tag="false";
//					   }else if(json[i].interfaceName==""){
//						   alert("请选择"+json[i].realType+"的接口");
//						   tag="false";
//					   }
				   }else if(json[i].compType=="3"){
					   //alert(json[i].realType);
					   var propertyLength = text[json[i].realType].length;
					   if(json[i]["property"+propertyLength]==""){
						   alert("请填写"+json[i].realType+"的属性");
						   tag="false";
					   } 
				   }
			   }
			   if(tag=="true"){
				   for (var key in graph.getModel().cells){   
					     // alert("123");
						  var tmp = graph.getModel().getCell(key);
						  if(tmp.isEdge()){
						  //不知道为什么 target指向vertex 而不是inputPort 所以+1 确保指向inputPort
					            var target=parseInt(tmp.target.getId())+1;
								var edgeContent= '[{ "id": "'+tmp.getId()+'","type":"edge","sourceId": "'+tmp.source.getId()+'", "targetId":"'+target+'"}]';
								submitJson=eval(submitJson);
								edgeContent=eval(edgeContent);
								submitJson[submitJson.length]=edgeContent[0];
						  }else if(tmp.getValue()=="Input"||tmp.getValue()=="Output"){
								var portContent= '[{ "id": "'+tmp.getId()+'","type":"'+tmp.getValue()+'","parentId": "'+tmp.getParent().getId()+'" }]';
								portContent=eval(portContent);
								submitJson=eval(submitJson);
								submitJson[submitJson.length]=portContent[0];
						  }  else {
							if(key>1){
	                         var index=getElement(tmp.getId());
							   submitJson=eval(submitJson);
							   submitJson[submitJson.length]=totalJson[index];
							}
						  }
						  
			            }
			      	    //alert(JSON.stringify(submitJson));
			      		console.log(JSON.stringify(submitJson));
			      		$(".page2").dialog("open");
			   }
		   });
	   }
		
	   //已有工程的可是化
		function funct1(graph, evt, cell,taskId,stuNum){
			//var parameter = getUserName(window.location.search);
			//console.log(parameter);
			$.post("../servlet/getTaskServlet",{taskId:taskId,stuNum:stuNum},function(text){
				console.log(text);
				var parent = graph.getDefaultParent();
				var model = graph.getModel();
			    //var layout = new mxHierarchicalLayout(graph);
			    //var organic = new mxFastOrganicLayout(graph);
				model.beginUpdate();
			      try
				{
			    	var vertexs = new Object(30);
			    	for(var i=0;i<text.length;i++){
			    		if(text[i].type=="vertex"){
//			    			 var imgObj = new Image(); //新建一个图片对象
//			    			 imgObj.src = "images/icons48/business/"+text[i].deviceUrl;//将图片的src属性赋值给新建的图片对象的src
//			    			 console.log("  width:"+imgObj.width+"  height:"+imgObj.height);
			    			var vertexsId = parseInt(text[i].id); 
			    			vertexs[vertexsId] =graph.insertVertex(parent, null, '<h1 style="margin:0px;font-size:1em;display:none;">'+text[i].realType+','+text[i].compType+','+text[i].realId+'</h1>'+
									'<img src="images/icons48/business/'+text[i].deviceUrl+'" style="width:75;height:75;max-width:none;">',parseInt(text[i].location_x), parseInt(text[i].location_y), 75, 75); 
			    			initElementVertex(vertexs[vertexsId].id,text[i]);
			    		}
			    		
			    	}
			    	style=graph.getStylesheet().getDefaultEdgeStyle();
			    	delete style['endArrow'];
			    	var edges = new Object(40);
			    	//graph.addEdge = null;
			    	for(var i=0;i<text.length;i++){
			    		if(text[i].type=="edge"){
			    			var sourceId = parseInt(text[i].sourceId);
			    			var targetId = parseInt(text[i].targetId);
			    			edges[i] =graph.insertEdge(parent, null, '', vertexs[sourceId], vertexs[targetId],"strokeWidth=5;labelBackgroundColor=#FFFFFF;strokeColor="+text[i].lineStyle+";");
			    			console.log("   edges[i].id:"+edges[i].id);
			    			initElementEdge(edges[i].id,text[i],vertexs[sourceId].id,vertexs[targetId].id);
			    		}
			    		
			    	}
			    	
//			    	var obj1 = graph.insertVertex(parent, null, '<h1 style="margin:0px;font-size:1em;display:none;"></h1>'+
//							'<img src="images/icons48/business/Start.png" style="width:100;height:50;max-width:none;">',100, 100, 75, 75); 
//			    	var obj2 = graph.insertVertex(parent, null, '<h1 style="margin:0px;font-size:1em;display:none;"></h1>'+
//							'<img src="images/icons48/business/Start.png" style="width:100;height:50;max-width:none;">',200, 300, 75, 75); 
//			    	obje=graph.insertEdge(parent, null, '', obj1, obj2);
			    	//        		   var obj = new Object(40);
//        		   var objd = new Object(80);
//        		   var obje=new Object(30);
//        		   var inport = new Array(40);
//        		   var outport = new Array(40);
//        		   for(var i=0;i<40;i++){
//        			   inport[i]=1; 
//        			   outport[i]=1; 
//        		   }
//			       var num=str.length;
//			       var tag = 0;
//			       console.log(str);
//			       if(num<3){
//			       		num=0;
//			       }
//			       //图片不对的原因跟图片大小有关，width和height的值必须跟图片对应起来
//			       var imgObj = new Image(); //新建一个图片对象
//			       for(var i=0;i<num;i++){
//					   //var id=parseInt(json[i].id)+1;
//			    	   //console.log(str[i].pictureURl);
//			    	   if(str[i].type=="vertex"){
//			    		   
//				    	   imgObj.src = "images/icons48/business/"+str[i].pictureURl;//将图片的src属性赋值给新建的图片对象的src
//				           var id = parseInt(str[i].id);
//				          
//				           var s_hetght = 100;
//				           var d_height = 75;
//				           
//				           if(str[i].compType=="2"){
//				        	   var portSize = parseInt(str[i].portSize);
//				        	   if(portSize>2){
//				        		   s_hetght = 50*portSize;
//					        	   d_height =36*portSize;
//				        	   }
//				        	   
//				           }
//				           //alert("_x"+str[i]._x);
//						   obj[id]= graph.insertVertex(parent, null, '<h1 style="margin:0px;font-size:1em;display:none;">'+str[i].realType+","+str[i].compType+'</h1>'+
//							'<img src="images/icons48/business/'+str[i].pictureURl+'" style="width:100;height:'+s_hetght+';max-width:none;">',str[i]._x, str[i]._y, 75, d_height);
//							tag++;
//						   initElementStart(obj[id].id, str[i],obj[id]);
//						 
//					        obj[id].setConnectable(false);
//						    obj[id].geometry.alternateBounds = new mxRectangle(0, 0, 75, 25);
//			    	   }
//			       }
//			       
//			       for(var k=0;k<num;k++){
//			    	   //alert(str[k].type);
//			    	   if(str[k].type=="Input"){
//			    		   var id = parseInt(str[k].id);
//			    		   var parentId = parseInt(str[k].parentId);
//			    		  
//			    		   if(str[k].portName!=""){
//			    			   var size = getPortSize(str,str[k].parentId);
//			    			   //alert(size);
//			    			   var tag_num = (1/(size+1)).toFixed(2);
//			    			  
//			    			   objd[id] = graph.insertVertex(obj[parentId], null, 'Input_'+str[k].portName, 0, tag_num*inport[parentId], 16, 16,
//										'port;image=editors/images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
//			    			   inport[parentId]++;
//			    		   }else{
//			    			   objd[id] = graph.insertVertex(obj[parentId], null, 'Input', 0, 0.5, 16, 16,
//										'port;image=editors/images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
//			    		   }
//			    		  
//							objd[id].geometry.offset = new mxPoint(-6, -4);
//			    	   }else if(str[k].type=="Output"){
//			    		   var id = parseInt(str[k].id);
//			    		   var parentId = parseInt(str[k].parentId);
//			    		  
//			    		   if(str[k].portName!=""){
//			    			   var size = getPortSize(str,str[k].parentId);
//			    			   var tag_num = (1/(size+1)).toFixed(2);
//			    			   objd[id] = graph.insertVertex(obj[parentId], null, 'Output_'+str[k].portName, 1, tag_num*outport[parentId], 16, 16,
//										'port;image=editors/images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
//			    			   outport[parentId]++;
//			    		   }else{
//			    			   objd[id] = graph.insertVertex(obj[parentId], null, 'Output', 1, 0.5, 16, 16,
//										'port;image=editors/images/overlays/check.png;align=right;imageAlign=right;spacingRight=18', true);
//			    		   }
//			    		  
//							objd[id].geometry.offset = new mxPoint(-6, -4);
//			    	   }else if(str[k].type=="edge"){
//			    		   //console.log(str[k].sourceId);
//			    		   var sourceId = parseInt(str[k].sourceId);
//			    		   var targetId = parseInt(str[k].targetId);
//			    		   var edgeId = parseInt(str[k].id);
//			    		   obje[edgeId]=graph.insertEdge(parent, null, '', objd[sourceId], objd[targetId]);
//			    	   } else if(str[k].type=="vertex"){
//			    		   
//			    	   }else{
//			    		   alert("逆向生成error");
//			    	   }
//			       }
			         
				}
				finally
				{
					// Updates the display
					//layout.execute(parent);
					graph.getModel().endUpdate();
					//添加连线时，触发事件
					graph.addEdge = function(edge, parent, source, target, index){ 
						var sourceId1 = getElement(source.getId());
						var targetId1 = getElement(target.getId());
						var sourborderId="";
						var tarborderId="";
						var sourceId=totalJson[sourceId1].realId;
						var targetId=totalJson[targetId1].realId;
						var lineId=$(".modelType3>li>a>.active").attr("lineid");
						var lineColor=$(".modelType3>li>a>.active").attr("linecolor");
						var linePageId = getTheNextId();
						//alert(lineColor);
						for(var len in totalJson[sourceId1].slot){
							if(totalJson[sourceId1].slot[len].slotState=="true"){
								sourborderId=tarborderId+totalJson[sourceId1].slot[len].boardInfo.boardId+",";
							}
						}
						//alert("hello");
						for(var len in totalJson[targetId1].slot){
							if(totalJson[targetId1].slot[len].slotState=="true"){
								tarborderId=tarborderId+totalJson[targetId1].slot[len].boardInfo.boardId+",";
							}
						}
						console.log("source:"+sourborderId+"target:"+tarborderId+"lineId:"+lineId+"sourceId:"+sourceId+"targetId:"+targetId);
						var arge=arguments;
						var that=this;
						//var arr=[];
						$.ajax({
							type:"post",
							url:"../servlet/ConnectorToInter",
							data:{
								lineId:lineId,
								sourceId:sourceId,
								targetId:targetId,
								sourborderId:sourborderId,
								tarborderId:tarborderId
							},
							success:function(resp){
								//console.log(resp);
								//console.log(totalJson);
								//console.log(resp);
								//console.log("totalJson:==="+totalJson+"lineId:  "+lineId);
								var stringlineJson='{"id":"'+linePageId+'","lineId":"'+lineId+'","lineStyle":"'+lineColor+'","sourceId":"'+source.getId()+'","targetId":"'+target.getId()+'","type":"edge","outPortJson":"","inPortJson":"","interSourOption":"","interTarOption":"","cableAOption":"","cableBOption":""}';
								var jsonFile= JSON.parse(stringlineJson);//此处用parse更为安全，将JSON串转化为JSON对象
								jsonFile.inPortJson = resp.inPortJson;
								jsonFile.outPortJson = resp.outPortJson;
								jsonFile.interSourOption = resp.interSourOption;
								jsonFile.interTarOption = resp.interTarOption;
								jsonFile.cableAOption = resp.cableAOption;
								jsonFile.cableBOption = resp.cableBOption;
								//arr.push(stringlineJson);
								//arr.join(",");
								//configContent='{"line":['+arr+']}';
								//var jsonFile= JSON.parse(stringlineJson);//此处用parse更为安全，将JSON串转化为JSON对象
								totalJson=eval(totalJson);
								totalJson.push(jsonFile);
								console.log(totalJson);
							}
						});
//							var stringlineJson='{"id":"'+linePageId+'","lineId":"'+lineId+'","lineStyle":"'+lineColor+'","sourceId":"'+sourceId+'","targetId":"'+targetId+'","type":"edge","outPortJson":"","inPortJson":""}';
//								//stringlineJson=JSON.parse(stringlineJson);
//								//arr.push(stringlineJson);
//								//arr.join(",");
//								//configContent='{"line":['+arr+']}';
//							var jsonFile= JSON.parse(stringlineJson);//此处用parse更为安全，将JSON串转化为JSON对象
//							totalJson=eval(totalJson);
//							totalJson.push(jsonFile);
							//console.log("添加连线--"+JSON.stringify(totalJson));
							mxGraph.prototype.addEdge.apply(that, arge);
						//}else{
//							mxGraph.prototype.addEdge.apply(this, arguments);
//						}
//						value = mxUtils.createXmlDocument().createElement('transicion');        
//						value.setAttribute('type', 'hello');   
//						value.setAttribute('label', 'Tarea');   
//						edge.value = value;
						
//						if (isEdge(edge)){
//							   remove(getTerminal(edge, true));
//							   remove(getTerminal(edge, false));
//							}
						
						
						// "supercall"
						};
				}
			   });
				
				
				//update_g_style(num);

		}
		//得到业务组件有几个端口
		function getPortSize(str,parentId){
			var size = 0;
			//alert(str.length);
			for(var i=0;i<str.length;i++){
				if(str[i].id==parentId)
				size=str[i].portSize;
			}
			return size;
		}
		
		function configureStylesheet(graph)
		{
			var style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
			style[mxConstants.STYLE_FILLCOLOR] = '#8CCDF5';
			style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '80';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 0;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
			graph.getStylesheet().putDefaultVertexStyle(style);

			// NOTE: Alternative vertex style for non-HTML labels should be as
			// follows. This repaces the above style for HTML labels.
			/*var style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_SPACING_TOP] = '56';
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#7d85df';
			style[mxConstants.STYLE_STROKECOLOR] = '#5d65df';
			style[mxConstants.STYLE_FILLCOLOR] = '#adc5ff';
			style[mxConstants.STYLE_FONTCOLOR] = '#1d258f';
			style[mxConstants.STYLE_FONTFAMILY] = 'Verdana';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = '1';
			style[mxConstants.STYLE_ROUNDED] = '1';
			style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
			style[mxConstants.STYLE_OPACITY] = '80';
			graph.getStylesheet().putDefaultVertexStyle(style);*/

			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_FILLCOLOR] = '#FF9103';
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#F8C48B';
			style[mxConstants.STYLE_STROKECOLOR] = '#E86A00';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_OPACITY] = '80';
			style[mxConstants.STYLE_STARTSIZE] = '30';
			style[mxConstants.STYLE_FONTSIZE] = '16';
			style[mxConstants.STYLE_FONTSTYLE] = 1;
			graph.getStylesheet().putCellStyle('group', style);
			
			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
			style[mxConstants.STYLE_FONTCOLOR] = '#774400';
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_PERIMETER_SPACING] = '6';
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
			//style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_FONTSIZE] = '10';
			style[mxConstants.STYLE_FONTSTYLE] = 2;
			style[mxConstants.STYLE_IMAGE_WIDTH] = '16';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '16';
			graph.getStylesheet().putCellStyle('port', style);
			
			//注释掉原有线缆样式
//			style = graph.getStylesheet().getDefaultEdgeStyle();
//			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
//			style[mxConstants.STYLE_STROKEWIDTH] = '2';
//			style[mxConstants.STYLE_ROUNDED] = true;
//			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.EntityRelation;
		};
