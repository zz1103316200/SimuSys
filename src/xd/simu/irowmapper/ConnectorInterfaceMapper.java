package xd.simu.irowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import xd.simu.vo.ClassTableVo;
import xd.simu.vo.ConnectorInterfaceVo;

public class ConnectorInterfaceMapper implements IrowMapper{
	@Override
	public Object mapper(ResultSet rs) {
		ConnectorInterfaceVo vo=new ConnectorInterfaceVo();
		
		try {

			vo.setConnectorType(rs.getString("connectorType"));
			vo.setInterfaceStyle(rs.getString("interfaceStyle"));
			return vo;
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return vo;
	}
}
