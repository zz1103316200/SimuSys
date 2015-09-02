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
import xd.simu.vo.DeviceVo;
import xd.simu.vo.InterfaceVo;
import xd.simu.vo.SlotVo;

public class listDeviceInfo extends HttpServlet {

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
	//	System.out.print("+++++++++++++++++++++++++++++");
		DeviceDao devicetable=new DeviceDao();
		InterfaceDao interfacetable=new InterfaceDao();
		SlotDao slottable=new SlotDao();
		
		List<DeviceVo> deviceList=new ArrayList<DeviceVo>();
		List<InterfaceVo> interfaceList=new ArrayList<InterfaceVo>();
		List<SlotVo> slotList=new ArrayList<SlotVo>();
		
		
		JSONArray deviceJson=new JSONArray();
		JSONArray slotJson=new JSONArray();
		JSONArray interfaceJson=new JSONArray();
		deviceList=devicetable.select();
		interfaceList=interfacetable.selectAll();
		slotList=slottable.selectAll();
		
		//int length = deviceList.size();
		//System.out.println(length);
		int CountPage=0;
		
		
		//System.out.println("SDFAf");
		for(int i=0;i<deviceList.size();i++){
			DeviceVo temp =deviceList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("deviceType",temp.getDeviceStyle());	
			} catch (JSONException e) {
				e.printStackTrace();
			}
			deviceJson.add(json);
		} 
		for(int i=0;i<slotList.size();i++){
			SlotVo temp =slotList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("slotID", temp.getSlotID());
				json.put("slotStyle", temp.getSlotStyle());
			
				
			} catch (JSONException e) {
				e.printStackTrace();
			}
			slotJson.add(json);
		} 
		for(int i=0;i<interfaceList.size();i++){
			InterfaceVo temp =interfaceList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("interfaceName", temp.getInterfaceName());
				json.put("interfaceStyle", temp.getInterfaceStyle());
				json.put("interfaceID", temp.getInterfaceID());
				
			} catch (JSONException e) {
				e.printStackTrace();
			}
			interfaceJson.add(json);
		} 
		
		//System.out.println(deviceJson);
		String json="";
		String strjson=deviceJson.toString();	
		strjson=strjson.substring(1,strjson.length()-1);
		json= "{\"typeTables\":[" + strjson + "]";
		
		strjson=interfaceJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		json= json+",\"interfaceTables\":[" + strjson + "]";
		
		strjson=slotJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		json= json+",\"slotTables\":[" + strjson + "]}";
		
		System.out.println(json);
		response.setCharacterEncoding("UTF-8");
		out.print(json);
		out.flush(); 
		out.close();
		
	}

}
