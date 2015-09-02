package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.LogicClassTableDao;
import xd.simu.dao.StudentClassDao;
import xd.simu.dao.TaskDao;
import xd.simu.dao.TaskObjectDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.LogicClassTableVo;
import xd.simu.vo.StudentClassVo;

public class addTask extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public addTask() {
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
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String taskName=request.getParameter("taskName");
		String deadline=request.getParameter("deadline");
		//int teachAge=Integer.parseInt(request.getParameter("teachAge"));
		String description=request.getParameter("description");
		String teacherId=request.getParameter("teacherId");
		String taskDoc=request.getParameter("taskDoc");
		String classId=request.getParameter("classId");
		System.out.println("  classid"+classId);
//		String teachPosition=request.getParameter("teachPosition");
//		String remark=request.getParameter("remark");
		TaskDao teacherdao=new TaskDao();
		//StudentClassDao sct = new StudentClassDao();
		LogicClassTableDao lct = new LogicClassTableDao();
		//TaskObjectDao tod = new TaskObjectDao();
		LogicClassTableVo lcv = (LogicClassTableVo)lct.selectById(classId);
		//List<StudentClassVo> listS = (List<StudentClassVo>)sct.selectById(classId);
		//StudentClassVo scv =null;
//		boolean tag = true;
//		for(int i=0;i<listS.size();i++){
//			scv=listS.get(i);
//			if(!tod.add(new Object[]{})){
//				tag = false;	
//			}
//		}
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Object []obj={taskName,lcv.getClassNum(),StringToDate(deadline),description,teacherId,"unFinished",sdf.format(new Date()),"",taskDoc,Integer.parseInt(classId)};
		
		
		if(teacherdao.add(obj,classId))
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
	
	public static void main(String[] args) {
		//Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		System.out.println("ssss");
		System.out.println(sdf.format(new Date()));
		
	}
	
	public Date StringToDate(String str){
		String[] args = str.split("/");
		String dateStr = args[2]+"-"+args[0]+"-"+args[1];
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			return sdf.parse(dateStr);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}		
	}
}
