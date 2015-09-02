package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.BoardCardVo;

public class BoardCardMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		BoardCardVo vo=new BoardCardVo();
		
		try {
			
			vo.setBoardcardID(rs.getInt("boardcardID"));
			vo.setBoardcardName(rs.getString("boardcardName"));
			vo.setSlotID(rs.getInt("slotID"));
			vo.setRemark(rs.getString("remark"));
			vo.setBoardcardUrl(rs.getString("boardcardUrl"));
			vo.setFactory(rs.getString("factory"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
