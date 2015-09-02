package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.StudentDao;
import xd.simu.vo.StudentVo;

public class addStudent extends HttpServlet {

	

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
		/*StudentVo stu_Vo=new StudentVo();
		stu_Vo.setStuName(request.getParameter("stuName"));
		stu_Vo.setStuPword(request.getParameter("stuPword"));
		stu_Vo.setStuNum(request.getParameter("stuNum"));*/
		
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
		String  classNum=request.getParameter("className");
		String major=request.getParameter("major");

		String remark=request.getParameter("remark");
		System.out.println(stuName+"---"+stuNum+"---"+stuGender+"--classNum"+classNum);
		StudentDao studentdao=new StudentDao();
		//						(stuName,stuPword,stuNum,stuGender,major,classNum.stuAge,remark)
		Object[] obj=new Object[]{stuName,"111111",stuNum,stuGender,major,classNum,stuAge,remark};
		if(studentdao.add(obj))
		{
			out.print("success");
		}
		else
		{
			out.print("fail");
		}
		out.flush();
		out.close();
	}

}
