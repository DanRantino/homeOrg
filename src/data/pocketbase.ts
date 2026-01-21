// app/lib/pocketbase.ts
import PocketBase from "pocketbase";

export const pb = new PocketBase("http://127.0.0.1:8090/");

// Evita cancelamentos estranhos com SSR
pb.autoCancellation(false);
