import requests
import time

NODE_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"

def get_block_number():
    response = requests.post(NODE_URL, json={"jsonrpc": "2.0", "method": "eth_blockNumber", "id": 1})
    return int(response.json()["result"], 16)

def monitor_blockchain():
    previous_block = get_block_number()
    while True:
        time.sleep(10)
        latest_block = get_block_number()
        if latest_block == previous_block:
            print("⚠️ Possible Fork Detected!")
        previous_block = latest_block

if __name__ == "__main__":
    monitor_blockchain()
