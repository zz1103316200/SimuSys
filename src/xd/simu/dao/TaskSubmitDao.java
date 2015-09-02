package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.TaskSubmitMapper;


public class TaskSubmitDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from task_submit where taskId=? and stuNum=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update task_submit set submitTime=?,gradeState=?,valution=?,xmlStr=?,submitState=? where taskId=? and stuNum=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'男','java','13890000000','陕西','西安','户县','吃葡萄的地方','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	
	public boolean updateGrade(Object[] obj) {
		String sql = "update task_submit set humanGrade=?,gradeState=?,valution=?,compGrade=? where taskId=? and stuNum=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'男','java','13890000000','陕西','西安','户县','吃葡萄的地方','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into task_submit"+
				"(taskId,stuNum,submitTime,gradeState,valution,xmlStr,submitState)"+
				"values"+
				"(?,?,?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'男','java','13890000000','陕西','西安','户县','吃葡萄的地方','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public List selectById(int id) {
		String sql="select * from task_submit where taskId="+id;
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql, null, new TaskSubmitMapper());
	}
	
	public List selectByState(int id,String state) {
		String sql="select * from task_submit where taskId='"+id+"'"+" and gradeState='"+state+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql, null, new TaskSubmitMapper());
	}
	
	public List selectByStuNum(String id) {
		String sql="select * from task_submit where stuNum='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql, null, new TaskSubmitMapper());
	}
	
	public Object selectByStuNumAndTaskid(int id,String stuNum) {
		String sql="select * from task_submit where taskId='"+id+"' and stuNum='"+stuNum+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql, null, new TaskSubmitMapper());
	}
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from task_submit";
		DbManager db=new DbManager();
		return db.select(sql, null, new TaskSubmitMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Object selectById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

}
