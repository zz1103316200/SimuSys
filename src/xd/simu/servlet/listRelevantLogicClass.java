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
import xd.simu.dao.DeviceDao;
import xd.simu.dao.InterfaceDao;
import xd.simu.dao.SlotDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.CourseVo;
import xd.simu.vo.DeviceVo;
import xd.simu.vo.InterfaceVo;
import xd.simu.vo.SlotVo;
import xd.simu.vo.TeacherVo;

public class listRelevantLogicClass extends HttpServlet {

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
	//	System.out.print("+++++++++++++++++++++++++++++");
		ClassTableDao classtable=new ClassTableDao();
		TeacherDao teachertable=new TeacherDao();
		CourseDao coursetable=new CourseDao();
		
		
		
		List<ClassTableVo> classtableList=new ArrayList<ClassTableVo>();
		List<TeacherVo> teacherList=new ArrayList<TeacherVo>();
		List<CourseVo> courseList=new ArrayList<CourseVo>();
		
		
		JSONArray classtableJson=new JSONArray();
		JSONArray teacherJson=new JSONArray();
		JSONArray courseJson=new JSONArray();
		classtableList=classtable.select();
		teacherList=teachertable.selectAll();
		courseList=coursetable.selectAll();
		
		//int length = deviceList.size();
		//System.out.println(length);
		int CountPage=0;
		
		
		//System.out.println("SDFAf");
		for(int i=0;i<classtableList.size();i++){
			ClassTableVo temp =classtableList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("classNum", temp.getClassNum());
			} catch (JSONException e) {
				e.printStackTrace();
			}
			classtableJson.add(json);
		} 
		for(int i=0;i<teacherList.size();i++){
			TeacherVo temp =teacherList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("teacherNum",temp.getTeachNum());
				json.put("teacherName",temp.getTeachName());
			} catch (JSONException e) {
				e.printStackTrace();
			}
			teacherJson.add(json);
		} 
		
		for(int i=0;i<courseList.size();i++){
			CourseVo temp =courseList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("courseNum", temp.getCourseNum());
				json.put("courseName", temp.getCourseName());
				
			} catch (JSONException e) {
				e.printStackTrace();
			}
			courseJson.add(json);
		} 
		
		//System.out.println(deviceJson);
		String json="";
		String strjson=classtableJson.toString();	
		strjson=strjson.substring(1,strjson.length()-1);
		json= "{\"classTab\":[" + strjson + "]";
		
		strjson=teacherJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		json= json+",\"teacherTab\":[" + strjson + "]";
		
		strjson=courseJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		json= json+",\"courseTavb\":[" + strjson + "]}";
		
		System.out.println(json);
		response.setCharacterEncoding("UTF-8");
		out.print(json);
		out.flush(); 
		out.close();
	}

}
