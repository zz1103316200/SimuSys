package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import xd.simu.dao.AdminDao;
import xd.simu.dao.StudentDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.AdminVo;
import xd.simu.vo.StudentVo;
import xd.simu.vo.TeacherVo;

public class checkServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public checkServlet() {
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
		//System.out.println("sssssssssssssssssss");
		response.setContentType("application/json;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		String name = request.getParameter("name");
		String password = request.getParameter("password");
		String jiaose = request.getParameter("jiaose");
		System.out.println("  name"+name);
		System.out.println("  jiaose"+jiaose);
		JSONObject jsonO = new JSONObject();
		jsonO.put("name", name);

		if(jiaose.equals("admin")){
			jsonO.put("type", "管理员");
			AdminDao aDao = new AdminDao();
			List<AdminVo> lista = aDao.selectAll();
			boolean tag = false;
			AdminVo aVo;
			for(int i=0;i<lista.size();i++){
				aVo = lista.get(i);
				if(aVo.getAdminName().equals(name)&&aVo.getAdminPword().equals(password)){
					tag = true;
					request.getSession().setAttribute("name", name);
					request.getSession().setAttribute("password", password);
				}
				
			}
			
			jsonO.put("tag", tag);	
			
		}else if(jiaose.equals("teacher")){
			jsonO.put("type", "教员");
			TeacherDao tDao = new TeacherDao();
			List<TeacherVo> listt = tDao.selectAll();
			System.out.println("  size"+listt.size());
			boolean tag = false;
			TeacherVo tVo;
			for(int i=0;i<listt.size();i++){
				tVo = listt.get(i);
				if(tVo.getTeachNum().equals(name)&&tVo.getTeachPword().equals(password)){
					tag = true;
					request.getSession().setAttribute("name", name);
					request.getSession().setAttribute("password", password);
				}
				
			}
			
			jsonO.put("tag", tag);
			
		}else if(jiaose.equals("student")){
			jsonO.put("type", "学员");
			
			StudentDao sDao = new StudentDao();
			List<StudentVo> lists = sDao.selectAll();
			boolean tag = false;
			StudentVo sVo;
			for(int i=0;i<lists.size();i++){
				sVo = lists.get(i);
				if(sVo.getStuNum().equals(name)&&sVo.getStuPword().equals(password)){
					tag = true;
					request.getSession().setAttribute("name", name);
					request.getSession().setAttribute("password", password);
				}
				
			}
			jsonO.put("tag", tag);
			
		}else{
			System.out.println("error!!!!!!!!!!!");
			//out.print(false);
		}
		
		System.out.println("   jsonO"+jsonO);
		out.print(jsonO);
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
