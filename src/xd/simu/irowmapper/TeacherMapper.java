package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.TeacherVo;

public class TeacherMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		TeacherVo vo=new TeacherVo();
		
		try {

			vo.setTeachPword(rs.getString("teachPword"));
			vo.setTeachName(rs.getString("teachName"));
			vo.setTeachNum(rs.getString("teachNum"));
			vo.setTeachGender(rs.getString("teachGender"));
			vo.setTeachPosition(rs.getString("teachPosition"));
			vo.setTeachAge(rs.getInt("teachAge"));
			vo.setRemark(rs.getString("remark"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
