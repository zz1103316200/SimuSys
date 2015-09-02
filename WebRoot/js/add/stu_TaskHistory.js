
var data=[
          {"className":"1班"},
          {"className":"2班"},
          {"className":"3班"},
         ];
function rePass(){
	$(".page3").dialog("open");
}
//页面展示方法
function showclaTable(data){
	console.log(data);
	$("#stuTask tbody").empty();
	for (var i=0;i<data.length;i++) {
		
		var textHtml="<tr id='"+data[i].taskId+"'>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].taskName+"</td>";
		textHtml+="<td>"+data[i].teaName+"</td>";
		textHtml+="<td>"+data[i].makeTime+"</td>";
		textHtml+="<td>"+data[i].description+"</td>";
		
		textHtml+="<td>"+data[i].taskTarget+"</td>";
		textHtml+="<td>"+data[i].submitTime+"</td>";
		textHtml+="<td>"+data[i].grade+"</td>";
		textHtml+="<td>"+data[i].valution+"</td>";
		textHtml+="<td><a href='./graph/student_ShowTask.jsp?taskId="+data[i].taskId+"' class='btn btn-primary deleteservice btn-sm' ><i class='fa fa-gear'></i>&nbsp;&nbsp;查看</a></td>"
				   /*+"<td><a class='btn btn-primary deleteservice btn-sm' ><i class='fa fa-gear'></i>&nbsp;&nbsp;详细</a></td>"*/;
		textHtml+="</tr>";
		$("#stuTask tbody").append(textHtml);
	};
}

//编辑作业表
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	//此处select是列举专业
	$.ajax({	
		type:"psot",
		url:"./servlet/listMajor",
		success:function(data){
			for(var i=0;i<data.length;i++){
			$("#comppro").append("<option value="+data[i].majorID+">"+data[i].majorName+"</option>");
			}
		}			
	});
	//列举出近十年的时间
	var time=new Date().getFullYear();
	for(var i=0;i<10;i++){
		$("#comptime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
	}
	var className=$("#classTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var remark=$("#classTable tbody tr").eq(parseInt(id)).children().eq(6).html();
	$("#compname").val(className);
	$("#comptext").val(remark);
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var compname=$("#compname").val();
		var comppro=$("#comppro").val();
		var comptime=$("#comptime").val();
		var complevel=$("#complevel").val();
		var comptext=$("#comptext").val();
		$.ajax({
			type:"post",
			url:"./servlet/editAdClass",
			data:{
				classNum:tempid,
				className:compname,
				startTime:comptime,
				major:comppro,
				level:complevel,
				remark:comptext
			},
			success:function(resp){
				if(resp=="success"){
					alert("修改班级成功！");
					location.reload();
				}
				else {
					alert("修改班级失败！");
				}
			}
		});
	});
}

//删除作业
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deleteAdClass",
			data:{
				classNum:tempid
			},		success:function(resp){
				if(resp=="success"){
					alert("删除班级成功！");
					location.reload();
				}
			}
		});
	}
	
}
/*无条件搜索*/
function showAll(){
	var itemnumber=$("#itemnumber").val();
	//alert("jinlaiel");
	//alert(itemnumber);
	$.ajax({
		type:"post",
		url:"./servlet/listTaskHis",
		data:{page:"1",item:itemnumber,stuNum:$("#login_username").html()},
		success:function(data){
			$(".pagination").addClass("allnoderesult");
			//$(".pagination").append("<div style='color:red'>aaaaa</div>");
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
			showclaTable(data.Tables);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					 currentPage = Number(currentPage)-1;
					 //alert(currentPage);
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listTaskHis",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showclaTable(data.Tables);
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
					currentPage = Number(currentPage)+1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listTaskHis",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showclaTable(data.Tables);
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
					url: "./servlet/listTaskHis",
					data: {
						page: currentpage,
						numType: itemnumber
					},
					success: function(data) {
						showclaTable(data.Tables);
					}
				});
			});
		}
	});
}

