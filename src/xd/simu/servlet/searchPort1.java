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

import xd.simu.dao.InterfaceDao;
import xd.simu.vo.InterfaceVo;

public class searchPort1 extends HttpServlet {



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
		page=(page-1)*pagenum;
		
	
	    //	System.out.print("+++++++++++++++++++++++++++++");
		InterfaceDao interfacetable=new InterfaceDao();
		
		List<InterfaceVo> interfaceList=new ArrayList<InterfaceVo>();
	
			
		JSONArray interfaceJson=new JSONArray();
		
		search_type=search_type.trim();
		//System.out.println(search_type.length());
		/*
		 * <option value="all">全部</option>
		   <option value="interfaceID">接口名称</option>
		   <option value="interfaceStyle">接口类型</option>
		 * */
		 //全部
		int length = 0;
		 if(search_type=="all"||search_type.equals("all"))
		 {
			 Object []obj={page,pagenum};
			 interfaceList=interfacetable.select(obj);
			length = interfacetable.selectCount(null);
		 }
		 //班级名称
		 else if(search_type=="interfaceName"||search_type.equals("interfaceName"))
		 {
			 String searchvalue=request.getParameter("key");
			
			 Object []obj={searchvalue,page,pagenum};
			 interfaceList=interfacetable.selectByinterfaceName(obj);
			 
			 length = interfacetable.selectCountInterfaceID(new Object[]{searchvalue});
		}
		 //入学时间
		else if(search_type=="interfaceStyle"||search_type.equals("interfaceStyle"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 interfaceList=interfacetable.selectByinterfaceStyle(obj);
			 length = interfacetable.selectCountinterfaceStyle(new Object[]{searchvalue});

		}
		
			
			
			int CountPage=0;
			if(length!=0)
			{
				CountPage=(length-1)/pagenum+1;
			}
			
			for(int i=0;i<interfaceList.size();i++){
				InterfaceVo temp =interfaceList.get(i);
				//System.out.println(temp.toString());
				JSONObject json = new JSONObject();
				try {
					json.put("portName", temp.getInterfaceName());
					json.put("PortType",temp.getInterfaceStyle());
					json.put("portList",temp.getParameters());
					json.put("portDes",temp.getRemark());
				    json.put("portID", temp.getInterfaceID());
				
					//json.put("portName","1");
					//json.put("portID", "2");
				//	json.put("portNum", temp.getInterfaceNum());
				//	
				} catch (JSONException e) {
					
					e.printStackTrace();
				}
				interfaceJson.add(json);
			} 
			String strjson=interfaceJson.toString();
			strjson=strjson.substring(1,strjson.length()-1);
			strjson= "{\"Tables\":[" + strjson + "]";
			strjson= strjson+",\"pages\":" + String.valueOf(CountPage) + "}";
			//System.out.println(strjson);
			 
			System.out.println(strjson);
			response.setCharacterEncoding("UTF-8");
			out.print(strjson);
			out.flush(); 
			out.close();
        
		
	}

}
