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
	var taskId = getUserName(window.location.search);
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
});

//根据url得到用户名
function getUserName(str){
	var taskId;

	var args = str.substring(1).split("&"); 
	console.log(args);
	for(var i = 0; i < args.length; i ++)
	 { 
		 pro = args[i]; 
		 var arg = pro.split("=");
		 if(arg.length <= 1) continue; 
		 if(arg[0] == "name"){
			 //obj.name = arg[1];
		 }else if(arg[0] == "taskId"){
			taskId = arg[1];
		 }else if(arg[0] == "classId"){
			 classid = arg[1];
		 }
	 }
	return taskId;   
}
