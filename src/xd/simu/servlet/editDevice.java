package xd.simu.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import xd.simu.dao.DeviceDao;

public class editDevice extends HttpServlet {

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

		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
//		System.out.print("*************************8888************");
			//deviceNum:newDeviceNum,
			//deviceName:newDeviceName,
			//factoryName:newFactoryName,
			//deviceType:newDeviceType,
			//deviceDes:newDeviceDes,
			//fixList:newFixList,
			//sockList:newSocketList
			String deviceNum=request.getParameter("deviceNum");
			String deviceName=request.getParameter("deviceName");
			String factoryName=request.getParameter("factoryName");
			String deviceDes=request.getParameter("deviceDes");
			String deviceType=request.getParameter("deviceType");
			//String fixList=request.getParameter("fixList").trim();
			//String sockList=request.getParameter("socketList").trim();
			
			//System.out.println("fixList:"+fixList+",sockList:"+sockList);
			//String[] interArray=fixList.toString().split("\\|");
			
//			System.out.println("changdu"+interArray.length);
//			for(int i=0;i<interArray.length-1;i++)
//			{
//				System.out.print("fixList->"+interArray[i]);
//				String[] interParameters=interArray[i].split("\\$");
//				System.out.println("->"+interParameters[0]+":"+interParameters[1]);
//			}
//			String[] slotArray=sockList.toString().split("\\|");
//			
//			for(int i=0;i<slotArray.length-1;i++)
//			{
//				System.out.print("sockList->"+slotArray[i]);
//				String[] slotParameters=slotArray[i].split("\\$");
//				System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
//			}
			DeviceDao deviceTable=new DeviceDao();
			//"update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";
			Object []obj={deviceName,factoryName,deviceType,deviceDes,deviceNum};
			
			if(deviceTable.updateNew(obj))
			//if(true)
			{	
				System.out.print("****chenggong***");
				out.print("success");		
			}
			else 
			{
				System.out.print("****shibai***");
				out.print("unsuccess");	
			}
			
			out.flush(); 
			out.close();
	}

}
