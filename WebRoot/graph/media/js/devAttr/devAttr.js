var cTP;//全局变量
var count=0;//标记接口的个数
var devJson='[]';   //设备
var interfaceJson='[]'; //设备的接口
var devId;
var firstTabInfo;//参数配置第一个面板的信息
var boardList;//调用getAllBoard.java获取的data信息,全局变量，当板卡被拖上去后，它的接口名字相应的做了修改
var newPortInfo;//添加了参数以后的接口信息
//var newSlotInfo;//添加了参数以后的插槽信息
//总的页面的展示
function devAttrWindow(container, width, height, realImg, interInfo, slotInfo){
	//alert("devAttrWindow");
	newPortInfo=interInfo;
	//newSlotInfo=slotInfo;
	if(!container || !width || !height){return ;}

	container.style.width = width;
	container.style.height = height;
	
	this.height = parseInt(container.style.height);
	
	this.div = document.createElement('div');
	container.appendChild(this.div);
	this.div.id='mxWindowDiv';
	this.div.style.width = '98%';
	this.div.style.height = '99%';
	this.div.style.margin = '1% 1% 0 1%';
	this.div.style.backgroundColor = 'white';

// 	$.get('http://localhost:8124/head1.txt').success(function(content){ 
// // content就为文件data.txt的文本内容了,注意txt文件的编码需要与html文件的编码一致，最好保存成utf-8 
//            alert(content);
//          $("#mxWindowDiv").append($(content));
//       }); 
	//$("#mxWindowDiv").load("config/head1.txt");
	//$("#mxWindowDiv").load("config/head1.txt");
	


	//标签头
	this.header = document.createElement('div');
	this.div.appendChild(this.header);
	this.header.style.width = '100%';
	this.header.style.height = '120px';
	this.header.className = 'devAttrHeader';
	this.header.id = 'devAttrHeader';

	//$("#devAttrHeader").load("config/test.txt");
	//标签头-设备型号
	 var devVer = document.createElement('div');
	 this.header.appendChild(devVer);
	 devVer.style.height = '16px';
	 devVer.style.width = '60px';
	 devVer.style.marginLeft = '10px';
	 devVer.style.marginTop = '5px';
	 devVer.style.marginBottom='5px';
	 devVer.style.fontSize='14px';
	 devVer.innerHTML = realImg.split(".")[0];
	
	// //设备图
	 var dev = document.createElement('div');
	 this.header.appendChild(dev);
	 //标签头-图片
	 var img = document.createElement('img');
	 dev.appendChild(img);
	 img.src = './media/image/'+realImg;
	 img.style.width = '700px';
	 img.style.marginLeft = '10px';
	 img.style.marginBottom = '5px';
	 //img.style.z-index ='0';
	 img.style.position='absolute';
	 //img.onclick="haha('GETMOUSEPOSINPIC',this)";
	 //img.setAttribute("onclick","haha('GETMOUSEPOSINPIC',this)");
	img.setAttribute("usemap","#"+realImg.split(".")[0]+"Map");
	 //添加插槽
	 this.viewDev(dev, slotInfo);
	
	 //添加接口
	 var map=document.createElement('map');
	 map.setAttribute("name","#"+realImg.split(".")[0]+"Map");
	 map.id="#"+realImg.split(".")[0]+"Map";
	 dev.appendChild(map);
	 if(interInfo.length==0){
		 firstTabInfo="";
	 }else{
		 firstTabInfo=interInfo[0].parameters;
		 for(var i=0;i<interInfo.length;i++){
			 var area=document.createElement('area');
			 map.appendChild(area);
			 area.setAttribute('shape','rect');//矩形
			 area.setAttribute('coords',interInfo[i].interCoords);
			// area.href='#'+interSlot[i].slotName;
			 area.setAttribute('data-toggle','tab');
			 var paramInfo=JSON.stringify(interInfo[i].parameters);
			 area.setAttribute('onclick','areaClick("'+interInfo[i].interName+'","devPort",'+paramInfo+')');
		 }
	 }

	// //标签体
	this.body = document.createElement('div');
	this.div.appendChild(this.body);
	this.body.style.width = '100%';
	this.body.style.height = (this.height - 40 - this.height * 0.01) + 'px';
	this.body.className = 'tab-content';
	this.body.id = 'devAttrBody';
	this.body.style.border = 'thin solid #aaa';
	//this.viewDev();

}

devAttrWindow.prototype.constructor = devAttrWindow;

//弹出窗口内容的根div节点
devAttrWindow.prototype.div = null;

// 标签页首部
devAttrWindow.prototype.header = null;

// 标签页内容
devAttrWindow.prototype.body = null;

// 弹出窗容器的高度
devAttrWindow.prototype.height = null;

// 配置页每项参数提示文字的行高
devAttrWindow.prototype.LineHeight = 40;
 
