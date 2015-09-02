package xd.simu.servlet;
import java.io.File;
import java.io.IOException;

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

public class UpLoadify extends HttpServlet{

 /**
  * 文件上传
  */
 private static final long serialVersionUID = 2384326745121073713L;
 
 @Override 
 public void doGet(HttpServletRequest request, HttpServletResponse response) 
   throws ServletException, IOException {
  System.out.println("-------------------UpLoadify-doGet");
  System.out.println("-------------------QueryString::::" + request.getQueryString());
  doPost(request, response);
 }
 
 public void doPost(HttpServletRequest request, HttpServletResponse response)
   throws ServletException, IOException {
	 System.out.println("  coming in!!!!");
     String savePath = this.getServletConfig().getServletContext()
             .getRealPath("");
     savePath = savePath + "\\upload\\";
     System.out.println("  savepath:"+savePath);
     //String savePath = "E:/工程/SimuSys/WebRoot/uploads/";
     File f1 = new File(savePath);
     System.out.println(savePath);
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
         return;
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
//             do {
//                 //生成文件名：
//                 //name = UUID.randomUUID().toString();
//                 //file = new File(savePath + name + extName);
//            	 //System.out.println(savePath +name);
//            	 file = new File(savePath + name);
//             } while (file.exists());
             
             //File saveFile = new File(savePath + name + extName);
               File saveFile = new File(savePath + name);
               if(!saveFile.exists())
               {
            	   try {
            		   		 System.out.println("文件不存在");
			                 item.write(saveFile);
			                 response.getWriter().print("<script>alert('Success');</script>");
			             } catch (Exception e) {
			                 e.printStackTrace();
			             }
            	   //response.getWriter().print("<script>alert('Success');</script>");
               }
               else
               {
            	   response.getWriter().print("<script>alert('Already Exist!');</script>");
               }
         }
     }
     
    
    
 }
}

