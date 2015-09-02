package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import xd.simu.dao.TaskDefineDao;
import xd.simu.dao.TaskSubmitDao;
import xd.simu.vo.TaskDefineVo;
import xd.simu.vo.TaskSubmitVo;

public class getTaskServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public getTaskServlet() {
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

		response.setContentType("application/json;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		int taskId = Integer.parseInt(request.getParameter("taskId"));
		String stuNum = request.getParameter("stuNum");
		/*
		 * 进入此servlet的情况有三种：1、老师查看学生作业   2、学生查看自己需提交的作业  3、学生查看自己自定义的作业
		 * 当stuNum为isDefine时表示第三种情况
		 * 当isStudent为isDefine时表示第二种情况
		 * 其他为第一种情况
		 */
		if(stuNum.equals("isDefine")){
			TaskDefineDao tdd = new TaskDefineDao();
			TaskDefineVo tdv = (TaskDefineVo)tdd.selectById(taskId);
			String xmlStr = tdv.getXmlStr();
			if(!(xmlStr.equals(""))){
				JSONArray xmlJson = JSONArray.fromObject(xmlStr);
				System.out.println("  xmlJson"+xmlJson);
				out.print(xmlJson);
			}else{
				System.out.println("作业为空！");
			}
		}else{
			if(stuNum.equals("isStudent")){
				stuNum = (String)request.getSession().getAttribute("name");
			}
//			if(stuNum.equals("isDeal")){
//				stuNum = (String)request.getSession().getAttribute("name");
//			}
			System.out.println("   taskId:"+taskId+"   stuNum:"+stuNum);
			TaskSubmitDao tsd = new TaskSubmitDao();
			TaskSubmitVo tv = null;
			if(tsd.selectByStuNumAndTaskid(taskId, stuNum)!=null){
				tv = (TaskSubmitVo)tsd.selectByStuNumAndTaskid(taskId, stuNum);
			}else{
				System.out.println("作业未提交！");
			}
			if(tv!=null){
				String xmlStr = tv.getXmlStr();
				if(!(xmlStr.equals(""))){
					JSONArray xmlJson = JSONArray.fromObject(xmlStr);
					System.out.println("  xmlJson"+xmlJson);
					out.print(xmlJson);
				}else{
					System.out.println("作业为空！");
				}
			}else{
				System.out.println("作业为空！");
				out.print("[]");
			}
			
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

}
