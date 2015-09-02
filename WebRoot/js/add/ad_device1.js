function rePass(){
	$(".page3").dialog("open");
}
//页面展示
function showDeviceTable(data){
	$("#deviceTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr id='tr"+i+"'>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td id='"+data[i].deviceID+"'>"+data[i].deviceName+"</td>";
		textHtml+="<td>"+data[i].factoryName+"</td>";
		textHtml+="<td>"+data[i].deviceType+"</td>";
		textHtml+="<td>"+data[i].deviceDes+"</td>";
		textHtml+="<td>"+data[i].devPort+"</td>";
		textHtml+="<td>"+data[i].devSlot+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].deviceID+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
		   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#deviceTable tbody").append(textHtml);
	}
}

//编辑设备信息
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	var deviceName=$("#deviceTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var factoryName=$("#deviceTable tbody tr").eq(parseInt(id)).children().eq(2).html();
	
	$("#deviceType").empty();
	//列举编辑设备所需的信息
	$.ajax({
		type:"post",
		data:{
			type:"edit"
		},
		url:"./servlet/listDeviceInfo",
		success:function(data){
			//列举设备类型
			for(var i=0;i<data.typeTables.length;i++){
				$("#deviceType").append("<option value="+data.typeTables[i].deviceType+">"+data.typeTables[i].deviceType+"</option>");
			}
		}
	});
	var deviceDes=$("#deviceTable tbody tr").eq(parseInt(id)).children().eq(4).html();
	
	$("#deviceName").val(deviceName);
	$("#factoryName").val(factoryName);
	$("#deviceDes").val(deviceDes);
	$(".page1").dialog("open");
	
	//点击确定之后
	$("#editSubmit").click(function(){
		var newDeviceName=$("#deviceName").val();
		var newFactoryName=$("#factoryName").val();
		var newDeviceType=$("#deviceType").val();
		//alert(newDeviceType);
		var newDeviceDes=$("#deviceDes").val();
		//alert("newFixList: "+newFixList+" ,  newSocketList: "+newSocketList);
		$.ajax({
			type:"post",
			url:"./servlet/editDevice",
			data:{
				deviceNum:tempid,
				deviceName:newDeviceName,
				factoryName:newFactoryName,
				deviceType:newDeviceType,
				deviceDes:newDeviceDes,
				//fixList:newFixList,//以字符串的形式写给后台
				//socketList:newSocketList
			},
			success:function(resp){
				if(resp =="success"){
					alert("修改设备成功！");
					location.reload();
				}
				else if(resp =="unsuccess"){
					alert("修改设备失败！");
				}
			}
		});
	});
}

//删除设备
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deleteDevice",
			data:{
				    deviceNum:tempid
			},
			success:function(resp){
				if(resp =="success"){
					alert("删除设备成功！");
					location.reload();
				}
			}
		});
	} 
	
}

//无条件搜索
function showAll(){
	var itemnumber=$("#itemnumber").val();
	$.ajax({
		type:"post",
		url:"./servlet/listDevice",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").addClass("allnoderesult");
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<=data.pages;i++){
				if(i==1){
					//alert(i);
					$(".allnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".allnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showDeviceTable(data.devInfo);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				//alert("上一页");
				var itemnumber = $("#itemnumber").val();
				//alert(itemnumber);
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				//alert(currentPage);
				if (currentPage > 1) {
					
					currentPage = Number(currentPage) - 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listDevice",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showDeviceTable(data.devInfo);
						}
					});
				} 
			});

			//点击下一页之后
			$(".allnoderesult .fa-chevron-right").click(function() {
				//alert("下一页");
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				//alert(currentPage);
				if (currentPage<data.pages) {
					currentPage = Number(currentPage) + 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listDevice",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showDeviceTable(data.devInfo);
						}
					});
				} 
			});
			//点击页数之后
			$(".allnoderesult .changenum").click(function() {
				var itemnumber = $("#itemnumber").val();
				
				$(".allnoderesult li").removeClass("active");
				$(this).addClass("active");
				var currentpage = $(this).find("a").html();
				//alert(currentpage);
				$.ajax({
					type: "post",
					url: "./servlet/listDevice",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showDeviceTable(data.devInfo);
					}
				});
			});
		}
	});
}
//根据搜索条件搜索
function showRemainder(){
	var itemnumber=$("#itemnumber").val();
	var searchtype=$("#search-type").val();
	var searchvalue=$("#searchvalue").val();
	$.ajax({
		type:"post",
		url:"./servlet/searchDevice",
		data:{
			page:"1",
			item:itemnumber,
			search_type:searchtype,
			key:searchvalue
		},
		success:function(data){
			$(".pagination").addClass("remaindnoderesult");
			$(".remaindnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<=data.pages;i++){
				if(i==1){
					$(".remaindnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".remaindnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".remaindnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showDeviceTable(data.devInfo);
			
			//点击上一页之后
			$(".remaindnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage > 1) {
					currentPage = Number(currentPage) - 1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchDevice",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showDeviceTable(data.devInfo);
						}
					});
				} 
			});
			
			//点击下一页之后
			$(".remaindnoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage) + 1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchDevice",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showDeviceTable(data.devInfo);
						}
					});
				} 
			});
			
			//点击页数之后
			$(".remaindnoderesult .changenum").click(function() {
				$(".remaindnoderesult li").removeClass("active");
				$(this).addClass("active");
				var currentpage = $(this).find("a").html();
				$.ajax({
					type: "post",
					url: "./servlet/searchDevice",
					data: {
						page: currentpage,
						item: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showDeviceTable(data.devInfo);
					}
				});
			});
		}
	});
}

