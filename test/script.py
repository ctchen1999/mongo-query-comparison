import requests
import time
import argparse

def send_request(authId, iteration, type, output_file):
    response_times = []
    headers = {
        'Cache-Control': 'no-cache',
    }
    for i in range(iteration):
        start_time = time.time()
        requests.get(f'http://localhost:8080/user/{type}/{authId}', headers=headers)
        end_time = time.time()
        response_times.append(end_time - start_time)
    mean_response_time = sum(response_times) / len(response_times)

    with open(output_file, 'a') as f:
        for time_taken in response_times:
            f.write(str(time_taken) + '\n')
        f.write(str(mean_response_time) + '\n')
    
    print(f"----iteration {iteration} | type {type}----")
    return mean_response_time


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Send requests to a specified endpoint and measure response times.')
    parser.add_argument('authId', type=str, help='The authentication ID to include in the request URL.')
    parser.add_argument('percent', type=str, help='The percentage of the data to query in the request')
    args = parser.parse_args()
    authId = args.authId

    mean_time = send_request(authId, 200, 'normal', f'response_times_normal_{args.percent}.txt')
    print(f"{mean_time * 1000:.4f} ms")
    mean_time = send_request(authId, 200, 'populate', f'response_times_populate_{args.percent}.txt')
    print(f"{mean_time * 1000:.4f} ms")
    mean_time = send_request(authId, 200, 'lookup', f'response_times_lookup_{args.percent}.txt')
    print(f"{mean_time * 1000:.4f} ms")