devAttrWindow.prototype.viewDev = function(container, slot){
	//alert("viewDev");
	//添加覆盖div
	var $dev = $('<div id="droplist" style="width: 700px;position:absolute;margin-top: 6px;z-index:0"></div>');
	for(var i=0;i<slot.length;i++){
		
		var $div=$('<div  name="'+slot[i].slotName+'" class="ui-sortable ui-droppable slot'+slot[i].slotId+'" style="height: 32px; background-color: black;border: 1px solid rgb(17, 17, 17);display:none;"></div>');
		$div.attr("coords",slot[i].slotCoords);
		var coordsArr=slot[i].slotCoords.split(",");
		$div.css("margin-left",coordsArr[0]+"px");
		if(parseInt(coordsArr[0]) > 300){
			$div.css("margin-top","-32px");
		}
		var width=parseInt(coordsArr[2])-parseInt(coordsArr[0]);
		$div.css("width",width+"px");
		if(width < 200){
			$div.css("display","block");
		}else if(width > 300){
			$div.css("display","none");
			//$div.css("margin-top","-32px");
		}
		$dev.append($div);
	}
	$(container).append($dev);
	
	//初始化状态为true的插槽
	/*for(var i=0;i<slot.length;i++){
		if(slot[i].slotState == "true"){
			//alert(slot[i].slotState);
			//alert(slot[i].slotId);
			//var $li=$('<li style="list-style:none;height:38px;"><div><img src="media/image/2FE.png" style="height:32px;width:180px;/></div></li>');
			var $li=$("<li style='list-style:none;height:38px;'></li>");
			var $div = $("<div></div>");
			var width=$(".slot"+slot[i].slotId).width();
			alert(width);
			var $img = $("<img src='media/image/"+slot[i].boardInfo.boardUrl+"' name='"+slot[i].boardInfo.boardId+"' style='height:32px;width:"+width+";' usemap='"+slot[i].boardInfo.boardUrl.split(".")[0]+"'/>");
			$div.append($img);
			$li.append($div);
			$("#"+slot[i].slotId).append($li); //如果设备插槽状态为true，则把对应板卡加进去
			//给板卡添加可点击的接口
			var map="<map id='"+slot[i].useMapId+"' name='"+slot[i].useMapId+"'></map>";
			//$("#"+slot[i].slotId).append(map);
			$img.append(map);
			for(var j=0;j<slot[i].boardInfo.bodInter.length;j++){
				var coor=slot[i].boardInfo.bodInter[j].coords.split(",");
				coor[0]=parseInt(coor[0])+parseInt($("#"+slot[i].slotId).attr("coords").split(",")[0]);
				//coor[1]=parseInt(coor[1])+parseInt($("#"+slot[i].slotId).css("margin-top"));
				coor[2]=parseInt(coor[2])+parseInt($("#"+slot[i].slotId).attr("coords").split(",")[0]);
				var coordinate=coor.join("_");
				//alert(coordinate);
				var area="<area name='"+slot[i].boardInfo.bodInter[j].interName+"' id='"+slot[i].boardInfo.bodInter[j].interId+"'  coords='"+slot[i].boardInfo.bodInter[j].coords+"' shape='rect' onclick='dropAreaClick("+'"'+slot[i].boardInfo.bodInter[j].interId+"_"+coordinate+'"'+","+'"boardPort"'+")'></area>";
				//alert(area);
				$("#"+slot[i].slotId+" map").append(area);
			}
		}
	}*/
	$dev.children().sortable({
	    revert: true
   });
	$dev.children().droppable({
	    activate:function(event,ui){
	    	$(this).css("background-color","orange");
		},
		deactivate:function(event,ui){
			$(this).css("background-color","black");
		},
		drop: function( event, ui ) {
			$(this).find("li").fadeOut(function(){
					$(this).find("li").remove();	
			});	
			$(this).find("map").remove();
			$(this).children().draggable({ 
				  cursor: "move",
			      cursorAt: { top: -12, left: -20 },
			      helper: function( event ) {
			        //return $( "<div class='ui-widget-header'>不要拖我！！！</div>" );
			    	  return $( "<div class='ui-widget-header'></div>" );
			      }
		    });
			
			//图片拖上来后初始化插槽
			initSlot($(this));
			
			//图片拖上来以后点击接口,第二个参数为接口所在的插槽的id，用来区分相同的接口
			dropAddMapArea($(this).find("img").get(0));
			
			
		}
    });
	$dev.children().dblclick(function(){//双击移除当前板卡
	   //移除之前先删掉该板卡对应的接口tab
	   var len=$(this).find("area").length;
	   for(var i=0;i<len;i++){
		   var name=$(this).find("area")[i].attributes["name"].value;
		   var hrefName=name.split("/").join("-"); 
		   //alert( $("[href='#"+hrefName+"']").text());
		   $("#devAttrBodyNav").children().each(function(){
			   if($(this).find("a").attr("href") == '#'+hrefName){
				   $(this).remove();//把对应的tab标签删掉
				   $("#"+hrefName).remove();//把对应的tab面板删掉
			   }
		   });
		  // $("[href='#"+hrefName+"']").parent().remove();
	   }
	   $(this).find("li").remove();  
	   $(this).find("map").remove(); 
	  
	   $("#devAttrNav li:eq(0)").removeClass("active");
	   $("#devAttrNav li:eq(1)").addClass("active");
	   $("#devConfig").removeClass("active in");
	   $("#devView").addClass("active in");
	   //双击将插槽状态置为false，boardInfo置为空
	   var slotId=$(this).attr("id");
	   var slotCoords=$(this).attr("coords");
	   for(var i=0;i<totalJson.length;i++){//遍历totalJson
			if(totalJson[i].realId == devId ){//找到对应的设备
				for(var j=0;j<totalJson[i].slot.length;j++){
					if(totalJson[i].slot[j].slotId == slotId && totalJson[i].slot[j].slotCoords == slotCoords){//找到对应的插槽
						totalJson[i].slot[j].slotState="false";
						totalJson[i].slot[j].boardInfo="";
					}
				}				
			}
		}
	   //双击完后，图中覆盖的div恢复到原始状态，即小的为block，大的为none
	   $("#droplist>div").each(function(i){
		   if($(this).css("width") == "180px"){
			   $(this).css("display","block");
			   $(this).css("background-color","black");
		   }else  if($(this).css("width") == "360px"){
			   $(this).css("display","none");
			   $(this).css("background-color","black");   
		   }		
	   });
   });
};

function devAttrBody(container, width, height, devRealId){
	devId=devRealId;
	if(!container || !width || !height){return ;}
	container.style.width = width;
	container.style.height = height;
	this.height = parseInt(container.style.height);
	
	this.div = document.createElement('div');
	container.appendChild(this.div);
	this.div.style.width = '98%';
	this.div.style.height = '99%';
	this.div.style.margin = '1% 1% 0 1%';
	this.div.style.backgroundColor = 'white';

	//标签头
	this.header = document.createElement('div');
	this.div.appendChild(this.header);
	this.header.style.width = '100%';
	this.header.style.height = '40px';
	this.header.className = 'devAttrBody_header';
		
	var ul = document.createElement('ul');
	this.header.appendChild(ul);
	ul.className = 'nav nav-tabs';
	ul.id = 'devAttrNav';
	ul.style.height = '100%';
	ul.style.fontSize = '13px';
	ul.style.textAlign = 'center';
	ul.style.float='left';
	
	var div=document.createElement('div');
	this.header.appendChild(div);
	div.style.float='left';
	div.style.marginLeft='526px';
	var input=document.createElement('input');
	div.appendChild(input);
	input.type='button';
	input.value='保存';
	input.className='btn btn-primary deleteservice btn-sm';
	input.style.width='60px';
	input.style.height='30px';
	input.setAttribute('onclick','submit()');

	//标签体
	this.body = document.createElement('div');
	this.div.appendChild(this.body);
	this.body.style.width = '100%';
	this.body.style.height = (this.height - 40 - this.height * 0.01) + 'px';
	this.body.className = 'tab-content';
	this.body.id = 'devAttrBody_body';
	this.body.style.border = 'thin solid #aaa';
}
devAttrBody.prototype.constructor = devAttrBody;
devAttrBody.prototype.LineHeight = 40;

devAttrBody.prototype.createTab = function(title, id, active){
	var tab = document.createElement('div');
	this.body.appendChild(tab);
	tab.style.height = '97%';
	tab.style.width = '100%';
	tab.id = id;
	//tab.style.display='none';
	tab.className = active ? "tab-pane fade active in" : "tab-pane fade";
	
	var className = active ? 'class="active"' : '';
	$(this.header).find('ul').append('<li '+ className +'style="width:80px;height:100%;border:1px solid #aaa;border-bottom:none;margin-right:5px;"><a style="height:100%;margin-right:0px;" href="#'+id+'" data-toggle="tab">'+ title +'</a></li>');

	return tab;
};

