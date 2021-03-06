function main(container, toolbar, sidebar)		
{
			//var devList='[]';//设备列表Json数组
			//console.log("设备列表："+devList);
			// Checks if the browser is supported
			// 浏览器兼容检测  
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is not supported.
				mxUtils.error('浏览器不支持!', 200, false);
			}
			else
			{
				// Assigns some global constants for general behaviour, eg. minimum
				// size (in pixels) of the active region for triggering creation of
				// new connections, the portion (100%) of the cell area to be used
				// for triggering new connections, as well as some fading options for
				// windows and the rubberband selection.
				// 定义全局变量，如用于触发建立新的连接的活动区域的最小尺寸（以像素为单位），该部分（100％）的小区区域被用于触发新的连接，以及一些窗口和“下拉菜菜单选择 
				mxConstants.MIN_HOTSPOT_SIZE = 16;
				mxConstants.DEFAULT_HOTSPOT = 1;
				
				// Enables guides
				// 显示导航线 
				mxGraphHandler.prototype.guidesEnabled = true;

			    // Alt disables guides
				// Alt 键禁用导航线  
			    mxGuide.prototype.isEnabledForEvent = function(evt)
				{
					return !mxEvent.isAltDown(evt);
				};

				// Enables snapping waypoints to terminals
				// 自动导航目标 
				mxEdgeHandler.prototype.snapToTerminals = true;

				// Workaround for Internet Explorer ignoring certain CSS directives
				// IE浏览器样式修复
				if (mxClient.IS_QUIRKS)
				{
					document.body.style.overflow = 'auto';
					new mxDivResizer(container);
					//new mxDivResizer(outline);
					new mxDivResizer(toolbar);
					new mxDivResizer(sidebar);
					//new mxDivResizer(status);
				}
				
				// Creates a wrapper editor with a graph inside the given container.
				// The editor is used to create certain functionality for the
				// graph, such as the rubberband selection, but most parts
				// of the UI are custom in this example.
				
				// 创建图形编辑器
				var editor = new mxEditor();
				var graph = editor.graph;
				var model = graph.getModel();
				
				//注释掉不能连接
				editor.graph.setConnectable(true);
				// Disable highlight of cells when dragging from toolbar
				// 启用高亮工具栏
				graph.setDropEnabled(false);
				//graph.setConnectable(true); 
				//设置后可以整体移动
				//graph.setPanning(true);
				
				//graph.panningHandler.useLeftButtonForPanning = true;
				// Uses the port icon while connections are previewed
				// 连接预览
				graph.connectionHandler.getConnectImage = function(state)
				{
					return new mxImage(state.style[mxConstants.STYLE_IMAGE], 16, 16);
				};
				
				// Centers the port icon on the target port
				// 显示中心端口图标
				graph.connectionHandler.targetConnectImage = true;

				// Does not allow dangling edges
				 // 禁止连接线晃动 
				graph.setAllowDanglingEdges(false);
				
				//不知道是啥 设置上再说
				graph.setPortsEnabled(false);
				// 启动鼠标悬停提示.. 
                var rubberband = new mxRubberband(graph);  
                var keyHandler = new mxKeyHandler(graph);  
              //安装一个自定义的工具提示单元格..  
                graph.getTooltipForCell = function(cell)  
                {  
                		//var id=getElement(cell.getId());//得到的是初始化json之后的id序号，从0开始
                    return getToolTipValue(cell);  
                };
                
                // 安装右键点击处理程序..  
                graph.panningHandler.factoryMethod = function(menu, cell, evt)  
                {  
                    return createPopupMenu(editor,graph, menu, cell, evt);  
                };  
				
				// Sets the graph container and configures the editor
				//设置图形容器，并配置编辑器
				editor.setGraphContainer(container);
				var config = mxUtils.load(
					'editors/config/keyhandler-commons.xml').
						getDocumentElement();
				editor.configure(config);
				
				showGraph=graph;
				// Defines the default group to be used for grouping. The
				// default group is a field in the mxEditor instance that
				// is supposed to be a cell which is cloned for new cells.
				// The groupBorderSize is used to define the spacing between
				// the children of a group and the group bounds.

                // 设置默认组   
                // groupBorderSize 设置图形和它的子元素的边距。 
				var group = new mxCell('Group', new mxGeometry(), 'group');
				group.setVertex(true);
				group.setConnectable(true);
				
				editor.defaultGroup = group;
				editor.groupBorderSize = 20;

				// Disables drag-and-drop into non-swimlanes.
				// 目标是否有效 
				graph.isValidDropTarget = function(cell, cells, evt)
				{
					return this.isSwimlane(cell);
				};
				
				// Disables drilling into non-swimlanes.
				// 是否根元素
				graph.isValidRoot = function(cell)
				{
					return this.isValidDropTarget(cell);
				};

				// Does not allow selection of locked cells
				// 是否可以被选中
				graph.isCellSelectable = function(cell)
				{
					return !this.isCellLocked(cell);
				};

				//添加连线时，触发事件
				graph.addEdge = function(edge, parent, source, target, index){ 
					var sourceId1 = getElement(source.getId());
					var targetId1 = getElement(target.getId());
					var sourborderId="";
					var tarborderId="";
					var sourceId=totalJson[sourceId1].id;
					var targetId=totalJson[targetId1].id;
					var lineId=$(".modelType3>li>a>.active").attr("lineid");
					var lineColor=$(".modelType3>li>a>.active").attr("linecolor");
					//alert(lineColor);
					for(var len in totalJson[sourceId1].slot){
						if(totalJson[sourceId1].slot[len].slotState=="true"){
							sourborderId=totalJson[sourceId1].slot[len].boardInfo.boardId;
						}
					}
					for(var len in totalJson[targetId1].slot){
						if(totalJson[targetId1].slot[len].slotState=="true"){
							tarborderId=totalJson[targetId1].slot[len].boardInfo.boardId;
						}
					}
					console.log("source:"+sourborderId+"target:"+tarborderId);
					var arge=arguments;
					var that=this;
					//var arr=[];
					$.ajax({
						type:"post",
						url:"../servlet/ConnectorToInter",
						data:{
							lineId:lineId,
							sourceId:sourceId,
							targetId:targetId,
							sourborderId:sourborderId,
							tarborderId:tarborderId
						},
						success:function(resp){
							
						}
					});
						stringlineJson='{"id":"","lineId":"'+lineId+'","lineStyle":"'+lineColor+'","sourceId":"'+sourceId+'","targetId":"'+targetId+'","type":"edge","outPortJson":"","inPortJson":""}';
							//stringlineJson=JSON.parse(stringlineJson);
							//arr.push(stringlineJson);
							//arr.join(",");
							//configContent='{"line":['+arr+']}';
						var jsonFile= JSON.parse(stringlineJson);//此处用parse更为安全，将JSON串转化为JSON对象
						totalJson=eval(totalJson);
						totalJson.push(jsonFile);
						console.log("添加连线--"+JSON.stringify(totalJson));
						mxGraph.prototype.addEdge.apply(that, arge);
					//}else{
//						mxGraph.prototype.addEdge.apply(this, arguments);
//					}
//					value = mxUtils.createXmlDocument().createElement('transicion');        
//					value.setAttribute('type', 'hello');   
//					value.setAttribute('label', 'Tarea');   
//					edge.value = value;
					
//					if (isEdge(edge)){
//						   remove(getTerminal(edge, true));
//						   remove(getTerminal(edge, false));
//						}
					
					
					// "supercall"
					};
				// Returns a shorter label if the cell is collapsed and no
				// label for expanded groups
				// 返回元素 
				graph.getLabel = function(cell)
				{
					var tmp = mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
					
					if (this.isCellLocked(cell))
					{
						// Returns an empty label but makes sure an HTML
						// element is created for the label (for event
						// processing wrt the parent label)
						return '';
					}
					else if (this.isCellCollapsed(cell))
					{
						var index = tmp.indexOf('</h1>');
						
						if (index > 0)
						{
							tmp = tmp.substring(0, index+5);
						}
					}
					
					return tmp;
				};

				// 禁用HTML的泳道标签，避免冲突   
                // 判断是否为泳道标签
				graph.isHtmlLabel = function(cell)
				{
					return !this.isSwimlane(cell);
				};
				//@zw 双击元素
				graph.dblClick = function(evt, cell)
				{
					console.log(totalJson);
					// Do not fire a DOUBLE_CLICK event here as mxEditor will
					// consume the event and start the in-place editor.
					// 如果不是双击事件，编辑器会自动处理

					if (this.isEnabled() &&!mxEvent.isConsumed(evt) &&cell != null &&this.isCellEditable(cell))
					{
						if (!this.isHtmlLabel(cell))
						{					
							this.startEditingAtCell(cell);
						}else if(this.model.isVertex(cell) ){
							//alert("dbclick--vertex");
							var slotInfo;
							var interInfo='';
							var realImg;
							var strValue=cell.getValue();
							var compType=getCellType(strValue).split(",")[1];//得到组件的类型
							var realId=getCellType(strValue).split(",")[2];//设备的实际id
							//alert(realId);
							for(var i=0;i<totalJson.length;i++){
								if(totalJson[i].realId == realId ){//找到对应的设备
									//把JSON数组对象变成字符串
									realImg=totalJson[i].realUrl;//得到设备的图片
									//slotInfo= JSON.stringify(totalJson[i].slot);
									//interInfo= JSON.stringify(totalJson[i].inter);
									slotInfo= totalJson[i].slot;//得到设备的插槽信息
									interInfo= totalJson[i].inter;//得到设备的接口信息,但是这里的接口信息不包括参数信息
								}
							}
							//alert(JSON.stringify(slotInfo));
							//alert(JSON.stringify(interInfo));
							//把接口参数保存起来
							//不能把修改过的JSON串直接赋给interInfo数组，好像存在引用的问题，会把totalJson也改掉，但是好像还是不很明白
							var newInfo='[';//newInfo是加了参数信息以后的接口信息
							if(devInfo.length==0 || interInfo.length == 0){
								newInfo='""';
							}
							else {
								for(var i=0;i<devInfo.length;i++){
									if(devInfo[i].id == realId){
										for(var j=0;j<interInfo.length;j++){
											if(interInfo[j].interId == devInfo[i].inter[j].interId){
												var interStr=JSON.stringify(interInfo[j]);
												var insertStr=JSON.stringify(devInfo[i].inter[j].parameters);
												interStr=interStr.substring(0, interStr.length-1)+',"parameters":'+insertStr+'}';
												//alert(interStr);
												newInfo+=interStr+",";
												//alert(newInfo);
											}
										}
									}
								}
								newInfo=newInfo.substring(0, newInfo.length-1);
								newInfo+=']';
							}
							
							var content = document.createElement('div');
							
			/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							var child = document.createElement('div');
							
							content.appendChild(child);
							//alert(newInfo);
							
							var dAW = new devAttrWindow(child, 800, 700, realImg, JSON.parse(newInfo), slotInfo);
							showWindow=	showModalWindow(this, '属性', content, 800, 600,"device");//把这个放在前面
							
							
							
							var dAW_body=new devAttrBody(dAW.body,784,570,realId);
							
							var configTab = dAW_body.createTab('参数配置', 'devConfig', true);
							dAW_body.configTab(configTab);
							
							var viewTab = dAW_body.createTab('设备配置', 'devView', false);
							dAW_body.viewTab(viewTab);
						}
						else if(this.model.isEdge(cell))
						{
							//alert("dbclick--edge");
							var sourceid=cell.source.getParent().getId();//设备id
							var targetid=cell.target.getParent().getId();
							var sourceportid=cell.source.getId();//接口id
							var targetportid=cell.target.getId();
							var cellId=cell.getId();
							var linePageId = getElement(cellId);
							console.log("  linePageId:"+linePageId);
							//alert("输入口id:"+sourceid+"输出口id:"+targetid);//此处的id是入口和出口设备的id,而不是出口和入口的id
							var content = document.createElement('div');
							var container = configInters(content,cell,totalJson[linePageId]);
							//特此注意，弹框是在调用showModalWindow之后才出现的
							showWindow=	showModalWindow(this, '接口配置信息', content, 650, 300,"line");
							var addOK = document.getElementById("addOK");
								addOK.onclick=function(event){
									if(outPortJson.charAt(outPortJson.length-1)==","){
										outPortJson=outPortJson.substring(0,outPortJson.length-1);
									}
									if(inPortJson.charAt(inPortJson.length-1)==","){
										inPortJson=inPortJson.substring(0,inPortJson.length-1);
									}
									var configoutputPurt=outPortJson+']';
									var configinputPurt=inPortJson+']';
									//var configinputPurtJson=JSON.parse(configinputPurt);
									//console.log(configinputPurtJson[0]);
									for(var j in totalJson){
										if(totalJson[j].sourceId==sourceid&&totalJson[j].targetId==targetid){
											totalJson[j].outPortJson=JSON.parse(configoutputPurt);
											totalJson[j].inPortJson=JSON.parse(configinputPurt);
											//totalJson[j].id=cellId;
										}
									 }
									//configContent='[{"id":"","sourceId":"'+sourceid+'","sourcePortId":"'+sourceportid+'","targetId":"'+targetid+'","targePortId":"'+targetportid+'","type":"edge","lineId":"'+cellId+'","outPortJson":'+configoutputPurt+',"inPortJson":'+configinputPurt+'}]';
									//var jsonFile= JSON.parse(configContent);//此处用parse更为安全
								//	console.log(jsonFile);
								//	totalJson=eval(totalJson);
									//totalJson[totalJson.length]=jsonFile[0];
									event.preventDefault();
									for(var i=0;i<totalJson.length;i++){
										console.log(totalJson[i]);
									}
									//console.log(totalJson[2].sourceid+"---"+totalJson[2]);
									
								}
						}
					}

					// Disables any default behaviour for the double click
					 // 禁用任何默认双击行为 
					//mxEvent.consume(evt);
				};
				// Adds all required styles to the graph (see below)
				// 配置样式 
				configureStylesheet(graph);
												
				//下边这个是左边栏里的各种可以拖拉拽的控件
				$.post("../servlet/getAllDevice",{taskId:-1},function(text){
					//alert("1");
					devInfo=text;
				 	//75表示的是里面的浅蓝块的颜色，width和height表示的是图片的大小
				 	for(var i=0;i<text.length;i++){
				 		if(text[i].type=="2"){
				 			addSidebarIcon(graph, sidebar,
					 				'<h1 style="margin:0px;display:none;">'+text[i].name+','+text[i].type+','+text[i].id+'</h1>'+
					 				'<img src="images/icons48/business/'+text[i].deviceUrl+'" style="width:100;height:100;max-width:none;">'
					 			    ,
					 				'images/icons48/business/'+text[i].deviceUrl,text[i].realUrl,75,75,text[i].type,text[i].inter,text[i].slot,text[i].deviceUrl);
				 		}
				 		else if(text[i].type=="3"){
				 			addSidebarIcon(graph, sidebar,
					 				'<h1 style="margin:0px;display:none;">'+text[i].name+','+text[i].type+','+text[i].id+'</h1>'+
					 				'<img src="images/icons48/business/'+text[i].url+'" style="width:100;height:100;max-width:none;">'
					 			    ,
					 				'images/icons48/business/'+text[i].url,text[i].cableStyle,75,75,text[i].type,text[i].id,"",text[i].deviceUrl);
				 			//console.log(text[i].cableStyle);
				 		}
				 		
				 	}
				 });
                //在h2里加个数字是为了区分，不同的组件
			   /* addSidebarIcon(graph, sidebar,
					'<h1 style="margin:0px;display:none;">Start,1</h1>'+
					'<img src="images/icons48/business/Start.png" style="width:85;height:85;max-width:none;">'
				    ,
					'images/icons48/business/Start.png',60,60,1);
				addSidebarIcon(graph, sidebar,
					'<h1 style="margin:0px;display:none;">End,1</h1>'+
					'<img src="images/icons48/business/End.png" style="width:85;height:85;max-width:none;">'
				    ,
					'images/icons48/business/End.png',60,60,1);
				addSidebarIcon(graph, sidebar,
						'<h1 style="margin:0px;display:none;">Choice,3</h1>'+
						'<img src="images/icons48/business/Choice.png" style="width:85;height:85;max-width:none;">'
					    ,
						'images/icons48/business/Choice.png',60,60,3);
				addSidebarIcon(graph, sidebar,
						'<h1 style="margin:0px;display:none;">Resequence,3</h1>'+
						'<img src="images/icons48/business/ALL.png" style="width:85;height:85;max-width:none;">'
					    ,
						'images/icons48/business/ALL.png',60,60,3);
				addSidebarIcon(graph, sidebar,
						'<h1 style="margin:0px;display:none;">Splitter,1</h1>'+
						'<img src="images/icons48/business/Splitter.png" style="width:85;height:85;max-width:none;">'
					    ,
						'images/icons48/business/Splitter.png',60,60,1);
				addSidebarIcon(graph, sidebar,
						'<h1 style="margin:0px;display:none;">Aggregator,1</h1>'+
						'<img src="images/icons48/business/CollectionAggregator.png" style="width:85;height:85;max-width:none;">'
					    ,
						'images/icons48/business/CollectionAggregator.png',60,60,1);
				addSidebarIcon(graph, sidebar,
						'<h1 style="margin:0px;display:none;">Option,1</h1>'+
						'<img src="images/icons48/business/FirstSuccessful.png" style="width:85;height:85;max-width:none;">'
					    ,
						'images/icons48/business/FirstSuccessful.png',60,60,1);*/
				// Displays useful hints in a small semi-transparent box.
				// 在一个半透明的窗口中显示提示图标
//				var hints = document.createElement('div');
//				hints.style.position = 'absolute';
//				hints.style.overflow = 'hidden';
//				hints.style.width = '230px';
//				hints.style.bottom = '56px';
//				hints.style.height = '76px';
//				hints.style.right = '20px';
//				
//				hints.style.background = 'black';
//				hints.style.color = 'white';
//				hints.style.fontFamily = 'Arial';
//				hints.style.fontSize = '10px';
//				hints.style.padding = '4px';
				
				// Creates a new DIV that is used as a toolbar and adds
				// toolbar buttons.
				// 创建一个新的DIV容器作为一个工具栏，添加工具栏按钮。 
				var spacer = document.createElement('div');
				spacer.style.display = 'inline';
				spacer.style.padding = '8px';
				
			   //	addToolbarButton(editor, toolbar, 'groupOrUngroup', '(Un)group', 'images/group.png');
				
				// Defines a new action for deleting or ungrouping
//				editor.addAction('groupOrUngroup', function(editor, cell)
//				{
//					cell = cell || editor.graph.getSelectionCell();
//					if (cell != null && editor.graph.isSwimlane(cell))
//					{
//						editor.execute('ungroup', cell);
//					}
//					else
//					{
//						editor.execute('group');
//					}
//				});
				
				
				//顶部按钮的调用
//				addToolbarButton(editor, toolbar, 'deploy', '上传作业', 'images/flowDeploy.png','btn btn-primary');
//				editor.addAction('deploy',function(editor,cell){
//					var taskId = getUserName(window.location.search);
//					for (var key in graph.getModel().cells){   
//					     // alert("123");
//						  var tmp = graph.getModel().getCell(key);
//						  //alert(tmp.getValue());
//						  if(tmp.isEdge()){
//							  for(var j in totalJson){
//									if(totalJson[j].sourceId==tmp.source.getId()&&totalJson[j].targetId==tmp.target.getId()){
//										//totalJson[j].outPortJson=JSON.parse(configoutputPurt);
//										//totalJson[j].inPortJson=JSON.parse(configinputPurt);
//										totalJson[j].id=tmp.getId();
//									}
//								 }
//						  }
//					}
//					if(confirm("确认要上传？")){ 
//						//alert("sss");
//						$.post("../servlet/saveTaskServlet",{totalJson:JSON.stringify(totalJson),taskId:taskId,type:"upload"},function(text){
//							console.log(text);  
//							if(text){
//								  alert("上传成功！");
//							  }else{
//								  alert("上传失败！");
//							  }
//						   });
//						} 
//				        //window.location.href="../servlet/SubmitBusinessDServlet?submitJson="+JSON.stringify(submitJson);
//				});
				
				
				addToolbarButton(editor, toolbar, 'register', '保存', 'images/flowSwitch.png','btn btn-warning');
				editor.addAction('register',function(editor,cell){
					//var taskId = getUserName(window.location.search);
					for (var key in graph.getModel().cells){   
					     // alert("123");
						  var tmp = graph.getModel().getCell(key);
						  //alert(tmp.getValue());
						  if(tmp.isEdge()){
							  for(var j in totalJson){
									if(totalJson[j].sourceId==tmp.source.getId()&&totalJson[j].targetId==tmp.target.getId()){
										//totalJson[j].outPortJson=JSON.parse(configoutputPurt);
										//totalJson[j].inPortJson=JSON.parse(configinputPurt);
										totalJson[j].id=tmp.getId();
									}
								 }
						  }
					}
					$.post("../servlet/saveTaskServlet",{totalJson:JSON.stringify(totalJson),taskId:-1,type:"define"},function(text){
						console.log(text);  
						if(text){
							  alert("保存成功！");
						  }else{
							  alert("保存失败！");
						  }
					   });
					
				});
				
				// Creates the outline (navigator, overview) for moving
				// around the graph in the top, right corner of the window.
				// 图形窗口的右上角的周围创建导航提示。
				//var outln = new mxOutline(graph, outline);

				// To show the images in the outline, uncomment the following code
				//outln.outline.labelsVisible = true;
				//outln.outline.setHtmlLabels(true);
				
				// Fades-out the splash screen after the UI has been loaded.
				// 淡出了启动后，屏幕的UI已经被加载   

//				var splash = document.getElementById('splash');
//				if (splash != null)
//				{
//					try
//					{
//						mxEvent.release(splash);
//						mxEffects.fadeOut(splash, 100, true);
//					}
//					catch (e)
//					{
//					
//						// mxUtils is not available (library not loaded)
//						splash.parentNode.removeChild(splash);
//					}
//				}
				//funct1(graph, evt, cell);
				//var taskId = getUserName(window.location.search);
				//funct1(graph, evt, cell,taskId,"isStudent");
			}			
		};