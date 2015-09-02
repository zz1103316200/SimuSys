package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.ClassTableMapper;
import xd.simu.irowmapper.CourseMapper;

public class CourseDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from course where courseNum=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update course set courseName=?,periods=?,classTime=?,remark=? where courseNum=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into course"+
				"(courseName,courseNum,periods,classTime,remark)"+
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
	public List select()
	{
		String sql="select * from course";
		//CourseMapper map=new CourseMapper();
		//DbManager db=new DbManager();
	    //return	db.select(sql,null, map);
		//String sql="select className,classNum,major,startTime,remark,classlevel,teachPword from classtable";
		CourseMapper courseMap=new CourseMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,courseMap);
		
	}
	public Object selectById(String id) {
		String sql="select * from course where courseNum='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new CourseMapper());
	}
	/*
	 * 按课程名查询
	 */
	public List selectByCourseName(Object[] obj) {
		
		String sql="select * from course where courseName=?";
		
		CourseMapper courseMap=new CourseMapper();
		DbManager db = new DbManager();
		//System.out.println("筛选班级名："+obj[0]);
		return db.select(sql, obj,courseMap);
	}

	/*
	 * 按课程号查询
	 */
	public List selectByCourseNum(Object[] obj) {
		
		String sql="select * from course where courseNum=?";
		
		CourseMapper courseMap=new CourseMapper();
		DbManager db = new DbManager();
		//System.out.println("筛选班级名："+obj[0]);
		return db.select(sql, obj,courseMap);
	}
	/*
	 * 按课程号查询
	 */
	public Object selectByCourseNumO(String num) {
		
		String sql="select * from course where courseNum='"+num+"'";
		
		CourseMapper courseMap=new CourseMapper();
		DbManager db = new DbManager();
		Object obj[]=new Object[]{};
		//System.out.println("筛选班级名："+obj[0]);
		return db.selectById(sql, obj,courseMap);
	}
	/*
	 * 按课时长查询
	 */
	public List selectByPeriods(Object[] obj) {
		
		String sql="select * from course where periods=?";
		
		CourseMapper courseMap=new CourseMapper();
		DbManager db = new DbManager();
		//System.out.println("筛选班级名："+obj[0]);
		return db.select(sql, obj,courseMap);
	}
	/*
	 * 按授课时间查询
	 */
	public List selectByClassTime(Object[] obj) {
		
		String sql="select * from course where classTime=?";
		
		CourseMapper courseMap=new CourseMapper();
		DbManager db = new DbManager();
		//System.out.println("筛选班级名："+obj[0]);
		return db.select(sql, obj,courseMap);
	}
	
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from course";
		DbManager db=new DbManager();
		return db.select(sql, null, new CourseMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}
}