devAttrBody.prototype.configTab = function(tab){
	var content = document.createElement('div');
	tab.appendChild(content);
	content.style.width = '98%';
	content.style.height = '99%';
	content.style.margin = '1% 1% 1% 1%';
	content.style.border = '0.5px solid #ddd';
	content.style.backgroundColor = '#FAFAFA';
	
	//var cTP=new configTabPane(content,756,500);
	cTP=new configTabPane(content,756,500);
	
	//id里边把坐标也加上算了，好像这样才能唯一确定一个接口
	cTP.infoTab(cTP.createTab('FES_0/0',  true, 72, "devPort"),firstTabInfo, "devPort");
	count++;
};
devAttrBody.prototype.viewTab = function(tab){
	var content = document.createElement('div');
	tab.appendChild(content);
	content.style.width = '98%';
	content.style.height = '99%';
	content.style.margin = '1% 1% 1% 1%';
	
	//板卡搜索部分
	var searchDiv=document.createElement('div');
	content.appendChild(searchDiv);
	searchDiv.style.width = '100%';
	searchDiv.style.height = '8%';
	searchDiv.style.margin = '1% 1% 1% 1%';
	var select=document.createElement('select');
	searchDiv.appendChild(select);
	select.id = 'search-type';
	select.className='input-sm';
	//select.style.height='30px';
	select.style.marginRight='7px';
	select.style.fontSize='14px';
	select.options.add(new Option('请选择搜索类型', ''));
	select.options.add(new Option('全部', 'all'));
	select.options.add(new Option('板卡名称', 'boardName'));
	//select.options.add(new Option('板卡类型', 'boardType'));
	//select.options.add(new Option('板卡插槽', 'slotName'));
	select.options.add(new Option('厂商', 'factoryName'));
	var span=document.createElement('span');
	searchDiv.appendChild(span);
	span.className='filtertype';
	var a=document.createElement('a');
	searchDiv.appendChild(a);
	a.className='btn btn-default';
	a.id='searchservice';
	a.style.marginLeft='20px';
	a.style.height='32px';
	var i=document.createElement('i');
	a.appendChild(i);
	i.className='fa fa-search';
	//点击选择搜索类型
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		if(stype == "boardName"||stype == "factoryName"){
			$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue' style='width:151px'>");
		}
	});
	//板卡视图
	var viewCard = document.createElement('div');
	content.appendChild(viewCard);
	viewCard.style.width = '100%';
	viewCard.style.height = '50%';
	viewCard.style.marginTop = '1%';
	//viewCard.style.border = '0.5px solid #ddd';
	viewCard.style.border = '1px solid #E0E0E0';
	viewCard.style.backgroundColor = '#FAFAFA';
	
	//var cardHeight = parseInt(this.body.style.height) * 0.90 * 0.39 - 20;
	
	//可用板卡
	var card = document.createElement('div');
	viewCard.appendChild(card);
	card.style.width = '63%';
	//card.style.height = cardHeight * 0.98 + 'px';
	card.style.height ='100%';
	card.style.float = 'left';
	card.style.margin = '1% 1% 1% 1%';
	card.style.border = '0.5px solid #111';
	card.style.backgroundColor = '#fff';
	card.style.overflow = 'scroll';
	//this.rmDrop(card, '.filled');
	//card.id = 'card-drop';
	
	//添加板卡
	this.viewCard(card);
	
	//板卡描述
	var cardDes = document.createElement('div');
	viewCard.appendChild(cardDes);
	cardDes.style.width = '34%';
	//cardDes.style.height = cardHeight * 0.98 + 'px';
	cardDes.style.height='100%';
	cardDes.style.float = 'left';
	cardDes.style.border = '0.5px solid #ddd';
	cardDes.style.margin = '1% 1% 1% 0';
	cardDes.style.backgroundColor = '#fff';
	cardDes.style.overflow = 'scroll';
	$(cardDes).attr("id","cardDes");

	var clearDiv = document.createElement('div');
	viewCard.appendChild(clearDiv);
	clearDiv.className = 'clear';
};
devAttrBody.prototype.viewCard = function(container){
	var $ul = $('<ul></ul>');
	$ul.attr("id","draglist");
	//列举所有板卡,得传一个slotId,只列举相对应的，不用都列举
	var slotArr=new Array();
	var count=0;
	//alert($("#droplist").html());一开始为undifined,把businessMain中的showModaiWindow放在了前面
	for(var i=0;i<$("#droplist").children().length;i++){
		if($.inArray($("#droplist").children().eq(i).attr("class").split(" ")[2].split("t")[1],slotArr) == -1){
			slotArr[count]=$("#droplist").children().eq(i).attr("class").split(" ")[2].split("t")[1];
			count++;
		}
	}
	getAll(container,$ul,slotArr);  
	
	$("#searchservice").click(function(){
		var type = $("#search-type").val();
		if(type == "all"){
			getAll(container,$ul,slotArr);
		}else{
			getRemainder(container,$ul,slotArr);
		}
	});
};
/*参数配置body体*/
function configTabPane(container, width, height){
	if(!container || !width || !height){return ;}
	container.style.width = width;
	container.style.height = height;
	this.height = parseInt(container.style.height);
	
	this.div = document.createElement('div');
	container.appendChild(this.div);
	this.div.style.width = '98%';
	this.div.style.height = '99%';
	this.div.style.margin = '1% 1% 0 1%';
	this.div.style.backgroundColor = 'white';

	//标签头
	this.header = document.createElement('div');
	this.div.appendChild(this.header);
	this.header.style.width = '100%';
	this.header.style.height = '40px';
	this.header.className = 'configTab_header';
		
	var ul = document.createElement('ul');
	this.header.appendChild(ul);
	ul.className = 'nav nav-tabs';
	ul.id = 'devAttrBodyNav';
	ul.style.height = '100%';
	ul.style.fontSize = '14px';
	ul.style.textAlign = 'center';

	//标签体
	this.body = document.createElement('div');
	this.div.appendChild(this.body);
	this.body.style.width = '100%';
	this.body.style.height = (this.height - 40 - this.height * 0.01) + 'px';
	this.body.className = 'tab-content';
	this.body.id = 'configTab_body';
	this.body.style.border = 'thin solid #aaa';
}
configTabPane.prototype.constructor = devAttrBody;
configTabPane.prototype.LineHeight = 35;

/*参数配置下tab标签的生成*/
configTabPane.prototype.createTab=function(title, active, wid, cla){
	var tab = document.createElement('div');
	this.body.appendChild(tab);
	tab.style.height = '97%';
	tab.style.width = '100%';
	tab.id = title.split("/").join("-");
	//tab.setAttribute("name",title);
	tab.className = active ? "tab-pane fade active in "+cla : "tab-pane fade "+cla;
	
	var className = active ? 'class="active"' : '';
	//$(this.header).find('ul').append('<li '+ className +'style="width:'+wid+'px;height:100%;border:1px solid #aaa;border-bottom:none;margin-right:5px;"><img src="../src/images/close.gif" class="closeImg" style="width:12px;height:12px;float:right" /><a style="height:100%;margin-right:0px;font-size:5px" href="#'+id+'" data-toggle="tab">'+ title +'</a></li>');
	$(this.header).find('ul').append('<li '+ className +'style="width:'+wid+'px;height:100%;border:1px solid #aaa;border-bottom:none;margin-right:5px;"><img src="../src/images/close.gif" id="close_'+title.split("/").join("-")+'" style="width:10px;height:10px;float:right" /><a style="height:100%;width:60px;font-size:5px" href="#'+title.split("/").join("-")+'" data-toggle="tab">'+ title+'</a></li>');
	$("#close_"+title.split("/").join("-")).attr("onclick","closeClick('"+title+"','"+cla+"')");
	/*$(".closeImg").click(function(){
		$(this).parent().remove();
	});*/
	return tab;
};

