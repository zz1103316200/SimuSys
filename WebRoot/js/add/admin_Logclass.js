function rePass(){
	$(".page3").dialog("open");
}
//var data=[
//		{"className":"1班","classNum":"10132","marjor":"软件工程","classPro":"选修课","teacher":"鲍亮","course":"将设计体系机构","startTime":"2014","level":"硕士研究生","remark":"这是第一个班级信息"},
//		{"className":"2班","classNum":"10133","marjor":"计算机","classPro":"101234","teacher":"刘西洋","course":"数理逻辑","startTime":"2014","startTime":"2015","level":"本科","remark":"这是第二个班级信息"}
//		];
//页面展示方法
function showclaTable(data){
	$("#classTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].className+"</td>";
		textHtml+="<td>"+data[i].classNum+"</td>";
		textHtml+="<td>"+data[i].courseProperty+"</td>";
		textHtml+="<td>"+data[i].teachName+"</td>";
		textHtml+="<td>"+data[i].courseName+"</td>";
		textHtml+="<td>"+data[i].startTime+"</td>";
		//textHtml+="<td>"+data[i].level+"</td>";
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
	//此处select是列举教师
	 $.ajax({	
	 	type:"post",
	 	url:"./servlet/listRelevantLogicClass",
	 	success:function(data){
	 		for(var i=0;i<data.teacherTab.length;i++){
	 		$("#compteacher").append("<option value="+data.teacherTab[i].teacherNum+">"+data.teacherTab[i].teacherName+"</option>");
	 		}
	 	}			
	 });//classTab,teacherTab,courseTavb
	//列出课程
	 $.ajax({
		 type:"post",
		 url:"./servlet/listRelevantLogicClass",
		 success:function(data){
			 for(var i=0;i<data.courseTavb.length;i++){
			 		$("#compcourse").append("<option value="+data.courseTavb[i].courseNum+">"+data.courseTavb[i].courseName+"</option>");
			 		}
		 }
	 });
	//列出课程性质
	 $.ajax({
		 type:"post",
		 url:"./servlet/listRelevantLogicClass",
		 success:function(data){
			 for(var i=0;i<data.classTab.length;i++){
			 		$("#comppro").append("<option value="+data.classTab[i].classNum+">"+data.classTab[i].classNum+"</option>");
			 		}
		 }
	 });
	//列举出近十年的时间
	var time=new Date().getFullYear();
	for(var i=0;i<10;i++){
		$("#comptime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
	}
	var className=$("#classTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var remark=$("#classTable tbody tr").eq(parseInt(id)).children().eq(7).html();
	$("#compname").val(className);
	//$("#complevel").find("option[text='"+level+"']").attr("selected",true); 
	$("#comptext").val(remark);
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var compname=$("#compname").val();
		var comppro=$("#comppro").val();		
		var compteacher=$("#compteacher").val();
		var compcourse=$("#compcourse").val();
		var comptime=$("#comptime").val();
		var comptext=$("#comptext").val();
		$.ajax({
			type:"post",
			url:"./servlet/editLogClass",
			data:{
				classNum:tempid,
				className:compname,
				pro:comppro,
				teacher:compteacher,
				course:compcourse,
				startTime:comptime,
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
			url:"./servlet/deleteLogicClass",
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
	$.ajax({
		type:"post",
		url:"./servlet/listLogClass",
		data:{page:"1",item:itemnumber},
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
			showclaTable(data.Tables);

			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").parent().click(function() {
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					 currentPage = Number(currentPage)-1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listLogClass",
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
			$(".allnoderesult .fa-chevron-right").parent().click(function() {
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage) + 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listLogClass",
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
				$(".allnoderesult li").removeClass("active");
				$(this).addClass("active");
				currentpage = $(this).find("a").html();
				$.ajax({
					type: "post",
					url: "./servlet/listLogClass",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showclaTable(data.Tables);
					}
				});
			});
		}
	});
}

//按入学时间搜索
/*function showClassTime(){
	var itemnumber=$("#itemnumber").val();
	var searchtype=$("#search-type").val();
	var serchresult=$("#searchvalue").val();
	$.ajax({
		type:"post",
		url:"./servlet/searchClass",
		data:{
			page:"1",
			item:itemnumber,
			search_type:searchtype,
			key:start
		},
		success:function(data){
			$(".pagination").addClass(".ctimenoderesult");
			$(".ctimenoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<data.pages;i++){
				if(i==1){
					$(".ctimenoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".ctimenoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".ctimenoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showclaTable(data);

			//点击上一页之后
			$(".ctimenoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".ctimenoderesult .active a").html();
				if (currentPage > 1) {
					var page = Number(currentPage - 1);
					$(".ctimenoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchClass",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:start
						},
						success: function(data) {
							showclaTable(data);
						}
					});
				} 
			});

			//点击下一页之后
			$(".ctimenoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".ctimenoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage + 1);
					$(".ctimenoderesult li").removeClass(".active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchClass",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:start
						},
						success: function(data) {
							showclaTable(data);
						}
					});
				} 
			});
			//点击页数之后
			$(".ctimenoderesult .changenum").click(function() {
				$(".ctimenoderesult li").removeClass("active");
				$(this).addClass("active");
				var currentpage = $(this).find("a").html();
				$.ajax({
					type: "post",
					url: "./servlet/searchClass",
					data: {
						page: currentpage,
						item: itemnumber,
						search_type:searchtype,
						key:start
					},
					success: function(data) {
						showclaTable(data);
					}
				});
			});
		}
	});
}*/

//其他
function showRemainder(){
	var itemnumber=$("#itemnumber").val();
	var searchtype=$("#search-type").val();
	var searchvalue=$("#searchvalue").val();
	$.ajax({
		type:"post",
		url:"./servlet/searchLogClass",
		data:{
			page:"1",
			search_type:searchtype,
			item:itemnumber,
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
			showclaTable(data.Tables);

			//点击上一页之后
			$(".remaindnoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage > 1) {
					 currentPage = Number(currentPage) - 1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchLogClass",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showclaTable(data.Tables);
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
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchLogClass",
						data: {
							page: currentPage,
							item: itemnumber,
							search_type:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showclaTable(data.Tables);
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
					url: "./servlet/searchLogClass",
					data: {
						page: currentpage,
						item: itemnumber,
						search_type:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showclaTable(data.Tables);
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
//	$("#addClass").click(function(){
//		$(".page2").dialog("open");
//	});
	showAll();
	var courseName="";
	var TeacherName="";
	var className="";
	$.ajax({
		type:"post",
		url:"./servlet/listRelevantLogicClass",
		success:function(data){
			for(var i=0;i<data.courseTavb.length;i++){
				courseName+="<option value="+data.courseTavb[i].courseName+">"+data.courseTavb[i].courseName+"</option>";
			}
			for(var i=0;i<data.teacherTab.length;i++){
				TeacherName+="<option value="+data.teacherTab[i].teacherNum+">"+data.teacherTab[i].teacherName+"</option>";
			}
			for(var i=0;i<data.classTab.length;i++){
				className+="<option value="+data.classTab[i].classNum+">"+data.classTab[i].className+"</option>";
			}
		}
	});
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		switch(stype){
			case "courseName":
				$(".filtertype").append("<select name='time' class='input-sm' id='searchvalue'>"+courseName+"</select>");break;
			case "TeacherName":
				$(".filtertype").append("<select name='time' class='input-sm' id='searchvalue'>"+TeacherName+"</select>");break;
			case "startTime":
			var option="";
			var time=new Date().getFullYear();
			for(var i=0;i<10;i++){
				option+="<option value='"+(time-i)+"'>"+(time-i)+"</option>";
			}
			$(".filtertype").append("<select name='time' class='input-sm' id='searchvalue'>"+option+"</select>");break;
			case "classNum":
			case "className":
				$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'>");break;
		}
	});

	//点击搜索
	$("#searchservice").click(function(){
		var type = $("#search-type").val();
		if(type=="all"){
			$(".pagination").empty();
			$(".pagination").removeClass("allnoderesult");
			$(".pagination").removeClass("stimenoderresult");
			$(".pagination").removeClass("remaindnoderesult");
			showAll();
		}
		else if(type=="className"||type=="classNum"||type=="courseName"||type=="TeacherName"||type=="startTime"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			$(".pagination").removeClass("stimenoderresult");
			showRemainder();
		}
	});
	//添加班级
	$("#addClass").click(function(){
		//此处select是列举教师
		 $.ajax({	
		 	type:"post",
		 	url:"./servlet/listRelevantLogicClass",
		 	success:function(data){
		 		for(var i=0;i<data.teacherTab.length;i++){
		 		$("#newCompTea").append("<option value="+data.teacherTab[i].teacherNum+">"+data.teacherTab[i].teacherName+"</option>");
		 		}
		 	}			
		 });//classTab,teacherTab,courseTavb
		//列出课程
		 $.ajax({
			 type:"post",
			 url:"./servlet/listRelevantLogicClass",
			 success:function(data){
				 for(var i=0;i<data.courseTavb.length;i++){
				 		$("#newCompCourse").append("<option value="+data.courseTavb[i].courseNum+">"+data.courseTavb[i].courseName+"</option>");
				 		}
			 }
		 });
		//列出课程性质
		 $.ajax({
			 type:"post",
			 url:"./servlet/listRelevantLogicClass",
			 success:function(data){
				 for(var i=0;i<data.classTab.length;i++){
				 		$("#newPro").append("<option value="+data.classTab[i].classNum+">"+data.classTab[i].classNum+"</option>");
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
			var newPro=$("#newPro").val();
			var newCompTea=$("#newCompTea").val();
			var newCompCourse=$("#newCompCourse").val();
			var newCompClasslevel=$("#newCompClasslevel").val();
			var newCompClassTime=$("#newCompClassTime").val();
			var newCompClassText=$("#newCompClassText").val();
			$.ajax({
				type: "post",
				url: "./servlet/addLogicClass",
				data: {
					className: newCompClassName,
					classNum: newCompClassId,
					pro: newPro,//添加课程性质
					teacher:newCompTea,//添加教员
					course:newCompCourse,//添加课程
					startTime: newCompClassTime,
					level: newCompClasslevel,
					remark: newCompClassText
				},
				success: function(resp) {
					if (resp == "success") {
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

