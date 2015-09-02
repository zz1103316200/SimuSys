package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.ClassTableMapper;
import xd.simu.irowmapper.LogicClassMapper;

public class LogicClassDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from classtable where classNum=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		//                                 {className,classNum,teacherNum,startTime,courseNum,remark,classId}
		String sql = "update logicclasstable set courseNum=?,teachNum=?,startTime=?,classNum=?,className=?,remark=? where classId=?";

		
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into logicclasstable"+
	//{className,classId,classNum,teacherNum,startTime,courseNum,remark};
	"(className,classId,classNum,teachNum,startTime,courseNum,remark)"+
				"values"+
				"(?,?,?,?,?,?,?)";
		DbManager db = new DbManager();
		/*try{
			db.beginTrans();
			db.commit();
		}
		catch(Exception e){
			System.out.println("閿欒鍥炴粴!!!");
			db.rollback();
		}*/
		//System.out.print(obj[5].toString());
		return db.execute(sql, obj);
	}

	public List select() {
		String sql="select logicclasstable.className,logicclasstable.classId as classNum,logicclasstable.startTime,logicclasstable.remark," +
				"teacher.teachName,logicclasstable.classNum as courseProperty,course.courseName,logicclasstable.courseNum " +
				"from logicclasstable,teacher,course  " +
				"where  logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum";

		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,logicclassMap);
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
		
		String sql="select logicclasstable.className,logicclasstable.classId as classNum,logicclasstable.startTime,logicclasstable.remark," +
				"teacher.teachName,logicclasstable.classnum as courseProperty,course.courseName " +
				"from logicclasstable,teacher,course "
				+ "where logicclasstable.className=? and logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
				//"where classtable.ClassName=? and classtable.classNum=logicclasstable.classID and logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			//	"where classtable.ClassName like %?% classtable.classNum=logicclasstable.classID and logicclasstable.teachNum=teacher.teachNum";
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,logicclassMap);
	}
	/*
	 * 鎸夌彮绾х紪鍙锋煡璇�
	 */
	public List selectByClassNum(Object[] obj) {
		
		String sql="select logicclasstable.className,logicclasstable.classId as classNum,logicclasstable.startTime,logicclasstable.remark," +
				"teacher.teachName,logicclasstable.classnum as courseProperty,course.courseName " +
				"from logicclasstable,teacher,course  " +
				"where logicclasstable.ClassId=? and  logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
	
		return db.select(sql, obj,logicclassMap);
	}
	/*
	 * 鎸夎�甯堝鍚嶆煡璇�
	 */
	public List selectByTeacherName(Object[] obj) {
		
		String sql="select logicclasstable.className,logicclasstable.classId as classNum,logicclasstable.startTime,logicclasstable.remark," +
				"teacher.teachName,logicclasstable.classnum as courseProperty,course.courseName " +
				"from logicclasstable,teacher,course  " +
				"where teacher.teachNum=? and  logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
	
		return db.select(sql, obj,logicclassMap);
	}
	/*
	 * 鎸夎绋嬪悕绉版煡璇�
	 */
	public List selectByCourseName(Object[] obj) {
		
		String sql="select logicclasstable.className,logicclasstable.classId as classNum,logicclasstable.startTime,logicclasstable.remark," +
				"teacher.teachName,logicclasstable.classnum as courseProperty,course.courseName " +
				"from logicclasstable,teacher,course  " +
				"where course.courseName=? and  logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
	
		return db.select(sql, obj,logicclassMap);
	}

	/*
	 * 鎸夊叆瀛︽椂闂存煡璇�
	 */
	public List selectByStartTime(Object[] obj) {
		
		String sql="select logicclasstable.className,logicclasstable.classNum,teacher.teachName,logicclasstable.classnum as courseProperty,"+
				"logicclasstable.startTime,logicclasstable.remark,course.courseName " +
				"from logicclasstable,teacher,course "+
				"where logicclasstable.startTime=?  and logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
	
		return db.select(sql, obj,logicclassMap);
	}
	/*
	 * 鎸変笓涓氭煡璇�
	 */
	public List selectByMajor(Object[] obj) {
		
		String sql="select classtable.className,classtable.classNum,classtable.classlevel,teacher.teachName,logicclasstable.classnum as courseProperty,"+
				"logicclasstable.startTime,logicclasstable.remark,course.courseName from classtable,logicclasstable,teacher,course "+
				"where classtable.Major=? and classtable.classNum=logicclasstable.classID and logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
	
		return db.select(sql, obj,logicclassMap);
	}
	/*
	 * 鎸夊眰娆℃煡璇�
	 */
	public List selectByClassLevel(Object[] obj) {
		
		String sql="select classtable.className,classtable.classNum,classtable.classlevel,teacher.teachName,logicclasstable.classnum as courseProperty,"+
				"logicclasstable.startTime,logicclasstable.remark,course.courseName from classtable,logicclasstable,teacher,course "+
				"where classtable.ClassLevel=? and classtable.classNum=logicclasstable.classID and logicclasstable.teachNum=teacher.teachNum and logicclasstable.courseNum=course.courseNum limit ?,?";
			
		LogicClassMapper logicclassMap=new LogicClassMapper();
		DbManager db = new DbManager();
	
		return db.select(sql, obj,logicclassMap);
	}
	
	public Object selectById(String id) {
		String sql="select * from classtable where classNum='"+id+"'";
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
		String sql="select * from classtable";
		DbManager db=new DbManager();
		return db.select(sql, null, new AdminMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select count(*) from logicclasstable";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByClassName(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select count(*) from logicclasstable where className=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByStartTime(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select count(*) from logicclasstable where StartTime=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByMajor(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select count(*) from logicclasstable where Major=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByClassID(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select count(*) from logicclasstable where ClassId=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	
}