/*var fixPortLen;//接口个数(数组长度)
var slotLen;//插槽个数
*/
var count=0;//接口及插槽信息列表的序号
var clickCount=0;//图片的点击次数
var startX,startY,endX,endY;
//var $coverDiv=$("<div style='position:absolute;z-index:auto;background-color:#FF9797'></div>");
var $bgDiv=$("<div id='bg' style='display: none; top: 0%; left: 0%;width:500px; height: 80px; background-color: #B9B9FF; -moz-opacity: 0.7; opacity:.50; filter: alpha(opacity=70);'></div>");
$(function(){
	new uploadPreview({ UpBtn: "img_up", DivShow: "img_div", ImgShow: "img_show" });
	new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow" });
	$(".page1").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加"
	});
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	showAll();
	
	//点击选择搜索类型
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		if(stype=="deviceName"||stype=="practoryName"||stype=="deviceStyle"||stype=="other"){
			$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'>");
		}
	});
	//点击搜索
	$("#searchservice").click(function(){
		var type = $("#search-type").val();
		if(type=="all"){
			$(".pagination").empty();
			$(".pagination").removeClass("allnoderesult");
			$(".pagination").removeClass("remaindnoderesult");
			showAll();
		}else{
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加设备
	$("#addDevice").click(function(){
		$("#newDeviceType").empty();
		$("#newFixList").empty();
		$("#newSocketList").empty();
		//列举添加设备所需的信息		
		$.ajax({
			type:"post",
			data:{
				type:"add"
			},
			url:"./servlet/listDeviceInfo",
			success:function(data){
				//列举设备类型
				for(var i=0;i<data.typeTables.length;i++){
					$("#newDeviceType").append("<option value="+data.typeTables[i].deviceType+">"+data.typeTables[i].deviceType+"</option>");
				}
				//列举接口类型
				for(var i=0;i<data.interfaceTables.length;i++){
					$("#newFixList").append("<option value="+data.interfaceTables[i].interfaceID+">"+data.interfaceTables[i].interfaceStyle+"</option>");
				}
				//列举插槽
				for(var i=0;i<data.slotTables.length;i++){
					
					$("#newSocketList").append("<option value="+data.slotTables[i].slotID+">"+data.slotTables[i].slotStyle+"</option>");
				}
			}
		});
		$(".page2").dialog("open");
/**************************************新写的 **************************/
		//点击接口下拉框
		$("#newFixList").change(function(event){
			count++;
			//alert(count);
			var poType=$("#newFixList").find("option:selected").text();//接口类型
			var poId=$("#newFixList").val();
			var textHtml="<tr id='"+count+"' class='addport'>";
			textHtml+="<td>"+count+"</td>";
			textHtml+="<td portId='"+poId+"'>"+poType+"</td>";
			textHtml+="<td>"+poType+"_0/"+(count-1)+"</td>";//默认生成的接口名字
			textHtml+="<td id='coords"+count+"'></td>";
			textHtml+="<td><a class='btn btn-danger deleteservice btn-sm' onclick='del("+count+")'>删除</a></td>";
			textHtml+="</tr>";
			$("#portSlotTbody").append(textHtml);
			$("#"+count+" td:eq(2)").click(tdClick);//给td添加点击事件
			$("#newFixList").attr("disabled",true);//让下拉框不能进行点击，必须去点击图片
			$("#newSocketList").attr("disabled",true);		
			$("#imgdiv").append($bgDiv);
			$bgDiv.css("display","block");
			alert("点击设备实际图片获取该接口的坐标");
			$bgDiv.css("display","none");
		});
		//点击插槽下拉框
		$("#newSocketList").change(function(event){
			count++;
			//alert(count);
			var slType=$("#newSocketList").find("option:selected").text();
			var slId=$("#newSocketList").val();
			var textHtml="<tr id='"+count+"' class='addslot'>";
			textHtml+="<td>"+count+"</td>";
			textHtml+="<td slotId='"+slId+"'>"+slType+"</td>";
			textHtml+="<td>"+slType+"_"+count+"</td>";
			textHtml+="<td id='coords"+count+"'></td>";
			textHtml+="<td><a class='btn btn-danger deleteservice btn-sm' onclick='del("+count+")'>删除</a></td>";
			textHtml+="</tr>";
			$("#portSlotTbody").append(textHtml);
			$("#"+count+" td:eq(2)").click(tdClick);//给td添加点击事件
			$("#newFixList option").attr("disabled","true");//让下拉框不能进行点击，必须去点击图片
			$("#newSocketList option").attr("disabled","true");
			$("#imgdiv").append($bgDiv);
			$bgDiv.css("display","block");
			alert("点击设备实际图片获取该插槽的坐标");
			$bgDiv.css("display","none");
		});
		//图片点击
		$("#imgShow").click(function(){
			var pName=$("#newFixList").find("option:selected").text();
			var sName=$("#newSocketList").find("option:selected").text();
			if(pName == "" && sName == ""){
				alert("您还未选择任何接口或插槽，请先选择！！！");
			}else if(pName != "" || sName != ""){
				clickCount++;
				var coordsStr=haha('GETMOUSEPOSINPIC',this);
				//alert(coordsStr);
				var xCoords=coordsStr.split(",")[0];
				var yCoords=coordsStr.split(",")[1];
				//alert("xCoords:"+xCoords+"yCoords:"+yCoords);
				//$("#coords"+count).append(xCoords+" "+yCoords+" ");
				var $coverDiv=$("<div style='position:absolute;z-index:auto;background-color:#FF0000;opacity:0.5'></div>");
				$("#imgdiv div").remove();
				$("#imgdiv").append($coverDiv);
				if(clickCount == 1){
					startX=xCoords;
					startY=yCoords;
					$coverDiv.css("margin-left",xCoords+"px");
					$coverDiv.css("margin-top",yCoords+"px");
					$coverDiv.css("width","3px");
					$coverDiv.css("height","3px");
					var text=$("#coords"+count).text();
					//$("#coords"+count).append(xCoords+" "+yCoords+" ");
					text+=xCoords+" "+yCoords+" ";
					$("#coords"+count).text(text);
				}else if(clickCount == 2){
					endX=xCoords;
					endY=yCoords;
					//alert("startX:"+startX+"startY:"+startY+"endX:"+endX+"endY:"+endY);
					$coverDiv.css("margin-left",startX+"px");
					$coverDiv.css("margin-top",startY+"px");
					$coverDiv.css("width",(parseInt(endX)-parseInt(startX))+"px");
					$coverDiv.css("height",(parseInt(endY)-parseInt(startY))+"px");
					//$("#coords"+count).append(xCoords+" "+yCoords+" ");	
					var text=$("#coords"+count).text();
					text+=xCoords+" "+yCoords+" ";;
					$("#coords"+count).text(text);
					
					 var result=confirm("是否确认添加！"); 
					 if(result == true){
						 clickCount=0;//确认后让它清零
						 alert("添加成功,请选择下一个接口/插槽");
						 $("#newFixList").find("option").attr("selected",false);
						 $("#newSocketList").find("option").attr("selected",false);
						 $("#newFixList").attr("disabled",false);
						 $("#newSocketList").attr("disabled",false);
						 $("#imgdiv div").remove();
						 
						//接口及插槽信息表 添加鼠标事件
						$("#portSlotTbody tr").hover(function(){
							//鼠标悬停
							//alert("youmuyou");
							var coords=$(this).children().eq(3).text().split(" ");
							//alert(coords);
							var width=parseInt(coords[2])-parseInt(coords[0]);
							var height=parseInt(coords[3])-parseInt(coords[1]);
							var marginLeft=parseInt(coords[0]);
							var marginTop=parseInt(coords[1]);
							var $showDiv=$("<div style='position:absolute;z-index:auto;background-color:#FF0000;opacity:0.7'></div>");
							$showDiv.css("margin-left",marginLeft+"px");
							$showDiv.css("margin-top",marginTop+"px");
							$showDiv.css("width",width+"px");
							$showDiv.css("height",height+"px");
							$("#imgdiv div").remove();
							$("#imgdiv").append($showDiv);
							
						},function(){
							//鼠标移出
							$("#imgdiv div").remove();
						});
						
					 }else if(result == false){
						 alert("请重新开始");
						 $("#newFixList").find("option").attr("selected",false);
						 $("#newSocketList").find("option").attr("selected",false);
						 $("#newFixList").attr("disabled",false);
						 $("#newSocketList").attr("disabled",false);
						 $("#portSlotInfo tr:eq("+count+")").remove();//删除table中刚添加的一行
						 clickCount=0;//清零
						 count--;
						 $("#imgdiv div").remove();	
						 
					 }
					
				}
			}
		});
		
		$(".page2 form").keypress(function(e) {//放置按下回车键时form表单提交
			  if (e.which == 13) {
			    return false;
			  }
		});
		$("#addSubmit").click(function(){
			var newDeviceName=$("#newDeviceName").val();//设备名称
			var newDeviceNum=$("#newDeviceNum").val();//设备编号
			var newFactoryName=$("#newFactoryName").val();//厂商名称
			var newDeviceType=$("#newDeviceType").val();//设备类型
			//alert(newDeviceType);
			var newDeviceDes=$("#newDeviceDes").val();//设备描述
			//var newFixList=$("#newFixList").val();
			//alert(newFixList+" "+newSocketList);
			var newDeviceUrl=$("#img_up").val().split("\\")[$("#img_up").val().split("\\").length-1];//设备侧栏图片
			//alert(newDeviceUrl);
			var newRealUrl=$("#up_img").val().split("\\")[$("#up_img").val().split("\\").length-1];//设备实际图片
			//alert(newRealUrl);
			var newPort='[';//设备接口
			var newSlot='[';//设备插槽
			$("#portSlotTbody tr").each(function(i){
				var className=$(this).attr("class");
				if(className == "addport"){//接口
					//var portType=$(this).children().eq(1).text();
					var portId=$(this).children().eq(1).attr("portId");
					var portName=$(this).children().eq(2).text();
					var coordsArray=$(this).children().eq(3).text().split(" ");
					coordsArray[0]=parseInt(parseInt(coordsArray[0])*1.4);//1.4为700除以500所得
					coordsArray[2]=parseInt(parseInt(coordsArray[2])*1.4);
					var coords=coordsArray.join(",");
					coords=coords.substring(0, coords.length-1);
					
					//alert(portId+" "+coords);
					newPort+='{"interfaceID":"'+portId+'","interName":"'+portName+'","coords":"'+coords+'"},';
				}else if(className == "addslot"){//插槽
					//var slotStyle=$(this).children().eq(1).text();
					var slotId=$(this).children().eq(1).attr("slotId");
					var slotName=$(this).children().eq(2).text();
					var coordsArray=$(this).children().eq(3).text().split(" ");
					coordsArray[0]=parseInt(parseInt(coordsArray[0])*1.4);//1.4为700除以500所得
					coordsArray[2]=parseInt(parseInt(coordsArray[2])*1.4);
					var coords=coordsArray.join(",");
					coords=coords.substring(0, coords.length-1);
					//alert(slotId+" "+coords);
					newSlot+='{"slotID":"'+slotId+'","slotName":"'+slotName+'","coords":"'+coords+'"},';
				}
				
			});
			if(newPort.length > 1){
				newPort=newPort.substring(0, newPort.length-1);
				newPort+=']';
			}else{
				newPort+=']';
			}
			if(newSlot.length > 1){
				newSlot=newSlot.substring(0, newSlot.length-1);
				newSlot+=']';
			}else{
				newSlot+=']';
			}
			
			
			//alert("newPort:"+newPort);
			//alert("newSlot:"+newSlot);
			
			$.ajax({
				type: "post",
				url: "./servlet/addDevice",
				data:{
					deviceNum:newDeviceNum,
					deviceName:newDeviceName,
					factoryName:newFactoryName,
					deviceType:newDeviceType,
					deviceDes:newDeviceDes,
					//fixList:newFixList,
					//sockList:newSocketList
					deviceUrl:newDeviceUrl,
					realUrl:newRealUrl,
					deviceInter:newPort,
					deviceSlot:newSlot
				},
				success: function(resp) {
					if (resp == "success") {
						alert("添加设备成功！");
						location.reload();
					} else if (resp == "unsuccess"){
						alert("添加设备失败");
					}
				}
			});
		});
	});
	
	//当每页显示个数变化之后
	$("#itemnumber").change(function(){
			//alert($("#itemnumber").val());
			if ($(".pagination").hasClass("allnoderesult")) {
				$(".pagination").empty();
				// 无搜索
				showAll();
			}
			else if($(".pagination").hasClass("remaindnoderesult")){
				$(".pagination").empty();
				//条件搜索
				showRemainder();
			}
	});
	//修改密码
	$("#modify_ok").click(function(){
		$("#teaPass").parent().next().html(" ");
		$("#reteaNewPass").parent().next().html(" ");
		var old_password = $("#teaPass").val();
		var new_password1 = $("#teaPassNew").val();
		var new_password2 = $("#reteaNewPass").val();
		var password = $("#login_username").attr("pid");
		if(old_password!=password){
			$("#teaPass").parent().next().html("密码错误！");
		}else if(new_password1!=new_password2){
			$("#reteaNewPass").parent().next().html("密码输入不一致！");
		}else{
			$.ajax({
				type:"post",
				url:"./servlet/updatePassword",
				data:{
					newPassword:new_password1,
					type:"admin"
				},
				success:function(text){
					if(text=="success"){
						alert("密码修改成功！");
						location.reload();
					}else{
						alert("密码修改失败！");
					}
					
				}
			});
		}
	});
});

/*****************************新加**********************************/
//点击table中的td,修改接口或插槽的名字
function tdClick(){
	//alert($(this).html());
	 var tempTd=$(this);//保存td
	 var tdText = tempTd.html();//获取td的文本值
	 tempTd.html("");//清空td的文本值，也可以使用empty()
	 var tempInput = $("<input>");//创建input
	 tempInput.attr("value",tdText);//将td的文本值赋给input
	 tempInput.width("112px");  
	 //tempInput.height(tempTd.height()); 
	 
	 /*tempInput.blur(function () {//文本框失去焦点的时候变为文本    
		//获取input的值
	     var val = tempInput.val();
	     //将td之间的文本值重新设置为input的值
	     tempTd.html(val);
	     tempTd.click(tdClick);         
     });*/ 
	 tempInput.keyup(function(event){//按下enter键时将input恢复到td状态
	    var myEvent = event || window.event;
	    var kcode = myEvent.keyCode;
	    if(kcode == 13){
	     //获取input的值
	     var val = tempInput.val();
	     //将td之间的文本值重新设置为input的值
	     tempTd.html(val);
	     tempTd.click(tdClick);
	    }
	 });
	 tempTd.append(tempInput);//将创建的input放进td中
	 var valueNode=tempInput.get(0);//设置input值为高亮选中,因为jquery中时没有select方法的，故将其转换成原生js对象
	 valueNode.select();
	 tempTd.unbind("click"); //移除td的click事件
}

//删除接口或插槽
function del(id){
	//alert(id);
	$("#portSlotInfo tr:eq("+id+")").remove();
	count--;
	 $("#newFixList").find("option").attr("selected",false);
	 $("#newSocketList").find("option").attr("selected",false);
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
	  var xPos=mPos.x - iPos.x;
	  var yPos=mPos.y - iPos.y;
	  
	   break;
	 }
	 return (xPos+","+yPos);
}


