
jQuery(document).ready(function() {    
   App.init();
   Lock.init();
//   var key = "id";
//   var json ={};
//   if(!json[key]){
//	   json[key]="keyyy";
//   }
//   alert(json.id);
   $("#login_button").click(function(){
	   var name = $("#login_name").val();
	   var password = $("#login_password").val();
	   var jiaose = $("#jiaose").val();
	   //alert("   name:"+name+"   password:"+password+"   jiaose:"+jiaose); 
	   
	   $.post("./servlet/checkServlet",{name:name,password:password,jiaose:jiaose},function(text){
		   console.log(text.tag);
		   if(!text.tag){
			   alert("用户名或密码错误！");
		   }else if(text.type=="管理员"){
			   window.location.href="admin_AdClassManagement.jsp";
		   }else if(text.type=="教员"){
			   window.location.href="teacher_TaskManagement.jsp";
		   }else if(text.type=="学员"){
			   window.location.href="student_TaskUnfinished.jsp";
		   }
	   });
   });
});
