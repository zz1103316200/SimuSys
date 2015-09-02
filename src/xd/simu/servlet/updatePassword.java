package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.AdminDao;
import xd.simu.dao.StudentDao;
import xd.simu.dao.TeacherDao;

public class updatePassword extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public updatePassword() {
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

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String newpassword = request.getParameter("newPassword");
		String type = request.getParameter("type");
		String name =  (String)request.getSession().getAttribute("name");
		request.getSession().setAttribute("password", newpassword);
		if(type.equals("teacher")){
			TeacherDao td = new TeacherDao();
			if(td.updatePword(new Object[]{newpassword,name})){
				out.print("success");
			}else{
			    out.print("failed");
			}
		}else if(type.equals("admin")){
			AdminDao ad = new AdminDao();
			if(ad.updatePword(new Object[]{newpassword,name})){
				out.print("success");
			}else{
			    out.print("failed");
			}
		}else if(type.equals("student")){
			StudentDao sd = new StudentDao();
			if(sd.updatePword(new Object[]{newpassword,name})){
				out.print("success");
			}else{
			    out.print("failed");
			}
		}
		
		out.flush();
		out.close();
	}

}
