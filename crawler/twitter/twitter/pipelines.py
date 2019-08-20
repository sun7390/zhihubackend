# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pymongo,time
from .message import Message
class TwitterPipeline(object):
	def __init__(self,mongo_uri,mongo_db,sheetname):
		self.mongo_uri = mongo_uri
		self.mongo_db = mongo_db
		self.sheetname = sheetname
	@classmethod
	def from_crawler(cls,crawler):
		return cls(
			mongo_uri = crawler.settings.get("MONGO_URI"),
			mongo_db = crawler.settings.get("MONGODB_DBNAME"),
			sheetname = crawler.settings.get("MONGODB_SHEETNAME")
			)
	def open_spider(self,spider):
		self.client = pymongo.MongoClient(self.mongo_uri)
		self.db = self.client[self.mongo_db]
	def close_spider(self,spider):
		self.client.close()
	def process_item(self,item,spider):
		print(item['content'])
		result = self.db[self.sheetname].find_one({'content':item['content']})
		if(result == None):
			print("not saved")
			self.db[self.sheetname].insert(dict(item))
			s = Message('SCU55025Ta2e7f374d7fcce8852ebf37c46d471aa5d255873cd74a','特朗普',item['content'])
			s.send_message()
			time.sleep(15)
			return item
