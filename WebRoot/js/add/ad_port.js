function rePass(){
	$(".page3").dialog("open");
}
//页面展示
function showPortTable(data){
	//alert(JSON.stringify(data));
	$("#portTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var portPara="";//参数列表
		//alert(JSON.parse(data[i].portList));
		for(var j=0;j<data[i].portList.length;j++){
			portPara+=data[i].portList[j].name+",";
		}
		portPara=portPara.substring(0,portPara.length-1);
		//alert(portPara);
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].portName+"</td>";
		textHtml+="<td>"+data[i].PortType+"</td>";
		textHtml+="<td>"+portPara+"</td>";
		textHtml+="<td>"+data[i].portDes+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].portID+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#portTable tbody").append(textHtml);
	};
}

//编辑接口
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	var portName=$("#portTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var portDes=$("#portTable tbody tr").eq(parseInt(id)).children().eq(4).html();
	$("#portName").val(portName);
	$("#portDes").val(portDes);
	//列举编辑接口所需信息
	/*$.ajax({
		type:"post",
		url:"./servlet/listPortInfo",
		success:function(data){
			for(var i=0;i<data.portTypeTabs.length;i++){
				$("#PortType").append("<option value="+data[i].interfaceStyle+">"+data[i].interfaceStyle+"</option>");
			}
			for(var i=0;i<data.parametersTabs.length;i++){
				$("#portList").append("<option value="+data[i].parameters+">"+data[i].parameters+"</option>");
			}
		}
	});*/
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var newPortName=$("#portName").val();
		//var newPortType=$("#PortType").find("option:selected").text();
		//var newPortList=$("#portList").find("option:selected").text();
		var newPortDes=$("#portDes").val();
		$.ajax({
			type:"post",
			url:"./servlet/editPort",
			data:{
				portNum:tempid,
				portName:newPortName,
				//portType:newPortType,
				//portList:newPortList,
				portDes:newPortDes,
			},
			success:function(resp){
				if(resp =="success"){
					alert("修改接口成功！");
					location.reload();
				}
				else if(resp =="unsuccess"){
					alert("修改接口失败！");
				}
			}
		});
	});
}

//删除接口
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deletePort",
			data:{
				portNum:tempid
			},		success:function(resp){
				if(resp =="success"){
					alert("删除接口成功！");
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
		url:"./servlet/listPort",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").empty();
			$(".pagination").addClass("allnoderesult");
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<=data.pages;i++){				
				if(i==1){
					$(".allnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".allnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showPortTable(data.Tables);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					currentPage = Number(currentPage) - 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listPort",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showPortTable(data.Tables);
						}
					});
				} 
			});

			//点击下一页之后
			$(".allnoderesult .fa-chevron-right").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage) + 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listPort",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showPortTable(data.Tables);
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
				$.ajax({
					type: "post",
					url: "./servlet/listPort",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showPortTable(data.Tables);
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
	//alert(searchtype +" "+searchvalue);
	$.ajax({
		type:"post",
		url:"./servlet/searchPort1",
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
			showPortTable(data.Tables);
			
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
						url: "./servlet/searchPort1",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showPortTable(data.Tables);
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
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchPort1",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showPortTable(data.Tables);
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
					url: "./servlet/searchPort1",
					data: {
						page: currentpage,
						numType: itemnumber,
						search_type:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showPortTable(data.Tables);
					}
				});
			});
		}
	});
}

var paramNum=0;//接口参数个数
$(function(){
	$(".page1").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改接口"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加接口"
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
		if(stype=="interfaceName"||stype=="interfaceStyle"||stype=="other"){
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
	//添加接口
	$("#addPort").click(function(){
		
		//列举添加接口所需信息
		/*$.ajax({
			type:"post",
			url:"./servlet/listPortInfo",
			success:function(data){
				for(var i=0;i<data.portTypeTabs.length;i++){
					$("#newportType").append("<option value="+data[i].interfaceStyle+">"+data[i].interfaceStyle+"</option>");
				}
				for(var i=0;i<data.parametersTabs.length;i++){
					$("#newportList").append("<option value="+data[i].parameters+">"+data[i].parameters+"</option>");
				}
			}
		});*/
		$(".page2").dialog("open");
		
		//点击添加属性按钮
		$("#newParameter").click(function(){
			//alert("tianjai");
			var valuestring = ".value"+paramNum;
			var appendInfo = "<div class='form-group value"+paramNum+"'><label class='control-label col-md-2'>新参数"+(paramNum+1)+"：</label>";
			appendInfo += "<div class='col-md-3'><input type='text' placeholder='参数名' class='paramName'/></div>";
			appendInfo += "<div class='col-md-2'><select class='input-sm paramType'><option value=''>参数类型</option><option value='input'>input</option><option value='select'>select</option></select>";
			$(this).parent().parent().parent().find(".paramContent").append(appendInfo);
			
			$(valuestring).find(".paramType").change(function(){
				
				var type = $(valuestring).find(".paramType").val();
				if(type == "select"){
					//alert("select");
					$(valuestring).find(".col-md-5").remove();
					$(valuestring).append("<div class='col-md-5'><input type='text' placeholder='选项值请用，分隔' class='optionvalue'/></div>");
				}else{
					$(valuestring).find(".col-md-5").remove();
				}
			});
			paramNum++;
		});
		
		
		$("#addSubmit").click(function(){
			var newPortName=$("#newportName").val();
			//var newPortNum=$("#newportNum").val();
			var newPortType=$("#newportType").val();
			//var newPortList=$("#newportList").find("option:selected").text();
			var newPortDes=$("#newportDes").val();
			var newPortList='[';
			var len=$(".paramContent>div").length;
			if(len == 0){
				newPortList="";
			}else{
				for(var i=0;i<len;i++){
					var paraName=$(".value"+i+" .paramName").val();
					var paraType=$(".value"+i+" .paramType").val();
					if(paraType == "input"){
						newPortList+='{"name":"'+paraName+'","type":"'+paraType+'"},';
					}else if(paraType == "select"){
						var option=$(".value"+i+" .optionvalue").val();
						newPortList+='{"name":"'+paraName+'","type":"'+paraType+'","option":"'+option+'"},';
					}
				}
				newPortList=newPortList.substring(0, newPortList.length-1);
				newPortList+=']';
			}
			//alert("newPortList:"+newPortList);
			//alert("newPortName:"+newPortName+",newPortNum:"+newPortNum+",newPortType:"+newPortType+",newPortList:"+newPortList+",newPortList"+newPortDes);
			$.ajax({
				type: "post",
				url: "./servlet/addPort",
				data:{
					portName:newPortName,
					//portNum:newPortNum,
					portType:newPortType,
					portList:newPortList,
					portDes:newPortDes
				},
				success: function(resp) {
					if (resp == "success") {
						alert("添加接口成功！");
						location.reload();
					} else if(resp == "unsuccess"){
						alert("添加接口失败");
					}
				}
			});
			
		});
	});
	//当每页显示个数变化之后
	$("#itemnumber").change(function(){
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
