<script>
import { ref, onMounted } from "vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import SlideUpDown from "vue3-slide-up-down";

export default {
  name: "Home",
  components: {
    SlideUpDown,
  },
  async setup() {
    const emoji = ref(null);
    const slideActive = ref(true);
    const toast = (text) => {
      createToast(text, {
        position: "top-center",
        type: "default",
        transition: "zoom",
      });
    };
    async function generateEmoji() {
      const response = await fetch("https://emojihub.herokuapp.com/api/random");
      emoji.value = await response.json();
    }
    async function copyEmoji() {
      try {
        let emoji = document.getElementById("emoji");
        await navigator.clipboard.writeText(emoji.innerText);
        toast(`${emoji.innerText} has been copied!`);
      } catch ($e) {
        toast(`${e}`);
      }
    }
    onMounted(async () => {
      const response = await fetch("https://emojihub.herokuapp.com/api/random");
      emoji.value = await response.json();
    });
    return { emoji, generateEmoji, copyEmoji, toast, slideActive };
  },
};
</script>
<template>
  <div class="flex flex-col mx-auto max-w-screen-md items-center py-8">
    <h1 class="text-center text-amber-500">
      Randomoji - Random Emoji Copypasta
    </h1>
    <transition class="transition duration-500 ease-in-out">
      <div class="relative w-64 mx-auto card__wrapper my-8" v-if="emoji">
        <div
          class="
            absolute
            bg-yellow-400
            w-full
            h-full
            -right-5
            -bottom-5
            rounded-xl
          "
        ></div>
        <!--   yellow background -->
        <div class="relative bg-gray-800 text-gray-50 rounded-xl p-8 space-y-7">
          <div class="h-2 w-20 bg-yellow-400">
            <!--   yellow  line -->
          </div>
          <!--  percentage  -->
          <div class="flex flex-row gap-2 justify-between items-end">
            <div
              id="emoji"
              class="text-6xl font-extrabold text-white"
              v-html="emoji.htmlCode"
            ></div>
            <span @click.prevent="copyEmoji()" class="text-md cursor-pointer">
              <div class="i-ri-file-copy-line"></div>
              Copy
            </span>
          </div>
          <!--   description -->
          <p class="leading-snug text-gray-400">
            {{ emoji.name }}
          </p>
          <a
            @click="slideActive = !slideActive"
            href="#"
            class="block text-yellow-400 font-bold tracking-wide flex"
            >Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              /></svg
          ></a>
          <slide-up-down v-model="slideActive" :duration="1000">
            <div class="flex flex-col">
              <p class="text-sm">Group : {{ emoji.group }}</p>
              <p class="text-sm">Category: {{ emoji.category }}</p>
            </div>
          </slide-up-down>
        </div>
      </div>
    </transition>
    <button
      class="
        my-4
        cursor-pointer
        relative
        inline-flex
        items-center
        justify-center
        p-0.5
        mb-2
        mr-2
        overflow-hidden
        text-sm
        font-medium
        text-gray-900
        rounded-lg
        group
        bg-gradient-to-br
        from-red-200
        via-red-300
        to-yellow-200
        group-hover:from-red-200
        group-hover:via-red-300
        group-hover:to-yellow-200
        dark:text-white dark:hover:text-gray-900
        focus:ring-4 focus:outline-none focus:ring-red-100
        dark:focus:ring-red-400
      "
      @click.prevent="generateEmoji()"
    >
      <span
        class="
          relative
          px-5
          py-2.5
          transition-all
          ease-in
          duration-75
          bg-white
          dark:bg-gray-900
          rounded-md
          group-hover:bg-opacity-0
        "
      >
        Click to generate random emoji!
      </span>
    </button>
  </div>
</template>



