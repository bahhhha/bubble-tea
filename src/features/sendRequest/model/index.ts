import { createEvent, sample } from "effector";
import { fetchSendRequest } from "./query";

export interface SubmitData {
  name: string;
  phoneNumber: string;
  message: string;
}

const submitted = createEvent<SubmitData>();

sample({
  source: submitted,
  target: fetchSendRequest.start,
});

export { submitted };
