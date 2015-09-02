package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import xd.simu.dao.TaskDao;
import xd.simu.vo.TaskVo;

public class searchTask extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public searchTask() {
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
		
		String search_type=request.getParameter("level");
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		String searchvalue=request.getParameter("key");
		String teacherName = (String)request.getSession().getAttribute("name");
		System.out.println("   searchvalue"+searchvalue);
		//System.out.println("page:"+page+"pagenum"+pagenum);
		int start =pagenum*(page-1);
		
		//System.out.print(start+"--"+page);
		TaskDao classtable=new TaskDao();
		List<TaskVo> classtableList=new ArrayList<TaskVo>();
		List<TaskVo> classtableList1=new ArrayList<TaskVo>();
			
		JSONArray classJson=new JSONArray();
		search_type=search_type.trim();

		 if(search_type=="all"||search_type.equals("all"))
		 {
			 
			 classtableList=classtable.selectAll();
		 }
		 //ç­çº§åç§°
		 else if(search_type=="taskTarget"||search_type.equals("taskTarget"))
		 {

			 classtableList=classtable.selectByTaskTarget(searchvalue,teacherName);
		}
		 //å…¥å­¦æ—¶é—´
		else if(search_type=="taskState"||search_type.equals("taskState"))
		{
			 classtableList=classtable.selectByTaskState(searchvalue,teacherName);
		}
	
		int length = classtableList.size();
		int CountPage=0;
		if(length>0)
		{
			CountPage=(length-1)/pagenum+1;
		}
		System.out.println(length);
		int tem = length-start; 
		if(pagenum>tem){
			pagenum = tem;
		}
		int end = start+pagenum-1;
		System.out.println(start+"--"+end);
		for(int i=start;i<=end;i++){
			classtableList1.add(classtableList.get(i));
			//System.out.println(protocolList1.get(i-start));
		}
	
		for(int i=0;i<classtableList1.size();i++){
			TaskVo temp =classtableList1.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("taskId", temp.getTaskId());
				json.put("taskName",temp.getTaskName());
				json.put("taskTarget",temp.getTaskTarget());
				json.put("deadline",temp.getDeadline());
				json.put("description", temp.getDescription());
				String taskState = ""; 
				if(temp.getTaskState().equals("partFinished")){
					taskState = "部分批改";
				}else if(temp.getTaskState().equals("allFinished")){
					taskState = "批改完成";
				}else{
					taskState = "未批改";
				}
				json.put("taskState", taskState);
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			classJson.add(json);
		} 
		JSONObject strjson=new JSONObject();
		strjson.put("Tables", classJson);
		strjson.put("pages", String.valueOf(CountPage));
		System.out.println(strjson);
		
		out.print(strjson);
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
