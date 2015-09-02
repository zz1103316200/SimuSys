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
import xd.simu.dao.CourseDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.CourseVo;

public class listCourse extends HttpServlet {

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
		int start =pagenum*(page-1);
		PrintWriter out = response.getWriter();
	//	System.out.print("+++++++++++++++++++++++++++++");
		CourseDao coursetable=new CourseDao();
		
		List<CourseVo> courseList=new ArrayList<CourseVo>();
		List<CourseVo> courseList1=new ArrayList<CourseVo>();
			
		JSONArray courseJson=new JSONArray();
		
		courseList=coursetable.select();
		
		int length = courseList.size();
		System.out.println(length);
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
			courseList1.add(courseList.get(i));
			//System.out.println(protocolList1.get(i-start));
		}
		
	
		for(int i=0;i<courseList1.size();i++){
			CourseVo temp =courseList1.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("courseName", temp.getCourseName());
				json.put("courseNum",temp.getCourseNum());
				json.put("periods",temp.getPeriods());
				json.put("classTime",temp.getClassTime());
				json.put("remark", temp.getRemark());
			
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			courseJson.add(json);
		} 
		//System.out.println(classTableJson);
		String strjson=courseJson.toString();
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
