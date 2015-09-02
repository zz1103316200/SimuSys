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
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import xd.simu.dao.BoardCardDao;
import xd.simu.dao.DeviceDao;
import xd.simu.vo.subDeviceInterVo;
import xd.simu.vo.subDeviceSlotVo;

public class addBoard extends HttpServlet {

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
		/*
		boardName:newBoardName,
					//boardNum:newBoardNum,
					factoryName:newFactoryName,
					boardUrl:newBoardUrl,
					boardSlotId:newBoardSlotId,
					boardFixList:newPort,
					boardSocketList:newSlot,
					boardDes:newBoardDes
		 */
	
		String boardName = request.getParameter("boardName");
		String factoryName = request.getParameter("factoryName");
		String boardUr = request.getParameter("boardUr");
		String boardDes = request.getParameter("boardDes");
		//System.out.println("boardSlotName->"+request.getParameter("boardSlotId"));
		int boardSlotId =Integer.parseInt(request.getParameter("boardSlotId"));
		String boardFixList = request.getParameter("boardFixList");
		String boardSocketList = request.getParameter("boardSocketList");
		
		System.out.println("boardFixList->"+boardFixList);
		System.out.println("boardSocketList->"+boardSocketList);
		List<subDeviceInterVo> listBoardInter = getJavaCollection(new subDeviceInterVo(),boardFixList);
		List<subDeviceSlotVo> listBoardSlot = getJavaCollection(new subDeviceSlotVo(),boardSocketList);
		System.out.println(listBoardInter.size()+"++"+listBoardSlot.size());
		
		BoardCardDao boardcardTable = new BoardCardDao();
		Object []obj={boardName,factoryName,boardUr,boardDes,boardSlotId};
		// deviceName,deviceID,practoryName,deviceStyle,description
		//Object[] obj = { deviceName, deviceNum, factoryName, deviceType,
		//		deviceDes };

		if (boardcardTable.add(obj,listBoardInter,listBoardSlot)) {
			System.out.print("****chenggong***");
			out.print("success");
		} else {
			System.out.print("****shibai***");
			out.print("unsuccess");
		}

		out.flush();
		out.close();
	}
	/**
     * 封装将json对象转换为java集合对象
     * 
     * @param <T>
     * @param clazz
     * @param jsons 
     * @return
     */
    private <T> List<T> getJavaCollection(T clazz, String jsons) {
    	//jsons.replace("\\\"", "\\\\\\\"");
    	//System.out.println(jsons);
        List<T> objs=null;
        JSONArray jsonArray=JSONArray.fromObject(jsons);
        if(jsonArray!=null){
            objs=new ArrayList<T>();
            List list=(List)JSONSerializer.toJava(jsonArray);
            for(Object o:list){
                JSONObject jsonObject=JSONObject.fromObject(o);
                T obj=(T)JSONObject.toBean(jsonObject, clazz.getClass());
                objs.add(obj);
            }
        }
        return objs;
    }

}
