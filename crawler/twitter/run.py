import sys
import os
from scrapy.utils.project import get_project_settings
from scrapy.crawler import CrawlerProcess
from twitter.spiders.twitters import TwittersSpider
def run():
	keyword = sys.argv[1]
	print("jishujian")
	print(keyword)
	os.chdir("C:/Users/lenovo/Downloads/twitter/twitter/spiders")
	project_settings = get_project_settings()
	settings = dict(project_settings.copy())
	process = CrawlerProcess(settings)
	process.crawl('twitters', **{'keyword': keyword})
	process.start()
if __name__ =='__main__':
	run()
