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

import xd.simu.dao.BoardCardDao;
import xd.simu.dao.CableDao;
import xd.simu.vo.Cable_connectorVo;

public class addLine extends HttpServlet {

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
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		/*lineName:newLineName,
				
					lineType:newLineType,
					lineUrl:lineUrl,
				
					lineStyle:lineStyle,
					lineDes:newLineDes
		 lineName(线缆名称)、
		 lineType(线缆类型)、
		 lineUrl(线缆图片)、
		 lineConnList(线缆接头及数量 JSON串格式
		{"A":[{"connType":" ","num":" "},{}],"B":[{},{}]})

		 */
	
		String lineName = request.getParameter("lineName");
		String linestyle = request.getParameter("lineStyle");
		String boardUr = request.getParameter("lineUrl");
		String lineconn = request.getParameter("lineConnList");
		String linedes=request.getParameter("lineDes");
		System.out.println("  lineconn:"+lineconn+"  lineName:"+lineName+"  linestyle:"+linestyle);
		// JSONArray jsonArray=(JSONArray)JSONSerializer.toJSON(lineconn);
		List<Cable_connectorVo> aConnectorList=new ArrayList<Cable_connectorVo>();
		List<Cable_connectorVo> bConnectorList=new ArrayList<Cable_connectorVo>();
		 JSONObject jsonobject;
		try {
			jsonobject = JSONObject.fromObject(lineconn);
			 JSONArray ajsonarray=jsonobject.getJSONArray("A");
			 JSONArray bjsonarray=jsonobject.getJSONArray("B");
			 System.out.println("打印A");
			 for (int i = 0; i < ajsonarray.size(); i++) {
					JSONObject jo = ajsonarray.getJSONObject(i);
					Cable_connectorVo temp=new Cable_connectorVo();
					temp.setInter_side("A");
					temp.setConnectorType(jo.getString("connType"));
					temp.setNum(jo.getInt("num"));
					aConnectorList.add(temp);
					/*System.out.println(jo.getString("connType"));
					System.out.println(jo.getString("num"));*/
					
			 }
			 System.out.println("打印B");
			 for (int i = 0; i < bjsonarray.size(); i++) {
					JSONObject jo = ajsonarray.getJSONObject(i);
				/*	System.out.println(jo.getString("connType"));
					System.out.println(jo.getString("num"));*/
					Cable_connectorVo temp=new Cable_connectorVo();
					temp.setInter_side("B");
					temp.setConnectorType(jo.getString("connType"));
					temp.setNum(jo.getInt("num"));
					bConnectorList.add(temp);
			 }
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		// String str= jsonArray.getJSONArray(0).getString("");
	//	System.out.println("boardSlotName->"+boardSlotName);
		//System.out.println("->"+boardFixList);
		//System.out.println("->"+boardSocketList);
		
		CableDao cableTable = new CableDao();
		Object []obj={lineName,linestyle,"",boardUr,linedes,""};
		// deviceName,deviceID,practoryName,deviceStyle,description
		//Object[] obj = { deviceName, deviceNum, factoryName, deviceType,
		//		deviceDes };

		if (cableTable.add(obj,aConnectorList,bConnectorList)) {
			System.out.println("****chenggong***");
			out.print("success");
		} else {
			System.out.println("****shibai***");
			out.print("unsuccess");
		}

		out.flush();
		out.close();
	}
	

}