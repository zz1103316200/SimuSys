package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.MajorTableMapper;

public class MajorTableDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from majortable where majorID=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update majortable set majorName=?,remark=? where majorID=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into majortable"+
				"(majorName,majorID,remark)"+
				"values"+
				"(?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object selectById(String id) {
		String sql="select * from majortable where majorID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new MajorTableMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from majortable";
		DbManager db=new DbManager();
		return db.select(sql, null, new MajorTableMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}
}
