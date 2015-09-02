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

import xd.simu.dao.CourseDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.CourseVo;
import xd.simu.vo.TeacherVo;

public class serchCourse extends HttpServlet {

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
	
		CourseDao coursetable =new CourseDao();
		
		//System.out.print(start+"--"+page);
		List<CourseVo> courseList=new ArrayList<CourseVo>();
		List<CourseVo> courseList1=new ArrayList<CourseVo>();
			
		JSONArray courseJson=new JSONArray();
		
		search_type=search_type.trim();
		//System.out.println(search_type.length());
		
		 //鍏ㄩ儴
		 if(search_type=="all"||search_type.equals("all"))
		 {
			 
			courseList=coursetable.select();
		 }
		 //璇剧▼鍚�
		 else if(search_type=="courseName"||search_type.equals("courseName"))
		 {
			 String searchvalue=request.getParameter("key");
			
			 Object []obj={searchvalue};
			 courseList=coursetable.selectByCourseName(obj);
		}
		 //璇炬椂闀�
		else if(search_type=="periods"||search_type.equals("periods"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue};
			 courseList=coursetable.selectByPeriods(obj);
		}
		 //鎺堣鏃堕棿
		else if(search_type=="classTime"||search_type.equals("classTime"))
		{
			String searchvalue=request.getParameter("key");
			 Object []obj={searchvalue};
			 courseList=coursetable.selectByClassTime(obj);
		}
		
	
		
			int length = courseList.size();
			
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
			
		System.out.println("okoko");
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
