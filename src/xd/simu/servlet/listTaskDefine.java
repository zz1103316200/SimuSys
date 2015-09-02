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
import xd.simu.dao.ClassTableDao;
import xd.simu.dao.TaskDefineDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.TaskDefineVo;

public class listTaskDefine extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public listTaskDefine() {
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
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		int start =pagenum*(page-1);
		
	//	System.out.print("+++++++++++++++++++++++++++++");
		TaskDefineDao classtable =new TaskDefineDao();
		
		List<TaskDefineVo> classtableList=new ArrayList<TaskDefineVo>();
		List<TaskDefineVo> classtableList1=new ArrayList<TaskDefineVo>();
			
		JSONArray classTableJson=new JSONArray();
		
		classtableList=classtable.selectAll();
		
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
		//String keys[]={"className","classNum","major","startTime","remark"};
		ArrayList<ClassTableVo> classlist1=new ArrayList<ClassTableVo>();
		for(int i=0;i<classtableList1.size();i++){
			TaskDefineVo temp =classtableList1.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("taskId", temp.getTaskId());
				
				json.put("submitTime",temp.getSubmitTime());
				//json.put("remark", temp.getRemark());
				//json.put("level", temp.getClasslevel());
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			classTableJson.add(json);
		} 
		//System.out.println(classTableJson);
		String strjson=classTableJson.toString();
		strjson=strjson.substring(1,strjson.length()-1);
		strjson= "{\"Tables\":[" + strjson + "]";
		strjson= strjson+",\"pages\":" + String.valueOf(CountPage) + "}";
		System.out.println(strjson);
		response.setCharacterEncoding("UTF-8");
		out.print(strjson);
		out.flush();
		out.close();
	}

}
