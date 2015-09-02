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

import xd.simu.dao.StudentDao;
import xd.simu.vo.StudentRelevantMessageVo;


public class listStudent extends HttpServlet {

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
		
		StudentDao studentdao=new StudentDao();
		List<StudentRelevantMessageVo> studentList=new ArrayList<StudentRelevantMessageVo>();
		
		
		JSONArray studentJson=new JSONArray();
		Object []obj={page,pagenum};
	  	studentList=studentdao.select(obj);
		
		int length = studentdao.selectCount(null);
		int CountPage=0;
		if(length!=0)
		{
			CountPage=(length-1)/pagenum+1;
		}
		
		System.out.println(length);
		
		
	
		for(int i=0;i<studentList.size();i++){
			StudentRelevantMessageVo temp = studentList.get(i);
			JSONObject json = new JSONObject();
			try {
				json.put("stuName", temp.getStuName());
				json.put("stuNum",temp.getStuNum());
				json.put("stuGender",temp.getStuGender());
				json.put("major",temp.getMajor());
				json.put("stuAge",temp.getStuAge());
				json.put("remark", temp.getRemark());
				json.put("className", temp.getClassName());
				System.out.println(temp.getClassName());
				//System.out.println(temp.getCourseName());
				//json.put("courseName", temp.getCourseName());
				
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			studentJson.add(json);
		} 
		String strjson=studentJson.toString();
		System.out.println(strjson);
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
