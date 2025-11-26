/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { StandardRPCJsonSerializer } from "@orpc/client/standard";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";

const serializer = new StandardRPCJsonSerializer({
  customJsonSerializers: [
    // put custom serializers here
  ],
});

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn(queryKey) {
          const [json, meta] = serializer.serialize(queryKey);
          return JSON.stringify({ json, meta });
        },
        staleTime: 60 * 1000, // > 0 to prevent immediate refetching on mount
      },

      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        serializeData(data) {
          const [json, meta] = serializer.serialize(data);
          return { json, meta };
        },
      },

      hydrate: {
        deserializeData(data) {
          return serializer.deserialize(data.json, data.meta);
        },
      },
    },
  });
