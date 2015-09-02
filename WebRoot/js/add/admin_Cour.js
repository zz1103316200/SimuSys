function rePass(){
	$(".page3").dialog("open");
}
//页面展示方法
function showcourseTable(data){
	$("#courseTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td cid='"+data[i].courseNum+"'>"+data[i].courseName+"</td>";
		textHtml+="<td>"+data[i].teachName+"</td>";
		
		//selectable
		if(data[i].courseProperty=="selectable"){
			textHtml+="<td cid='"+data[i].classNum+"'>任选课</td>";
		}else{
			textHtml+="<td cid='"+data[i].courseProperty+"'>"+data[i].className+"</td>";
		}
		textHtml+="<td>"+data[i].periods+"</td>";
		var classTime=data[i].classTime;
		if(classTime=="first"){
			textHtml+="<td value='firse'>上学期</td>";
		}
		else if(classTime=="both"){
			textHtml+="<td value='both'>全年</td>";
		}
		else {
			textHtml+="<td value='second'>下学期</td>";
		}
		textHtml+="<td>"+data[i].remark+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].classNum+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>"
				   +"<td><a href='admin_StudentManagement.jsp' class='btn btn-primary deleteservice btn-sm' ><i class='fa fa-gear'></i>&nbsp;&nbsp;学员信息</a></td>";
		textHtml+="</tr>";
		$("#courseTable tbody").append(textHtml);
	};
}

//编辑课程表
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	var courseName=$("#courseTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var courseNum=$("#courseTable tbody tr").eq(parseInt(id)).children().eq(1).attr("cid");
	//var periods=$("#courseTable tbody tr").eq(parseInt(id)).children().eq(2).html();
	var remark=$("#courseTable tbody tr").eq(parseInt(id)).children().eq(6).html();
	$.ajax({
		type:"post",
		url:"./servlet/getTeachAndCla",
		data:{},
		success:function(text){
			console.log(text);
			for(var i=0;i<text.teacher.length;i++){
				$("#editTeacher").append("<option value='"+text.teacher[i].teaNum+"'>"+text.teacher[i].teaName+"</option>");
			}
			for(var i=0;i<text.classTable.length;i++){
				$("#editClass").append("<option value='"+text.classTable[i].claNum+"'>"+text.classTable[i].claName+"</option>");
			}
		}
	});
	$("#courseName").val(courseName);
	$("#courseNum").val(courseNum);
	$("#courseDes").val(remark);
//	$.ajax({
//		type:"post",
//		url:"./servlet/listcour_Teacher",
//		success:function(data){
//			for(var i=0;i<data.length;i++){
//				$("#Tea").append("<input type='checkbox' name='course' value='"+data[i].teachNum+"'>"+data[i].teachName);
//			}
//		}
//	});
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var courseName=$("#courseName").val();
		var courseNum=$("#courseNum").val();
		var courseDes=$("#courseDes").val();
		//var classID=$("#courseDes").val();
		var classNum=$("#editClass").val();
		var teachNum=$("#editTeacher").val();
		//var teacher=$("#teacher").val();
		//var remark=$("#courseDes").val();
		$.ajax({
			type:"post",
			url:"./servlet/editLogClass",
			data:{
				courseNum:courseNum,
				courseName:courseName,
				courseDes:courseDes,
				classID:tempid,
				classNum:classNum,
				teachNum:teachNum,
				//remark:remark
			},
			success:function(resp){
				if(resp=="success"){
					alert("修改课程成功！");
					location.reload();
				}
				else {
					alert("修改课程失败！");
				}
			}
		});
	});
}

//删除学生
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deleteLogicClass",
			data:{
				classNum:tempid
			},
			success:function(resp){
				if(resp=="success"){
					alert("删除课程成功！");
					location.reload();
				}
				else {
					alert("删除课程失败！");
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
			showcourseTable(data.Tables);
			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					 currentPage = Number(currentPage) - 1;
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
							showcourseTable(data.Tables);
						}
					});
				} 
			});

			//点击下一页之后
			$(".allnoderesult .fa-chevron-right").click(function() {
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
							showcourseTable(data.Tables);
						}
					});
				} 
			});
			//点击页数之后
			$(".allnoderesult .changenum").click(function() {
				$(".allnoderesult li").removeClass("active");
				$(this).addClass("active");
				var currentpage = $(this).find("a").html();
				$.ajax({
					type: "post",
					url: "./servlet/listLogClass",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showcourseTable(data.Tables);
					}
				});
			});
		}
	});
}

