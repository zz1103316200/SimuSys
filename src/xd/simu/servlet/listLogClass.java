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
import xd.simu.dao.CourseDao;
import xd.simu.dao.LogicClassDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.CourseVo;
import xd.simu.vo.LogicClassVo;

public class listLogClass extends HttpServlet {

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

		response.setContentType("application/json;charset=utf-8");
		
		//page Ϊ�ڼ�ҳ  pagenumΪ��ҳ ��¼��
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		//start ��pageҳ �����ݿ�� ��ʼ����λ��
		int start =pagenum*(page-1);
		PrintWriter out = response.getWriter();
	//	System.out.print("+++++++++++++++++++++++++++++");
		LogicClassDao logicclass =new LogicClassDao();
		CourseDao cd = new CourseDao();
		//���е����ݿ� ���ݼ�
		List<LogicClassVo> logicclassList=new ArrayList<LogicClassVo>();
		//pageҳ������ list�� 
		List<LogicClassVo> logicclassList1=new ArrayList<LogicClassVo>();
		
		//JSON�������
		JSONArray logicclassJson=new JSONArray();
		
		logicclassList=logicclass.select();
		//�ܹ������� ���ݼ�¼
		int length = logicclassList.size();
		// ��ҳ��
		int CountPage=0;
		if(length>0)
		{
			CountPage=(length-1)/pagenum+1;
		}
		System.out.println(length);
		//��ҳ ʵ�ʵ�������
		int tem = length-start; 
		if(pagenum>tem){
			pagenum = tem;
		}
		int end = start+pagenum-1;
		System.out.println(start+"--"+end);
		for(int i=start;i<=end;i++){
			logicclassList1.add(logicclassList.get(i));
			//System.out.println(protocolList1.get(i-start));
		}
		
		for(int i=0;i<logicclassList1.size();i++){
			LogicClassVo temp =logicclassList1.get(i); 
			JSONObject json = new JSONObject();
			CourseVo cv = new CourseVo();
			cv = (CourseVo)cd.selectById(temp.getCourseNum());
			try {
				json.put("className", temp.getClassName());
				json.put("classNum",temp.getClassNum());
				//json.put("classID",temp.);
				json.put("courseNum",cv.getCourseNum());
				json.put("periods",cv.getPeriods());
				json.put("courseName",cv.getCourseName());
				json.put("teachName",temp.getTeachName());
				json.put("courseProperty",temp.getCourseProPerty());
				json.put("courseName", temp.getCourseName());
				json.put("startTime",temp.getStartTime());				
			
				json.put("remark",temp.getRemark());
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			logicclassJson.add(json);
		} 
		//System.out.println(classTableJson);
		String strjson=logicclassJson.toString();
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
