package xd.simu.vo;

public class CableVo {
	String cableName;
	int cableID;
	String cableStyle;
	String connectors;
	String remark;
	String cableUrl;
	String type;
	public String getCableUrl() {
		return cableUrl;
	}
	public void setCableUrl(String cableUrl) {
		this.cableUrl = cableUrl;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public String getCableName() {
		return cableName;
	}
	public void setCableName(String cableName) {
		this.cableName = cableName;
	}
	public int getCableID() {
		return cableID;
	}
	public void setCableID(int cableID) {
		this.cableID = cableID;
	}
	public String getCableStyle() {
		return cableStyle;
	}
	public void setCableStyle(String cableStyle) {
		this.cableStyle = cableStyle;
	}
	public String getConnectors() {
		return connectors;
	}
	public void setConnectors(String connectors) {
		this.connectors = connectors;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
