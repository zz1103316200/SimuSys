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

import xd.simu.dao.ClassTableDao;
import xd.simu.vo.ClassTableVo;

public class serchClass extends HttpServlet {

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
		String search_type=request.getParameter("level");
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		
		System.out.println("page:"+page+"pagenum"+pagenum);
		int start =pagenum*(page-1);
		
		//System.out.print(start+"--"+page);
		ClassTableDao classtable=new ClassTableDao();
		List<ClassTableVo> classtableList=new ArrayList<ClassTableVo>();
		List<ClassTableVo> classtableList1=new ArrayList<ClassTableVo>();
			
		JSONArray classJson=new JSONArray();
		search_type=search_type.trim();
		//System.out.println(search_type.length());
		 //å…¨éƒ¨
		 if(search_type=="all"||search_type.equals("all"))
		 {
			 
			 classtableList=classtable.select();
		 }
		 //ç­çº§åç§°
		 else if(search_type=="className"||search_type.equals("className"))
		 {
			 String searchvalue=(String)request.getParameter("key");
			 System.out.println("°à¼¶Ãû³Æ"+searchvalue);
			 Object []obj={searchvalue};
			 classtableList=classtable.selectByClassName(obj);
		}
		 //å…¥å­¦æ—¶é—´
		else if(search_type=="startTime"||search_type.equals("startTime"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue};
			 classtableList=classtable.selectByStartTime(obj);
		}
		 //ä¸“ä¸š
		else if(search_type=="major"||search_type.equals("major"))
		{
			String searchvalue=request.getParameter("key");
			 Object []obj={searchvalue};
			 classtableList=classtable.selectByMajor(obj);
		}
		 //å±‚æ¬¡
		else if(search_type=="level"||search_type.equals("level"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println("Êä³ö£º"+searchvalue);
			 Object []obj={searchvalue};
			 classtableList=classtable.selectByClassLevel(obj);
		}
		else if(search_type=="classNum"||search_type.equals("classNum"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println("Êä³ö£º"+searchvalue);
			 Object []obj={searchvalue};
			 classtableList=classtable.selectByClassNum(obj);
		}
	
		int length = classtableList.size();
		int CountPage=0;
		if(length>0)
		{
			CountPage=(length-1)/pagenum+1;
		}
		System.out.println(length);
		int tem = length-start; 
		if(pagenum>tem){
			pagenum = tem;
		}
		int end = start+pagenum-1;
		System.out.println(start+"--"+end);
		for(int i=start;i<=end;i++){
			classtableList1.add(classtableList.get(i));
			//System.out.println(protocolList1.get(i-start));
		}
	
		for(int i=0;i<classtableList1.size();i++){
			ClassTableVo temp =classtableList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("className", temp.getClassName());
				json.put("classNum",temp.getClassNum());
				json.put("major",temp.getMajor());
				json.put("startTime",temp.getStartTime());
				json.put("remark", temp.getRemark());
				json.put("level", temp.getClasslevel());
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			classJson.add(json);
		} 
		String strjson=classJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		strjson= "{\"Tables\":[" + strjson + "]";
		strjson= strjson+",\"pages\":" + String.valueOf(CountPage) + "}";
		System.out.println(strjson);
		response.setCharacterEncoding("UTF-8");
		out.print(strjson);
		out.flush(); 
		out.close();
	}

}
