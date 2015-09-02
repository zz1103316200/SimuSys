package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.DeviceMapper;
import xd.simu.vo.subDeviceInterVo;
import xd.simu.vo.subDeviceSlotVo;

public class DeviceDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from device where deviceID=?";
		DbManager db=new DbManager();
		Boolean deleteResult=false;
		DeviceInterDao deviceInterface=new DeviceInterDao();
		DeviceSlotDao deviceslot=new DeviceSlotDao();
		try
		{
			db.beginTrans();
			//"update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";				
			deleteResult=db.execute(sql, obj);			
			//sql="delete  from deviceInter where deviceID=?";
			deviceInterface.delete(obj);
			
			deviceslot.delete(obj);
			//String slotSql="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
			/*if(!deviceslot.delete(obj))
			{
				System.out.println("删除错误回滚！！！");
				deleteResult=false;
				
			}*/
			db.commit();
			deleteResult= true;
		}
		catch(Exception e)
		{
			db.rollback();
		
			System.out.println("删除错误回滚！！！");
			deleteResult= false;
		}
		return deleteResult;
	}


	public boolean update(Object[] obj) {
		String sql = "update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean update(Object[] obj,String interList,String slotList) {
		System.out.println("fixList="+interList+",sockList="+slotList);
		String[] interArray=interList.split("\\|");
		String[] slotArray=slotList.split("\\|");
		boolean updateResult=false;
	
		DbManager db = new DbManager();
		try
		{
			db.beginTrans();
			//"update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";
			String deviceSql = "update device "+
					"set deviceName=?,practoryName=?,deviceStyle=?,description=? "+
					"where deviceID=? ";
					
			updateResult=db.execute(deviceSql, obj);
			DeviceInterDao deviceInterface=new DeviceInterDao();
			for(int i=0;i<interArray.length;i++)
			{
				System.out.print("fixList->"+interArray[i]);
				String[] interParameters=interArray[i].split("\\$");
				if(deviceInterface.selectCount(new Object[]{obj[4],interParameters[0]})>=1)
				{
					updateResult=deviceInterface.update(new Object[]{interParameters[0],"",obj[4],interParameters[1]});
				}
				else
				{
					updateResult=deviceInterface.add(new Object[]{obj[4],interParameters[0],interParameters[1],""});
				}
				
			}
			DeviceSlotDao deviceslot=new DeviceSlotDao();
			//String slotSql="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
			for(int i=0;i<slotArray.length;i++)
			{
				System.out.print("sockList->"+slotArray[i]);
				String[] slotParameters=slotArray[i].split("\\$");
				//System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
				//Object[] slotObj={obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""};
				
				if(deviceslot.selectCount(new Object[]{obj[4],slotParameters[0]})>=1)
				{
					updateResult=deviceslot.update(new Object[]{slotParameters[0],"",obj[4],slotParameters[1]});
				}
				else
				{
					updateResult=deviceslot.add(new Object[]{obj[4],slotParameters[0],slotParameters[1],""});
				}
				
				//updateResult=db.execute(slotSql,new Object[]{obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""});
			}
			db.commit();
			updateResult=true;
		}
		catch(Exception e)
		{
			db.rollback();
		
			System.out.println("修改错误回滚！！！");
			updateResult=false;
		}
		return updateResult;

	}
	public boolean updateNew(Object[] obj){
		String sql = "update device "+
				"set deviceName=?,practoryName=?,deviceStyle=?,description=? "+
				"where deviceID=? ";
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean add(Object[] obj)
	{
		return false;
	}
	public boolean add(Object[] obj,String interList,String slotList) {
		System.out.println("fixList="+interList+",sockList="+slotList);
		String[] interArray=interList.split("\\|");
		String[] slotArray=slotList.split("\\|");
		boolean addResult=false;
	
		//String sql1="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
		//String sql2="insert into device_inter(deviceID,interfaceID,num,remark) values(?,?,?,?)";
		
		//String sql3 = "insert into slot(slotName,slotID,remark)values(?,?,?)";
		//String sql4 = "insert into interface(interfaceName,interfaceID,interfaceStyle,parameters,remark) values(?,?,?,?,?)";
		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		try
		{
			db.beginTrans();
			
			
			String deviceSql = "insert into device"+
					"(deviceName,deviceID,practoryName,deviceStyle,description) "+
					"values"+
					"(?,?,?,?,?)";
			addResult=db.execute(deviceSql, obj);
			String interSql="insert into device_inter(deviceID,interfaceID,num,remark) values(?,?,?,?)";
			for(int i=0;i<interArray.length;i++)
			{
				//System.out.print("fixList->"+interArray[i]);
				String[] interParameters=interArray[i].split("\\$");
			//	Object[] interObj={obj[1],interParameters[0],Integer.parseInt(interParameters[1]),""};
				//System.out.println("->"+interParameters[0]+":"+interParameters[1]);
				addResult=db.execute(interSql, new Object[]{obj[1],interParameters[0],Integer.parseInt(interParameters[1]),""});
			}
			String slotSql="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
			for(int i=0;i<slotArray.length;i++)
			{
				System.out.print("sockList->"+slotArray[i]);
				String[] slotParameters=slotArray[i].split("\\$");
				//System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
				//Object[] slotObj={obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""};
				addResult=db.execute(slotSql,new Object[]{obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""});
			}
			db.commit();
			//addResult=true;
		}
		catch(Exception e)
		{
			addResult=false;
			db.rollback();
		
			System.out.println("添加失败回滚！！！");
			
		}
		return addResult;
	}
	public boolean add(Object[] obj,List<subDeviceInterVo> listDeviceInter,List<subDeviceSlotVo> listDeviceSlot) {
	
		boolean addResult=false;
	
		//String sql1="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
		//String sql2="insert into device_inter(deviceID,interfaceID,num,remark) values(?,?,?,?)";
		
		//String sql3 = "insert into slot(slotName,slotID,remark)values(?,?,?)";
		//String sql4 = "insert into interface(interfaceName,interfaceID,interfaceStyle,parameters,remark) values(?,?,?,?,?)";
		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		try
		{
			db.beginTrans();
			
			
			String deviceSql = "insert into device"+
					"(deviceName,deviceID,practoryName,deviceStyle,description,deviceUrl,realUrl) "+
					"values"+
					"(?,?,?,?,?,?,?)";
			addResult=db.execute(deviceSql, obj);
			String interSql="insert into device_inter(deviceID,interfaceID,coords,remark,interName) values(?,?,?,?,?)";
			for(int i=0;i<listDeviceInter.size();i++)
			{
				//System.out.print("fixList->"+interArray[i]);
				////String[] interParameters=interArray[i].split("\\$");
			//	Object[] interObj={obj[1],interParameters[0],Integer.parseInt(interParameters[1]),""};
				//System.out.println("->"+interParameters[0]+":"+interParameters[1]);
				addResult=db.execute(interSql, new Object[]{obj[1],listDeviceInter.get(i).getInterfaceID(),listDeviceInter.get(i).getCoords(),"",listDeviceInter.get(i).getInterName()});
			}
			String slotSql="insert into device_slot(deviceID,slotID,coords,slotName,remark) values(?,?,?,?,?)";
			for(int i=0;i<listDeviceSlot.size();i++)
			{
				
				//String[] slotParameters=slotArray[i].split("\\$");
				//System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
				//Object[] slotObj={obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""};
				addResult=db.execute(slotSql, new Object[]{obj[1],listDeviceSlot.get(i).getSlotID(),listDeviceSlot.get(i).getCoords(),listDeviceSlot.get(i).getSlotName(),""});
			}
			db.commit();
			//addResult=true;
		}
		catch(Exception e)
		{
			addResult=false;
			db.rollback();
		
			System.out.println("添加失败回滚！！！");
			
		}
		return addResult;
	}
	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select deviceID,deviceName,practoryName,deviceStyle,description,deviceUrl,realUrl from device limit ?,?";
		DeviceMapper deviceMap=new DeviceMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,deviceMap);
	}
	public List select() {
		//System.out.println("okoko");
		/*String sql="select device.deviceID,device.deviceName,device.practoryName,device.deviceStyle,device.description,"+
				"interface.interfaceName,device_inter.num as interNum,slot.slotName,device_slot.num as slotNum "+
				"from device,interface,device_inter,slot,device_slot "+
				"where device.deviceID=device_inter.deviceID and device.deviceID=device_slot.deviceID";
		*/
		String sql="select deviceID,deviceName,practoryName,deviceStyle,description,deviceUrl,realUrl from device ";
		DeviceMapper deviceMap=new DeviceMapper();
		DbManager db = new DbManager();
		return db.select(sql, null,deviceMap);
	}
	public List selectByDeviceName(Object[] obj)
	{
		String sql="select * from device" +
				" where deviceName=?  limit ?,?";
		DeviceMapper deviceMap=new DeviceMapper();
		DbManager db=new DbManager();
		return db.select(sql,obj,deviceMap);
	}
	public List selectByPractoryName(Object[] obj)
	{
		String sql="select * from device" +
				" where practoryName=? limit ?,?";
		DeviceMapper deviceMap=new DeviceMapper();
		DbManager db=new DbManager();
		return db.select(sql,obj,deviceMap);
	}
	public List selectByDeviceStyle(Object[] obj)
	{
		String sql="select * from device " +
				" where deviceStyle=? limit ?,?";
		DeviceMapper deviceMap=new DeviceMapper();
		DbManager db=new DbManager();
		return db.select(sql,obj,deviceMap);
	}
	public Object selectById(String id) {
		String sql="select * from device where deviceID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new DeviceMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from device";
		DbManager db=new DbManager();
		return db.select(sql, null, new DeviceMapper());
		
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}
	public int selectCount() {
		String sql="select count(*) from device";
		DbManager db=new DbManager();
		
		return db.executeCount(sql,null);
	}
	public int selectCountByDeviceName(Object[] obj)
	{
		String sql="select count(*) from device where deviceName=?";
		DbManager db=new DbManager();
		
		return db.executeCount(sql,obj);
	}
	public int selectCountByPractoryName(Object[] obj) {
		String sql="select count(*) from device where practoryName=?";
		DbManager db=new DbManager();
		
		return db.executeCount(sql,obj);
	}
	public int selectCountByDeviceStyle(Object[] obj) {
		String sql="select count(*) from device where deviceStyle=?";
		DbManager db=new DbManager();
		return db.executeCount(sql,obj);
	}
}
