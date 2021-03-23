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
    const nextBtn = $('.btn-next');
    const prevBtn = $('.btn-prev');
    const randomBtn = $('.btn-random');

    var playList = $('.playlist');

    const app = {
        currentIndex: 0,
        isPlaying: false,
        isRandom: false,
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
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
            // {
            //     name: 'Sao Cung Duoc',
            //     singer: 'Binz',
            //     path: './musics/Sao-Cung-Duoc-Binz.mp3',
            //     image: './images/song2.png'
            // },
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
            //Xu li CD quay dung
            const cdThumbAnimate = 
                cdThumb.animate(
            [
                //{ transform: 'rotate(0) translate3D(-50%, -50%, 0)', color: '#000' },
                //{ color: '#431236', offset: 0.3},
                //{ transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', color: '#000' }
                {transform: 'rotate(360deg'}
            ], {
                duration: 10000,
                iterations: Infinity
            }
            );
            cdThumbAnimate.pause();

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
            });

                //Khi play
                audio.onplay = function () {
                    app.isPlaying = true;
                    player.classList.add('playing');
                    cdThumbAnimate.play();  // Khi bat dau thi cd quay
                }

                //Khi bi pause
                audio.onpause = function () {
                    app.isPlaying = false;
                    player.classList.remove('playing');
                    cdThumbAnimate.pause(); // Khi dung thi cd dung quay
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

                //Play next song
                nextBtn.onclick = function () {
                    if(this.isRandom) {
                        this.randomSong();
                        
                    }else{
                        app.nextSong();
                    }
                        
                    audio.play();
                }

                //Play prev song
                prevBtn.onclick = function () {
                    if(this.isRandom) {
                        this.randomSong();
                        
                    }else{
                        app.prevSong();       
                    }                      
                    audio.play();
                }

                //Play random song
                randomBtn.onclick = function () {
                    this.isRandom = !this.isRandom;
                    randomBtn.classList.toggle('active');
                }

                //Ended curr song and continue next song
                audio.onended = function () {
                    
                    setTimeout(function () {
                       app.nextSong();
                       audio.play(); 
                    }, 3000);                  
                }
            
        },
        // Load song hien tai
        loadCurrentSong: function() {
                   
            heading.innerHTML = this.currentSong.name;
            
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
           
        },

        //Next song
        nextSong: function() {
            this.currentIndex++;
            if(this.currentIndex >= this.songs.length )
                this.currentIndex = 0;
            this.loadCurrentSong();
        },

        //Prev song
        prevSong: function() {
            this.currentIndex--;
            if(this.currentIndex < 0)
                this.currentIndex = this.songs.length - 1;
            this.loadCurrentSong();
        },

        //Random song
        randomSong: function() {
            let newIndex;
            do{
                newIndex = Math.floor(Math.random() * Math.floor(this.songs.length));
            }while (newIndex === this.currentIndex);        
            this.currentIndex = newIndex;
            console.log(newIndex);
            this.loadCurrentSong();
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
