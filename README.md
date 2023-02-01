How to create project Music player

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

    Verson1:

    Vấn đề hiện tại: 

        Vấn đề 1:

        - Phát ngẫu nhiên những bài hát bị lặp lại ví dụ 
            list = {1, 2, 3, 4}
            Thì có thể phát 1,2,1,2,1 => Chưa tối ưu
        Hướng giải quyết:
        * Xu li logic khi phat het 1 bai thi se dua id vao 1 mang danh dau , Khi phat het thi se clear 
        * lai de tranh truong hop ngau nhien lai 1 bai

        Vấn đề 2:
        -   Chưa xử lí trường hợp click vào options

        Vấn đề 3:
        - Khi tua bài hát thì click vào thanh progress thì nó gặp vấn đề là không đưa tới vị trí mình mong
        muốn ngay lập tức