/*参数配置下tab面板的展示*/
configTabPane.prototype.infoTab=function(tab, param ,cla){
	var content = document.createElement('div');
	tab.appendChild(content);
	content.style.width = '98%';
	content.style.height = '99%';
	content.style.margin = '1% 1% 1% 1%';
	content.style.border = '0.5px solid #ddd';
	content.style.backgroundColor = '#FAFAFA';
	
	var form = document.createElement('form');
	content.appendChild(form);
	form.id = 'config_form_'+tab.id;
	form.name = 'config_form_'+tab.id;
	form.style.width = '100%';
	form.style.height = '100%';

	var body = document.createElement('div');
	form.appendChild(body);
	body.style.fontSize = '14px';
	//this.configParams(body);
	
	//this.addButton(body);
	//alert(JSON.stringify(param));
	for(var i=0; i<param.length; i++){
		this.configParams(body , param[i] ,tab ,cla);
	}	
};
/*列出配置参数*/
configTabPane.prototype.configParams = function(container, paraData ,tab ,cla){
	var div, select, input;
	var interName=tab.id.split("-").join("/");
	var type=tab.className.split(" ")[tab.className.split(" ").length-1];
	//alert(interName +" "+type);
	//alert(cla);
	var defaultVal;//select或input的默认值
	if(cla == "devPort"){
		for(var i=0;i<totalJson.length;i++){//遍历totalJson
			if(totalJson[i].realId == devId ){
				for(var j=0;j<totalJson[i].inter.length;j++){
					if(totalJson[i].inter[j].interName == interName){
						defaultVal=totalJson[i].inter[j].interConfig[paraData.name];
					}
				}
			}
		}
	}else if(cla == "boardPort"){
		var boardId=$("area[name = '"+interName+"']").parent().parent().attr("name");
		var slotName=$("area[name = '"+interName+"']").parent().parent().attr("slotName");
		for(var i=0;i<totalJson.length;i++){
			if(totalJson[i].realId == devId ){
				for(var j=0;j<totalJson[i].slot.length;j++){
					if(totalJson[i].slot[j].slotName == slotName){
						if(totalJson[i].slot[j].boardInfo.boardId == boardId){
							for(var k=0;k<totalJson[i].slot[j].boardInfo.bodInter.length;k++){
								if(totalJson[i].slot[j].boardInfo.bodInter[k].interName == interName){
									defaultVal=totalJson[i].slot[j].boardInfo.bodInter[k].config[paraData.name];
								}
							}
						}
					}
				}
			}
		}
	}
	//alert(defaultVal);
	if(paraData.type == "select"){
		div = this.createParam(paraData.name+': ');
		container.appendChild(div);
		select = document.createElement('select');
		select.setAttribute("edit","0");
		div.appendChild(select);
		select.name = paraData.name;
		var optionArr= paraData.option.split(",");
		for(var i=0;i<optionArr.length;i++){
			select.options.add(new Option(optionArr[i], optionArr[i]));
		}
		select.value =defaultVal;
		// 绑定点击事件
		select.setAttribute("onchange","selectChange('"+interName+"','"+type+"','"+paraData.name+"')");

	}else if(paraData.type == "input"){
		div = this.createParam(paraData.name+': ');
		container.appendChild(div);
		input = document.createElement('input');
		input.setAttribute("edit","0");
		div.appendChild(input);
		input.type = 'text';
		input.name = paraData.name;
		input.value = defaultVal;
		//tip = this.createTips('(1-4094,可以输入多个值)');
		//div.appendChild(tip);
		
		// 绑定事件,失去焦点
		input.setAttribute("onblur","selectChange('"+interName+"','"+type+"','"+paraData.name+"')");
	}
};
/*configTabPane.prototype.configParams = function(container){
	var div, select, input, tip;

//////////////////////////////////////////////////////////////////////

	*//**
	* 端口状态选择
	* 枚举类型
	* 1. Enable (默认)
	* 2. Disable
	*//*
	div = this.createParam('端口状态：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'portState';
	select.options.add(new Option('Enable', '1'));
	select.options.add(new Option('Disable', '0'));

//////////////////////////////////////////////////////////////////////

	*//**
	* 速率
	* 枚举类型
	* 1. Auto (默认)
	* 2. 100
	* 3. 10
	*//*
	div = this.createParam('速率：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'rate';
	select.options.add(new Option('Auto', 'Auto'));
	select.options.add(new Option('100', '100'));
	select.options.add(new Option('10', '10'));

//////////////////////////////////////////////////////////////////////

	*//**
	* 双工状态
	* 枚举类型
	* 1. Auto (默认)
	* 2. Full
	* 3. Half
	*//*
	div = this.createParam('双工状态：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'duplexState';
	select.options.add(new Option('Auto', 'Auto'));
	select.options.add(new Option('Full', 'Full'));
	select.options.add(new Option('Half', 'Half'));

//////////////////////////////////////////////////////////////////////

	*//**
	* 连接类型
	* 枚举类型
	* 1. Access (默认)
	* 2. Trunk
	* 3. Hybrid
	*//*
	div = this.createParam('连接类型：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'connectType';
	select.options.add(new Option('Access', 'Access'));
	select.options.add(new Option('Trunk', 'Trunk'));
	select.options.add(new Option('Hybrid', 'Hybrid'));	

//////////////////////////////////////////////////////////////////////

	*//**
	* PVID
	* 数值类型
	* 1-4094, 可以输入多个值
	* 1 (默认)
	*//*
	div = this.createParam('PVID：');
	container.appendChild(div);
	input = document.createElement('input');
	div.appendChild(input);
	input.type = 'text';
	input.name = 'pvid';
	input.value = '1';
	tip = this.createTips('(1-4094,可以输入多个值)');
	div.appendChild(tip);

	$(input).blur(function(){
	var val = parseInt($(this).val());
	if(val < 1 || val > 4094){
	$(this).val('1');
	}
	});

//////////////////////////////////////////////////////////////////////

	*//**
	* 描述
	* 字符串类型
	* 空字符串 (默认)
	*//*
	div = this.createParam('描述：');
	container.appendChild(div);
	input = document.createElement('input');
	div.appendChild(input);
	input.type = 'text';
	input.name = 'description';
	input.style.width = '300px';

//////////////////////////////////////////////////////////////////////

	*//**
	* 网线类型
	* 枚举类型
	* 1. Auto (默认)
	* 2. Normal
	* 3. Across
	*//*
	div = this.createParam('网线类型：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'wireType';
	select.options.add(new Option('Auto', 'Auto'));
	select.options.add(new Option('Normal', 'Normal'));
	select.options.add(new Option('Across', 'Across'));

//////////////////////////////////////////////////////////////////////

	*//**
	* 流量控制
	* 枚举类型
	* 1. Enable 
	* 2. Disable (默认)
	*//*
	div = this.createParam('流量控制：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'flowControl';
	select.options.add(new Option('Disable', '0'));
	select.options.add(new Option('Enable', '1'));

//////////////////////////////////////////////////////////////////////

	*//**
	* 广播风暴抑制比类型
	* 枚举类型
	* 1. ratio (默认)
	* 2. pps
	* 3. kbps
	*//*
	div = this.createParam('广播风暴抑制比类型：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'broadcastType';
	select.id = 'broadcastTypeId';
	select.options.add(new Option('ratio', 'ratio'));
	select.options.add(new Option('pps', 'pps'));
	select.options.add(new Option('kbps', 'kbps'));

	// 绑定类型改变事件
	this.selectChange(select, 'broadcastTip');

	*//**
	* 广播风暴抑制比数值
	* 数值类型(单值)
	* 1. ratio  -  1-100 
	* 2. pps    -  1-148810
	* 3. kbps   -  1-100000
	*//*
	tip = this.createTips('广播风暴抑制比数值：');
	div.appendChild(tip);
	input = document.createElement('input');
	div.appendChild(input);
	input.type = 'text';
	input.name = 'broadcastValue';
	input.value = '100';
	tip = this.createTips('(1-100 单值)');
	div.appendChild(tip);
	tip.id = 'broadcastTip';

	// 输入框失去焦点时，验证输入内容的合法性
	this.inputBlur(input, 'broadcastTypeId');

//////////////////////////////////////////////////////////////////////

	*//**
	* 多播风暴抑制比类型
	* 枚举类型
	* 1. ratio (默认)
	* 2. pps
	* 3. kbps
	*//*
	div = this.createParam('多播风暴抑制比类型：');
	container.appendChild(div);
	select = document.createElement('select');
	div.appendChild(select);
	select.name = 'multicastType';
	select.id = 'multicastTypeId';
	select.options.add(new Option('ratio', 'ratio'));
	select.options.add(new Option('pps', 'pps'));
	select.options.add(new Option('kbps', 'kbps'));

	// 绑定类型改变事件
	this.selectChange(select, 'multicastTip');

	*//**
	* 多播风暴抑制比数值
	* 数值类型(单值)
	* 1. ratio  -  1-100 
	* 2. pps    -  1-148810
	* 3. kbps   -  1-100000
	*//*
	tip = this.createTips('多播风暴抑制比数值：');
	div.appendChild(tip);
	input = document.createElement('input');
	div.appendChild(input);
	input.type = 'text';
	input.name = 'multicastValue';
	input.value = '100';	
	tip = this.createTips('(1-100 单值)');
	div.appendChild(tip);
	tip.id = 'multicastTip';

	// 输入框失去焦点时，验证输入内容的合法性
	this.inputBlur(input, 'multicastTypeId');
};*/
/**
 * 创建一个参数
 * paramName : string 参数名称
 */
