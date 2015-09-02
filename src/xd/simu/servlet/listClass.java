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

public class listClass extends HttpServlet {

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

		response.setContentType("application/json;charset=utf-8");
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
		//String search_type=request.getParameter("searchType");
		//page 涓虹鍑犻〉  pagenum涓鸿椤�璁板綍鏁�
		int page=Integer.parseInt(request.getParameter("page"));
		int pagenum=Integer.parseInt(request.getParameter("item"));
		System.out.println("page:"+page+"pagenum"+pagenum);
		int start =pagenum*(page-1);
		PrintWriter out = response.getWriter();
	//	System.out.print("+++++++++++++++++++++++++++++");
		ClassTableDao classtable =new ClassTableDao();
		
		List<ClassTableVo> classtableList=new ArrayList<ClassTableVo>();
		List<ClassTableVo> classtableList1=new ArrayList<ClassTableVo>();
			
		JSONArray classTableJson=new JSONArray();
		
		classtableList=classtable.select();
		
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
		String keys[]={"className","classNum","major","startTime","remark"};
		ArrayList<ClassTableVo> classlist1=new ArrayList<ClassTableVo>();
		for(int i=0;i<classtableList1.size();i++){
			ClassTableVo temp =classtableList1.get(i); 
			JSONObject json = new JSONObject();
			try {
				json.put("className", temp.getClassName());
				json.put("classNum",temp.getClassNum());
				json.put("major",temp.getMajor());
				json.put("startTime",temp.getStartTime());
				json.put("remark", temp.getRemark());
				json.put("level", temp.getClasslevel());
				
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
	 // showType(3);
	}
	/* * 
	 * @param search_type 鏌ヨ鏉′欢  1 浠ｈ〃 鎸夆�鐝骇鍚嶇О鈥濇煡璇紝2 浠ｈ〃 鎸夆�鍏ュ鏃堕棿鈥濇煡璇紝3 浠ｈ〃 鎸夆�涓撲笟鈥濇煡璇紝4浠ｈ〃 鎸夆�灞傛鈥濇煡璇紝鍏朵粬
	 */
	private void showType(int search_type)
	{
		
		switch(search_type)
		{
			case 0:
			
				break;
			case 1:
			
				break;
		
			case 2:
		
				break;
		
			case 3:
			
				break;
			case 4:
				
				break;
			default:
				
				break;
		}
	}
}
