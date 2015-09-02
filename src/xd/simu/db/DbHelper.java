package xd.simu.db;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class DbHelper {
	
	public static String driver;
	public static String conn;
	public static String userName;
	public static String userPass;
	static{
		InputStream in = DbHelper.class.getResourceAsStream("/db.properties");
		Properties pro = new Properties();
		try{
			pro.load(in);
		}catch(IOException e){
			e.printStackTrace();
		}
//		InputStream in=DbHelper.class.getResourceAsStream("/db.properties");
//		Properties pro=new Properties();
//		try {
//		
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		driver=pro.getProperty("driver").trim();
		conn=pro.getProperty("conn").trim();
		userName=pro.getProperty("userName").trim();
		userPass=pro.getProperty("userPass").trim();
	}
	
	
	
}
