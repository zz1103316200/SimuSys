
var data=[
          {"className":"1班"},
          {"className":"2班"},
          {"className":"3班"},
         ];
function rePass(){
	$(".page3").dialog("open");
}
//页面展示方法
function showclaTable(data){
	//console.log(data);
	$("#teatable tbody").empty();
	var courseChecked = $("#courseManag ul li[class='course_list active'] a").attr("classid");
	//console.log(courseChecked);
	for (var i=0;i<data.length;i++) {
		
		var textHtml="<tr id='"+data[i].taskId+"'>";
		textHtml+="<td>"+(i+1)+"</td>";
		textHtml+="<td>"+data[i].taskName+"</td>";
		textHtml+="<td>"+data[i].taskTarget+"</td>";
		textHtml+="<td>"+data[i].deadline+"</td>";
		
		//textHtml+="<td>"+data[i].taskState+"</td>";
		textHtml+="<td><a class='btn btn-primary deleteservice btn-sm'  onclick='showBar("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;查看</a></td>";
		textHtml+="<td>"+data[i].description+"</td>";
		//"<td><a href='teacher_TaskFenPei.jsp?taskId="+data[i].taskId+"' class='btn btn-primary deleteservice btn-sm'><i class='fa fa-gear'></i>&nbsp;&nbsp;作业下发</a></td>"
		   
		textHtml+="<td><a href='teacher_TaskDevice.jsp?taskId="+data[i].taskId+"&classId="+courseChecked+"' class='btn btn-primary deleteservice btn-sm'><i class='fa fa-gear'></i>&nbsp;&nbsp;选择器材</a></td>"
				   +"<td><a class='btn btn-primary deleteservice btn-sm' id='temp"+i+"' eid="+data[i].taskId+" onclick='edit("+i+")'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a></td>"
				   +"<td><a class='btn btn-danger deleteservice btn-sm' onclick='dele("+i+")'><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a></td>"
				   +"<td><a href='teacher_TaskResult.jsp?taskId="+data[i].taskId+"&classId="+courseChecked+"' class='btn btn-primary deleteservice btn-sm' ><i class='fa fa-gear'></i>&nbsp;&nbsp;评定成绩</a></td>";
		textHtml+="</tr>";
		$("#teatable tbody").append(textHtml);
	};
}
function showBar(id){
	$(".page4").dialog("open");
	var tempid=$("#temp"+id).attr("eid");
	$.ajax({
		type:"post",
		url:"./servlet/showGradeGraph",
		data:{taskId:tempid},
		success:function(text){
			//alert("hello");
			//console.log(data[2][1]);
			console.log(text);
			var data = text.data;
			console.log(data[2][1]);
//			data = [
//						[0,7],
//						[1,10],
//						[2,17],
//						[3,26],
//						[4,8],
//						[5,2],
//						[6,12]
//				   ];
			var dataSet = [
							{label:"作业",data:data}
						  ];
			var xTicks = [
							[0.25,"未交作业"],[1.25,"未批改作业"],[2.25,"60分以下"],[3.25,"60-70分"],[4.25,"70-80分"],[5.25,"80-90分"],[6.25,"90-100分"]
						 ];
			/*var yTicks = [
							[0,""];
						 ];*/
			var options = {
							series: {
								bars: {
									show: true
								}
							},
							bars: {
								//align:"center",
								barWidth:0.5
							},
							xaxis: {
								axisLabel: "分数",
								axisLabelUseCanvas: true,
								axisLabelFontSizePixels: 12,
								axisLabelFontFamily: 'Verdana, Arial',
								axisLabelPadding: 10,
								ticks: xTicks
							},
							 yaxis: {
								axisLabel: "人数",
								axisLabelUseCanvas: true,
								axisLabelFontSizePixels: 12,
								axisLabelFontFamily: 'Verdana, Arial',
								axisLabelPadding: 3
								/*tickFormatter: function (v, axis) {
			
								}*/
							},
							grid: {
								hoverable: true,
								borderWidth: 2,
								backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
							}
						  };
			$.plot($("#flot-placeholder"),dataSet,options);
			//$("#flot-placeholder").UseTooltip();
			
			
			var previousPoint = null, previousLabel = null;
			//$.fn.UseTooltip = function (){
			$("#flot-placeholder").bind("plothover", function (event, pos, item) {
				if (item) {
					if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
						previousPoint = item.dataIndex;
						previousLabel = item.series.label;
						$("#tooltip").remove();

						var x = item.datapoint[0];
						var y = item.datapoint[1];

						var color = item.series.color;

						//console.log(item.series.xaxis.ticks[x].label);                

						showTooltip(item.pageX,
						item.pageY,
						color,
						"<strong>" + item.series.label + "</strong><br>" + item.series.xaxis.ticks[x].label + " : <strong>" + y + "人</strong>");
					}
				} else {
					$("#tooltip").remove();
					previousPoint = null;
				}
			});
		}
	});
	
}

