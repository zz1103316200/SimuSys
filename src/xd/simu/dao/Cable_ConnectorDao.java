package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.CableMapper;
import xd.simu.irowmapper.Cable_connectorMapper;

public class Cable_ConnectorDao implements IDAO {

	@Override
	public boolean delete(Object[] obj) {
		String sql="delete from cable_connector where cableId=?";
		DbManager db = new DbManager();
		return db.execute(sql, obj);
	}

	@Override
	public boolean update(Object[] obj) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean add(Object[] obj) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select * from cable_connector limit ?,?";
		Cable_connectorMapper cableMap=new Cable_connectorMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,cableMap);
	}
	
	public List selectByCableID(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select cableID,inter_side,connectorType,num,interfaceStyle,remark " +
				"from cable_connector" +
				" where cableID=?";
		Cable_connectorMapper cableMap=new Cable_connectorMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,cableMap);
	}
	public List selectByCableIDAndSide(Object[] obj) {
		// TODO Auto-generated method stub
		String sql="select * " +
				"from cable_connector" +
				" where cableID=? and inter_side=?";
		Cable_connectorMapper cableMap=new Cable_connectorMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj,cableMap);
	}

	@Override
	public Object selectById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int selectCount(Object[] obj) {
		// TODO Auto-generated method stub
		return 0;
	}

}
