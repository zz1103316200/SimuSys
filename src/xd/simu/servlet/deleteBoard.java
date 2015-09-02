package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.BoardCardDao;
import xd.simu.dao.DeviceDao;

public class deleteBoard extends HttpServlet {

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
		
		String boardNum=request.getParameter("boardNum");
		BoardCardDao boardtable=new BoardCardDao();
		System.out.println("Éè±¸ID:"+boardNum);
		Object []obj={boardNum};
		if(boardtable.delete(obj))
		{	
			System.out.print("****É¾³ýchenggong***");
			out.print("success");		
		}
		else
		{
			System.out.print("****É¾³ýshibai***");
			out.print("unsuccess");	
		}
		out.flush();
		out.close();
	}

}
