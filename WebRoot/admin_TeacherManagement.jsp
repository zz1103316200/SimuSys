<%@ page language="java" import="javax.servlet.http.*" pageEncoding="utf-8"%>
<%
System.out.println("--------name1");
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

if(request.getSession().getAttribute("name")==null){
	response.sendRedirect("./login.html");
	return;
}
String name = (String)request.getSession().getAttribute("name");
String password = (String)request.getSession().getAttribute("password");
System.out.println("--------name"+name);

%>
<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title> 通信设备组网流程化操作原型系统 </title>
		<meta name="description" content="">
		<meta name="author" content="">

		<!-- Use the correct meta names below for your web application
			 Ref: http://davidbcalhoun.com/2010/viewport-metatag 
			 
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">-->
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">

		<!-- SmartAdmin Styles : Please note (smartadmin-production.css) was created using LESS variables -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-skins.css">

		<!-- SmartAdmin RTL Support is under construction
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-rtl.css"> -->

		<!-- We recommend you use "your_style.css" to override SmartAdmin
		     specific styles this will also ensure you retrain your customization with each SmartAdmin update.
		<link rel="stylesheet" type="text/css" media="screen" href="css/your_style.css"> -->

		<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/demo.css">

		<!-- FAVICONS -->
		<link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">

		<!-- GOOGLE FONT -->
		<!-- <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"> -->

         <link rel="stylesheet" type="text/css" media="screen" href="css/wxh.css">
<style type="text/css">
	#teaTable tr th,#teaTable tbody{
		text-align:center;
	}