function showRemainder(){
	var itemnumber=$("#itemnumber").val();
	var searchtype=$("#search-type").val();
	var searchvalue=$("#searchvalue").val();
	$.ajax({
		type:"post",
		url:"./servlet/serchCourse",
		data:{
			page:"1",
			item:itemnumber,
			level:searchtype,
			key:searchvalue
		},
		success:function(data){
			$(".pagination").addClass("remaindernoderesult");
			$(".remaindernoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<=data.pages;i++){
				if(i==1){
					$(".remaindernoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}
				else {
					$(".remaindernoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
			}
			$(".remaindernoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showcourseTable(data.Tables);

			//点击上一页之后
			$(".remaindernoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".remaindernoderesult .active a").html();
				var itemnumber=$("#itemnumber").val();
				if (currentPage > 1) {
					 currentPage = Number(currentPage) - 1;
					$(".remaindernoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/serchCourse",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showcourseTable(data.Tables);
						}
					});
				} 
			});

			//点击下一页之后
			$(".remaindernoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".remaindernoderesult .active a").html();
				var itemnumber=$("#itemnumber").val();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage + 1);
					$(".remaindernoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/serchCourse",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showcourseTable(data.Tables);
						}
					});
				} 
			});
			//点击页数之后
			$(".remaindernoderesult .changenum").click(function() {
				var itemnumber=$("#itemnumber").val();
				$(".remaindernoderesult li").removeClass("active");
				$(this).addClass("active");
				var currentpage = $(this).find("a").html();
				$.ajax({
					type: "post",
					url: "./servlet/serchCourse",
					data: {
						page: currentpage,
						item: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showcourseTable(data.Tables);
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
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var type=$("#search-type").val();
		if(type=="classTime"){
			$(".filtertype").append("<select name='classTime' class='input-sm' id='searchvalue'><option value='first'>上学期</option><option value='second'>下学期</option><option value='both'>全年</option></select>");
		}
		/*else if(type=="courseName"){
			$.ajax({
				type:"post",
				url:"./servlet/liststu_Course",
				success:function(data){
					$(".filtertype").append("<select name='stuCourse' class='input-sm' id='searchvalue'>");
					for(var i=0;i<data.length;i++){
						$(".filtertype").append("<option value='"+data[i].courseNum+"'>"+data[i].courseName+"</option>");
					}
					$(".filtertype").append("</select>");
				}
			});
		}*/
		/*else if(type=="courseTeach"){
			$.ajax({
				type:"post",
				url:"./servlet/listcour_Teacher",
				success:function(data){
					$(".filtertype").append("<select name='teacher' class='input-sm' id='searchvalue'>");
					for(var i=0;i<data.length;i++){
						$(".filtertype").append("<option value='"+data[i].teachNum+"'>"+data[i].teachName+"</option>");
					}
					$(".filtertype").append("</select>");
				}
			});
		}*/
		else if(type=="periods"||type=="coursePeo"||type=="other"||type=="courseName"||type=="courseTeach"){
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
		else if(type=="other"||type=="courseName"||type=="periods"||
			type=="courseTeach"||type=="classTime"||type=="coursePeo"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加课程
	$("#addCourse").click(function(){
		//此处checkbox要列举教师
//		$.ajax({
//			type:"post",
//			url:"./servlet/listcour_Teacher",
//			success:function(data){
//				for(var i=0;i<data.length;i++) {
//					$("#newTea").append("<input type='checkbox' name='course' value='"+data[i].teachNum+"'>"+data[i].teachName);
//				};
//			}
//		});
		//列举老师和班级
		$.ajax({
			type:"post",
			url:"./servlet/getTeachAndCla",
			data:{},
			success:function(text){
				console.log(text);
				for(var i=0;i<text.teacher.length;i++){
					$("#newTeacher").append("<option value='"+text.teacher[i].teaNum+"'>"+text.teacher[i].teaName+"</option>");
				}
				for(var i=0;i<text.classTable.length;i++){
					$("#newClass").append("<option value='"+text.classTable[i].claNum+"'>"+text.classTable[i].claName+"</option>");
				}
			}
		});
		$(".page2").dialog("open");
		$("#addComp").click(function(){
			var newCourseName=$("#newCourseName").val();
			var newCourseNum=$("#newCourseNum").val();
			var newTeaTime=$("#newTeaTime").val();
			var newCourseTime=$("#newCourseTime").val();
			var newTeacher=$("#newTeacher").val();
			var newClass=$("#newClass").val();
			/*var newteacher=[];
			$("#teacher option").click(function(){
				teacher.push($(this).val());
		});*/
			var NewCourseDes=$("#NewCourseDes").val();
			$.ajax({
				type: "post",
				url: "./servlet/addCourse",
				data: {
					courseName: newCourseName,
					courseNum: newCourseNum,
					classTime: newTeaTime,
					periods:newCourseTime,
					remark: NewCourseDes,
					teachNum:newTeacher,
					classNum:newClass
					
				},
				success: function(resp) {
					if (resp = "success") {
						alert("添加课程成功！");
						location.reload();
					} else {
						alert("添加课程失败！");
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
