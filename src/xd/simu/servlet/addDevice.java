package xd.simu.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;



import xd.simu.dao.DeviceDao;
import xd.simu.vo.subDeviceInterVo;
import xd.simu.vo.subDeviceSlotVo;


public class addDevice extends HttpServlet {

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
		//deviceNum、deviceName、factoryName、deviceType、deviceDes、
		//deviceUrl、realUrl、deviceInter deviceSlot

			String deviceNum=request.getParameter("deviceNum");
			String deviceName=request.getParameter("deviceName");
			String factoryName=request.getParameter("factoryName");
			String deviceDes=request.getParameter("deviceDes");
			String deviceType=request.getParameter("deviceType");
			String deviceUrl=request.getParameter("deviceUrl");
			String realUrl=request.getParameter("realUrl");
			
			String deviceInter=request.getParameter("deviceInter").toString();
			String deviceSlot=request.getParameter("deviceSlot").toString();
			
			System.out.println(deviceInter+"--");
			
			System.out.println("++"+deviceSlot);
			
			/*deviceInter=deviceInter.replace("[","");
			deviceInter=deviceInter.replace("]","");*/
			//deviceInter = "[{'interfaceID':'1','interName':'dsaf_0/0','coords':'159,19,204,41'},{'interfaceID':'3','interName':'dsaf_0/1','coords':'312,20,352,34'}]";
			/*JSONArray jsonA = JSONArray.fromObject(deviceInter);
			for(int i=0;i<jsonA.size();i++){
				JSONObject json=(JSONObject)jsonA.get(i);
				System.out.println(json.get("interfaceID"));
			}*/
			
			
			/*String[] slotArray=fixList.toString().split("\\|");
			
			for(int i=0;i<slotArray.length;i++)
			{
				System.out.print("fixList->"+slotArray[i]);
				String[] slotParameters=slotArray[i].split("\\$");
				System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
			}
			String[] sockArray=sockList.toString().split("\\|");
			
			for(int i=0;i<sockArray.length;i++)
			{
				System.out.print("sockList->"+slotArray[i]);
				String[] slotParameters=slotArray[i].split("\\$");
				System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
			}*/
			Boolean uploadDeviceResult=false;
			Boolean uploadRealResult=false;
			//this.getServletContext().getRealPath("/")
			//String saveDevicPath = request.getServletPath()+"/uploads/"+deviceUrl;
			//String saveDevicPath = this.getServletContext().getRealPath("/")+"WebRoot\\uploads\\";
			
		///	String saveRealPath = this.getServletContext().getRealPath("/")+"WebRoot\\uploads\\";
			
			String saveDevicPath ="E:/工程/";
			String saveRealPath="E:/工程/";
			//uploadDeviceResult=FileUpload(request,response,saveDevicPath);
			//uploadRealResult=FileUpload(request,response,saveRealPath);
			
			
			List<subDeviceInterVo> listDeviceInter = getJavaCollection(new subDeviceInterVo(),deviceInter);
			List<subDeviceSlotVo> listDeviceSlot = getJavaCollection(new subDeviceSlotVo(),deviceSlot);
			System.out.println(listDeviceInter.size()+"++"+listDeviceSlot.size());
			
			DeviceDao deviceTable=new DeviceDao();
			//deviceName,deviceID,practoryName,deviceStyle,description
			Object []obj={deviceName,deviceNum,factoryName,deviceType,deviceDes,deviceUrl,realUrl};
			
			//if(uploadDeviceResult&&uploadRealPath)
			//{
				if(deviceTable.add(obj,listDeviceInter,listDeviceSlot))
				{	
					System.out.print("****chenggong***");
					out.print("success");		
				}
				else 
				{
					System.out.print("****shibai***");
					out.print("unsuccess");	
				}
				
			//}
			//else
			//	out.print("unsuccess");	
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
        JSONArray jsonArray=(JSONArray)JSONSerializer.toJSON(jsons);
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
    
    private Boolean FileUpload(HttpServletRequest request,HttpServletResponse response,String savePath)
    {
    	String fileSavePath = savePath;
        File f1 = new File(fileSavePath);
        System.out.println(fileSavePath);
        if (!f1.exists()) {
            f1.mkdirs();
        }
        DiskFileItemFactory fac = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(fac);
        upload.setHeaderEncoding("utf-8");
        List fileList = null;
        try {
            fileList = upload.parseRequest(request);
        } catch (FileUploadException ex) {
            return false;
        }

        Iterator<FileItem> it = fileList.iterator();
        String name = "";
        String extName = "";
        while (it.hasNext()) {
            FileItem item = it.next();
            if (!item.isFormField()) {
                name = item.getName();
                long size = item.getSize();
                String type = item.getContentType();
                System.out.println(size + " " + type);
                if (name == null || name.trim().equals("")) {
                    continue;
                }

                //扩展名格式： 
                if (name.lastIndexOf(".") >= 0) {
                    extName = name.substring(name.lastIndexOf("."));
                }

                  File file = null;
                  File saveFile = new File(fileSavePath + name);
                  if(!saveFile.exists())
                  {
               	   try {
   			                 item.write(saveFile);
   			             } catch (Exception e) {
   			                 e.printStackTrace();
   			             }
               	  return true;
                  }
                  else
                  {
                	  return false;
                  }
            }
        }
        return true;
    }
}
