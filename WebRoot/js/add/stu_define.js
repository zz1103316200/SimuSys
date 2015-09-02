//页面展示方法
function showclaTable(data){
	console.log(data);
	$("#stuTask tbody").empty();
	for (var i=0;i<data.length;i++) {
		//alert(data[i].stuNum);
		var textHtml="<tr tid='"+data[i].taskId+"'>";
		textHtml+="<td>"+(i+1)+"</td>";
		
		textHtml+="<td>"+data[i].submitTime+"</td>";
		
		textHtml+="<td><a href='./graph/student_showDefine.jsp?taskId="+data[i].taskId+"' class='btn btn-primary deleteservice btn-sm' ><i class='fa fa-gear'></i>&nbsp;&nbsp;查看</a></td>";
		textHtml+="</tr>";
		$("#stuTask tbody").append(textHtml);
	};
}

/*无条件搜索*/
function showAll(){
	var itemnumber=$("#itemnumber").val();
	//alert(itemnumber);
	//var parameter = getUserName(window.location.search);
	$.ajax({
		type:"post",
		url:"./servlet/listTaskDefine",
		data:{page:"1",item:itemnumber},
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
			//$("#teatable").attr("taskId",data.taskId);
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
						url: "./servlet/listTaskDefine",
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
						url: "./servlet/listTaskDefine",
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
					url: "./servlet/listTaskDefine",
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
$(function(){
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	showAll();
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

