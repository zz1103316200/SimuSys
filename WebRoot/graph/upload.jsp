<%@ page language="java" contentType="text/html; charset=gb2312" %>
<%@ page import="com.jspsmart.upload.SmartUpload"%>

<%
	//�½�һ��SmartUpload����
	SmartUpload su = new SmartUpload();

	//�ϴ���ʼ��
	su.initialize(pageContext);

	// �趨�ϴ�����
	//1.����ÿ���ϴ��ļ�����󳤶ȡ�
	su.setMaxFileSize(10000000);

	//2.�������ϴ����ݵĳ��ȡ�
	su.setTotalMaxFileSize(20000000);

	//3.�趨�����ϴ����ļ���ͨ����չ�����ƣ�,������doc,txt�ļ���
	su.setAllowedFilesList("doc,txt,jpg,rar,mid,waw,mp3,gif,java");
	
	boolean sign = true;
	
	//4.�趨��ֹ�ϴ����ļ���ͨ����չ�����ƣ�,��ֹ�ϴ�����exe,bat,jsp,htm,html��չ�����ļ���û����չ�����ļ���
	try {
		su.setDeniedFilesList("exe,bat,jsp,htm,html");

		//�ϴ��ļ�
		su.upload();
		//���ϴ��ļ����浽ָ��Ŀ¼
		su.save("c:\\upload");

	} catch (Exception e) {
		e.printStackTrace();
		sign = false;
	}
	if(sign==true)
	{
		out.println("hello");
	}else
	{
		out.println("word");
	}
%>
