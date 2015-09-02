// var data=[
//           {"className":"1班"},
//           {"className":"2班"},
//           {"className":"3班"},
//          ];// var data=[
//           {"className":"1班"},
//           {"className":"2班"},
//           {"className":"3班"},
//          ];
//修改用户密码
function rePass(){
	$(".page3").dialog("open");
	
}
//页面展示方法
function showclaTable(data){
	$("#classTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].className+"</td>";
		textHtml+="<td>"+data[i].major+"</td>";
		textHtml+="<td>"+data[i].startTime+"</td>";
		textHtml+="<td>"+data[i].level+"</td>";
		textHtml+="<td>"+data[i].remark+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].classNum+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#classTable tbody").append(textHtml);
	};
}

//编辑班级表
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
	var remark=$("#classTable tbody tr").eq(parseInt(id)).children().eq(5).html();
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

//删除班级
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
	//var itemnumber=$("#itemnumber").val();
	$.ajax({
		type:"post",
		url:"/servlet/listAdClass",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").addClass(" allnoderesult");
			//$(".pagination").append("<div style='color:red'>aaaaa</div>");
			$("pagination").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<3;i++){
				if(i==1){
					$(".allnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".allnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
		//	showclaTable(data);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					var page = Number(currentPage - 1);
					$(".allnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./xd.simu.servlet/listAdClass",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showclaTable(data);
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
					currentPage = Number(currentPage + 1);
					$(".allnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listAdClass",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showclaTable(data);
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
					url: "./servlet/listAdClass",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showclaTable(data);
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
		url:"./servlet/searchAdClass",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").addClass(".remaindnoderesult");
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
					var page = Number(currentPage - 1);
					$(".remaindnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchAdClass",
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
					currentPage = Number(currentPage + 1);
					$(".remaindnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchAdClass",
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
					url: "../../searchAdClass",
					data: {
						page: currentpage,
						item: itemnumber,
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
	$(".page1").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改班级信息"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加班级信息"
	});
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	$("#AddComp").click(function(){
		$.ajax({
			url:"listTeacher",
			type:"post",
			success:function(data){
				for(var i=0;i<data.length;i++){
					$("#comptea").append("<option>"+data[i].teachName+"</option>");
				}
			}
		});
		$(".page2").dialog("open");
	});
	showAll();
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		if(stype=="major"){
			$.ajax({
				type:"post",
				url:"./servlet/listMajor",
				success:function(data){
					$(".filtertype").append("<select name='major' class='input-sm' id='searchvalue'>");
					for(var i=0;i<data.major.length;i++){
						$(".filtertype").append("<option value='"+data[i].majorID+"'>"+data[i].majorName+"</option>");
					}
					$(".filtertype").append("</select>");
				}
			});
		}
		else if(stype=="level"){
			$(".filtertype").append("<select name='level' class='input-sm' id='searchvalue'>"
										+"<option value='postgraduate'>硕士研究生</option>"
										+"<option value='graduate'>本科</option>"
										+"<option value='associate'>专科</option>"
										+"<option value='other'>4+1</option>"
										+"</select>");
		}
		else if(stype=="startTime"){
			var option="";		
			var time=new Date().getFullYear();
			for(var i=0;i<10;i++){
				option+="<option value='"+(time-i)+"'>"+(time-i)+"</option>";
			}
			$(".filtertype").append("<select name='time' class='input-sm' id='searchvalue'>"+option+"</select>");
		}
		else if(stype=="className"){
			var option="";
			$.ajax({
				url:"./xd.simu.servlet/listAdClass",
				type:"post",
				success:function(data){
					for(var i=0;i<data.length;i++){
						option+="<option>"+data[i].className+"</option>";
					}
					$(".filtertype").append("<select name='classname' class='input-sm' id='searchvalue'>"+option+"</select> ");
				}
			});
			
			
		}
		else if(stype=="className"||stype=="other"){
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
		else if(type=="other"||type=="className"||type=="major"||type=="level"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加班级
	$("#AddComp").click(function(){
		$(".page2").dialog("open");
		//此处select是列举专业
		/*$.ajax({	
			type:"psot",
			url:"./servlet/listMajor",
			success:function(data){
				for(var i=0;i<data.length;i++){
				$("#newCompClassPro").append("<option value="+data[i].majorID+">"+data[i].majorName+"</option>");
				}
			}			
		});
		//列举出近十年的时间
		var time=new Date().getFullYear();
		for(var i=0;i<10;i++){
			$("#newCompClassTime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
		}
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
		});*/
		
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


//页面展示方法
function showclaTable(data){
	$("#classTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].className+"</td>";
		textHtml+="<td>"+data[i].major+"</td>";
		textHtml+="<td>"+data[i].startTime+"</td>";
		textHtml+="<td>"+data[i].level+"</td>";
		textHtml+="<td>"+data[i].remark+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].classNum+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#classTable tbody").append(textHtml);
	};
}

//编辑班级表
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
	var remark=$("#classTable tbody tr").eq(parseInt(id)).children().eq(5).html();
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

//删除班级
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
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
/*无条件搜索*/
function showAll(){
	//var itemnumber=$("#itemnumber").val();
	$.ajax({
		type:"post",
		url:"/servlet/listAdClass",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").addClass(" allnoderesult");
			//$(".pagination").append("<div style='color:red'>aaaaa</div>");
			$("pagination").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<3;i++){
				if(i==1){
					$(".allnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".allnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
		//	showclaTable(data);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					var page = Number(currentPage - 1);
					$(".allnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./xd.simu.servlet/listAdClass",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showclaTable(data);
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
					currentPage = Number(currentPage + 1);
					$(".allnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listAdClass",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showclaTable(data);
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
					url: "../../listAdClass",
					data: {
						page: currentpage,
						numType: itemnumber
					},
					success: function(data) {
						showclaTable(data);
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
		url:"./servlet/searchAdClass",
		data:{page:"1",item:itemnumber},
		success:function(data){
			$(".pagination").addClass(".remaindnoderesult");
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
					var page = Number(currentPage - 1);
					$(".remaindnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchAdClass",
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
					currentPage = Number(currentPage + 1);
					$(".remaindnoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchAdClass",
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
					url: "../../searchAdClass",
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
	$(".page1").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改班级信息"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加班级信息"
	});
	$("#addClass").click(function(){
		$.ajax({
			url:"listTeacher",
			type:"post",
			success:function(data){
				for(var i=0;i<data.length;i++){
					$("#comptea").append("<option>"+data[i].teachName+"</option>");
				}
			}
		});
		$(".page2").dialog("open");
	});
	showAll();
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		if(stype=="major"){
			$.ajax({
				type:"post",
				url:"./servlet/listMajor",
				success:function(data){
					$(".filtertype").append("<select name='major' class='input-sm' id='searchvalue'>");
					for(var i=0;i<data.major.length;i++){
						$(".filtertype").append("<option value='"+data[i].majorID+"'>"+data[i].majorName+"</option>");
					}
					$(".filtertype").append("</select>");
				}
			});
		}
		else if(stype=="level"){
			$(".filtertype").append("<select name='level' class='input-sm' id='searchvalue'>"
										+"<option value='postgraduate'>硕士研究生</option>"
										+"<option value='graduate'>本科</option>"
										+"<option value='associate'>专科</option>"
										+"<option value='other'>4+1</option>"
										+"</select>");
		}
		else if(stype=="startTime"){
			var option="";		
			var time=new Date().getFullYear();
			for(var i=0;i<10;i++){
				option+="<option value='"+(time-i)+"'>"+(time-i)+"</option>";
			}
			$(".filtertype").append("<select name='time' class='input-sm' id='searchvalue'>"+option+"</select>");
		}
		else if(stype=="className"){
			var option="";
			$.ajax({
				url:"./xd.simu.servlet/listAdClass",
				type:"post",
				success:function(data){
					for(var i=0;i<data.length;i++){
						option+="<option>"+data[i].className+"</option>";
					}
					$(".filtertype").append("<select name='classname' class='input-sm' id='searchvalue'>"+option+"</select> ");
				}
			});
			
			
		}
		else if(stype=="className"||stype=="other"){
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
		else if(type=="other"||type=="className"||type=="major"||type=="level"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加班级
	$("#addClass").click(function(){
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
		//列举出近十年的时间
		var time=new Date().getFullYear();
		for(var i=0;i<10;i++){
			$("#newCompClassTime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
		}
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
	});

