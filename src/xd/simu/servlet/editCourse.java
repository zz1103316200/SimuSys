package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.CourseDao;
import xd.simu.dao.TeacherDao;

public class editCourse extends HttpServlet {

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
		response.setContentType("text/html;charset=utf-8");
	
		PrintWriter out = response.getWriter();
		String courseName=request.getParameter("courseName");
		String courseNum=request.getParameter("courseNum");
		int periods=Integer.parseInt(request.getParameter("periods"));
		String classTime=request.getParameter("classTime");
		String remark=request.getParameter("remark");
		//System.out.println("课程id"+courseNum+"课时数"+periods+"授课时间："+classTime);
		CourseDao coursedao=new CourseDao();
		//courseName=?,periods=?,classTime=?,remark=? where courseNum=?"
		Object []obj={courseName,periods,classTime,remark,courseNum};
		
		if(coursedao.update(obj))
		{	
			System.out.print("****chenggong***");
			out.print("success");		
		}
		else
		{
			System.out.print("****shibai***");
			out.print("fail");	
		}
		
		out.flush(); 
		out.close();
	}

}
