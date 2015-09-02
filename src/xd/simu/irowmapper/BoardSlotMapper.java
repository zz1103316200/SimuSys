package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.BoardSlotVo;

public class BoardSlotMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		BoardSlotVo vo=new BoardSlotVo();
		
		try {
			
			vo.setBoardID(rs.getInt("boardID"));
			vo.setSlotID(rs.getInt("slotID"));
			vo.setCoords(rs.getString("coords"));
			vo.setRemark(rs.getString("remark"));
			vo.setSlotName(rs.getString("slotName"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
