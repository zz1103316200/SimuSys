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

import xd.simu.dao.CourseDao;
import xd.simu.dao.LogicClassTableDao;
import xd.simu.vo.CourseVo;
import xd.simu.vo.LogicClassTableVo;

public class getCourseOfTeach extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public getCourseOfTeach() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
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
		
		String teachNum = (String)request.getSession().getAttribute("name");
		LogicClassTableDao lcd = new LogicClassTableDao();
		CourseDao cd = new CourseDao();
		
		List<LogicClassTableVo> lcList = lcd.selectByTeachNum(teachNum);
		LogicClassTableVo lcv;
		CourseVo cv;
		JSONObject obj = new JSONObject();
		JSONArray total = new JSONArray();
		for(int i=0; i<lcList.size(); i++){
			lcv = lcList.get(i);
			System.out.println(lcv.getCourseNum());
			obj.put("num", lcv.getCourseNum());
			cv = (CourseVo)cd.selectById(lcv.getCourseNum());
			obj.put("courseName", cv.getCourseName());
			total.add(obj);
		}
		System.out.println(" ....toatal  "+total);
		out.print(total);
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
