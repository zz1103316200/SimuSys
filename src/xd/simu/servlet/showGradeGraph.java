package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import xd.simu.dao.TaskDao;
import xd.simu.dao.TaskObjectDao;
import xd.simu.dao.TaskSubmitDao;
import xd.simu.vo.TaskObjectVo;
import xd.simu.vo.TaskSubmitVo;
import xd.simu.vo.TaskVo;

public class showGradeGraph extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public showGradeGraph() {
		super();
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
		request.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		int taskId = Integer.parseInt(request.getParameter("taskId"));
		TaskDao td = new TaskDao();
		TaskSubmitDao tsd = new TaskSubmitDao();
		TaskObjectDao tod = new TaskObjectDao();
		TaskVo tv = (TaskVo)td.selectById(taskId);
		Float weight = tv.getWeight();
		List<TaskSubmitVo> tsList = tsd.selectById(taskId);
		List<TaskObjectVo> toList = tod.selectByTaskId(taskId);
		TaskSubmitVo tsv = null;
		int[] a = new int[7];
		for(int i=0;i<7;i++){
			a[i]=0;
		}
		a[0] = toList.size()-tsList.size();//计算未提交作业人数
		if(a[0]<0){
			a[0] = 0;
		}
		for(int i =0 ;i< tsList.size();i++){
			tsv = tsList.get(i);
			
			if(tsv.getGradeState().equals("false")){
				a[1]++;
			}else{
				Float grade = tsv.getCompGrade()*tv.getWeight()+(1-tv.getWeight())*tsv.getHumanGrade();
				if(grade<60){
					a[2]++;
				}else if(grade>=60&&grade<70){
					a[3]++;
				}else if(grade>=70&&grade<80){
					a[4]++;
				}else if(grade>=80&&grade<90){
					a[5]++;
				}else{
					a[6]++;
				}
			}
		}
		int result[][] = new int[7][2];
		for(int i=0;i<7;i++){
			result[i][0] = i;
			result[i][1] = a[i];
		}
		JSONObject jsonO = new JSONObject();
		jsonO.put("data", result);
		System.out.println(jsonO);
		out.print(jsonO);
		out.flush();
		out.close();
	}

}
