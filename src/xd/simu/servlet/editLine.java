package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.CableDao;
import xd.simu.dao.DeviceDao;

public class editLine extends HttpServlet {

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
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		/*
		 * //lineNum(ÏßÀÂ±àºÅ)¡¢
		 *  lineName(ÏßÀÂÃû³Æ)¡¢ 
		 *  lineDes(ÃèÊö)
		 */
		String lineNum = request.getParameter("lineNum");
		String lineName = request.getParameter("lineName");
		String lineDes = request.getParameter("lineDes");
		

		CableDao cableTable = new CableDao();
		// "update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";
		Object[] obj = { lineName, lineDes,lineNum};

		if (cableTable.update(obj))
		// if(true)
		{
			System.out.print("****chenggong***");
			out.print("success");
		} else {
			System.out.print("****shibai***");
			out.print("unsuccess");
		}

		out.flush();
		out.close();
	}
}
