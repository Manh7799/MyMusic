/**
 * 1. Render songs
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = "ManhNguyen";
const VOLUME_KEY = "myMusicPlayerVolume";
const SONG_KEY = "currentSongIndex";

const nameSong = $(".footer_song h4");
const cdThumb = $(".footer_thumb");
const audio = $("#audio");
const volumeSlider = $("#volume");
const valueVolume = $("#value");
const playButton = $(".play_button");
const playBtn = $(".icon_play");
const stopBtn = $(".icon_stop");
const progress = $(".progress_bar");
const nextBtn = $(".next_button");
const backBtn = $(".back_button");
const randomBtn = $(".shuffle_button");
const repeatBtn = $(".repeat_button");
const playList = $(".container_playlist");

const app = {
  currenIndex: JSON.parse(localStorage.getItem(SONG_KEY)) || 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  volumeIndex: 100,

  //Lưu khi tải lại trang
  setConig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  setVolume: function (value) {
    this.volumeIndex = value;
    localStorage.setItem("myMusicPlayerVolume", value);
  },

  setSong: function (index) {
    this.songIndex = index;
    localStorage.setItem("currentSongIndex", index);
  },

  songs: [
    {
      name: "Chập chờn",
      singer: "Dương domic",
      path: "./songs/ChapChon-DuongDomic-16783110.mp3",
      image: "./imgs/Mat_Ket_Noi.jpg",
    },
    {
      name: "Tràn bộ nhớ",
      singer: "Dương domic",
      path: "./songs/TranBoNho-DuongDomic-16783111.mp3",
      image: "./imgs/Mat_Ket_Noi.jpg",
    },
    {
      name: "Pin dự phòng",
      singer: "Dương domic",
      path: "./songs/PinDuPhong-DuongDomicLouHoang-16783112.mp3",
      image: "./imgs/Mat_Ket_Noi.jpg",
    },
    {
      name: "Mất kết nối",
      singer: "Dương domic",
      path: "./songs/MatKetNoi-DuongDomic-16783113.mp3",
      image: "./imgs/Mat_Ket_Noi.jpg",
    },
    {
      name: "Dám rực rỡ",
      singer: "HIEUTHUHAI",
      path: "./songs/damrucro.mp3",
      image: "./imgs/DamRucRo.jfif",
    },
    {
      name: "Thiên ý",
      singer: "Nhạc liên quân",
      path: "./songs/thieny.mp3",
      image: "./imgs/ThienY.jfif",
    },
    {
      name: "Dưới ánh hào quang ",
      singer: "Nightcore",
      path: "./songs/DuoiAnhHaoQuang.mp3",
      image: "./imgs/DuoiAnhHaoQuang.jfif",
    },
    {
      name: "Bộ tộc cùng già",
      singer: "Độ MiXi",
      path: "./songs/botoccunggia.mp3",
      image: "./imgs/BoTocCungGia.jfif",
    },
    {
      name: "Chìm Sâu",
      singer: "MCK",
      path: "./songs/chimsau.mp3",
      image: "./imgs/ChimSau.jfif",
    },
    {
      name: "Don't Côi",
      singer: "Ogenus",
      path: "./songs/don'ncoi.mp3",
      image: "./imgs/DonCoi.jfif",
    },
    {
      name: "Độ tộc 2",
      singer: "Độ Mixi",
      path: "./songs/DoToc2.mp3",
      image: "./imgs/DoToc2.jfif",
    },
    {
      name: "Lệ lưu ly",
      singer: "Vũ phụng tiên",
      path: "./songs/LeLuuLy.mp3",
      image: "./imgs/LeLuuLy.jfif",
    },
    {
      name: "Remember Me",
      singer: "Sơn tùng MTP",
      path: "./songs/RememberMe.mp3",
      image: "./imgs/rememberme.jfif",
    },
    {
      name: "Nếu lúc đó",
      singer: "Tlinh",
      path: "./songs/NeuLucDo.mp3",
      image: "./imgs/NeuLucDo.jfif",
    },
    {
      name: "Làn ưu tiên",
      singer: "Mopius",
      path: "./songs/LanUuTien.mp3",
      image: "./imgs/LanUuTien.webp",
    },
  ],

  // Hiển thị bài hát ra view
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="col-lg-3 container_songs ${
              index == this.currenIndex ? "active" : ""
            }" data-index="${index}">
              <img class="song_img" src="${song.image}" alt="Ảnh" />
              <div class="song_value">
                <h4 class="song_name">${song.name}</h4>
                <span class="song_singer">${song.singer}</span>
              </div>
              <i class="fa-solid fa-bars icon_option"></i>
            </div>
            `;
    });
    playList.innerHTML = htmls.join("");
    value.textContent = volumeSlider.value;
  },

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currenIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;

    //Xử lý ảnh quay / dừng
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });

    cdThumbAnimate.pause();

    //2.Xử lý khi click play / stop
    playButton.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    //Khi song đc play
    audio.onplay = function () {
      _this.isPlaying = true;
      playBtn.classList.add("hidden");
      stopBtn.classList.remove("hidden");
      cdThumbAnimate.pause();
    };

    //Khi song bị dừng
    audio.onpause = function () {
      _this.isPlaying = false;
      playBtn.classList.remove("hidden");
      stopBtn.classList.add("hidden");
      cdThumbAnimate.pause();
    };

    //Khi tiến độ bài hát thay đổi
    /**
     * currentTime: Trả về vị trí hiện tại trong bài hát bằng giây
     * duration: Độ dài bài hát
     * onended: Điểm cuối bài hát
     * closest: Trả về element cha hoặc chính nó, ko tìm thấy trả về null
     */

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    //Xử lý âm thanh bài hát
    volumeSlider.addEventListener("input", function (e) {
      const volumeValue = Number(volumeSlider.value);
      _this.setVolume(volumeValue);
      audio.volume = volumeValue / 100;
      valueVolume.textContent = e.target.value;
    });

    //Xử lý lưu lại vị trí bài hát trc đó

    //Xử lý khi tua
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    //Xử lý khi next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      _this.setSong(_this.currenIndex);
      audio.play();
      _this.render();
    };

    //Xử lý khi prev song
    backBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      _this.setSong(_this.currenIndex);
      audio.play();
    };

    //Xử lý bật / tắt random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("show", _this.isRandom);
    };

    //Xử lý lặp lại 1 bài
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("show", _this.isRepeat);
    };

    //Xử lý next song khi audio kết thúc
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    playList.onclick = function (e) {
      const songNode = e.target.closest(".container_songs:not(.active)");
      if (songNode || !e.target.closest(".icon_option")) {
        //Xử lý khi click vào song
        if (songNode) {
          _this.currenIndex = Number(songNode.dataset.index);
          _this.setSong(_this.currenIndex);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        //Xử lý khi click vào song option
        if (e.target.closest(".icon_option")) {
        }
      }
    };
  },

  loadCurrentSong: function () {
    nameSong.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  loadVolume: function () {
    const volumeValue = localStorage.getItem("myMusicPlayerVolume");
    if (volumeValue !== null && !isNaN(volumeValue)) {
      this.volumeIndex = Number(volumeValue);
    } else {
      this.volumeIndex = 100; // Mặc định 100 nếu không tìm thấy giá trị hợp lệ
    }
  },

  //Next bài hát
  nextSong: function () {
    this.currenIndex++;
    if (this.currenIndex >= this.songs.length) {
      this.currenIndex = 0;
    }

    this.loadCurrentSong();
  },

  //Prev bài hát
  prevSong: function () {
    this.currenIndex--;
    if (this.currenIndex < 0) {
      this.currenIndex = this.songs.length - 1;
    }

    this.loadCurrentSong();
  },

  //Random bài hát
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currenIndex);

    this.currenIndex = newIndex;
    this.loadCurrentSong();
  },

  // Hàm chạy code
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();

    this.loadVolume();

    audio.volume = this.volumeIndex / 100;
    volumeSlider.value = this.volumeIndex;

    //Định nghĩa các thuộc tính cho object
    this.defineProperties();

    //Lắng nge / xủ lý các sự kiện (DOM events)
    this.handleEvents();

    //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();

    //Render playlist
    this.render();

    //Hiển thị trạng thái ban đầu của button repeat and random
    randomBtn.classList.toggle("show", this.isRandom);
    repeatBtn.classList.toggle("show", this.isRepeat);
  },
};

app.start();
