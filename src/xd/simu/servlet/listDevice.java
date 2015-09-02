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

import xd.simu.dao.CourseDao;
import xd.simu.dao.DeviceDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.dao.SlotDao;
import xd.simu.vo.CourseVo;
import xd.simu.vo.DeviceVo;
import xd.simu.vo.InterfaceRelevantNumVo;
import xd.simu.vo.InterfaceRelevantVo;
import xd.simu.vo.InterfaceVo;
import xd.simu.vo.SlotRelevantNumVo;
import xd.simu.vo.SlotVo;

public class listDevice extends HttpServlet {

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
		//page 第几页  ；pagenum 该page页的数据容量 
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		//Mysql 中limit的初始录行的偏移量是0
		
		page=(page-1)*pagenum;
		PrintWriter out = response.getWriter();
	//	System.out.print("+++++++++++++++++++++++++++++");
		DeviceDao devicetable=new DeviceDao();
		InterfaceDao interfacetable=new InterfaceDao();
		SlotDao slottable=new SlotDao();
		
		
		List<DeviceVo> deviceList=new ArrayList<DeviceVo>();
		List<InterfaceRelevantNumVo> interfaceList=new ArrayList<InterfaceRelevantNumVo>();
		List<SlotRelevantNumVo> slotList=new ArrayList<SlotRelevantNumVo>();	
		
		JSONArray deviceJson=new JSONArray();
		JSONArray interfaceJson=new JSONArray();
		JSONArray slotJson=new JSONArray();
		Object []obj={page,pagenum};
		deviceList=devicetable.select(obj);	
	
		int length = devicetable.selectCount();
	//	System.out.println(length);
		int CountPage=0;
		if(length!=0)
		{
			CountPage=((length-1)/pagenum)+1;
		}
		
		//System.out.println("总长度:"+length+",长度："+deviceList.size()+",总页数："+CountPage);
		String devPort="";
		String devSlot="";
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
				//System.out.println(temp.getDeviceID());
				interfaceList=interfacetable.SelectByInterfaceID(new Object[]{temp.getDeviceID()});
			//	System.out.println(interfaceList.size());
				for(int j=0;j<interfaceList.size();j++)		
				{
					InterfaceRelevantNumVo interfaceTemp=interfaceList.get(j);
					//interfaceJsonObj.put("deviceID",temp.getDeviceID());
					//interfaceJsonObj.put("portName", interfaceTemp.getInterfaceStyle());
					//interfaceJsonObj.put("portID", interfaceTemp.getInterfaceID());
					//interfaceJsonObj.put("portNum", interfaceTemp.getInterfaceNum());
					devPort+=interfaceTemp.getInterfaceStyle()+"("+interfaceTemp.getInterfaceNum()+")";
					
				}
			/*	if(devPort.length()>1)
					devPort=devPort.substring(0,devPort.length()-1);*/
				json.put("devPort",devPort);
				//interfaceJson.put(interfaceJsonObj);
				slotList=slottable.selectBySlotID(new Object[]{temp.getDeviceID()});
				for(int j=0;j<slotList.size();j++)
				{
					SlotRelevantNumVo slotTemp=slotList.get(j);
					//interfaceJsonObj.put("deviceID",temp.getDeviceID());
					//slotJsonObj.put("slotID",slotTemp.getSlotID());
					//slotJsonObj.put("slotName",slotTemp.getSlotStyle());
					//slotJsonObj.put("slotNum", slotTemp.getSlotNum());
					devSlot=slotTemp.getSlotStyle()+"("+slotTemp.getSlotNum()+")";
				}
				/*if(devSlot.length()>1)
					devSlot=devSlot.substring(0,devSlot.length()-1);*/
				json.put("devSlot",devSlot);
				
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
		json+= "{\"devInfo\":[" + strjson + "]";
		
		json= json+",\"pages\":" + String.valueOf(CountPage) + "}";
		System.out.println(json);
		response.setCharacterEncoding("UTF-8");
		out.print(json);
		out.flush(); 
		out.close();
		
	}

}
