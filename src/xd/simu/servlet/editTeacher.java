package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.ClassTableDao;
import xd.simu.dao.TeacherDao;

public class editTeacher extends HttpServlet {

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

		//doPost(request,)
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
		PrintWriter out=response.getWriter();
		System.out.print("*************************ä¿®æ”¹************");
		
		String teachName=request.getParameter("teachName");
		String teachNum=request.getParameter("teachNum");
		int teachAge=Integer.parseInt(request.getParameter("teachAge"));
		String teachGender=request.getParameter("teachGender");
		String teachPosition=request.getParameter("teachPosition");
		String remark=request.getParameter("remark");
		System.out.println("ÐÔ±ð£º"+teachGender);
		TeacherDao teacherdao=new TeacherDao();
		//update teacher set teachName=?,teachAge=?,teachGender=?,teachPosition=?,remark=? where teachNum=?
		Object []obj={teachName,teachAge,teachGender,teachPosition,remark,teachNum};
		if(teacherdao.update(obj))
		{	
			System.out.print("****chenggong***");
			out.print("success");		
		}
		else
		{
			System.out.print("****shibei***");
			out.print("fail");	
		}
		out.flush();
		out.close();
	}

}
