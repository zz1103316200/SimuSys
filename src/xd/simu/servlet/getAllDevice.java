package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import xd.simu.dao.CableDao;
import xd.simu.dao.DeviceDao;
import xd.simu.dao.DeviceInterDao;
import xd.simu.dao.DeviceSlotDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.dao.SlotDao;
import xd.simu.dao.TaskDao;
import xd.simu.vo.CableVo;
import xd.simu.vo.DeviceInterVo;
import xd.simu.vo.DeviceSlotVo;
import xd.simu.vo.DeviceVo;
import xd.simu.vo.InterfaceVo;
import xd.simu.vo.SlotVo;
import xd.simu.vo.TaskVo;

public class getAllDevice extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public getAllDevice() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

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

		this.doPost(request, response);
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
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		int taskId = Integer.parseInt(request.getParameter("taskId"));
		/*String testStr = "[{'interfaceID':'1','interName':'dsaf_0/0','coords':'159,19,204,41'},{'interfaceID':'3','interName':'dsaf_0/1','coords':'312,20,352,34'}]";
		JSONArray jsonA = JSONArray.fromObject(testStr);
		System.out.println(jsonA);*/
		DeviceDao dd = new DeviceDao();
		DeviceSlotDao dsd = new DeviceSlotDao();
		DeviceInterDao did = new DeviceInterDao();
		SlotDao sd = new SlotDao();
		CableDao cd = new CableDao();
		InterfaceDao ind = new InterfaceDao();
		JSONArray total = new JSONArray();
		if(taskId==-1){
			//获得所有的设备
			List<DeviceVo> dList = dd.selectAll();
			JSONObject jsonO= new JSONObject(); //表示一个设备
			JSONObject jsonCable= new JSONObject(); //表示一个线缆
			JSONObject jsonSlot = new JSONObject();//表示一个插槽
			JSONObject jsonInter = new JSONObject();//表示一个接口
			DeviceVo dv;
			DeviceSlotVo dsv;
			DeviceInterVo div;
			SlotVo sv;
			InterfaceVo inv;
			for(int i=0;i<dList.size();i++){
				dv = dList.get(i);
				//得到所有的插槽
				List<DeviceSlotVo> dsList = dsd.selectById(dv.getDeviceID());
				JSONArray slotList = new JSONArray();
				for(int j=0;j<dsList.size();j++){
					
					dsv = dsList.get(j);
					jsonSlot.put("slotId", dsv.getSlotID());
					//sv = (SlotVo) sd.selectById(dsv.getSlotID());
					jsonSlot.put("slotName", dsv.getSlotName());
					jsonSlot.put("slotCoords", dsv.getCoords());
					jsonSlot.put("slotState", "false");
					slotList.add(jsonSlot);
				}
				//得到所有的接口
				List<DeviceInterVo> diList = did.selectById(dv.getDeviceID());
				JSONArray interList = new JSONArray();
				for(int j=0;j<diList.size();j++){
					
					div = diList.get(j);
					jsonInter.put("interId", div.getInterfaceID());
					inv = (InterfaceVo) ind.selectById(div.getInterfaceID());
					jsonInter.put("interName", div.getInterName());
					jsonInter.put("interCoords", div.getCoords());
					jsonInter.put("parameters", JSONArray.fromObject(inv.getParameters()));
					interList.add(jsonInter);
				}
				jsonO.put("name", dv.getDeviceName());
				jsonO.put("deviceUrl", dv.getDeviceUrl());
				jsonO.put("type", "2");
				jsonO.put("id", dv.getDeviceID());
				jsonO.put("realUrl", dv.getRealUrl());//设备实际图片
				jsonO.put("slot", slotList);
				jsonO.put("inter", interList);
				total.add(jsonO);
			}
			//获得所有线缆
			List<CableVo> cList = cd.selectAll();
			CableVo cv;
			for(int i=0;i<cList.size();i++){
				cv = cList.get(i);
				jsonCable.put("name", cv.getCableName());
				jsonCable.put("url", cv.getCableUrl());
				jsonCable.put("type", "3");
				jsonCable.put("id", cv.getCableID());
				jsonCable.put("cableStyle", cv.getCableStyle());
				total.add(jsonCable);
			}
			
		}else{
			
		}
		System.out.println("  --total"+total);
		out.print(total);
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}
	
	public static void main(String[] args) {
		int a = 'A';
		System.out.println(a);
	}

}
