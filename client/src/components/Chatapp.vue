<template>
  <div class="relative h-screen">
    <div
      v-if="!joined"
      class="absolute inset-80 flex justify-center gap-2 items-center"
    >
      <input
        type="text"
        required
        class="outline-none py-1 text-center font-black text-green-400 border-yellow-400 border-b-2 w-96"
        @keyup.enter="join"
        v-model="user"
      />
      <button
        @click="join"
        class="bg-green-400 p-2 rounded-md shadow animate-bounce"
      >
        Join
      </button>
    </div>
    <div v-if="joined">
      <div v-for="message in messages" :key="message.id">
        <small class="block text-center">{{
          new Date().toDateString(message.id).slice(4, 10)
        }}</small>
        <p class="text-left bg-blue-800 bg-opacity-10 px-1 min-w-max">
          <b>{{ message.user }}: </b>{{ message.text }}
          <span class="ml-4 text-sm font-medium text-green-400">{{
            new Date().toLocaleString(message.id).slice(12)
          }}</span>
        </p>
      </div>
      <div class="">
        <input
          type="text"
          class="bottom-0 p-1 outline-none font-mono text-lg absolute left-0 w-full border-2 border-indigo-700"
          @keyup.enter="sendMessage"
          v-model="textmessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      user: "",
      joined: false,
      textmessage: "",
      messages: [],
    };
  },
  methods: {
    join() {
      console.log(this.user);
      if (this.user != "") {
        this.joined = true;
        this.socketInstance = io("http://localhost:8000", {
          withCredentials: true,
          extraHeaders: {
            "my-custom-header": "abcd",
          },
        });
        this.socketInstance.on("recieved", (data) => {
          this.messages = this.messages.concat(data);
        });
      } else {
        alert("Write your name....");
      }
    },
    sendMessage() {
      console.log(this.textmessage);
      this.addMessage();
      this.textmessage = "";
    },
    addMessage() {
      const message = {
        id: new Date().getTime(),
        text: this.textmessage,
        user: this.user,
      };
      console.log(message);
      this.messages = this.messages.concat(message);

      this.socketInstance.emit("message", message);
    },
  },
};
</script>
