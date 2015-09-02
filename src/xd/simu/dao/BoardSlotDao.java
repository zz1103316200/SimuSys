package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.BoardSlotMapper;

public class BoardSlotDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from board_slot where boardID=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update board_slot set coords=?,remark=? where boardID=?,slotID=? and slotName=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into board_slot"+
				"(boardID,slotID,coords,remark,slotName)"+
				"values"+
				"(?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object selectById(String id) {
		String sql="select * from board_slot where boardID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new BoardSlotMapper());
	}
	
	public List selectById(int id) {
		String sql="select * from board_slot where boardID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new BoardSlotMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from board_slot";
		DbManager db=new DbManager();
		return db.select(sql, null, new BoardSlotMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}
}
