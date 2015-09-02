package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.TaskSubmitDao;

public class updateGrade extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public updateGrade() {
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
		int taskId = Integer.parseInt(request.getParameter("taskId"));
		Float comGrade = Float.parseFloat(request.getParameter("comGrade"));
		Float humanGrade = Float.parseFloat(request.getParameter("humanGrade"));
		String valution = request.getParameter("valution");
		String stuNum = (String)request.getParameter("stuNum");
		System.out.println("  taskId:"+taskId+"  comGrade:"+comGrade+"  humanGrade:"+humanGrade+"  stuNum:"+stuNum+"  valution:"+valution);
		TaskSubmitDao tsd = new TaskSubmitDao();
		if(tsd.updateGrade(new Object[]{humanGrade,"true",valution,comGrade,taskId,stuNum})){
			out.print("success");
		}else{
			out.print("fail");
		}
		out.flush();
		out.close();
	}

}
