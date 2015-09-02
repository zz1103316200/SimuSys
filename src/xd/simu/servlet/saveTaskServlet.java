package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.TaskDefineDao;
import xd.simu.dao.TaskObjectDao;
import xd.simu.dao.TaskSubmitDao;
import xd.simu.vo.TaskSubmitVo;

public class saveTaskServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public saveTaskServlet() {
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

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String totalJson = request.getParameter("totalJson");
		String type = request.getParameter("type");
		int taskId = Integer.parseInt(request.getParameter("taskId"));
		String stuNum = (String)request.getSession().getAttribute("name");
		Boolean tag = false;
		System.out.println(totalJson);
		/*
		 * 进入此servlet的情况有三种，处理作业时，点上传作业、保存作业，自定义作业时，保存作业
		 * 分别对应的type为：upload、save、define
		 * 如果是自定义作业添加到task_define表中
		 * 处理作业保存到task_submit表中
		 */
		if(type.equals("define")){
			TaskDefineDao tdd = new TaskDefineDao();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			if(tdd.selectById(taskId)!=null){
				tag = tdd.update(new Object[]{stuNum,sdf.format(new Date()),totalJson,taskId});
			}else{
				tag = tdd.add(new Object[]{stuNum,sdf.format(new Date()),totalJson});
			}
		}else{
			TaskSubmitDao tsd = new TaskSubmitDao();
			TaskObjectDao tod = new TaskObjectDao();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			//TaskSubmitVo tsv = new TaskSubmitVo();
			
			
			if(tsd.selectByStuNumAndTaskid(taskId, stuNum)!=null){
				tag=tsd.update(new Object[]{sdf.format(new Date()),"false","",totalJson,type,taskId,stuNum});
			}else{
				tag=tsd.add(new Object[]{taskId,stuNum,sdf.format(new Date()),"false","",totalJson,type});
				
			}
			if(type.equals("upload")){
				tag=tod.update(new Object[]{"true",stuNum,taskId});
			}
		}
		
		out.print(tag);
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
