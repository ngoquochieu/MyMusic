/*
    * 1. Render song
    * 2. Scroll top
    * 3. Play / pause / seek
    * 4. CD rotate
    * 5. Next / prev
    * 6. Random
    * 7. Next / Repeat when ended
    * 8. Active song
    * 9. Scroll  active song into view
    * 10. Play song when click
*/
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const heading = $('header h2');
    const cdThumb = $('.cd-thumb');
    const audio = $('#audio');
    const cd = $('.cd');
    const cdWidth = cd.offsetWidth;
    const playbtn = $('.btn-toggle-play');
    const player = $('.player');
    const progress = $('#progress');

    var playList = $('.playlist');

    const app = {
        currentIndex: 0,
        isPlaying: false,
        songs: [
            {
                name: 'Khi Phai Quen Di',
                singer: 'Phan Manh Quynh',
                path: './musics/Khi-Phai-Quen-Di-Phan-Manh-Quynh.mp3',
                image: './images/song1.jpg'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'SOFAR',
                singer: 'Binz',
                path: './musics/SOFAR-Binz.mp3',
                image: './images/song3.jpg'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
            {
                name: 'Sao Cung Duoc',
                singer: 'Binz',
                path: './musics/Sao-Cung-Duoc-Binz.mp3',
                image: './images/song2.png'
            },
        ],
        render: function() {
           const html = this.songs.map(song => {
                return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
              </div>
                `
           });
           playList.innerHTML = html.join('');
        },

        defineProperties: function() {
            Object.defineProperty(this, 'currentSong', {
                get: function() {
                    return this.songs[this.currentIndex];
                }
            })
        },

        handleEvent: function() {
           //Xu li phong to thu nho CD
            document.onscroll = function () {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCDWidth = cdWidth - scrollTop;

                cd.style.width = newCDWidth > 0 ? newCDWidth + 'px' : 0;
                cd.style.opacity = newCDWidth / cdWidth;
            }

            // Xu li khi click play
            playbtn.addEventListener('click', function () {
                if(app.isPlaying) {              
                    audio.pause();
                }else {
                    audio.play();
                }

                //Khi play
                audio.onplay = function () {
                    app.isPlaying = true;
                    player.classList.add('playing');
                }

                //Khi bi pause
                audio.onpause = function () {
                    app.isPlaying = false;
                    player.classList.remove('playing');
                }

                //Khi tien do bai hat thay doi
                audio.ontimeupdate = function() {
                    if(audio.duration) {
                        progressA = Math.floor(audio.currentTime / audio.duration * 100);
                        progress.value = progressA;
                    }       
                }

                //Khi tua
                progress.onchange = function(e) {
                    const seekTime = (e.target.value * audio.duration / 100);
                    audio.currentTime = seekTime;
                }
            });
        },
        
        loadCurrentSong: function() {
                   
            heading.innerHTML = this.currentSong.name;
            
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
           
        },
        start: function () {
            //Dinh nghia cac thuoc tinh cho object
            this.defineProperties();

            //Lang nghe va xu li cac xu kien
            this.handleEvent();

            //Load bai hat dau tien khi chay ung dung
            this.loadCurrentSong();

            //Render playlist
            this.render();
        }
    }



    app.start();
