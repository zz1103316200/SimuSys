package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.TaskMapper;
import xd.simu.vo.StudentClassVo;

public class TaskDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from task where taskId=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update task set taskName=?,taskTarget=?,deadline=?,description=?,teacherId=?,taskState=?,makeTime=?,resoures=?,taskDoc=? where taskId=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean updateWeight(Object[] obj) {
		System.out.println("   jinlaile---");
		String sql = "update task set weight=? where taskId=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean updatePart(Object[] obj) {
		String sql = "update task set taskName=?,deadline=?,description=? where taskId=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	
	public boolean updateSource(Object[] obj) {
		String sql = "update task set resoures=? where taskId=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	
	public boolean add(Object[] obj,String classID) {
		boolean addResult = false;
		

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		StudentClassDao sct = new StudentClassDao();
		List<StudentClassVo> listS = (List<StudentClassVo>)sct.selectByClassId(classID);
		StudentClassVo scv =null;
		try {
			String taskSql = "insert into task"+
					"(taskName,taskTarget,deadline,description,teacherId,taskState,makeTime,resoures,taskDoc,classId)"+
					"values"+
					"(?,?,?,?,?,?,?,?,?,?)";
			
			//addResult = db1.execute(deviceSql, obj);
			db.beginTrans();

			// Object []obj={lineName,linestyle,"",boardUr,linedes,""};
			// db.execute(cableSql, obj,count);
			String taskObjectSql = "insert into task_object"+
					"(taskId,taskTarget,type)"+
					"values"+
					"(?,?,?)";
			int id = db.executeAndNewID(taskSql, obj);
			System.out.println("最大ID：" + id);
			for(int i=0;i<listS.size();i++){
				scv=listS.get(i);
				addResult = db.execute(taskObjectSql, new Object[] { id,scv.getStuNum(), "false"});
			}
			
			db.commit();
			// addResult=true;
		} catch (Exception e) {
			addResult = false;
			db.rollback();

			System.out.println("添加失败回滚！！！");

		}
		return addResult;
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public Object selectById(int id) {
		String sql="select * from task where taskId="+id;
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new TaskMapper());
	}
	
	public List selectByTeachNum(String id, int classId) {
		String sql="select * from task where teacherId='"+id+"' and classId='"+classId+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new TaskMapper());
	}
	
	public List selectByTaskState(String id,String name) {
		String sql="select * from task where taskState='"+id+"'"+" and teacherId='"+name+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new TaskMapper());
	}
	
	public List selectByTaskTarget(String TaskTarget,String name) {
		String sql="select * from task where taskTarget='"+TaskTarget+"'"+" and teacherId='"+name+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new TaskMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from task";
		DbManager db=new DbManager();
		return db.select(sql, null, new TaskMapper());
		
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

	@Override
	public boolean add(Object[] obj) {
		// TODO Auto-generated method stub
		return false;
	}

}
