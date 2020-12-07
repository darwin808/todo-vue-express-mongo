<template>
  <div class="container">
    <h1>Todo app</h1>
    <div class="user-input">
      <input v-model="fname" type="text" placeholder="first name" />
      <input v-model="lname" type="text" placeholder="last name" />
      <input v-model="crush" type="text" placeholder="crush" />
      <button @click="sendinput">Send</button>
    </div>
    <!-- modal-->
    <div class="modal" v-if="modalstate">
      {{ this.idfrommodal }}
      <input v-model="fname" type="text" placeholder="first name" />
      <input v-model="lname" type="text" placeholder="last name" />
      <input v-model="crush" type="text" placeholder="crush" />
      {{ this.fname }}
      <button @click="closemodalupdate">Update</button>
    </div>

    <!-- modal-->
    <div class="msg-body">
      <ul class="msgs" :key="i" v-for="(x, i) in collect">
        <li>
          First Name: {{ x.fname }} <button @click="del(x._id)">del</button>
          <button @click="openmodal(x._id)">update</button>
          <br />
          Last Name: {{ x.lname }}<br />
          Crush: {{ x.crush }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import * as io from "socket.io-client";
//import Pusher from "pusher";
import Request from "axios-request-handler";
const reviews = new Request("/api/darwin");
const axios = require("axios");
export default {
  name: "Todoapp",
  data() {
    return {
      modalstate: false,
      fname: "",
      lname: "",
      crush: "",
      collect: [],
      idfrommodal: "",
    };
  },
  methods: {
    sendinput() {
      axios
        .post("/api/darwin", {
          lname: this.lname,
          fname: this.fname,
          crush: this.crush,
        })
        .then((response) => {
          console.log(response);
          this.lname = "";
          this.fname = "";
          this.crush = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    del(id) {
      //console.log(id);
      axios.delete("/api/darwin/" + id).then((e) => {
        console.log("DELETE:" + id);
        console.log(e);
      });
    },

    openmodal(e) {
      this.modalstate = true;
      this.idfrommodal = e;
    },
    closemodalupdate() {
      axios
        .put("/api/darwin/" + this.idfrommodal, {
          lname: this.lname,
          fname: this.fname,
          crush: this.crush,
        })
        .then((e) => {
          console.log(e);
          this.modalstate = false;
        });
    },

    /* async sendinput() {
      try {
        let res = await axios.post("http://localhost:3001/api/darwin", {
          lname: this.lname,
          fname: this.fname,
          crush: this.crush,
        });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },*/
  },
  created() {
    axios.get("/api/darwin").then((darwinDB) => {
      console.log(darwinDB);

      reviews.poll(100).get((response) => {
        //console.log(response.data);
        //console.log(darwinDB.data);
        this.collect = response.data;

        // you can cancel polling by returning false
      });
    });

    /**
    this.pusher = new Pusher("343fb1b9d4957c1a8e16", {
      cluster: "api",
      encrypted: true,
    });
     */
    //this.socket.on("ADDED_DATA", (data) => {
    // console.log(data);
    // manipulate data
    // push to current list
    // or whatever you want
    // });
    /** 
    axios.get("http://localhost:3001/api/darwin").then((darwinDB) => {
      console.log(darwinDB);
      //console.log(darwinDB.data);
      this.collect = darwinDB.data;
    });


    */
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 5rem 2rem;
  height: 15rem;
  width: 30rem;
  background: blueviolet;
  z-index: 99;
}
.container {
  padding: 1rem 2rem;
  text-align: center;
  position: absolute;
  left: 10rem;
  height: auto;
  witdh: 50vh;
  background-color: red;
  margin: auto;
}

ul li {
  list-style: none;
}
h1 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.msgs li {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-align: left;
  background-color: springgreen;
  height: 5rem;
  padding: 1rem 2rem;
  margin: 1rem 1rem;
  height: auto;
}
</style>
