package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.TaskDefineVo;


public class TaskDefineMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		TaskDefineVo vo=new TaskDefineVo();
		
		try {
			
			vo.setTaskId(rs.getInt("taskId"));
			vo.setStuNum(rs.getString("stuNum"));
			vo.setSubmitTime(rs.getString("submitTime"));
			
			vo.setXmlStr(rs.getString("xmlStr"));
			
			//vo.setTaskState(rs.getString("taskState"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