configTabPane.prototype.createParam = function(paramName){
	var div = document.createElement('div');
	div.style.height = this.LineHeight + 'px';
	
	var span = this.createTips(paramName);
	div.appendChild(span);
	return div;
};
/**
 * 创建一个提示信息
 * content : string 提示内容
 */
configTabPane.prototype.createTips = function(content){
	var span = document.createElement('span');
	span.style.lineHeight = this.LineHeight + 'px';
	span.style.marginLeft = '15px';
	span.innerHTML = content; 
	return span;
};
/**
 * 下拉框选择改变事件绑定
 * selector : dom node 被绑定的对象
 * id       : string 写入提示信息的元素id
 */
/*configTabPane.prototype.selectChange = function(selector, id){
	//alert("hah");
	$(selector).change(function(){
		var tip = $('#' + id);
		switch($(this).val()){
			case 'ratio':
				$(tip).html("(1-100 单值)");
				break;
			case 'pps'  :
				$(tip).html("(1-148810 单值)");
				break;
			case 'kbps' :
				$(tip).html("(1-100000 单值)");
				break;
			default     :
				alert('Unknown！！');
		}
	});
};*/
function selectChange(interName , type , paraName){
	//alert("interName:"+interName+" type:"+type+" paraName："+paraName);
	var oldValue;//旧的参数值
	var newValue;//新的参数值
	if(type == "devPort"){
		for(var i=0;i<totalJson.length;i++){//遍历totalJson
			if(totalJson[i].realId == devId ){
				for(var j=0;j<totalJson[i].inter.length;j++){
					if(totalJson[i].inter[j].interName == interName){
						oldValue=totalJson[i].inter[j].interConfig[paraName];
					}
				}
			}
		}
	}else if(type == "boardPort"){
		var boardId=$("area[name = '"+interName+"']").parent().parent().attr("name");
		var slotName=$("area[name = '"+interName+"']").parent().parent().attr("slotName");
		for(var i=0;i<totalJson.length;i++){
			if(totalJson[i].realId == devId ){
				for(var j=0;j<totalJson[i].slot.length;j++){
					if(totalJson[i].slot[j].slotName == slotName){
						if(totalJson[i].slot[j].boardInfo.boardId == boardId){
							for(var k=0;k<totalJson[i].slot[j].boardInfo.bodInter.length;k++){
								if(totalJson[i].slot[j].boardInfo.bodInter[k].interName == interName){
									oldValue=totalJson[i].slot[j].boardInfo.bodInter[k].config[paraName];
								}
							}
						}
					}
				}
			}
		}
	}
	newValue=$("#"+interName.split("/").join("-")).find("[name='"+paraName+"']").val();
	//alert("oldValue:"+oldValue+" newValue:"+newValue);
	if(oldValue != newValue){//说明发生了改变
		$("#"+interName.split("/").join("-")).find("[name='"+paraName+"']").attr("edit","1");
	}
};
/**
 * 输入框失焦事件绑定
 * input : dom node 被绑定的对象
 * id    : string 从元素id所选类型获取校验范围
 */
/*configTabPane.prototype.inputBlur = function(input, id){
	$(input).blur(function(){
		var val = parseInt($(this).val());
		switch($("#" + id).val()){
			case 'ratio':
				if(val < 1 || val > 100){
					$(this).val('100');
				}
				break;
			case 'pps'  :
				if(val < 1 || val > 148810){
					$(this).val('100');
				}
				break;
			case 'kbps' :
				if(val < 1 || val > 100000){
					$(this).val('100');
				}
				break;
			default     :
				alert('Unknown！！');			
		}
	});
};*/

