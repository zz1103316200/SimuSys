package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.ClassTableDao;
import xd.simu.dao.LogicClassDao;
import xd.simu.vo.ClassTableVo;

public class editLogClass extends HttpServlet {

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
		//pro: newPro,//添加课程性质
		//teacher:newCompTea,//添加教员
		//course:newCompCourse,//添加课程
		//startTime: newCompClassTime,
		//level: newCompClasslevel,
		//remrk: newCompClassText
		//String className=request.getParameter("className");
		String classId=request.getParameter("classID");
		String classNum=request.getParameter("classNum");
		String teachNum=request.getParameter("teachNum");
		//String startTime=request.getParameter("startTime");
		String courseNum=request.getParameter("courseNum");
		//String classlevel=request.getParameter("level");
		String remark=request.getParameter("courseDes");
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		LogicClassDao ClassTable=new LogicClassDao();
		String claName ="";
		if(!classNum.equals("selectable")){
			ClassTableDao ctd = new ClassTableDao();
			ClassTableVo ctv = (ClassTableVo)ctd.selectById(classNum);
			claName = ctv.getClassName();
		}else{
			
		}
		Object []obj={courseNum,teachNum,year,classNum,claName,remark,classId};
		
		if(ClassTable.update(obj))
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
