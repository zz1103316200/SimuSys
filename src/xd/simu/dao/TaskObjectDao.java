package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.TaskMapper;
import xd.simu.irowmapper.TaskObjectMapper;

public class TaskObjectDao {
	public boolean delete(Object[] obj) {
		String sql="delete from task_object where taskId=? and taskTarget=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update task_object set type=? where taskTarget=? and taskId=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'男','java','13890000000','陕西','西安','户县','吃葡萄的地方','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into task_object"+
				"(taskId,taskTarget,type)"+
				"values"+
				"(?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'男','java','13890000000','陕西','西安','户县','吃葡萄的地方','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object selectById(String id) {
		String sql="select * from task_object where taskId='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new TaskObjectMapper());
	}
	
	public List selectByStuNum(String id) {
		String sql="select * from task_object where taskTarget='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new TaskObjectMapper());
	}
	
	public List selectByTaskId(int id) {
		String sql="select * from task_object where taskId="+id;
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new TaskObjectMapper());
	}
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from task_object";
		DbManager db=new DbManager();
		return db.select(sql, null, new TaskObjectMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}

}
