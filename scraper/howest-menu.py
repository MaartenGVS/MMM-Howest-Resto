import argparse
import json
import re
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import atexit

days = {
    'nl': ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag'],
    'en': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
}

supported_restaurants = ['GKG', 'PENTA', 'RSS', 'RSS1', 'SIC', 'SJS', 'TS']


def split_items(items):
    separator_indices = [index for index, item in enumerate(items) if re.fullmatch(r'\*+', item)]

    if len(separator_indices) == 1:
        split_index = separator_indices[0]
        items_nl = items[:split_index]
        items_en = items[split_index + 1:]
    elif len(separator_indices) > 1:
        items_nl = items[:separator_indices[0]]
        items_en = items[separator_indices[-1] + 1:]
    else:
        items_nl, items_en = [], []

    return items_nl, items_en


class SeleniumDriver:
    def __init__(self):
        try:
            options = webdriver.ChromeOptions()
            options.add_argument("--headless")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            self.driver = webdriver.Chrome(options=options)
            atexit.register(self.close)
        except Exception as e:
            print(f"Error initializing Selenium driver: {e}")
            raise

    def fetch_menu(self, resto: str, language: str):
        if resto not in supported_restaurants:
            raise ValueError(f"Unsupported restaurant code: {resto}")

        self.driver.get('https://resto.howest.be/MenuWeekly.aspx')
        select = Select(self.driver.find_element(By.ID, 'ddlChooseCampus'))
        select.select_by_value(resto)

        menu_data = {}
        dag_elements = self.driver.find_elements(By.CLASS_NAME, 'divWeekdag')

        for index, dag_element in enumerate(dag_elements):
            dag_name = days[language][index]
            date = dag_element.find_element(By.CLASS_NAME, 'spanDag').text
            items = [li.text for li in dag_element.find_elements(By.TAG_NAME, 'li') if li.text.strip()]

            # Split items into NL and EN
            items_nl, items_en = split_items(items)
            menu_data[dag_name] = {
                'date': date,
                'items': items_nl if language == "nl" else items_en
            }

        return json.dumps(menu_data, indent=4)

    def close(self):
        try:
            self.driver.quit()
        except Exception as e:
            print(f"Error closing Selenium driver: {e}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch the weekly menu for a specified restaurant and language.")
    parser.add_argument("--resto", type=str, required=True, help="The restaurant code (e.g., GKG, PENTA)")
    parser.add_argument("--language", type=str, choices=['nl', 'en'], required=True, help="The language code (nl or en)")

    args = parser.parse_args()
    selenium_driver = SeleniumDriver()

    try:
        menu = selenium_driver.fetch_menu(args.resto, args.language)
        print(menu)
    except Exception as e:
        print(f"Error fetching menu: {e}")
    finally:
        selenium_driver.close()
