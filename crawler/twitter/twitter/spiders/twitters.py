# -*- coding: utf-8 -*-
import scrapy,re
from twitter.items import TwitterItem
from bs4 import BeautifulSoup
class TwittersSpider(scrapy.Spider):
    name = 'twitters'
    allowed_domains = ['twitter.com']
    def __init__(self,keyword):
        self.keyword = keyword

    def start_requests(self):
        meta_proxy = 'https://127.0.0.1:1080'
        url = 'https://twitter.com/douquan2'
        meta={'proxy': meta_proxy}
        yield scrapy.Request(url = url,callback=self.parse,meta=meta)

    def parse(self, response):
        item = TwitterItem()
        res = BeautifulSoup(response.body, "lxml")
        contents = res.find_all('p',class_="TweetTextSize")           
        for content in contents:
            s = content.get_text()
            print(self.keyword)
            print(s)
            sun = self.keyword.split(",")
            print(sun)
            for key in sun:
                print(key)
                if re.search(key,s) != None:
                    item['content'] = s
                    yield item
