type HandlerFunction = (element: any) => any;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 *
 * Process in parallel async functions for each element of an array.
 *
 * @param {any[]} elements An array of elements to be processed
 * @param {HandlerFunction} handler The async function to be executed in parallel for each element of the array. It accept as a parameter the single element
 * @returns
 */
const parallelAsync = async (elements: any[], handler: HandlerFunction) => {
  return await Promise.all(elements.map((element) => handler(element)));
};

/**
 *
 * Process sequentially async functions for each element of an array and wait a given time (if passed) between each call.
 *
 * @param elements An array of elements to be processed
 * @param handler The async function to be executed in parallel for each element of the array. It accept as a parameter the single element
 * @param sleepMs Optional parameter that defines the sleep time between each call to handler
 * @returns
 */
const sequentialAsync = async (
  elements: any[],
  handler: HandlerFunction,
  sleepMs?: number
) => {
  return elements.reduce(async (memo, element) => {
    const res = await memo;

    if (sleepMs) {
      await sleep(sleepMs);
    }

    return [...res, await handler(element)];
  }, []);
};

export { parallelAsync, sequentialAsync };