//获取所有的板卡
function getAll(container,$ul,slotArr){
	$.post("../servlet/getAllBoard",{slotId:slotArr.join(",")},function(data){
		$ul.empty();
		boardList=data;
		for(var i=0;i<data.length;i++){
			//var port='';
			//var portId='';
			var coordinate='';
			for(var j=0;j<data[i].inter.length-1;j++){
				//port+=data[i].inter[j].interName;
				//port+=";";
				//portId+=data[i].inter[j].interId;
				//portId+=";";
				coordinate+=data[i].inter[j].interCoords;
				coordinate+=";";
			}
			//port+=data[i].inter[data[i].inter.length-1].interName;
			//portId+=data[i].inter[data[i].inter.length-1].interId;
			coordinate+=data[i].inter[data[i].inter.length-1].interCoords;
			//通过slotId判断板卡的长度
			var width="";
			//alert($(".slot"+data[i].slotID).css("width"));
			if(parseInt($(".slot"+data[i].slotID).css("width").split("p")[0]) < 200){
				width="180px";
				//alert(coordinate);
			} else if(parseInt($(".slot"+data[i].slotID).css("width").split("p")[0]) > 300){
				width="360px";//如果板卡长度为360，则对应接口坐标按比例放大
				var coordsArr=coordinate.split(";");
				for(var k=0;k<coordsArr.length;k++){
					var arr=coordsArr[k].split(",");
					arr[0]=parseInt(arr[0])*2;
					arr[2]=parseInt(arr[2])*2;
					coordsArr[k]=arr.join(",");
				}
				coordinate=coordsArr.join(";");
				//alert(coordinate);
			}
			
			//var $li=$('<li style="list-style:none;height:38px;"><div><img src="media/image/'+data[i].boardUrl+'" id="'+data[i].boardID+'" style="height:32px;width:'+width+';"  slotId="slot'+data[i].slotID+'" disb="'+data[i].remark+'" port="'+port+'" portId="'+portId+'" coordinate="'+coordinate+'" /></div></li>');
			var $li=$('<li style="list-style:none;height:38px;"><div><img src="media/image/'+data[i].boardUrl+'" name="'+data[i].boardID+'" style="height:32px;width:'+width+';"  slotId="slot'+data[i].slotID+'" disb="'+data[i].remark+'" coordinate="'+coordinate+'" /></div></li>');
			$ul.append($li);
		}
		//存在ajax异步问题，经常出现这个问题，但是总不容易发现
		$(container).append($ul);
		
		$ul.children().draggable({ 
	       containment: "#mxWindowDiv",
		   connectToSortable: "#droplist > div",
		   helper: "clone",
		   revert: "invalid",
		   /*start:function( event, ui ){
			   $("#droplist>div").each(function(i){
					   $(this).css("display","block");
					   $(this).css("background-color","black");
				 
			   });
		   },*/
	       drag:function( event, ui ){
	    	   //$("#droplist").children().css("display","none");
	    	   //通过板卡的插槽id来判断
	    	   //$("."+$(this).children().eq(0).children().eq(0).attr("slotId")).css("display","block");
	       	   
	    	  // alert($("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").attr("name"));
	    	   //判断跟它对立的插槽里是否有板卡，如果有，则拖不上去
	    	   if($("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").children().length == 0){
	    		   
	    		   $("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").css("display","none");
	    		  // $("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").css("background-color","black");
	    		   $("."+$(this).children().eq(0).children().eq(0).attr("slotId")).css("display","block");
	    	   }else{
	    		   $("."+$(this).children().eq(0).children().eq(0).attr("slotId")).css("display","none");
	    		   $("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").css("display","block");
	    	   }
	    	   //$("#droplist [class !='"+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").css("display","none");
	    	  
	       }
	    });
	    $ul.children().children().children().click(function() { 
	    	//alert($(this).attr('disb'));
	    	var Des = $("<p>"+$(this).attr('disb')+"</p>");
	    	$("#cardDes").children().remove();
	        $("#cardDes").append($(Des));
	    });
	});
}
//按条件搜索板卡
function getRemainder(container,$ul,slotArr){
	var searchType=$("#search-type").val();
	var searchValue=$("#searchvalue").val();
	$.post("../servlet/getSearchBoard",{slotId:slotArr.join(","),searchType:searchType,searchValue:searchValue},function(data){
		boardList=data;
		$ul.empty();
		for(var i=0;i<data.length;i++){
			//var port='';
			//var portId='';
			var coordinate='';
			for(var j=0;j<data[i].inter.length-1;j++){
				//port+=data[i].inter[j].interName;
				//port+=";";
				//portId+=data[i].inter[j].interId;
				//portId+=";";
				coordinate+=data[i].inter[j].interCoords;
				coordinate+=";";
			}
			//port+=data[i].inter[data[i].inter.length-1].interName;
			//portId+=data[i].inter[data[i].inter.length-1].interId;
			coordinate+=data[i].inter[data[i].inter.length-1].interCoords;
			//通过slotId判断板卡的长度
			var width="";
			//alert($(".slot"+data[i].slotID).css("width"));
			if(parseInt($(".slot"+data[i].slotID).css("width").split("p")[0]) < 200){
				width="180px";
				//alert(coordinate);
			} else if(parseInt($(".slot"+data[i].slotID).css("width").split("p")[0]) > 300){
				width="360px";//如果板卡长度为360，则对应接口坐标按比例放大
				var coordsArr=coordinate.split(";");
				for(var k=0;k<coordsArr.length;k++){
					var arr=coordsArr[k].split(",");
					arr[0]=parseInt(arr[0])*2;
					arr[2]=parseInt(arr[2])*2;
					coordsArr[k]=arr.join(",");
				}
				coordinate=coordsArr.join(";");
				//alert(coordinate);
			}
			
			//var $li=$('<li style="list-style:none;height:38px;"><div><img src="media/image/'+data[i].boardUrl+'" id="'+data[i].boardID+'" style="height:32px;width:'+width+';"  slotId="slot'+data[i].slotID+'" disb="'+data[i].remark+'" port="'+port+'" portId="'+portId+'" coordinate="'+coordinate+'" /></div></li>');
			var $li=$('<li style="list-style:none;height:38px;"><div><img src="media/image/'+data[i].boardUrl+'" name="'+data[i].boardID+'" style="height:32px;width:'+width+';"  slotId="slot'+data[i].slotID+'" disb="'+data[i].remark+'" coordinate="'+coordinate+'" /></div></li>');
			$ul.append($li);
		}
		//存在ajax异步问题，经常出现这个问题，但是总不容易发现
		$(container).append($ul);
		
		$ul.children().draggable({ 
	       containment: "#mxWindowDiv",
		   connectToSortable: "#droplist > div",
		   helper: "clone",
		   revert: "invalid",
	       drag:function( event, ui ){
	    	 //  $("#droplist").children().css("display","none");
	    	   //通过板卡的插槽id来判断
	    	   //$("."+$(this).children().eq(0).children().eq(0).attr("slotId")).css("display","block");
	       	   
	    	  // alert($("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").attr("name"));
	    	   //判断跟它对立的插槽里是否有板卡，如果有，则拖不上去
	    	   if($("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").children().length == 0){
	    		   $("."+$(this).children().eq(0).children().eq(0).attr("slotId")).css("display","block");
	    	   }else{
	    		   $("."+$(this).children().eq(0).children().eq(0).attr("slotId")).css("display","none");
	    		   $("#droplist>div[class !='ui-sortable ui-droppable "+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").css("display","block");
	    	   }
	    	   //$("#droplist [class !='"+$(this).children().eq(0).children().eq(0).attr('slotId')+"']").css("display","none");
	    	  
	       }
	    });
	    $ul.children().children().children().click(function() { 
	    	//alert($(this).attr('disb'));
	    	var Des = $("<p>"+$(this).attr('disb')+"</p>");
	    	$("#cardDes").children().remove();
	        $("#cardDes").append($(Des));
	    });
	});
}
//参数配置部分对图片上的热点进行点击
function areaClick(name, cla, para){
	//alert(name);
	var flag=0;
	$("#devAttrBodyNav li a").each(function(i){
		//alert($(this).attr("href")+"  "+'#'+name.split("/").join("-"));
		if($(this).attr("href") == ("#"+name.split("/").join("-"))){
			flag=1;//说明该tab已存在
			$("#devAttrBodyNav li.active").removeClass("active");
			$(this).parent().addClass("active");
			
			$("#configTab_body div.active").removeClass("active in");
			$("#"+name.split("/").join("-")).addClass("active in");
		}
	});
	//alert(flag);
	if(flag == 0){
		$("#devAttrBodyNav li.active").removeClass("active");
		$("#configTab_body div.active").removeClass("active in");
		cTP.infoTab(cTP.createTab(name, true, 72, cla), para, cla);
	};
	
};
//拖拽上去的板卡接口的热点点击
function dropAreaClick(name, cla, para){
	//alert(name);
	$("#devAttrNav li:eq(1)").removeClass("active");
	$("#devAttrNav li:eq(0)").addClass("active");
	$("#devView").removeClass("active in");
	$("#devConfig").addClass("active in");
	var flag=0;
	$("#devAttrBodyNav li a").each(function(i){
		//alert($(this).attr("href")+"  "+'#port'+id.split("口")[1]+'_'+coords);
		if($(this).attr("href") ==  ("#"+name.split("/").join("-"))){
			flag=1;//说明该tab已存在
			$("#devAttrBodyNav li.active").removeClass("active");
			$(this).parent().addClass("active");
			
			$("#configTab_body div.active").removeClass("active in");
			$("#"+name.split("/").join("-")).addClass("active in");
		}
	});
	//alert(flag);
	if(flag == 0){
		$("#devAttrBodyNav li.active").removeClass("active");
		$("#configTab_body div.active").removeClass("active in");
		cTP.infoTab(cTP.createTab(name, true, 72, cla), para , cla);
	};
};

//为拖拽上去的图片增加map属性、创建可点击的热点以及点击操作
function dropAddMapArea(img){
	var src=img.attributes["src"].value.split("/");
	var mapId=src[2];
	var imgId=img.attributes["id"].value;
	var boardId=imgId.split("_")[1];
	img.setAttribute("usemap",imgId+"_"+mapId);
	var map=document.createElement('map');
	map.setAttribute("name",imgId+"_"+mapId);
	//map.id="#"+mapId;
	img.appendChild(map);
	//alert(JSON.stringify(boardList));
	for(var i=0;i<boardList.length;i++){
		if(boardList[i].boardID == boardId){
			for(var j=0;j<boardList[i].inter.length;j++){
				
				var param=JSON.stringify(boardList[i].inter[j].parameters);
				var area=document.createElement('area');
				map.appendChild(area);
				//area.id=areaId;
				area.setAttribute("name",boardList[i].inter[j].interName);
				//area.setAttribute('slotId',slotId);
				area.setAttribute('shape','rect');//矩形
				area.setAttribute('coords',boardList[i].inter[j].interCoords);
				//area.href="#"+tabId;
				area.setAttribute('data-toggle','tab');
				//alert(position);
				//alert(boardList[i].inter[j].interName);
				area.setAttribute('onclick','dropAreaClick("'+boardList[i].inter[j].interName+'","boardPort",'+param+')');
			}
		}
	}
};
//读取参数配置信息
function getConfigInfo(tabId,portName,type){
	//alert("type:"+type);
	var portConfig='{';
	if(type == "devPort"){//设备接口
		for(var i=0;i<newPortInfo.length;i++){
			if(newPortInfo[i].interName == portName){//找到对应的接口
				for(var j=0;j<newPortInfo[i].parameters.length;j++){
					var paraName=newPortInfo[i].parameters[j].name;
					var paraValue=tabId.find("[name='"+paraName+"']").val();
					portConfig+='"'+paraName+'":"'+paraValue+'",';
				}
			}
		}
	}else if(type == "boardPort"){//板卡接口
		var interName=portName.split("-")[0];//此时的portName是接口名字和板卡id绑在一块传过来的
		var boardId=portName.split("-")[1];
		//alert("interName:"+interName+",boardId:"+boardId);
		for(var i=0;i<boardList.length;i++){
			if(boardList[i].boardID == boardId){
				for(var j=0;j<boardList[i].inter.length;j++){
					if(boardList[i].inter[j].interName == interName){
						for(var k=0;k<boardList[i].inter[j].parameters.length;k++){
							var paraName=boardList[i].inter[j].parameters[k].name;
							var paraValue=tabId.find("[name='"+paraName+"']").val();
							portConfig+='"'+paraName+'":"'+paraValue+'",';
						}
					}
				}
			}
		}
	}
	portConfig=portConfig.substring(0, portConfig.length-1);
	portConfig+='}';
	//alert(portConfig);
	return portConfig;
	/*var portState=tabId.find("[name='portState']").find("option:selected").text();//端口状态
	var rate=tabId.find("[name='rate']").val();//速率
	var duplexState=tabId.find("[name='duplexState']").val();//双工状态
	var connectType=tabId.find("[name='connectType']").val();//连接类型
	var pvid=tabId.find("[name='pvid']").val();//PVID
	var description=tabId.find("[name='description']").val();//描述
	var wireType=tabId.find("[name='wireType']").val();//网线类型
	var flowControl=tabId.find("[name='flowControl']").find("option:selected").text();//流量控制
	var broadcastType=tabId.find("[name='broadcastType']").val();//广播风暴抑制比类型
	var broadcastValue=tabId.find("[name='broadcastValue']").val();//广播风暴抑制比数值
	var multicastType=tabId.find("[name='multicastType']").val();//多播风暴抑制比类型
	var multicastValue=tabId.find("[name='multicastValue']").val();//多播风暴抑制比数值
	var portConfig='{"portState":"'+portState+'","rate":"'+rate+'","duplexState":"'+duplexState+'","connectType":"'+connectType+'","pvid":"'+pvid+'","description":"'+description+'","wireType":"'+wireType+'","flowControl":"'+flowControl+'","broadcastType":"'+broadcastType+'","broadcastValue":"'+broadcastValue+'","multicastType":"'+multicastType+'","multicastValue":"'+multicastValue+'"}';
	return portConfig;*/
}

//板卡拖上去以后初始化插槽
function initSlot($slot){
	//alert("initSlot");
	var slotId=$slot.attr("class").split(" ")[2].split("t")[1];//插槽id
	var slotName=$slot.attr("name");//插槽名字
	var slotNum=slotName.split("_")[1];//插槽的编号
	var slotCoords=$slot.attr("coords");
	//var img=$slot.find("img").get(0);//get(0)变为了javascript对象
	var img=$slot.find("img");
	var boardId=img.attr("name");//得到板卡的id
	var coords=img.attr("coordinate");//得到板卡的坐标
	img.attr("id",slotNum+"_"+boardId);//设置拖上去的板卡的id,由插槽编号和板卡id组成
	img.attr("slotName",slotName);
	//alert(img.attr("src"));
	var boardUrl=img.attr("src").split("/")[img.attr("src").split("/").length-1];
	var boardInter='[';
	//console.log(JSON.stringify(boardList));
	if(boardList.length == 0){
		boardInter="";
	}else{
		for(var i=0;i<boardList.length;i++){
			if(boardList[i].boardID == boardId){//找到对应的板卡
				//alert(boardList[i].boardID+" "+boardId);
				for(var j=0;j<boardList[i].inter.length;j++){
					/*var coords=boardList[i].inter[j].interCoords;
					if(width == "360px"){//如果板卡长度为360，则对应接口坐标按比例放大
						var arr=coords.split(",");
						arr[0]=parseInt(arr[0])*2;
						arr[2]=parseInt(arr[2])*2;
						coords=arr.join(",");
					}*/
					boardList[i].inter[j].interCoords=coords.split(";")[j];
					//修改接口名字
					var interName=boardList[i].inter[j].interName;
					var inter1=interName.split("/")[1];
					var inter2=interName.split("/")[0].split("_")[0];
					interName=inter2+"_"+slotNum+"/"+inter1;
					//alert("interName:"+interName);
					boardList[i].inter[j].interName=interName;
					//初始化参数配置信息
	    			var configInfo='{';
	    			if(boardList[i].inter[j].parameters.length == 0){
	    				configInfo="";
	    			}else{
	    				for(var k=0;k<boardList[i].inter[j].parameters.length;k++){
	        				if(boardList[i].inter[j].parameters[k].type == "select"){
	        					configInfo+='"'+boardList[i].inter[j].parameters[k].name+'":"'+boardList[i].inter[j].parameters[k].option.split(",")[0]+'",';
	        				}else if(boardList[i].inter[j].parameters[k].type == "input"){
	        					configInfo+='"'+boardList[i].inter[j].parameters[k].name+'":"",';
	        				}
	        			}
	        			configInfo=configInfo.substring(0, configInfo.length-1);
	        			configInfo+='}';
	    			}
					boardInter+='{"interId":"'+boardList[i].inter[j].interId+'","interName":"'+interName+'","coords":"'+coords.split(";")[j]+'","config":'+configInfo+'},';
				}
			}
		}
		boardInter=boardInter.substring(0, boardInter.length-1);
		boardInter+=']';
	}
	var boardInfo='{"boardId":"'+boardId+'","boardUrl":"'+boardUrl+'","bodInter":'+boardInter+'}';
	//alert(boardInfo);
	//console.log(JSON.stringify(boardList));
	for(var i=0;i<totalJson.length;i++){//遍历totalJson
		if(totalJson[i].realId == devId ){//找到对应的设备
			for(var j=0;j<totalJson[i].slot.length;j++){
				if(totalJson[i].slot[j].slotId == slotId && totalJson[i].slot[j].slotCoords == slotCoords){//找到对应大插槽
					totalJson[i].slot[j].slotState="true";
					totalJson[i].slot[j].boardInfo=JSON.parse(boardInfo);
				}
			}
			
		}
	}
	//console.log(JSON.stringify(totalJson));
}
//点击保存按钮
function submit(){
	//alert(id);
	//console.log(JSON.stringify(totalJson));
	for(var i=0;i<totalJson.length;i++){ //i用来标记totalJson，表示当前设备
		//先找到对应的设备id
		if(totalJson[i].realId == devId){
			//alert(id);
			//获取设备接口信息
			var length=document.getElementById("configTab_body").childNodes.length;
			for(var j=0;j<length;j++){ //j来标记参数配置面板
				var curr=document.getElementById("configTab_body").childNodes[j];
				var $curr=$(curr);
				if($curr.hasClass("devPort")){//找到设备的接口
					var portId=$curr.attr("id");//面板的id
					var portName=portId.split("-").join("/");//接口的name
					/*var coordsArray=new Array();
					coordsArray[0]=portId.split("_")[1];
					coordsArray[1]=portId.split("_")[2];
					coordsArray[2]=portId.split("_")[3];
					coordsArray[3]=portId.split("_")[4];
					var coords=coordsArray.join(",");*/
					for(var k=0;k<totalJson[i].inter.length;k++){//k标记totalJson中当前设备的接口
						//找到对应的接口name
						if(totalJson[i].inter[k].interName == portName){
							totalJson[i].inter[k].interConfig=JSON.parse(getConfigInfo($curr,portName,"devPort"));//保存修改了的设备接口的参数配置信息
						}
					}
				}
			}
			//alert(JSON.stringify(boardList));
			//获取插槽信息
			var len=$("#droplist").children().length;
			for(var n=0;n<len;n++){//遍历修改后的插槽
				if($("#droplist").children().eq(n).html() != ""){//找到不为空的插槽
					//var slotId=$("#droplist").children().eq(n).attr("id");
					var slotName=$("#droplist").children().eq(n).attr("name");
					//var slotCoords=$("#droplist").children().eq(n).attr("coords");
					//alert("slotName:"+slotName);
					for(var j=0;j<totalJson[i].slot.length;j++){//j代表totalJson中当前设备的插槽
						//找到totalJson中对应的插槽
						if(totalJson[i].slot[j].slotName == slotName){
							var boardId=totalJson[i].slot[j].boardInfo.boardId;
							//alert("boardId:"+boardId);
							for(var k=0;k<totalJson[i].slot[j].boardInfo.bodInter.length;k++){//k标记totalJson中当前插槽的接口
								var length=document.getElementById("configTab_body").childNodes.length;
								for(var s=0;s<length;s++){//s标记configTab_body下的tab面板
									var curr=document.getElementById("configTab_body").childNodes[s];
									var $curr=$(curr);
									if($curr.hasClass("boardPort")){//遍历带有boardPort类的面板
										var interName=$curr.attr("id").split("-").join("/");
										//找到对应的板卡接口名字
										if(totalJson[i].slot[j].boardInfo.bodInter[k].interName == interName){
											totalJson[i].slot[j].boardInfo.bodInter[k].config=JSON.parse(getConfigInfo($curr,interName+"-"+boardId,"boardPort"));
										}
									}
								}
							}
						}
					}
				}
			}
			
		}
		//console.log(JSON.stringify(totalJson));
		alert("保存成功");
	}
}
//点击tab标签页右上角的×号  测试ok
function closeClick(interName, cla){
	var flag=0;//标记参数是否被修改
	var $curr=$("#"+interName.split("/").join("-"));
	$curr.find("select").each(function(){
		if($(this).attr("edit") == "1"){
			 flag=1;
		}
	});
	$curr.find("input").each(function(){
		if($(this).attr("edit") == "1"){
			 flag=1;
		}
	});
	//alert(flag);
	 if(flag == 1){
		 var answer=confirm("是否保存对当前tab页的更改？");
		 if(answer == true){//点击确定,将修改过的信息保存在totalJson中
			 if(cla == "devPort"){
				 var newConfigInfo=JSON.parse(getConfigInfo($curr,interName,cla));
				 for(var i=0;i<totalJson.length;i++){//遍历totalJson
					if(totalJson[i].realId == devId ){
						for(var j=0;j<totalJson[i].inter.length;j++){
							if(totalJson[i].inter[j].interName == interName){
								totalJson[i].inter[j].interConfig=newConfigInfo;
							}
						}
					}
				 }
			 }else if(cla == "boardPort"){
				 var boardId=$("area[name = '"+interName+"']").parent().parent().attr("name");
				 var newConfigInfo=JSON.parse(getConfigInfo($curr,interName+"-"+boardId,cla));
				 var slotName=$("area[name = '"+interName+"']").parent().parent().attr("slotName");
				 for(var i=0;i<totalJson.length;i++){
						if(totalJson[i].realId == devId ){
							for(var j=0;j<totalJson[i].slot.length;j++){
								if(totalJson[i].slot[j].slotName == slotName){
									if(totalJson[i].slot[j].boardInfo.boardId == boardId){
										for(var k=0;k<totalJson[i].slot[j].boardInfo.bodInter.length;k++){
											if(totalJson[i].slot[j].boardInfo.bodInter[k].interName == interName){
												totalJson[i].slot[j].boardInfo.bodInter[k].config=newConfigInfo;
											}
										}
									}
								}
							}
						}
					}
			 }
			//console.log(JSON.stringify(totalJson));
			 $("#close_"+interName.split("/").join("-")).parent().remove();
			 $("#"+interName.split("/").join("-")).remove();
		 }else if(answer == false){//点击取消
			 $curr.find("select").attr("edit","0");
			 $curr.find("input").attr("edit","0");
			 $("#close_"+interName.split("/").join("-")).parent().remove();
			 $("#"+interName.split("/").join("-")).remove();
		 }
	 }else if(flag == 0){//没有修改，直接关闭
		 $("#close_"+interName.split("/").join("-")).parent().remove();
		 $("#"+interName.split("/").join("-")).remove();
	 }
	 //关闭以后，如果当前面板不为空，而且不存在active的，默认第一个为active
	 if($("#devAttrBodyNav").length > 0){
		 if($("#devAttrBodyNav li.active").length == 0){
			 $("#devAttrBodyNav").children().eq(0).addClass("active");
			 
			 $("#configTab_body div.active").removeClass("active in");
			 $("#configTab_body").children().eq(0).addClass("active in");
		 }
	 }
}
//最后总的窗口上的关闭按钮，点之前判断用户是否保存
function allClose(){
	//alert("allClose");
	var flag=0;
	var length=document.getElementById("configTab_body").childNodes.length;
	for(var i=0;i<length;i++){
		var curr=document.getElementById("configTab_body").childNodes[i];
		var $curr=$(curr);
		$curr.find("select").each(function(){
			if($(this).attr("edit") == "1"){
				 flag=1;
			}
		});
		$curr.find("input").each(function(){
			if($(this).attr("edit") == "1"){
				 flag=1;
			}
		});
	}
	//alert(flag);
	 if(flag == 1){//等于1即做了修改，提醒用户是否要保存
		 var answer=confirm("是否保存当前更改？");
		 if(answer == true){
			 submit();
			 showGraph.setEnabled(true);
			 showWindow.destroy();
		 }else if(answer == false){
			 for(var i=0;i<length;i++){
				 var curr=document.getElementById("configTab_body").childNodes[i];
				 var $curr=$(curr);
				 $curr.find("select").each(function(){
						$(this).attr("edit","0");
				 });
				 $curr.find("input").each(function(){
					 	$(this).attr("edit","0");
				 });
			 }
			 showGraph.setEnabled(true);
			 showWindow.destroy();
		 }
	 }else if(flag == 0){//等于0即没有做修改，直接关闭
		 showGraph.setEnabled(true);
		 showWindow.destroy();
	 }
}
//点击图片上某一区域获取位置坐标
var JPos = {};
(function($){
	$.$getAbsPos = function(p)
	 {
	  var _x = 0;
	  var _y = 0;
	  while(p.offsetParent){
		_x += p.offsetLeft;
		_y += p.offsetTop;
		p = p.offsetParent;
	  }
	   
	  _x += p.offsetLeft;
	  _y += p.offsetTop;
	   
	  return {x:_x,y:_y};
	 };

	 $.$getMousePos = function(evt){
	  var _x,_y;
	  evt = evt || window.event;
	  if (evt.pageX || evt.pageY)
	  {
	   _x = evt.pageX;
	   _y = evt.pageY;
	  }else if (evt.clientX || evt.clientY)
	  {
	   _x = evt.clientX + document.body.scrollLeft - document.body.clientLeft;
	   _y = evt.clientY + document.body.scrollTop - document.body.clientTop;
	  }else
	  {
		return $.$getAbsPos(evt.target); 
	  }
	  return {x:_x,y:_y};
	 };
})(JPos);

function haha(pChoice)
{
	 switch(pChoice){
	  case "GETMOUSEPOSINPIC":
	   var mPos = JPos.$getMousePos();
	   var iPos = JPos.$getAbsPos(arguments[1]);
		
	  //alert((mPos.x - iPos.x) + " " + (mPos.y - iPos.y));		
	   break;
	 }
}