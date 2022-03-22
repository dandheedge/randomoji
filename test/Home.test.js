import { mount } from "@vue/test-utils";
import Home from "../src/components/Home.vue";

function generateEmoji() {
  return fetch("https://emojihub.herokuapp.com/api/random").then((r) =>
    r.json()
  );
}
test("mounts a component", () => {
  expect(Home).toBeTruthy();
});
test("fetch from emoji api", async () => {
  await expect(generateEmoji()).resolves.toHaveProperty("name");
});
