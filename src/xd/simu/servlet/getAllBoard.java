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


public class getAllBoard extends HttpServlet {
	
	/**
	 * Constructor of the object.
	 */
	public getAllBoard() {
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
		String[] slotIdArray=slotId.split(",");
		int[] slotIdArr=new int[slotIdArray.length];
		for(int i=0;i<slotIdArray.length;i++){
			slotIdArr[i]=Integer.parseInt(slotIdArray[i]);
			System.out.println(slotIdArr[i]);
		}
		BoardCardDao bd = new BoardCardDao();
		BoardInterfaceDao bid = new BoardInterfaceDao();
		BoardSlotDao bsd = new BoardSlotDao();
		//SlotDao sd = new SlotDao();
		InterfaceDao ind = new InterfaceDao();
		JSONArray total = new JSONArray();
		BoardCardVo bv = new BoardCardVo();
		BoardInterfaceVo biv = new BoardInterfaceVo();
		BoardSlotVo bsv = new BoardSlotVo();
		InterfaceVo iv = new InterfaceVo();
		JSONObject jsonO = new JSONObject(); //表示一个板卡
		JSONObject jsonSlot = new JSONObject();//表示一个插槽
		JSONObject jsonInter = new JSONObject();//表示一个接口
		
		//获得所有的板卡
		//List<BoardCardVo> bList = bd.selectAll();
		List<BoardCardVo> bList;
		for(int i=0;i<slotIdArr.length;i++){
			bList=bd.selectBySlotId(slotIdArr[i]);
			for(int j=0;j<bList.size();j++){
				bv = bList.get(j);
				//得到所有的接口
				List<BoardInterfaceVo> biList = bid.selectById(bv.getBoardcardID());
				JSONArray interList = new JSONArray();
				for(int k=0;k<biList.size();k++){
					biv = biList.get(k);
					jsonInter.put("interId", biv.getInterfaceID());
					
					iv = (InterfaceVo) ind.selectById(biv.getInterfaceID());
					jsonInter.put("interName", biv.getInterName());	
					jsonInter.put("interCoords", biv.getCoords());
					jsonInter.put("parameters", JSONArray.fromObject(iv.getParameters()));
					interList.add(jsonInter);
				}
				//得到所有的插槽
				List<BoardSlotVo> bsList = bsd.selectById(bv.getBoardcardID());
				JSONArray slotList = new JSONArray();
				for(int k=0;k<bsList.size();k++){
					
					bsv = bsList.get(j);
					jsonSlot.put("slotId", bsv.getSlotID());
					//sv = (SlotVo) sd.selectById(dsv.getSlotID());
					jsonSlot.put("slotName", bsv.getSlotName());
					jsonSlot.put("slotCoords", bsv.getCoords());
					jsonSlot.put("slotState", "false");
					slotList.add(jsonSlot);
				}
				jsonO.put("boardName", bv.getBoardcardName());
				jsonO.put("boardID", bv.getBoardcardID());
				jsonO.put("slotID", bv.getSlotID());
				jsonO.put("boardUrl", bv.getBoardcardUrl());
				jsonO.put("remark", bv.getRemark());
				jsonO.put("inter", interList);
				jsonO.put("slot", slotList);
				total.add(jsonO);
			}
		}
		
		
		
		//SlotVo sv = new SlotVo();
		
		System.out.println("  --total"+total);
		out.print(total);
		out.flush();
		out.close();
	}
}

