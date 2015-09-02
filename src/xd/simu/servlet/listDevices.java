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
import net.sf.json.JSONObject;

import xd.simu.dao.BoardCardDao;
import xd.simu.dao.CableDao;
import xd.simu.dao.DeviceDao;
import xd.simu.vo.BoardCardVo;
import xd.simu.vo.CableVo;
import xd.simu.vo.DeviceVo;

public class listDevices extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public listDevices() {
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
		DeviceDao dd = new DeviceDao();
		BoardCardDao bcd = new BoardCardDao();
		CableDao cd = new CableDao();
		List<DeviceVo> deviceList=new ArrayList<DeviceVo>();
		List<BoardCardVo> boardList=new ArrayList<BoardCardVo>();
		List<CableVo> cableList=new ArrayList<CableVo>();
		deviceList = dd.selectAll();
		boardList = bcd.selectAll();
		cableList = cd.selectAll();
		DeviceVo dv;
		BoardCardVo bcv;
		CableVo cv;
		JSONObject jsonO = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		//列出所有的设备
		for(int i=0;i<deviceList.size();i++){
			dv = deviceList.get(i);
			jsonO.put("type", "device");
			jsonO.put("name", dv.getDeviceName());
			jsonO.put("id", dv.getDeviceID());
			jsonArray.add(jsonO);
		}
		for(int i=0;i<boardList.size();i++){
			bcv = boardList.get(i);
			jsonO.put("type", "boardcard");
			jsonO.put("name", bcv.getBoardcardName());
			jsonO.put("id", bcv.getBoardcardID());
			jsonArray.add(jsonO);
		}
		for(int i=0;i<cableList.size();i++){
			cv = cableList.get(i);
			jsonO.put("type", "cable");
			jsonO.put("name", cv.getCableName());
			jsonO.put("id", cv.getCableID());
			jsonArray.add(jsonO);
		}
		System.out.println("  listDevice json"+jsonArray);
		out.print(jsonArray);
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

}
