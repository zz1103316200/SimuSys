package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.ClassTableDao;
import xd.simu.dao.CourseDao;
import xd.simu.dao.LogicClassTableDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.CourseVo;

public class addCourse extends HttpServlet {

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
		
		//courseName: newCourseName,
		//courseNum: newCourseNum,
		//classTime: newTeaTime,
		//teachNum: newteacher,
		//courseTime:newCourseTime,
		//remark: NewCourseDes
		String courseName=request.getParameter("courseName");
		String courseNum=request.getParameter("courseNum");
		String teachNum=request.getParameter("teachNum");
		String classNum=request.getParameter("classNum");
		int periods=Integer.parseInt(request.getParameter("periods"));
		String classTime=request.getParameter("classTime");
		String remark=request.getParameter("remark");
		CourseDao CourseDao=new CourseDao();
		LogicClassTableDao lct = new LogicClassTableDao();
		String claName ="";
		if(!classNum.equals("selectable")){
			ClassTableDao ctd = new ClassTableDao();
			ClassTableVo ctv = (ClassTableVo)ctd.selectById(classNum);
			claName = ctv.getClassName();
		}else{
			
		}
		
		//CourseVo cv = new CourseVo();
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		Object []obj1={courseName,courseNum,periods,classTime,remark};
		//System.out.println(" year:"+now.getYear());
		Object []obj2={courseNum,teachNum,year,classNum,claName,remark};
		if(CourseDao.selectByCourseNumO(courseNum)==null){
			if(CourseDao.add(obj1)&&lct.add(obj2,classNum)){
				System.out.print("****chenggong***");
				out.print("success");		
			}else{
				System.out.print("****shibai***");
				out.print("fail");
			}
		}else{
			System.out.print("****shibai***");
			out.print("fail");
		}
		
		
//		if(CourseDao.add(obj1))//�˴�����ӿγ̵�
//		{	
//			System.out.print("****chenggong***");
//			out.print("success");		
//		}
//		else
//		{
//			System.out.print("****shibai***");
//			out.print("fail");	
//		}
		
		out.flush(); 
		out.close();
	}

}
