package xd.simu.dao;

import java.sql.SQLException;
import java.util.List;

import javax.enterprise.deploy.model.DDBean;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.StudentMapper;
import xd.simu.irowmapper.StudentRelevantMessageMapper;

public class StudentDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from student where stuNum=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update student set stuName=?,stuGender=?,major=?,classNum=?,stuAge=?,remark=? where stuNum=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	
	public boolean updatePword(Object[] obj) {
		String sql = "update student set stuPword=? where stuNum=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	
	public boolean add(Object[] obj) {
		
		String sql = "insert into student "+
				"values"+
				"(?,?,?,?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		/*try
		{
			db.beginTrans();
		
			db.commit();
		}
		catch(Exception e)
		{
			db.rollback();
		}*/
		return db.execute(sql, obj);
	}

	public List select() {
		// TODO Auto-generated method stub
		/*String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark,"+
				"majortable.majorName,logicclasstable.className,course.courseName "+
				"from student,majortable,logicclasstable,course "+
				"where student.major=majortable.majorID and student.classNum=logicclasstable.classNum and "+
							"logicclasstable.courseNum=course.courseNum";
		*/
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className"+
				 "from student,majortable,classtable"+
				 "where  student.major=majortable.majorID and student.classNum=classtable.classNum "; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,stuMessMap);
	}
	public List selectByStuName(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classtable "+
				 "where student.stuName=? and student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}

	public List selectByStuNum(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classtable  "+
				 "where student.stuNum=? and student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}
	public List selectByStuAge(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classtable  "+
				 "where stuAge=? and student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}
	public List selectByStuSex(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classtable  "+
				 "where student.stuGender=? and student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}
	public List selectByStuClass(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classtable  "+
				 "where classtable.classNum=? and student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}
	public List selectByMajor(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classtable  "+
				 "where majortable.majorID=? and student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}
	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select student.stuName,student.stuNum,student.stuAge,student.stuGender,student.remark," +
				"majortable.majorName,classtable.className "+
				 "from student,majortable,classTable  "+
				 "where student.major=majortable.majorID and student.classNum=classtable.classNum  limit ?,?"; 
		StudentRelevantMessageMapper stuMessMap=new StudentRelevantMessageMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,stuMessMap);
	}
	public List selectByClassNum(String classNum) {
		// TODO Auto-generated method stub
		String sql="select * from student where classNum='"+classNum+"'";
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		return db.select(sql, obj,new StudentMapper());
	}
	public Object selectById(String id) {
		String sql="select * from student where stuNum='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,null, new StudentMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from student";
		DbManager db=new DbManager();
		return db.select(sql, null, new StudentMapper());
		
	}

	public int selectCount(Object[] obj) {
		String sql="select Count(*) from student";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByStuName(Object[] obj) {
		String sql="select Count(*) from student where student.stuName=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByStuNum(Object[] obj) {
		String sql="select Count(*) from student where student.stuNum=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByStuAge(Object[] obj) {
		String sql="select Count(*) from student where student.stuAge=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByStuSex(Object[] obj) {
		String sql="select Count(*) from student where student.stuGender=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByStuClass(Object[] obj) {
		String sql="select Count(*) from student where student.classNum=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountByMajor(Object[] obj) {
		String sql="select Count(*) from student where student.major=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	
}