//其他
function showRemainder(){
	var itemnumber=$("#itemnumber").val();
	var searchtype=$("#search-type").val();
	var searchvalue=$("#searchrvalue").val();
	$.ajax({
		type:"post",
		url:"./servlet/searchTask",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").addClass("remaindnoderesult");
			$(".remaindnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<data.pages;i++){
				if(i==1){
					$(".remaindnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".remaindnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".remaindnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showclaTable(data);

			//点击上一页之后
			$(".remaindnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage > 1) {
					var page = Number(currentPage)-1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchTask",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showclaTable(data);
						}
					});
				} 
			});

			//点击下一页之后
			$(".remaindnoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage)+1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchTask",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showclaTable(data);
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
					url: "./servlet/searchTask",
					data: {
						page: currentpage,
						numType: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showclaTable(data);
					}
				});
			});
		}
	});
}

$(function(){
	//alert("tssss");
//	var time=new Date().getFullYear();
//	for(var i=0;i<10;i++){
//		$("#newCompClassTime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
//	}
	$(".page1").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改作业信息"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加作业信息"
	});
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	//console.log("ddddsad")
	//console.log(window.location.search);
	//login_username
	//$("#login_username").html(getUserName(window.location.search));
	//updateHref();
	//alert($("#total li a").eq(0).attr("href"));
	$("#AddComp").click(function(){
		//alert("helllo");
		$(".page2").dialog("open");
	});
	showAll();
	$("#search-type").change(function(){
	//	alert($(this).val());
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		if(stype=="taskState"){
			$(".filtertype").append("<select name='level' class='input-sm' id='searchvalue'>"
										+"<option value='unFinished'>未批改</option>"
										+"<option value='allFinished'>已批改</option>"
										+"<option value='partFinished'>部分批改</option>"
										
										+"</select>");
		}
		else if(stype=="taskTarget"){
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
		}
		else if(type=="taskState"||type=="taskTarget"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加班级
	$("#addClass").click(function(){
		//列举出近十年的时间
		var time=new Date().getFullYear();
		for(var i=0;i<10;i++){
			$("#newCompClassTime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
		}
		//此处select是列举专业
		$.ajax({	
			type:"psot",
			url:"./servlet/listMajor",
			success:function(data){
				for(var i=0;i<data.length;i++){
				$("#newCompClassPro").append("<option value="+data[i].majorID+">"+data[i].majorName+"</option>");
				}
			}			
		});
		$(".page2").dialog("open");
		$("#addClassOk").click(function(){
		var newCompClassName=$("#newCompClassName").val();
		var newCompClassId=$("#newCompClassId").val();
		var newCompClassPro=$("#newCompClassPro").val();
		var newCompClassTime=$("#newCompClassTime").val();
		var newCompClassLevel=$("#newCompClassLevel").val();
		var newCompClassText=$("#newCompClassText").val();
		$.ajax({
			type: "post",
			url: "./servlet/addAdClass",
			data: {
				className: newCompClassName,
				classNum: newCompClassId,
				major: newCompClassPro,
				startTime: newCompClassTime,
				level: newCompClassLevel,
				remrk: newCompClassText
			},
			success: function(resp) {
				if (resp = "success") {
					alert("添加班级成功！");
					location.reload();
				} else {
					alert("添加班级失败");
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
					type:"student"
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
	//根据url得到用户名
    function getUserName(str){
    	var name="";
    	if (str.indexOf('name')!=-1){        
            var pos_start=str.indexOf('name')+5;
            var pos_end=str.indexOf("&",pos_start);
           
            if (pos_end==-1){
               name=str.substring(pos_start);
            }else{
                alert("没有此值~~");
            }
         
        }
    	return name;   
    }
    	
  //为所有连接带上用户名
    function updateHref(){
    	//alert($("#total li a").eq(0).html());
    	$("#total li a").eq(0).attr("href","student_ChooseCourse.html?name="+getUserName(window.location.search));
    	//alert($("#total li a").eq(0).attr("href"));
    	$("#total li a").eq(1).attr("href","student_TaskUnfinished.html?name="+getUserName(window.location.search));
    	$("#total li a").eq(2).attr("href","student_TaskHistory.html?name="+getUserName(window.location.search));
    }	
   