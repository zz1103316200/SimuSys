package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.SlotRelevantNumVo;
import xd.simu.vo.SlotVo;

public class SlotRelevantNumMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		SlotRelevantNumVo vo=new SlotRelevantNumVo();
		
		try {
		
			vo.setSlotID(rs.getInt("slotID"));
			vo.setSlotStyle(rs.getString("slotStyle"));
			vo.setSlotNum(rs.getInt("slotNum"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}

