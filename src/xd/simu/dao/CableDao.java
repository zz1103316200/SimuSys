package xd.simu.dao;

import java.util.List;

import xd.simu.db.DbManager;
import xd.simu.irowmapper.AdminMapper;
import xd.simu.irowmapper.CableMapper;
import xd.simu.irowmapper.DeviceMapper;
import xd.simu.vo.Cable_connectorVo;

public class CableDao implements IDAO {
	public boolean delete(Object[] obj) {
		String sql = "delete from cable where cableID=?";
		DbManager db = new DbManager();
		Boolean deleteResult = false;
		Cable_ConnectorDao cable_connector = new Cable_ConnectorDao();

		try {
			db.beginTrans();
			// "update device set deviceName=?,practoryName=?,deviceStyle=?,description=? where deviceID=?";
			deleteResult = db.execute(sql, obj);
			// sql="delete  from deviceInter where deviceID=?";
			cable_connector.delete(obj);

			// String
			// slotSql="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
			/*
			 * if(!deviceslot.delete(obj)) { System.out.println("删除错误回滚！！！");
			 * deleteResult=false;
			 * 
			 * }
			 */
			db.commit();
			deleteResult = true;
		} catch (Exception e) {
			db.rollback();

			System.out.println("删除错误回滚！！！");
			deleteResult = false;
		}
		return deleteResult;
	}

	public boolean update(Object[] obj) {
		String sql = "update cable set cableName=?,remark=? where cableID=?";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();

		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj) {
		String sql = "insert into cable"
				+ "(courseName,cableID,cableStyle,connectors,remark)"
				+ "values" + "(?,?,?,?,?)";

		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();

		return db.execute(sql, obj);
	}

	public boolean add(Object[] obj, List<Cable_connectorVo> aConnectorList,
			List<Cable_connectorVo> bConnectorList) {
		boolean addResult = false;

		// String
		// sql1="insert into device_slot(deviceID,slotID,num,remark) values(?,?,?,?)";
		// String
		// sql2="insert into device_inter(deviceID,interfaceID,num,remark) values(?,?,?,?)";

		// String sql3 =
		// "insert into slot(slotName,slotID,remark)values(?,?,?)";
		// String sql4 =
		// "insert into interface(interfaceName,interfaceID,interfaceStyle,parameters,remark) values(?,?,?,?,?)";
		// ('username','password','path','name','organization','370781','2012-12-12',15,'��','java','13890000000','����','����','����','�����ѵĵط�','1');"
		DbManager db = new DbManager();
		//DbManager db1 = new DbManager();
		try {
			String cableSql = "insert into cable"
					+ "(cableName,cablestyle,connectors,cableUrl,remark,type) "
					+ "values" + "(?,?,?,?,?,?)";
			
			//addResult = db1.execute(deviceSql, obj);
			db.beginTrans();

			// Object []obj={lineName,linestyle,"",boardUr,linedes,""};
			// db.execute(cableSql, obj,count);
			String conSql = "insert into cable_connector(cableID,inter_side,connectorType,num,interfaceStyle,remark) values(?,?,?,?,?,?)";
			int id = db.executeAndNewID(cableSql, obj);
			System.out.println("最大ID：" + id);
			for (int i = 0; i < aConnectorList.size(); i++) {
				// System.out.print("fixList->"+interArray[i]);
				// //String[] interParameters=interArray[i].split("\\$");
				// Object[]
				// interObj={obj[1],interParameters[0],Integer.parseInt(interParameters[1]),""};
				// System.out.println("->"+interParameters[0]+":"+interParameters[1]);
				System.out.println("最大ID1：" + id);
				addResult = db.execute(conSql, new Object[] { id,
						aConnectorList.get(i).getInter_side(),
						aConnectorList.get(i).getConnectorType(),
						aConnectorList.get(i).getNum(), "", "" });
			}
			// String
			// slotSql="insert into device_slot(deviceID,slotID,coords,slotName,remark) values(?,?,?,?,?)";
			for (int i = 0; i < bConnectorList.size(); i++) {

				// String[] slotParameters=slotArray[i].split("\\$");
				// System.out.println("->"+slotParameters[0]+":"+slotParameters[1]);
				// Object[]
				// slotObj={obj[1],slotParameters[0],Integer.parseInt(slotParameters[1]),""};
				System.out.println("最大ID2：" + id);
				addResult = db.execute(conSql, new Object[] { id,
						bConnectorList.get(i).getInter_side(),
						bConnectorList.get(i).getConnectorType(),
						bConnectorList.get(i).getNum(), "", "" });

			}
			db.commit();
			// addResult=true;
		} catch (Exception e) {
			addResult = false;
			db.rollback();

			System.out.println("添加失败回滚！！！");

		}
		return addResult;
	}

	public List select(Object[] obj) {
		// TODO Auto-generated method stub
		String sql = "select cableName,cableID,cableStyle,connectors,remark,cableUrl,type from cable limit ?,?";
		CableMapper cableMap = new CableMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj, cableMap);
	}

	public List selectByCableName(Object[] obj) {
		// TODO Auto-generated method stub
		String sql = "select cableName,cableID,cableStyle,connectors,remark,cableUrl,type "
				+ "from cable " + "where cableName=? limit ?,?";
		CableMapper cableMap = new CableMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj, cableMap);
	}

	public List selectByCableStyle(Object[] obj) {
		// TODO Auto-generated method stub
		String sql = "select cableName,cableID,cableStyle,connectors,remark,cableUrl,type "
				+ "from cable " + "where cableStyle=? limit ?,?";
		CableMapper cableMap = new CableMapper();
		DbManager db = new DbManager();
		return db.select(sql, obj, cableMap);
	}

	public Object selectById(String id) {
		String sql = "select * from cable where cableID='" + id + "'";
		// TODO Auto-generated method stub

		DbManager db = new DbManager();

		Object obj[] = new Object[] {};

		return db.selectById(sql, obj, new CableMapper());
	}

	public List select(String sql, Object[] obj) {
		// TODO Auto-generated method stub
		return null;
	}

	public List selectAll() {
		String sql = "select * from cable";
		DbManager db = new DbManager();
		return db.select(sql, null, new CableMapper());

	}

	public int getMaxId() {
		String sql = "SELECT max(cableID) from cable";
		DbManager db = new DbManager();

		return db.executeCount(sql, null);
	}

	public int selectCount(Object[] obj) {
		String sql = "select count(*) from cable limit ?,?";
		DbManager db = new DbManager();

		return db.executeCount(sql, obj);
	}

	public int selectCountByCableName(Object[] obj) {
		String sql = "select count(*) from cable where cableName=? limit ?,?";
		DbManager db = new DbManager();

		return db.executeCount(sql, obj);
	}

	public int selectCountByCableStyle(Object[] obj) {
		String sql = "select count(*) from cable where cableStyle=? limit ?,?";
		DbManager db = new DbManager();

		return db.executeCount(sql, obj);
	}
}
