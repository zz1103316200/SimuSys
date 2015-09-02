package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.SlotVo;

public class SlotMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		SlotVo vo=new SlotVo();
		
		try {
		
			vo.setSlotID(rs.getInt("slotID"));
			vo.setSlotStyle(rs.getString("slotStyle"));
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
