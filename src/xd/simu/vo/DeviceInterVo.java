package xd.simu.vo;

public class DeviceInterVo {
	String deviceID;
	int interfaceID;
	String coords;
	String remark;
	String interName;
	
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getDeviceID() {
		return deviceID;
	}
	public void setDeviceID(String deviceID) {
		this.deviceID = deviceID;
	}
	public int getInterfaceID() {
		return interfaceID;
	}
	public void setInterfaceID(int interfaceID) {
		this.interfaceID = interfaceID;
	}
	public String getCoords() {
		return coords;
	}
	public void setCoords(String coords) {
		this.coords = coords;
	}
	public String getInterName() {
		return interName;
	}
	public void setInterName(String interName) {
		this.interName = interName;
	}
}
