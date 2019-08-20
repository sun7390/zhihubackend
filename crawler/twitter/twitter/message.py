import requests
class Message:
	def __init__(self,SCKEY,text,desp):
		self.SCKEY = SCKEY
		self.text = text
		self.desp = desp
	def send_message(self):
		url = 'https://sc.ftqq.com/' + self.SCKEY + '.send'
		data = {'text': self.text,'desp':self.desp}
		res = requests.post(url,data)
		print(res)
	def __del__(self):
		class_name = self.__class__.__name__
		print(class_name,'destroy')