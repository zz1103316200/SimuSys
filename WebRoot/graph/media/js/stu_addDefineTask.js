function rePass(){
	$(".page3").dialog("open");
}
$(function(){
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "评定成绩"
	});
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改密码"
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
				url:"../servlet/updatePassword",
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
//	//提交成绩
//	$("#submitGrade").click(function(){
//		var comGrade = $("#compGrade").val();
//		var humanGrade = $("#humanGrade").val();
//		var valution = $("#gradeDescription").val();
//		var parameter = getUserName(window.location.search);
//		$.ajax({
//			type:"post",
//			url:"../servlet/updateGrade",
//			data:{
//				taskId:parameter.taskId,
//				comGrade:comGrade,
//				humanGrade:humanGrade,
//				valution:valution,
//				stuNum:parameter.stuNum
//				},
//			success:function(text){
//				if(text=="success"){
//					alert("成绩评定成功！");
//					location.reload();
//				}else{
//					alert("成绩评定失败！");
//				}
//			}
//		});
//	});
});