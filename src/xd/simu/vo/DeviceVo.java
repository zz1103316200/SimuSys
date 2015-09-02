package xd.simu.vo;

public class DeviceVo {
	String deviceName;
	String deviceID;
	String practoryName;
	String deviceStyle;
	String description;
	String deviceUrl;
	String realUrl;
	public String getDeviceUrl() {
		return deviceUrl;
	}
	public void setDeviceUrl(String deviceUrl) {
		this.deviceUrl = deviceUrl;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	
	public String getPractoryName() {
		return practoryName;
	}
	public void setPractoryName(String practoryName) {
		this.practoryName = practoryName;
	}
	public String getDeviceStyle() {
		return deviceStyle;
	}
	public void setDeviceStyle(String deviceStyle) {
		this.deviceStyle = deviceStyle;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDeviceID() {
		return deviceID;
	}
	public void setDeviceID(String deviceID) {
		this.deviceID = deviceID;
	}
	public String getRealUrl() {
		return realUrl;
	}
	public void setRealUrl(String realUrl) {
		this.realUrl = realUrl;
	}
}
