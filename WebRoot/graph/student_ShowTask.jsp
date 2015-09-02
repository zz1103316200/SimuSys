<%@ page language="java" import="javax.servlet.http.*" pageEncoding="utf-8"%>
<%
System.out.println("--------name1");
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

if(request.getSession().getAttribute("name")==null){
	response.sendRedirect("../login.html");
	return;
}
String name = (String)request.getSession().getAttribute("name");
String password = (String)request.getSession().getAttribute("password");
System.out.println("--------name"+name);

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
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
	<link rel="stylesheet" type="text/css" media="screen" href="../css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" media="screen" href="../css/font-awesome.min.css">

	<!-- SmartAdmin Styles : Please note (smartadmin-production.css) was created using LESS variables -->
	<link rel="stylesheet" type="text/css" media="screen" href="../css/smartadmin-production.css">
	<link rel="stylesheet" type="text/css" media="screen" href="../css/smartadmin-skins.css">

	<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
	<link rel="stylesheet" type="text/css" media="screen" href="../css/demo.css">

	<!-- FAVICONS -->
	<link rel="shortcut icon" href="../img/favicon/favicon.ico" type="image/x-icon">
	<link rel="icon" href="../img/favicon/favicon.ico" type="../image/x-icon">
	
	<!-- 自己加的 -->
	<link rel="stylesheet" type="text/css" media="screen" href="../css/wxh.css">
	
	<!-- GOOGLE FONT -->
	<!--  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">-->
	
	<style>
	body{
		font-family: "Microsoft YaHei" !important;
	}
	.node {
	  stroke: #fff;
	  stroke-width: 1.5px;
	}
	
	.link {
	  stroke: #999;
	  stroke-opacity: .6;
	}
	
	</style>
  </head>
  
  <body onload="main(document.getElementById('graphContainer'),
		 	document.getElementById('toolbarContainer'),
			document.getElementById('sidebarContainer'))">
    
	<header id="header" style="height:100px;">
		<div id="logo-group" style="width:100%;">

			<!-- PLACE YOUR LOGO HERE -->
			<span id="logo" style="width:450px;color:white;font-size:21px;font-family:  'Microsoft YaHei' ;"> <img src="../img/school.jpg" alt="SmartAdmin" style="height:80px;width:80px;">通信设备组网流程化操作原型系统</span>
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
			<label class="TitleLabel">作业管理</label>
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
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img alt="" src="../img/avatar1.jpg"> <span id="login_username" pid="<%=password %>"><%=name %></span> <i class="fa fa-angle-down"></i> </a>
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
								<a href="../login.html" style="font-family:  'Microsoft YaHei';"><i class="fa fa-key"></i>&nbsp;&nbsp;退出 </a>
							</li> 
						</ul>
					</li>
				</ul>
			<!-- end multiple lang -->

		</div>
		
		
		<!-- end pulled right: nav area -->

	</header>
	<!-- END HEADER -->
	<!-- Note: This width of the aside area can be adjusted through LESS variables -->
	<aside id="left-panel" style="top:100px;">
	
	<!-- User info -->

		<!-- end user info -->
	

		<!-- NAVIGATION : This navigation is also responsive

		To make this navigation dynamic please make sure to link the node
		(the reference to the nav > ul) after page load. Or the navigation
		will not initialize.
		-->
		<!-- <nav>

			<ul>
				<li>
					<a href="#" title="添加流程">
					<i class="fa fa-lg fa-fw fa-gear"></i> 
					<span class="" style="font-family:  'Microsoft YaHei';font-size:16px; ">作业管理</span>
					</a>
				</li>
				<li>
					<a href="#"><i class="fa fa-lg fa-fw fa-sitemap"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; ">作业管理</span></a>
					<ul id="ul_element_list">

					</ul>
				</li>
			</ul>
		</nav>
		<span class="minifyme"> <i class="fa fa-arrow-circle-left hit"></i> </span> -->
		<!-- <div class="login-info">
			<label>
				您的身份是<strong style="color:red;">学员</strong>	
			</label>
		</div> -->

		<nav>
			<!-- NOTE: Notice the gaps after each icon usage <i></i>..
			Please note that these links work a bit different than
			traditional hre="" links. See documentation for details.
			-->

			<ul>
				<!-- <li>
						<a href="../student_ChooseCourse.jsp">
						<i class="fa fa-lg fa-fw fa-plus"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; " id="PageSerDeploy">选课</span>
						</a>
					</li> -->
					<li class="active">
						<a href="../student_TaskUnfinished.jsp">
						<i class="fa fa-lg fa-fw fa-code-fork"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; " id="PageSerDeploy">待完成作业</span>
						</a>
					</li>
					<li>
						<a href="../student_TaskHistory.jsp">
						<i class="fa fa-lg fa-fw fa-cloud-download"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; " id="PageSerDeploy">已完成作业</span>
						</a>
					</li>
					<li>
						<a href="../student_define.jsp">
						<i class="fa fa-lg fa-fw fa-cloud-download"></i> 
						<span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; " id="PageSerDeploy">自定义作业</span>
						</a>
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
	<div id="main" role="main" style="font-family:'Microsoft YaHei'">

			<!-- MAIN CONTENT -->
			<div id="content">

				<div class="row">
					<div class="col-xs-12 col-sm-7 col-md-7 col-lg-10">
						<h1 class="page-title txt-color-blueDark"><i class="fa-fw fa fa-sitemap"></i> 作业管理 </h1>
					</div>		
				</div>
				<section id="widget-grid" class="">
				<!-- widget grid -->
				<div class="row">
				<!-- <div class="jarviswidget jarviswidget-color-darken" id="wid-id-1" data-widget-editbutton="false"> -->
					<div id="toolbarContainer"
						style="position:absolute;white-space:nowrap;overflow:hidden;left:0px;max-height:46px;height:58px;right:0px;padding:4px;background-color:white;">
					</div>

					<!-- Creates a container for the sidebar -->
					<div id="sidebarContainer"
						style="position:fixed;overflow:auto;top:220px;right:0;bottom:0px;max-width:203px;width:180px;padding-top:32px;padding-left:4px;padding-right:4px;background-color:white;z-index:1;">
						<nav>
						<ul>
							<li>
								<a href="#"><i class="fa fa-lg fa-fw fa-random"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px; color:black;">设备</span></a>
								<ul class="modelType2">
									<!-- <li>
										<a href="ServiceRoutingPolicy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">服务路由策略管理</a>
									</li>
									<li>
										<a href="LoadDistributionStrategy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">副本分配策略管理</a>
									</li> -->
								</ul>
							</li>
						</ul>
						<!-- <ul>
							<li>
								<a href="#"><i class="fa fa-lg fa-fw fa-suitcase"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px;  color:black;">板卡</span></a>
								<ul class="modelType2">
									<li>
										<a href="ServiceRoutingPolicy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">服务路由策略管理</a>
									</li>
									<li>
										<a href="LoadDistributionStrategy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">副本分配策略管理</a>
									</li>
								</ul>
							</li>
						</ul> -->
						<ul>
							<li>
								<a href="#"><i class="fa fa-lg fa-fw fa-code-fork"></i> <span class="menu-item-parent" style="font-family:  'Microsoft YaHei';font-size:16px;  color:black;">线缆</span></a>
								<ul class="modelType3">
									<!-- <li>
										<a href="ServiceRoutingPolicy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">服务路由策略管理</a>
									</li>
									<li>
										<a href="LoadDistributionStrategy.html" style="font-family:  'Microsoft YaHei';font-size:16px; ">副本分配策略管理</a>
									</li> -->
								</ul>
							</li>
						</ul>
						</nav>
					</div>

					<!-- Creates a container for the graph -->
					<div id="graphContainer"
						style="position:absolute;overflow:auto;top:128px;left:20px;right:0px;background-image:url('editors/images/grid.gif');cursor:default;">
					</div>
				<!-- </div> -->
				</div>
				<!-- end widget grid -->
				<!-- <div class="row" style="position:fixed;top:760px;width:1500px;">
					Widget ID (each widget will need unique ID)
					<div class="jarviswidget" id="wid-id-1" data-widget-editbutton="false">
				
						<header>
							<span class="widget-icon"> <i class="fa fa-edit"></i> </span>
							<h2>控制台</h2>				
					
						</header>

						widget div
						<div>
							<textarea class="col-sm-12 col-md-12 col-lg-12" rows="8" name="info" placeholder="Additional info"></textarea> 
						</div>
						end widget div
				
					</div>
			end widget
					
				</div> -->
			</section>
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

		
		<script data-pace-options='{ "restartOnRequestAfter": true }' src="../js/plugin/pace/pace.min.js"></script>

		<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
		<script src="../js/libs/jquery-2.0.2.min.js"></script>

		<script src="../js/libs/jquery-ui.min.js"></script>
		
		<script src="../js/libs/jquery-ui-1.10.3.min.js"></script>

		
		<!-- BOOTSTRAP JS -->
		<script src="../js/bootstrap/bootstrap.min.js"></script>

		<!-- CUSTOM NOTIFICATION -->
		<script src="../js/notification/SmartNotification.min.js"></script>

		<!-- JARVIS WIDGETS -->
		<script src="../js/smartwidgets/jarvis.widget.min.js"></script>

		<!-- EASY PIE CHARTS -->
		<script src="../js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js"></script>

		<!-- SPARKLINES -->
		<script src="../js/plugin/sparkline/jquery.sparkline.min.js"></script>

		<!-- JQUERY VALIDATE -->
		<script src="../js/plugin/jquery-validate/jquery.validate.min.js"></script>

		<!-- JQUERY MASKED INPUT -->
		<script src="../js/plugin/masked-input/jquery.maskedinput.min.js"></script>

		<!-- JQUERY SELECT2 INPUT -->
		<script src="../js/plugin/select2/select2.min.js"></script>

		<!-- JQUERY UI + Bootstrap Slider -->
		<script src="../js/plugin/bootstrap-slider/bootstrap-slider.min.js"></script>

		<!-- browser msie issue fix -->
		<script src="../js/plugin/msie-fix/jquery.mb.browser.min.js"></script>

		<!-- FastClick: For mobile devices -->
		<script src="../js/plugin/fastclick/fastclick.js"></script>
		<!--[if IE 7]>

		<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

		<![endif]-->

		<!-- Demo purpose only -->
		<script src="../js/demo.js"></script>

		<!-- MAIN APP JS FILE -->
		<script src="../js/app.js"></script>

		
		<!-- PAGE RELATED PLUGIN(S) -->
	    <script src="../js/plugin/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
		
		<!-- PAGE RELATED PLUGIN(S) -->
		<script src="../js/plugin/jquery-form/jquery-form.min.js"></script>

		<!-- jgrap -->
		<script type="text/javascript">
			mxBasePath = '../src';
		</script>
		<!-- <script type="text/javascript" src="./media/js/showBusiness.js"
			charset="utf-8"></script> -->
		<script type="text/javascript" src="./media/js/showBusiness1.js"
			charset="utf-8"></script>
		<!-- <script type="text/javascript" src="./media/js/businessMain.js"
			charset="utf-8"></script> -->
		<script type="text/javascript" src="./media/js/stu_showMain.js"
			charset="utf-8"></script>
		<script type="text/javascript" src="./media/js/mxClient.js"></script>
		<!--<script src="media/js/layout.js" type="text/javascript"
			charset="utf-8"></script>-->
		<script src="./media/js/devAttr/devAttr.js"></script>
		<script src="./media/js/stu_showTask.js"></script>
  </body>
</html>