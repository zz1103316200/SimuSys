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

import xd.simu.dao.TeacherDao;
import xd.simu.vo.TeacherVo;

public class listTeacher extends HttpServlet {

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
		//String search_type=request.getParameter("searchType");
		//page 为第几页  pagenum为该页 记录数
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		int start =pagenum*(page-1);
		PrintWriter out = response.getWriter();
	//	System.out.print("+++++++++++++++++++++++++++++");
		TeacherDao teacher =new TeacherDao();
		
		List<TeacherVo> teacherList=new ArrayList<TeacherVo>();
		List<TeacherVo> teacherList1=new ArrayList<TeacherVo>();
			
		JSONArray teacherJson=new JSONArray();
		
		teacherList=teacher.select();
		
		int length = teacherList.size();
		
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
			teacherList1.add(teacherList.get(i));
			//System.out.println(protocolList1.get(i-start));
		}
		
	System.out.println("okoko");
		for(int i=0;i<teacherList1.size();i++){
			TeacherVo temp =teacherList1.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("teachName", temp.getTeachName());
				json.put("teachNum",temp.getTeachNum());
				json.put("teachGender",temp.getTeachGender());
				json.put("teachPosition",temp.getTeachPosition());
				json.put("teachAge", temp.getTeachAge());
				json.put("remark", temp.getRemark());
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			teacherJson.add(json);
		} 
		//System.out.println(classTableJson);
		String strjson=teacherJson.toString();
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
