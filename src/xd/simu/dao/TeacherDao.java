package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.ClassTableMapper;
import xd.simu.irowmapper.TeacherMapper;

public class TeacherDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from teacher where teachNum=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update teacher set teachName=?,teachAge=?,teachGender=?,teachPosition=?,remark=? where teachNum=? ";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean updatePword(Object[] obj) {
		String sql = "update teacher set teachPword=? where teachNum=? ";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean add(Object[] obj) {
		//teachName,teachNum,teachAge,teachGender,teachPosition,remark
		String sql = "insert into teacher"+
				"(teachPword,teachName,teachNum,teachAge,teachGender,teachPosition,remark) "+
				"values"+
				"(?,?,?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public List select() {
		String sql="select teachName,teachNum,teachGender,teachPosition,teachAge,remark,teachPword from teacher";
		TeacherMapper teacherMap=new TeacherMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,teacherMap);
	}
	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object selectById(String id) {
		String sql="select * from teacher where teachNum='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new TeacherMapper());
	}
	/**
	 * 鎸夋暀甯堝悕鏌ユ壘
	 * */
	public List selectByTeachName(Object[] obj) {
		String sql="select * from teacher where teachName=?";
		// TODO Auto-generated method stub
		
		TeacherMapper teacherMap=new TeacherMapper();
		DbManager db=new DbManager();	
		return db.select(sql,obj, teacherMap);
	}
	/**
	 * 鎸夋暀甯堢紪鍙锋煡鎵�
	 * */
	public List selectByTeachNum(Object[] obj) {
		String sql="select * from teacher where teachNum=?";
		// TODO Auto-generated method stub
		
		TeacherMapper teacherMap=new TeacherMapper();
		DbManager db=new DbManager();	
		return db.select(sql,obj, teacherMap);
	}
	/**
	 * 鎸夋暀甯堟�鍒煡鎵�
	 * */
	public List selectByTeachGender(Object[] obj) {
		String sql="select * from teacher where teachGender=?";
		// TODO Auto-generated method stub
		TeacherMapper teacherMap=new TeacherMapper();
		DbManager db=new DbManager();	
		return db.select(sql,obj, teacherMap);
	}
	/**
	 * 鎸夋暀甯堝勾榫勬煡鎵�
	 * */
	public List selectByTeachAge(Object[] obj) {
		String sql="select * from teacher where teachAge=?";
		// TODO Auto-generated method stub
		
		TeacherMapper teacherMap=new TeacherMapper();
		DbManager db=new DbManager();	
		return db.select(sql,obj, teacherMap);
	}
	/**
	 * 鎸夋暀甯堣亴绉版煡鎵�
	 * */
	public List selectByTeachPosition(Object[] obj) {
		String sql="select * from teacher where teachPosition=?";
		// TODO Auto-generated method stub
		
		TeacherMapper teacherMap=new TeacherMapper();
		DbManager db=new DbManager();	
		return db.select(sql,obj, teacherMap);
	}
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from teacher";
		DbManager db=new DbManager();
		return db.select(sql, null, new TeacherMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}
}
