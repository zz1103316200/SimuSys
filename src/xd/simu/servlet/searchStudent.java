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
import xd.simu.dao.StudentDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.StudentRelevantMessageVo;

public class searchStudent extends HttpServlet {

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
		
		System.out.println("level:"+search_type+"page:"+page+"pagenum"+pagenum);
		page=(page-1)*pagenum;
		
		//System.out.print(start+"--"+page);
		StudentDao studenttable=new StudentDao();
		List<StudentRelevantMessageVo> studentList=new ArrayList<StudentRelevantMessageVo>();
			
		JSONArray studentJson=new JSONArray();
		search_type=search_type.trim();
		int length=0;
		//System.out.println(search_type.length());
		/*
		 * <option value='all'>全部</option>
			<option value='stuName'>姓名</option>
			<option value='stuNum'>学号</option>
			<option value='stuAge'>年龄</option>
			<option value="stuSex">性别</option>
			<option value='stuClass'>班级</option>
			
			<option value='major'>专业</option>
		 * */
		 //全部
		 if(search_type=="all"||search_type.equals("all"))
		 {
			 
			 studentList=studenttable.select();
		 }
		 //姓名 stuName
		 else if(search_type=="stuName"||search_type.equals("stuName"))
		 {
			 String searchvalue=request.getParameter("key");
			 System.out.println("班级名称"+searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 studentList=studenttable.selectByStuName(obj);
			 length=studenttable.selectCountByStuName(new Object[]{searchvalue});
		}
		 //学号 stuNum
		else if(search_type=="stuNum"||search_type.equals("stuNum"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println(searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 studentList=studenttable.selectByStuNum(obj);
			 length=studenttable.selectCountByStuNum(new Object[]{searchvalue});
		}
		 //年龄 stuAge
		else if(search_type=="stuAge"||search_type.equals("stuAge"))
		{
			String searchvalue=request.getParameter("key");
			 Object []obj={searchvalue,page,pagenum};
			 studentList=studenttable.selectByStuAge(obj);
			 length=studenttable.selectCountByStuAge(new Object[]{searchvalue});
		}
		 //性别 stuSex
		else if(search_type=="stuSex"||search_type.equals("stuSex"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println("层次"+searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 studentList=studenttable.selectByStuSex(obj);
			 length=studenttable.selectCountByStuSex(new Object[]{searchvalue});
			 System.out.println(length);
		}
        
		 //班级 stuClass
		else if(search_type=="stuClass"||search_type.equals("stuClass"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println("层次"+searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 studentList=studenttable.selectByStuClass(obj);
			 length=studenttable.selectCountByStuClass(new Object[]{searchvalue});
		}
		 //专业 major
		else if(search_type=="major"||search_type.equals("major"))
		{
			String searchvalue=request.getParameter("key");
			 System.out.println("层次"+searchvalue);
			 Object []obj={searchvalue,page,pagenum};
			 studentList=studenttable.selectByMajor(obj);
			 length=studenttable.selectCountByMajor(new Object[]{searchvalue});
		}
        
		 System.out.println("length:"+length);
		int CountPage=0;
		if(length>0)
		{
			CountPage=length/pagenum+1;
		}
		System.out.println("CountPage"+CountPage);
		
		
	
		for(int i=0;i<studentList.size();i++){
			StudentRelevantMessageVo temp = studentList.get(i);
			JSONObject json = new JSONObject();
			try {
				json.put("stuName", temp.getStuName());
				json.put("stuNum",temp.getStuNum());
				json.put("stuGender",temp.getStuGender());
				json.put("major",temp.getMajor());
				json.put("stuAge",temp.getStuAge());
				json.put("remark", temp.getRemark());
				json.put("className", temp.getClassName());
				//System.out.println(temp.getClassName());
				//System.out.println(temp.getCourseName());
				//json.put("courseName", temp.getCourseName());
				
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			studentJson.add(json);
		} 
		String strjson=studentJson.toString();
		System.out.println(strjson);
		strjson=strjson.substring(1,strjson.length()-1);
		strjson= "{\"Tables\":[" + strjson + "]";
		strjson= strjson+",\"pages\":" + String.valueOf(CountPage) + "}";
		System.out.println(strjson);
		 
		System.out.println(strjson);
		response.setCharacterEncoding("UTF-8");
		out.print(strjson);
		out.flush(); 
		out.close();
	}

}
