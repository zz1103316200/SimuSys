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

import xd.simu.dao.ClassTableDao;
import xd.simu.dao.CourseDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.CourseVo;
import xd.simu.vo.TeacherVo;

public class getTeachAndCla extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public getTeachAndCla() {
		super();
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
		TeacherDao td = new TeacherDao();
		ClassTableDao cd = new ClassTableDao();
		List<TeacherVo> tList = td.selectAll();
		List<ClassTableVo> cList = cd.selectAll();
		JSONObject totalJson = new JSONObject();
		JSONArray teaJson = new JSONArray();
		JSONArray classJson = new JSONArray();
		TeacherVo tv = null;
		ClassTableVo ctv = null;
		for(int i= 0;i<tList.size();i++){
			tv = tList .get(i);
			JSONObject jsonO = new JSONObject();
			jsonO.put("teaName", tv.getTeachName());
			jsonO.put("teaNum", tv.getTeachNum());
			teaJson.add(jsonO);
		}
		for(int i= 0;i<cList.size();i++){
			ctv = cList.get(i);
			JSONObject jsonO = new JSONObject();
			jsonO.put("claName", ctv.getClassName());
			jsonO.put("claNum", ctv.getClassNum());
			classJson.add(jsonO);
		}
		totalJson.put("teacher", teaJson);
		totalJson.put("classTable", classJson);
		System.out.println("total:---  "+totalJson);
		out.print(totalJson);
		out.flush();
		out.close();
	}

}
