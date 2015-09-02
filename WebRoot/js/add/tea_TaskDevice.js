//页面展示方法
function showclaTable(data){
	//console.log(data);
	$("#teatable tbody").empty();
	for (var i=0;i<data.length;i++) {
		
		var textHtml="<tr id='"+data[i].id+"' dtype='"+data[i].type+"'>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].name+"</td>";
		
		textHtml+="<td class='col-sm-1 col-md-1 col-lg-1'><input class='form-control spinner' name='spinner' value='1' type='text'></td>";
		textHtml+="<td><label class='checkbox state-error'><input class='isChecked' type='checkbox' name='checkbox'><i></i></label></td>";
		textHtml+="</tr>";
		$("#teatable tbody").append(textHtml);
		
		
	};
	$(".spinner").spinner();
	
}
function rePass(){
	$(".page3").dialog("open");
}
function showAll(){

	$.ajax({
		type:"post",
		url:"./servlet/listDevices",
		data:{},
		success:function(data){
			
			showclaTable(data);

		}
	});
}

$(document).ready(function(){
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	var parameter = getUserName(window.location.search);
	//显示器材列表
	showAll();
	//确认点击事件
	$("#AddComp").click(function(){
		var totalDevices = [];
		$("#teatable tbody").find("tr").each(function(){
			//console.log($(this).html());
			var isChecked = $(this).find(".isChecked").eq(0).is(':checked');
			if(isChecked){
				var singleDevice = {};
				singleDevice.type=$(this).attr("dtype");
				singleDevice.id=$(this).attr("id");
				singleDevice.name=$(this).children().eq(1).html();
				//console.log($(this).children().eq(2).children().eq(0));
				singleDevice.num=$(this).children().eq(2).find(".spinner").eq(0).val();
				//console.log(singleDevice);
				totalDevices[totalDevices.length] = singleDevice;
			}
			
		});
		console.log(totalDevices);
		$.ajax({
			type:"post",
			url:"./servlet/addDevicesToTask",
			data:{devices:JSON.stringify(totalDevices),taskId:parameter.taskId},
			success:function(data){
				if(data=="success"){
					alert("添加成功！");
					window.location.href="./teacher_TaskManagement.jsp";
				}else{
					alert("添加失败！");
				}
				
			}
		})
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
});
//根据url得到用户名
function getUserName(str){
	var parameter={
			"taskId":"",
			"classid":""
	};

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
	window.location.href="./teacher_TaskManagement.jsp?classid="+classId;

}
