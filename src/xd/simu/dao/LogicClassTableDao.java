package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.LogicClassTableMapper;
import xd.simu.vo.StudentVo;

public class LogicClassTableDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from logicclasstable where classID=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update logicclasstable set courseNum=?,teachNum=?,startTime=?,classNum=?,className=?,remark=? where classID=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj,String classNum) {

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		boolean addResult = false;
		DbManager db = new DbManager();
		//DbManager db1 = new DbManager();
		StudentDao sd = new StudentDao();
		List<StudentVo> listS = null;
		StudentVo sv = null;
		try {
			String logicSql = "insert into logicclasstable"+
					"(courseNum,teachNum,startTime,classNum,className,remark)"+
					"values"+
					"(?,?,?,?,?,?)";
			
			//addResult = db1.execute(deviceSql, obj);
			db.beginTrans();

			// Object []obj={lineName,linestyle,"",boardUr,linedes,""};
			// db.execute(cableSql, obj,count);
			String studenSql = "insert into student_class"+
					"(classID,stuNum,remark)"+
					"values"+
					"(?,?,?)";
			int id = db.executeAndNewID(logicSql, obj);
			System.out.println("最大ID：" + id);
			if(!classNum.equals("selectable")){
				listS = (List<StudentVo>)sd.selectByClassNum(classNum);
				for(int i = 0; i < listS.size(); i++){
					sv = listS.get(i);
					addResult = db.execute(studenSql, new Object[] { id,
							sv.getStuNum(), "" });
				}
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

	public Object selectById(String id) {
		String sql="select * from logicclasstable where classID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new LogicClassTableMapper());
	}
	
	public List selectByTeachNum(String id) {
		String sql="select * from logicclasstable where teachNum='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new LogicClassTableMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from logicclasstable";
		DbManager db=new DbManager();
		return db.select(sql, null, new LogicClassTableMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean add(Object[] obj) {
		// TODO Auto-generated method stub
		return false;
	}
}
