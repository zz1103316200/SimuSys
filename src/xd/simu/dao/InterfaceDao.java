package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;

import xd.simu.irowmapper.InterfaceMapper;
import xd.simu.irowmapper.InterfaceRelevantMapper;
import xd.simu.irowmapper.InterfaceRelevantNumMapper;

public class InterfaceDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from interface where interfaceID=?";
		DbManager db=new DbManager();
		boolean deleteresult=false;
		try
		{
			db.beginTrans();
			if(!db.execute(sql, obj))
			{
				return deleteresult;
			}
			sql="delete from device_inter where interfaceID=?";
			if(!db.execute(sql, obj))
			{
				return deleteresult;
			}
			sql="delete from board_interface where interfaceID=?";
			if(!db.execute(sql, obj))
			{
				return deleteresult;
			}
			
			db.commit();
			deleteresult=true;
		}
		catch(Exception e)
		{
			db.rollback();
			deleteresult=false;
		}
		return deleteresult;
		
	}

	public boolean update(Object[] obj) {
		//Object []obj={portName,portType,portList,remark,portNum};
		
		String sql = "update interface set interfaceName=?,remark=? where interfaceID=?";

	
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		//{portName,portNum,portType,portList,portDes};
		String sql = "insert into interface"+
				"(interfaceName,interfaceStyle,parameters,remark)"+
				"values"+
				"(?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		String sql="select interfaceName,interfaceID,interfacestyle,parameters,remark from interface limit ?,?";
		InterfaceMapper interfaceMap=new InterfaceMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj, interfaceMap);
	}
	public List selectByinterfaceName(Object[] obj) {
		String sql="select interfaceName,interfaceID,interfacestyle,parameters,remark from interface where interfaceName=? limit ?,?";
		InterfaceMapper interfaceMap=new InterfaceMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj, interfaceMap);
	}
	public List selectByinterfaceID(Object[] obj) {
		String sql="select interfaceName,interfaceID,interfacestyle,parameters,remark from interface where interfaceID=? limit ?,?";
		InterfaceMapper interfaceMap=new InterfaceMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj, interfaceMap);
	}
	public List selectByinterfaceStyle(Object[] obj) {
		String sql="select interfaceName,interfaceID,interfacestyle,parameters,remark from interface where interfacestyle=? limit ?,?";
		InterfaceMapper interfaceMap=new InterfaceMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj, interfaceMap);
	}
	public Object selectById(String id) {
		String sql="select * from interface where interfaceID='"+id+"'";
		// TODO Auto-generated method stub
		DbManager db=new DbManager();
		InterfaceMapper interfaceMap=new InterfaceMapper();
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,null,interfaceMap);
	}
	public Object selectById(int id) {
		String sql="select * from interface where interfaceID='"+id+"'";
		// TODO Auto-generated method stub
		DbManager db=new DbManager();
		InterfaceMapper interfaceMap=new InterfaceMapper();
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,null,interfaceMap);
	}
	public List SelectByInterfaceID(Object[] obj)
	{
		String sql="select device_interface.interfaceId,device_interface.interfaceNum,interface.interfaceStyle from " +
				" 	(select deviceID,interfaceid,count(*) as interfaceNum " +
				"	from device_inter " +
				"where device_inter.deviceID=? group by interfaceid) " +
				"as device_interface,interface 	" +
				"where  device_interface.interfaceid=interface.interfaceid";
		// TODO Auto-generated method stub
		InterfaceRelevantNumMapper interfaceMap=new InterfaceRelevantNumMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj,interfaceMap);
	}
	public List SelectByBoard_InterfaceID(Object[] obj)
	{
		String sql="select board_interfaceNum.interfaceId,board_interfaceNum.interfaceNum,interface.interfaceStyle " +
				"from (select boardID,interfaceid,count(*) as interfaceNum 	" +
				"from board_interface 	where board_interface.boardID=? group by interfaceid) 		" +
				"as board_interfaceNum,interface " +
				"where  board_interfaceNum.interfaceid=interface.interfaceid";
		// TODO Auto-generated method stub
		InterfaceRelevantNumMapper interfaceMap=new InterfaceRelevantNumMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj,interfaceMap);
	}
	public List SelectByModuleInterfaceID(Object[] obj)
	{
		String sql="select interface.interfaceID,interface.interfaceName,interface.interfaceStyle,interface.parameters,interface.remark,module_interface.num as interfaceNum " +
				" from interface,module_interface " +
				"where module_interface.moduleID=? and interface.interfaceID=module_interface.interfaceID";
		// TODO Auto-generated method stub
		InterfaceRelevantMapper interfaceMap=new InterfaceRelevantMapper();
		DbManager db=new DbManager();
		return db.select(sql, obj,interfaceMap);
	}
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select interfaceName,interfaceID,interfacestyle,parameters,remark from interface";
		InterfaceMapper interfaceMap=new InterfaceMapper();
		DbManager db=new DbManager();
		return db.select(sql, null, interfaceMap);
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select Count(*) from interface";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountinterfaceName(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select Count(*) from interface where interfaceName=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountinterfaceStyle(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select Count(*) from interface where interfaceStyle=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int selectCountInterfaceID(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select Count(*) from interface where interfaceID=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}

}