function showTooltip(x, y, color, contents) {
	//var top=parseInt($(".page4").css("top").split("p")[0]);
	//var left=parseInt($(".page4").css("left").split("p")[0]);
	$('<div id="tooltip">' + contents + '</div>').css({
		position: 'absolute',
		display: 'none',
		top: 20,
		left: 20,
		border: '2px solid ' + color,
		padding: '3px',
		'font-size': '9px',
		'border-radius': '5px',
		'background-color': '#fff',
		'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
		opacity: 0.9
	}).appendTo(".page4").fadeIn(200);
}
//编辑作业表
function edit(id){
	var tempid=$("#temp"+id).attr("eid");
	
	var taskName=$("#teatable tbody tr").eq(parseInt(id)).children().eq(1).html();
	var deadTime=$("#teatable tbody tr").eq(parseInt(id)).children().eq(3).html();
	var remark=$("#teatable tbody tr").eq(parseInt(id)).children().eq(5).html();
	$("#e_newteaTaskName").val(taskName);
	$("#e_teaSubTime").val(deadTime);
	$("#e_teaDes").val(remark);
	$(".page1").dialog("open");
	//点击确定之后
	$("#editSubmit").click(function(){
		var taskName=$("#e_newteaTaskName").val();
		var taskSubmitTime=$("#e_teaSubTime").val();
		var taskDescription=$("#e_teaDes").val();
		
		$.ajax({
			type:"post",
			url:"./servlet/editTask",
			data:{
				taskId:tempid,
				taskName:taskName,
				deadline:taskSubmitTime,
				description:taskDescription
			},
			success:function(resp){
				if(resp=="success"){
					alert("修改作业成功！");
					location.reload();
				}
				else {
					alert("修改作业失败！");
				}
			}
		});
	});
}

//删除作业
function dele(id){
	var tempid=$("#temp"+id).attr("eid");
	if(confirm("确认要删除？")){ 
		//alert("sss");
		$.ajax({
			type:"post",
			url:"./servlet/deleteTask",
			data:{
				taskId:tempid
			},		
			success:function(resp){
				if(resp=="success"){
					alert("删除作业成功！");
					location.reload();
				}
			}
		});
	}
	
}
/*无条件搜索*/
function showAll(){
	var itemnumber=$("#itemnumber").val();
	var classId;
	if($("#courseManag ul li[class='course_list active'] a").attr("classId")){
		classId = $("#courseManag ul li[class='course_list active'] a").attr("classId");
	}else{
		classId = getUserName(window.location.search);
	}
//	try{
//		classId = $("#courseManag ul li[class='course_list active'] a").attr("classId");
//	}catch{
//		classId = getUserName(window.location.search);
//	}
	//alert(itemnumber);
	$.ajax({
		type:"post",
		url:"./servlet/listTask",
		data:{
			page:"1",
			item:itemnumber,
			classId:classId
		},
		success:function(data){
			$(".pagination").addClass("allnoderesult");
			//$(".pagination").append("<div style='color:red'>aaaaa</div>");
			$(".allnoderesult").empty();
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
			$(".allnoderesult .fa-chevron-left").click(function() {
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".allnoderesult .active a").html();
				if (currentPage > 1) {
					 currentPage = Number(currentPage)-1;
					// alert(currentPage);
					$(".allnoderesult li").removeClass("active");
					var cur = "." + currentPage;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/listTask",
						data: {
							page: currentPage,
							item: itemnumber,
							classId:classId
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
						url: "./servlet/listTask",
						data: {
							page: currentPage,
							item: itemnumber,
							classId:classId
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
					url: "./servlet/listTask",
					data: {
						page: currentpage,
						item: itemnumber,
						classId:classId
					},
					success: function(data) {
						showclaTable(data.Tables);
					}
				});
			});
		}
	});
}

//其他
function showRemainder(){
	var itemnumber=$("#itemnumber").val();
	var searchtype=$("#search-type").val();
	var searchvalue=$("#searchvalue").val();
	$.ajax({
		type:"post",
		url:"./servlet/searchTask",
		data:{
			page:"1",
			item:itemnumber,
			level:searchtype,
			key:searchvalue
		},
		success:function(data){
			$(".pagination").addClass("remaindnoderesult");
			$(".remaindnoderesult").empty();
			$(".remaindnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i=1;i<data.pages;i++){
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
				var itemnumber = $("#itemnumber").val();
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage > 1) {
					var page = Number(currentPage)-1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchTask",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showclaTable(data);
						}
					});
				} 
			});

			//点击下一页之后
			$(".remaindnoderesult .fa-chevron-right").click(function() {
				//获取当前页
				var currentPage = $(".remaindnoderesult .active a").html();
				if (currentPage<data.pages) {
					currentPage = Number(currentPage)+1;
					$(".remaindnoderesult li").removeClass("active");
					var cur = "." + page;
					$(cur).parent().addClass("active");
					$.ajax({
						type: "post",
						url: "./servlet/searchTask",
						data: {
							page: currentPage,
							item: itemnumber,
							level:searchtype,
							key:searchvalue
						},
						success: function(data) {
							showclaTable(data);
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
					url: "./servlet/searchTask",
					data: {
						page: currentpage,
						item: itemnumber,
						level:searchtype,
						key:searchvalue
					},
					success: function(data) {
						showclaTable(data);
					}
				});
			});
		}
	});
}
/**
 * 作业管理里加上课程
 * 
 * 
 */
