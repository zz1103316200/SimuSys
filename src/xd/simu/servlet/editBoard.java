package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.BoardCardDao;
import xd.simu.dao.DeviceDao;

public class editBoard extends HttpServlet {

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

		response.setContentType("text/html");
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
		 * boardName(°å¿¨Ãû³Æ)¡¢boardNum(°å¿¨±àºÅ)¡¢
		 * factoryName(³§ÉÌ)¡¢boardSlotName(°å¿¨²å²Û)¡¢boardDes(ÃèÊö)
		 */
		String boardNum = request.getParameter("boardNum");
		String boardName = request.getParameter("boardName");
		String factoryName = request.getParameter("factoryName");
		String boardSlotId = request.getParameter("boardSlotId");
		String boardDes = request.getParameter("boardDes");

		BoardCardDao boardcardTable = new BoardCardDao();
		// "update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";
		Object[] obj = { boardName, factoryName, boardSlotId, boardDes,boardNum };

		if (boardcardTable.update(obj))
		// if(true)
		{
			System.out.println("****chenggong***");
			out.print("success");
		} else {
			System.out.println("****shibai***");
			out.print("unsuccess");
		}

		out.flush();
		out.close();
	}

}
