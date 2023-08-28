const { createApp } = Vue;
import { shopData, dataDetail, imageNames, houseDraws } from "./data.js";

const STABLE_VIDEO = "./videos/Malinowskiego_Hero_2-2.mp4";
createApp({
  data() {
    return {
      message: "Hello Vue!",
      houses: shopData,
      houseDetail: dataDetail[0],
      houseDraws: houseDraws,
      currentPanel: "list", //list | detail
      currentVideoId: 0,
      videoTrans: "",
      videoName: "1-1",
      stableVideo: STABLE_VIDEO,
      videoSide: 'ext',
    };
  },

  computed: {
    listExtImages() {
      const houseName = this.houseDetail.name;
      return imageNames
        .filter((img) => img.includes("ext"))
        .map((img) => {
          return `./images/${houseName}/${img}.jpg`;
        });
    },

    listIntImages() {
      const houseName = this.houseDetail.name;
      return imageNames
        .filter((img) => img.includes("int"))
        .map((img) => {
          return `./images/${houseName}/${img}.jpg`;
        });
    },

    isLoop() {
      return this.videoName[0] === this.videoName[2];
    },
  },

  methods: {
    nextVideo(imgId = 1, side = 'ext') {
      this.videoSide = side
      let name = "1-1";

      if (imgId > this.currentVideoId) {
        name = `${imgId - 1}-${imgId}`;
      } else if (imgId < this.currentVideoId) {
        name = `${imgId + 1}-${imgId}`;
      }
      this.videoName = name;
      this.videoTrans = this.getVideoLink(name, side);
      this.currentVideoId = imgId;
      setTimeout(() => {
        this.setStableVideo(imgId, side);
      }, 500)
      setTimeout(() => {
        this.videoTrans = "";
      }, 1200);
    },

    setStableVideo(imgId = 1, side) {
      const name = `${imgId}-${imgId}`;

      this.stableVideo = this.getVideoLink(name, side);
    },

    changeDetail(itemName = "") {
      const detail = dataDetail.find((h) => h.name === itemName);
      this.houseDetail = detail;
      this.changePanel("detail");
      // this.stableVideo = this.getVideoLink("1-1", 'ext');
      this.nextVideo(1, 'ext')
    },
    goBack() {
      this.changePanel("list");
      this.stableVideo = STABLE_VIDEO;
      this.videoTrans = "";
      this.currentVideoId = 0
      this.videoName = '1-1'
    },
    changePanel(panel) {
      this.currentPanel = panel;
    },
    getVideoLink(videoId = "1-1", side = 'ext') {
      if (side === 'int') {
        return `./videos/${this.houseDetail.name}/interior/${videoId}.mp4`
      }
      return `./videos/${this.houseDetail.name}/${videoId}.mp4`;
    },

    goRight() {
      const nextId = this.currentVideoId + 1
      if (this.videoSide === 'ext') {
        if (nextId > 4) {
          this.nextVideo(1, 'int')
        } else {
          this.nextVideo(nextId, 'ext')
        }
      } else if (this.videoSide === 'int') {
        if (nextId > 2) {
          this.nextVideo(1, 'ext')
        } else {
          this.nextVideo(nextId, 'int')
        }
      }
    },

    goLeft() {
      const nextId = this.currentVideoId - 1
      if (this.videoSide === 'ext') {
        if (nextId < 1) {
          this.nextVideo(2, 'int')
        } else {
          this.nextVideo(nextId, 'ext')
        }
      } else if (this.videoSide === 'int') {
        if (nextId < 1) {
          this.nextVideo(4, 'ext')
        } else {
          this.nextVideo(nextId, 'int')
        }
      }
    }
  },
}).mount("#app");