/*
<ul>
<li class="active">
	<a href="admin_AdClassManagement.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">行政班级管理</a>
</li>
<li>
	<a href="admin_logicClassManagement.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">课程班级管理</a>
</li>

</ul>

<li>
						<a href="teacher_CourseInf.jsp">
						<i class="fa fa-lg fa-fw fa-cloud-download"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; " id="PageSerDeploy">课程信息</span>
						</a>
					</li>
*/
//此方法已遗弃
function addCourseToTask(){
	$.ajax({
		type:"post",
		url:"./servlet/getCourseOfTeach",
		success: function(text){
			console.log(text)
			var coursehtml = "<ul>";
			for(var i=0; i<text.length; i++){
				coursehtml += "<li class='active'>";
				coursehtml += "<a href='#' style='font-family:  'Microsoft YaHei';font-size:16px; ' onclick='showTask(this)' courseId='"+text[i].num+"'>"+text[i].courseName+"</a>";
				coursehtml += "</li>";
			}
			coursehtml += "</ul>";
			//alert(coursehtml);
			$("#courseManag").append(coursehtml);
		}
	});
}

$(function(){
	//alert("tssss");
//	var time=new Date().getFullYear();
//	for(var i=0;i<10;i++){
//		$("#newCompClassTime").append("<option value='"+(time-i)+"'>"+(time-i)+"</option>");
//	}
//	$("#starttime").click(function() {
//		//alert("time");
//		$("#starttime").datepicker({
//			format:"yyyy-mm-dd"
//		});
//	});
	$("#starttime").datepicker({
		format:"yyyy-mm-dd"
	});
	//e_teaSubTime
	$("#e_teaSubTime").click(function() {
		//alert("time");
		$("#e_teaSubTime").datepicker({
			format:"yyyy-mm-dd"
		});
	});
	$(".page1").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改作业信息"
	});
	$(".page2").dialog({
		autoOpen : false,
		 modal : true,
		 title : "添加作业信息"
	});
	$(".page3").dialog({
		autoOpen : false,
		 modal : true,
		 title : "修改用户密码"
	});
	$(".page4").dialog({
		autoOpen : false,
		 modal : true,
		 title : "柱状图"
	});

	$("#AddComp").click(function(){
		//alert("helllo");
		$(".page2").dialog("open");
	});
	//addCourseToTask();
	showAll();
	$("#search-type").change(function(){
		$(".filtertype").empty();
		var stype=$("#search-type").val();
		if(stype=="taskState"){
			$(".filtertype").append("<select name='level' class='input-sm' id='searchvalue'>"
										+"<option value='unFinished'>未批改</option>"
										+"<option value='allFinished'>已批改</option>"
										+"<option value='partFinished'>部分批改</option>"
										
										+"</select>");
		}
		else if(stype=="taskTarget"){
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
		else if(type=="taskState"||type=="taskTarget"){
			$(".pagination").empty();
			$(".pagination").removeClass("remaindnoderesult");
			$(".pagination").removeClass("allnoderesult");
			showRemainder();
		}
	});
	//添加作业
	$("#addTask").click(function(){
		$('#file_upload').uploadify('upload','*');
		
		var classId = $("#courseManag ul li[class='course_list active'] a").attr("classId");
		var newteaTaskName=$("#newteaTaskName").val();
		var starttime=$("#starttime").val();
		var newteaDesName=$("#newteaDesName").val();
		var teacherId=$("#login_username").html();
		var taskDoc=$(".fileName").text().split("(")[0];
		alert("taskDoc:"+taskDoc);
		$.ajax({
			type: "post",
			url: "./servlet/addTask",
			data: {
				taskName: newteaTaskName,
				deadline: starttime,
				description: newteaDesName,
				teacherId:teacherId,
				taskDoc:taskDoc,
				classId:classId
			},
			success: function(resp) {
				if (resp == "success") {
					
					alert("添加作业成功！");
					location.reload();
				} else {
					alert("添加作业失败！");
				}
			}
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
		var classid;
	
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
				//parameter.taskId = arg[1];
			 }else if(arg[0] == "classId"){
				 classid = arg[1];
			 }
		 }
		return classid;   
	}

   //显示作业列表
    function showTask(obj){
    	//alert("fdddfff");
    	//alert($(obj).html());
    	var classId = $(obj).attr("classId");
    	var lis = $("#courseManag ul li");
    	for(var i=0,len=lis.length;i<len;i++){
    		var jli = lis.eq(i);
    		if(jli.hasClass("active")){
    			jli.removeClass("active");
    		}
    	}
    	$(obj).parent().addClass("active");
    	showAll();

    }