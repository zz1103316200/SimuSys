package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.ClassTableMapper;


public class ClassTableDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from classtable where classNum=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		//                                 className,major,startTime,remark,level,classNum
		String sql = "update classtable set className=?,major=?,startTime=?,remark=?,classlevel=? where classNum=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into classtable"+
	//Object []obj={className,classNum,major,startTime,level,remark};
				"(className,classNum,major,startTime,classlevel,remark)"+
				"values"+
				"(?,?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		//System.out.print(obj[5].toString());
		return db.execute(sql, obj);
	}

	public List select() {
		//String sql="select className,classNum,major,startTime,remark,classlevel from classtable";
		String sql="select * from classtable";
		ClassTableMapper classtableMap=new ClassTableMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,classtableMap);
	}
	public List select(Object[] obj) {
	
		String sql="select * from classtable";
		
		ClassTableMapper classtableMap=new ClassTableMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,classtableMap);
	}
	/*
	 * 鎸夌彮绾у悕鏌ヨ
	 */
	public List selectByClassName(Object[] obj) {
		
		String sql="select * from classtable where classname=?";
		
		ClassTableMapper classtableMap=new ClassTableMapper();
		DbManager db = new DbManager();
		//System.out.println("绛涢�鐝骇鍚嶏細"+obj[0]);
		return db.select(sql, obj,classtableMap);
	}
	/*
	* 按班级编号查询
	*/
	public List selectByClassNum(Object[] obj){

		String sql="select * from classtable where classNum=?";

		ClassTableMapper classtableMap=new ClassTableMapper();

		DbManager db = new DbManager();
		return db.select(sql, obj,classtableMap);
	}
	
//	public Object selectByClassNum(String num){
//
//		String sql="select * from classtable where classNum=?";
//
//		ClassTableMapper classtableMap=new ClassTableMapper();
//
//		DbManager db = new DbManager();
//		Object obj = new Object();
//		return db.selectById(sql, obj,classtableMap);
//	}
	/*
	 * 鎸夊叆瀛︽椂闂存煡璇�
	 */
	public List selectByStartTime(Object[] obj) {
		
		String sql="select * from classtable where startTime=?";
		
		ClassTableMapper classtableMap=new ClassTableMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,classtableMap);
	}
	/*
	 * 鎸変笓涓氭煡璇�
	 */
	public List selectByMajor(Object[] obj) {
		
		String sql="select * from classtable where major=?";
		
		ClassTableMapper classtableMap=new ClassTableMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,classtableMap);
	}
	/*
	 * 鎸夊眰娆℃煡璇�
	 */
	public List selectByClassLevel(Object[] obj) {
		
		String sql="select * from classtable where classlevel=?";
		
		ClassTableMapper classtableMap=new ClassTableMapper();
		//System.out.println("绛涢�灞傛锛�+obj[0]);
		DbManager db = new DbManager();
		return db.select(sql, obj,classtableMap);
	}
	
	public Object selectById(String id) {
		String sql="select * from classtable where classNum='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new ClassTableMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from classtable";
		DbManager db=new DbManager();
		return db.select(sql, null, new ClassTableMapper());
		
	}

	
	
	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}
}
