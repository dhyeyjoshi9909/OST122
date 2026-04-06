from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

driver.get("https://the-internet.herokuapp.com/login")
driver.maximize_window()

wait = WebDriverWait(driver, 10)

username = wait.until(
    EC.presence_of_element_located((By.ID, "username"))
)
username.send_keys("tomsmith")

driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")

driver.find_element(By.CSS_SELECTOR, "button.radius").click()

message = wait.until(
    EC.presence_of_element_located((By.ID, "flash"))
)
print("Login Message:", message.text)

driver.find_element(By.CSS_SELECTOR, "a.button.secondary.radius").click()

time.sleep(3)
driver.quit()