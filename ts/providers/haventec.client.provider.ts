import { HaventecAuthenticateClient } from "../api/haventec.client";

export function HaventecAuthenticateClientFactory() {
  return new HaventecAuthenticateClient();
};

export let HaventecAuthenticateClientProvider = { provide: HaventecAuthenticateClient,
  useFactory: HaventecAuthenticateClientFactory,
  deps: []
};