</style>
	<header id="header" style="height:100px;">
			<div id="logo-group" style="width:100%;">

				<!-- PLACE YOUR LOGO HERE -->
				<span id="logo" style="width:450px;color:white;font-size:21px;font-family:  'Microsoft YaHei' ;">  <img src="img/school.jpg" alt="SmartAdmin" style="height:80px;width:80px;">通信设备组网流程化操作原型系统</span>
				<!-- END LOGO PLACEHOLDER -->

				<!-- Note: The activity badge color changes when clicked and resets the number to 0
				Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications -->
				<span id="activity" class="activity-dropdown" style="margin-top:40px;float:right;position:relative;left:-120px;"> <i class="glyphicon glyphicon-bell txt-color-blue"></i> <b class="badge"> 21 </b> </span>

				<!-- AJAX-DROPDOWN : control this dropdown height, look and feel from the LESS variable file -->
				<div class="ajax-dropdown" style="margin-left:79%;margin-top:20px;">

					<!-- the ID links are fetched via AJAX to the ajax container "ajax-notifications" -->
					<div class="btn-group btn-group-justified" data-toggle="buttons">
						<label class="btn btn-default">
							<input type="radio" name="activity" id="ajax/notify/mail.html">
							Msgs (14) </label>
						<label class="btn btn-default">
							<input type="radio" name="activity" id="ajax/notify/notifications.html">
							notify (3) </label>
						<label class="btn btn-default">
							<input type="radio" name="activity" id="ajax/notify/tasks.html">
							Tasks (4) </label>
					</div>

					<!-- notification content -->
					<div class="ajax-notifications custom-scroll">

						<div class="alert alert-transparent">
							<h4>Click a button to show messages here</h4>
							This blank page message helps protect your privacy, or you can show the first message here automatically.
						</div>

						<i class="fa fa-lock fa-4x fa-border"></i>

					</div>
					<!-- end notification content -->

					<!-- footer: refresh area -->
					<span> Last updated on: 12/12/2013 9:43AM
						<button type="button" data-loading-text="<i class='fa fa-refresh fa-spin'></i> Loading..." class="btn btn-xs btn-default pull-right">
							<i class="fa fa-refresh"></i>
						</button> </span>
					<!-- end footer -->

				</div>
				<label class="TitleLabel">教员管理</label>
				<!-- END AJAX-DROPDOWN -->
			</div>

			<!-- projects dropdown -->
			
			<!-- end projects dropdown -->

			
			<!-- pulled right: nav area -->
			<div class="pull-right">

				<!-- collapse menu button -->
				
				<!-- end collapse menu -->

				<!-- logout button -->
				
				<!-- end logout button -->

				<!-- search mobile button (this is hidden till mobile view port) -->
				
				<!-- end search mobile button -->

				<!-- input: search field -->
				
				<!-- end input: search field -->

				<!-- multiple lang dropdown : find all flags in the image folder -->
				<ul class="header-dropdown-list hidden-xs" id="AdminInfo">
					<li>
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img alt="" src="img/avatar1.jpg"> <span id="login_username" pid="<%=password %>"><%=name %></span> <i class="fa fa-angle-down"></i> </a>
						<ul class="dropdown-menu pull-right">
							<li>
								<a href="javascript:void(0);" onclick="rePass()" style="font-family:  'Microsoft YaHei';" id="person"><i class="fa fa-edit"></i>&nbsp;&nbsp;修改密码 </a>
							</li>
							<!-- <li>
								<a href="javascript:void(0);" style="font-family:  'Microsoft YaHei';"><i class="fa fa-move"></i>&nbsp;&nbsp;全屏 </a>
							</li>
							<li>
								<a href="javascript:void(0);" style="font-family:  'Microsoft YaHei';"><i class="fa fa-lock"></i>&nbsp;&nbsp;锁定屏幕 </a>
							</li> -->
							<li>
								<a href="./login.html" style="font-family:  'Microsoft YaHei';"><i class="fa fa-key"></i>&nbsp;&nbsp;退出 </a>
							</li> 
						</ul>
					</li>
				</ul>
				<!-- end multiple lang -->

			</div>
			
			
			<!-- end pulled right: nav area -->

		</header>
		<!-- END HEADER -->

		<!-- Left panel : Navigation area -->
		<!-- Note: This width of the aside area can be adjusted through LESS variables -->
		<aside id="left-panel" style="top:100px;">
		
		<!-- User info -->

			<!-- end user info -->
		

			<!-- NAVIGATION : This navigation is also responsive

			To make this navigation dynamic please make sure to link the node
			(the reference to the nav > ul) after page load. Or the navigation
			will not initialize.
			-->
			<!-- <div class="login-info">
				<label>
					您的身份是<strong style="color:red;">管理员</strong>	
				</label>
			</div> -->

			<nav>
				<!-- NOTE: Notice the gaps after each icon usage <i></i>..
				Please note that these links work a bit different than
				traditional hre="" links. See documentation for details.
				-->

				<ul>
					<li >
						<a href="admin_AdClassManagement.jsp" title="Dashboard">
						<i class="fa fa-lg fa-fw fa-gear"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">班级管理</span>
						</a>
						<!-- <ul>
							<li >
								<a href="admin_AdClassManagement.jsp" style="font-family:  'Microsoft YaHei';font-size:16px; ">行政班级管理</a>
							</li>
							<li>
								<a href="admin_logicClassManagement.jsp" style="font-family:  'Microsoft YaHei';font-size:16px; ">课程班级管理</a>
							</li>
							
						</ul> -->
					</li>
					<!-- <li >
						<a href="admin_StudentManagement.html" title="Dashboard">
						<i class="fa fa-lg fa-fw fa-gear"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">学员管理</span>
						</a>
					</li> -->
					<li class="active">
						<a href="admin_TeacherManagement.jsp">
						<i class="fa fa-lg fa-fw fa-edit"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">教员管理</span>
						</a>
					</li>
					<li >
						<a href="admin_StudentManagement.jsp">
						<i class="fa fa-lg fa-fw fa-plus"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">学员管理</span>
						</a>
					</li>
					<li>
						<a href="admin_TaskManagement.jsp">
						<i class="fa fa-lg fa-fw fa-cloud-download"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; " id="PageSerDeploy">课程管理</span>
						</a>
					</li>
					<li>
						<a href="#"><i class="fa fa-lg fa-fw fa-code-fork"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">器材管理</span></a>
						<ul>
							<li>
								<a href="ad_Device.jsp" style="font-family:  'Microsoft YaHei';font-size:16px; ">设备管理</a>
							</li>
							<!--  <li>
								<a href="ad_Module.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">模块管理</a>
							</li>-->
							<li>
								<a href="ad_Board.jsp" style="font-family:  'Microsoft YaHei';font-size:16px; ">板卡模块管理</a>
							</li>
							<li>
								<a href="ad_Port.jsp" style="font-family:  'Microsoft YaHei';font-size:16px; ">接口管理</a>
							</li>
							<li>
								<a href="ad_Line.jsp" style="font-family:  'Microsoft YaHei';font-size:16px; ">线缆管理</a>
							</li>
						</ul>
					</li>
					
					<!-- <li>
						<a href="#"><i class="fa fa-lg fa-fw fa-code-fork"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">策略管理</span></a>
						<ul>
							<li>
								<a href="ServiceRoutingPolicy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">服务路由策略管理</a>
							</li>
							<li>
								<a href="LoadDistributionStrategy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">副本分配策略管理</a>
							</li>
						</ul>
					</li>
					<li class="active">
						<a href="#" ><i class="fa fa-lg fa-fw fa-sitemap"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">流程管理</span></a>
						<ul>
							<li>
								<a href="graph/businessSort.jsp" target="_blank" style="font-family:  'Microsoft YaHei';font-size:16px; ">流程编排</a>
							</li>
							<li  class="active">
								<a href="BusinessCompManag.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">业务组件管理</a>
							</li>
							<li >
								<a href="TransCompManag.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">转换组件管理</a>
							</li>
							<li>
								<a href="ProtCompManag.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">协议组件管理</a>
							</li>
						</ul>
					</li> -->
				</ul>
			</nav>
			<span class="minifyme"> <i class="fa fa-arrow-circle-left hit"></i> </span>

		</aside>
		<!-- END NAVIGATION -->

		<!-- MAIN PANEL -->
		<div id="main" role="main">


			<!-- MAIN CONTENT -->
			<div id="content">

				<div class="row">
					<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
						<h1 class="page-title txt-color-blueDark" style="font-family:'Microsoft YaHei';"><i class="fa fa-lg fa-fw fa-code-fork"></i> 教员管理 </h1>
					</div>
					<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">
						<ul id="sparks" class="">
							<li class="sparks-info" id="servicenum">
								
							</li>
							<li class="sparks-info" id="startingnum">
								
							</li>
							<li class="sparks-info" id="disconnectnum">
								
							</li>
						</ul>
					</div>
				</div>
				<div>
				<a class="btn btn-success btn-lg" href="javascript:void(0);" style="margin-bottom: 1%;float:right" id="addTea"><i class="fa fa-lg fa-fw fa-plus-circle"></i>添加教员信息</a>
				<!-- row -->
					<div class="row">
				
						<!-- NEW WIDGET START -->
						<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<!-- Widget ID (each widget will need unique ID)-->
							<div class="jarviswidget jarviswidget-color-darken" id="wid-id-4" data-widget-editbutton="false">
								
								<header>
									<span class="widget-icon"> <i class="fa fa-table"></i> </span>
									<h2>教员列表 </h2>
				
								</header>
				
								<!-- widget div-->
								<div>
				
									<!-- widget edit box -->
									<div class="jarviswidget-editbox">
										<!-- This area used as dropdown edit box -->
				
									</div>
									<!-- end widget edit box -->
				
									<!-- widget content -->
									<div class="widget-body no-padding">
										<div class="widget-body-toolbar">
											<div>
												<select class='input-sm' id='search-type' style='font-size:14px'>
													<option value=''>请选择搜索的类型</option>
													<option value='all'>全部</option>
													<option value='teaName'>教员名</option>
													<option value='teaNum'>教员编号</option>
													<option value="teaGender">性别</option>
													<option value="teaAge">年龄</option>
													<option value="teaPosition">职称</option>
												</select >
												<span class="filtertype"></span>
												<a class='btn btn-default' style="margin-left:20px" id="searchservice"><i class='fa fa-search'></i></a>
												<select class='input-sm' style="float: right;width:60px" id="itemnumber">
													<option value="5">5</option>
													<option value="1">1</option>
													<option value="15">15</option>
													<option value="20">20</option>
												</select>
											</div>
											
										</div>
										
										<table id="teaTable" class="table table-striped table-bordered table-hover">
											<thead class="thead-font">
												<tr>
													<th width="5%">序号</th>
												    <th>教员名</th>
												    <th>证件号</th>
													<th>性别</th>
													<th>年龄</th>
													<th>职称</th>
													<!-- <th>承担课程</th> -->
													<th width="15%">备注</th>
													<th colspan="3" width="20%">编辑</th>	
												</tr>
											</thead>
											<tbody class="tbody-font">
												
												<tr>
													<td>1</td>
												    <td>张三</td>
												    <td>1332116</td>
													<td value='female'>男</td>
													<td>40</td>
													<td>教授</td>
													<!-- <td>java,CAD</td> -->
													<td>教员承担课程情况不在此处展示</td>
													<td>
														<a class='btn btn-primary deleteservice btn-sm'  onclick='edit(0)'><i class='fa fa-gear'></i>&nbsp;&nbsp;修改</a>
													</td>
													<td>
														<a class='btn btn-danger deleteservice btn-sm' ><i class='fa fa-times-circle'></i>&nbsp;&nbsp;删除</a>
													</td>
												</tr>					
											</tbody>
										</table>
										<div style="float:right;margin-right:20px;height:60px">
											<ul class="pagination pagination-sm" style="margin-top:10px">
													
											</ul>
										</div>
									</div>
									<!-- end widget content -->
				
								</div>
								<!-- end widget div -->
				
							</div>
							<!-- end widget -->
							</article>
							</div>			
				
				</div>
			</div>
			<!-- END MAIN CONTENT -->
			<div class="page1 dialog-message">
			<form  class="form-horizontal" style="width:60%;margin-left:20%;font-size:16px;font-family:'Microsoft YaHei'">
			<div class="form-group">
					<label class="control-label col-md-2">姓名:</label>
					<div class=" col-md-10">
						<input name="teaname" value="" id="teaname" class="form-control">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">年龄:</label>
					<div class=" col-md-10">
					<input name="teaage" value="" id="teaage" class="form-control">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">性别:</label>
					<div class=" col-md-10">
					<input type="radio" name="teasex" value="male">男
					<input type="radio" name="teasex" value="female">女
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">职称:</label>
					<div class=" col-md-10">
						<select name="teapos"  id="teapos" class="form-control">
							<option value='professor'>教授</option>
						<option value='associate professor'>副教授</option>
						<option value='lecturer'>讲师</option>
						<option value='assistant'>助教</option>
						</select>
					</div>
				</div>
				<!-- <div class="form-group">
					<label class="control-label col-md-2">承担课程:</label>
					<div class="col-md-10">
						<input type="checkbox" name='teaCourse'>java
						<input type="checkbox" name='teaCourse'>c++
						<input type="checkbox" name='teaCourse'>c#
					</div>
				</div>  -->
				<div class="form-group">
					<label class="control-label col-md-2">备注：</label>
					<div class="col-md-10">
						<textarea class="form-control col-md-10"  rows="5" id="teades" name="teades"></textarea>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2"></label>
					<div class=" col-md-10">
						<button type="button" class="btn btn-success"  id="editSubmit">提交</button>
					</div> 
				</div>				
			</form>
			<div class="hr hr-12 hr-double"></div>
		</div>
		<div  class="page2 dialog-message">
			<form  class="form-horizontal" style="width:80%;margin-left:10%;font-size:16px;font-family:'Microsoft YaHei'">
				<div class="form-group">
					<label class="control-label col-md-2">姓名:</label>
					<div class=" col-md-10">
						<input name="newCompName" value="" id="newCompName" class="form-control">
					</div>
				</div>
				
				<div class="form-group">
					<label class="control-label col-md-2">教师编号:</label>
					<div class=" col-md-10">
						<input name="newCompId" value="" id="newCompId" class="form-control">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">年龄:</label>
					<div class=" col-md-10">
					<input name="newCompAge" value="" id="newCompAge" class="form-control">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">性别:</label>
					<div class=" col-md-10">
					<input type="radio" name="newCompSex" value="male">男
					<input type="radio" name="newCompSex" value="female">女
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">职称:</label>
					<div class=" col-md-10">
					<select name="newCompType" value="" id="newCompType" class="form-control">
						<option value='professor'>教授</option>
						<option value='associate professor'>副教授</option>
						<option value='lecturer'>讲师</option>
						<option value='assistant'>助教</option>
					</select>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2">备注:</label>
					<div class=" col-md-10">
						<textarea class="form-control col-md-10" rows="5" id="newCompDes"></textarea>
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-md-2"></label>
					<div class=" col-md-10">
						<button type="button" class="btn btn-success"  id="addComp" >提交</button>
					</div> 
				</div>
				
			</form>
			

			<div class="hr hr-12 hr-double"></div>
		
		</div>
		<div class="page3 dialog-message">
			<form  class="form-horizontal" style="width:40%;margin-left:20%;font-size:16px;font-family:'Microsoft YaHei'">
				<div class="form-group">
					<label class="control-label col-md-3">原密码：</label>
					<div class=" col-md-6">
						<input type="password" name="teaPass" value="" id="teaPass" class="form-control">
					</div>
					<label class="control-label col-md-3" style="color:red;"></label>
				</div>
				<div class="form-group">
					<label class="control-label col-md-3">新密码：</label>
					<div class=" col-md-6">
						<input type="password" name="teaPass" value="" id="teaPassNew" class="form-control">
					</div>
					
				</div>
				<div class="form-group">
					<label class="control-label col-md-3">确认密码：</label>
					<div class=" col-md-6">
						<input type="password" name="teaPass" value="" id="reteaNewPass" class="form-control">
					</div>
					<label class="control-label col-md-3" style="color:red;"></label>
				</div>
				<div class="form-group">
					<label class="control-label col-md-3"></label>
					<div class=" col-md-9">
						<button type="button" class="btn btn-success"  id="modify_ok" >提交</button>
					</div> 
				</div>
			</form>
			<div class="hr hr-12 hr-double"></div>
		</div>    
		 
		
		</div>
		<!-- END MAIN PANEL -->

		<!-- SHORTCUT AREA : With large tiles (activated via clicking user name tag)
		Note: These tiles are completely responsive,
		you can add as many as you like
		-->
		<!-- END SHORTCUT AREA -->

		<!--================================================== -->

		<!-- PACE LOADER - turn this on if you want ajax loading to show (caution: uses lots of memory on iDevices)-->
		<script data-pace-options='{ "restartOnRequestAfter": true }' src="js/plugin/pace/pace.min.js"></script>

		<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
		<script src="js/libs/jquery-2.0.2.min.js"></script>

		<script src="js/libs/jquery-ui.min.js"></script>
		
		<script src="js/libs/jquery-ui-1.10.3.min.js"></script>

		<!-- JS TOUCH : include this plugin for mobile drag / drop touch events
		<script src="js/plugin/jquery-touch/jquery.ui.touch-punch.min.js"></script> -->

		<!-- BOOTSTRAP JS -->
		<script src="js/bootstrap/bootstrap.min.js"></script>

		<!-- CUSTOM NOTIFICATION -->
		<script src="js/notification/SmartNotification.min.js"></script>

		<!-- JARVIS WIDGETS -->
		<script src="js/smartwidgets/jarvis.widget.min.js"></script>

		<!-- EASY PIE CHARTS -->
		<script src="js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js"></script>

		<!-- SPARKLINES -->
		<script src="js/plugin/sparkline/jquery.sparkline.min.js"></script>

		<!-- JQUERY VALIDATE -->
		<script src="js/plugin/jquery-validate/jquery.validate.min.js"></script>

		<!-- JQUERY MASKED INPUT -->
		<script src="js/plugin/masked-input/jquery.maskedinput.min.js"></script>

		<!-- JQUERY SELECT2 INPUT -->
		<script src="js/plugin/select2/select2.min.js"></script>

		<!-- JQUERY UI + Bootstrap Slider -->
		<script src="js/plugin/bootstrap-slider/bootstrap-slider.min.js"></script>

		<!-- browser msie issue fix -->
		<script src="js/plugin/msie-fix/jquery.mb.browser.min.js"></script>

		<!-- FastClick: For mobile devices -->
		<script src="js/plugin/fastclick/fastclick.js"></script>

		<!--[if IE 7]>

		<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

		<![endif]-->

		<!-- Demo purpose only -->
		<script src="js/demo.js"></script>

		<!-- MAIN APP JS FILE -->
		<script src="js/app.js"></script>
		
		<!-- PAGE RELATED PLUGIN(S) -->
		
		<!-- Flot Chart Plugin: Flot Engine, Flot Resizer, Flot Tooltip -->
		<script src="js/plugin/flot/jquery.flot.cust.js"></script>
		<script src="js/plugin/flot/jquery.flot.resize.js"></script>
		<script src="js/plugin/flot/jquery.flot.tooltip.js"></script>
		
		<!-- Vector Maps Plugin: Vectormap engine, Vectormap language -->
		<script src="js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js"></script>
		<script src="js/plugin/vectormap/jquery-jvectormap-world-mill-en.js"></script>
		
		<!-- PAGE RELATED PLUGIN(S) -->
		<script src="js/plugin/jquery-form/jquery-form.min.js"></script>
		
		<!-- PAGE RELATED PLUGIN(S) -->
		<script src="js/plugin/datatables/jquery.dataTables-cust.min.js"></script>
		<script src="js/plugin/datatables/ColReorder.min.js"></script>
		<script src="js/plugin/datatables/FixedColumns.min.js"></script>
		<script src="js/plugin/datatables/ColVis.min.js"></script>
		<script src="js/plugin/datatables/ZeroClipboard.js"></script>
		<script src="js/plugin/datatables/media/js/TableTools.min.js"></script>
		<script src="js/plugin/datatables/DT_bootstrap.js"></script>

		<script src="js/add/admin_Tea.js"></script>
		

</html>