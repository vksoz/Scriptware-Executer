export async function retry<T>(callback: () => T, retryTimes: number = 5, retryDelay: number = 0): Promise<T> {
	let result: T = undefined as T;
	let retryCount = 0;
	while (!result) {
		const [sucess, reponse] = pcall(callback);
		if (!sucess) {
			if (!(retryDelay === 0)) task.wait(retryDelay);
			retryCount += 1;
		} else result = reponse;
		if (retryCount === retryTimes) {
			warn(`retrier failed to retry in ${retryCount} times of retrying. `);
		}
	}
	return result as T;
}
