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
import xd.simu.dao.MajorTableDao;
import xd.simu.vo.ClassTableVo;
import xd.simu.vo.MajorTableVo;

public class liststu_Class extends HttpServlet {

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
		PrintWriter out=response.getWriter();
		ClassTableDao  classtable=new ClassTableDao();
		List<ClassTableVo> classtableList=new ArrayList<ClassTableVo>();
		System.out.println("liststu");
		
		
		classtableList=classtable.select();
		JSONArray classtableJson=new JSONArray();
		for(int i=0;i<classtableList.size();i++){
			ClassTableVo temp =classtableList.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("className", temp.getClassName());
				json.put("classNum",temp.getClassNum());
				
				
			} catch (JSONException e) {
				
				e.printStackTrace();
			}
			classtableJson.add(json);
		} 
		//System.out.println(classTableJson);
		
		System.out.println(classtableJson);
		response.setCharacterEncoding("UTF-8");
		out.print(classtableJson);
		out.flush(); 
		out.close();
	}

}
