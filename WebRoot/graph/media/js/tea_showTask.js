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
	var parameter = getUserName(window.location.search);
	var classidlist = $("#courseManag ul li a");
	//console.log(classid);
	for(var i=0;i<classidlist.length;i++){
		
		if(classidlist.eq(i).attr("classid")==parameter.classid){
			classidlist.eq(i).parent().addClass("active");
		}
	}
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
					type:"teacher"
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
	//提交成绩
	$("#submitGrade").click(function(){
		var comGrade = $("#compGrade").val();
		var humanGrade = $("#humanGrade").val();
		var valution = $("#gradeDescription").val();
		var parameter = getUserName(window.location.search);
		$.ajax({
			type:"post",
			url:"../servlet/updateGrade",
			data:{
				taskId:parameter.taskId,
				comGrade:comGrade,
				humanGrade:humanGrade,
				valution:valution,
				stuNum:parameter.stuNum
				},
			success:function(text){
				if(text=="success"){
					alert("成绩评定成功！");
					location.reload();
				}else{
					alert("成绩评定失败！");
				}
			}
		});
	});
});

//根据url得到用户名
function getUserName(str){
	var parameter={};
	
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
			parameter.taskId = arg[1];
		 }else if(arg[0] == "classId"){
			 parameter.classid = arg[1];
		 }else if(arg[0] == "stuNum"){
			 parameter.stuNum = arg[1];
		 }
	 }
	return parameter;   
}
//显示作业列表
function showTask(obj){
	//alert("fdddfff");
	//alert($(obj).html());
	var classId = $(obj).attr("classId");
//	var lis = $("#courseManag ul li");
//	for(var i=0,len=lis.length;i<len;i++){
//		var jli = lis.eq(i);
//		if(jli.hasClass("active")){
//			jli.removeClass("active");
//		}
//	}
//	$(obj).parent().addClass("active");
//	showAll();
	window.location.href="../teacher_TaskManagement.jsp?classid="+classId;

}