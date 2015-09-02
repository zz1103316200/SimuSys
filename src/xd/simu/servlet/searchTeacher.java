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
import xd.simu.dao.TeacherDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.TeacherVo;

public class searchTeacher extends HttpServlet {

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
		PrintWriter out = response.getWriter();
		
		System.out.println("**********************searchClass********************");
		
		String search_type=request.getParameter("level");
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		
		System.out.println("page:"+page+"pagenum"+pagenum+"搜索类型："+search_type);
		int start =pagenum*(page-1);
	
		System.out.println("搜索类型"+search_type);
		
		
		TeacherDao teacher =new TeacherDao();
		
		//System.out.print(start+"--"+page);
		List<TeacherVo> teacherList=new ArrayList<TeacherVo>();
		List<TeacherVo> teacherList1=new ArrayList<TeacherVo>();
			
		JSONArray teacherJson=new JSONArray();
		
		search_type=search_type.trim();
		//System.out.println(search_type.length());
		/*<option value='all'>鍏ㄩ儴</option>
		<option value='teaName'>鏁欏憳鍚�/option>
		<option value='teaNum'>鏁欏憳缂栧彿</option>
		<option value="teaGender">鎬у埆</option>
		<option value="teaAge">骞撮緞</option>
		<option value="teaPosition">鑱岀О</option>*/
		 //鍏ㄩ儴
		 if(search_type=="all"||search_type.equals("all"))
		 {
			 
			 teacherList=teacher.select();
		 }
		 //鏁欏憳鍚�
		 else if(search_type=="teaName"||search_type.equals("teaName"))
		 {
			 String searchvalue=request.getParameter("key");
			
			 Object []obj={searchvalue};
			 teacherList=teacher.selectByTeachName(obj);
		}
		 //鏁欏憳缂栧彿
		else if(search_type=="teaNum"||search_type.equals("teaNum"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue};
			 teacherList=teacher.selectByTeachNum(obj);
		}
		 //鎬у埆
		else if(search_type=="teaGender"||search_type.equals("teaGender"))
		{
			String searchvalue=request.getParameter("key");
			 Object []obj={searchvalue};
			 teacherList=teacher.selectByTeachGender(obj);
		}
		 //骞撮緞
		else if(search_type=="teaAge"||search_type.equals("teaAge"))
		{
			String searchvalue=request.getParameter("key");
			
			 Object []obj={searchvalue};
			 teacherList=teacher.selectByTeachAge(obj);
		}
        //鑱岀О
		else if(search_type=="teaPosition"||search_type.equals("teaPosition"))
		{
			String searchvalue=request.getParameter("key");
			
			 Object []obj={searchvalue};
			teacherList=teacher.selectByTeachPosition(obj);
		}
		
			int length = teacherList.size();
			
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
				teacherList1.add(teacherList.get(i));
				//System.out.println(protocolList1.get(i-start));
			}
			
		System.out.println("okoko");
			for(int i=0;i<teacherList1.size();i++){
				TeacherVo temp =teacherList1.get(i); 
				JSONObject json = new JSONObject();
				try {
					json.put("teachName", temp.getTeachName());
					json.put("teachNum",temp.getTeachNum());
					json.put("teachGender",temp.getTeachGender());
					json.put("teachPosition",temp.getTeachPosition());
					json.put("teachAge", temp.getTeachAge());
					json.put("remark", temp.getRemark());
					
				} catch (JSONException e) {
					
					e.printStackTrace();
				}
				teacherJson.add(json);
			} 
			//System.out.println(classTableJson);
			String strjson=teacherJson.toString();
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
