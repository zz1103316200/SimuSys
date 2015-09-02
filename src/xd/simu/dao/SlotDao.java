package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.SlotMapper;
import xd.simu.irowmapper.SlotRelevantMapper;
import xd.simu.irowmapper.SlotRelevantNumMapper;

public class SlotDao implements IDAO{
	public boolean delete(Object[] obj) {
		String sql="delete from slot where slotID=?";
		DbManager db=new DbManager();

		return db.execute(sql, obj);
	}

	public boolean update(Object[] obj) {
		String sql = "update slot set slotStyle=?,remark=? where slotID=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into slot"+
				"(slotStyle,slotID,remark)"+
				"values"+
				"(?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'锟斤拷','java','13890000000','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷','锟斤拷锟斤拷锟窖的地凤拷','1');"
		DbManager db = new DbManager();
		
		return db.execute(sql, obj);
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	public List selectBySlotID(Object[] obj) {
		String sql="select device_slotNum.slotId,device_slotNum.slotNum,Slot.slotStyle " +
				"from (select deviceID,slotId,count(*) as slotNum " +
				"from device_slot " +
				"where device_slot.deviceID=? group by slotId)  " +
				"as device_slotNum,Slot  " +
				"where  device_slotNum.slotId=Slot.slotId  ";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		SlotRelevantMapper slotMap=new SlotRelevantMapper();
		return db.select(sql, obj, slotMap);
	}
	public List selectByModuleSlotID(Object[] obj) {
		String sql="select slot.slotName,slot.slotID,module_slot.num as slotNum,slot.remark from slot,module_slot " +
				"where module_slot.moduleID=? and slot.slotID=module_slot.slotID ";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		SlotRelevantMapper slotMap=new SlotRelevantMapper();
		return db.select(sql, obj, slotMap);
	}
	public Object selectById(int id){
		String sql="select * from slot where slotID='"+id+"'";
		// TODO Auto-generated method stub
	
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,null, new SlotMapper());
	}
	public List selectByBoardSlotID(Object[] obj) {
		//
		String sql="select device_slotNum.slotId,device_slotNum.slotNum,Slot.slotstyle 	" +
				"from (select BoardID,slotId,count(*) as slotNum " +
				"from board_slot where board_slot.boardID=? group by boardID)  " +
				"as	 device_slotNum,Slot  " +
				"where  device_slotNum.slotId=Slot.slotId ";
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		SlotRelevantNumMapper slotMap=new SlotRelevantNumMapper();
		return db.select(sql, obj, slotMap);
	}
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List selectAll() {
		String sql="select slotStyle,slotID,remark from slot";
		SlotMapper slotMap=new SlotMapper();
		DbManager db=new DbManager();
		return db.select(sql, null, slotMap);
		
	}


	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}

	public Object selectById(String id){
		String sql="select * from slot where slotID='"+id+"'";
		// TODO Auto-generated method stub
	
		// TODO Auto-generated method stub
		
		DbManager db=new DbManager();
		
		Object obj[]=new Object[]{};
		
		return db.selectById(sql,null, new SlotMapper());
	}

	
	
}
