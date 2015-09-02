package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import xd.simu.dao.DeviceDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.dao.SlotDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.DeviceVo;

import xd.simu.vo.InterfaceRelevantNumVo;
import xd.simu.vo.InterfaceRelevantVo;
import xd.simu.vo.SlotVo;
import xd.simu.vo.TeacherVo;

public class searchDevice extends HttpServlet {

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request,response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		
		System.out.println("**********************searchClass********************");
		
		String search_type=request.getParameter("search_type");
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		//Mysql 中limit的初始录行的偏移量是0
		
		page=(page-1)*pagenum;
		
	//	System.out.print("+++++++++++++++++++++++++++++");
		DeviceDao devicetable=new DeviceDao();
		InterfaceDao interfacetable=new InterfaceDao();
		SlotDao slottable=new SlotDao();
		
		
		List<DeviceVo> deviceList=new ArrayList<DeviceVo>();
		List<InterfaceRelevantNumVo> interfaceList=new ArrayList<InterfaceRelevantNumVo>();
		List<SlotVo> slotList=new ArrayList<SlotVo>();	
		
		JSONArray deviceJson=new JSONArray();
		JSONArray interfaceJson=new JSONArray();
		JSONArray slotJson=new JSONArray();
		
		int length =0;
		
		search_type=search_type.trim();
		//System.out.println(search_type.length());
		/*	<option value="all">全部</option>
			<option value="deviceID">设备名称</option>
			<option value="practoryName">厂商名称</option>
			<option value="deviceStyle">设备类型</option>*/
		 //全部
		 if(search_type=="all"||search_type.equals("all"))
		 {
			 Object []obj={page,pagenum};
			 deviceList=devicetable.select(obj);
			 length=devicetable.selectCount();
		 }
		 //设备名称
		 else if(search_type=="deviceName"||search_type.equals("deviceName"))
		 {
			 String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 deviceList=devicetable.selectByDeviceName(obj);
			 length=devicetable.selectCountByDeviceName(new Object[]{searchvalue});
		}
		 //厂家名称
		else if(search_type=="practoryName"||search_type.equals("practoryName"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 deviceList=devicetable.selectByPractoryName(obj);
			 length=devicetable.selectCountByPractoryName(new Object[]{searchvalue});
		}
		 //设备类型
		else if(search_type=="deviceStyle"||search_type.equals("deviceStyle"))
		{
			String searchvalue=request.getParameter("key");
			 Object []obj={searchvalue,page,pagenum};
			 System.out.println(searchvalue);
			 deviceList=devicetable.selectByDeviceStyle(obj);
			 length=devicetable.selectCountByDeviceStyle(new Object[]{searchvalue});
		}
			int CountPage=0;
			if(length!=0)
			{
				CountPage=((length-1)/pagenum)+1;
			}
			
			System.out.println("总长度:"+length+",长度："+deviceList.size()+",总页数："+CountPage);
			
			for(int i=0;i<deviceList.size();i++){
				DeviceVo temp =deviceList.get(i); 
				JSONObject json = new JSONObject();
				JSONObject interfaceJsonObj=new JSONObject();
				JSONObject slotJsonObj=new JSONObject();
				try {
					json.put("deviceName", temp.getDeviceName());
					json.put("deviceID", temp.getDeviceID());
					json.put("factoryName",temp.getPractoryName());
					json.put("deviceType",temp.getDeviceStyle());
					json.put("deviceDes",temp.getDescription());
					System.out.println(temp.getDeviceID());
					interfaceList=interfacetable.SelectByInterfaceID(new Object[]{temp.getDeviceID()});
				//	System.out.println(interfaceList.size());
					for(int j=0;j<interfaceList.size();j++)		
					{
						InterfaceRelevantNumVo interfaceTemp=interfaceList.get(j);
						interfaceJsonObj.put("portName", interfaceTemp.getInterfaceStyle());
						interfaceJsonObj.put("portID", interfaceTemp.getInterfaceID());
						interfaceJsonObj.put("portNum", interfaceTemp.getInterfaceNum());
						
						
					}
					interfaceJson.add(interfaceJsonObj);
					slotList=slottable.selectBySlotID(new Object[]{temp.getDeviceID()});
					for(int j=0;j<slotList.size();j++)
					{
						SlotVo slotTemp=slotList.get(j);
						slotJsonObj.put("slotID",slotTemp.getSlotID());
						slotJsonObj.put("slotName",slotTemp.getSlotStyle());
//						slotJsonObj.put("slotNum", slotTemp.getSlotNum());
					}
					slotJson.add(slotJsonObj);
				//	json.put("fixListAndNum", temp.getInterName()+"("+temp.getInteNum()+")");//+"("+temp.getInteNum()+")");
				//	json.put("socketListAndNum", temp.getSlotName()+"("+temp.getSlotNum()+")");//+"("+temp.getSlotNum()+")");
				} catch (JSONException e) {
					e.printStackTrace();
				}
				deviceJson.add(json);
			} 
			
			//System.out.println(deviceJson);
			String json="";
			String strjson=deviceJson.toString();
			strjson=strjson.substring(1,strjson.length()-1);
			json+= "{\"devInfoTabs\":[" + strjson + "]";
			
			strjson=interfaceJson.toString();
			strjson=strjson.substring(1,strjson.length()-1);
			json+= ",\"devPortTabs\":[" + strjson + "]";
			
			strjson=slotJson.toString();
			strjson=strjson.substring(1,strjson.length()-1);
			json+= ",\"devSlotTabs\":[" + strjson + "]";
			
			json= json+",\"pages\":" + String.valueOf(CountPage) + "}";
			System.out.println(json);
			response.setCharacterEncoding("UTF-8");
			out.print(json);
			out.flush(); 
			out.close();
			
	
	}

}
