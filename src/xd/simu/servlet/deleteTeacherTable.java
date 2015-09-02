	package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.TeacherDao;

public class deleteTeacherTable extends HttpServlet {

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


		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		String teacherNum=request.getParameter("teachNum");
		System.out.println(teacherNum);
		TeacherDao teacher=new TeacherDao();
		
		Object []obj={teacherNum};
		if(teacher.delete(obj))
		{	
			System.out.println("****删除chenggong***");
			out.println("success");		
		}
		else
		{
			System.out.println("****删除shibai***");
			out.println("fail");	
		}
		out.flush();
		out.close();
	}

}
