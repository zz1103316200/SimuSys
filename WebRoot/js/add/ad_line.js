function rePass(){
	$(".page3").dialog("open");
}
//页面展示
function showLineTable(data){
	$("#lineTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].lineName+"</td>";
		textHtml+="<td>"+data[i].lineType+"</td>";
		textHtml+="<td>"+data[i].lineConnList+"</td>";
		textHtml+="<td>"+data[i].lineDes+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].lineID+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#lineTable tbody").append(textHtml);
	};
}

//编辑线缆信息
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	var lineName=$("#lineTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var lineDes=$("#lineTable tbody tr").eq(parseInt(id)).children().eq(4).html();
	$(".page1").dialog("open");
	$("#lineName").val(lineName);
	$("#lineDes").val(lineDes);
	//列举编辑线缆所需信息
	/*$.ajax({
		type:"post",
		url:"./servlet/listLineInfo",
		success:function(data){
			//列举线缆类型
			for(var i=0;i<data.linetypeTabs.length;i++){
				$("#lineType").append("<option value="+data[i].lineType+">"+data[i].lineType+"</option>");
			}
			//列举线缆接头名称
			for(var i=0;i<data.lineConnTabs.length;i++){
				$("#lineList").append("<option value="+i+">"+data[i].connectors+"</option>");
			}
		}
	});*/
	/*var lineConnListNum=$("#lineTable tbody tr").eq(parseInt(id)).children().eq(3).html();
	var txt1=new Array();
	txt1=lineConnListNum.split(",");
	var lineConnArray=new Array();//存放所有线缆接头
	for(var i=0;i<txt1.length;i++){
		lineConnArray[i]=txt1[i].split("(")[0];
	}
	
	var lineConnNumArray=new Array();//存放各接头的个数
	for(var i=0;i<txt1.length;i++){
		var len=txt1[i].split("(")[1].length;
		lineConnNumArray[i]=txt1[i].split("(")[1].substr(0,len-1);
	}*/
	//点击确定之后
	$("#editSubmit").click(function(){
		var newLineName=$("#lineName").val();
		//var newLineType=$("#lineType");
		var newLineDes=$("#lineDes").val();
		//var newLineConnList="";
		/*for(var i=0;i<lineConnNumArray.length;i++){
			newLineConnList+=lineConnArray[i]+"("+lineConnNumArray[i]+")"+",";
		}*/
		$.ajax({
			type:"post",
			url:"./servlet/editLine",
			data:{
				lineNum:tempid,
				lineName:newLineName,
				//lineType:newLineType,
				//lineConnList:newLineConnList,
				lineDes:newLineDes
			},
			success:function(resp){
				if(resp == "success"){
					alert("修改线缆成功！");
					location.reload();
				}
				else if(resp == "unsuccess") {
					alert("修改线缆失败！");
				}
			}
		});
	});
}

//删除线缆
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	//alert(tempid);
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deleteLine",
			data:{
				lineNum:tempid
			},
			success:function(resp){
				if(resp=="success"){
					alert("删除线缆成功！");
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
		url:"./servlet/listLine",
		data:{
			page:"1",
			item:itemnumber},
		success:function(data){
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
			showLineTable(data.Tables);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//alert(itemnumber);
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					currentPage = Number(currentPage) - 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listLine",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showLineTable(data.Tables);
						}
					});
				} 
			});

			//点击下一页之后
			$(".allnoderesult .fa-chevron-right").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				//alert(itemnumber);
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage) + 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listLine",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showLineTable(data.Tables);
						}
					});
				} 
			});
			//点击页数之后
			$(".allnoderesult .changenum").click(function() {
				var itemnumber = $("#itemnumber").val();
				//alert(itemnumber);
				$(".allnoderesult li").removeClass("active");
				$(this).addClass("active");
				var currentpage = $(this).find("a").html();
				$.ajax({
					type: "post",
					url: "./servlet/listLine",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showLineTable(data.Tables);
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
	//alert(searchtype);
	$.ajax({
		type:"post",
		url:"./servlet/searchLine",
		data:{
			page:"1",
			item:itemnumber,
			level:searchtype,
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
			showLineTable(data.Tables);
			
			//点击上一页之后
			$(".remaindnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage > 1) {
					currentPage = Number(currentPage) - 1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchLine",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showLineTable(data.Tables);
						}
					});
				} 
			});
			
			//点击下一页之后
			$(".remaindnoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage + 1);
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchLine",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showLineTable(data.Tables);
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
					url: "../../searchLine",
					data: {
						page: currentpage,
						item: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showLineTable(data.Tables);
					}
				});
			});
		}
	});
}

