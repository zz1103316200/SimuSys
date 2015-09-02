function rePass(){
	$(".page3").dialog("open");
}
//页面展示方法
function showteaTable(data){
	$("#teaTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].teachName+"</td>";
		textHtml+="<td>"+data[i].teachNum+"</td>";
		var sex=data[i].teachGender;
		if(sex=="male"){
			textHtml+="<td value='male'>男</td>";
		}
		else if(sex=="female"){
			textHtml+="<td value='female'>女</td>";
		}
		textHtml+="<td>"+data[i].teachAge+"</td>";
		textHtml+="<td>"+data[i].teachPosition+"</td>";
		textHtml+="<td>"+data[i].remark+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].teachNum+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#teaTable tbody").append(textHtml);
	};
	
}

//编辑教员表
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	var teaName=$("#teaTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var teaAge=$("#teaTable tbody tr").eq(parseInt(id)).children().eq(4).html();
	var teaSex=$("#teaTable tbody tr").eq(parseInt(id)).children().eq(3).attr("value");
	var remark=$("#teaTable tbody tr").eq(parseInt(id)).children().eq(6).html();
	if(teaSex=="female"){
		$("input[value='female']:radio").attr("checked",'true');
	}
	else if(teaSex=="male"){
		$("input[value='male']:radio").attr("checked",'true');
	}	
	$("#teaname").val(teaName);
	$("#teaage").val(teaAge);
	$("#teades").val(remark);
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var stuName=$("#teaname").val();
		var stuAge=$("#teaage").val();
		var stuSex=$("input[name='teasex']:checked").val();
	//	alert("xingbie"+stuSex)
		/*var stuCourse=[];
		$("input[name='teaCourse']:radio").click(function(){
			$("input[name='teaCourse']:radio").each(function(){
				stuCourse.push($(this).val());
			});
		});*/
		var major=$("#teapos").val();
		var remark=$("#teades").val();
		$.ajax({
			type:"post",
			url:"./servlet/editTeacher",
			data:{
				teachNum:tempid,
				teachName:stuName,
				teachAge:stuAge,
				teachGender:stuSex,
				teachPosition:major,
				remark:remark
			},
			success:function(response){
				//alert(data);
				if(response=="success"){
					alert("修改教员成功！");
					location.reload();
				}
				else {
					alert("修改教员失败！");
				}
			}
		});
	});
}

//删除教员
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deleteTeacherTable",
			data:{
				teachNum:tempid
			},
			success:function(resp){
				if(resp=="success"){
					alert("删除教员成功！");
					lacation.reload();
				}
				else {
					alert("删除教员失败！");
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
		url:"./servlet/listTeacher",
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
			showteaTable(data.Tables);
			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				var itemnumber=$("#itemnumber").val();
				if (currentPage > 1) {
					currentPage = Number(currentPage) - 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listTeacher",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showteaTable(data.Tables);
						}
					});
				} 
			});

			//点击下一页之后
			$(".allnoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				var itemnumber=$("#itemnumber").val();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage) + 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listTeacher",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showteaTable(data.Tables);
						}
					});
				} 
			});
			//点击页数之后
			$(".allnoderesult .changenum").click(function() {
				$(".allnoderesult li").removeClass("active");
				$(this).addClass("active");
				//$(this).Attr("cursor","handler");
				var currentpage = $(this).find("a").html();
				var itemnumber=$("#itemnumber").val();
			//	alert("请求第几页："+currentpage+"每页显示："+itemnumber);
				$.ajax({
					type: "post",
					url: "./servlet/listTeacher",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showteaTable(data.Tables);
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
		url:"./servlet/searchTeacher",
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
			showteaTable(data.Tables);

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
						url: "./servlet/searchTeacher",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showteaTable(data.Tables);
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
					currentPage = Number(currentPage) + 1;
					$(".remaindernoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchTeacher",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showteaTable(data.Tables);
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
					url: "./servlet/searchTeacher",
					data: {
						page: currentpage,
						numType: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showteaTable(data.Tables);
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
		 title : "修改教员信息"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加教员信息"
	});
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	$("addTea").click(function(){
		$(".page2").dialog("open");
	});
	showAll();
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var type=$("#search-type").val();
		if(type=="teaGender"){
			$(".filtertype")
			.append("<select name='sex' class='input-sm' id='searchvalue'><option value='male'>男</option><option value='female'>女</option></select>");
		}
		else if(type=="teaPosition"){
			$(".filtertype")
			.append("<select name='position' class='input-sm' id='searchvalue'>"
						+"<option value='professor'>教授</option>"
						+"<option value='associate professor'>副教授</option>"
						+"<option value='lecturer'>讲师</option>"
						+"<option value='assistant'>助教</option></select>");
		}
/*		else if(type=="teaCourse"){
			$.ajax({
				type:"post",
				url:"./servlet/listtea_Course",
				success:function(data){
					$(".filtertype").append("<select name='teaCourse' class='input-sm' id='searchvalue'>");
					for(var i=0;i<data.length;i++){
						$(".filtertype").append("<option value='"+data[i].courseNum+"'>"+data[i].courseName+"</option>");
					}
					$(".filtertype").append("</select>");
				}
			});
		}*/
		else if(type=="teaName"||type=="teaNum"||type=="teaAge"||type=="teaCourse"||type=="other"){
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
		else if(type=="other"||type=="teaName"||type=="teaNum"||
			type=="teaAge"||type=="teaGender"||type=="teaCourse"||type=="teaPosition"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});

	//添加教师
	$("#addTea").click(function(){
		//列举所有班级
		/*$.ajax({
			url:"servlet/listlogicClass",
			type:"post",
			success:function(data){
				$("#newCompClass").append("<option value="+data.Tables[i].classNum+">"+data.Tables[i].className+"</option>");
			}
		});*/
		
		//列举所有课程
		/*$.ajax({
			url:"servlet/listlogicClass",
			type:"post",
			success:function(data){
				$("#newCompCourse").append("<option value="+data.Tables[i].courseNum+">"+data.Tables[i].courseName+"</option>");
			}
		});*/
		$(".page2").dialog("open");
		$("#addComp").click(function(){
			var newComStuName=$("#newCompName").val();
			var newCompStuNum=$("#newCompId").val();
			var newCompStuAge=$("#newCompAge").val();
			var newCompStuSex=$("input[name='newCompSex']:radio").val();
			var newCompStuPro=$("#newCompType").val();
			var newCompStuDes=$("#newCompDes").val();
		$.ajax({
			type: "post",
			url: "./servlet/addTeacher",
			data: {
				teachName: newComStuName,
				teachNum: newCompStuNum,
				teachAge: newCompStuAge,
				teachGender: newCompStuSex,
				teachPosition:newCompStuPro,//职称
				remark: newCompStuDes//备注
			},
			success: function(resp) {
				if (resp = "success") {
					alert("添加教员成功！");
					location.reload();
				} else {
					alert("添加教员失败！");
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
