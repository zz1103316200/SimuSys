package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.TaskObjectVo;
import xd.simu.vo.TaskVo;

public class TaskObjectMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		TaskObjectVo vo=new TaskObjectVo();
		
		try {
			
			vo.setTaskId(rs.getInt("taskId"));

			vo.setTaskTarget(rs.getString("taskTarget"));

			vo.setType(rs.getString("type"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
