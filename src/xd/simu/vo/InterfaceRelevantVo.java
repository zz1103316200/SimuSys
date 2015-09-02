package xd.simu.vo;

public class InterfaceRelevantVo {
	String interfaceName;
	
	String interfaceID;
	String interfaceStyle;
	String parameters;
	String remark;
	int interfaceNum;
	public int getInterfaceNum() {
		return interfaceNum;
	}

	public void setInterfaceNum(int interfaceNum) {
		this.interfaceNum = interfaceNum;
	}

	@Override
	public String toString() {
		return "InterfaceRelevantVo [interfaceName=" + interfaceName
				+ ", interfaceID=" + interfaceID + ", interfaceStyle="
				+ interfaceStyle + ", parameters=" + parameters + ", remark="
				+ remark + "]";
	}
	
	public String getInterfaceName() {
		return interfaceName;
	}
	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}
	public String getInterfaceID() {
		return interfaceID;
	}
	public void setInterfaceID(String interfaceID) {
		this.interfaceID = interfaceID;
	}
	public String getInterfaceStyle() {
		return interfaceStyle;
	}
	public void setInterfaceStyle(String interfaceStyle) {
		this.interfaceStyle = interfaceStyle;
	}
	public String getParameters() {
		return parameters;
	}
	public void setParameters(String parameters) {
		this.parameters = parameters;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