var connNumA=0;//线缆A端接头个数
var connNumB=0;//线缆B端接头个数
$(function(){
	new uploadPreview({ UpBtn: "img_up", DivShow: "img_div", ImgShow: "img_show" });
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
		if(stype =="cableName"||stype =="cableStyle"){
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
	
	
	//添加线缆
	$("#addLine").click(function(){
		//列举添加线缆所需信息
		$(".page2").dialog("open");
		
		/*var newLineConnArray=new Array();//用于保存接头名字
		var newLineConnNumArray=new Array();//用于保存各接头个数
		
		$("#newLineList").change(function(){//选择某个接头后点击选择该接口的个数保存到数组中
			var txt=$("#newLineList").find("option:selected").text();//得到选中的接头名字
			var value=$("#newLineList").val();//得到该接口的value值
			if($.inArray(txt,"newLineConnArray")==-1){//如果该接口不在数组中
				newLineConnArray[value]=txt;
			}
			$("#newLineListNum").change(function(){
				var text= $("#newLineListNum").find("option:selected").text();//得到选中的接口个数
				newLineConnNumArray[value]=text.split("个")[0];
				//alert(newFixNumArray);
			});				
		});
		
		var newLineConnList="";//线缆接头名称及其数量
		for(var i=0;i<newLineConnArray.length;i++){
			newLineConnList+=newLineConnArray[i]+"("+newLineConnNumArray[i]+")"+",";
		}*/
		
		//点击添加A端接头
		$("#newConnA").click(function(){
			$(".ConnContentA").css("display","block");
			$(".ConnContentB").css("display","none");
			//var valuestring = ".value"+connNumA;
			//alert(connNumA);
			var appendInfo = "<div class='form-group value"+connNumA+"'>";
			appendInfo +="<label class='control-label col-md-2'>A端接头"+(connNumA+1)+"：</label>";
			appendInfo +="<div class='col-md-10'>";
			appendInfo +="<div class='col-md-2'><select class='input-sm connType'><option value=''>接头类型</option><option value='conn1'>conn1</option>" +
					"<option value='conn2'>conn2</option></select></div>";
			appendInfo +="<label class='control-label col-md-2'>接头个数: </label>";
			appendInfo +="<div class='col-md-4'>";
			appendInfo +="<div class='spinner'><div class='input-group input-small'><input type='text' class='spinner-input form-control' maxlength='3' readonly>";
			appendInfo +="<div class='spinner-buttons input-group-btn btn-group-vertical'><button type='button' class='btn spinner-up btn-xs white'>" +
					"<i class='fa fa-angle-up'></i></button><button type='button' class='btn spinner-down btn-xs white'><i class='fa fa-angle-down'></i></button></div></div></div></div>";
			appendInfo +="</div>";
			appendInfo +="</div>";
			$(this).parent().parent().parent().find(".ConnContentA").append(appendInfo);
			connNumA++;
			App.init();
            ComponentsFormTools.init();
		});
		
		//点击添加B端接头
		$("#newConnB").click(function(){
			$(".ConnContentB").css("display","block");
			$(".ConnContentA").css("display","none");
			//var valuestring = ".value"+connNumA;
			//alert(connNumA);
			var appendInfo = "<div class='form-group value"+connNumB+"'>";
			appendInfo +="<label class='control-label col-md-2'>B端接头"+(connNumB+1)+"：</label>";
			appendInfo +="<div class='col-md-10'>";
			appendInfo +="<div class='col-md-2'><select class='input-sm connType'><option value=''>接头类型</option><option value='conn1'>conn1</option>" +
			"<option value='conn2'>conn2</option></select></div>";
			appendInfo +="<label class='control-label col-md-2'>接头个数: </label>";
			appendInfo +="<div class='col-md-4'>";
			appendInfo +="<div class='spinner'><div class='input-group input-small'><input type='text' class='spinner-input form-control' maxlength='3' readonly>";
			appendInfo +="<div class='spinner-buttons input-group-btn btn-group-vertical'><button type='button' class='btn spinner-up btn-xs white'>" +
					"<i class='fa fa-angle-up'></i></button><button type='button' class='btn spinner-down btn-xs white'><i class='fa fa-angle-down'></i></button></div></div></div></div>";
			appendInfo +="</div>";
			appendInfo +="</div>";
			$(this).parent().parent().parent().find(".ConnContentB").append(appendInfo);
			connNumB++;
			App.init();
            ComponentsFormTools.init();
		});
		
		$(".page2 form").keypress(function(e) {//放置按下回车键时form表单提交
			  if (e.which == 13) {
			    return false;
			  }
		});
		$("#addSubmit").click(function(){
			var connA='[';
			//获得线缆A端接头
			var lenA=$(".ConnContentA>div").length;
			if(lenA == 0){
				connA="";
			}else{
				for(var i=0;i<lenA;i++){
					var connType=$(".value"+i+" .connType").val();
					var num=$(".value"+i+" .spinner-input").val();
					connA+='{"connType":"'+connType+'","num":"'+num+'"},';
				}
				connA=connA.substring(0, connA.length-1);
				connA+=']';
			}
			
			var connB='[';
			//获得线缆A端接头
			var lenB=$(".ConnContentB>div").length;
			if(lenB == 0){
				connB="";
			}else{
				for(var i=0;i<lenB;i++){
					var connType=$(".value"+i+" .connType").val();
					var num=$(".value"+i+" .spinner-input").val();
					connB+='{"connType":"'+connType+'","num":"'+num+'"},';
				}
				connB=connB.substring(0, connB.length-1);
				connB+=']';
			}
			var newLineName=$("#newLineName").val();
			//var newLineNum=$("#newLineNum");
			var newLineType=$("#newLineType").val();
			var newLineDes=$("#newLineDes").val();
			var lineUrl=$("#img_up").val().split("\\")[$("#img_up").val().split("\\").length-1];//线缆侧栏图片
			var lineStyle=$("#mycolor").val();//线缆的样式
			var lineConn='{"A":'+connA+',"B":'+connB+'}';
			//alert("lineUrl:"+lineUrl+", lineConn:"+lineConn+", lineStyle:"+lineStyle);
			/*$.post("./servlet/addLine",{lineName:newLineName},function(text){
				alert("jinqule");
			});*/
			$.ajax({
				type:"post",
				url:"./servlet/addLine",
				data:{
					lineName:newLineName,
					//lineNum:newLineNum,
					lineType:newLineType,
					lineUrl:lineUrl,
					lineConnList:lineConn,
					lineStyle:lineStyle,
					lineDes:newLineDes
				},
				success:function(resp) {
					if (resp == "success") {
						alert("添加线缆成功！");
						location.reload();
					} else if (resp == "unsuccess"){
						alert("添加线缆失败");
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
