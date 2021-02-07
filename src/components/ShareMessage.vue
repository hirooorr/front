<template>
  <div class="share">
      <p>シェア</p>
      <textarea v-model="share"></textarea>
      <div @click="send">
          <button>シェアする</button>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            share: "",
        };
    },
    methods: {
        send() {
            if (this.share === "") {
                alert("シェアする内容を入力してください");
            } else {
                axios
                    .post("mysql://b4930d8a0c2a9a:07cd54f8@us-cdbr-east-03.cleardb.com/heroku_336a7321155ae0c?reconnect=true/api/shares", {
                        user_id: this.$store.state.user.id,
                        share: this.share,
                    })
                    .then((response) => {
                        console.log(response);
                        alert("シェアしました");
                        this.share = "";
                        this.$router.go({
                            path: this.$router.currentRoute.path,
                            force: true,
                        });
                    });
            }
        },
    },
};
</script>

<style scoped>
.share {
    margin: 15px;
}
.share textarea {
    width: 95%;
    height: 120px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    border: 1px solid white;
    background-color: #15202b;
    color: white;
    resize: none;
}
button {
    width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  color: #fff;
  background-color: #5419da;
  border-radius: 25px;
  display: block;
  margin: 0 0 0 auto;
}
</style>