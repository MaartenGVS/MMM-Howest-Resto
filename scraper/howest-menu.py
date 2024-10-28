import argparse
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By


days = {
    'nl': ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
    'en': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
}

supported_restaurants = ['GKG', 'PENTA', 'RSS', 'RSS1', 'SIC', 'SJS', 'TS']

class SeleniumDriver:
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-dev-shm-usage")
        self.driver = webdriver.Chrome(options=options)

    def fetch_menu(self, resto: str, language: str):
        self.driver.get('https://resto.howest.be/MenuWeekly.aspx')

        select = Select(self.driver.find_element(By.ID, 'ddlChooseCampus'))
        select.select_by_value(resto)

        menu_data = {}
        dag_elements = self.driver.find_elements(By.CLASS_NAME, 'divWeekdag')

        for index, dag_element in enumerate(dag_elements):
            dag_name = days[language][index]
            date = dag_element.find_element(By.CLASS_NAME, 'spanDag').text
            items = [li.text for li in dag_element.find_elements(By.TAG_NAME, 'li') if li.text.strip()]

            if '***' in items:
                items_nl, items_en = items[:items.index('***')], items[items.index('***') + 1:]
            else:
                items_nl, items_en = [], []

            menu_data[dag_name] = {
                'date': date,
                'items': items_nl if language == "nl" else items_en
            }

        return menu_data

    def close(self):
        self.driver.quit()

parser = argparse.ArgumentParser(description="Fetch the weekly menu for a specified restaurant and language.")
parser.add_argument("--resto", type=str, required=True, help="The restaurant code (e.g., GKG, PENTA)")
parser.add_argument("--language", type=str, choices=['nl', 'en'], required=True, help="The language code (nl or en)")

args = parser.parse_args()

selenium_driver = SeleniumDriver()

try:
    menu = selenium_driver.fetch_menu("RSS1", "nl")
    print(menu)

finally:
    selenium_driver.close()