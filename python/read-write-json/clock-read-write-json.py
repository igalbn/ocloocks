# Ocloocks - Python - Terminal - Read and Write JSON
import time
import json

# Read JSON
with open('colors.json', 'r') as f:
    data = json.load(f)   
if (data['clock_color'] == 'blue'):
    print('\033[34mOcloocks - Clock\033[0m')
else:
    print('Ocloocks - Clock')

# Write JSON
save_data = {
    "time": time.strftime("%H:%M:%S", time.localtime())
}    
with open('save_time.json', 'w') as f:
    json.dump(save_data, f, indent=4)   

# Display clock 
while True:
    current_time = time.strftime("%H:%M:%S", time.localtime())
    print(current_time, end="\r", flush=True)
    time.sleep(0.5)
