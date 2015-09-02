package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.BoardCardMapper;
import xd.simu.vo.subDeviceInterVo;
import xd.simu.vo.subDeviceSlotVo;

public class BoardCardDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from boardcard where boardcardID=?";
	
		DbManager db=new DbManager();
		Boolean deleteResult=false;
		BoardInterfaceDao deviceInterface=new BoardInterfaceDao();
		BoardSlotDao deviceslot=new BoardSlotDao();
		try
		{
			db.beginTrans();
			//"update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";				
			deleteResult=db.execute(sql, obj);			
			//sql="delete  from deviceInter where deviceID=?";
			
			
			
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
		deleteResult=deleteResult&&deviceInterface.delete(obj)&&deviceslot.delete(obj);
		
		return deleteResult;
	}
	public boolean update(Object[] obj) {
		String sql = "update boardcard set boardcardName=?,factory=?,slotID=?,remark=? where boardcardID=?";
		//{ boardName, factoryName, boardSlotId, boardDes,boardNum };//
		
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into boardcard"+
				"(boardcardID,boardcardName,slotID,remark,boardcardUrl,factory)"+
				"values"+
				"(?,?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}
	public boolean add(Object[] obj,List<subDeviceInterVo> listBoardInter,List<subDeviceSlotVo> listBoardSlot) {
		boolean addResult=false;
		
		DbManager db = new DbManager();
		try
		{
			db.beginTrans();
			
			//					{boardName,factoryName,boardUr,boardDes,boardSlotId};
			String boardSql = "insert into " +
					"boardcard (boardcardname,factory,boardcardUrl,remark,slotid) " +
					" values(?,?,?,?,?)";
			
			//addResult=db.execute(boardSql, obj);
			//int newId=getMaxId()+1;
		
			String interSql="insert into board_interface(boardID,interfaceID,coords,remark,interName) values(?,?,?,?,?)";
			int newId = db.executeAndNewID(boardSql, obj);
			for(int i=0;i<listBoardInter.size();i++)
			{
				//System.out.print("fixList->"+interArray[i]);
				////String[] interParameters=interArray[i].split("\\$");
			//	Object[] interObj={obj[1],interParameters[0],Integer.parseInt(interParameters[1]),""};
				//System.out.println("->"+interParameters[0]+":"+interParameters[1]);
				addResult=db.execute(interSql, new Object[]{newId,listBoardInter.get(i).getInterfaceID(),listBoardInter.get(i).getCoords(),"",listBoardInter.get(i).getInterName()});
			}
			String slotSql="insert into board_slot(boardID,slotID,coords,slotName,remark) values(?,?,?,?,?)";
			for(int i=0;i<listBoardSlot.size();i++)
			{
				
				//String[] slotParameters=slotArray[i].split("\\$");
				//System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
				//Object[] slotObj={obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""};
				addResult=db.execute(slotSql, new Object[]{newId,listBoardSlot.get(i).getSlotID(),listBoardSlot.get(i).getCoords(),listBoardSlot.get(i).getSlotName(),""});
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
		String sql="select * from boardcard limit ?,?";
		DbManager db=new DbManager();
		BoardCardMapper boardcardmap=new BoardCardMapper();
		return db.select(sql, obj, boardcardmap);
	}
	public List selectByBoardName(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select * from boardcard where boardcardName=? limit ?,?";
		DbManager db=new DbManager();
		BoardCardMapper boardcardmap=new BoardCardMapper();
		return db.select(sql, obj, boardcardmap);
	}
	public List selectByBoardSlot(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select * from boardcard where SlotID=? limit ?,?";
		DbManager db=new DbManager();
		BoardCardMapper boardcardmap=new BoardCardMapper();
		return db.select(sql, obj, boardcardmap);
	}
	public Object selectById(int id) {
		String sql="select * from boardcard where boardcardID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,obj, new BoardCardMapper());
	}
	
	public List selectBySlotId(int id) {
		String sql="select * from boardcard where slotID='"+id+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new BoardCardMapper());
	}
	public List selectBySlotIdAndName(int id,String name) {
		String sql="select * from boardcard where slotID='"+id+"' and boardcardName='"+name+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new BoardCardMapper());
	}
	
	public List selectBySlotIdAndFactory(int id,String name) {
		String sql="select * from boardcard where slotID='"+id+"' and factory='"+name+"'";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.select(sql,obj, new BoardCardMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select * from boardcard";
		DbManager db=new DbManager();
		return db.select(sql, null, new BoardCardMapper());
		
	}
	public int getMaxId()
	{
		String sql="select max(boardcardID) from boardcard ";
		DbManager db=new DbManager();
		return db.executeCount(sql, null);
	}

	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select count(*) from boardcard";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int  selectCountByboardName(Object[] obj)
	{
		String sql="select count(*) from boardcard where boardcardName=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}
	public int  selectCountByBoardSlot(Object[] obj)
	{
		String sql="select count(*) from boardcard where SlotID=?";
		DbManager db=new DbManager();
		return db.executeCount(sql, obj);
	}

	@Override
	public Object selectById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

}
