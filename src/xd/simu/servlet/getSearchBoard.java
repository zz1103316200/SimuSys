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
import xd.simu.dao.BoardInterfaceDao;
import xd.simu.dao.BoardSlotDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.dao.SlotDao;
import xd.simu.vo.BoardCardVo;
import xd.simu.vo.BoardInterfaceVo;
import xd.simu.vo.BoardSlotVo;
import xd.simu.vo.InterfaceVo;
import xd.simu.vo.SlotVo;

public class getSearchBoard extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public getSearchBoard() {
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
		String slotId = request.getParameter("slotId");
		String searchType = request.getParameter("searchType");
		String searchValue = request.getParameter("searchValue");
		String[] ids = slotId.split(",");
		BoardCardDao bcd = new BoardCardDao();
		BoardInterfaceDao bid = new BoardInterfaceDao();
		BoardSlotDao bsd = new BoardSlotDao();
		InterfaceDao ind = new InterfaceDao();
		SlotDao sd = new SlotDao();
		JSONArray tJson = new JSONArray();
		//先根据搜索类型来遍历
		List<BoardCardVo> list = new ArrayList<BoardCardVo>();
		
		for(int i=0;i<ids.length;i++){
			int id = Integer.parseInt(ids[i]);
			if(searchType.equals("boardName")){
				list = bcd.selectBySlotIdAndName(id, searchValue);
			}else if(searchType.equals("factoryName")){
				list = bcd.selectBySlotIdAndFactory(id, searchValue);
			}else{
				System.out.println("搜索类型不存在！！！");
			}
			for(int j=0;j<list.size();j++){
				BoardCardVo bcv = list.get(j);
				JSONObject jsonO = new JSONObject();
				jsonO.put("boardName", bcv.getBoardcardName());
				jsonO.put("boardID", bcv.getBoardcardID());
				jsonO.put("slotID", bcv.getSlotID());
				jsonO.put("boardUrl", bcv.getBoardcardUrl());
				jsonO.put("remark", bcv.getRemark());
				List<BoardInterfaceVo> bivList = bid.selectById(bcv.getBoardcardID());
				JSONArray interList = new JSONArray();
				for(int k=0;k<bivList.size();k++){
					BoardInterfaceVo biv = bivList.get(k);
					JSONObject interJson = new JSONObject();
					interJson.put("interId", biv.getInterfaceID());
					interJson.put("interCoords", biv.getCoords());
					InterfaceVo inv = (InterfaceVo)ind.selectById(biv.getInterfaceID());
					interJson.put("interName", inv.getInterfaceName());
					interJson.put("parameters", inv.getParameters());
					interList.add(interJson);
				}
				List<BoardSlotVo> bsvList = bsd.selectById(bcv.getBoardcardID());
				JSONArray slotList = new JSONArray();
				for(int k=0;k<slotList.size();k++){
					BoardSlotVo bsv = bsvList.get(k);
					JSONObject interJson = new JSONObject();
					interJson.put("slotId", bsv.getSlotID());
					interJson.put("slotCoords", bsv.getCoords());
					SlotVo sv = (SlotVo)sd.selectById(bsv.getSlotID());
					interJson.put("slotName", sv.getSlotStyle());
					
					slotList.add(interJson);
				}
				jsonO.put("inter", interList);
				jsonO.put("slot", slotList);
				tJson.add(jsonO);
			}
			
		}	
		
		out.print("   ---total------"+tJson);
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
