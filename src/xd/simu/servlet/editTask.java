package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.CourseDao;
import xd.simu.dao.TaskDao;

public class editTask extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public editTask() {
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

		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		int taskId=Integer.parseInt(request.getParameter("taskId"));
		String taskName=request.getParameter("taskName");
		String deadline=request.getParameter("deadline");
		String description=request.getParameter("description");
		//System.out.println("课程id"+courseNum+"课时数"+periods+"授课时间："+classTime);
		TaskDao taskdao=new TaskDao();
		//courseName=?,periods=?,classTime=?,remark=? where courseNum=?"
		Object []obj={taskName,deadline,description,taskId};
		
		if(taskdao.updatePart(obj))
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

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
