<template>
  <div class="home">
    <div class="w-3/4">
      <canvas
        ref="game"
        width="640"
        height="240"
        class="border w-full border-black"
        @keyup.up="position.y += 5"
      ></canvas>
      <div class="flex gap-2 justify-between my-2">
        <button
          class="bg-green-400 hover:bg-green-600 w-full"
          @click="move('left')"
        >
          Left
        </button>
        <div class="w-full gap-2 flex flex-col">
          <button class="bg-green-400 w-full p-3" @click="move('up')">
            Up
          </button>
          <button
            class="bg-green-400 w-full p-3"
            @click="move('down')"
            @keyup.down="move()"
          >
            Down
          </button>
        </div>

        <button
          class="bg-green-400 w-full p-2"
          @click="move('right')"
          @keyup.right="move()"
        >
          Right
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import io from "socket.io-client";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0,
      },
    };
  },
  created() {
    this.socket = io("http://localhost:8000", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
  },
  mounted() {
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", (result) => {
      this.position = result;
      this.context.clearRect(
        0,
        0,
        this.$refs.game.width,
        this.$refs.game.height
      );
      this.context.fillRect(this.position.x, this.position.y, 50, 20);
    });
  },
  methods: {
    move(direction) {
      this.socket.emit("move", direction);
    },
    moveUp() {
      this.position.y += 5;
    },
  },
};
</script>
