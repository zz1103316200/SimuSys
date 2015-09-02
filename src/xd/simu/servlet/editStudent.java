package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.StudentDao;

public class editStudent extends HttpServlet {

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
		PrintWriter out = response.getWriter();
		/*stuName: newComStuName,//瀛︾敓鍚�
		stuNum: newCompStuNum,//瀛﹀彿
		stuAge: newCompStuAge,//骞撮緞
		stuGender: newCompStuSex,//鎬у埆
		className: newCompStuClass,//鐝骇
		major:newCompStuPro,//涓撲笟
		
		remark: newCompStuDes//澶囨敞
		 */	
		String stuName=request.getParameter("stuName");
		String stuNum=request.getParameter("stuNum");
		String stuGender=request.getParameter("stuGender");
		int stuAge=Integer.parseInt(request.getParameter("stuAge"));
		String  classNum=request.getParameter("classNum");
		String major=request.getParameter("major");
		String remark=request.getParameter("remark");
		System.out.println("stuNum:"+stuNum+stuName+stuGender+stuAge+classNum+major+remark);
		
		StudentDao studentdao=new StudentDao();
		//stuName=?,stuPword=?,stuGender=?,major=?,classNum=?,stuAge=?,remark where stuNum=?
		Object[] obj=new Object[]{stuName,stuGender,major,classNum,stuAge,remark,stuNum};
		if(studentdao.update(obj))
		{
			out.print("success");
			System.out.println("修改成功！");
		}
		else
		{
			out.print("fail");
			System.out.println("修改失败！");
		}
		//out.flush();
		//out.close();
	}

}
