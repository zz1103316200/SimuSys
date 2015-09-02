function rePass(){
	$(".page3").dialog("open");
}
//页面展示方法
function showstuTable(data){
	$("#stuTable tbody").empty();
	for (var i=0;i<data.length;i++) {
		var textHtml="<tr>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].stuName+"</td>";
		textHtml+="<td>"+data[i].stuNum+"</td>";
		textHtml+="<td>"+data[i].stuAge+"</td>";
		var sex=data[i].stuGender;
		if(sex=="male"){
			textHtml+="<td value='male'>男</td>";
		}
		else if(sex=="female"){
			textHtml+="<td value='female'>女</td>";
		}
		textHtml+="<td>"+data[i].className+"</td>";//学生班级,从student_class表中根据stuNum得到classID，然后再通过logicclass表中查出相应的classNum,再到class表中去找classname
		textHtml+="<td>"+data[i].major+"</td>";
		textHtml+="<td>"+data[i].remark+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].stuNum+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>";
		textHtml+="</tr>";
		$("#stuTable tbody").append(textHtml);
	};
	
}

//编辑学生表
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	var stuName=$("#stuTable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var stuAge=$("#stuTable tbody tr").eq(parseInt(id)).children().eq(3).html();
	var stuSex=$("#stuTable tbody tr").eq(parseInt(id)).children().eq(4).attr("value");
	var remark=$("#stuTable tbody tr").eq(parseInt(id)).children().eq(7).html();
	if(stuSex=="female"){
		$("input[value='female']:radio").attr("checked",'true');
	}
	else if(stuSex=="male"){
		$("input[value='male']:radio").attr("checked",'true');
	}
	//此处select是列举班级
	$.ajax({	
		type:"post",
		url:"./servlet/liststu_Class",
		success:function(data){
			for(var i=0;i<data.length;i++){
				var option="";
				option+="<option value='"+data[i].classNum+"'>"+data[i].className+"</option>";
			$("#stuclass").append(option);
			}
		}			
	});
	//此处select是列举专业
	$.ajax({	
		type:"post",
		url:"./servlet/listMajor",
		success:function(data){
			for(var i=0;i<data.length;i++){
				var option="";
					option+="<option value="+data[i].MajorID+">"+data[i].majorName+"</option>";
			$("#stupro").append(option);
			}
		}			
	});
	
	$("#stuname").val(stuName);
	$("#stuage").val(stuAge);
	$("#studes").val(remark);
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var stuName=$("#stuname").val();
		var stuClass=$("#stuclass").val();
		var stuAge=$("#stuage").val();
		var stuSex=$("input[name='stusex']:checked").val();
		var major=$("#stupro").val();
		var remark=$("#studes").val();
		$.ajax({
			type:"post",
			url:"./servlet/editStudent",
			data:{
				stuNum:tempid,
				stuName:stuName,
				classNum:stuClass,
				stuAge:stuAge,
				stuGender:stuSex,
				major:major,
				remark:remark
			},
			success:function(response){
				//alert(data);
				if(response=="success"){
					alert("修改学员成功！");
					location.reload();
				}
				else {
					alert("修改学院失败！");
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
			url:"./servlet/deleteStudent",
			data:{
				stuNum:tempid
			},
			success:function(resp){
				if(resp=="success"){
					alert("删除学生成功！");
					lacation.reload();
				}
				else {
					alert("删除学生失败！");
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
		url:"./servlet/listStudent",
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
			showstuTable(data.Tables);
			//点击上一页之后
			$(".allnoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					currentPage= Number(currentPage) - 1;
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listStudent",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showstuTable(data.Tables);
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
						url: "./servlet/listStudent",
						data: {
							page: currentPage,
							item: itemnumber
						},
						success: function(data) {
							showstuTable(data.Tables);
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
					url: "./servlet/listStudent",
					data: {
						page: currentpage,
						item: itemnumber
					},
					success: function(data) {
						showstuTable(data.Tables);
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
		url:"./servlet/searchStudent",
		data:{
			page:"1",
			item:itemnumber,
			level:searchtype,
			key:searchvalue
		},
		success:function(data){
			//SSSalert(data.pages)
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
			showstuTable(data.Tables);

			//点击上一页之后
			$(".remaindernoderesult .fa-chevron-left").click(function() {
				//获取当前页
				var currentPage = $(".remaindernoderesult .active a").html();
				var itemnumber=$("#itemnumber").val();
				if (currentPage > 1) {
					currentPage= Number(currentPage) - 1;
					$(".remaindernoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					//alert(key);
					$.ajax({
						type: "post",
						url: "./servlet/searchStudent",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showstuTable(data.Tables);
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
						url: "./servlet/searchStudent",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showstuTable(data.Tables);
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
					url: "./servlet/searchStudent",
					data: {
						page: currentpage,
						item: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showstuTable(data.Tables);
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
		if(type=="stuSex"){
			$(".filtertype")
			.append("<select name='sex' class='input-sm' id='searchvalue'><option value='male'>男</option><option value='female'>女</option></select>");
		}
		else if(type=="stuClass"){
			$.ajax({
				type:"post",
				url:"./servlet/liststu_Class",
				success:function(data){
					var option="";
					for(var i=0;i<data.length;i++){
						option+="<option value='"+data[i].classNum+"'>"+data[i].className+"</option>";
					}
					$(".filtertype").append("<select name='stuClass' class='input-sm' id='searchvalue'>"+option+"</select>");
					
				}
			});
		}
		else if(type=="major"){
			$.ajax({
				type:"post",
				url:"./servlet/listMajor",
				success:function(data){
					var option="";
					for(var i=0;i<data.length;i++){
						option+="<option value='"+data[i].MajorID+"'>"+data[i].majorName+"</option>";
					}
					$(".filtertype").append("<select name='stuMajor' class='input-sm' id='searchvalue'>"+option+"</select>");
					
				}
			});
		}
		else if(type=="stuName"||type=="stuNum"||type=="stuAge"){
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
		else if(type=="other"||type=="stuName"||type=="stuNum"||
			type=="stuAge"||type=="stuSex"||type=="stuClass"||
			type=="course"||type=="major"
			){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加学生
	$("#addStu").click(function(){
		//此处select是列举班级
		$.ajax({	
			type:"post",
			url:"./servlet/liststu_Class",
			success:function(data){
				//var option="";
				console.log(data.length);
				for(var i=0;i<data.length;i++){
					var option="";
					 option+="<option value='"+data[i].classNum+"'>"+data[i].className+"</option>";
					 console.log(option);
					 $("#newCompStuClass").append(option);
				}
			}			
		});
		//此处select是列举专业
		$.ajax({	
			type:"post",
			url:"./servlet/listMajor",
			success:function(data){
				for(var i=0;i<data.length;i++){
					var option="";
						option+="<option value="+data[i].MajorID+">"+data[i].majorName+"</option>";
				$("#newCompStuPro").append(option);
				}
			}			
		});
		//此处checkbox要列举课程
//		$.ajax({
//			type:"post",
//			url:"./servlet/liststu_Course",
//			success:function(data){
//				for(var i=0;i<data.length;i++) {
//					$("#course").append("<input type='checkbox' name='course' value='"+data[i].courseNum+"'>"+data[i].courseName);
//				};
//			}
//		});
		$(".page2").dialog("open");
		$("#stuOk").click(function(){
			var newComStuName=$("#newComStuName").val();
			var newCompStuNum=$("#newCompStuNum").val();
			var newCompStuAge=$("#newCompStuAge").val();
			var newCompStuSex=$("input[name='newstusex']:checked").val();
			var newCompStuClass=$("#newCompStuClass").val();
			var newCompStuPro=$("#newCompStuPro").val();
			var newCompStuDes=$("#newCompStuDes").val();
		$.ajax({
			type: "post",
			url: "./servlet/addStudent",
			data: {
				stuName: newComStuName,//学生名
				stuNum: newCompStuNum,//学号
				stuAge: newCompStuAge,//年龄
				stuGender: newCompStuSex,//性别
				className: newCompStuClass,//班级
				major:newCompStuPro,//专业
				remark: newCompStuDes//备注
			},
			success: function(resp) {
				//alert(resp)
				if (resp == "success") {
					alert("添加学生成功！");
					location.reload();
				} else {
					alert("添加学生失败！");
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
