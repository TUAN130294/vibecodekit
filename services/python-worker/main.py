import os
import time
import requests
import pandas as pd


def heartbeat():
    api_host = os.environ.get("API_HOST", "http://api-server:3000")
    try:
        res = requests.get(f"{api_host}/api/health", timeout=5)
        return res.status_code
    except Exception:
        return None


def run():
    while True:
        status = heartbeat()
        print({"level": "info", "msg": "python-worker heartbeat", "api_status": status})
        time.sleep(30)


if __name__ == "__main__":
    run()

