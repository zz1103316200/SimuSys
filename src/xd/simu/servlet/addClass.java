package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.ClassTableDao;

public class addClass extends HttpServlet {

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
	//	System.out.print("*************************8888************");
		//className: newCompClassName,
		//classNum: newCompClassId,
		//major: newCompClassPro,
		//startTime: newCompClassTime,
		//level: newCompClassLevel,
		//remrk: newCompClassText
		String className=request.getParameter("className");
		String classNum=request.getParameter("classNum");
		String major=request.getParameter("major");
		String startTime=request.getParameter("startTime");
		String classlevel=request.getParameter("level");
		String remark=request.getParameter("remark");
		
		System.out.println(classlevel);
		System.out.println(startTime);
		
		ClassTableDao ClassTable=new ClassTableDao();
		
		Object []obj={className,classNum,major,startTime,classlevel,remark};
		
		if(ClassTable.add(obj))
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
