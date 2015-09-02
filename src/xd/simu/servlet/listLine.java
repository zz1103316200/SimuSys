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

import xd.simu.dao.CableDao;
import xd.simu.dao.Cable_ConnectorDao;
import xd.simu.dao.DeviceDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.dao.SlotDao;
import xd.simu.vo.CableVo;
import xd.simu.vo.Cable_connectorVo;
import xd.simu.vo.DeviceVo;

import xd.simu.vo.InterfaceVo;


public class listLine extends HttpServlet {

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
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		page=(page-1)*pagenum;
		//int start =pagenum*(page-1);
		PrintWriter out = response.getWriter();
	    //	System.out.print("+++++++++++++++++++++++++++++");
		CableDao cabletable=new CableDao();
		Cable_ConnectorDao cable_connectortable=new Cable_ConnectorDao();
		List<CableVo> cableList=new ArrayList<CableVo>();
		List<Cable_connectorVo> cable_connectList=new ArrayList<Cable_connectorVo>();
			
		JSONArray interfaceJson=new JSONArray();
		Object []obj={page,pagenum};
		cableList=cabletable.select(obj);
		//System.out.println("数据量："+cableList.size());
		int length = cabletable.selectCount(obj);
		System.out.println("length:"+length);
		int CountPage=0;
		if(length!=0)
		{
			CountPage=((length-1)/pagenum)+1;
		}
		String lineconnarray="";
		for(int i=0;i<cableList.size();i++){
			CableVo temp =cableList.get(i);
			//System.out.println(temp.toString());
			JSONObject json = new JSONObject();
			try {
				json.put("lineID", temp.getCableID());
				json.put("lineName",temp.getCableName());
				json.put("lineType",temp.getCableStyle());
				json.put("lineDes",temp.getRemark());
			  //  json.put("portID", temp.get);
			
				//json.put("portName","1");
				//json.put("portID", "2");
			//	json.put("portNum", temp.getInterfaceNum());
				cable_connectList=cable_connectortable.selectByCableID(new Object[]{temp.getConnectors()});
				for(int j=0;j<cable_connectList.size();j++)
				{
					Cable_connectorVo cable_conTemp=cable_connectList.get(j);
					lineconnarray+="("+cable_conTemp.getInter_side()+"边,"+cable_conTemp.getNum()+"个,类型:"+cable_conTemp.getConnectorType()+")";
				}
				json.put("lineConnList", lineconnarray);
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			interfaceJson.add(json);
		} 
		String strjson=interfaceJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		strjson= "{\"Tables\":[" + strjson + "]";
		strjson= strjson+",\"pages\":" + String.valueOf(CountPage) + "}";
		System.out.println(strjson);
		 
		System.out.println(strjson);
		response.setCharacterEncoding("UTF-8");
		out.print(strjson);
		out.flush(); 
		out.close();
		
		
	}

}
