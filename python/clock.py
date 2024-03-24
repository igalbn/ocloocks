# Ocloocks - Python - Terminal
import time

while True:
    current_time = time.strftime("%H:%M:%S", time.localtime())
    print(current_time, end="\r", flush=True)
    time.sleep(0.5)
