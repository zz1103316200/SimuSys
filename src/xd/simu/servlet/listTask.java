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

public class listTask extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public listTask() {
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
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		String teaNum=(String)request.getSession().getAttribute("name");
		String classId = request.getParameter("classId");
		System.out.println("classId:"+classId);
		int start =pagenum*(page-1);
		
	//	System.out.print("+++++++++++++++++++++++++++++");
		TaskDao classtable =new TaskDao();
		
		List<TaskVo> classtableList=classtable.selectByTeachNum(teaNum,Integer.parseInt(classId));
		List<TaskVo> classtableList1=new ArrayList<TaskVo>();
			
		JSONArray classTableJson=new JSONArray();
		
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
				if(temp.getTaskTarget().equals("")){
					json.put("taskTarget","未下发");
				}else{
					json.put("taskTarget",temp.getTaskTarget());
				}
				
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
			classTableJson.add(json);
		} 
		//System.out.println(classTableJson);
		JSONObject strjson=new JSONObject();
		strjson.put("Tables", classTableJson);
		strjson.put("pages", String.valueOf(CountPage));
		/*String strjson=classTableJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		strjson= "{\"Tables\":[" + strjson + "]";
		strjson= strjson+",\"pages\":" + String.valueOf(CountPage) + "}";
		System.out.println(strjson);
		response.setCharacterEncoding("UTF-8");*/
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
