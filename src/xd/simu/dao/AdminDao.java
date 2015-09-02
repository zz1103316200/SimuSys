package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;

public class AdminDao implements IDAO{

	public boolean delete(Object[] obj) {
		String sql="delete from administrator where adminName=? and adminPword=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update administrator set adminPword=? where adminName=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	
	public boolean updatePword(Object[] obj) {
		String sql = "update administrator set adminPword=? where adminName=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean add(Object[] obj) {
		String sql = "insert into administrator"+
				"(adminName,adminPword)"+
				"values"+
				"(?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object selectById(String id) {
		String sql="select * from administrator where adminName='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new AdminMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from administrator";
		DbManager db=new DbManager();
		return db.select(sql, null, new AdminMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}

}
