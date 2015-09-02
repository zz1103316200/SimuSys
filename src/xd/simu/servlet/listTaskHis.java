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
import xd.simu.dao.TaskObjectDao;
import xd.simu.dao.TaskSubmitDao;
import xd.simu.dao.TeacherDao;
import xd.simu.vo.TaskObjectVo;
import xd.simu.vo.TaskSubmitVo;
import xd.simu.vo.TaskVo;
import xd.simu.vo.TeacherVo;

public class listTaskHis extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public listTaskHis() {
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
		String stuNum=request.getParameter("stuNum");
		//System.out.println("page:"+page+"pagenum"+pagenum);
		int start =pagenum*(page-1);
		
	//	System.out.print("+++++++++++++++++++++++++++++");
		TaskSubmitDao classtable =new TaskSubmitDao();
		TaskDao td =new TaskDao();
		TeacherDao teaD =new TeacherDao();
		
		List<TaskSubmitVo> classtableList=classtable.selectByStuNum(stuNum);
		List<TaskSubmitVo> classtableList1=new ArrayList<TaskSubmitVo>();
			
		JSONArray classTableJson=new JSONArray();
		
		int length = classtableList.size();
		
		int CountPage=0;
		if(length>0)
		{
			CountPage=(length-1)/pagenum+1;
		}
		//System.out.println(length);
		int tem = length-start; 
		if(pagenum>tem){
			pagenum = tem;
		}
		int end = start+pagenum-1;
		//System.out.println(start+"--"+end);
		for(int i=start;i<=end;i++){
			//System.out.println("  type"+temp1.getType());
			
			classtableList1.add(classtableList.get(i));

			
			//System.out.println(protocolList1.get(i-start));
		}
		
	
		for(int i=0;i<classtableList1.size();i++){
			TaskSubmitVo temp =classtableList1.get(i);
			TaskVo tVo = (TaskVo)td.selectById(temp.getTaskId());
			TeacherVo teaVo = (TeacherVo)teaD.selectById(tVo.getTeacherId());
			JSONObject json = new JSONObject();
			try {
				json.put("taskId", temp.getTaskId());
				json.put("taskName",tVo.getTaskName());
				json.put("teaName",teaVo.getTeachName());
				json.put("makeTime",tVo.getMakeTime());
				json.put("description", tVo.getDescription());
				json.put("taskTarget", tVo.getTaskTarget());
				json.put("submitTime", temp.getSubmitTime());
				String grade ="";
				if(temp.getGradeState().equals("false")){
					grade="Î´Åú¸Ä";
				}else{
					
					grade=temp.getCompGrade()*tVo.getWeight()+temp.getHumanGrade()*(1-tVo.getWeight())+"";
				}
				json.put("grade", grade);
				json.put("valution", temp.getValution());
//				String taskState = ""; 
//				
//				json.put("taskState", taskState);
				
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
